'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Save, X, Eye, ArrowLeft } from 'lucide-react';
import type { AppData } from '@/lib/api';
import type { Blog } from '@/lib/schema';

const emptyBlog = (): Blog => ({
  slug: '',
  title: '',
  metaDescription: '',
  publishedAt: new Date().toISOString().split('T')[0],
  author: 'Draftlo Team',
  tags: [],
  content: '',
});

export default function BlogsManagement() {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<Blog | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [tagsInput, setTagsInput] = useState('');
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) { router.push('/admin/login'); return; }
    setIsAuthenticated(true);
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/data');
      const jsonData = await res.json();
      if (!jsonData.blogs) jsonData.blogs = [];
      setData(jsonData);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  const persist = async (updated: AppData) => {
    setSaving(true);
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updated),
      });
      if (res.ok) { await fetchData(); }
      else { alert('Failed to save'); }
    } catch (e) { alert('Failed to save'); }
    finally { setSaving(false); }
  };

  const handleAdd = () => {
    setEditingIndex(-1);
    const b = emptyBlog();
    setEditingItem(b);
    setTagsInput('');
    setShowModal(true);
  };

  const handleEdit = (i: number) => {
    setEditingIndex(i);
    const b = JSON.parse(JSON.stringify(data!.blogs[i]));
    setEditingItem(b);
    setTagsInput((b.tags || []).join(', '));
    setShowModal(true);
  };

  const handleDelete = async (i: number) => {
    if (!confirm('Delete this post?')) return;
    const updated = { ...data!, blogs: data!.blogs.filter((_, idx) => idx !== i) };
    setData(updated);
    await persist(updated);
  };

  const handleSaveItem = async () => {
    if (!editingItem || !data) return;
    const item = {
      ...editingItem,
      tags: tagsInput.split(',').map(t => t.trim()).filter(Boolean),
    };
    let newBlogs: Blog[];
    if (editingIndex === -1) {
      newBlogs = [...data.blogs, item];
    } else {
      newBlogs = data.blogs.map((b, i) => i === editingIndex ? item : b);
    }
    const updated = { ...data, blogs: newBlogs };
    setData(updated);
    setShowModal(false);
    await persist(updated);
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  const blogs = data?.blogs || [];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-gray-500 hover:text-gray-800 transition">
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Manage Blog</h1>
              <p className="text-sm text-gray-500">{blogs.length} post{blogs.length !== 1 ? 's' : ''}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Link href="/blog" target="_blank"
              className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-2 text-sm">
              <Eye className="w-4 h-4" /> View Blog
            </Link>
            <button onClick={handleAdd}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 text-sm">
              <Plus className="w-4 h-4" /> New Post
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {blogs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm p-16 text-center">
            <p className="text-gray-400 text-lg mb-4">No blog posts yet.</p>
            <button onClick={handleAdd}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
              Create your first post
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {blogs.map((blog, i) => (
              <div key={blog.slug} className="bg-white rounded-xl shadow-sm p-6 flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 text-lg leading-snug mb-1">{blog.title}</h3>
                  <p className="text-sm text-gray-500 line-clamp-2 mb-2">{blog.metaDescription}</p>
                  <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400">
                    <span>{blog.author}</span>
                    <span>·</span>
                    <span>{new Date(blog.publishedAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    {(blog.tags || []).slice(0, 3).map(tag => (
                      <span key={tag} className="px-2 py-0.5 bg-blue-50 text-blue-600 rounded-full">{tag}</span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link href={`/blog/${blog.slug}`} target="_blank"
                    className="p-2 text-gray-400 hover:text-blue-600 transition" title="View post">
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button onClick={() => handleEdit(i)}
                    className="p-2 text-gray-400 hover:text-blue-600 transition" title="Edit">
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(i)}
                    className="p-2 text-gray-400 hover:text-red-600 transition" title="Delete">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal */}
      {showModal && editingItem && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-start justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-3xl my-8">
            <div className="flex items-center justify-between p-6 border-b">
              <h2 className="text-xl font-bold text-gray-900">
                {editingIndex === -1 ? 'New Blog Post' : 'Edit Blog Post'}
              </h2>
              <button onClick={() => setShowModal(false)}
                className="p-2 text-gray-400 hover:text-gray-600 transition">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                <input
                  value={editingItem.title}
                  onChange={e => setEditingItem({ ...editingItem, title: e.target.value })}
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Blog post title"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  URL Slug * <span className="text-gray-400 font-normal">(e.g. dpdp-act-privacy-policy)</span>
                </label>
                <input
                  value={editingItem.slug}
                  onChange={e => setEditingItem({ ...editingItem, slug: e.target.value.toLowerCase().replace(/\s+/g, '-') })}
                  className="w-full border rounded-lg px-4 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="url-friendly-slug"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Meta Description *</label>
                <textarea
                  value={editingItem.metaDescription}
                  onChange={e => setEditingItem({ ...editingItem, metaDescription: e.target.value })}
                  rows={2}
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="SEO meta description (under 160 characters)"
                />
                <p className="text-xs text-gray-400 mt-1">{editingItem.metaDescription.length}/160 characters</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                  <input
                    value={editingItem.author}
                    onChange={e => setEditingItem({ ...editingItem, author: e.target.value })}
                    className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Published Date</label>
                  <input
                    type="date"
                    value={editingItem.publishedAt}
                    onChange={e => setEditingItem({ ...editingItem, publishedAt: e.target.value })}
                    className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tags <span className="text-gray-400 font-normal">(comma-separated)</span>
                </label>
                <input
                  value={tagsInput}
                  onChange={e => setTagsInput(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="DPDP Act 2023, privacy policy, India"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Content <span className="text-gray-400 font-normal">(HTML)</span>
                </label>
                <textarea
                  value={editingItem.content}
                  onChange={e => setEditingItem({ ...editingItem, content: e.target.value })}
                  rows={14}
                  className="w-full border rounded-lg px-4 py-2 text-sm font-mono focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="<p>Post content in HTML...</p>"
                />
              </div>
            </div>

            <div className="flex justify-end gap-3 p-6 border-t bg-gray-50 rounded-b-2xl">
              <button onClick={() => setShowModal(false)}
                className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 transition text-sm">
                Cancel
              </button>
              <button
                onClick={handleSaveItem}
                disabled={saving || !editingItem.title || !editingItem.slug}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition disabled:opacity-50 flex items-center gap-2 text-sm"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving…' : 'Save Post'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
