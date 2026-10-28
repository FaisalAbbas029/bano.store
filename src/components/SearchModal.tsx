import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { Product, filterProducts, formatPKR } from '../utils/catalog';
import { ProductVisual } from './ProductVisual';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct
}) => {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = query.trim() ? filterProducts(products, { searchQuery: query }) : [];

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-start justify-center pt-20 p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-2xl rounded-2xl border border-[#E5DFD5] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#E5DFD5] flex items-center gap-3">
          <Search className="w-5 h-5 text-[#8C8375] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search wool coats, knitwear, trousers, sneakers, bags..."
            className="w-full text-sm text-[#1A1817] placeholder-[#8C8375] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-xs text-[#8C8375] hover:text-[#1A1817]"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1 text-[#8C8375] hover:text-[#1A1817] rounded-md transition-colors"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results Container */}
        <div className="max-h-[60vh] overflow-y-auto p-4">
          {query.trim() === '' ? (
            <div className="py-8 text-center text-xs text-[#7A7368] space-y-2">
              <p className="font-medium text-[#1A1817]">Popular Searches</p>
              <div className="flex flex-wrap justify-center gap-2 pt-2">
                {['Double-Breasted Wool Overcoat', 'Cashmere Knit', 'Everyday Trousers', 'Leather Tote', 'Puffer Parka', 'Leather Sneaker'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1 bg-[#FAF8F5] border border-[#E5DFD5] rounded-md hover:border-[#1A1817] text-[#1A1817] cursor-pointer"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : results.length > 0 ? (
            <div className="divide-y divide-[#F0EAE1]">
              {results.map((product) => (
                <div
                  key={product.id}
                  onClick={() => {
                    onSelectProduct(product);
                    onClose();
                  }}
                  className="py-3 px-2 flex items-center gap-4 hover:bg-[#FAF8F5] rounded-lg cursor-pointer transition-colors"
                >
                  <div className="w-12 h-14 bg-[#F4EFEA] rounded border border-[#E5DFD5] overflow-hidden shrink-0">
                    <ProductVisual type={product.visualType} className="p-1" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-mono uppercase text-[#7A7368]">{product.category}</div>
                    <div className="text-sm font-semibold text-[#1A1817] truncate">{product.name}</div>
                    <div className="text-xs text-[#7A7368] font-mono">Retail: {formatPKR(product.retailPrice)} · Bulk from {formatPKR(product.wholesaleTiers[product.wholesaleTiers.length - 1].pricePerUnit)}</div>
                  </div>
                  <ArrowRight className="w-4 h-4 text-[#8C8375]" />
                </div>
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-xs text-[#7A7368]">
              No products found for "{query}". Try checking your spelling or search by category.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
