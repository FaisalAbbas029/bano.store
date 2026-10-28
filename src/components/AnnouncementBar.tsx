import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';

export const AnnouncementBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <aside aria-label="Announcement" className="bg-[#1A1817] text-[#FAF8F5] text-xs font-medium tracking-wide py-2 px-4 transition-all border-b border-[#2C2926]">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="w-6 shrink-0" aria-hidden="true" />
        
        <div className="flex items-center gap-2 text-center overflow-hidden">
          <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" aria-hidden="true" />
          <p className="truncate">
            <span className="font-semibold text-white">Retail &amp; Wholesale Available</span>
            <span className="mx-2 text-[#7A7368]" aria-hidden="true">·</span>
            <span>Direct High-Quality Chinese Apparel &amp; Lifestyle Goods</span>
            <span className="mx-2 text-[#7A7368]" aria-hidden="true">·</span>
            <span className="text-[#E0D7CC]">Tiered Bulk Pricing on Inquiries</span>
          </p>
        </div>

        <button
          onClick={() => setIsVisible(false)}
          className="text-[#9E988F] hover:text-white transition-colors p-1 -mr-1"
          aria-label="Dismiss announcement"
        >
          <X className="w-3.5 h-3.5" />
        </button>
      </div>
    </aside>
  );
};
