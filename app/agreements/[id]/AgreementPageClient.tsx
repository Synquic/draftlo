'use client';

import React, { useEffect } from "react";
import NewNavbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { analytics } from "@/lib/analytics";

interface AgreementPageProps {
  agreement: any;
  data: any;
}

/** Loads the Razorpay checkout script once */
function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof (window as any).Razorpay !== 'undefined') {
      resolve(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function AgreementPageClient({
  agreement,
  data,
}: AgreementPageProps) {

  /** Track ViewContent on page load */
  useEffect(() => {
    if (!agreement) return;
    analytics.trackDocumentView({
      documentName: agreement.name,
      documentId: agreement.href,
      documentCategory: agreement.category || "Uncategorized",
      price: agreement.price?.amount,
    });
  }, [agreement]);

  /** Open Razorpay modal on button click */
  const handlePayment = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const eventId = crypto.randomUUID();
    analytics.trackFormRedirect({
      documentName: agreement.name,
      documentId: agreement.href,
      documentCategory: agreement.category || "Uncategorized",
      price: agreement.price.amount,
      formUrl: agreement.price.ctaLink,
      eventId,
    });

    const loaded = await loadRazorpayScript();
    if (!loaded) {
      alert('Failed to load payment gateway. Please refresh and try again.');
      return;
    }

    let order: any;
    try {
      const res = await fetch('/api/razorpay-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: agreement.price.amount,
          currency: 'INR',
          receipt: `rcpt_${Date.now()}`,
          notes: { product: agreement.name, href: agreement.href },
        }),
      });
      if (!res.ok) throw new Error('Order creation failed');
      order = await res.json();
    } catch (err) {
      console.error('Razorpay order error:', err);
      alert('Could not initiate payment. Please try again.');
      return;
    }

    const options = {
      key: order.key_id,
      amount: order.amount,
      currency: order.currency,
      name: 'Draftlo',
      description: agreement.name,
      image: '/logoimage.png',
      order_id: order.id,
      handler: function (response: any) {
        const params = new URLSearchParams({
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_order_id: response.razorpay_order_id || '',
          product: agreement.name,
          price: String(agreement.price.amount),
          id: agreement.href,
          category: agreement.category || 'Uncategorized',
        });
        window.location.href = `/thankyou-redirect?${params.toString()}`;
      },
      prefill: {},
      theme: { color: '#000000' },
      modal: { ondismiss: function () { console.log('Razorpay modal closed'); } },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <NewNavbar data={data} />

      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {agreement?.previewImages?.length > 0 ? (
              <div className="border border-gray-200 rounded-lg bg-gray-50 overflow-hidden" style={{ userSelect: "none" }}>
                <div className="bg-white px-4 py-2 text-xs text-gray-500 border-b border-gray-200 flex justify-between items-center">
                  <span>Preview ({agreement.previewImages.length} pages)</span>
                  <span className="italic">Watermarked sample</span>
                </div>
                <div className="max-h-[720px] overflow-y-auto p-3 space-y-3" onContextMenu={(e) => e.preventDefault()}>
                  {agreement.previewImages.map((src: string, i: number) => (
                    <img key={src} src={src} alt={`${agreement?.name} — page ${i + 1}`} draggable={false} onContextMenu={(e) => e.preventDefault()} className="w-full object-contain rounded border border-gray-100 shadow-sm pointer-events-none select-none" />
                  ))}
                </div>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <img src={agreement?.image} alt={agreement?.name} className="w-full object-contain" />
              </div>
            )}

            <div>
              <h1 className="text-3xl font-semibold text-gray-900 mb-4">{agreement?.name}</h1>

              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
                <p className="text-2xl font-semibold text-gray-900 mb-3">
                  ₹{agreement?.price?.amount?.toLocaleString("en-IN", { minimumFractionDigits: 2 })}
                </p>
                <button onClick={handlePayment} className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition cursor-pointer">
                  Get Draft @ ₹{agreement?.price?.amount}
                </button>
              </div>

              <p className="text-gray-700 text-sm leading-relaxed mb-6">{agreement?.longDescription}</p>

              {agreement?.keyFeatures?.length > 0 && (
                <section className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {agreement.keyFeatures.map((item: string, index: number) => (<li key={index}>{item}</li>))}
                  </ul>
                </section>
              )}

              {agreement?.idealFor?.length > 0 && (
                <p className="mb-4 text-gray-700"><strong className="text-gray-900">Ideal for: </strong>{agreement.idealFor.join(", ")}</p>
              )}

              {agreement?.Note && (
                <div className="mb-6"><p className="text-gray-700"><strong className="text-gray-900">Note: </strong>{agreement.Note}</p></div>
              )}

              {agreement?.keyDifferentiators?.length > 0 && (
                <p className="mb-4 text-gray-700"><strong className="text-gray-900">Key Differentiator: </strong>{agreement.keyDifferentiators.join(", ")}</p>
              )}

              {agreement?.tableOfContents?.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Table of Contents</h3>
                  <ul className="list-disc pl-6 text-gray-700">
                    {agreement.tableOfContents.map((item: string, i: number) => (<li key={i}>{item}</li>))}
                  </ul>
                </>
              )}

              {agreement?.disclaimer && (
                <p className="mt-6 text-gray-700 text-sm border-t border-gray-200 pt-4 font-semibold">
                  <strong className="text-gray-900">Disclaimer:</strong> {agreement.disclaimer}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
    }
