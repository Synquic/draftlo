"use client";

import Script from "next/script";
import { useState } from "react";
import mixpanel from "mixpanel-browser";

declare global {
  interface Window {
    Razorpay: any;
  }
}

type Props = {
  productId: string;       // e.g. "/agreements/freelance-agreement"
  productName: string;     // e.g. "Freelance Agreement"
  price: number;           // e.g. 400
  category?: string;
};

export default function BuyButton({
  productId,
  productName,
  price,
  category = "Uncategorized",
}: Props) {
  const [loading, setLoading] = useState(false);

  /* ─── Mixpanel funnel helper ─── */
  const trackFunnel = (step: string, extra: Record<string, any> = {}) => {
    try {
      mixpanel.track(step, {
        product_id: productId,
        product_name: productName,
        price,
        category,
        ...extra,
      });
    } catch {}
  };

  const handleClick = async () => {
    setLoading(true);

    const eventId = crypto.randomUUID(); // deduplication key

    /* ──────────────────────────────────────────────
       STEP 1: AddToCart  (same as your existing trackFormRedirect)
       This preserves your current Meta Pixel + CAPI AddToCart events
       so your ad campaigns keep getting the same signal.
    ────────────────────────────────────────────── */
    trackFunnel("Add to Cart", { event_id: eventId });

    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq(
        "track",
        "AddToCart",
        {
          content_name: productName,
          content_category: category,
          content_ids: [productId],
          content_type: "product",
          value: price,
          currency: "INR",
        },
        { eventID: eventId }
      );
    }

    // Meta CAPI — AddToCart (server-side dedup)
    fetch("/api/meta-conversion", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        eventName: "AddToCart",
        eventId,
        value: price,
        currency: "INR",
      }),
    }).catch(() => {});

    /* ──────────────────────────────────────────────
       STEP 2: InitiateCheckout (NEW — for better funnel visibility)
    ────────────────────────────────────────────── */
    trackFunnel("Initiate Checkout");

    if (typeof window !== "undefined" && (window as any).fbq) {
      (window as any).fbq("track", "InitiateCheckout", {
        content_name: productName,
        content_category: category,
        content_ids: [productId],
        content_type: "product",
        value: price,
        currency: "INR",
      });
    }

    try {
      /* ──────────────────────────────────────────────
         STEP 3: Create Razorpay order on server
      ────────────────────────────────────────────── */
      const res = await fetch("/api/razorpay/create-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ productId }),
      });
      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Order creation failed");

      trackFunnel("Order Created", { order_id: data.orderId });

      /* ──────────────────────────────────────────────
         STEP 4: Open Razorpay modal
      ────────────────────────────────────────────── */
      const options = {
        key: data.keyId,
        amount: data.amount,
        currency: data.currency,
        name: "Draftlo",
        description: data.productName,
        order_id: data.orderId,

        handler: function (response: any) {
          /* ── Payment SUCCESS ── */
          trackFunnel("Payment Success", {
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
          });

          // Meta Pixel — Purchase
          if ((window as any).fbq) {
            (window as any).fbq(
              "track",
              "Purchase",
              {
                content_name: productName,
                content_category: category,
                content_ids: [productId],
                content_type: "product",
                value: price,
                currency: "INR",
              },
              { eventID: response.razorpay_payment_id }
            );
          }

          // Meta CAPI — Purchase (server-side dedup)
          fetch("/api/meta-conversion", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              eventName: "Purchase",
              eventId: response.razorpay_payment_id,
              value: price,
              currency: "INR",
            }),
          }).catch(() => {});

          // Redirect to thank-you page
          window.location.href =
            `/thankyou-redirect?payment_id=${response.razorpay_payment_id}` +
            `&product=${encodeURIComponent(productName)}` +
            `&price=${price}` +
            `&id=${encodeURIComponent(productId)}` +
            `&category=${encodeURIComponent(category)}`;
        },

        prefill: {},

        theme: { color: "#000000" },

        modal: {
          ondismiss: function () {
            /* ── User CLOSED modal without paying ── */
            trackFunnel("Payment Modal Dismissed");
            setLoading(false);
          },
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", function (resp: any) {
        /* ── Payment FAILED ── */
        trackFunnel("Payment Failed", {
          error_code: resp.error?.code,
          error_reason: resp.error?.reason,
          error_description: resp.error?.description,
        });
        alert("Payment failed. Please try again.");
        setLoading(false);
      });

      trackFunnel("Payment Modal Opened");
      rzp.open();
    } catch (e: any) {
      trackFunnel("Checkout Error", { error: e.message });
      alert(e.message || "Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="lazyOnload"
      />
      <button
        onClick={handleClick}
        disabled={loading}
        className="inline-block bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition disabled:opacity-50 cursor-pointer"
      >
        {loading ? "Loading..." : `Get Draft @ ₹${price}`}
      </button>
    </>
  );
}
