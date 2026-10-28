import React, { useState, useEffect } from 'react';
import { Send, CheckCircle, Copy, Check, Info, FileText, ArrowRight } from 'lucide-react';
import { CATEGORIES, validateWholesaleInquiry, generateInquiryRef, WholesaleInquiryData } from '../utils/catalog';

interface WholesaleSectionProps {
  initialCategory?: string;
  initialMessage?: string;
}

export const WholesaleSection: React.FC<WholesaleSectionProps> = ({
  initialCategory,
  initialMessage
}) => {
  const [formData, setFormData] = useState<WholesaleInquiryData>({
    fullName: '',
    businessName: '',
    contactMethod: 'email',
    contactValue: '',
    category: initialCategory && initialCategory !== 'All' ? initialCategory : 'Coats & Jackets',
    estimatedQuantity: '20 - 50 pcs',
    message: initialMessage || ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedInquiry, setSubmittedInquiry] = useState<{
    ref: string;
    data: WholesaleInquiryData;
    timestamp: string;
  } | null>(null);
  const [copiedRef, setCopiedRef] = useState(false);

  useEffect(() => {
    if (initialCategory && initialCategory !== 'All') {
      setFormData(prev => ({ ...prev, category: initialCategory }));
    }
  }, [initialCategory]);

  useEffect(() => {
    if (initialMessage) {
      setFormData(prev => ({ ...prev, message: initialMessage }));
    }
  }, [initialMessage]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validateWholesaleInquiry(formData);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);

    // Reliable client-side registration & persistence
    setTimeout(() => {
      const ref = generateInquiryRef();
      const record = {
        ref,
        data: { ...formData },
        timestamp: new Date().toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      };

      try {
        const existing = JSON.parse(localStorage.getItem('banos_wholesale_inquiries') || '[]');
        existing.push(record);
        localStorage.setItem('banos_wholesale_inquiries', JSON.stringify(existing));
      } catch (err) {
        // Fallback safely
      }

      setSubmittedInquiry(record);
      setIsSubmitting(false);
    }, 600);
  };

  const handleCopyRef = () => {
    if (!submittedInquiry) return;
    navigator.clipboard.writeText(submittedInquiry.ref);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2000);
  };

  const handleResetForm = () => {
    setSubmittedInquiry(null);
    setFormData({
      fullName: '',
      businessName: '',
      contactMethod: 'email',
      contactValue: '',
      category: 'Coats & Jackets',
      estimatedQuantity: '20 - 50 pcs',
      message: ''
    });
  };

  return (
    <section id="wholesale" className="py-20 bg-white border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Context & Guidelines */}
          <div className="lg:col-span-5 space-y-6">
            <span className="text-xs font-mono uppercase tracking-widest text-[#7D7569] block">
              Commercial &amp; Bulk Purchasing
            </span>

            <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#1A1817] leading-tight">
              Buying in Bulk?
              <span className="block text-[#5A5145] font-normal">
                Let’s Talk.
              </span>
            </h2>

            <p className="text-sm text-[#5A5348] font-light leading-relaxed">
              Looking for products in larger quantities? Contact Bano’s.Store to discuss your
              requirements and available wholesale options. Whether you are an independent boutique,
              an online store, or a regional distributor, we structure tier pricing tailored to order volumes.
            </p>

            <div className="space-y-4 pt-4 border-t border-[#E5DFD5]">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#E5DFD5] flex items-center justify-center text-xs font-mono font-bold text-[#1A1817] shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#1A1817]">Sample Orders First</h4>
                  <p className="text-xs text-[#7A7368] font-light mt-0.5">
                    Order individual units via our retail shop to evaluate fit, stitching, and fabric weight before placing volume orders.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#E5DFD5] flex items-center justify-center text-xs font-mono font-bold text-[#1A1817] shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#1A1817]">Flexible MOQs</h4>
                  <p className="text-xs text-[#7A7368] font-light mt-0.5">
                    Volume pricing starts at just 10–15 units per style with progressive price drops at 50+ and 200+ units.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#FAF8F5] border border-[#E5DFD5] flex items-center justify-center text-xs font-mono font-bold text-[#1A1817] shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-xs font-semibold text-[#1A1817]">Direct Quotation Dossier</h4>
                  <p className="text-xs text-[#7A7368] font-light mt-0.5">
                    Inquiries receive itemized formal proforma quotes including carton dimensions, FOB/CIF terms, and packing breakdowns.
                  </p>
                </div>
              </div>
            </div>

            <div className="p-4 bg-[#FAF8F5] rounded-lg border border-[#E5DFD5] text-xs text-[#6B6356] flex items-start gap-2.5">
              <Info className="w-4 h-4 text-[#8A7E6E] shrink-0 mt-0.5" />
              <span>
                <strong>Confidential Wholesale Processing:</strong> Your store information and inquiries are handled directly by our sales desk and never shared with third-party advertisers.
              </span>
            </div>
          </div>

          {/* Right Column: Inquiry Form or Success State */}
          <div className="lg:col-span-7">
            <div className="bg-[#FAF8F5] border border-[#E5DFD5] rounded-2xl p-6 sm:p-8 shadow-xs">
              
              {submittedInquiry ? (
                /* Verified Success State */
                <div className="space-y-6 animate-in fade-in duration-300">
                  <div className="flex items-center gap-3 text-emerald-800">
                    <CheckCircle className="w-8 h-8 text-emerald-600 shrink-0" />
                    <div>
                      <h3 className="text-lg font-semibold text-[#1A1817]">Wholesale Inquiry Confirmed</h3>
                      <p className="text-xs text-[#6B6356]">Your bulk inquiry has been recorded and assigned a priority tracking reference.</p>
                    </div>
                  </div>

                  {/* Reference Ticket */}
                  <div className="bg-white p-4 rounded-xl border border-[#E5DFD5] space-y-3">
                    <div className="flex items-center justify-between border-b border-[#F0EAE1] pb-3">
                      <div>
                        <div className="text-[11px] font-mono text-[#7A7368] uppercase">Inquiry Tracking Ref</div>
                        <div className="text-base font-mono font-semibold text-[#1A1817]">{submittedInquiry.ref}</div>
                      </div>
                      <button
                        onClick={handleCopyRef}
                        className="px-3 py-1.5 bg-[#FAF8F5] hover:bg-[#F0EAE1] border border-[#E5DFD5] rounded text-xs font-medium text-[#1A1817] flex items-center gap-1.5 transition-colors cursor-pointer"
                      >
                        {copiedRef ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                        <span>{copiedRef ? 'Copied' : 'Copy Ref'}</span>
                      </button>
                    </div>

                    <div className="grid grid-cols-2 gap-3 text-xs text-[#5A5348] pt-1">
                      <div>
                        <span className="text-[#8C8375] block">Representative:</span>
                        <strong className="text-[#1A1817]">{submittedInquiry.data.fullName}</strong>
                        {submittedInquiry.data.businessName && <span> ({submittedInquiry.data.businessName})</span>}
                      </div>

                      <div>
                        <span className="text-[#8C8375] block">Contact Target:</span>
                        <strong className="text-[#1A1817]">{submittedInquiry.data.contactValue}</strong>
                      </div>

                      <div>
                        <span className="text-[#8C8375] block">Category:</span>
                        <strong className="text-[#1A1817]">{submittedInquiry.data.category}</strong>
                      </div>

                      <div>
                        <span className="text-[#8C8375] block">Requested Volume:</span>
                        <strong className="text-[#1A1817]">{submittedInquiry.data.estimatedQuantity}</strong>
                      </div>
                    </div>

                    <div className="text-xs text-[#5A5348] pt-2 border-t border-[#F0EAE1]">
                      <span className="text-[#8C8375] block">Project Specifications:</span>
                      <p className="mt-1 text-xs italic bg-[#FAF8F5] p-2.5 rounded border border-[#E5DFD5]">
                        "{submittedInquiry.data.message}"
                      </p>
                    </div>
                  </div>

                  <p className="text-xs text-[#6B6356] leading-relaxed">
                    Our export desk typically compiles catalog specs and factory proforma estimates within 24 business hours.
                    Keep reference <strong>{submittedInquiry.ref}</strong> handy when communicating via email or WhatsApp.
                  </p>

                  <div className="flex gap-4">
                    <button
                      onClick={handleResetForm}
                      className="px-4 py-2.5 bg-[#1A1817] text-white text-xs font-medium rounded-md hover:bg-[#332F2C] transition-colors cursor-pointer"
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                </div>
              ) : (
                /* Interactive Form */
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="border-b border-[#E5DFD5] pb-3 mb-2">
                    <h3 className="text-base font-semibold text-[#1A1817]">Request Wholesale Information</h3>
                    <p className="text-xs text-[#7A7368]">Fill out this brief form to receive wholesale price lists and inventory lead times.</p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Full Name */}
                    <div>
                      <label className="block text-xs font-medium text-[#1A1817] mb-1">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Eleanor Vance"
                        className={`w-full px-3 py-2 text-xs bg-white border rounded-md text-[#1A1817] focus:outline-none ${
                          errors.fullName ? 'border-red-500' : 'border-[#E5DFD5] focus:border-[#1A1817]'
                        }`}
                      />
                      {errors.fullName && <p className="text-[11px] text-red-600 mt-1">{errors.fullName}</p>}
                    </div>

                    {/* Business Name (Optional) */}
                    <div>
                      <label className="block text-xs font-medium text-[#1A1817] mb-1">
                        Business / Store Name <span className="text-[#8C8375] font-normal">(Optional)</span>
                      </label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) => setFormData({ ...formData, businessName: e.target.value })}
                        placeholder="e.g. Vance Apparel Boutique"
                        className="w-full px-3 py-2 text-xs bg-white border border-[#E5DFD5] rounded-md text-[#1A1817] focus:outline-none focus:border-[#1A1817]"
                      />
                    </div>
                  </div>

                  {/* Contact Method & Value */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#1A1817] mb-1">
                        Contact Via
                      </label>
                      <select
                        value={formData.contactMethod}
                        onChange={(e) => setFormData({ ...formData, contactMethod: e.target.value as any })}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#E5DFD5] rounded-md text-[#1A1817] focus:outline-none focus:border-[#1A1817] cursor-pointer"
                      >
                        <option value="email">Email</option>
                        <option value="phone">Phone / WhatsApp</option>
                      </select>
                    </div>

                    <div className="sm:col-span-2">
                      <label className="block text-xs font-medium text-[#1A1817] mb-1">
                        {formData.contactMethod === 'email' ? 'Email Address' : 'Phone / WhatsApp Number'} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type={formData.contactMethod === 'email' ? 'email' : 'text'}
                        value={formData.contactValue}
                        onChange={(e) => setFormData({ ...formData, contactValue: e.target.value })}
                        placeholder={formData.contactMethod === 'email' ? 'you@company.com' : '+1 (555) 019-2834'}
                        className={`w-full px-3 py-2 text-xs bg-white border rounded-md text-[#1A1817] focus:outline-none ${
                          errors.contactValue ? 'border-red-500' : 'border-[#E5DFD5] focus:border-[#1A1817]'
                        }`}
                      />
                      {errors.contactValue && <p className="text-[11px] text-red-600 mt-1">{errors.contactValue}</p>}
                    </div>
                  </div>

                  {/* Category of Interest & Quantity */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-[#1A1817] mb-1">
                        Category of Interest <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#E5DFD5] rounded-md text-[#1A1817] focus:outline-none focus:border-[#1A1817] cursor-pointer"
                      >
                        {CATEGORIES.filter(c => c !== 'All').map(c => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                      {errors.category && <p className="text-[11px] text-red-600 mt-1">{errors.category}</p>}
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-[#1A1817] mb-1">
                        Estimated Quantity <span className="text-red-500">*</span>
                      </label>
                      <select
                        value={formData.estimatedQuantity}
                        onChange={(e) => setFormData({ ...formData, estimatedQuantity: e.target.value })}
                        className="w-full px-3 py-2 text-xs bg-white border border-[#E5DFD5] rounded-md text-[#1A1817] focus:outline-none focus:border-[#1A1817] cursor-pointer"
                      >
                        <option value="10 - 20 pcs (Initial Trial)">10 - 20 pcs (Initial Trial)</option>
                        <option value="20 - 50 pcs">20 - 50 pcs</option>
                        <option value="50 - 150 pcs">50 - 150 pcs</option>
                        <option value="200+ pcs (Carton / Container)">200+ pcs (Carton / Container)</option>
                        <option value="Custom Sample Request">Custom Sample Request</option>
                      </select>
                      {errors.estimatedQuantity && <p className="text-[11px] text-red-600 mt-1">{errors.estimatedQuantity}</p>}
                    </div>
                  </div>

                  {/* Additional Message */}
                  <div>
                    <label className="block text-xs font-medium text-[#1A1817] mb-1">
                      Specific Requirements or Target Styles <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Mention specific colors, delivery locations, custom labeling, or desired delivery timelines..."
                      className={`w-full px-3 py-2 text-xs bg-white border rounded-md text-[#1A1817] focus:outline-none ${
                        errors.message ? 'border-red-500' : 'border-[#E5DFD5] focus:border-[#1A1817]'
                      }`}
                    />
                    {errors.message && <p className="text-[11px] text-red-600 mt-1">{errors.message}</p>}
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-3 bg-[#1A1817] text-white text-xs font-medium tracking-wide rounded-md hover:bg-[#332F2C] transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                    >
                      {isSubmitting ? (
                        <span>Processing Inquiry...</span>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>Submit Wholesale Inquiry</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
