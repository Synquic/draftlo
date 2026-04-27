import React from "react";
import AgreementPageClient from "./AgreementPageClient";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { getAppData } = await import("@/lib/api");
  const data = await getAppData();
  const { id } = await params;
  const pathname = `/agreements/${id}`;
  const agreement = data.drafts.find((item) => item.href === pathname);

  if (!agreement) {
    return { title: "Agreement Not Found | Draftlo" };
  }

  const url = `https://draftlo.com/agreements/${id}`;
  const price = agreement.price?.amount ? `₹${agreement.price.amount}` : "";

  return {
    title: `${agreement.name} India${price ? ` – Download at ${price}` : ""} | Draftlo`,
    description: `Download a professionally drafted ${agreement.name} for India. Legally compliant, ready in minutes.${price ? ` Get it at just ${price}.` : ""}`,
    alternates: { canonical: url },
    openGraph: {
      title: `${agreement.name} India | Draftlo`,
      description: `Download a professionally drafted ${agreement.name} for India. Legally compliant, ready in minutes.`,
      url,
      type: "website",
      images: agreement.image
        ? [{ url: agreement.image, alt: agreement.name }]
        : [],
    },
  };
}

// Server component wrapper
export default async function Agreement({ params }: { params: Promise<{ id: string }> }) {
  const { getAppData } = await import("@/lib/api");
  const { notFound } = await import("next/navigation");

  const data = await getAppData();
  const { id } = await params;
  const pathname = `/agreements/${id}`;

  const agreement = data.drafts.find((item) => item.href === pathname);

  if (!agreement) {
    notFound();
  }

  return <AgreementPageClient agreement={agreement} data={data} />;
}
