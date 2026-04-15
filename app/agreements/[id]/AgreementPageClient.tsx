'use client';

import React, { useEffect } from "react";
import NewNavbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { analytics } from "@/lib/analytics";
import BuyButton from "@/components/BuyButton";

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
   * ── UNCHANGED — same as before ──
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

              {/* Price + Buy Button */}
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-6">
                <p className="text-2xl font-semibold text-gray-900 mb-3">
                  ₹{agreement?.price?.amount?.toLocaleString("en-IN", {
                    minimumFractionDigits: 2,
                  })}
                </p>

                {/* ── CHANGED: BuyButton replaces the old <a> tag ── */}
                <BuyButton
                  productId={agreement.href}
                  productName={agreement.name}
                  price={agreement.price.amount}
                  category={agreement.category || "Uncategorized"}
                />

                <p className="text-sm text-gray-500 mt-2">
                  Standardised, lawyer-drafted agreement
                </p>
              </div>

              {/* 24x7 WhatsApp Support */}
              <a
                href="https://wa.me/919019045647?text=Hi%20Draftlo%2C%20I%20have%20a%20question"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 text-white px-5 py-2.5 rounded-md hover:bg-green-700 transition text-sm font-medium mb-6"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
                24x7 Support on WhatsApp
              </a>

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
              {agreement?.keyDifferentiators?.length > 0 && (
                <p className="mb-4 text-gray-700">
                  <strong className="text-gray-900">
                    Key Differentiator:{" "}
                  </strong>
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
                    {agreement.tableOfContents.map(
                      (item: string, i: number) => (
                        <li key={i}>{item}</li>
                      )
                    )}
                  </ul>
                </>
              )}

              {/* DISCLAIMER */}
              {agreement?.disclaimer && (
                <p className="mt-6 text-gray-700 text-sm border-t border-gray-200 pt-4 font-semibold">
                  <strong className="text-gray-900">Disclaimer:</strong>{" "}
                  {agreement.disclaimer}
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
