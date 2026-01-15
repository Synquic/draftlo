import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";

const PIXEL_ID = process.env.META_PIXEL_ID!;
const ACCESS_TOKEN = process.env.META_ACCESS_TOKEN!;

/**
 * SHA-256 hash required by Meta
 */
const hashData = (value: string) => {
  return crypto
    .createHash("sha256")
    .update(value.trim().toLowerCase())
    .digest("hex");
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const {
      eventName,
      eventId,
      email,
      phone,
      value,
      currency = "INR",
    } = body;

    if (!eventName || !eventId) {
      return NextResponse.json(
        { error: "eventName and eventId are required" },
        { status: 400 }
      );
    }

    const payload = {
      data: [
        {
          event_name: eventName,
          event_time: Math.floor(Date.now() / 1000),
          event_id: eventId, // 🔑 Deduplication key
          action_source: "website",

          user_data: {
            em: email ? hashData(email) : undefined,
            ph: phone ? hashData(phone) : undefined,
          },

          custom_data: {
            value,
            currency,
          },
        },
      ],
    };

    const response = await fetch(
      `https://graph.facebook.com/v18.0/${PIXEL_ID}/events?access_token=${ACCESS_TOKEN}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      }
    );

    const result = await response.json();

    return NextResponse.json({
      success: true,
      metaResponse: result,
    });
  } catch (error) {
    console.error("Meta Conversion API Error:", error);

    return NextResponse.json(
      { success: false, error: "Conversion API failed" },
      { status: 500 }
    );
  }
}
