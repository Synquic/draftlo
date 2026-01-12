'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react';
import { ImageUpload } from '@/components/admin/ImageUpload';
import type { AppData } from '@/lib/api';
import type { Category } from '@/lib/schema';

// Disable static generation for admin pages
export const dynamic = 'force-dynamic';

export default function CategoriesEditor() {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<Category | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    setIsAuthenticated(true);
    fetchData();
  }, [router]);

  const fetchData = async () => {
    try {
      const res = await fetch('/api/data');
      const jsonData = await res.json();
      setData(jsonData);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async () => {
    if (!data) return;

    setSaving(true);
    try {
      const res = await fetch('/api/data', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert('Categories saved successfully!');
        setEditingIndex(null);
        setEditingItem(null);
      } else {
        alert('Failed to save categories');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save categories');
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = () => {
    setEditingIndex(-1);
    setEditingItem({ name: '', href: '', icon: '', description: '' });
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditingItem({ ...data!.categories[index] });
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this category?')) {
      const newCategories = [...data!.categories];
      newCategories.splice(index, 1);
      setData({ ...data!, categories: newCategories });
    }
  };

  const handleSaveItem = () => {
    if (!editingItem || !data) return;

    // Validation
    if (!editingItem.name.trim()) {
      alert('Category name is required');
      return;
    }
    if (!editingItem.href.trim()) {
      alert('Category link is required');
      return;
    }
    if (!editingItem.icon.trim()) {
      alert('Category icon is required. Please upload an image.');
      return;
    }

    const newCategories = [...data.categories];

    if (editingIndex === -1) {
      newCategories.push(editingItem);
    } else if (editingIndex !== null) {
      newCategories[editingIndex] = editingItem;
    }

    setData({ ...data, categories: newCategories });
    setEditingIndex(null);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditingItem(null);
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-+|-+$/g, '');
  };

  const handleNameChange = (name: string) => {
    setEditingItem({
      ...editingItem!,
      name,
      href: `/category/${generateSlug(name)}`,
    });
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-semibold">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900">
                ← Back
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Categories Editor</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Category
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Schema Info */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h3 className="font-semibold text-blue-900 mb-2">📘 Schema Guide</h3>
          <ul className="text-sm text-blue-800 space-y-1">
            <li>• <strong>Name</strong>: Category display name (required)</li>
            <li>• <strong>Link</strong>: Auto-generated from name as /category/slug (required)</li>
            <li>• <strong>Icon</strong>: Category icon image - use image upload (required)</li>
            <li>• <strong>Description</strong>: Brief description of the category (optional)</li>
          </ul>
          <p className="text-xs text-blue-700 mt-2">
            Recommended icon size: 512x512px square
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.categories.map((category, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              {editingIndex === index ? (
                /* Edit Form */
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={editingItem?.name || ''}
                      onChange={(e) => handleNameChange(e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Rental Agreements"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link (auto-generated)
                    </label>
                    <input
                      type="text"
                      value={editingItem?.href || ''}
                      disabled
                      className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-900 cursor-not-allowed"
                      placeholder="/category/rental-agreements"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Auto-filled when you enter the name
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Description
                    </label>
                    <textarea
                      value={editingItem?.description || ''}
                      onChange={(e) => setEditingItem({ ...editingItem!, description: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Brief description of the category"
                      rows={3}
                    />
                  </div>

                  <ImageUpload
                    label="Icon *"
                    value={editingItem?.icon}
                    onChange={(url) => setEditingItem({ ...editingItem!, icon: url })}
                    helperText="Upload a square icon (recommended 512x512px)"
                  />

                  <div className="flex gap-2 pt-4 border-t">
                    <button
                      onClick={handleSaveItem}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                /* Display View */
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEdit(index)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit2 className="w-5 h-5" />
                      </button>
                      <button
                        onClick={() => handleDelete(index)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>

                  <div className="mb-3">
                    <img
                      src={category.icon}
                      alt={category.name}
                      className="w-full h-32 object-contain bg-gray-900 rounded-lg"
                    />
                  </div>

                  {category.description && (
                    <p className="text-sm text-gray-600 mb-2">
                      {category.description}
                    </p>
                  )}

                  <p className="text-sm text-gray-600">
                    <strong>Link:</strong> {category.href}
                  </p>
                </div>
              )}
            </div>
          ))}

          {/* New Category Form */}
          {editingIndex === -1 && editingItem && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">New Category</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={editingItem?.name || ''}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Rental Agreements"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link (auto-generated)
                  </label>
                  <input
                    type="text"
                    value={editingItem?.href || ''}
                    disabled
                    className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-900 cursor-not-allowed"
                    placeholder="/category/rental-agreements"
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Auto-filled when you enter the name
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={editingItem?.description || ''}
                    onChange={(e) => setEditingItem({ ...editingItem!, description: e.target.value })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Brief description of the category"
                    rows={3}
                  />
                </div>

                <ImageUpload
                  label="Icon *"
                  value={editingItem?.icon}
                  onChange={(url) => setEditingItem({ ...editingItem!, icon: url })}
                  helperText="Upload a square icon (recommended 512x512px)"
                />

                <div className="flex gap-2 pt-4 border-t">
                  <button
                    onClick={handleSaveItem}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Add Category
                  </button>
                  <button
                    onClick={handleCancel}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition flex items-center gap-2"
                  >
                    <X className="w-4 h-4" />
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
