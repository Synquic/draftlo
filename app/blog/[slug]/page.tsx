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
          className="prose prose-lg prose-gray max-w-none
            prose-headings:font-bold prose-headings:text-gray-900
            prose-h2:text-2xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-3
            prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-blue-800
            prose-p:text-gray-700 prose-p:leading-loose prose-p:mb-7
            prose-ul:my-6 prose-li:text-gray-700 prose-li:mb-3
            prose-strong:text-gray-900
            prose-blockquote:border-l-4 prose-blockquote:border-blue-600
            prose-blockquote:bg-blue-50 prose-blockquote:px-6 prose-blockquote:py-4
            prose-blockquote:rounded-r-lg prose-blockquote:text-gray-700 prose-blockquote:not-italic
            prose-hr:my-10 prose-em:text-gray-500"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />

        {/* CTA */}
        <div className="mt-14 p-8 bg-[hsl(220,30%,12%)] rounded-2xl text-white text-center">
          <h3 className="text-2xl font-bold mb-3">Ready to Update Your Privacy Policy?</h3>
          <p className="text-gray-300 mb-6 max-w-lg mx-auto">
            Draftlo generates DPDP-aligned privacy policies, consent notices, and legal documents in minutes — affordable, plain-language, and built for Indian businesses.
          </p>
          <Link
            href="/agreements/privacy-policy"
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
