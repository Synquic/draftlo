import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Layout } from '@/components/Layout';
import { getAppDataServer } from '@/lib/api-server';

export const dynamic = 'force-dynamic';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const data = getAppDataServer();
  const blog = (data.blogs || []).find((b) => b.slug === slug);
  if (!blog) return {};
  return {
    title: `${blog.title} | Draftlo Blog`,
    description: blog.metaDescription,
    openGraph: {
      title: blog.title,
      description: blog.metaDescription,
      type: 'article',
      publishedTime: blog.publishedAt,
      authors: [blog.author],
    },
  };
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const data = getAppDataServer();
  const blog = (data.blogs || []).find((b) => b.slug === slug);

  if (!blog) notFound();

  return (
    <Layout data={data}>
      <style>{`
        .blog-content p {
          margin-bottom: 2rem;
          line-height: 1.9;
          color: #374151;
          font-size: 1.0625rem;
        }
        .blog-content h2 {
          font-size: 1.5rem;
          font-weight: 700;
          color: #111827;
          margin-top: 3.5rem;
          margin-bottom: 1.25rem;
          padding-bottom: 0.75rem;
          border-bottom: 1px solid #e5e7eb;
        }
        .blog-content h3 {
          font-size: 1.2rem;
          font-weight: 600;
          color: #1e40af;
          margin-top: 2.5rem;
          margin-bottom: 1rem;
        }
        .blog-content ul {
          margin: 1.5rem 0 2rem 0;
          padding-left: 1.75rem;
          list-style-type: disc;
        }
        .blog-content li {
          margin-bottom: 0.75rem;
          line-height: 1.75;
          color: #374151;
        }
        .blog-content strong { color: #111827; font-weight: 600; }
        .blog-content blockquote {
          border-left: 4px solid #2563eb;
          background: #eff6ff;
          padding: 1rem 1.5rem;
          border-radius: 0 0.5rem 0.5rem 0;
          margin: 2rem 0;
          color: #374151;
        }
        .blog-content hr { margin: 2.5rem 0; border-color: #e5e7eb; }
      `}</style>

      {/* Top nav breadcrumb */}
      <div className="bg-gray-50 border-b border-gray-200 px-4 py-3 text-sm text-gray-500">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="hover:text-blue-700">Home</Link>
          {' / '}
          <Link href="/blog" className="hover:text-blue-700">Blog</Link>
          {' / '}
          <span className="text-gray-700 line-clamp-1">{blog.title}</span>
        </div>
      </div>

      {/* Article */}
      <article className="max-w-3xl mx-auto px-4 py-12">
        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-5">
          {(blog.tags || []).map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium px-3 py-1 rounded-full bg-blue-50 text-blue-700"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-5">
          {blog.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-3 text-sm text-gray-400 mb-10 pb-6 border-b border-gray-200">
          <span>By <span className="font-medium text-gray-600">{blog.author}</span></span>
          <span>·</span>
          <time dateTime={blog.publishedAt}>{formatDate(blog.publishedAt)}</time>
        </div>

        {/* Content */}
        <div
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* CTA */}
        <div className="mt-14 p-8 bg-[hsl(220,30%,12%)] rounded-2xl text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to Update Your Privacy Policy?</h3>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">
            Draftlo generates DPDP-aligned privacy policies, consent notices, and legal documents in minutes — affordable, plain-language, and built for Indian businesses.
          </p>
          <Link
            href="/agreements/privacy-policy-dpdp"
            className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors"
          >
            Get Your Privacy Policy →
          </Link>
        </div>

        {/* Back link */}
        <div className="mt-10 text-center">
          <Link href="/blog" className="text-sm text-gray-400 hover:text-blue-700 transition-colors">
            ← Back to all articles
          </Link>
        </div>
      </article>
    </Layout>
  );
}
