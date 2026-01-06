'use client';

import { Layout } from "@/components/Layout";
import { AgreementCard } from "@/components/AgreementCard";
import { analytics } from "@/lib/analytics";
import { useEffect } from "react";

interface SearchPageProps {
  data: any;
  query: string;
  draftsWithIcons: any[];
}

function SearchPageClient({ data, query, draftsWithIcons }: SearchPageProps) {
  useEffect(() => {
    if (query) {
      analytics.trackSearch(query, draftsWithIcons.length);
    }
  }, [query, draftsWithIcons.length]);

  return (
    <Layout data={data}>
      <div className="hero-background py-16">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 animate-fade-in">
            {query ? `Search Results for "${query}"` : "All Agreements"}
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            {draftsWithIcons.length} agreement{draftsWithIcons.length !== 1 ? "s" : ""} found
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {draftsWithIcons.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
              {draftsWithIcons.map((draft, index) => (
                <div
                  key={draft.name}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <AgreementCard {...draft} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">
                No agreements found matching "{query}"
              </p>
              <a
                href="/"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Back to Home
              </a>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
}

// Server component wrapper
export default async function SearchPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string }>
}) {
  const { getAppData } = await import("@/lib/api");

  const data = await getAppData();
  const params = await searchParams;
  const query = params.q?.toLowerCase() || "";

  // Filter drafts based on search query
  const filteredDrafts = query
    ? data.drafts.filter((draft) =>
        draft.name.toLowerCase().includes(query) ||
        draft.longDescription?.toLowerCase().includes(query) ||
        draft.keyFeatures?.some((feature: string) => feature.toLowerCase().includes(query)) ||
        draft.idealFor?.some((ideal: string) => ideal.toLowerCase().includes(query))
      )
    : data.drafts;

  // Map drafts to use their document images as icons for display
  const draftsWithIcons = filteredDrafts.map((draft) => ({
    ...draft,
    icon: draft.image,
  }));

  return <SearchPageClient data={data} query={query} draftsWithIcons={draftsWithIcons} />;
}
