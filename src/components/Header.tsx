import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Menu, X, ArrowRight, Shield } from 'lucide-react';

interface HeaderProps {
  cartItemCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onOpenAdmin: () => void;
  onNavigateSection: (sectionId: string, category?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  cartItemCount,
  onOpenCart,
  onOpenSearch,
  onOpenAdmin,
  onNavigateSection
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (sectionId: string, category?: string) => {
    onNavigateSection(sectionId, category);
    setMobileMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-300 ${
        isScrolled
          ? 'bg-[#FAF8F5]/95 backdrop-blur-md border-b border-[#E8E2D8] shadow-xs'
          : 'bg-[#FAF8F5] border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          {/* Zone 1: Brand Wordmark */}
          <button
            onClick={() => handleNavClick('hero')}
            className="text-2xl font-display font-semibold tracking-tight text-[#1A1817] hover:opacity-90 transition-opacity text-left whitespace-nowrap shrink-0 cursor-pointer"
          >
            Bano’s.Store
          </button>

          {/* Zone 2: Navigation links */}
          <nav aria-label="Main Navigation" className="hidden md:flex items-center gap-7 text-sm font-medium text-[#4A453E]">
            <button
              onClick={() => handleNavClick('catalog', 'All')}
              className="hover:text-[#1A1817] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Shop
            </button>
            <button
              onClick={() => handleNavClick('catalog', "Women's Fashion")}
              className="hover:text-[#1A1817] transition-colors whitespace-nowrap shrink-0 cursor-pointer text-[#1A1817] font-semibold flex items-center gap-1.5"
            >
              <span>Women</span>
              <span className="text-[10px] font-mono uppercase bg-[#EAE2D5] px-1.5 py-0.2 rounded text-[#5E5448]">New</span>
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="hover:text-[#1A1817] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Categories
            </button>
            <button
              onClick={() => handleNavClick('wholesale')}
              className="hover:text-[#1A1817] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Wholesale
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className="hover:text-[#1A1817] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Brand Story
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="hover:text-[#1A1817] transition-colors whitespace-nowrap shrink-0 cursor-pointer"
            >
              Contact
            </button>
          </nav>

          {/* Zone 3: Actions & Shopping Bag */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Merchant Admin Portal Quick Access */}
            <button
              onClick={onOpenAdmin}
              className="px-2.5 py-1.5 text-xs font-mono font-medium text-[#5E5549] hover:text-[#1A1817] hover:bg-[#F0EBE3] rounded border border-[#E5DFD5] transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Open Merchant Admin Panel"
              aria-label="Open Admin Panel"
            >
              <Shield className="w-3.5 h-3.5 text-[#8A7E6E]" />
              <span className="hidden sm:inline">Admin</span>
            </button>

            <button
              onClick={onOpenSearch}
              className="p-2 text-[#4A453E] hover:text-[#1A1817] hover:bg-[#F0EBE3] rounded-lg transition-colors cursor-pointer"
              aria-label="Search catalog"
            >
              <Search className="w-5 h-5" />
            </button>

            <button
              onClick={onOpenCart}
              className="relative p-2 text-[#1A1817] hover:bg-[#F0EBE3] rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
              aria-label={`Shopping Bag with ${cartItemCount} items`}
            >
              <ShoppingBag className="w-5 h-5" />
              <span className="text-xs font-mono font-medium text-[#1A1817] bg-[#E8DFD5] px-1.5 py-0.5 rounded-sm tabular-nums">
                {cartItemCount}
              </span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-[#1A1817] hover:bg-[#F0EBE3] rounded-lg transition-colors"
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FAF8F5] border-b border-[#E8E2D8] px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3 text-base font-medium text-[#2C2824]">
            <button
              onClick={() => handleNavClick('catalog')}
              className="text-left py-2 hover:text-black border-b border-[#F0EAE1] flex items-center justify-between"
            >
              <span>Shop All Products</span>
              <ArrowRight className="w-4 h-4 text-[#8C8375]" />
            </button>
            <button
              onClick={() => handleNavClick('catalog', "Women's Fashion")}
              className="text-left py-2 hover:text-black border-b border-[#F0EAE1] flex items-center justify-between text-[#1A1817] font-semibold"
            >
              <div className="flex items-center gap-2">
                <span>Women’s Collection</span>
                <span className="text-[10px] font-mono uppercase bg-[#EAE2D5] px-1.5 py-0.2 rounded text-[#5E5448]">New</span>
              </div>
              <ArrowRight className="w-4 h-4 text-[#8C8375]" />
            </button>
            <button
              onClick={() => handleNavClick('categories')}
              className="text-left py-2 hover:text-black border-b border-[#F0EAE1] flex items-center justify-between"
            >
              <span>Categories</span>
              <ArrowRight className="w-4 h-4 text-[#8C8375]" />
            </button>
            <button
              onClick={() => handleNavClick('wholesale')}
              className="text-left py-2 hover:text-black border-b border-[#F0EAE1] flex items-center justify-between"
            >
              <span>Wholesale Bulk Inquiries</span>
              <ArrowRight className="w-4 h-4 text-[#8C8375]" />
            </button>
            <button
              onClick={() => handleNavClick('story')}
              className="text-left py-2 hover:text-black border-b border-[#F0EAE1] flex items-center justify-between"
            >
              <span>Our Sourcing &amp; Quality</span>
              <ArrowRight className="w-4 h-4 text-[#8C8375]" />
            </button>
            <button
              onClick={() => handleNavClick('contact')}
              className="text-left py-2 hover:text-black border-b border-[#F0EAE1] flex items-center justify-between"
            >
              <span>Contact Us</span>
              <ArrowRight className="w-4 h-4 text-[#8C8375]" />
            </button>
            <button
              onClick={() => {
                onOpenAdmin();
                setMobileMenuOpen(false);
              }}
              className="text-left py-2 font-mono text-xs text-[#1A1817] flex items-center justify-between bg-[#EFE9E0] px-3 rounded-md"
            >
              <span className="flex items-center gap-1.5 font-semibold">
                <Shield className="w-4 h-4 text-[#8A7E6E]" />
                Merchant Admin Panel
              </span>
              <ArrowRight className="w-4 h-4 text-[#8C8375]" />
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};
