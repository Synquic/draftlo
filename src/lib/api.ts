export type AppData = {
  menu: Array<{
    name: string;
    href: string;
    items?: Array<{
      name: string;
      href: string;
    }>;
  }>;
  categories: Array<{
    name: string;
    href: string;
    icon: string;
    description?: string;
  }>;
  drafts: Array<{
    name: string;
    href: string;
    icon?: string;
    image: string;
    description?: string;
    price: {
      amount: number;
      ctaLink: string;
    };
    longDescription: string;
    keyFeatures: string[];
    idealFor: string[];
    Note?: string;
    keyDifferentiators: string[];
    tableOfContents: string[];
    disclaimer: string;
  }>;
};

export async function getAppData(): Promise<AppData> {
  // Use local API route instead of external API
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/data`, {
    // Revalidate every 60 seconds
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  return res.json();
}

// Function to update app data (for admin portal)
export async function updateAppData(data: AppData): Promise<{ success: boolean; message: string }> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/data`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Failed to update data");
  }

  return res.json();
}

// Function to partially update app data (for admin portal)
export async function partialUpdateAppData(updates: Partial<AppData>): Promise<{ success: boolean; message: string; data: AppData }> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

  const res = await fetch(`${baseUrl}/api/data`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  });

  if (!res.ok) {
    throw new Error("Failed to update data");
  }

  return res.json();
}
