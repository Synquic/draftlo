import fs from 'fs';
import path from 'path';
import type { AppData } from './api';

/**
 * Server-only: reads app-data.json directly from disk.
 * Use this in Server Components instead of getAppData() to avoid
 * the Docker container trying to HTTP-fetch its own public domain.
 */
export function getAppDataServer(): AppData {
  try {
    const dataFile = path.join(process.cwd(), 'data', 'app-data.json');
    const fileContent = fs.readFileSync(dataFile, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Failed to read app-data.json:', error);
    return { menu: [], categories: [], drafts: [], blogs: [] };
  }
}
