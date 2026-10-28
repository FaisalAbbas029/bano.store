import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { ProductVisual } from './ProductVisual';

interface CategoryShowcaseProps {
  onSelectCategory: (category: string) => void;
}

interface CategoryCard {
  id: string;
  name: string;
  queryCategory: string;
  subtitle: string;
  visualType: 'coat' | 'sweater' | 'trousers' | 'bag' | 'sneaker' | 'puffer' | 'women';
  itemCount: string;
  colSpan: string;
  imageUrl: string;
}

const CATEGORY_TILES: CategoryCard[] = [
  {
    id: 'cat-women',
    name: 'Women’s Collection',
    queryCategory: "Women's Fashion",
    subtitle: 'Tailored wool trench, cashmere pullovers, crepe trousers & leather accessories',
    visualType: 'women',
    itemCount: '28 Styles',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-6',
    imageUrl: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-coats',
    name: 'Coats & Outerwear',
    queryCategory: 'Coats & Jackets',
    subtitle: 'Double-breasted wool melton, structured silhouettes & layering overcoats',
    visualType: 'coat',
    itemCount: '24 Styles',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-6',
    imageUrl: 'https://images.unsplash.com/photo-1544923246-77307dd654cb?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-knitwear',
    name: 'Sweaters & Knitwear',
    queryCategory: 'Sweaters & Knitwear',
    subtitle: 'Cashmere-blend cable knits, 7-gauge mock necks & soft spun pullovers',
    visualType: 'sweater',
    itemCount: '18 Styles',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-4',
    imageUrl: 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-trousers',
    name: 'Trousers & Pants',
    queryCategory: 'Trousers & Pants',
    subtitle: 'High-rise pleated drapes, relaxed everyday chinos & tailored gabardine',
    visualType: 'trousers',
    itemCount: '16 Styles',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-4',
    imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-bags',
    name: 'Bags & Leather Goods',
    queryCategory: 'Bags & Leather',
    subtitle: 'Structured calfskin shoulder bags, architecture totes & crossbody pouches',
    visualType: 'bag',
    itemCount: '14 Styles',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-4',
    imageUrl: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-sneakers',
    name: 'Sneakers & Casual Shoes',
    queryCategory: 'Sneakers & Footwear',
    subtitle: 'Full-grain cupsole retro trainers, minimalist courts & daily footwear',
    visualType: 'sneaker',
    itemCount: '12 Styles',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-6',
    imageUrl: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=800&auto=format&fit=crop&q=80'
  },
  {
    id: 'cat-winter',
    name: 'Winter Wear & Down Puffers',
    queryCategory: 'Winter Wear',
    subtitle: '700+ fill power down parkas, arctic storm jackets & thermal outer layers',
    visualType: 'puffer',
    itemCount: '15 Styles',
    colSpan: 'col-span-1 md:col-span-2 lg:col-span-6',
    imageUrl: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=800&auto=format&fit=crop&q=80'
  }
];

export const CategoryShowcase: React.FC<CategoryShowcaseProps> = ({ onSelectCategory }) => {
  return (
    <section id="categories" className="py-20 bg-[#FAF8F5] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#7D7569] block mb-2">
              Curated Classifications
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#1A1817]">
              Explore by Category
            </h2>
          </div>
          <p className="text-sm text-[#6E6659] max-w-md font-light">
            All categories feature factory-direct sourcing with samples available for retail
            and structured bulk discounts for wholesale distributors.
          </p>
        </div>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-12 gap-6">
          {CATEGORY_TILES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => onSelectCategory(cat.queryCategory)}
              className={`${cat.colSpan} group relative bg-white border border-[#E5DFD5] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-md hover:border-[#1A1817]/30 flex flex-col`}
            >
              <div className="relative aspect-[16/10] sm:aspect-[16/9] w-full overflow-hidden bg-[#F4EFEA]">
                <ProductVisual
                  type={cat.visualType}
                  imageUrl={cat.imageUrl}
                  alt={cat.name}
                  className="h-full p-0"
                />
                
                {/* Subtle gradient overlay for contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-80 group-hover:opacity-75 transition-opacity" />

                {/* Top Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#1A1817] text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded shadow-2xs">
                  {cat.itemCount}
                </div>

                {/* Bottom Overlay Content */}
                <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5 text-white flex items-end justify-between">
                  <div>
                    <h3 className="text-lg sm:text-xl font-display font-medium text-white group-hover:translate-x-1 transition-transform duration-200">
                      {cat.name}
                    </h3>
                    <p className="text-xs text-white/80 line-clamp-1 mt-0.5 font-light">
                      {cat.subtitle}
                    </p>
                  </div>
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-xs flex items-center justify-center text-white group-hover:bg-white group-hover:text-[#1A1817] transition-colors shrink-0 ml-3">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
