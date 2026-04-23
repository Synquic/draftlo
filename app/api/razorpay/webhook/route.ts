import { NextResponse } from "next/server";
import crypto from "crypto";

/**
 * POST /api/razorpay/webhook
 *
 * Called by Razorpay when a payment is captured.
 * Verifies HMAC-SHA256 signature, then processes the payment.
 *
 * Set up in Razorpay Dashboard:
 *   URL:    https://draftlo.com/api/razorpay/webhook
 *   Events: payment.captured, payment.failed
 *   Secret: (same value as RAZORPAY_WEBHOOK_SECRET env var)
 */

/* ── SHA-256 hash helper for Meta CAPI user_data ── */
const hashData = (value: string) =>
  crypto.createHash("sha256").update(value.trim().toLowerCase()).digest("hex");

/**
 * Fire a Meta CAPI Purchase event server-side.
 * This runs as soon as Razorpay confirms capture, independent of whether the
 * user's browser ever lands on /thankyou-redirect. Guarantees Meta gets the
 * Purchase signal even if the client redirect is slow, cancelled, or blocked.
 *
 * Uses the Razorpay payment_id as event_id — the client-side fbq fire in
 * BuyButton.tsx uses the same value, so Meta deduplicates between the two
 * and you don't double-count.
 */
async function fireMetaCapiPurchase(payment: any) {
  const PIXEL_ID = process.env.META_PIXEL_ID;
  const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN;

  if (!PIXEL_ID || !ACCESS_TOKEN) {
    console.warn(
      "[webhook] META_PIXEL_ID or META_ACCESS_TOKEN not set — skipping Meta CAPI"
    );
    return;
  }

  const value = (payment.amount || 0) / 100; // Razorpay amount is in paise
  const currency = payment.currency || "INR";

  const user_data: Record<string, string> = {};
  if (payment.email) user_data.em = hashData(String(payment.email));
  if (payment.contact) user_data.ph = hashData(String(payment.contact));

  const payload = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: payment.id, // 🔑 Deduplication key (matches client fbq eventID)
        action_source: "website",
        event_source_url: "https://draftlo.com",
        user_data,
        custom_data: {
          value,
          currency,
          content_name: payment.notes?.productName,
          content_ids: payment.notes?.productId
            ? [payment.notes.productId]
            : undefined,
          content_type: "product",
        },
      },
    ],
  };

  try {
    const res = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      }
    );
    const result = await res.json();
    console.log("[webhook] Meta CAPI Purchase fired:", {
      payment_id: payment.id,
      value,
      email: payment.email ? "hashed" : "missing",
      result,
    });
  } catch (e) {
    console.error("[webhook] Meta CAPI Purchase failed:", e);
  }
}

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("x-razorpay-signature") || "";

    /* ── Verify signature ── */
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET!)
      .update(rawBody)
      .digest("hex");

    if (expected !== signature) {
      console.error("[webhook] Invalid signature");
      return NextResponse.json(
        { error: "Invalid signature" },
        { status: 400 }
      );
    }

    const payload = JSON.parse(rawBody);

    /* ── Handle payment.captured ── */
    if (payload.event === "payment.captured") {
      const payment = payload.payload.payment.entity;

      console.log("[webhook] Payment captured:", {
        id: payment.id,
        email: payment.email,
        amount: payment.amount / 100,
        currency: payment.currency,
        product: payment.notes?.productName,
        productId: payment.notes?.productId,
      });

      /* ── Fire Meta CAPI Purchase server-side ── */
      // Don't await — respond to Razorpay fast so they don't retry. The fetch
      // runs to completion in the background inside the serverless invocation.
      fireMetaCapiPurchase(payment).catch((e) =>
        console.error("[webhook] Meta CAPI error:", e)
      );

      // TODO: Send the PDF draft to payment.email
      // TODO: Save sale record to your database
    }

    /* ── Handle payment.failed ── */
    if (payload.event === "payment.failed") {
      const payment = payload.payload.payment.entity;

      console.error("[webhook] Payment failed:", {
        id: payment.id,
        email: payment.email,
        error: payment.error_code,
        reason: payment.error_reason,
        product: payment.notes?.productName,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("[webhook] Error:", e);
    return NextResponse.json(
      { error: "Webhook processing failed" },
      { status: 500 }
    );
  }
}
