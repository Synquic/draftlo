'use client';

import React, { useEffect } from "react";
import NewNavbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { analytics } from "@/lib/analytics";

interface AgreementPageProps {
  agreement: any;
  data: any;
}

export default function AgreementPageClient({
  agreement,
  data,
}: AgreementPageProps) {

  /**
   * Track ViewContent (Document View)
   */
  useEffect(() => {
    if (!agreement) return;

    analytics.trackDocumentView({
      documentName: agreement.name,
      documentId: agreement.href,
      documentCategory: agreement.category || "Uncategorized",
      price: agreement.price?.amount,
    });
  }, [agreement]);

  /**
   * Track AddToCart + redirect safely
   */
  const handleGetDraftClick = (
    e: React.MouseEvent<HTMLAnchorElement>
  ) => {
    e.preventDefault(); // ⛔ stop instant navigation

    const eventId = crypto.randomUUID(); // 🔑 deduplication key

    analytics.trackFormRedirect({
      documentName: agreement.name,
      documentId: agreement.href,
      documentCategory: agreement.category || "Uncategorized",
      price: agreement.price.amount,
      formUrl: agreement.price.ctaLink,
      eventId,
    });

    // ✅ allow Meta Pixel + CAPI to flush
    setTimeout(() => {
      window.open(agreement.price.ctaLink, "_blank");
    }, 300);
  };

  return (
    <>
      <NewNavbar data={data} />

      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* LEFT — IMAGE / PREVIEW */}
            {agreement?.previewImages?.length > 0 ? (
              <div
                className="border border-gray-200 rounded-lg bg-gray-50 overflow-hidden"
                style={{ userSelect: "none" }}
              >
                <div className="bg-white px-4 py-2 text-xs text-gray-500 border-b border-gray-200 flex justify-between items-center">
                  <span>Preview ({agreement.previewImages.length} pages)</span>
                  <span className="italic">Watermarked sample</span>
                </div>
                <div
                  className="max-h-[720px] overflow-y-auto p-3 space-y-3"
                  onContextMenu={(e) => e.preventDefault()}
                >
                  {agreement.previewImages.map((src: string, i: number) => (
                    <img
                      key={src}
                      src={src}
                      alt={`${agreement?.name} — page ${i + 1}`}
                      draggable={false}
                      onContextMenu={(e) => e.preventDefault()}
                      className="w-full object-contain rounded border border-gray-100 shadow-sm pointer-events-none select-none"
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                <img
                  src={agreement?.image}
                  alt={agreement?.name}
                  className="w-full object-contain"
                />
              </div>
            )}

            {/* RIGHT — CONTENT */}
            <div>
              {/* Title */}
              <h1 className="text-3xl font-semibold text-gray-900 mb-4">
                {agreement?.name}
              </h1>

              {/* Price */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
                <p className="text-2xl font-semibold text-gray-900 mb-3">
                  ₹{agreement?.price?.amount?.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>

                <a
                  href={agreement?.price?.ctaLink}
                  onClick={handleGetDraftClick}
                  className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
                >
                  Get Draft @ ₹{agreement?.price?.amount}
                </a>
              </div>

              {/* DESCRIPTION */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                {agreement?.longDescription}
              </p>

              {/* KEY FEATURES */}
              {agreement?.keyFeatures?.length > 0 && (
                <section className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    Key Features
                  </h3>
                  <ul className="list-disc pl-5 space-y-1 text-gray-700">
                    {agreement.keyFeatures.map((item: string, index: number) => (
                      <li key={index}>{item}</li>
                    ))}
                  </ul>
                </section>
              )}

              {/* IDEAL FOR */}
              {agreement?.idealFor?.length > 0 && (
                <p className="mb-4 text-gray-700">
                  <strong className="text-gray-900">Ideal for: </strong>
                  {agreement.idealFor.join(", ")}
                </p>
              )}

              {/* NOTE */}
              {agreement?.Note && (
                <div className="mb-6">
                  <p className="text-gray-700">
                    <strong className="text-gray-900">Note: </strong>
                    {agreement.Note}
                  </p>
                </div>
              )}

              {/* KEY DIFFERENTIATORS */}
              {agreement?.keyDiffere