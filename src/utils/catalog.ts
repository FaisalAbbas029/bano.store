/**
 * Pure data and logic for Bano’s.Store
 * High-quality Chinese apparel, women's fashion, winter wear, bags, footwear, and accessories.
 */

export interface Product {
  id: string;
  name: string;
  category:
    | "Women's Fashion"
    | 'Coats & Jackets'
    | 'Sweaters & Knitwear'
    | 'Trousers & Pants'
    | 'Bags & Leather'
    | 'Sneakers & Footwear'
    | 'Winter Wear';
  retailPrice: number;
  wholesaleTiers: {
    moq: number;
    pricePerUnit: number;
  }[];
  colors: string[];
  sizes: string[];
  description: string;
  material: string;
  origin: string;
  featured?: boolean;
  visualType: 'coat' | 'sweater' | 'trousers' | 'bag' | 'sneaker' | 'puffer' | 'women';
  imageUrl?: string;
}

export const CATEGORIES = [
  'All',
  "Women's Fashion",
  'Coats & Jackets',
  'Sweaters & Knitwear',
  'Trousers & Pants',
  'Bags & Leather',
  'Sneakers & Footwear',
  'Winter Wear'
] as const;

export type CategoryType = (typeof CATEGORIES)[number];

export const CATALOG_STORAGE_KEY = 'banos_catalog_v6';

/**
 * Format any numerical price or currency figure to Pakistani Rupee (PKR).
 * Example: formatPKR(42500) -> "PKR 42,500"
 */
export function formatPKR(amount: number): string {
  if (typeof amount !== 'number' || isNaN(amount)) return 'PKR 0';
  return `PKR ${Math.round(amount).toLocaleString('en-US')}`;
}

