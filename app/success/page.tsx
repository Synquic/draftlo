'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { CheckCircle } from 'lucide-react';

export default function SuccessPage() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get purchase details from URL params
    const productName = searchParams?.get('product') || 'Legal Draft';
    const price = parseFloat(searchParams?.get('price') || '0');
    const productId = searchParams?.get('id') || '';
    const category = searchParams?.get('category') || 'Uncategorized';

    // Track Purchase event to Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Purchase', {
        content_name: productName,
        content_category: category,
        content_ids: [productId],
        content_type: 'product',
        value: price,
        currency: 'INR',
        external_id: '1461517148655115',
      });

      console.log('Facebook Pixel: Purchase event tracked', {
        product: productName,
        price,
        category,
      });
    }

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
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-6">
          <CheckCircle className="w-20 h-20 text-green-500 mx-auto" />
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-4">
          Purchase Successful!
        </h1>

        <p className="text-gray-600 mb-8">
          Thank you for your purchase. You will receive your legal draft shortly via email.
        </p>

        <div className="space-y-4">
          <Link
            href="/"
            className="block w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition"
          >
            Back to Home
          </Link>

          <Link
            href="/category"
            className="block w-full border-2 border-gray-300 text-gray-700 py-3 px-6 rounded-lg font-semibold hover:border-gray-400 transition"
          >
            Browse More Documents
          </Link>
        </div>
      </div>
    </div>
  );
}
