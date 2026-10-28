import React, { useState, useMemo } from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { Product, CATEGORIES, CategoryType, filterProducts } from '../utils/catalog';
import { ProductCard } from './ProductCard';

interface ProductCatalogProps {
  products: Product[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  onWholesaleSelect: (product: Product) => void;
}

export const ProductCatalog: React.FC<ProductCatalogProps> = ({
  products,
  selectedCategory,
  onSelectCategory,
  onQuickView,
  onAddToCart,
  onWholesaleSelect
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'name-asc'>('featured');
  const [showWholesaleTiers, setShowWholesaleTiers] = useState(false);

  const filteredProducts = useMemo(() => {
    return filterProducts(products, {
      category: selectedCategory,
      searchQuery,
      sortBy
    });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const handleResetFilters = () => {
    onSelectCategory('All');
    setSearchQuery('');
    setSortBy('featured');
  };

  return (
    <section id="catalog" className="py-20 bg-[#FAF8F5] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-[#7D7569] block mb-2">
              Full Inventory
            </span>
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#1A1817]">
              Find Your Next Favourite
            </h2>
          </div>

          {/* Wholesale Mode Toggle */}
          <div className="flex items-center gap-2 bg-[#EFE9E0] p-1 rounded-lg border border-[#E0D7CC]">
            <button
              onClick={() => setShowWholesaleTiers(false)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                !showWholesaleTiers
                  ? 'bg-white text-[#1A1817] shadow-xs'
                  : 'text-[#6B6356] hover:text-[#1A1817]'
              }`}
            >
              Retail View
            </button>
            <button
              onClick={() => setShowWholesaleTiers(true)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                showWholesaleTiers
                  ? 'bg-[#1A1817] text-white shadow-xs'
                  : 'text-[#6B6356] hover:text-[#1A1817]'
              }`}
            >
              Wholesale Tier View
            </button>
          </div>
        </div>

        {/* Filter Bar Controls */}
        <div className="space-y-4 mb-8">
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => onSelectCategory(cat)}
                className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#1A1817] text-white'
                    : 'bg-white text-[#5E574D] border border-[#E5DFD5] hover:bg-[#F2ECE4]'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort Row */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-3 rounded-lg border border-[#E5DFD5]">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-[#8C8375] absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search styles, materials, colors..."
                className="w-full pl-9 pr-4 py-2 text-xs bg-[#FAF8F5] border border-[#E5DFD5] rounded-md text-[#1A1817] placeholder-[#9E9588] focus:outline-none focus:border-[#1A1817]"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#8C8375] hover:text-[#1A1817]"
                >
                  Clear
                </button>
              )}
            </div>

            <div className="flex items-center gap-3">
              <span className="text-xs text-[#7A7368] font-mono whitespace-nowrap">
                {filteredProducts.length} {filteredProducts.length === 1 ? 'item' : 'items'}
              </span>

              <div className="flex items-center gap-2 border-l border-[#E5DFD5] pl-3">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#7A7368]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="text-xs bg-transparent text-[#1A1817] font-medium focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured First</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name-asc">Alphabetical</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                showWholesalePricing={showWholesaleTiers}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-xl border border-[#E5DFD5] p-8 space-y-4">
            <p className="text-base text-[#1A1817] font-medium">No products match your current filters</p>
            <p className="text-xs text-[#7A7368] max-w-sm mx-auto">
              Try adjusting your search keywords or switching category filters to view our full collection.
            </p>
            <button
              onClick={handleResetFilters}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-medium bg-[#1A1817] text-white rounded-md hover:bg-[#332F2C] transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset All Filters</span>
            </button>
          </div>
        )}

      </div>
    </section>
  );
};
