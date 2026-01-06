'use client';

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { analytics } from "@/lib/analytics";

export default function SuccessPage() {
  const searchParams = useSearchParams();

  // Get parameters from URL if available
  const documentName = searchParams?.get("document") || "your legal document";
  const email = searchParams?.get("email") || "";

  useEffect(() => {
    // Track successful purchase completion
    analytics.trackPageView("Purchase Success", {
      document_name: documentName,
      user_email: email,
      conversion: true,
    });
  }, [documentName, email]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6 animate-bounce">
            <svg
              className="w-12 h-12 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Payment Successful!
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for choosing Draftlo. Your order has been confirmed.
          </p>

          {/* Document Info */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-3">
              What happens next?
            </h2>
            <div className="space-y-3 text-left">
              <div className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">Check your email</p>
                  <p className="text-sm text-gray-600">
                    We've sent your document to{" "}
                    {email ? (
                      <span className="font-semibold">{email}</span>
                    ) : (
                      "your registered email address"
                    )}
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10"
                  />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">Download your document</p>
                  <p className="text-sm text-gray-600">
                    Click the download link in your email to access your document
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <svg
                  className="w-6 h-6 text-blue-600 flex-shrink-0 mt-0.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
                <div>
                  <p className="font-medium text-gray-900">Customize as needed</p>
                  <p className="text-sm text-gray-600">
                    Edit the Word document to match your specific requirements
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Important Note */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-8 text-left">
            <div className="flex items-start space-x-3">
              <svg
                className="w-6 h-6 text-yellow-600 flex-shrink-0 mt-0.5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-1">
                  Important: Legal Disclaimer
                </p>
                <p className="text-sm text-gray-700">
                  While our documents are professionally drafted and legally compliant, we
                  strongly recommend having them reviewed by a qualified lawyer before use,
                  especially for complex situations.
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
            >
              Back to Home
            </Link>
            <Link
              href="/category"
              className="inline-block bg-white border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Browse More Documents
            </Link>
          </div>

          {/* Support Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-600 mb-2">
              Need help? Contact our support team
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <a
                href="mailto:support@draftlo.com"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                support@draftlo.com
              </a>
              <span className="hidden sm:inline text-gray-400">|</span>
              <a
                href="tel:+918088047284"
                className="text-blue-600 hover:text-blue-700 font-medium"
              >
                +91 80880 47284
              </a>
            </div>
          </div>
        </div>

        {/* Additional Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <svg
              className="w-8 h-8 text-blue-600 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
            <p className="text-sm font-semibold text-gray-900">Secure Payment</p>
            <p className="text-xs text-gray-600 mt-1">
              Your payment was processed securely
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <svg
              className="w-8 h-8 text-blue-600 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <p className="text-sm font-semibold text-gray-900">Quality Assured</p>
            <p className="text-xs text-gray-600 mt-1">
              Legally compliant documents
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-md p-4 text-center">
            <svg
              className="w-8 h-8 text-blue-600 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <p className="text-sm font-semibold text-gray-900">24/7 Support</p>
            <p className="text-xs text-gray-600 mt-1">
              We're here to help anytime
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
