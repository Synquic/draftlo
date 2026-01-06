import React from "react";
import AgreementPageClient from "./AgreementPageClient";

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
