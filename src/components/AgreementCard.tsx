'use client';

import Link from "next/link";
import { analytics } from "@/lib/analytics";
import { trackCustomSessionEvent } from "@/lib/customSession";
import { getCustomSessionId } from "@/lib/customSession";
interface AgreementCardProps {
  name: string;
  href: string;
  icon: string;
  description?: string;
  longDescription?: string;
  price?: {
    amount: number;
    ctaLink: string;
  };
}

export const AgreementCard = ({
  name,
  href,
  icon,
  description,
  longDescription,
  price,
}: AgreementCardProps) => {
  // Check if icon is a document image (contains http/https) or a category icon
  const isDocumentImage = icon?.includes("http");
  const displayDescription = description || longDescription;

  const handleGetDraftClick = (e: React.MouseEvent) => {
    if (!price) return;
    getCustomSessionId();
    // 🔥 CUSTOM SESSION TRACKING (ONCE PER SESSION)
    trackCustomSessionEvent("buy_draft_visit", {
      document_name: name,
      document_href: href,
      price: price.amount,
      cta_link: price.ctaLink,
    });

    // ✅ EXISTING ANALYTICS (UNCHANGED)
    analytics.trackFormRedirect({
      documentName: name,
      documentId: href,
      price: price.amount,
      formUrl: price.ctaLink,
    });
  };

  return (
    <div className="bg-white rounded-lg border-2 border-gray-200 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group flex flex-col h-[370px]">
      {/* Image box */}
      <Link href={href} className="block flex-shrink-0">
        <div
          className={`${isDocumentImage ? "bg-white h-40" : "bg-gray-900 h-32"} 
          flex items-center justify-center 
          ${!isDocumentImage && "group-hover:bg-blue-600"} 
          transition-colors duration-300`}
        >
          <img
            src={icon}
            alt={name}
            className={
              isDocumentImage
                ? "h-full w-full object-contain p-2"
                : "h-16 w-auto object-contain brightness-0 invert"
            }
          />
        </div>
      </Link>

      {/* Content */}
      <div className="bg-[#1a1d29] p-4 flex-grow flex flex-col min-h-0">
        <Link href={href}>
          <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition-colors mb-2 line-clamp-2">
            {name}
          </h3>
        </Link>

        {displayDescription && (
          <p className="text-xs text-gray-300 line-clamp-2 mb-4">
            {displayDescription}
          </p>
        )}

        {/* Price & CTA */}
        {price && (
          <div className="mt-auto">
            <p className="text-base font-bold text-white mb-3">
              ₹{price.amount.toLocaleString("en-IN")}
            </p>

            <a
              href={price.ctaLink}
              target="_blank"
              rel="noreferrer"
              onClick={(e) => {
                e.stopPropagation();
                handleGetDraftClick(e);
              }}
              className="block w-full text-center bg-white text-gray-900 px-4 py-2 rounded-md hover:bg-gray-100 transition text-sm font-semibold"
            >
              Get Draft @ ₹{price.amount}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
