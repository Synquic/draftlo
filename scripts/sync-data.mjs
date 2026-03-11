import { writeFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUTPUT = join(__dirname, '../data/app-data.json');
const URL = 'https://draftlo.com/api/data';

console.log('Fetching app data from', URL);

const res = await fetch(URL);
if (!res.ok) throw new Error(`Failed: ${res.status} ${res.statusText}`);

const data = await res.json();
writeFileSync(OUTPUT, JSON.stringify(data, null, 2));

console.log(`Done — menu: ${data.menu?.length}, categories: ${data.categories?.length}, drafts: ${data.drafts?.length}`);
