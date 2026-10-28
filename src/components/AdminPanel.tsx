import React, { useState, useEffect, useRef } from 'react';
import {
  Package,
  Plus,
  Trash2,
  Edit3,
  Search,
  ArrowLeft,
  Upload,
  CheckCircle2,
  Layers,
  Inbox,
  DollarSign,
  RotateCcw,
  LogOut,
  UserCheck
} from 'lucide-react';
import { Product, CATEGORIES, validateProductForm, formatPKR } from '../utils/catalog';
import { clearAdminSession } from '../utils/auth';
import { ProductVisual } from './ProductVisual';

interface AdminPanelProps {
  products: Product[];
  onAddProduct: (product: Product) => void;
  onUpdateProduct: (id: string, updates: Partial<Product>) => void;
  onDeleteProduct: (id: string) => void;
  onResetCatalog: () => void;
  onClose: () => void;
  onSignOut: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onResetCatalog,
  onClose,
  onSignOut
}) => {
  const [activeTab, setActiveTab] = useState<'products' | 'inquiries'>('products');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProductId, setEditingProductId] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState<{
    name: string;
    category: Product['category'];
    retailPrice: string;
    description: string;
    material: string;
    origin: string;
    visualType: Product['visualType'];
    colors: string;
    sizes: string;
    imageUrl: string;
    featured: boolean;
    moq1: string;
    price1: string;
    moq2: string;
    price2: string;
    moq3: string;
    price3: string;
  }>({
    name: '',
    category: 'Coats & Jackets',
    retailPrice: '',
    description: '',
    material: '',
    origin: 'Zhejiang Apparel Guild, Certified Quality',
    visualType: 'coat',
    colors: 'Camel, Obsidian Black, Stone Grey',
    sizes: 'S, M, L, XL',
    imageUrl: '',
    featured: false,
    moq1: '10',
    price1: '',
    moq2: '50',
    price2: '',
    moq3: '200',
    price3: ''
  });

  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Inquiries from storage
  const [wholesaleInquiries, setWholesaleInquiries] = useState<any[]>([]);

  useEffect(() => {
    try {
      const savedInquiries = JSON.parse(localStorage.getItem('banos_wholesale_inquiries') || '[]');
      setWholesaleInquiries(savedInquiries);
    } catch (e) {
      // Ignore
    }
  }, []);

  const openAddModal = () => {
    setEditingProductId(null);
    setFormData({
      name: '',
      category: 'Coats & Jackets',
      retailPrice: '',
      description: '',
      material: 'Fine Cotton & Wool Blend',
      origin: 'Zhejiang Apparel Guild, Certified Quality',
      visualType: 'coat',
      colors: 'Ivory, Black, Heather Grey',
      sizes: 'S, M, L, XL',
      imageUrl: '',
      featured: false,
      moq1: '10',
      price1: '',
      moq2: '50',
      price2: '',
      moq3: '200',
      price3: ''
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProductId(product.id);
    setFormData({
      name: product.name,
      category: product.category,
      retailPrice: product.retailPrice.toString(),
      description: product.description,
      material: product.material,
      origin: product.origin,
      visualType: product.visualType,
      colors: product.colors.join(', '),
      sizes: product.sizes.join(', '),
      imageUrl: product.imageUrl || '',
      featured: !!product.featured,
      moq1: product.wholesaleTiers[0]?.moq?.toString() || '10',
      price1: product.wholesaleTiers[0]?.pricePerUnit?.toString() || '',
      moq2: product.wholesaleTiers[1]?.moq?.toString() || '50',
      price2: product.wholesaleTiers[1]?.pricePerUnit?.toString() || '',
      moq3: product.wholesaleTiers[2]?.moq?.toString() || '200',
      price3: product.wholesaleTiers[2]?.pricePerUnit?.toString() || ''
    });
    setFormErrors({});
    setIsModalOpen(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (loadEvent) => {
        if (loadEvent.target?.result) {
          setFormData(prev => ({ ...prev, imageUrl: loadEvent.target!.result as string }));
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const priceNum = parseFloat(formData.retailPrice);
    const parsedProduct: Partial<Product> = {
      name: formData.name,
      category: formData.category,
      retailPrice: priceNum,
      description: formData.description,
      material: formData.material,
      origin: formData.origin
    };

    const validation = validateProductForm(parsedProduct);
    if (!validation.isValid) {
      setFormErrors(validation.errors);
      return;
    }

    const wholesaleTiers = [
      {
        moq: parseInt(formData.moq1, 10) || 10,
        pricePerUnit: parseFloat(formData.price1) || Math.round(priceNum * 0.65)
      },
      {
        moq: parseInt(formData.moq2, 10) || 50,
        pricePerUnit: parseFloat(formData.price2) || Math.round(priceNum * 0.55)
      },
      {
        moq: parseInt(formData.moq3, 10) || 200,
        pricePerUnit: parseFloat(formData.price3) || Math.round(priceNum * 0.45)
      }
    ];

    const colorsArr = formData.colors
      .split(',')
      .map(c => c.trim())
      .filter(Boolean);

    const sizesArr = formData.sizes
      .split(',')
      .map(s => s.trim())
      .filter(Boolean);

    if (editingProductId) {
      onUpdateProduct(editingProductId, {
        name: formData.name,
        category: formData.category,
        retailPrice: priceNum,
        wholesaleTiers,
        colors: colorsArr.length ? colorsArr : ['Standard'],
        sizes: sizesArr.length ? sizesArr : ['One Size'],
        description: formData.description,
        material: formData.material,
        origin: formData.origin,
        visualType: formData.visualType,
        imageUrl: formData.imageUrl.trim() || undefined,
        featured: formData.featured
      });
    } else {
      const newId = `bs-custom-${Date.now()}`;
      const newProduct: Product = {
        id: newId,
        name: formData.name,
        category: formData.category,
        retailPrice: priceNum,
        wholesaleTiers,
        colors: colorsArr.length ? colorsArr : ['Standard'],
        sizes: sizesArr.length ? sizesArr : ['One Size'],
        description: formData.description,
        material: formData.material,
        origin: formData.origin,
        visualType: formData.visualType,
        imageUrl: formData.imageUrl.trim() || undefined,
        featured: formData.featured
      };
      onAddProduct(newProduct);
    }

    setIsModalOpen(false);
  };

  const filteredProducts = products.filter(p => {
    const matchesCat = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesQuery =
      searchQuery.trim() === '' ||
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.id.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FAF8F5] text-[#1A1817] flex flex-col">
      {/* Admin Top Bar */}
      <header className="bg-[#1A1817] text-white px-6 py-4 flex items-center justify-between border-b border-[#2C2926] shrink-0 sticky top-0 z-20">
        <div className="flex items-center gap-4">
          <button
            onClick={onClose}
            className="flex items-center gap-2 text-xs font-medium text-[#C9BFB5] hover:text-white px-3 py-1.5 rounded bg-white/10 hover:bg-white/15 transition-colors cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Live Storefront</span>
          </button>

          <div className="h-4 w-px bg-white/20" />

          <div>
            <h1 className="text-sm font-semibold tracking-wide flex items-center gap-2">
              <span>Bano’s.Store — Merchant Command Center</span>
              <span className="text-[10px] font-mono uppercase bg-emerald-950 text-emerald-400 px-2 py-0.5 rounded border border-emerald-800 flex items-center gap-1">
                <UserCheck className="w-3 h-3" />
                <span>Admin Authenticated</span>
              </span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={openAddModal}
            className="px-4 py-2 bg-white text-[#1A1817] text-xs font-semibold rounded-md hover:bg-[#EAE4DC] flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Product</span>
          </button>

          <button
            onClick={() => {
              clearAdminSession();
              onSignOut();
            }}
            className="px-3 py-2 text-[#9E9588] hover:text-red-400 hover:bg-white/5 text-xs font-medium rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
            title="Sign Out of Admin"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sign Out</span>
          </button>
        </div>
      </header>

      {/* Main Container */}
      <div className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* KPI Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <div className="bg-white p-5 rounded-xl border border-[#E5DFD5] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#7A7368]">Total Products</span>
              <Package className="w-4 h-4 text-[#8A7E6E]" />
            </div>
            <div className="text-2xl font-semibold font-mono text-[#1A1817] mt-2">
              {products.length}
            </div>
            <div className="text-[11px] text-[#7A7368] mt-1">Live in catalog</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E5DFD5] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#7A7368]">Active Categories</span>
              <Layers className="w-4 h-4 text-[#8A7E6E]" />
            </div>
            <div className="text-2xl font-semibold font-mono text-[#1A1817] mt-2">
              {CATEGORIES.filter(c => c !== 'All').length}
            </div>
            <div className="text-[11px] text-[#7A7368] mt-1">Chinese export lines</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E5DFD5] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#7A7368]">Wholesale Inquiries</span>
              <Inbox className="w-4 h-4 text-[#8A7E6E]" />
            </div>
            <div className="text-2xl font-semibold font-mono text-[#1A1817] mt-2">
              {wholesaleInquiries.length}
            </div>
            <div className="text-[11px] text-[#7A7368] mt-1">Registered bulk quotes</div>
          </div>

          <div className="bg-white p-5 rounded-xl border border-[#E5DFD5] shadow-xs">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono uppercase text-[#7A7368]">Pricing Mode</span>
              <DollarSign className="w-4 h-4 text-[#8A7E6E]" />
            </div>
            <div className="text-sm font-semibold text-[#1A1817] mt-2">
              Dual Retail + Bulk
            </div>
            <div className="text-[11px] text-[#7A7368] mt-1">Tier MOQs Active</div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-2">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab('products')}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'products'
                  ? 'bg-[#1A1817] text-white'
                  : 'bg-white text-[#6B6356] border border-[#E5DFD5] hover:bg-[#F2ECE4]'
              }`}
            >
              Product Inventory ({products.length})
            </button>
            <button
              onClick={() => setActiveTab('inquiries')}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors cursor-pointer ${
                activeTab === 'inquiries'
                  ? 'bg-[#1A1817] text-white'
                  : 'bg-white text-[#6B6356] border border-[#E5DFD5] hover:bg-[#F2ECE4]'
              }`}
            >
              Wholesale Inquiries ({wholesaleInquiries.length})
            </button>
          </div>

          {activeTab === 'products' && (
            <button
              onClick={() => {
                if (window.confirm('Reset catalog to factory default products? Any custom additions will be cleared.')) {
                  onResetCatalog();
                }
              }}
              className="text-xs text-[#8C8375] hover:text-red-700 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Default Catalog</span>
            </button>
          )}
        </div>

        {/* Tab 1: Product Inventory */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            {/* Filter and Search Bar */}
            <div className="bg-white p-3 rounded-lg border border-[#E5DFD5] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative flex-1 w-full max-w-sm">
                <Search className="w-4 h-4 text-[#8C8375] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Filter by name, SKU or category..."
                  className="w-full pl-9 pr-3 py-1.5 text-xs bg-[#FAF8F5] border border-[#E5DFD5] rounded-md text-[#1A1817] focus:outline-none focus:border-[#1A1817]"
                />
              </div>

              <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto">
                {CATEGORIES.map(cat => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-2.5 py-1 text-xs rounded transition-colors whitespace-nowrap cursor-pointer ${
                      selectedCategory === cat
                        ? 'bg-[#1A1817] text-white'
                        : 'bg-[#FAF8F5] text-[#6B6356] hover:bg-[#EAE4DC]'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-[#E5DFD5] overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#FAF8F5] border-b border-[#E5DFD5] text-[#7A7368] font-mono uppercase text-[11px]">
                    <tr>
                      <th className="py-3 px-4">Item &amp; Photo</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Retail Price</th>
                      <th className="py-3 px-4">Wholesale Tiers</th>
                      <th className="py-3 px-4">Origin / Guild</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#F0EAE1]">
                    {filteredProducts.map(product => (
                      <tr key={product.id} className="hover:bg-[#FAF8F5] transition-colors">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <div className="w-12 h-14 bg-[#F4EFEA] rounded border border-[#E5DFD5] overflow-hidden shrink-0">
                            <ProductVisual
                              type={product.visualType}
                              imageUrl={product.imageUrl}
                              className="p-0.5"
                            />
                          </div>
                          <div>
                            <div className="font-semibold text-[#1A1817]">{product.name}</div>
                            <div className="text-[10px] text-[#7A7368] font-mono">SKU: {product.id}</div>
                            {product.featured && (
                              <span className="inline-block text-[9px] font-mono bg-[#EFE9E0] text-[#5A5145] px-1.5 rounded mt-0.5">
                                Featured
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3 px-4 text-[#5A5348]">{product.category}</td>

                        <td className="py-3 px-4 font-mono font-semibold text-[#1A1817] tabular-nums">
                          {formatPKR(product.retailPrice)}
                        </td>

                        <td className="py-3 px-4 font-mono text-[11px] text-[#6B6356]">
                          {product.wholesaleTiers.map((t, idx) => (
                            <span key={idx} className="mr-2">
                              {t.moq}+ ({formatPKR(t.pricePerUnit)})
                            </span>
                          ))}
                        </td>

                        <td className="py-3 px-4 text-[#6B6356] max-w-xs truncate">
                          {product.origin}
                        </td>

                        <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                          <button
                            onClick={() => openEditModal(product)}
                            className="p-1.5 text-[#5A5348] hover:text-[#1A1817] hover:bg-[#EAE4DC] rounded transition-colors cursor-pointer"
                            title="Edit Product"
                          >
                            <Edit3 className="w-3.5 h-3.5" />
                          </button>

                          <button
                            onClick={() => {
                              if (window.confirm(`Delete product "${product.name}"?`)) {
                                onDeleteProduct(product.id);
                              }
                            }}
                            className="p-1.5 text-[#9E9588] hover:text-red-700 hover:bg-red-50 rounded transition-colors cursor-pointer"
                            title="Delete Product"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Wholesale Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="bg-white rounded-xl border border-[#E5DFD5] p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-3">
              <div>
                <h3 className="text-sm font-semibold text-[#1A1817]">Commercial Wholesale Inquiries</h3>
                <p className="text-xs text-[#7A7368]">Inquiries submitted by boutique buyers and bulk importers.</p>
              </div>
            </div>

            {wholesaleInquiries.length === 0 ? (
              <div className="text-center py-12 text-xs text-[#7A7368]">
                No wholesale inquiries submitted yet. Submit a test inquiry on the storefront Wholesale section to see records here.
              </div>
            ) : (
              <div className="space-y-4">
                {wholesaleInquiries.map((inq, idx) => (
                  <div key={idx} className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD5] text-xs space-y-2">
                    <div className="flex items-center justify-between border-b border-[#EAE3D8] pb-2">
                      <div className="font-mono font-semibold text-[#1A1817]">{inq.ref}</div>
                      <div className="text-[#8C8375] font-mono text-[11px]">{inq.timestamp}</div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 text-[#5A5348]">
                      <div>
                        <span className="text-[#8C8375] block">Buyer Name:</span>
                        <strong className="text-[#1A1817]">{inq.data.fullName}</strong>
                      </div>
                      <div>
                        <span className="text-[#8C8375] block">Business:</span>
                        <span>{inq.data.businessName || 'Independent Retailer'}</span>
                      </div>
                      <div>
                        <span className="text-[#8C8375] block">Contact:</span>
                        <strong className="text-[#1A1817]">{inq.data.contactValue}</strong>
                      </div>
                      <div>
                        <span className="text-[#8C8375] block">Category &amp; Volume:</span>
                        <span>{inq.data.category} ({inq.data.estimatedQuantity})</span>
                      </div>
                    </div>

                    <div className="pt-2 text-xs text-[#5A5348] border-t border-[#EAE3D8]">
                      <span className="text-[#8C8375]">Buyer Notes:</span>
                      <p className="italic mt-0.5">"{inq.data.message}"</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

      </div>

      {/* Add / Edit Product Modal */}
      {isModalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
        >
          <div className="relative bg-white w-full max-w-2xl rounded-2xl border border-[#E5DFD5] shadow-2xl p-6 sm:p-8 space-y-6 my-8 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-[#E5DFD5] pb-3">
              <h2 className="text-base font-semibold text-[#1A1817]">
                {editingProductId ? 'Edit Product Specifications' : 'Add New Product to Bano’s.Store'}
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-[#8C8375] hover:text-[#1A1817]"
              >
                Cancel
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Product Name */}
                <div>
                  <label className="block text-xs font-medium text-[#1A1817] mb-1">
                    Product Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Minimalist Cashmere Wool Coat"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E5DFD5] rounded-md text-[#1A1817] focus:outline-none focus:border-[#1A1817]"
                  />
                  {formErrors.name && <p className="text-[11px] text-red-600 mt-1">{formErrors.name}</p>}
                </div>

                {/* Category */}
                <div>
                  <label className="block text-xs font-medium text-[#1A1817] mb-1">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E5DFD5] rounded-md text-[#1A1817] focus:outline-none focus:border-[#1A1817] cursor-pointer"
                  >
                    {CATEGORIES.filter(c => c !== 'All').map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Retail Price & Visual Type */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1A1817] mb-1">
                    Retail Price (PKR) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    step="1"
                    value={formData.retailPrice}
                    onChange={(e) => setFormData({ ...formData, retailPrice: e.target.value })}
                    placeholder="e.g. 42500"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E5DFD5] rounded-md text-[#1A1817] focus:outline-none focus:border-[#1A1817]"
                  />
                  {formErrors.retailPrice && <p className="text-[11px] text-red-600 mt-1">{formErrors.retailPrice}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1A1817] mb-1">
                    Visual Silhouette Fallback
                  </label>
                  <select
                    value={formData.visualType}
                    onChange={(e) => setFormData({ ...formData, visualType: e.target.value as any })}
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E5DFD5] rounded-md text-[#1A1817] focus:outline-none focus:border-[#1A1817] cursor-pointer"
                  >
                    <option value="women">Women’s Fashion Ensemble</option>
                    <option value="coat">Tailored Coat / Jacket</option>
                    <option value="sweater">Cashmere Knit / Sweater</option>
                    <option value="trousers">Tailored Trousers / Pants</option>
                    <option value="bag">Leather Tote / Handbag</option>
                    <option value="sneaker">Cupsole Sneaker / Footwear</option>
                    <option value="puffer">Down Winter Parka / Puffer</option>
                  </select>
                </div>
              </div>

              {/* Image Upload / Photo Section */}
              <div className="p-4 bg-[#FAF8F5] rounded-xl border border-[#E5DFD5] space-y-3">
                <label className="block text-xs font-semibold text-[#1A1817]">
                  Product Image / Realistic Photography
                </label>
                <p className="text-[11px] text-[#7A7368]">
                  Upload a photo from your computer or paste an image URL.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 items-center">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="px-3 py-2 bg-white border border-[#E5DFD5] hover:bg-[#FAF8F5] text-[#1A1817] text-xs font-medium rounded-md flex items-center gap-1.5 transition-colors cursor-pointer"
                  >
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image File</span>
                  </button>

                  <span className="text-xs text-[#8C8375]">or Image URL:</span>

                  <input
                    type="url"
                    value={formData.imageUrl}
                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                    placeholder="https://images.unsplash.com/..."
                    className="flex-1 px-3 py-1.5 text-xs bg-white border border-[#E5DFD5] rounded-md text-[#1A1817] focus:outline-none"
                  />
                </div>

                {/* Instant Image Preview */}
                {formData.imageUrl && (
                  <div className="mt-2 flex items-center gap-3">
                    <div className="w-16 h-20 bg-white rounded border border-[#E5DFD5] overflow-hidden">
                      <img src={formData.imageUrl} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                    <div>
                      <span className="text-xs text-emerald-700 font-medium flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Realistic photo active</span>
                      </span>
                      <button
                        type="button"
                        onClick={() => setFormData({ ...formData, imageUrl: '' })}
                        className="text-[11px] text-red-600 hover:underline mt-0.5 block"
                      >
                        Remove image
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Wholesale Pricing Tiers */}
              <div className="p-3 bg-[#FAF8F5] rounded-lg border border-[#E5DFD5] space-y-2">
                <span className="text-xs font-semibold text-[#1A1817] block">
                  Wholesale Bulk Pricing Tiers (PKR) (Optional / Auto-Calculated)
                </span>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <label className="text-[10px] text-[#7A7368] block">Tier 1 (10+ pcs)</label>
                    <input
                      type="number"
                      value={formData.price1}
                      onChange={(e) => setFormData({ ...formData, price1: e.target.value })}
                      placeholder="Unit Price PKR"
                      className="w-full px-2 py-1 text-xs bg-white border border-[#E5DFD5] rounded text-[#1A1817]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#7A7368] block">Tier 2 (50+ pcs)</label>
                    <input
                      type="number"
                      value={formData.price2}
                      onChange={(e) => setFormData({ ...formData, price2: e.target.value })}
                      placeholder="Unit Price PKR"
                      className="w-full px-2 py-1 text-xs bg-white border border-[#E5DFD5] rounded text-[#1A1817]"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-[#7A7368] block">Tier 3 (200+ pcs)</label>
                    <input
                      type="number"
                      value={formData.price3}
                      onChange={(e) => setFormData({ ...formData, price3: e.target.value })}
                      placeholder="Unit Price PKR"
                      className="w-full px-2 py-1 text-xs bg-white border border-[#E5DFD5] rounded text-[#1A1817]"
                    />
                  </div>
                </div>
              </div>

              {/* Colors & Sizes */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1A1817] mb-1">
                    Available Colors (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.colors}
                    onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                    placeholder="Camel, Black, Heather Grey"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E5DFD5] rounded-md text-[#1A1817]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1A1817] mb-1">
                    Available Sizes (comma separated)
                  </label>
                  <input
                    type="text"
                    value={formData.sizes}
                    onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                    placeholder="S, M, L, XL or EU 40, 41, 42"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E5DFD5] rounded-md text-[#1A1817]"
                  />
                </div>
              </div>

              {/* Material & Origin */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#1A1817] mb-1">
                    Fabric &amp; Material Specs <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    placeholder="e.g. 70% Wool, 30% Fine Synthetic Fiber"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E5DFD5] rounded-md text-[#1A1817]"
                  />
                  {formErrors.material && <p className="text-[11px] text-red-600 mt-1">{formErrors.material}</p>}
                </div>

                <div>
                  <label className="block text-xs font-medium text-[#1A1817] mb-1">
                    Origin / Production Hub <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.origin}
                    onChange={(e) => setFormData({ ...formData, origin: e.target.value })}
                    placeholder="e.g. Zhejiang Apparel Guild"
                    className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E5DFD5] rounded-md text-[#1A1817]"
                  />
                  {formErrors.origin && <p className="text-[11px] text-red-600 mt-1">{formErrors.origin}</p>}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-[#1A1817] mb-1">
                  Product Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  rows={2}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Detailed craftsmanship and tailoring notes..."
                  className="w-full px-3 py-2 text-xs bg-[#FAF8F5] border border-[#E5DFD5] rounded-md text-[#1A1817]"
                />
                {formErrors.description && <p className="text-[11px] text-red-600 mt-1">{formErrors.description}</p>}
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featuredToggle"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-4 h-4 rounded text-[#1A1817] cursor-pointer"
                />
                <label htmlFor="featuredToggle" className="text-xs text-[#1A1817] cursor-pointer">
                  Feature this product on homepage lookbook
                </label>
              </div>

              {/* Form Buttons */}
              <div className="pt-4 border-t border-[#E5DFD5] flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-[#E5DFD5] text-xs font-medium text-[#1A1817] rounded-md hover:bg-[#FAF8F5] cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#1A1817] text-white text-xs font-medium rounded-md hover:bg-[#332F2C] cursor-pointer"
                >
                  {editingProductId ? 'Save Changes' : 'Publish Product to Store'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
