'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    const productName = searchParams?.get('product') || 'Legal Draft';
    const price = parseFloat(searchParams?.get('price') || '0');
    const productId = searchParams?.get('id') || '';
    const category = searchParams?.get('category') || 'Uncategorized';

    // Use Razorpay payment ID from URL if present (matches the webhook event ID for deduplication)
    // Razorpay appends ?razorpay_payment_id=pay_xxx to the success redirect URL
    const razorpayPaymentId = searchParams?.get('razorpay_payment_id');
    const eventId = razorpayPaymentId
      ? `rzp_${razorpayPaymentId}`
      : `purchase_${productId || 'draft'}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;

    // Track Purchase event to Facebook Pixel (browser-side)
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        content_name: productName,
        content_category: category,
        content_ids: [productId],
        content_type: 'product',
        value: price,
        currency: 'INR',
      }, { eventID: eventId });

      console.log('Facebook Pixel: Purchase event tracked', {
        product: productName,
        price,
        category,
        eventId,
      });
    }

    // Also send via server-side Conversions API for better reliability and deduplication
    fetch('/api/meta-conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        eventName: 'Purchase',
        eventId,
        value: price,
        currency: 'INR',
        contentName: productName,
        contentCategory: category,
        contentIds: [productId],
      }),
    }).catch((err) => {
      console.error('Meta Conversions API error:', err);
    });

    // Track to Mixpanel if available
    if (typeof window !== 'undefined' && (window as any).mixpanel) {
      (window as any).mixpanel.track('Purchase Complete', {
        product_name: productName,
        price,
        category,
        product_id: productId,
      });
    }
  }, [searchParams]);

  return (
    <div
    className="min-h-screen w-full flex items-center justify-center text-center"
    style={{
      background: `
        linear-gradient(
          135deg,
          #0a1a33 0%,
          #070b16 45%,
          #120a2a 100%
        )
      `,
    }}
  >
    <div className="max-w-3xl px-6">
      <h1 className="text-3xl md:text-4xl font-semibold text-white mb-6">
        Thank you for choosing Draftlo
      </h1>

      <p className="text-base md:text-lg text-gray-300 mb-2">
        You will receive your draft in your inbox within 10 minutes.
      </p>

      <p className="text-base md:text-lg text-gray-300 mb-10">
        Please check your Spam/Junk Folder also.
      </p>

      <p className="text-base md:text-lg text-gray-300">
        If you still have not received it, please contact
      </p>

      <p className="mt-2 text-base md:text-lg text-white font-medium">
        support@draftlo.com
      </p>
    </div>
  </div>
  );
}
