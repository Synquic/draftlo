import { MetadataRoute } from "next";
import fs from "fs";
import path from "path";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let categories: { href: string }[] = [];
  let drafts: { href: string }[] = [];

  try {
    const DATA_FILE = path.join(process.cwd(), "data", "app-data.json");
    const fileContent = fs.readFileSync(DATA_FILE, "utf-8");
    const data = JSON.parse(fileContent);
    categories = data.categories || [];
    drafts = data.drafts || [];
  } catch (error) {
    console.error("Error reading app data for sitemap:", error);
  }

  const base = "https://draftlo.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: base, lastModified: now, changeFrequency: "daily", priority: 1.0 },
    { url: `${base}/legal-agreements-india`, lastModified: now, changeFrequency: "weekly", priority: 0.95 },
    { url: `${base}/category`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/how-it-works`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${base}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((cat) => ({
    url: `${base}${cat.href}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const agreementPages: MetadataRoute.Sitemap = drafts.map((draft) => ({
    url: `${base}${draft.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...categoryPages, ...agreementPages];
}
