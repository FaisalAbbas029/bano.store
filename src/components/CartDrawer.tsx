import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, CheckCircle2, Copy, Check } from 'lucide-react';
import { CartItem, calculateCartTotals, formatPKR } from '../utils/catalog';
import { ProductVisual } from './ProductVisual';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (index: number, newQty: number) => void;
  onRemoveItem: (index: number) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'form' | 'confirmed'>('cart');
  const [customerName, setCustomerName] = useState('');
  const [customerContact, setCustomerContact] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [orderRef, setOrderRef] = useState('');
  const [copiedRef, setCopiedRef] = useState(false);
  const [formError, setFormError] = useState('');

  if (!isOpen) return null;

  const totals = calculateCartTotals(items, 35000);

  const handleStartCheckout = () => {
    setCheckoutStep('form');
  };

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !customerContact.trim() || !shippingAddress.trim()) {
      setFormError('Please fill out all recipient and shipping details.');
      return;
    }
    setFormError('');

    const year = new Date().getFullYear();
    const random = Math.floor(1000 + Math.random() * 9000);
    const newRef = `BS-ORD-${year}-${random}`;
    setOrderRef(newRef);
    setCheckoutStep('confirmed');
  };

  const handleCloseAndReset = () => {
    if (checkoutStep === 'confirmed') {
      onClearCart();
      setCheckoutStep('cart');
    }
    onClose();
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cart-title"
      className="fixed inset-0 z-50 overflow-hidden bg-black/50 backdrop-blur-xs flex justify-end"
      onClick={handleCloseAndReset}
    >
      <div
        className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Drawer Header */}
        <div className="px-6 py-5 border-b border-[#E5DFD5] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[#1A1817]" />
            <h2 id="cart-title" className="text-base font-semibold text-[#1A1817]">
              Shopping Bag ({totals.totalItemCount})
            </h2>
          </div>
          <button
            onClick={handleCloseAndReset}
            className="p-1 text-[#8C8375] hover:text-[#1A1817] rounded-md transition-colors cursor-pointer"
            aria-label="Close shopping bag"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Meter */}
        {items.length > 0 && checkoutStep === 'cart' && (
          <div className="bg-[#FAF8F5] px-6 py-2.5 border-b border-[#E5DFD5] text-xs">
            {totals.amountUntilFreeShipping > 0 ? (
              <p className="text-[#6B6356]">
                Add <strong className="font-mono text-[#1A1817]">{formatPKR(totals.amountUntilFreeShipping)}</strong> more for free standard delivery.
              </p>
            ) : (
              <p className="text-emerald-700 font-medium flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>You qualify for free shipping across Pakistan!</span>
              </p>
            )}
            <div className="w-full bg-[#E5DFD5] h-1.5 rounded-full mt-1.5 overflow-hidden">
              <div
                className="bg-[#1A1817] h-full transition-all duration-300"
                style={{ width: `${Math.min(100, (totals.subtotal / totals.freeShippingThreshold) * 100)}%` }}
              />
            </div>
          </div>
        )}

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="text-center py-20 space-y-4">
              <div className="w-16 h-16 rounded-full bg-[#FAF8F5] border border-[#E5DFD5] flex items-center justify-center mx-auto text-[#8C8375]">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="text-base font-medium text-[#1A1817]">Your bag is currently empty</h3>
              <p className="text-xs text-[#7A7368] max-w-xs mx-auto">
                Explore our catalog to discover curated outerwear, knitwear, trousers, and lifestyle accessories.
              </p>
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#1A1817] text-white text-xs font-medium rounded-md hover:bg-[#332F2C] transition-colors cursor-pointer"
              >
                Start Exploring
              </button>
            </div>
          ) : checkoutStep === 'cart' ? (
            /* Cart Items List */
            <div className="space-y-4">
              {items.map((item, index) => (
                <div
                  key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${index}`}
                  className="flex gap-4 p-3 bg-[#FAF8F5] rounded-xl border border-[#E5DFD5]"
                >
                  <div className="w-20 h-24 bg-white rounded-lg border border-[#E5DFD5] overflow-hidden shrink-0">
                    <ProductVisual type={item.product.visualType} className="p-2" />
                  </div>

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h4 className="text-xs font-semibold text-[#1A1817] line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(index)}
                          className="text-[#9E9588] hover:text-red-600 transition-colors p-0.5 cursor-pointer"
                          aria-label={`Remove ${item.product.name}`}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="text-[11px] text-[#7A7368] mt-1 space-x-2">
                        <span>Color: <strong>{item.selectedColor}</strong></span>
                        <span aria-hidden="true">·</span>
                        <span>Size: <strong>{item.selectedSize}</strong></span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between pt-2 border-t border-[#EAE3D8]">
                      {/* Quantity Stepper */}
                      <div className="flex items-center border border-[#E0D7CC] rounded bg-white">
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-[#7A7368] hover:text-black cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          -
                        </button>
                        <span className="px-2.5 py-0.5 text-xs font-mono font-medium">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-[#7A7368] hover:text-black cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-xs font-semibold font-mono text-[#1A1817] tabular-nums">
                        {formatPKR(item.product.retailPrice * item.quantity)}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : checkoutStep === 'form' ? (
            /* Checkout Request Form (No raw credit card capture, compliant e-commerce request) */
            <form onSubmit={handleConfirmOrder} className="space-y-4 animate-in fade-in duration-200">
              <div className="border-b border-[#E5DFD5] pb-3">
                <h3 className="text-sm font-semibold text-[#1A1817]">Direct Order Processing Details</h3>
                <p className="text-xs text-[#7A7368]">
                  Submit your delivery information. Our desk will confirm stock availability and issue an official invoice &amp; payment link.
                </p>
              </div>

              {formError && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-700 text-xs rounded">
                  {formError}
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-[#1A1817] mb-1">
                  Recipient Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Marcus Thorne"
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E5DFD5] rounded-md text-[#1A1817] focus:outline-none focus:border-[#1A1817]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1A1817] mb-1">
                  Email or Phone / WhatsApp <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={customerContact}
                  onChange={(e) => setCustomerContact(e.target.value)}
                  placeholder="e.g. marcus@example.com or +1 (555) 012-3456"
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E5DFD5] rounded-md text-[#1A1817] focus:outline-none focus:border-[#1A1817]"
                />
              </div>

              <div>
                <label className="block text-xs font-medium text-[#1A1817] mb-1">
                  Shipping Delivery Address <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={3}
                  value={shippingAddress}
                  onChange={(e) => setShippingAddress(e.target.value)}
                  placeholder="Street address, city, state/province, postal code, country..."
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E5DFD5] rounded-md text-[#1A1817] focus:outline-none focus:border-[#1A1817]"
                />
              </div>

              <div className="bg-[#FAF8F5] p-3 rounded-lg border border-[#E5DFD5] text-[11px] text-[#6B6356] space-y-1">
                <div className="flex items-center gap-1.5 font-medium text-[#1A1817]">
                  <ShieldCheck className="w-3.5 h-3.5 text-[#8A7E6E]" />
                  <span>Transparent Sourcing &amp; Payment Notice</span>
                </div>
                <p>
                  We do not charge unverified cards. An itemized proforma invoice with final dispatch details is sent directly to your contact.
                </p>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className="px-3 py-2 border border-[#E5DFD5] text-xs font-medium text-[#1A1817] rounded-md hover:bg-[#FAF8F5] cursor-pointer"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#1A1817] text-white text-xs font-medium rounded-md hover:bg-[#332F2C] cursor-pointer"
                >
                  Confirm Order Request · {formatPKR(totals.total)}
                </button>
              </div>
            </form>
          ) : (
            /* Confirmed Order State */
            <div className="text-center py-6 space-y-4 animate-in fade-in duration-300">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h3 className="text-base font-semibold text-[#1A1817]">Order Request Registered</h3>
              <p className="text-xs text-[#6B6356] max-w-xs mx-auto">
                Thank you, <strong>{customerName}</strong>. Your order request has been logged and assigned an official tracking code.
              </p>

              <div className="bg-[#FAF8F5] p-4 rounded-xl border border-[#E5DFD5] text-left space-y-2">
                <div className="flex items-center justify-between border-b border-[#EAE3D8] pb-2">
                  <span className="text-xs text-[#7A7368]">Order Reference:</span>
                  <span className="font-mono font-semibold text-xs text-[#1A1817]">{orderRef}</span>
                </div>
                <div className="flex items-center justify-between border-b border-[#EAE3D8] pb-2">
                  <span className="text-xs text-[#7A7368]">Total Payable:</span>
                  <span className="font-mono font-semibold text-xs text-[#1A1817]">{formatPKR(totals.total)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-[#7A7368]">Recipient Contact:</span>
                  <span className="text-xs font-medium text-[#1A1817] truncate max-w-[180px]">{customerContact}</span>
                </div>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(orderRef);
                    setCopiedRef(true);
                    setTimeout(() => setCopiedRef(false), 2000);
                  }}
                  className="flex-1 py-2 bg-white border border-[#E5DFD5] text-xs font-medium text-[#1A1817] rounded-md hover:bg-[#FAF8F5] flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedRef ? 'Copied' : 'Copy Order Ref'}</span>
                </button>
                <button
                  onClick={handleCloseAndReset}
                  className="flex-1 py-2 bg-[#1A1817] text-white text-xs font-medium rounded-md hover:bg-[#332F2C] cursor-pointer"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Drawer Footer / Summary (when viewing items) */}
        {items.length > 0 && checkoutStep === 'cart' && (
          <div className="p-6 border-t border-[#E5DFD5] bg-[#FAF8F5] space-y-3">
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between text-[#6B6356]">
                <span>Items Subtotal:</span>
                <span className="font-mono text-[#1A1817]">{formatPKR(totals.subtotal)}</span>
              </div>
              <div className="flex justify-between text-[#6B6356]">
                <span>Estimated Shipping:</span>
                <span className="font-mono text-[#1A1817]">
                  {totals.shipping === 0 ? <span className="text-emerald-700 font-medium">FREE</span> : formatPKR(totals.shipping)}
                </span>
              </div>
              <div className="flex justify-between text-sm font-semibold text-[#1A1817] pt-2 border-t border-[#E5DFD5]">
                <span>Estimated Total:</span>
                <span className="font-mono">{formatPKR(totals.total)}</span>
              </div>
            </div>

            <button
              onClick={handleStartCheckout}
              className="w-full py-3 bg-[#1A1817] text-white text-xs font-medium tracking-wide rounded-md hover:bg-[#332F2C] transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs"
            >
              <span>Proceed to Checkout Request</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
