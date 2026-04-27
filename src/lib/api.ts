import type { Draft, MenuItem, Category, Blog } from './schema';

export type AppData = {
  menu: MenuItem[];
  categories: Category[];
  drafts: Draft[];
  blogs: Blog[];
};

export async function getAppData(): Promise<AppData> {
  // Server-side: use localhost so the container can reach its own API
  // (public domain is unreachable from inside Docker)
  // Client-side: use a relative URL
  const isServer = typeof window === 'undefined';
  const baseUrl = isServer ? 'http://localhost:3000' : '';

  try {
    const res = await fetch(`${baseUrl}/api/data`, { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
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
