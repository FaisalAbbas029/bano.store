import React from 'react';
import { ArrowRight } from 'lucide-react';

interface EditorialBannerProps {
  onExplore: () => void;
}

export const EditorialBanner: React.FC<EditorialBannerProps> = ({ onExplore }) => {
  return (
    <section className="relative overflow-hidden bg-[#1A1817] text-[#FAF8F5] py-24 sm:py-32">
      {/* Subtle geometric lines */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute left-1/4 top-0 bottom-0 w-px bg-white" />
        <div className="absolute right-1/4 top-0 bottom-0 w-px bg-white" />
        <div className="absolute top-1/2 left-0 right-0 h-px bg-white" />
      </div>

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs font-mono uppercase tracking-widest text-[#B5ADA1]">
          The Seasonal Lookbook
        </span>

        <h2 className="text-3xl sm:text-5xl lg:text-6xl font-display font-medium text-white tracking-tight max-w-3xl mx-auto leading-tight text-balance">
          Discover More.
          <span className="block italic font-normal text-[#D8D2C9]">
            Choose Your Style.
          </span>
        </h2>

        <p className="text-sm sm:text-base text-[#BDB5A8] max-w-xl mx-auto font-light leading-relaxed">
          From crisp double-pleated trousers to heavyweight knitwear and waterproof winter parkas,
          each piece represents thoughtful craftsmanship and accessible pricing.
        </p>

        <div className="pt-4">
          <button
            onClick={onExplore}
            className="inline-flex items-center gap-2 px-8 py-3.5 bg-white text-[#1A1817] text-xs font-semibold tracking-wider uppercase rounded-md hover:bg-[#EAE4DC] transition-colors cursor-pointer"
          >
            <span>Browse All Collections</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
