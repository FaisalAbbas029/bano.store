import React from 'react';
import { CheckCircle2, Shield, Factory, Gem } from 'lucide-react';

export const BrandStory: React.FC = () => {
  return (
    <section id="story" className="py-20 bg-[#F5EFE8] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Brand Mission & Value Prop */}
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7D7569] block">
              The Bano’s.Store Principle
            </span>
            
            <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#1A1817] leading-tight">
              Style for Every Day.
              <span className="block text-[#5A5145] font-normal">
                Options for Every Order.
              </span>
            </h2>

            <p className="text-sm sm:text-base text-[#5A5348] font-light leading-relaxed">
              At Bano’s.Store, we bridge the gap between discerning individual shoppers and
              commercial wholesale buyers. By partnering directly with specialized manufacturing hubs
              across China—from wool-tailoring workshops in Zhejiang to precision leathercraft studios
              in Guangdong—we offer high-grade apparel, footwear, and accessories at honest, sensible prices.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div className="p-4 bg-white/80 rounded-lg border border-[#E5DFD5]">
                <div className="flex items-center gap-2 mb-1.5">
                  <Gem className="w-4 h-4 text-[#8A7E6E]" />
                  <h4 className="text-xs font-semibold text-[#1A1817]">Direct Factory Sourcing</h4>
                </div>
                <p className="text-xs text-[#6B6356] font-light leading-normal">
                  Eliminating unnecessary middlemen to offer retail pieces and bulk volumes at reasonable margins.
                </p>
              </div>

              <div className="p-4 bg-white/80 rounded-lg border border-[#E5DFD5]">
                <div className="flex items-center gap-2 mb-1.5">
                  <Shield className="w-4 h-4 text-[#8A7E6E]" />
                  <h4 className="text-xs font-semibold text-[#1A1817]">Pre-Shipment Inspection</h4>
                </div>
                <p className="text-xs text-[#6B6356] font-light leading-normal">
                  All fabric weights, seam integrity, and finishing details undergo stringent inspection before dispatch.
                </p>
              </div>

              <div className="p-4 bg-white/80 rounded-lg border border-[#E5DFD5]">
                <div className="flex items-center gap-2 mb-1.5">
                  <Factory className="w-4 h-4 text-[#8A7E6E]" />
                  <h4 className="text-xs font-semibold text-[#1A1817]">Retail &amp; Bulk Versatility</h4>
                </div>
                <p className="text-xs text-[#6B6356] font-light leading-normal">
                  Single wardrobe updates or carton-scale wholesale shipments handled with equal care.
                </p>
              </div>

              <div className="p-4 bg-white/80 rounded-lg border border-[#E5DFD5]">
                <div className="flex items-center gap-2 mb-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#8A7E6E]" />
                  <h4 className="text-xs font-semibold text-[#1A1817]">Clear Communication</h4>
                </div>
                <p className="text-xs text-[#6B6356] font-light leading-normal">
                  Responsive inquiry handling, transparent batch lead times, and dedicated order assistance.
                </p>
              </div>
            </div>

          </div>

          {/* Right Column: Visual Showcase Card */}
          <div className="lg:col-span-5">
            <div className="relative bg-[#FAF8F5] border border-[#E5DFD5] rounded-2xl p-6 shadow-sm">
              <div className="space-y-4">
                <div className="border-b border-[#E5DFD5] pb-4">
                  <div className="text-xs font-mono uppercase text-[#7A7368]">Specialized Regional Guilds</div>
                  <div className="text-lg font-semibold text-[#1A1817] mt-0.5">Where We Source</div>
                </div>

                <div className="space-y-3 text-xs">
                  <div className="flex justify-between items-center py-2 border-b border-[#F0EAE1]">
                    <div>
                      <div className="font-semibold text-[#1A1817]">Zhejiang &amp; Jiangsu</div>
                      <div className="text-[#7A7368]">Fine wool overcoats, cardigans &amp; cashmere blends</div>
                    </div>
                    <span className="font-mono text-[#8A7E6E] shrink-0 text-[11px]">Primary Knit Hub</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-[#F0EAE1]">
                    <div>
                      <div className="font-semibold text-[#1A1817]">Guangdong &amp; Guangzhou</div>
                      <div className="text-[#7A7368]">Structured leather bags, trousers &amp; daily apparel</div>
                    </div>
                    <span className="font-mono text-[#8A7E6E] shrink-0 text-[11px]">Leathercraft</span>
                  </div>

                  <div className="flex justify-between items-center py-2 border-b border-[#F0EAE1]">
                    <div>
                      <div className="font-semibold text-[#1A1817]">Fujian</div>
                      <div className="text-[#7A7368]">Vulcanized cupsole sneakers &amp; leather lifestyle shoes</div>
                    </div>
                    <span className="font-mono text-[#8A7E6E] shrink-0 text-[11px]">Footwear Center</span>
                  </div>

                  <div className="flex justify-between items-center py-2">
                    <div>
                      <div className="font-semibold text-[#1A1817]">Hebei Northern Province</div>
                      <div className="text-[#7A7368]">700+ fill power down puffers &amp; thermal storm parkas</div>
                    </div>
                    <span className="font-mono text-[#8A7E6E] shrink-0 text-[11px]">Winter Outerwear</span>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <p className="text-[11px] text-[#7A7368] italic">
                    Every order includes complete material specification tags and verified sizing guidelines.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
