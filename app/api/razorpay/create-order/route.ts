import { NextResponse } from "next/server";
import Razorpay from "razorpay";
import fs from "fs";
import path from "path";

/**
 * POST /api/razorpay/create-order
 *
 * Reads product + price from app-data.json (server-side, tamper-proof).
 * Creates a Razorpay order and returns the order ID + key to the client.
 */
export async function POST(req: Request) {
  try {
    const { productId } = await req.json();

    if (!productId || typeof productId !== "string") {
      return NextResponse.json(
        { error: "productId is required" },
        { status: 400 }
      );
    }

    /* ── Read price from app-data.json (single source of truth) ── */
    const dataPath = path.join(process.cwd(), "data", "app-data.json");
    const raw = fs.readFileSync(dataPath, "utf-8");
    const appData = JSON.parse(raw);

    const draft = appData.drafts.find(
      (d: any) => d.href === productId
    );

    if (!draft) {
      return NextResponse.json(
        { error: `Product not found: ${productId}` },
        { status: 404 }
      );
    }

    const amountInPaise = Math.round(draft.price.amount * 100);

    /* ── Create Razorpay order ── */
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID!,
      key_secret: process.env.RAZORPAY_KEY_SECRET!,
    });

    const order = await razorpay.orders.create({
      amount: amountInPaise,
      currency: draft.price.currency || "INR",
      receipt: `rcpt_${Date.now()}`,
      notes: {
        productId: draft.href,
        productName: draft.name,
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      keyId: process.env.RAZORPAY_KEY_ID,
      productName: draft.name,
    });
  } catch (e: any) {
    console.error("[create-order] Error:", e);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
