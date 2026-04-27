'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { FileText, FolderOpen, Menu, LogOut, Eye, DollarSign } from 'lucide-react';
import type { AppData } from '@/lib/api';

export default function AdminDashboard() {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
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

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  if (!isAuthenticated || loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-700">Loading...</div>
      </div>
    );
  }

  const totalRevenue = data?.drafts?.reduce((sum, draft) => sum + (draft.price?.amount || 0), 0) || 0;
  const avgPrice = data?.drafts?.length ? totalRevenue / data.drafts.length : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">D</span>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-sm text-gray-500">Draftlo Content Management</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link
                href="/"
                target="_blank"
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-blue-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Total Drafts</p>
                <p className="text-3xl font-bold text-gray-900">{data?.drafts?.length || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Active documents</p>
              </div>
              <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center">
                <FileText className="w-7 h-7 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-green-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Categories</p>
                <p className="text-3xl font-bold text-gray-900">{data?.categories?.length || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Document categories</p>
              </div>
              <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center">
                <FolderOpen className="w-7 h-7 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-purple-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Menu Items</p>
                <p className="text-3xl font-bold text-gray-900">{data?.menu?.length || 0}</p>
                <p className="text-xs text-gray-500 mt-1">Navigation items</p>
              </div>
              <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center">
                <Menu className="w-7 h-7 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6 border-l-4 border-orange-600">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500 mb-1">Avg. Price</p>
                <p className="text-3xl font-bold text-gray-900">&#8377;{Math.round(avgPrice)}</p>
                <p className="text-xs text-gray-500 mt-1">Per document</p>
              </div>
              <div className="w-14 h-14 bg-orange-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-7 h-7 text-orange-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Link
            href="/admin/drafts"
            className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-lg p-8 text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <FileText className="w-12 h-12" />
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                {data?.drafts?.length || 0}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Manage Drafts</h3>
            <p className="text-blue-100">
              Add, edit, or delete legal document templates
            </p>
          </Link>

          <Link
            href="/admin/categories"
            className="bg-gradient-to-br from-green-600 to-green-700 rounded-xl shadow-lg p-8 text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <FolderOpen className="w-12 h-12" />
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                {data?.categories?.length || 0}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Manage Categories</h3>
            <p className="text-green-100">
              Organize documents into categories
            </p>
          </Link>

          <Link
            href="/admin/menu"
            className="bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl shadow-lg p-8 text-white hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center justify-between mb-4">
              <Menu className="w-12 h-12" />
              <span className="px-3 py-1 bg-white bg-opacity-20 rounded-full text-sm font-medium">
                {data?.menu?.length || 0}
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-2">Manage Menu</h3>
            <p className="text-purple-100">
              Configure navigation menu items
            </p>
          </Link>
        </div>

        {/* Recent Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Drafts */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Recent Drafts</h2>
                <Link
                  href="/admin/drafts"
                  className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                  View All &#8594;
                </Link>
              </div>
            </div>
            <div className="divide-y">
              {data?.drafts?.slice(0, 5).map((draft) => (
                <div key={draft.href} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <img
                        src={draft.image}
                        alt={draft.name}
                        className="w-12 h-12 rounded object-contain bg-gray-100 p-1"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{draft.name}</p>
                        <p className="text-sm text-gray-500">&#8377;{draft.price?.amount}</p>
                      </div>
                    </div>
                    <Link
                      href={draft.href}
                      target="_blank"
                      className="ml-4 p-2 text-gray-400 hover:text-gray-600 transition"
                    >
                      <Eye className="w-5 h-5" />
                    </Link>
                  </div>
                </div>
              ))}
              {(!data?.drafts || data.drafts.length === 0) && (
                <div className="p-8 text-center text-gray-500">
                  No drafts yet. Create your first one!
                </div>
              )}
            </div>
          </div>

          {/* Categories List */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="p-6 border-b bg-gradient-to-r from-green-50 to-emerald-50">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-gray-900">Categories</h2>
                <Link
                  href="/admin/categories"
                  className="text-sm text-green-600 hover:text-green-700 font-medium"
                >
                  Manage &#8594;
                </Link>
              </div>
            </div>
            <div className="divide-y">
              {data?.categories?.map((category) => (
                <div key={category.href} className="p-4 hover:bg-gray-50 transition">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gray-900 rounded-lg flex items-center justify-center flex-shrink-0">
                        <img
                          src={category.icon}
                          alt={category.name}
                          className="w-6 h-6 brightness-0 invert"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{category.name}</p>
                        {category.description && (
                          <p className="text-sm text-gray-500 line-clamp-1">{category.description}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              {(!data?.categories || data.categories.length === 0) && (
                <div className="p-8 text-center text-gray-500">
                  No categories yet. Create your first one!
                </div>
              )}
            </div>
          </div>
        </div>

        {/* System Info */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">System Information</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Platform</p>
              <p className="font-medium text-gray-900">Draftlo CMS</p>
            </div>
            <div>
              <p className="text-gray-500">Version</p>
              <p className="font-medium text-gray-900">2.0.0</p>
            </div>
            <div>
              <p className="text-gray-500">Last Updated</p>
              <p className="font-medium text-gray-900">Just now</p>
            </div>
            <div>
              <p className="text-gray-500">Status</p>
              <p className="font-medium text-green-600 flex items-center">
                <span className="w-2 h-2 bg-green-600 rounded-full mr-2"></span>
                Online
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
