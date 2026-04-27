import { Layout } from "@/components/Layout";
import { AgreementCard } from "@/components/AgreementCard";
import { getAppData } from "@/lib/api";
import type { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const data = await getAppData();
  const { id } = await params;
  const categoryPath = `/category/${id}`;
  const category = data.categories.find((cat) => cat.href === categoryPath);
  const categoryName =
    category?.name ||
    id.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  const url = `https://draftlo.com/category/${id}`;

  return {
    title: `${categoryName} India – Download Legal Templates | Draftlo`,
    description:
      category?.description ||
      `Download ready-to-use ${categoryName.toLowerCase()} legal agreements in India. Professionally drafted, legally compliant templates starting at ₹250.`,
    alternates: { canonical: url },
    openGraph: {
      title: `${categoryName} India – Legal Templates | Draftlo`,
      description:
        category?.description ||
        `Ready-to-use ${categoryName.toLowerCase()} legal agreements in India. Starting at ₹250.`,
      url,
      type: "website",
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ id: string }> }) {
  const data = await getAppData();
  const { id } = await params;
  const categoryPath = `/category/${id}`;

  // Find the category by matching the href
  const category = data.categories.find((cat) => cat.href === categoryPath);

  // Filter drafts that belong to this category
  const categoryDrafts = data.drafts.filter((draft) => {
    // Match by href pattern or category name
    return draft.href.includes(id) ||
           category?.name.toLowerCase().includes(draft.name.toLowerCase()) ||
           draft.name.toLowerCase().includes(category?.name.toLowerCase() || '');
  });

  // Map drafts to include their images as icons
  const draftsWithIcons = categoryDrafts.map((draft) => ({
    ...draft,
    icon: draft.image,
  }));

  // Format category name for display
  const categoryName = category?.name || id.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());

  return (
    <Layout data={data}>
      <div className="hero-background py-16">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 animate-fade-in">
            {categoryName}
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            {category?.description || `Browse our collection of ${categoryName.toLowerCase()} templates`}
          </p>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mt-2">
            {draftsWithIcons.length} agreement{draftsWithIcons.length !== 1 ? "s" : ""} available
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
                No agreements found in this category
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
