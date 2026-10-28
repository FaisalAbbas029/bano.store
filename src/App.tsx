import React, { useState, useEffect } from 'react';
import {
  INITIAL_PRODUCTS,
  CATALOG_STORAGE_KEY,
  Product,
  CartItem,
  addProduct,
  updateProduct,
  deleteProduct
} from './utils/catalog';
import { checkAdminSession, clearAdminSession } from './utils/auth';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { HeroSection } from './components/HeroSection';
import { CategoryShowcase } from './components/CategoryShowcase';
import { ProductCatalog } from './components/ProductCatalog';
import { BrandStory } from './components/BrandStory';
import { EditorialBanner } from './components/EditorialBanner';
import { WholesaleSection } from './components/WholesaleSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { ProductQuickViewModal } from './components/ProductQuickViewModal';
import { CartDrawer } from './components/CartDrawer';
import { SearchModal } from './components/SearchModal';
import { AdminPanel } from './components/AdminPanel';
import { AdminLoginModal } from './components/AdminLoginModal';
import { Check } from 'lucide-react';

export default function App() {
  // Catalog State with LocalStorage Persistence
  const [products, setProducts] = useState<Product[]>(() => {
    try {
      const saved = localStorage.getItem(CATALOG_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // Fallback
    }
    return INITIAL_PRODUCTS;
  });

  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(() => checkAdminSession());
  const [wholesalePrefillCategory, setWholesalePrefillCategory] = useState<string | undefined>(undefined);
  const [wholesalePrefillMessage, setWholesalePrefillMessage] = useState<string | undefined>(undefined);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Cart state with localStorage persistence
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('banos_cart');
      if (saved) return JSON.parse(saved);
    } catch (e) {
      // Fallback
    }
    return [
      {
        product: INITIAL_PRODUCTS[1],
        selectedColor: 'Alabaster Ivory',
        selectedSize: 'S',
        quantity: 1
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem(CATALOG_STORAGE_KEY, JSON.stringify(products));
    } catch (e) {
      // Ignore
    }
  }, [products]);

  useEffect(() => {
    try {
      localStorage.setItem('banos_cart', JSON.stringify(cartItems));
    } catch (e) {
      // Ignore
    }
  }, [cartItems]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Admin Access Gate
  const handleAdminClick = () => {
    if (isAdminAuthenticated) {
      setIsAdminOpen(true);
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    setIsAdminAuthenticated(true);
    setIsLoginModalOpen(false);
    setIsAdminOpen(true);
    showToast('Admin authentication successful.');
  };

  const handleAdminSignOut = () => {
    clearAdminSession();
    setIsAdminAuthenticated(false);
    setIsAdminOpen(false);
    showToast('Signed out of Admin Portal.');
  };

  // Admin CRUD Actions
  const handleAddProduct = (newProduct: Product) => {
    setProducts(prev => addProduct(prev, newProduct));
    showToast(`New product "${newProduct.name}" published to store.`);
  };

  const handleUpdateProduct = (id: string, updates: Partial<Product>) => {
    setProducts(prev => updateProduct(prev, id, updates));
    showToast('Product specifications updated.');
  };

  const handleDeleteProduct = (id: string) => {
    setProducts(prev => deleteProduct(prev, id));
    showToast('Product removed from catalog.');
  };

  const handleResetCatalog = () => {
    setProducts(INITIAL_PRODUCTS);
    localStorage.removeItem('banos_catalog');
    showToast('Catalog restored to default inventory.');
  };

  // Cart Actions
  const handleAddToCart = (product: Product, size: string, color: string, quantity = 1) => {
    setCartItems(prev => {
      const existingIdx = prev.findIndex(
        item => item.product.id === product.id && item.selectedSize === size && item.selectedColor === color
      );

      if (existingIdx > -1) {
        const next = [...prev];
        next[existingIdx] = {
          ...next[existingIdx],
          quantity: next[existingIdx].quantity + quantity
        };
        return next;
      } else {
        return [...prev, { product, selectedSize: size, selectedColor: color, quantity }];
      }
    });

    showToast(`Added ${quantity}x "${product.name}" to your bag.`);
  };

  const handleUpdateCartQuantity = (index: number, newQty: number) => {
    if (newQty <= 0) {
      handleRemoveCartItem(index);
      return;
    }
    setCartItems(prev => {
      const next = [...prev];
      next[index] = { ...next[index], quantity: newQty };
      return next;
    });
  };

  const handleRemoveCartItem = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
    showToast('Item removed from your bag.');
  };

  const handleClearCart = () => {
    setCartItems([]);
  };

  const scrollToSection = (id: string, category?: string) => {
    if (category) {
      setSelectedCategory(category);
    }
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    scrollToSection('catalog');
  };

  const handleWholesaleQuoteForProduct = (product: Product) => {
    setWholesalePrefillCategory(product.category);
    setWholesalePrefillMessage(`Inquiring about bulk order for "${product.name}" (SKU: ${product.id}). Requesting carton breakdown and lead times.`);
    scrollToSection('wholesale');
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#1A1817] selection:bg-[#E8DFD5] selection:text-[#1A1817]">
      {/* Toast Notification */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 right-6 z-50 bg-[#1A1817] text-white text-xs font-medium px-4 py-3 rounded-lg shadow-xl border border-[#332F2C] flex items-center gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200"
        >
          <Check className="w-4 h-4 text-[#D4AF37]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Top Bar Navigation */}
      <Header
        cartItemCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenAdmin={handleAdminClick}
        onNavigateSection={scrollToSection}
      />

      <main className="flex-1">
        {/* 3. Hero Section with Animated Typography & Realistic Photography */}
        <HeroSection
          onExploreCollection={() => scrollToSection('catalog')}
          onWholesaleEnquiry={() => scrollToSection('wholesale')}
        />

        {/* 4. Featured Category Showcase with High-Resolution Images */}
        <CategoryShowcase onSelectCategory={handleCategorySelect} />

        {/* 5. Product Catalog & Filterable Showcase with Real Photography */}
        <ProductCatalog
          products={products}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
          onQuickView={setQuickViewProduct}
          onAddToCart={handleAddToCart}
          onWholesaleSelect={handleWholesaleQuoteForProduct}
        />

        {/* 6. Brand Story & Value Proposition */}
        <BrandStory />

        {/* 7. Editorial Lookbook Banner */}
        <EditorialBanner onExplore={() => scrollToSection('catalog')} />

        {/* 8. Wholesale Inquiry Section */}
        <WholesaleSection
          initialCategory={wholesalePrefillCategory}
          initialMessage={wholesalePrefillMessage}
        />

        {/* 9. Contact Channels */}
        <ContactSection />
      </main>

      {/* 10. Footer with Policies & Links */}
      <Footer
        onNavigateSection={scrollToSection}
        onSelectCategory={handleCategorySelect}
        onOpenAdmin={handleAdminClick}
      />

      {/* Modals & Portals */}
      <ProductQuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onWholesaleInquiryForProduct={handleWholesaleQuoteForProduct}
      />

      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onClearCart={handleClearCart}
      />

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Admin Authentication Gate */}
      <AdminLoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={handleLoginSuccess}
      />

      {/* Merchant Admin Command Center */}
      {isAdminOpen && (
        <AdminPanel
          products={products}
          onAddProduct={handleAddProduct}
          onUpdateProduct={handleUpdateProduct}
          onDeleteProduct={handleDeleteProduct}
          onResetCatalog={handleResetCatalog}
          onClose={() => setIsAdminOpen(false)}
          onSignOut={handleAdminSignOut}
        />
      )}
    </div>
  );
}
