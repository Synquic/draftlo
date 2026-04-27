import type { Draft, MenuItem, Category, Blog } from './schema';
import fs from 'fs';
import path from 'path';

export type AppData = {
  menu: MenuItem[];
  categories: Category[];
  drafts: Draft[];
  blogs: Blog[];
};

export async function getAppData(): Promise<AppData> {
  // Server-side: read the file directly — avoids Docker container
  // trying to reach its own public domain via HTTP, which fails silently
  if (typeof window === 'undefined') {
    try {
      const dataFile = path.join(process.cwd(), 'data', 'app-data.json');
      const fileContent = fs.readFileSync(dataFile, 'utf-8');
      return JSON.parse(fileContent);
    } catch (error) {
      console.error('Failed to read app data from file:', error);
      return { menu: [], categories: [], drafts: [], blogs: [] };
    }
  }

  // Client-side: fetch from the API route
  try {
    const res = await fetch('/api/data', { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch: ' + res.status);
    return await res.json();
  } catch (error) {
    console.error('Failed to fetch app data:', error);
    return { menu: [], categories: [], drafts: [], blogs: [] };
  }
}

// Function to update app data (for admin portal)
export async function updateAppData(data: AppData): Promise<{ success: boolean; message: string }> {
  const res = await fetch('/api/data', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error('Failed to update data');
  return res.json();
}
