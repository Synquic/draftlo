import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const WEBHOOK_SECRET = process.env.RAZORPAY_WEBHOOK_SECRET!;
const META_PIXEL_ID = process.env.META_PIXEL_ID!;
const META_ACCESS_TOKEN = process.env.META_ACCESS_TOKEN!;

// In-memory log of last 20 webhook events (resets on server restart)
const webhookLog: { time: string; event: string; paymentId?: string; amount?: number; email?: string; metaResult?: any; error?: string }[] = [];

const hashData = (value: string) =>
  crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");

function validateSignature(rawBody: string, signature: string): boolean {
  const expected = crypto
    .createHmac("sha256", WEBHOOK_SECRET)
    .update(rawBody)
    .digest("hex");
  return expected === signature;
}

async function sendMetaPurchase({
  eventId,
  value,
  currency,
  email,
  phone,
}: {
  eventId: string;
  value: number;
  currency: string;
  email?: string;
  phone?: string;
}) {
  const payload = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: eventId,
        action_source: "website",
        user_data: {
          em: email ? hashData(email) : undefined,
          ph: phone ? hashData(phone) : undefined,
        },
        custom_data: {
          value,
          currency,
          content_type: "product",
        },
      },
    ],
  };

  const response = await fetch(
    `https://graph.facebook.com/v18.0/${META_PIXEL_ID}/events?access_token=${META_ACCESS_TOKEN}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    }
  );

  return response.json();
}

// GET — view recent webhook log at /api/razorpay-webhook
export async function GET() {
  return NextResponse.json({
    message: "Last 20 webhook events",
    count: webhookLog.length,
    events: webhookLog.slice().reverse(),
  });
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get("x-razorpay-signature") || "";

  if (!validateSignature(rawBody, signature)) {
    console.error("Razorpay webhook: invalid signature");
    webhookLog.push({ time: new Date().toISOString(), event: "SIGNATURE_FAILED", error: "Invalid signature" });
    if (webhookLog.length > 20) webhookLog.shift();
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  let event: any;
  try {
    event = JSON.parse(rawBody);
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const eventType = event.event;
  console.log("Razorpay webhook received:", eventType);

  if (eventType === "payment_link.paid" || eventType === "payment.captured") {
    const payment = event.payload?.payment?.entity;

    if (!payment) {
      console.error("Razorpay webhook: no payment entity in payload");
      webhookLog.push({ time: new Date().toISOString(), event: eventType, error: "No payment entity" });
      if (webhookLog.length > 20) webhookLog.shift();
      return NextResponse.json({ error: "No payment entity" }, { status: 400 });
    }

    const valueInRupees = payment.amount / 100;
    const currency = payment.currency || "INR";
    const email = payment.email;
    const phone = payment.contact;
    const eventId = `rzp_${payment.id}`;

    let metaResult: any = null;
    try {
      metaResult = await sendMetaPurchase({ eventId, value: valueInRupees, currency, email, phone });
      console.log("Meta CAPI Purchase sent:", { paymentId: payment.id, value: valueInRupees, metaResult });
    } catch (err) {
      console.error("Meta CAPI error in webhook:", err);
    }

    webhookLog.push({
      time: new Date().toISOString(),
      event: eventType,
      paymentId: payment.id,
      amount: valueInRupees,
      email: email || "not provided",
      metaResult,
    });
    if (webhookLog.length > 20) webhookLog.shift();
  } else {
    webhookLog.push({ time: new Date().toISOString(), event: eventType });
    if (webhookLog.length > 20) webhookLog.shift();
  }

  return NextResponse.json({ received: true });
}
