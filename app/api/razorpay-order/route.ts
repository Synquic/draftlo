import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { amount, currency = 'INR', receipt, notes } = await req.json();

    const keyId = process.env.RAZORPAY_KEY_ID;
    const keySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!keyId || !keySecret) {
      console.error('Razorpay credentials not configured');
      return NextResponse.json({ error: 'Payment gateway not configured' }, { status: 500 });
    }

    const credentials = Buffer.from(`${keyId}:${keySecret}`).toString('base64');

    const response = await fetch('https://api.razorpay.com/v1/orders', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        amount: Math.round(amount * 100), // paise
        currency,
        receipt: receipt || `receipt_${Date.now()}`,
        notes: notes || {},
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      console.error('Razorpay order creation failed:', error);
      return NextResponse.json(
        { error: error.error?.description || 'Order creation failed' },
        { status: response.status }
      );
    }

    const order = await response.json();

    // Return order + key_id so frontend doesn't need a NEXT_PUBLIC env var
    return NextResponse.json({ ...order, key_id: keyId });
  } catch (error) {
    console.error('Razorpay order error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
