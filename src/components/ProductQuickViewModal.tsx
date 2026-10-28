import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingBag, Send } from 'lucide-react';
import { Product, formatPKR } from '../utils/catalog';
import { ProductVisual } from './ProductVisual';

interface ProductQuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: string, color: string, quantity: number) => void;
  onWholesaleInquiryForProduct: (product: Product) => void;
}

export const ProductQuickViewModal: React.FC<ProductQuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onWholesaleInquiryForProduct
}) => {
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedNotice, setAddedNotice] = useState(false);

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0] || '');
      setSelectedSize(product.sizes[0] || '');
      setQuantity(1);
      setAddedNotice(false);
    }
  }, [product]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const handleAdd = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setAddedNotice(true);
    setTimeout(() => setAddedNotice(false), 2000);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="quickview-title"
      className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="relative bg-white w-full max-w-3xl rounded-2xl border border-[#E5DFD5] shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-[#7A7368] hover:text-[#1A1817] hover:bg-[#F2ECE4] rounded-full transition-colors cursor-pointer"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Visual column with Realistic Photography */}
          <div className="relative bg-[#F4EFEA] p-6 sm:p-8 flex items-center justify-center border-b md:border-b-0 md:border-r border-[#E5DFD5]">
            <div className="w-full max-w-[280px] aspect-[4/5] rounded-xl overflow-hidden shadow-sm">
              <ProductVisual
                type={product.visualType}
                imageUrl={product.imageUrl}
                alt={product.name}
                className="h-full p-0"
                colorName={selectedColor}
              />
            </div>
            <div className="absolute bottom-3 left-4 text-[11px] font-mono text-[#7A7368]">
              Origin: {product.origin}
            </div>
          </div>

          {/* Details column */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-6">
            <div>
              <div className="text-xs font-mono uppercase tracking-wider text-[#7A7368] mb-1">
                {product.category}
              </div>

              <h2 id="quickview-title" className="text-xl sm:text-2xl font-display font-medium text-[#1A1817]">
                {product.name}
              </h2>

              {/* Price row */}
              <div className="flex items-baseline gap-3 mt-3">
                <span className="text-2xl font-mono font-semibold text-[#1A1817] tabular-nums">
                  {formatPKR(product.retailPrice)}
                </span>
                <span className="text-xs text-[#7A7368]">Retail Single Order</span>
              </div>

              {/* Wholesale summary box */}
              <div className="mt-3 bg-[#FAF8F5] p-3 rounded-lg border border-[#E5DFD5] text-xs">
                <div className="font-semibold text-[#1A1817] mb-1">Wholesale Volume Tiers:</div>
                <div className="grid grid-cols-3 gap-2 font-mono text-[#5A5348] text-[11px]">
                  {product.wholesaleTiers.map((t, i) => (
                    <div key={i} className="bg-white p-1.5 rounded border border-[#E5DFD5] text-center">
                      <div className="text-[#8C8375]">{t.moq}+ pcs</div>
                      <div className="font-semibold text-[#1A1817]">{formatPKR(t.pricePerUnit)}/ea</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Description & specs */}
              <p className="text-xs text-[#5E574D] mt-4 leading-relaxed font-light">
                {product.description}
              </p>

              <div className="mt-3 text-xs text-[#5E574D] space-y-1">
                <div><strong className="text-[#1A1817]">Material:</strong> {product.material}</div>
              </div>

              {/* Color options */}
              <div className="mt-5">
                <label className="text-xs font-semibold text-[#1A1817] block mb-2">
                  Color: <span className="font-normal text-[#5E574D]">{selectedColor}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setSelectedColor(color)}
                      className={`px-3 py-1.5 text-xs rounded-md border transition-all cursor-pointer ${
                        selectedColor === color
                          ? 'border-[#1A1817] bg-[#1A1817] text-white'
                          : 'border-[#E5DFD5] bg-white text-[#4A453E] hover:border-[#B5ADA1]'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>

              {/* Size options */}
              <div className="mt-4">
                <label className="text-xs font-semibold text-[#1A1817] block mb-2">
                  Size: <span className="font-normal text-[#5E574D]">{selectedSize}</span>
                </label>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-10 px-3 py-1.5 text-xs rounded-md border font-mono transition-all cursor-pointer ${
                        selectedSize === size
                          ? 'border-[#1A1817] bg-[#1A1817] text-white'
                          : 'border-[#E5DFD5] bg-white text-[#4A453E] hover:border-[#B5ADA1]'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quantity selector */}
              <div className="mt-4 flex items-center gap-3">
                <label className="text-xs font-semibold text-[#1A1817]">Quantity:</label>
                <div className="flex items-center border border-[#E5DFD5] rounded-md bg-white">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-2.5 py-1 text-xs text-[#7A7368] hover:text-black cursor-pointer"
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="px-3 py-1 text-xs font-mono font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-2.5 py-1 text-xs text-[#7A7368] hover:text-black cursor-pointer"
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-2 pt-4 border-t border-[#F0EAE1]">
              <button
                onClick={handleAdd}
                className="w-full py-3 bg-[#1A1817] text-white text-xs font-medium tracking-wide rounded-md hover:bg-[#332F2C] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                {addedNotice ? (
                  <>
                    <Check className="w-4 h-4 text-[#D4AF37]" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4" />
                    <span>Add to Bag · {formatPKR(product.retailPrice * quantity)}</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  onWholesaleInquiryForProduct(product);
                  onClose();
                }}
                className="w-full py-2.5 bg-transparent border border-[#1A1817] text-[#1A1817] text-xs font-medium rounded-md hover:bg-[#F2ECE4] transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Request Wholesale Bulk Quote</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
