import { Layout } from "@/components/Layout";
import { CategoryCard } from "@/components/CategoryCard";
import { getAppData } from "@/lib/api";

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export default async function CategoriesPage() {
  const data = await getAppData();

  return (
    <Layout data={data}>
      <div className="hero-background py-16">
        <div className="container mx-auto px-4 relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-gray-900 text-center mb-4 animate-fade-in">
            Browse All Categories
          </h1>
          <p className="text-gray-600 text-center max-w-2xl mx-auto">
            Explore our comprehensive collection of legal document categories. Find the perfect template for your needs.
          </p>
          <p className="text-gray-600 text-center max-w-2xl mx-auto mt-2">
            {data.categories.length} categories available
          </p>
        </div>
      </div>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          {data.categories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
              {data.categories.map((category, index) => (
                <div
                  key={category.name}
                  className="animate-scale-in"
                  style={{ animationDelay: `${index * 0.05}s` }}
                >
                  <CategoryCard {...category} />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg mb-4">
                No categories available at the moment
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

      {/* Additional Info Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h2 className="font-heading text-3xl font-bold text-gray-900 mb-4">
              Why Choose Draftlo?
            </h2>
            <p className="text-gray-600">
              We provide professionally crafted legal document templates across various categories to meet your business and personal needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Legally Compliant</h3>
              <p className="text-gray-600 text-sm">
                All templates are created by legal professionals and comply with Indian laws
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Instant Access</h3>
              <p className="text-gray-600 text-sm">
                Get your standardised documents immediately after purchase, ready to use
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Affordable Pricing</h3>
              <p className="text-gray-600 text-sm">
                Professional legal documents at a fraction of traditional legal costs
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
