'use client';

import React, { useEffect, useState } from "react";
import NewNavbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { analytics } from "@/lib/analytics";

interface AgreementPageProps {
  agreement: any;
  data: any;
}

function loadRazorpayScript(): Promise<boolean> {
  return new Promise((resolve) => {
    if (typeof (window as any).Razorpay !== 'undefined') { resolve(true); return; }
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function AgreementPageClient({ agreement, data }: AgreementPageProps) {
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [formErrors, setFormErrors] = useState({ name: '', email: '', phone: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!agreement) return;
    analytics.trackDocumentView({
      documentName: agreement.name,
      documentId: agreement.href,
      documentCategory: agreement.category || "Uncategorized",
      price: agreement.price?.amount,
    });
  }, [agreement]);

  const validateForm = () => {
    const errors = { name: '', email: '', phone: '' };
    let valid = true;
    if (!formData.name.trim()) { errors.name = 'Name is required'; valid = false; }
    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Valid email is required'; valid = false;
    }
    if (!formData.phone.trim() || !/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      errors.phone = 'Valid 10-digit mobile number required'; valid = false;
    }
    setFormErrors(errors);
    return valid;
  };

  const handleGetDraftClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setShowForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);

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
      setIsSubmitting(false);
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
          notes: { product: agreement.name, href: agreement.href, email: formData.email, name: formData.name },
        }),
      });
      if (!res.ok) throw new Error('Order creation failed');
      order = await res.json();
    } catch (err) {
      console.error('Razorpay order error:', err);
      alert('Could not initiate payment. Please try again.');
      setIsSubmitting(false);
      return;
    }

    setShowForm(false);
    setIsSubmitting(false);

    const options = {
      key: order.key_id,
      amount: order.amount,
      currency: order.currency,
      name: 'Draftlo',
      description: agreement.name,
      image: '/logoimage.png',
      order_id: order.id,
      prefill: {
        name: formData.name,
        email: formData.email,
        contact: formData.phone,
      },
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
      theme: { color: '#000000' },
      modal: { ondismiss: function () { console.log('Razorpay modal closed'); } },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  return (
    <>
      <NewNavbar data={data} />

      {/* Pre-checkout form overlay */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 px-4">
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md p-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-1">Enter your details</h2>
            <p className="text-sm text-gray-500 mb-6">We'll send your draft to this email after payment.</p>

            <form onSubmit={handleFormSubmit} noValidate>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                <input
                  type="text"
                  placeholder="Ravi Shankar"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                {formErrors.name && <p className="text-red-500 text-xs mt-1">{formErrors.name}</p>}
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                {formErrors.email && <p className="text-red-500 text-xs mt-1">{formErrors.email}</p>}
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number</label>
                <input
                  type="tel"
                  placeholder="9876543210"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                />
                {formErrors.phone && <p className="text-red-500 text-xs mt-1">{formErrors.phone}</p>}
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="flex-1 border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-sm hover:bg-gray-50 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-black text-white px-4 py-2 rounded-md text-sm hover:bg-gray-800 transition disabled:opacity-50"
                >
                  {isSubmitting ? 'Please wait...' : `Pay ₹${agreement?.price?.amount}`}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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
                <button onClick={handleGetDraftClick} className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition cursor-pointer">
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
