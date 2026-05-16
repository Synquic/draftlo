// Schema definitions for the application data

export interface MenuItem {
  name: string;
  href?: string;
  items?: Array<{
    name: string;
    href: string;
  }>;
}

export interface Category {
  name: string;
  href: string;
  icon: string;
  description?: string;
}

export interface Draft {
  id?: string;
  href: string;
  name: string;
  icon?: string;
  image: string;
  description?: string;
  price: {
    label?: string;
    amount: number;
    ctaLink: string;
    currency?: string;
  };
  zohoUrl?: string;
  category?: string;
  idealFor?: string[];
  disclaimer?: string;
  keyFeatures?: string[];
  longDescription?: string;
  tableOfContents?: string[];
  keyDifferentiators?: string[];
  Note?: string;
}

export interface Blog {
  slug: string;
  title: string;
  metaDescription: string;
  publishedAt: string;
  author: string;
  coverImage?: string;
  content: string; // HTML string
  tags?: string[];
}

export interface AppDataSchema {
  menu: MenuItem[];
  categories: Category[];
  drafts: Draft[];
  blogs: Blog[];
}

// Validation functions
export function validateMenuItem(item: any): item is MenuItem {
  if (!item || typeof item !== 'object') return false;
  if (typeof item.name !== 'string') return false;
  if (item.href && typeof item.href !== 'string') return false;
  if (item.items) {
    if (!Array.isArray(item.items)) return false;
    for (const subItem of item.items) {
      if (typeof subItem.name !== 'string' || typeof subItem.href !== 'string') {
        return false;
      }
    }
  }
  return true;
}

export function validateCategory(category: any): category is Category {
  if (!category || typeof category !== 'object') return false;
  return (
    typeof category.name === 'string' &&
    typeof category.href === 'string' &&
    typeof category.icon === 'string'
  );
}

export function validateDraft(draft: any): draft is Draft {
  if (!draft || typeof draft !== 'object') return false;
  if (typeof draft.href !== 'string' || typeof draft.name !== 'string') return false;
  if (typeof draft.image !== 'string') return false;

  // Validate price object
  if (!draft.price || typeof draft.price !== 'object') return false;
  if (typeof draft.price.amount !== 'number') return false;
  if (typeof draft.price.ctaLink !== 'string') return false;

  // Optional fields - validate if present
  if (draft.idealFor && !Array.isArray(draft.idealFor)) return false;
  if (draft.keyFeatures && !Array.isArray(draft.keyFeatures)) return false;
  if (draft.tableOfContents && !Array.isArray(draft.tableOfContents)) return false;
  if (draft.keyDifferentiators && !Array.isArray(draft.keyDifferentiators)) return false;

  return true;
}

export function validateAppData(data: any): data is AppDataSchema {
  if (!data || typeof data !== 'object') return false;

  if (!Array.isArray(data.menu)) return false;
  for (const item of data.menu) {
    if (!validateMenuItem(item)) return false;
  }

  if (!Array.isArray(data.categories)) return false;
  for (const category of data.categories) {
    if (!validateCategory(category)) return false;
  }

  if (!Array.isArray(data.drafts)) return false;
  for (const draft of data.drafts) {
    if (!validateDraft(draft)) return false;
  }

  return true;
}

// Helper functions to create new items with proper defaults
export function createEmptyMenuItem(): MenuItem {
  return {
    name: '',
    href: '',
  };
}

export function createEmptyCategory(): Category {
  return {
    name: '',
    href: '',
    icon: '',
  };
}

export function createEmptyDraft(): Draft {
  return {
    href: '',
    name: '',
    image: '',
    price: {
      amount: 0,
      ctaLink: '',
      currency: 'INR',
    },
    idealFor: [],
    keyFeatures: [],
    tableOfContents: [],
    keyDifferentiators: [],
    longDescription: '',
    disclaimer: 'This agreement does not constitute legal advice or legal services of any kind. This is merely a first draft provided for your ease. Please consult a lawyer before you finalise the draft.',
  };
}
