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
