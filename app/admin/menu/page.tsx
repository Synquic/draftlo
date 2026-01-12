'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, Edit2, Trash2, Save, X, ChevronDown, ChevronUp } from 'lucide-react';
import type { AppData } from '@/lib/api';
import type { MenuItem } from '@/lib/schema';

export default function MenuEditor() {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
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
        alert('Menu saved successfully!');
        setEditingIndex(null);
        setEditingItem(null);
      } else {
        alert('Failed to save menu');
      }
    } catch (error) {
      console.error('Save error:', error);
      alert('Failed to save menu');
    } finally {
      setSaving(false);
    }
  };

  const handleAdd = () => {
    setEditingIndex(-1); // -1 indicates new item
    setEditingItem({ name: '', href: '' });
  };

  const handleEdit = (index: number) => {
    setEditingIndex(index);
    setEditingItem({ ...data!.menu[index] });
  };

  const handleDelete = (index: number) => {
    if (confirm('Are you sure you want to delete this menu item?')) {
      const newMenu = [...data!.menu];
      newMenu.splice(index, 1);
      setData({ ...data!, menu: newMenu });
    }
  };

  const handleSaveItem = () => {
    if (!editingItem || !data) return;

    const newMenu = [...data.menu];

    if (editingIndex === -1) {
      // Adding new item
      newMenu.push(editingItem);
    } else if (editingIndex !== null) {
      // Editing existing item
      newMenu[editingIndex] = editingItem;
    }

    setData({ ...data, menu: newMenu });
    setEditingIndex(null);
    setEditingItem(null);
  };

  const handleCancel = () => {
    setEditingIndex(null);
    setEditingItem(null);
  };

  const addSubItem = () => {
    if (!editingItem) return;

    const newSubItem = { name: '', href: '' };
    const updatedItem = {
      ...editingItem,
      items: [...(editingItem.items || []), newSubItem],
    };
    // Remove href if adding subitems
    delete updatedItem.href;
    setEditingItem(updatedItem);
  };

  const updateSubItem = (index: number, field: 'name' | 'href', value: string) => {
    if (!editingItem?.items) return;

    const newItems = [...editingItem.items];
    newItems[index] = { ...newItems[index], [field]: value };
    setEditingItem({ ...editingItem, items: newItems });
  };

  const deleteSubItem = (index: number) => {
    if (!editingItem?.items) return;

    const newItems = [...editingItem.items];
    newItems.splice(index, 1);

    if (newItems.length === 0) {
      // If no subitems left, convert back to regular menu item
      const { items, ...rest } = editingItem;
      setEditingItem({ ...rest, href: '' });
    } else {
      setEditingItem({ ...editingItem, items: newItems });
    }
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
              <h1 className="text-2xl font-bold text-gray-900">Menu Editor</h1>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={handleAdd}
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Menu Item
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
            <li>• <strong>Name</strong>: Menu item display name (required)</li>
            <li>• <strong>Link (href)</strong>: URL for direct link (leave empty for dropdown menus)</li>
            <li>• <strong>Sub-items</strong>: Add dropdown menu items (each needs name and link)</li>
          </ul>
          <p className="text-xs text-blue-700 mt-2">
            See full documentation in <Link href="/SCHEMA.md" className="underline">SCHEMA.md</Link>
          </p>
        </div>

        {/* Menu Items List */}
        <div className="space-y-4">
          {data?.menu.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow p-6">
              {editingIndex === index ? (
                /* Edit Form */
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Name *
                      </label>
                      <input
                        type="text"
                        value={editingItem?.name || ''}
                        onChange={(e) => setEditingItem({ ...editingItem!, name: e.target.value })}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., Home, About"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Link (href) {editingItem?.items && editingItem.items.length > 0 ? '(disabled for dropdowns)' : ''}
                      </label>
                      <input
                        type="text"
                        value={editingItem?.href || ''}
                        onChange={(e) => setEditingItem({ ...editingItem!, href: e.target.value })}
                        disabled={editingItem?.items && editingItem.items.length > 0}
                        className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                        placeholder="/about"
                      />
                    </div>
                  </div>

                  {/* Sub-items */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-sm font-medium text-gray-700">
                        Sub-menu Items (for dropdowns)
                      </label>
                      <button
                        onClick={addSubItem}
                        className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                      >
                        <Plus className="w-4 h-4" />
                        Add Sub-item
                      </button>
                    </div>

                    {editingItem?.items && editingItem.items.length > 0 && (
                      <div className="space-y-2 pl-4 border-l-2 border-gray-300">
                        {editingItem.items.map((subItem, subIndex) => (
                          <div key={subIndex} className="grid grid-cols-2 gap-2">
                            <input
                              type="text"
                              value={subItem.name}
                              onChange={(e) => updateSubItem(subIndex, 'name', e.target.value)}
                              className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="Sub-item name"
                            />
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={subItem.href}
                                onChange={(e) => updateSubItem(subIndex, 'href', e.target.value)}
                                className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                placeholder="/link"
                              />
                              <button
                                onClick={() => deleteSubItem(subIndex)}
                                className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-4 border-t">
                    <button
                      onClick={handleSaveItem}
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Item
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
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
                    {item.href && (
                      <p className="text-sm text-gray-600 mt-1">Link: {item.href}</p>
                    )}
                    {item.items && item.items.length > 0 && (
                      <div className="mt-3 pl-4 border-l-2 border-gray-300">
                        <p className="text-sm font-medium text-gray-700 mb-2">
                          {item.items.length} sub-items:
                        </p>
                        {item.items.map((subItem, subIndex) => (
                          <div key={subIndex} className="text-sm text-gray-600 mb-1">
                            • {subItem.name} → {subItem.href}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
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
              )}
            </div>
          ))}

          {/* New Item Form */}
          {editingIndex === -1 && editingItem && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold mb-4">New Menu Item</h3>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      value={editingItem?.name || ''}
                      onChange={(e) => setEditingItem({ ...editingItem!, name: e.target.value })}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="e.g., Home, About"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Link (href)
                    </label>
                    <input
                      type="text"
                      value={editingItem?.href || ''}
                      onChange={(e) => setEditingItem({ ...editingItem!, href: e.target.value })}
                      disabled={editingItem?.items && editingItem.items.length > 0}
                      className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100"
                      placeholder="/about"
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium text-gray-700">
                      Sub-menu Items
                    </label>
                    <button
                      onClick={addSubItem}
                      className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" />
                      Add Sub-item
                    </button>
                  </div>

                  {editingItem?.items && editingItem.items.length > 0 && (
                    <div className="space-y-2 pl-4 border-l-2 border-gray-300">
                      {editingItem.items.map((subItem, subIndex) => (
                        <div key={subIndex} className="grid grid-cols-2 gap-2">
                          <input
                            type="text"
                            value={subItem.name}
                            onChange={(e) => updateSubItem(subIndex, 'name', e.target.value)}
                            className="px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Sub-item name"
                          />
                          <div className="flex gap-2">
                            <input
                              type="text"
                              value={subItem.href}
                              onChange={(e) => updateSubItem(subIndex, 'href', e.target.value)}
                              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              placeholder="/link"
                            />
                            <button
                              onClick={() => deleteSubItem(subIndex)}
                              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex gap-2 pt-4 border-t">
                  <button
                    onClick={handleSaveItem}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
                  >
                    <Save className="w-4 h-4" />
                    Add Item
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
