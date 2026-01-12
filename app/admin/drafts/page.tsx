'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Save, X, Search, Eye } from 'lucide-react';
import { ImageUpload } from '@/components/admin/ImageUpload';
import type { AppData } from '@/lib/api';
import type { Draft } from '@/lib/schema';

export default function DraftsManagement() {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<Draft | null>(null);
  const [showModal, setShowModal] = useState(false);
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
        alert('Drafts saved successfully!');
        await fetchData();
      } else {
        alert('Failed to save drafts');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save drafts');
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = () => {
    setEditingIndex(-1);
    setEditingItem({
      name: '',
      href: '',
      image: '',
      longDescription: '',
      keyFeatures: [''],
      idealFor: [''],
      keyDifferentiators: [''],
      tableOfContents: [''],
      disclaimer: 'This agreement does not constitute legal advice or legal services of any kind. This is merely a first draft provided for your ease. Please consult a lawyer before you finalise the draft.',
      price: {
        amount: 0,
        ctaLink: ''
      }
    });
    setShowModal(true);
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    const draft = data!.drafts[index];
    setEditingItem({
      ...JSON.parse(JSON.stringify(draft)),
      keyDifferentiators: draft.keyDifferentiators || [],
      tableOfContents: draft.tableOfContents || [],
      disclaimer: draft.disclaimer || 'This agreement does not constitute legal advice or legal services of any kind. This is merely a first draft provided for your ease. Please consult a lawyer before you finalise the draft.',
      keyFeatures: draft.keyFeatures || [],
      idealFor: draft.idealFor || [],
      longDescription: draft.longDescription || '',
    });
    setShowModal(true);
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this draft?')) {
      const newDrafts = [...data!.drafts];
      newDrafts.splice(index, 1);
      setData({ ...data!, drafts: newDrafts });
    }
  };

  const handleSaveItem = () => {
    if (!editingItem || !data) return;

    // Validation
    if (!editingItem.name.trim()) {
      alert('Draft name is required');
      return;
    }
    if (!editingItem.href.trim()) {
      alert('Draft link is required');
      return;
    }
    if (!editingItem.image.trim()) {
      alert('Draft image is required');
      return;
    }
    if (!editingItem.price.amount || editingItem.price.amount <= 0) {
      alert('Valid price is required');
      return;
    }
    if (!editingItem.price.ctaLink.trim()) {
      alert('CTA Link is required');
      return;
    }

    const newDrafts = [...data.drafts];

    if (editingIndex === -1) {
      newDrafts.push(editingItem);
    } else if (editingIndex !== null) {
      newDrafts[editingIndex] = editingItem;
    }

    setData({ ...data, drafts: newDrafts });
    setShowModal(false);
    setEditingIndex(null);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setShowModal(false);
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
      href: `/agreements/${generateSlug(name)}`,
    });
  };

  const addArrayItem = (field: 'keyFeatures' | 'idealFor' | 'keyDifferentiators' | 'tableOfContents') => {
    setEditingItem({
      ...editingItem!,
      [field]: [...(editingItem![field] || []), '']
    });
  };

  const updateArrayItem = (field: 'keyFeatures' | 'idealFor' | 'keyDifferentiators' | 'tableOfContents', index: number, value: string) => {
    const newArray = [...(editingItem![field] || [])];
    newArray[index] = value;
    setEditingItem({
      ...editingItem!,
      [field]: newArray
    });
  };

  const removeArrayItem = (field: 'keyFeatures' | 'idealFor' | 'keyDifferentiators' | 'tableOfContents', index: number) => {
    const newArray = [...(editingItem![field] || [])];
    newArray.splice(index, 1);
    setEditingItem({
      ...editingItem!,
      [field]: newArray
    });
  };

  const filteredDrafts = data?.drafts?.filter(draft =>
    draft.name.toLowerCase().includes(searchTerm.toLowerCase())
  ) || [];

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin" className="text-gray-600 hover:text-gray-900 transition">
                ← Back
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Manage Drafts</h1>
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {filteredDrafts.length} {filteredDrafts.length === 1 ? 'draft' : 'drafts'}
              </span>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2 shadow-sm"
              >
                <Plus className="w-4 h-4" />
                Add New Draft
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 shadow-sm disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                {saving ? 'Saving...' : 'Save All Changes'}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Search Bar */}
        <div className="bg-white rounded-xl shadow-sm p-4 mb-6">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search drafts by name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Drafts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDrafts.map((draft, index) => (
            <div key={draft.href} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              {/* Image */}
              <div className="h-48 bg-gray-100 overflow-hidden">
                <img
                  src={draft.image}
                  alt={draft.name}
                  className="w-full h-full object-contain p-4"
                />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">{draft.name}</h3>
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{draft.longDescription}</p>

                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-xs text-gray-500">Price</p>
                    <p className="text-lg font-bold text-gray-900">₹{draft.price?.amount}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Features</p>
                    <p className="text-lg font-semibold text-blue-600">{draft.keyFeatures?.length || 0}</p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-2 pt-4 border-t">
                  <button
                    onClick={() => handleEdit(data.drafts.indexOf(draft))}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center justify-center gap-2 text-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <Link
                    href={draft.href}
                    target="_blank"
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center justify-center"
                  >
                    <Eye className="w-4 h-4" />
                  </Link>
                  <button
                    onClick={() => handleDelete(data.drafts.indexOf(draft))}
                    className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition flex items-center justify-center"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredDrafts.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm p-12 text-center">
            <p className="text-gray-500 text-lg">No drafts found matching "{searchTerm}"</p>
          </div>
        )}
      </main>

      {/* Edit/Add Modal */}
      {showModal && editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full my-8 max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between z-10">
              <h2 className="text-2xl font-bold text-gray-900">
                {editingIndex === -1 ? 'Add New Draft' : 'Edit Draft'}
              </h2>
              <button
                onClick={handleCancel}
                className="p-2 text-gray-400 hover:text-gray-600 transition"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 space-y-6">
              {/* Basic Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={editingItem.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Rental Agreement"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Link (auto-generated)
                  </label>
                  <input
                    type="text"
                    value={editingItem.href}
                    disabled
                    className="w-full px-4 py-2 border rounded-lg bg-gray-100 text-gray-900"
                  />
                </div>
              </div>

              {/* Price */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Price (₹) *
                  </label>
                  <input
                    type="number"
                    value={editingItem.price.amount}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      price: { ...editingItem.price, amount: parseFloat(e.target.value) || 0 }
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 999"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    CTA Link (Zoho Form) *
                  </label>
                  <input
                    type="url"
                    value={editingItem.price.ctaLink}
                    onChange={(e) => setEditingItem({
                      ...editingItem,
                      price: { ...editingItem.price, ctaLink: e.target.value }
                    })}
                    className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="https://forms.zohopublic.in/..."
                  />
                </div>
              </div>

              {/* Image Upload */}
              <ImageUpload
                label="Document Image *"
                value={editingItem.image}
                onChange={(url) => setEditingItem({ ...editingItem, image: url })}
                helperText="Upload document preview (recommended 1200x800px)"
              />

              {/* Descriptions */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Short Description
                </label>
                <input
                  type="text"
                  value={editingItem.description || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Brief one-line description"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Long Description *
                </label>
                <textarea
                  value={editingItem.longDescription}
                  onChange={(e) => setEditingItem({ ...editingItem, longDescription: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Detailed description of the document"
                  rows={4}
                />
              </div>

              {/* Key Features */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Features *
                </label>
                {(editingItem.keyFeatures || []).map((feature, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={feature}
                      onChange={(e) => updateArrayItem('keyFeatures', idx, e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Feature description"
                    />
                    <button
                      onClick={() => removeArrayItem('keyFeatures', idx)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('keyFeatures')}
                  className="mt-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Feature
                </button>
              </div>

              {/* Ideal For */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ideal For *
                </label>
                {(editingItem.idealFor || []).map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateArrayItem('idealFor', idx, e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Target audience"
                    />
                    <button
                      onClick={() => removeArrayItem('idealFor', idx)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('idealFor')}
                  className="mt-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Item
                </button>
              </div>

              {/* Note */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Note (Optional)
                </label>
                <textarea
                  value={editingItem.Note || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, Note: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Special note or important information"
                  rows={2}
                />
              </div>

              {/* Disclaimer */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Disclaimer (Optional)
                </label>
                <textarea
                  value={editingItem.disclaimer || ''}
                  onChange={(e) => setEditingItem({ ...editingItem, disclaimer: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Legal disclaimer"
                  rows={2}
                />
              </div>

              {/* Key Differentiators */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Key Differentiators (Optional)
                </label>
                {(editingItem.keyDifferentiators || []).map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateArrayItem('keyDifferentiators', idx, e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="What makes this unique?"
                    />
                    <button
                      onClick={() => removeArrayItem('keyDifferentiators', idx)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('keyDifferentiators')}
                  className="mt-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Differentiator
                </button>
              </div>

              {/* Table of Contents */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Table of Contents (Optional)
                </label>
                {(editingItem.tableOfContents || []).map((item, idx) => (
                  <div key={idx} className="flex gap-2 mb-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => updateArrayItem('tableOfContents', idx, e.target.value)}
                      className="flex-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Section name"
                    />
                    <button
                      onClick={() => removeArrayItem('tableOfContents', idx)}
                      className="px-3 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => addArrayItem('tableOfContents')}
                  className="mt-2 px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center gap-2 text-sm"
                >
                  <Plus className="w-4 h-4" />
                  Add Section
                </button>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex items-center justify-end gap-3">
              <button
                onClick={handleCancel}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveItem}
                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
              >
                <Save className="w-4 h-4" />
                {editingIndex === -1 ? 'Add Draft' : 'Save Changes'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
