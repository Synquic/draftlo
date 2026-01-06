# Draftlo Data Schema Documentation

This document describes the complete data structure for the Draftlo application.

## Data Structure Overview

The application uses a single JSON file (`data/app-data.json`) with three main sections:
- **menu**: Navigation menu items
- **categories**: Product categories displayed on homepage
- **drafts**: Legal draft products

---

## 1. Menu Items

**Location**: `data.menu[]`
**Purpose**: Defines the navigation menu structure

### Schema

```typescript
interface MenuItem {
  name: string;           // Display name (REQUIRED)
  href?: string;          // Link URL (OPTIONAL - if no href, it's a dropdown parent)
  items?: SubMenuItem[];  // Sub-menu items (OPTIONAL)
}

interface SubMenuItem {
  name: string;           // Display name (REQUIRED)
  href: string;           // Link URL (REQUIRED)
}
```

### Field Details

| Field | Type | Required | Description | Example |
|-------|------|----------|-------------|---------|
| `name` | String | ✅ Yes | Menu item display name | "Home", "Startup Agreements" |
| `href` | String | ❌ No | Link URL. Omit for dropdown menus | "/", "/about" |
| `items` | Array | ❌ No | Submenu items. Only for dropdown menus | See below |
| `items[].name` | String | ✅ Yes* | Submenu item name (*if items exists) | "NDA", "MSA" |
| `items[].href` | String | ✅ Yes* | Submenu item URL (*if items exists) | "/agreements/nda" |

### Example

```json
{
  "name": "Home",
  "href": "/"
}
```

```json
{
  "name": "Startup Agreements",
  "items": [
    {
      "name": "Confidentiality Agreement",
      "href": "/agreements/confidentiality-agreement"
    }
  ]
}
```

---

## 2. Categories

**Location**: `data.categories[]`
**Purpose**: Product categories shown on the homepage grid

### Schema

```typescript
interface Category {
  name: string;    // Category name (REQUIRED)
  href: string;    // Category page URL (REQUIRED)
  icon: string;    // Icon image URL (REQUIRED)
}
```

### Field Details

| Field | Type | Required | Description | Example | Notes |
|-------|------|----------|-------------|---------|-------|
| `name` | String | ✅ Yes | Category display name | "Rental Agreements" | |
| `href` | String | ✅ Yes | Link to category page | "/category/rental-agreements" | Should match `/category/{slug}` |
| `icon` | String (URL) | ✅ Yes | Icon image URL | "https://i.ibb.co/..." | Uploaded via image upload |

### Example

```json
{
  "name": "Rental Agreements",
  "href": "/category/rental-agreements",
  "icon": "https://i.ibb.co/rental-icon.png"
}
```

---

## 3. Drafts (Products)

**Location**: `data.drafts[]`
**Purpose**: Legal draft products available for purchase

### Schema

```typescript
interface Draft {
  id?: string;                    // Unique identifier (OPTIONAL)
  href: string;                   // Product page URL (REQUIRED)
  name: string;                   // Product name (REQUIRED)
  image: string;                  // Product image URL (REQUIRED)
  price: PriceInfo;               // Price information (REQUIRED)
  zohoUrl?: string;               // Zoho form URL (OPTIONAL)
  category?: string;              // Category URL (OPTIONAL)
  idealFor?: string[];            // Target audience list (OPTIONAL)
  disclaimer?: string;            // Legal disclaimer (OPTIONAL)
  keyFeatures?: string[];         // Feature bullet points (OPTIONAL)
  longDescription?: string;       // Detailed description (OPTIONAL)
  tableOfContents?: string[];     // Document sections (OPTIONAL)
  keyDifferentiators?: string[];  // USPs (OPTIONAL)
  Note?: string;                  // Special notes (OPTIONAL)
}

interface PriceInfo {
  label?: string;      // Price label (OPTIONAL)
  amount: number;      // Price in rupees (REQUIRED)
  ctaLink: string;     // Buy now URL (REQUIRED)
  currency?: string;   // Currency code (OPTIONAL, defaults to INR)
}
```

### Field Details

#### Core Fields (Required)

| Field | Type | Required | Description | Example | Input Type |
|-------|------|----------|-------------|---------|------------|
| `name` | String | ✅ Yes | Product name | "Non-Disclosure Agreement" | Text input |
| `href` | String | ✅ Yes | Product page URL | "/agreements/nda" | Text input |
| `image` | String (URL) | ✅ Yes | Product preview image | "https://i.ibb.co/..." | Image upload |
| `price.amount` | Number | ✅ Yes | Price in INR | 400 | Number input |
| `price.ctaLink` | String (URL) | ✅ Yes | Purchase form URL | "https://forms.draftlo.com/..." | Text input |

