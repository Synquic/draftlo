import type { Draft, MenuItem, Category, Blog } from './schema';

export type AppData = {
  menu: MenuItem[];
  categories: Category[];
  drafts: Draft[];
  blogs: Blog[];
};

export async function getAppData(): Promise<AppData> {
  if (typeof window === 'undefined' && process.env.NODE_ENV === 'production' && !process.env.NEXT_PUBLIC_BASE_URL) {
    return { menu: [], categories: [], drafts: [], blogs: [] };
  }

  const isServer = typeof window === 'undefined';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || (isServer ? 'http://localhost:3000' : '');

  try {
    const res = await fetch(`${baseUrl}/api/data`, {
      next: { revalidate: 60 },
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch');
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch app data:', error);
    return { menu: [], categories: [], drafts: [], blogs: [] };
  }
}

export async function updateAppData(data: AppData): Promise<{ success: boolean; message: string }> {
  const res = await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update data');
  return res.json();
}
