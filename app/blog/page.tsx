import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { getAppData } from '@/lib/api';

export const dynamic = 'force-dynamic';
export const revalidate = 60;

export const metadata = {
  title: 'Blog | Draftlo — Legal Insights for Indian Businesses',
  description: 'Expert articles on DPDP Act 2023, DPDP Rules 2025, privacy policy compliance, and legal document drafting for Indian businesses.',
};

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogListPage() {
  const data = await getAppData();
  const blogs = (data.blogs || []).slice().sort(
    (a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );

  return (
    <Layout data={data}>
      {/* Hero */}
      <section className="bg-[hsl(220,30%,12%)] text-white py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Draftlo Blog</h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Legal insights, compliance guides, and plain-language breakdowns of Indian law — for founders, operators, and teams.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="max-w-4xl mx-auto px-4 py-14">
        {blogs.length === 0 ? (
          <p className="text-center text-gray-500 text-lg py-20">No posts yet. Check back soon.</p>
        ) : (
          <div className="space-y-8">
            {blogs.map((blog) => (
              <article
                key={blog.slug}
                className="border border-gray-200 rounded-xl p-7 hover:shadow-md transition-shadow bg-white"
              >
                <div className="flex flex-wrap gap-2 mb-3">
                  {(blog.tags || []).slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 leading-snug">
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="hover:text-blue-700 transition-colors"
                  >
                    {blog.title}
                  </Link>
                </h2>
                <p className="text-gray-600 mb-4 leading-relaxed">{blog.metaDescription}</p>
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-400">
                    By <span className="font-medium text-gray-600">{blog.author}</span>
                    {' · '}
                    {formatDate(blog.publishedAt)}
                  </div>
                  <Link
                    href={`/blog/${blog.slug}`}
                    className="text-sm font-semibold text-blue-700 hover:underline"
                  >
                    Read more →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