#### Optional Fields

| Field | Type | Required | Description | Example | Input Type |
|-------|------|----------|-------------|---------|------------|
| `id` | String | ❌ No | Unique ID | "draft-001" | Text input |
| `price.label` | String | ❌ No | Price label | "Get Draft @ ₹400" | Text input |
| `price.currency` | String | ❌ No | Currency code | "INR" | Text input |
| `zohoUrl` | String (URL) | ❌ No | Zoho form URL | "https://forms.draftlo.com/..." | Text input |
| `category` | String (URL) | ❌ No | Category link | "/category/nda" | Dropdown select |
| `longDescription` | String | ❌ No | Full description | "This document is a..." | Textarea |
| `disclaimer` | String | ❌ No | Legal disclaimer | "This agreement does not..." | Textarea |
| `Note` | String | ❌ No | Special note | "Requires customization..." | Textarea |

#### Array Fields (Optional)

| Field | Type | Required | Description | Example | Input Type |
|-------|------|----------|-------------|---------|------------|
| `idealFor` | String[] | ❌ No | Target users | ["Startups", "Freelancers"] | Multi-input list |
| `keyFeatures` | String[] | ❌ No | Key features | ["Comprehensive scope", "IP protection"] | Multi-input list |
| `tableOfContents` | String[] | ❌ No | Document sections | ["Purpose", "Definitions"] | Multi-input list |
| `keyDifferentiators` | String[] | ❌ No | USPs | ["Uses placeholder system"] | Multi-input list |

### Example Draft

```json
{
  "id": "draft-001",
  "href": "/agreements/confidentiality-agreement",
  "name": "Non-Disclosure Agreement",
  "image": "https://i.ibb.co/ynyg3hPJ/Confidentiality.jpg",
  "price": {
    "label": "Get Draft @ ₹400",
    "amount": 400,
    "ctaLink": "https://forms.draftlo.com/draflo/form/NDA",
    "currency": "INR"
  },
  "category": "/category/non-disclosure-agreement",
  "idealFor": [
    "Startups sharing business ideas",
    "Freelancers and consultants"
  ],
  "keyFeatures": [
    "Comprehensive confidentiality scope",
    "Template variable system",
    "2-year confidentiality period"
  ],
  "longDescription": "This document is a Non-Disclosure Agreement (NDA) template...",
  "tableOfContents": [
    "Purpose",
    "Definition of Confidential Information",
    "Obligations of Confidentiality"
  ],
  "keyDifferentiators": [
    "Uses placeholder-based system for customization",
    "Covers both mutual and one-way arrangements"
  ],
  "disclaimer": "This agreement does not constitute legal advice...",
  "Note": "This is a template requiring customization..."
}
```

---

## Image Upload Guidelines

### Supported Formats
- PNG, JPG, JPEG, WebP
- Max file size: 5MB
- Recommended dimensions: 1200x800px

### Image Types

1. **Category Icons**: Square (512x512px recommended)
2. **Draft Preview Images**: Landscape (1200x800px recommended)

### Upload Locations
- All images are uploaded to ImgBB
- URLs are stored in the JSON data
- Format: `https://i.ibb.co/{hash}/{filename}.jpg`

---

## Validation Rules

### Required Fields by Section

**Menu Item**:
- `name` (always required)
- `href` OR `items` (one must be present)
- If `items` exists, each item needs `name` and `href`

**Category**:
- `name` (required)
- `href` (required)
- `icon` (required)

**Draft**:
- `name` (required)
- `href` (required)
- `image` (required)
- `price.amount` (required)
- `price.ctaLink` (required)

### Data Types

- **String**: Text values
- **Number**: Numeric values (prices, IDs)
- **String[]**: Array of text values
- **URL**: Must be valid URL format (http:// or https://)

---

## File Location

**Main Data File**: `/data/app-data.json`
**Schema Definition**: `/src/lib/schema.ts`
**API Endpoints**: `/app/api/data/route.ts`

---

## Admin Portal

Access the admin portal to edit this data:
- URL: `/admin/login`
- Default credentials: `admin` / `admin`

The admin portal provides forms for editing all fields with proper validation and image upload capabilities.
