import React from 'react';
import { ArrowDownRight, ShieldCheck, Layers, PackageCheck } from 'lucide-react';
import { ProductVisual } from './ProductVisual';

interface HeroSectionProps {
  onExploreCollection: () => void;
  onWholesaleEnquiry: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onExploreCollection,
  onWholesaleEnquiry
}) => {
  return (
    <section id="hero" className="relative overflow-hidden pt-8 pb-16 lg:py-20 border-b border-[#E8E2D8]">
      {/* Subtle background ambient styling */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-[#F5EFE8]/60 pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Editorial Headline & Actions */}
          <div className="lg:col-span-7 space-y-8">
            <div className="animate-editorial-fade-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-mono uppercase tracking-widest text-[#7D7569]">
              <span>Autumn / Winter &amp; Core Collection</span>
              <span className="hidden sm:inline" aria-hidden="true">·</span>
              <span>Retail &amp; Wholesale</span>
            </div>

            {/* Main Headline */}
            <h1 className="animate-editorial-fade-2 text-4xl sm:text-5xl lg:text-6xl font-display font-medium text-[#1A1817] tracking-tight leading-[1.1] text-balance">
              Everyday Style.
              <span className="block italic font-normal text-[#5A5145]">
                Exceptional Value.
              </span>
            </h1>

            {/* Supporting Copy */}
            <p className="animate-editorial-fade-3 text-base sm:text-lg text-[#5A5348] max-w-xl leading-relaxed font-light">
              Discover fashion, footwear, bags and seasonal essentials at Bano’s.Store —
              curated directly from specialized Chinese manufacturing hubs with options
              for both individual retail orders and volume wholesale purchasing.
            </p>

            {/* Action Buttons */}
            <div className="animate-editorial-fade-3 flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreCollection}
                className="px-6 py-3.5 bg-[#1A1817] text-[#FAF8F5] text-sm font-medium tracking-wide rounded-md hover:bg-[#332F2C] transition-all flex items-center gap-2 shadow-xs cursor-pointer"
              >
                <span>Explore Collection</span>
                <ArrowDownRight className="w-4 h-4" />
              </button>

              <button
                onClick={onWholesaleEnquiry}
                className="px-6 py-3.5 bg-transparent text-[#1A1817] text-sm font-medium tracking-wide border border-[#1A1817] rounded-md hover:bg-[#F0EAE1] transition-all cursor-pointer"
              >
                Wholesale Enquiries
              </button>
            </div>

            {/* Trust and Sourcing indicators */}
            <div className="animate-editorial-fade-3 pt-6 border-t border-[#E8E2D8] grid grid-cols-3 gap-4 text-xs text-[#6B6356]">
              <div className="flex items-start gap-2">
                <ShieldCheck className="w-4 h-4 text-[#8A7E6E]" />
                <div>
                  <div className="font-semibold text-[#1A1817]">Inspected Quality</div>
                  <div className="text-[11px] text-[#7A7368]">Every garment checked</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <Layers className="w-4 h-4 text-[#8A7E6E]" />
                <div>
                  <div className="font-semibold text-[#1A1817]">Tiered Bulk MOQ</div>
                  <div className="text-[11px] text-[#7A7368]">Scale discounts from 10+</div>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <PackageCheck className="w-4 h-4 text-[#8A7E6E]" />
                <div>
                  <div className="font-semibold text-[#1A1817]">Worldwide Sourcing</div>
                  <div className="text-[11px] text-[#7A7368]">Export standard packing</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Visual Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="animate-editorial-scale relative mx-auto max-w-md lg:max-w-none">
              {/* Primary Visual Container with Realistic Photography */}
              <div className="bg-[#FAF8F5] border border-[#E5DFD5] rounded-xl overflow-hidden shadow-lg p-3 group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-lg bg-[#F4EFEA]">
                  <ProductVisual
                    type="coat"
                    imageUrl="https://images.unsplash.com/photo-1544923246-77307dd654cb?w=900&auto=format&fit=crop&q=80"
                    alt="Atelier Double-Breasted Wool Overcoat"
                    className="h-full p-0"
                    colorName="Double-Breasted Wool Overcoat"
                  />
                  
                  {/* Subtle Badge Tag */}
                  <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-xs border border-[#E5DFD5] text-[#1A1817] text-xs font-medium px-3 py-1 rounded-sm shadow-xs">
                    Flagship Piece
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md border border-[#E5DFD5] p-3 rounded-lg shadow-sm flex items-center justify-between">
                    <div>
                      <div className="text-xs text-[#7A7368] uppercase font-mono">Retail · Wholesale</div>
                      <div className="text-sm font-semibold text-[#1A1817]">Atelier Melton Coat</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold font-mono text-[#1A1817] tabular-nums">PKR 41,000</div>
                      <div className="text-[11px] text-[#7A7368] font-mono">Bulk from PKR 18,000</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Decorative Secondary Mini Preview Tile on desktop */}
              <div className="hidden lg:block absolute -bottom-5 -left-6 w-44 z-20 bg-white border border-[#E5DFD5] rounded-lg shadow-md p-2">
                <div className="aspect-square bg-[#F4EFEA] rounded overflow-hidden">
                  <ProductVisual
                    type="bag"
                    imageUrl="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&auto=format&fit=crop&q=80"
                    alt="Architecture Leather Tote"
                    className="p-0"
                  />
                </div>
                <div className="pt-2 px-1">
                  <div className="text-[11px] font-semibold text-[#1A1817] truncate">Architecture Leather Tote</div>
                  <div className="text-[10px] text-[#7A7368] font-mono">PKR 25,500 / Bulk PKR 10,500</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
