import { MetadataRoute } from "next";
import { getAppData } from "@/lib/api";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const data = await getAppData();
  const base = "https://draftlo.com";
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: base,
      lastModified: now,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${base}/legal-agreements-india`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${base}/category`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${base}/how-it-works`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${base}/about`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const categoryPages: MetadataRoute.Sitemap = data.categories.map((cat) => ({
    url: `${base}${cat.href}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.85,
  }));

  const agreementPages: MetadataRoute.Sitemap = data.drafts.map((draft) => ({
    url: `${base}${draft.href}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.75,
  }));

  return [...staticPages, ...categoryPages, ...agreementPages];
}
