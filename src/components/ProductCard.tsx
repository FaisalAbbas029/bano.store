import React from 'react';
import { Eye, Plus } from 'lucide-react';
import { Product, formatPKR } from '../utils/catalog';
import { ProductVisual } from './ProductVisual';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, color: string) => void;
  showWholesalePricing?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  showWholesalePricing = false
}) => {
  const lowestWholesale = product.wholesaleTiers[product.wholesaleTiers.length - 1];

  return (
    <div className="group relative bg-white border border-[#E5DFD5] rounded-xl overflow-hidden flex flex-col transition-all duration-300 hover:shadow-md hover:border-[#B8ADA0]/60">
      
      {/* Product Visual Frame */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#F4EFEA] cursor-pointer" onClick={() => onQuickView(product)}>
        <ProductVisual
          type={product.visualType}
          imageUrl={product.imageUrl}
          alt={product.name}
          className="h-full p-0"
        />

        {/* Hover Quick Action Buttons */}
        <div className="absolute inset-x-0 bottom-3 px-3 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex-1 py-2 bg-white/95 backdrop-blur-md text-[#1A1817] text-xs font-medium rounded-md shadow-sm border border-[#E5DFD5] hover:bg-white flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            aria-label={`Quick view ${product.name}`}
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Quick View</span>
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onAddToCart(product, product.sizes[0], product.colors[0]);
            }}
            className="py-2 px-3 bg-[#1A1817] text-white text-xs font-medium rounded-md shadow-sm hover:bg-[#332F2C] flex items-center justify-center gap-1 transition-colors cursor-pointer"
            aria-label={`Quick add ${product.name} to cart`}
            title="Quick add default size"
          >
            <Plus className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Add</span>
          </button>
        </div>

        {/* Origin / Quality Stamp */}
        <div className="absolute top-3 left-3 text-[10px] font-mono tracking-wider uppercase text-[#736A5E] bg-white/90 backdrop-blur-xs px-2 py-0.5 rounded-sm border border-[#E5DFD5]/80">
          China Direct
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <div className="text-[11px] font-mono uppercase tracking-wider text-[#7A7368] mb-1">
            {product.category}
          </div>
          
          <h3
            onClick={() => onQuickView(product)}
            className="text-sm font-semibold text-[#1A1817] group-hover:text-[#5A5145] transition-colors cursor-pointer line-clamp-1"
            title={product.name}
          >
            {product.name}
          </h3>

          <p className="text-xs text-[#7A7368] line-clamp-1 mt-1 font-light">
            {product.material}
          </p>
        </div>

        {/* Pricing Rows */}
        <div className="pt-3 mt-3 border-t border-[#F0EAE1]">
          <div className="flex items-baseline justify-between">
            <div>
              <span className="text-xs text-[#7A7368] mr-1.5 font-normal">Retail:</span>
              <span className="text-xs font-semibold font-mono text-[#1A1817] tabular-nums">
                {formatPKR(product.retailPrice)}
              </span>
            </div>

            <div className="text-right">
              <span className="text-[11px] text-[#7A7368] font-mono">
                Bulk from <strong className="text-[#1A1817] font-semibold">{formatPKR(lowestWholesale.pricePerUnit)}</strong>
              </span>
            </div>
          </div>

          {/* Wholesale Tier Breakdown preview if wholesale mode is toggled */}
          {showWholesalePricing && (
            <div className="mt-2 pt-2 border-t border-dashed border-[#E5DFD5] text-[10px] font-mono text-[#5A5348] grid grid-cols-3 gap-1 text-center bg-[#FAF8F5] p-1.5 rounded">
              {product.wholesaleTiers.map((tier, idx) => (
                <div key={idx}>
                  <div className="text-[#8C8375]">{tier.moq}+ units</div>
                  <div className="font-semibold text-[#1A1817]">{formatPKR(tier.pricePerUnit)}/ea</div>
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
