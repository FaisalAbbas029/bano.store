import React, { useState } from 'react';
import { Mail, Phone, MessageSquare, MapPin, Facebook, Copy, Check } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const contactData = {
    email: 'contact@banos.store',
    phone: '+1 (800) BANO-STORE',
    whatsapp: '+1 (800) 226-6786',
    address: 'Showroom & Fulfillment Desk: Contact for Regional Visits',
    facebook: 'facebook.com/banos.store.official'
  };

  const handleCopy = (key: string, value: string) => {
    navigator.clipboard.writeText(value);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  return (
    <section id="contact" className="py-20 bg-[#FAF8F5] border-b border-[#E8E2D8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-12">
          <span className="text-xs font-mono uppercase tracking-widest text-[#7D7569] block mb-2">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl font-display font-medium text-[#1A1817]">
            Contact Bano’s.Store
          </h2>
          <p className="text-sm text-[#6E6659] mt-3 font-light leading-relaxed">
            Have questions about product sizing, fabric weights, or customized wholesale orders?
            Reach out via our direct channels below.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Email card */}
          <div className="bg-white p-6 rounded-xl border border-[#E5DFD5] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E5DFD5] flex items-center justify-center text-[#1A1817] mb-4">
                <Mail className="w-5 h-5 text-[#8A7E6E]" />
              </div>
              <h3 className="text-sm font-semibold text-[#1A1817]">Direct Email</h3>
              <p className="text-xs text-[#7A7368] mt-1 font-light">For retail questions &amp; general inquiries</p>
              <div className="mt-3 font-mono text-xs text-[#1A1817] font-medium break-all">
                {contactData.email}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F0EAE1] flex items-center justify-between">
              <a
                href={`mailto:${contactData.email}?subject=Inquiry%20from%20Bano's.Store%20Website`}
                className="text-xs font-medium text-[#1A1817] hover:underline"
              >
                Send Email &rarr;
              </a>
              <button
                onClick={() => handleCopy('email', contactData.email)}
                className="p-1 text-[#8C8375] hover:text-[#1A1817] cursor-pointer"
                title="Copy email"
                aria-label="Copy email address"
              >
                {copiedKey === 'email' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* WhatsApp / Phone card */}
          <div className="bg-white p-6 rounded-xl border border-[#E5DFD5] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E5DFD5] flex items-center justify-center text-[#1A1817] mb-4">
                <MessageSquare className="w-5 h-5 text-[#8A7E6E]" />
              </div>
              <h3 className="text-sm font-semibold text-[#1A1817]">WhatsApp Desk</h3>
              <p className="text-xs text-[#7A7368] mt-1 font-light">Fast response for wholesale quotations &amp; swatch requests</p>
              <div className="mt-3 font-mono text-xs text-[#1A1817] font-medium">
                {contactData.whatsapp}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F0EAE1] flex items-center justify-between">
              <button
                onClick={() => handleCopy('whatsapp', contactData.whatsapp)}
                className="text-xs font-medium text-[#1A1817] hover:underline cursor-pointer"
              >
                Copy Number &rarr;
              </button>
              <button
                onClick={() => handleCopy('whatsapp', contactData.whatsapp)}
                className="p-1 text-[#8C8375] hover:text-[#1A1817] cursor-pointer"
                title="Copy phone"
                aria-label="Copy WhatsApp number"
              >
                {copiedKey === 'whatsapp' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

          {/* Facebook / Social Channel */}
          <div className="bg-white p-6 rounded-xl border border-[#E5DFD5] flex flex-col justify-between">
            <div>
              <div className="w-10 h-10 rounded-lg bg-[#FAF8F5] border border-[#E5DFD5] flex items-center justify-center text-[#1A1817] mb-4">
                <Facebook className="w-5 h-5 text-[#8A7E6E]" />
              </div>
              <h3 className="text-sm font-semibold text-[#1A1817]">Facebook Channel</h3>
              <p className="text-xs text-[#7A7368] mt-1 font-light">Follow new arrivals, lookbooks &amp; live production showcases</p>
              <div className="mt-3 font-mono text-xs text-[#1A1817] font-medium truncate">
                {contactData.facebook}
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-[#F0EAE1] flex items-center justify-between">
              <button
                onClick={() => handleCopy('fb', contactData.facebook)}
                className="text-xs font-medium text-[#1A1817] hover:underline cursor-pointer"
              >
                Copy Profile &rarr;
              </button>
              <button
                onClick={() => handleCopy('fb', contactData.facebook)}
                className="p-1 text-[#8C8375] hover:text-[#1A1817] cursor-pointer"
                title="Copy Facebook link"
                aria-label="Copy Facebook handle"
              >
                {copiedKey === 'fb' ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
