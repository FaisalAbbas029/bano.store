import React, { useState } from 'react';
import { CATEGORIES } from '../utils/catalog';
import { X, Shield, FileText, Truck, Lock } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
  onSelectCategory: (category: string) => void;
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigateSection,
  onSelectCategory,
  onOpenAdmin
}) => {
  const [activePolicy, setActivePolicy] = useState<'privacy' | 'terms' | 'shipping' | null>(null);

  const policyContent = {
    privacy: {
      title: 'Privacy Policy & Customer Data Safeguards',
      icon: Shield,
      body: `Bano’s.Store respects the confidentiality of individual retail customers and wholesale commercial partners. When you submit an order request or wholesale inquiry, your contact details, business information, and order notes are utilized solely for fulfillment, proforma quotation, and shipping coordination. We do not sell, rent, or trade customer records to third-party data brokers. For any privacy requests or data removal, contact our data desk at contact@banos.store.`
    },
    terms: {
      title: 'Wholesale & Retail Commercial Terms',
      icon: FileText,
      body: `1. Retail Orders: Single orders are subject to stock availability. Retail returns are accepted within 14 calendar days of receipt for unused items with original tags intact.
2. Wholesale Orders: Bulk orders are governed by the finalized proforma invoice outlining unit prices, production lead time, and delivery incoterms (FOB/CIF). Sample approval is recommended prior to volume manufacturing.
3. Pricing & Currency: All quoted rates are in USD unless explicitly stated otherwise in a custom commercial agreement.`
    },
    shipping: {
      title: 'Fulfillment, Lead Times & Global Logistics',
      icon: Truck,
      body: `1. Retail Standard Delivery: Orders are packed within 2-3 business days and delivered within 7-12 business days via trackable international postal or express couriers.
2. Wholesale Logistics: Bulk shipments are dispatched via air cargo (5-8 days) or sea freight (20-30 days depending on target destination port). Full carton dimensions, net/gross weights, and customs paperwork are provided with each consignment.`
    }
  };

  return (
    <>
      <footer className="bg-[#141211] text-[#E0D7CC] pt-16 pb-12 border-t border-[#262321]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-[#2C2926]">
            
            {/* Col 1: Brand & Bio */}
            <div className="lg:col-span-4 space-y-4">
              <h3 className="text-xl font-display font-semibold text-white tracking-tight">
                Bano’s.Store
              </h3>
              <p className="text-xs text-[#9E9588] leading-relaxed max-w-sm font-light">
                We sell a variety of high-quality Chinese products, including clothes, bags,
                trousers, winter wear, coats, sweaters, sneakers, and more. Both retail and
                wholesale options are available at reasonable prices.
              </p>
              <div className="text-xs text-[#7A7368] font-mono">
                Direct export sourcing · Zhejiang, Guangdong &amp; Fujian Hubs
              </div>
            </div>

            {/* Col 2: Shop Categories */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                Curated Categories
              </h4>
              <ul className="space-y-2 text-xs text-[#B5ACA0]">
                {CATEGORIES.filter(c => c !== 'All').map((cat) => (
                  <li key={cat}>
                    <button
                      onClick={() => {
                        onSelectCategory(cat);
                        onNavigateSection('catalog');
                      }}
                      className="hover:text-white transition-colors cursor-pointer"
                    >
                      {cat}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Navigation & Portals */}
            <div className="lg:col-span-2 space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                Explore Store
              </h4>
              <ul className="space-y-2 text-xs text-[#B5ACA0]">
                <li>
                  <button onClick={() => onNavigateSection('hero')} className="hover:text-white transition-colors cursor-pointer">
                    Home Lookbook
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateSection('catalog')} className="hover:text-white transition-colors cursor-pointer">
                    Full Catalog
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateSection('wholesale')} className="hover:text-white transition-colors cursor-pointer">
                    Wholesale Inquiries
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateSection('story')} className="hover:text-white transition-colors cursor-pointer">
                    Sourcing &amp; Quality
                  </button>
                </li>
                <li>
                  <button onClick={() => onNavigateSection('contact')} className="hover:text-white transition-colors cursor-pointer">
                    Contact Channels
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Commercial Policies & Admin */}
            <div className="lg:col-span-3 space-y-3">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider font-mono">
                Terms &amp; Administration
              </h4>
              <ul className="space-y-2 text-xs text-[#B5ACA0]">
                <li>
                  <button onClick={() => setActivePolicy('privacy')} className="hover:text-white transition-colors cursor-pointer">
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button onClick={() => setActivePolicy('terms')} className="hover:text-white transition-colors cursor-pointer">
                    Wholesale Commercial Terms
                  </button>
                </li>
                <li>
                  <button onClick={() => setActivePolicy('shipping')} className="hover:text-white transition-colors cursor-pointer">
                    Shipping &amp; Lead Times
                  </button>
                </li>
                <li className="pt-2">
                  <button
                    onClick={onOpenAdmin}
                    className="inline-flex items-center gap-1.5 text-xs text-[#D8D2C9] hover:text-white font-mono bg-white/5 hover:bg-white/10 px-2.5 py-1 rounded transition-colors cursor-pointer"
                  >
                    <Lock className="w-3 h-3 text-[#B5ADA1]" />
                    <span>Merchant Admin Portal</span>
                  </button>
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-[#7A7368] gap-4">
            <p>
              &copy; {new Date().getFullYear()} Bano’s.Store. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <span>Retail &amp; Wholesale Operations</span>
              <span aria-hidden="true">·</span>
              <span>Reasonable Pricing</span>
              <span aria-hidden="true">·</span>
              <span>Direct Sourcing</span>
            </div>
          </div>

        </div>
      </footer>

      {/* Policy Modal Dialog */}
      {activePolicy && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6"
          onClick={() => setActivePolicy(null)}
        >
          <div
            className="relative bg-white w-full max-w-lg rounded-2xl border border-[#E5DFD5] shadow-2xl p-6 sm:p-8 space-y-4 animate-in fade-in zoom-in-95 duration-200 text-[#1A1817]"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setActivePolicy(null)}
              className="absolute top-4 right-4 p-2 text-[#7A7368] hover:text-[#1A1817] hover:bg-[#F2ECE4] rounded-full transition-colors cursor-pointer"
              aria-label="Close dialog"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 border-b border-[#E5DFD5] pb-3">
              {React.createElement(policyContent[activePolicy].icon, { className: 'w-5 h-5 text-[#8A7E6E]' })}
              <h3 className="text-base font-semibold">
                {policyContent[activePolicy].title}
              </h3>
            </div>

            <div className="text-xs text-[#5A5348] leading-relaxed whitespace-pre-line font-light">
              {policyContent[activePolicy].body}
            </div>

            <div className="pt-4 border-t border-[#F0EAE1] flex justify-end">
              <button
                onClick={() => setActivePolicy(null)}
                className="px-4 py-2 bg-[#1A1817] text-white text-xs font-medium rounded-md hover:bg-[#332F2C] transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
