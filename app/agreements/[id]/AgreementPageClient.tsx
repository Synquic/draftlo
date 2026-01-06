'use client';

import React, { useEffect } from "react";
import NewNavbar from "@/components/NewNavbar";
import { Footer } from "@/components/Footer";
import { analytics } from "@/lib/analytics";

interface AgreementPageProps {
  agreement: any;
  data: any;
}

export default function AgreementPageClient({ agreement, data }: AgreementPageProps) {
  useEffect(() => {
    // Track document view
    analytics.trackDocumentView({
      documentName: agreement.name,
      documentId: agreement.href,
      documentCategory: agreement.category || 'Uncategorized',
      price: agreement.price.amount,
    });
  }, [agreement]);

  const handleGetDraftClick = () => {
    // Track form redirect
    analytics.trackFormRedirect({
      documentName: agreement.name,
      documentId: agreement.href,
      documentCategory: agreement.category || 'Uncategorized',
      price: agreement.price.amount,
      formUrl: agreement.price.ctaLink,
    });
  };

  return (
    <>
      <NewNavbar data={data} />

      <div className="min-h-screen bg-white">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* LEFT — IMAGE */}
            <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
              <img
                src={agreement?.image}
                alt={agreement?.name}
                className="w-full object-contain"
              />
            </div>

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
                  target="_blank"
                  rel="noreferrer"
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
              <section className="mb-8">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Features</h3>
                <ul className="list-disc pl-5 space-y-1 text-gray-700">
                  {agreement?.keyFeatures?.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </section>

              {/* IDEAL FOR */}
              {agreement?.idealFor?.length > 0 && (
                <p className="mb-4 text-gray-700">
                  <strong className="text-gray-900">Ideal for: </strong>
                  {agreement.idealFor.join(", ")}
                </p>
              )}

              {/* NOTE SECTION */}
              {agreement?.Note &&<div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2"><strong>Note: </strong>
                {agreement?.Note}</h3>
              </div>}

              {/* KEY DIFFERENTIATORS */}
              {agreement?.keyDifferentiators?.length > 0 && (
                <p className="mb-4 text-gray-700">
                  <strong className="text-gray-900">Key Differentiator: </strong>
                  {agreement.keyDifferentiators.join(", ")}
                </p>
              )}

              {/* TABLE OF CONTENTS */}
              {agreement?.tableOfContents?.length > 0 && (
                <>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    Table of Contents
                  </h3>
                  <ul className="list-disc pl-6 text-gray-700">
                    {agreement.tableOfContents.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </>
              )}

              {/* DISCLAIMER */}
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