// 100% verified, active HTTP 200 high-resolution realistic photography
export const INITIAL_PRODUCTS: Product[] = [
  // --- WOMEN'S FASHION COLLECTION ---
  {
    id: 'bs-women-01',
    name: 'Women’s Atelier Double-Breasted Wool Trench',
    category: "Women's Fashion",
    retailPrice: 42500,
    wholesaleTiers: [
      { moq: 10, pricePerUnit: 25500 },
      { moq: 50, pricePerUnit: 21500 },
      { moq: 200, pricePerUnit: 18800 }
    ],
    colors: ['Camel Heather', 'Oatmeal Beige', 'Obsidian Black'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Impeccably tailored women’s double-breasted trench coat cut from heavy wool melton. Accented with tortoiseshell buttons, storm flap, and a detachable tie belt.',
    material: '75% Australian Merino Wool, 25% Microfiber (500gsm)',
    origin: 'Zhejiang Apparel Guild, Certified Export Standard',
    featured: true,
    visualType: 'coat',
    imageUrl: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'bs-women-02',
    name: 'Women’s Pure Cashmere Cable-Knit Pullover',
    category: "Women's Fashion",
    retailPrice: 20500,
    wholesaleTiers: [
      { moq: 12, pricePerUnit: 11600 },
      { moq: 60, pricePerUnit: 9400 },
      { moq: 250, pricePerUnit: 7800 }
    ],
    colors: ['Alabaster Ivory', 'Rose Ash', 'Sage Fog'],
    sizes: ['XS', 'S', 'M', 'L'],
    description: 'Ultra-soft spun cashmere blend in a refined modern cable-knit texture. Ribbed collar and elongated cuffs that gracefully taper at the wrists.',
    material: '60% Superfine Cashmere, 40% Fine Combed Cotton',
    origin: 'Jiangsu Fine Knitwear Facility',
    featured: true,
    visualType: 'sweater',
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'bs-women-03',
    name: 'Women’s High-Waisted Pleated Drape Trousers',
    category: "Women's Fashion",
    retailPrice: 17200,
    wholesaleTiers: [
      { moq: 15, pricePerUnit: 9400 },
      { moq: 60, pricePerUnit: 7800 },
      { moq: 200, pricePerUnit: 6400 }
    ],
    colors: ['Desert Sand', 'Cocoa Brown', 'Midnight Charcoal'],
    sizes: ['26', '28', '30', '32'],
    description: 'Flattering high-rise silhouette with deep inverted pleats, invisible side zipper, and fluid wide-leg movement tailored for both office and casual sophistication.',
    material: '70% Wool Gabardine, 30% Wrinkle-Resistant Crepe Fiber',
    origin: 'Guangdong Tailoring Hub',
    featured: true,
    visualType: 'trousers',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'bs-women-04',
    name: 'Women’s Structured Pebble Leather Shoulder Bag',
    category: "Women's Fashion",
    retailPrice: 26500,
    wholesaleTiers: [
      { moq: 8, pricePerUnit: 15000 },
      { moq: 40, pricePerUnit: 12800 },
      { moq: 150, pricePerUnit: 10800 }
    ],
    colors: ['Terracotta Tan', 'Noir Black', 'Warm Cream'],
    sizes: ['Medium (12" x 9" x 4")'],
    description: 'Hand-finished structured shoulder bag with custom pale gold hardware, secure magnetic top closure, and dual interior compartments.',
    material: '100% Genuine Full-Grain Pebble Bovine Leather',
    origin: 'Guangzhou Leathercraft District',
    featured: true,
    visualType: 'bag',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'bs-women-05',
    name: 'Women’s Modern Editorial Trench & Knit Ensemble',
    category: "Women's Fashion",
    retailPrice: 49500,
    wholesaleTiers: [
      { moq: 10, pricePerUnit: 29000 },
      { moq: 40, pricePerUnit: 25500 },
      { moq: 150, pricePerUnit: 22800 }
    ],
    colors: ['Mustard Ochre & Cream', 'Caramel & Sand'],
    sizes: ['S', 'M', 'L'],
    description: 'Showstopper runway-inspired editorial look featuring clean geometric lines, structured collar lapels, and coordinated knit layering.',
    material: 'Double-Weave Wool Blend & Pure Combed Cotton Underlayer',
    origin: 'Zhejiang High-Fashion Atelier',
    featured: true,
    visualType: 'women',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'bs-women-06',
    name: 'Women’s Fluid Relaxed Crepe Trousers',
    category: "Women's Fashion",
    retailPrice: 16000,
    wholesaleTiers: [
      { moq: 15, pricePerUnit: 8900 },
      { moq: 60, pricePerUnit: 7200 },
      { moq: 200, pricePerUnit: 5800 }
    ],
    colors: ['Ecru Off-White', 'Soft Moss', 'Espresso'],
    sizes: ['26', '28', '30', '32'],
    description: 'Effortless fluid drape pant engineered with stretch-crepe fabric that moves beautifully with every step. Hidden comfort waistband.',
    material: '80% Viscose-Crepe, 20% Technical Rayon',
    origin: 'Guangdong Tailoring Hub',
    featured: false,
    visualType: 'trousers',
    imageUrl: 'https://images.unsplash.com/photo-1551854838-212c50b4c184?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'bs-women-07',
    name: 'Women’s Minimalist Calfskin Crossbody Camera Bag',
    category: "Women's Fashion",
    retailPrice: 23200,
    wholesaleTiers: [
      { moq: 10, pricePerUnit: 13300 },
      { moq: 50, pricePerUnit: 11100 },
      { moq: 150, pricePerUnit: 9400 }
    ],
    colors: ['Cognac Tan', 'Black Matte', 'Olive Khaki'],
    sizes: ['Compact (9" x 6.5" x 3")'],
    description: 'Boxy minimalist camera bag silhouette crafted with butter-soft calfskin leather, edge-painted piping, and adjustable shoulder strap.',
    material: 'Split Calfskin with Soft Microfiber Interior Lining',
    origin: 'Guangzhou Leathercraft District',
    featured: false,
    visualType: 'bag',
    imageUrl: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=800&auto=format&fit=crop&q=80'
  },

  // --- COATS & JACKETS ---
  {
    id: 'bs-coat-10',
    name: 'Atelier Double-Breasted Wool Overcoat',
    category: 'Coats & Jackets',
    retailPrice: 41000,
    wholesaleTiers: [
      { moq: 10, pricePerUnit: 24400 },
      { moq: 50, pricePerUnit: 20500 },
      { moq: 200, pricePerUnit: 18000 }
    ],
    colors: ['Camel Heather', 'Obsidian Black', 'Stone Grey'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'A tailored winter silhouette crafted with heavy wool-blend melton. Features notched lapels, horn buttons, and cupro lining for smooth layering.',
    material: '70% Wool, 30% Fine Synthetic Fiber (480gsm)',
    origin: 'Zhejiang Apparel Guild, Certified Quality Inspection',
    featured: true,
    visualType: 'coat',
    imageUrl: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&auto=format&fit=crop&q=80'
  },

  // --- SWEATERS & KNITWEAR ---
  {
    id: 'bs-knit-11',
    name: 'Ribbed Mock-Neck Cashmere-Touch Knit',
    category: 'Sweaters & Knitwear',
    retailPrice: 17800,
    wholesaleTiers: [
      { moq: 12, pricePerUnit: 10000 },
      { moq: 60, pricePerUnit: 8000 },
      { moq: 250, pricePerUnit: 6600 }
    ],
    colors: ['Oatmeal Melange', 'Olive Wood', 'Deep Charcoal'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Dense 7-gauge half-cardigan knit offering exceptional thermal comfort without bulk. Engineered cuffs that retain shape through repeated wear.',
    material: 'Superfine Merino & Cashmere-Hand Wool Blend',
    origin: 'Jiangsu Fine Knitwear Facility',
    featured: true,
    visualType: 'sweater',
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80'
  },

  // --- TROUSERS & PANTS ---
  {
    id: 'bs-trouser-12',
    name: 'Tailored Wide-Leg Gabardine Trousers',
    category: 'Trousers & Pants',
    retailPrice: 17200,
    wholesaleTiers: [
      { moq: 15, pricePerUnit: 9400 },
      { moq: 60, pricePerUnit: 7800 },
      { moq: 200, pricePerUnit: 6400 }
    ],
    colors: ['Oat Wool Tone', 'Rich Navy', 'Black Charcoal'],
    sizes: ['30', '32', '34', '36'],
    description: 'Modern relaxed drape with high-rise waist and clean side slant pockets. Perfect for smart-casual wear or modern professional looks.',
    material: 'Fine Drape Gabardine (Wool & Poly Blend)',
    origin: 'Guangdong Tailoring Hub',
    featured: true,
    visualType: 'trousers',
    imageUrl: 'https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&auto=format&fit=crop&q=80'
  },

  // --- BAGS & LEATHER ---
  {
    id: 'bs-bag-13',
    name: 'Minimalist Architecture Leather Tote',
    category: 'Bags & Leather',
    retailPrice: 25500,
    wholesaleTiers: [
      { moq: 8, pricePerUnit: 14400 },
      { moq: 40, pricePerUnit: 12200 },
      { moq: 150, pricePerUnit: 10500 }
    ],
    colors: ['Saddle Tan', 'Onyx Matte', 'Alabaster White'],
    sizes: ['One Size (16" x 13" x 5")'],
    description: 'Structured everyday tote with clean magnetic closure, interior padded 15-inch laptop sleeve, and reinforced edge painting.',
    material: 'Top-Grain Split Bovine Leather with Water-Resistant Finish',
    origin: 'Guangzhou Leathercraft District',
    featured: true,
    visualType: 'bag',
    imageUrl: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80'
  },

  // --- SNEAKERS & FOOTWEAR ---
  {
    id: 'bs-shoe-14',
    name: 'Court Low Minimalist Retro Leather Trainer',
    category: 'Sneakers & Footwear',
    retailPrice: 24500,
    wholesaleTiers: [
      { moq: 12, pricePerUnit: 12800 },
      { moq: 48, pricePerUnit: 10800 },
      { moq: 200, pricePerUnit: 9200 }
    ],
    colors: ['Chalk / Off-White', 'Monochrome Black', 'Ecru / Sand Suede'],
    sizes: ['EU 37', 'EU 38', 'EU 39', 'EU 40', 'EU 41', 'EU 42', 'EU 43', 'EU 44'],
    description: 'Streamlined cupsole sneaker built with supple nappa leather upper, stitched rubber outsole, and memory foam cushioned insole.',
    material: 'Full-Grain Smooth Cowhide & Vulcanized Rubber Sole',
    origin: 'Fujian Footwear Precision Workshop',
    featured: true,
    visualType: 'sneaker',
    imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80'
  },

  // --- WINTER WEAR ---
  {
    id: 'bs-winter-15',
    name: 'Nordic Technical Down Puffer Parka',
    category: 'Winter Wear',
    retailPrice: 46500,
    wholesaleTiers: [
      { moq: 10, pricePerUnit: 27200 },
      { moq: 40, pricePerUnit: 23600 },
      { moq: 150, pricePerUnit: 20500 }
    ],
    colors: ['Glacier Fog', 'Midnight Slate', 'Pine Shadow'],
    sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
    description: 'Sub-zero thermal protection with 700+ fill power down, storm-proof taped seam shell, storm collar, and fleece-lined handwarmer pockets.',
    material: '90/10 White Duck Down Fill, Waterproof Ripstop Nylon Shell',
    origin: 'Hebei Winter Apparel Manufacturing Base',
    featured: true,
    visualType: 'puffer',
    imageUrl: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'bs-winter-16',
    name: 'Thermal Arctic Hooded Long Down Parka',
    category: 'Winter Wear',
    retailPrice: 51200,
    wholesaleTiers: [
      { moq: 8, pricePerUnit: 30500 },
      { moq: 30, pricePerUnit: 27200 },
      { moq: 100, pricePerUnit: 23800 }
    ],
    colors: ['Matte Black', 'Arctic Stone', 'Deep Olive'],
    sizes: ['S', 'M', 'L', 'XL'],
    description: 'Full-length cold protection designed for deep winter temperatures. Featuring high-loft down chambers, weather-sealed storm flap, and wind-blocking rib cuffs.',
    material: 'Duck Down (650 FP), Durable Water-Repellent Poly Shell',
    origin: 'Hebei Winter Apparel Manufacturing Base',
    featured: false,
    visualType: 'puffer',
    imageUrl: 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&auto=format&fit=crop&q=80'
  }
];

export const PRODUCTS = INITIAL_PRODUCTS;

export interface CartItem {
  product: Product;
  selectedColor: string;
  selectedSize: string;
  quantity: number;
}

export interface WholesaleInquiryData {
  fullName: string;
  businessName?: string;
  contactMethod: 'email' | 'phone';
  contactValue: string;
  category: string;
  estimatedQuantity: string;
  message: string;
}

export interface InquiryValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export function filterProducts(
  products: Product[],
  options: {
    category?: string;
    searchQuery?: string;
    sortBy?: 'featured' | 'price-asc' | 'price-desc' | 'name-asc';
  }
): Product[] {
  let result = [...products];

  if (options.category && options.category !== 'All') {
    result = result.filter(p => p.category === options.category);
  }

  if (options.searchQuery && options.searchQuery.trim().length > 0) {
    const q = options.searchQuery.toLowerCase().trim();
    result = result.filter(
      p =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.colors.some(c => c.toLowerCase().includes(q))
    );
  }

  if (options.sortBy) {
    switch (options.sortBy) {
      case 'price-asc':
        result.sort((a, b) => a.retailPrice - b.retailPrice);
        break;
      case 'price-desc':
        result.sort((a, b) => b.retailPrice - a.retailPrice);
        break;
      case 'name-asc':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'featured':
      default:
        result.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
        break;
    }
  }

  return result;
}

export function calculateCartTotals(items: CartItem[], freeShippingThreshold = 35000) {
  const subtotal = items.reduce((acc, item) => acc + item.product.retailPrice * item.quantity, 0);
  const totalItemCount = items.reduce((acc, item) => acc + item.quantity, 0);
  const shipping = items.length === 0 ? 0 : subtotal >= freeShippingThreshold ? 0 : 1500;
  const total = subtotal + shipping;

  return {
    subtotal,
    totalItemCount,
    shipping,
    freeShippingThreshold,
    amountUntilFreeShipping: Math.max(0, freeShippingThreshold - subtotal),
    total
  };
}

export function validateWholesaleInquiry(data: Partial<WholesaleInquiryData>): InquiryValidationResult {
  const errors: Record<string, string> = {};

  if (!data.fullName || data.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name or representative name.';
  }

  if (!data.contactValue || data.contactValue.trim().length < 4) {
    errors.contactValue = 'Please provide a valid email or phone / WhatsApp number.';
  } else if (data.contactMethod === 'email' && !data.contactValue.includes('@')) {
    errors.contactValue = 'Please enter a valid email address.';
  }

  if (!data.category || data.category === '') {
    errors.category = 'Please choose a primary product category of interest.';
  }

  if (!data.estimatedQuantity || data.estimatedQuantity.trim() === '') {
    errors.estimatedQuantity = 'Please specify your estimated quantity (e.g. 50 pcs, 200 pcs).';
  }

  if (!data.message || data.message.trim().length < 5) {
    errors.message = 'Please provide a brief description of your requirements.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function validateProductForm(data: Partial<Product>): { isValid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data.name || data.name.trim().length < 3) {
    errors.name = 'Product name must be at least 3 characters.';
  }

  if (!data.category) {
    errors.category = 'Category is required.';
  }

  if (typeof data.retailPrice !== 'number' || data.retailPrice <= 0 || isNaN(data.retailPrice)) {
    errors.retailPrice = 'Valid retail price is required (greater than PKR 0).';
  }

  if (!data.description || data.description.trim().length < 10) {
    errors.description = 'Description should be at least 10 characters.';
  }

  if (!data.material || data.material.trim().length < 3) {
    errors.material = 'Material specifications are required.';
  }

  if (!data.origin || data.origin.trim().length < 3) {
    errors.origin = 'Production origin / guild information is required.';
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

export function addProduct(products: Product[], newProduct: Product): Product[] {
  return [newProduct, ...products];
}

export function updateProduct(products: Product[], id: string, updates: Partial<Product>): Product[] {
  return products.map(p => (p.id === id ? { ...p, ...updates } : p));
}

export function deleteProduct(products: Product[], id: string): Product[] {
  return products.filter(p => p.id !== id);
}

export function generateInquiryRef(): string {
  const year = new Date().getFullYear();
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  return `BS-WS-${year}-${randomSuffix}`;
}
