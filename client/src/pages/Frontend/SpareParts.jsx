import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { ShoppingCart, Filter, Tag, ArrowRight, Zap, Package, X, Plus, Minus, Loader2, CheckCircle2, PlusCircle, Trash2, ImageIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API_BASE = 'http://localhost:8000';

const compressImageFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const MAX_WIDTH = 1200;
        const MAX_HEIGHT = 1200;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height = Math.round((height * MAX_WIDTH) / width);
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width = Math.round((width * MAX_HEIGHT) / height);
            height = MAX_HEIGHT;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.85);
        resolve(dataUrl);
      };
      img.onerror = (err) => reject(err);
    };
    reader.onerror = (err) => reject(err);
  });
};

const CATEGORIES = [
  'All',
  'Gears & Drives',
  'Manufacturing Trolleys',
  'Passenger & Cargo Lifts',
  'Overhead Cranes & Conveyors',
  'Spinning & Mill Parts',
];

// Curated default products reflecting A.M Engineering & Elevators Official Catalog
const DEFAULT_PRODUCTS = [
  {
    _id: 'default-1',
    name: 'Industrial Transmission Gears & Drives',
    category: 'Gears & Drives',
    price: 'Call for Pricing',
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=800',
    description: 'Precision engineered industrial gears and drives transmitting power and motion with zero slippage across textile and processing machinery.',
  },
  {
    _id: 'default-2',
    name: 'Heavy-Duty Batch Manufacturing Trolley',
    category: 'Manufacturing Trolleys',
    price: 'Custom Quotation',
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
    description: 'Specialized piece of equipment for textile, manufacturing, and logistics to transport and handle materials or products in batches.',
  },
  {
    _id: 'default-3',
    name: 'Automatic Hydraulic Passenger Lift Cabin',
    category: 'Passenger & Cargo Lifts',
    price: 'Custom Quotation',
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1592256410394-51c948ec13d5?auto=format&fit=crop&q=80&w=800',
    description: 'Mild steel and architectural glass passenger elevators with space-efficient hydraulic system, 24-hour safety, and single-button operation.',
  },
  {
    _id: 'default-4',
    name: 'Industrial Heavy Freight & Beam Cargo Lift',
    category: 'Passenger & Cargo Lifts',
    price: 'Custom Quotation',
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=800',
    description: 'Indoor & outdoor freight elevator with reinforced steel platform, anti-drop safety valves, and turnkey commissioning for long-term use.',
  },
  {
    _id: 'default-5',
    name: 'Overhead Bridge Crane & Motorized Electric Wench',
    category: 'Overhead Cranes & Conveyors',
    price: 'Custom Quotation',
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1541888946425-d0fbb18086f6?auto=format&fit=crop&q=80&w=800',
    description: 'Bridge crane, gantry crane, and jib crane material handling systems to lift and move heavy steel beams, machinery, and containers.',
  },
  {
    _id: 'default-6',
    name: 'Industrial Roller, Belt & Spiral Conveyor System',
    category: 'Overhead Cranes & Conveyors',
    price: 'Custom Quotation',
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?auto=format&fit=crop&q=80&w=800',
    description: 'Horizontal, inclined, and spiral heavy-duty conveyor systems with belts, rollers, chains, chutes, buckets, and slats for factories and mills.',
  },
  {
    _id: 'default-7',
    name: 'Spinning & Weaving Mill Machinery Parts',
    category: 'Spinning & Mill Parts',
    price: 'Call for Pricing',
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80&w=800',
    description: 'All kinds of precision machined spare parts for spinning, weaving, and textile processing machinery ensuring consistent operation.',
  },
  {
    _id: 'default-8',
    name: 'Rice Mill Processing Machinery Components',
    category: 'Spinning & Mill Parts',
    price: 'Call for Pricing',
    stockStatus: 'In Stock',
    image: 'https://images.unsplash.com/photo-1581092335397-9583fe92d232?auto=format&fit=crop&q=80&w=800',
    description: 'Durable and wear-resistant machinery components, rollers, screens, and drive transmission parts for commercial rice mills.',
  },
];

// ─── Order Modal ───
const OrderModal = ({ product, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleOrder = async () => {
    setError('');
    setLoading(true);
    try {
      const token = localStorage.getItem('am_token');
      await axios.post(`${API_BASE}/orders`, {
        productName: product.name,
        category: product.category,
        price: product.price,
        quantity,
        note,
      }, { headers: { Authorization: `Bearer ${token}` } });
      setSuccess(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Order nahi hua. Dobara try karein.');
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <AnimatePresence>
      <motion.div
        key="order-backdrop"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 9998 }}
      />
      <motion.div
        key="order-modal"
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2 }}
        onClick={(e) => e.stopPropagation()}
        style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', zIndex: 9999, pointerEvents: 'none' }}
      >
        <div
          style={{ pointerEvents: 'all' }}
          className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden"
        >
          <div className="h-1 w-full bg-blue-600" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white transition-all">
            <X size={18} />
          </button>

          <div className="p-6 sm:p-7">
            {success ? (
              <div className="text-center py-6">
                <div className="w-14 h-14 rounded-full bg-emerald-100 dark:bg-emerald-950/50 flex items-center justify-center mx-auto mb-3 text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 size={30} />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1.5" style={{ fontFamily: 'Outfit, sans-serif' }}>Inquiry Submitted!</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Aapka request record ho gaya hai. Hamari team jald aapse rabta karegi.</p>
                <button
                  onClick={onClose}
                  className="mt-5 px-6 py-2.5 bg-blue-600 text-white font-bold rounded-xl text-sm hover:bg-blue-700"
                >
                  Done
                </button>
              </div>
            ) : (
              <>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Order / Inquiry Place Karein</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">Product details confirm karein</p>

                {/* Product Info */}
                <div className="flex gap-3.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 mb-5">
                  <img src={product.image} alt={product.name} className="w-14 h-14 rounded-lg object-cover flex-shrink-0" />
                  <div className="min-w-0">
                    <p className="font-bold text-slate-900 dark:text-white text-sm leading-tight">{product.name}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{product.category}</p>
                    <p className="font-extrabold text-blue-600 dark:text-blue-400 text-base mt-1" style={{ fontFamily: 'Outfit, sans-serif' }}>{product.price}</p>
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-4">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 block">Quantity</label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setQuantity(q => Math.max(1, q - 1))}
                      className="w-9 h-9 rounded-lg border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Minus size={15} />
                    </button>
                    <span className="text-lg font-bold text-slate-900 dark:text-white w-10 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(q => q + 1)}
                      className="w-9 h-9 rounded-lg border border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
                    >
                      <Plus size={15} />
                    </button>
                  </div>
                </div>

                {/* Note */}
                <div className="mb-5">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300 mb-2 block">Requirements / Specifications</label>
                  <textarea
                    rows={2}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder="Specific sizes, machine model, ya custom details..."
                    className="w-full rounded-xl p-3 text-sm bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-900 dark:text-white placeholder-slate-400 outline-none focus:border-blue-600 resize-none"
                  />
                </div>

                {error && <div className="mb-4 text-xs text-red-600 bg-red-50 dark:bg-red-950/40 p-2.5 rounded-lg border border-red-200 dark:border-red-800">{error}</div>}

                <button
                  onClick={handleOrder}
                  disabled={loading}
                  className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex items-center justify-center gap-2 text-sm uppercase tracking-wider shadow-md shadow-blue-600/20 disabled:opacity-60"
                >
                  {loading ? <Loader2 size={16} className="animate-spin" /> : <><ShoppingCart size={15} /> Submit Inquiry / Order</>}
                </button>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

// ─── Login Prompt ───
const LoginPrompt = ({ onClose, onLogin }) => createPortal(
  <AnimatePresence>
    <motion.div
      key="lp-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 9998 }}
    />
    <motion.div
      key="lp-modal"
      initial={{ opacity: 0, scale: 0.95, y: 16 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 16 }}
      transition={{ duration: 0.2 }}
      style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', zIndex: 9999, pointerEvents: 'none' }}
    >
      <div
        style={{ pointerEvents: 'all' }}
        className="w-full max-w-sm bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 text-center shadow-xl"
      >
        <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-3">
          <ShoppingCart size={22} />
        </div>
        <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1.5" style={{ fontFamily: 'Outfit, sans-serif' }}>Login Required</h3>
        <p className="text-slate-600 dark:text-slate-400 text-xs mb-5">Order submit karne ke liye pehle account mein sign in karein.</p>
        <button
          onClick={onLogin}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm mb-2"
        >
          Login / Register
        </button>
        <button onClick={onClose} className="w-full py-2 text-slate-500 hover:text-slate-700 text-xs">
          Cancel
        </button>
      </div>
    </motion.div>
  </AnimatePresence>,
  document.body
);

// ─── Add Product Modal (Admin) ───
const AddSparePartModal = ({ onClose, onAdded }) => {
  const [form, setForm] = useState({
    name: '',
    category: CATEGORIES[1],
    price: '',
    stockStatus: 'In Stock',
    image: '',
    description: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [imageFileName, setImageFileName] = useState('');
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);

  const set = (f) => (e) => setForm(p => ({ ...p, [f]: e.target.value }));

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setImageFileName(file.name);
      const base64 = await compressImageFile(file);
      setImagePreview(base64);
      setForm(prev => ({ ...prev, image: base64 }));
    } catch {
      setError('Image load karne mein masla hua. Doosri image try karein.');
    }
  };

  const handleRemoveImage = () => {
    setImageFileName('');
    setImagePreview('');
    setForm(prev => ({ ...prev, image: '' }));
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.price) {
      setError('Product name aur price required hain.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('am_token');
      await axios.post(`${API_BASE}/products`, form, {
        headers: { Authorization: `Bearer ${token}` }
      });
      onAdded();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Product add nahi hua.');
    } finally {
      setLoading(false);
    }
  };

  return createPortal(
    <AnimatePresence>
      <motion.div key="add-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
        style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 9998 }} />
      <motion.div key="add-modal" initial={{ opacity: 0, scale: 0.95, y: 16 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95, y: 16 }}
        transition={{ duration: 0.2 }} onClick={(e) => e.stopPropagation()}
        style={{ position: 'fixed', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', zIndex: 9999, pointerEvents: 'none' }}>
        <div style={{ pointerEvents: 'all' }} className="relative w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden">
          <div className="h-1 w-full bg-blue-600" />
          <button onClick={onClose} className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 transition-all"><X size={18} /></button>

          <div className="p-6 sm:p-7">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>Naya Equipment / Spare Part Add Karein</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mb-5">Wholesale catalog mein foran update ho jayega</p>

            {error && <div className="mb-4 text-xs text-red-600 bg-red-50 p-2.5 rounded-lg border border-red-200">{error}</div>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Product Name</label>
                <input required value={form.name} onChange={set('name')} placeholder="e.g. Industrial Spur Gear"
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-600" />
              </div>
              <div className="grid grid-cols-2 gap-3.5">
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Category</label>
                  <select value={form.category} onChange={set('category')}
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white outline-none">
                    {CATEGORIES.filter(c => c !== 'All').map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Price / Quote</label>
                  <input required value={form.price} onChange={set('price')} placeholder="e.g. Call for Pricing"
                    className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-600" />
                </div>
              </div>

              {/* Direct File Choose */}
              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1.5">
                  Product Photo (Choose File)
                </label>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                  id="frontend-part-file-upload"
                />

                {!imagePreview ? (
                  <label
                    htmlFor="frontend-part-file-upload"
                    className="flex flex-col items-center justify-center p-5 border-2 border-dashed border-slate-300 dark:border-slate-700 hover:border-blue-500 rounded-2xl cursor-pointer bg-slate-50 dark:bg-slate-800/60 transition-colors group text-center"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
                      <ImageIcon size={20} />
                    </div>
                    <span className="text-sm font-semibold text-slate-800 dark:text-slate-200">
                      Click to choose photo from device
                    </span>
                    <span className="text-xs text-slate-400 mt-0.5">
                      PNG, JPG, WEBP accepted (auto-optimized)
                    </span>
                  </label>
                ) : (
                  <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl">
                    <img
                      src={imagePreview}
                      alt="Selected Preview"
                      className="w-14 h-14 rounded-xl object-cover border border-slate-200 dark:border-slate-700 flex-shrink-0"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-slate-900 dark:text-white truncate">
                        {imageFileName || 'Selected Photo'}
                      </p>
                      <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-0.5 flex items-center gap-1">
                        <CheckCircle2 size={12} /> Ready for catalog
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <label
                        htmlFor="frontend-part-file-upload"
                        className="px-2.5 py-1 text-xs font-semibold rounded-lg border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors"
                      >
                        Change
                      </label>
                      <button
                        type="button"
                        onClick={handleRemoveImage}
                        className="p-1 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/30 rounded-lg transition-colors"
                        title="Remove photo"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider mb-1">Description</label>
                <textarea rows={2} value={form.description} onChange={set('description')} placeholder="Product details..."
                  className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-white outline-none focus:border-blue-600 resize-none" />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={onClose}
                  className="flex-1 py-2.5 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 font-bold rounded-xl text-xs hover:bg-slate-100">Cancel</button>
                <button type="submit" disabled={loading}
                  className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5">
                  {loading ? <Loader2 size={15} className="animate-spin" /> : <PlusCircle size={15} />}
                  <span>{loading ? 'Adding...' : 'Add Part'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

// ─── Product Card ───
const ProductCard = ({ product, onOrder, isAdmin, onDelete }) => (
  <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200">
    <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-slate-800">
      <img
        src={product.image}
        alt={`${product.name} - Wholesale Motorcycle & Industrial Spare Parts AM Engineering Faisalabad`}
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        loading="lazy"
      />
      <div className="absolute top-2.5 right-2.5 flex items-center gap-1.5">
        <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-emerald-600 text-white shadow-sm">
          {product.stockStatus || 'Available'}
        </span>
        {isAdmin && onDelete && (
          <button
            onClick={(e) => { e.stopPropagation(); onDelete(product._id); }}
            title="Delete Item"
            className="p-1 rounded-md bg-red-600 text-white transition-all shadow-sm"
          >
            <Trash2 size={12} />
          </button>
        )}
      </div>
      <div className="absolute bottom-2.5 left-2.5">
        <span className="px-2 py-0.5 text-[10px] font-bold rounded-md bg-slate-950/70 text-white backdrop-blur-sm">
          {product.category}
        </span>
      </div>
    </div>

    <div className="p-4 sm:p-5 flex flex-col flex-grow">
      {/* H3 for semantic item hierarchy */}
      <h3 className="text-base font-bold text-slate-900 dark:text-white mb-1 leading-snug" style={{ fontFamily: 'Outfit, sans-serif' }}>
        {product.name}
      </h3>
      <p className="text-xs text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 leading-relaxed">
        {product.description}
      </p>

      <div className="flex justify-between items-center mt-auto pt-3 border-t border-slate-150 dark:border-slate-800">
        <div>
          <span className="text-base font-extrabold text-blue-600 dark:text-blue-400" style={{ fontFamily: 'Outfit, sans-serif' }}>
            {product.price}
          </span>
          <div className="text-[10px] text-slate-500 uppercase tracking-wider">Direct Supply / Quotation</div>
        </div>
      </div>

      <button
        onClick={() => onOrder(product)}
        className="mt-3.5 w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl flex justify-center items-center gap-1.5 text-xs uppercase tracking-wider transition-all"
      >
        <ShoppingCart size={14} />
        <span>Inquire / Order</span>
      </button>
    </div>
  </div>
);

// ─── Main SpareParts Section ───
const SpareParts = () => {
  const { user } = useAuth();
  const isAdmin = user?.email === 'ameng307@gmail.com';
  const [activeCategory, setActiveCategory] = useState('All');
  const [orderModal, setOrderModal] = useState(null);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState(DEFAULT_PRODUCTS);
  const [loadingProducts, setLoadingProducts] = useState(true);

  useEffect(() => {
    document.title = "Gears, Mill Parts, Lifts & Cranes Catalog | A.M Engineering & Elevators";
  }, []);

  const fetchProducts = () => {
    setLoadingProducts(true);
    axios.get(`${API_BASE}/products`)
      .then(res => {
        const fetched = res.data.products || [];
        setProducts(fetched.length > 0 ? fetched : DEFAULT_PRODUCTS);
      })
      .catch(() => setProducts(DEFAULT_PRODUCTS))
      .finally(() => setLoadingProducts(false));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = async (id) => {
    if (!window.confirm('Yeh item delete karna chahte hain?')) return;
    try {
      const token = localStorage.getItem('am_token');
      await axios.delete(`${API_BASE}/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProducts(prev => prev.filter(p => p._id !== id));
    } catch {
      alert('Delete nahi hua. Dobara try karein.');
    }
  };

  const filtered = activeCategory === 'All' ? products : products.filter(p => p.category === activeCategory);

  const handleOrderClick = (product) => {
    if (!user) { setShowLoginPrompt(true); return; }
    setOrderModal(product);
  };

  const openAuthModal = () => {
    setShowLoginPrompt(false);
    window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { tab: 'login' } }));
  };

  return (
    <section id="shop" className="py-20 md:py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header - H2 Section Title */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-wider bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <Package size={13} />
              <span>Catalog &amp; Spare Parts</span>
              {isAdmin && (
                <span className="ml-1.5 px-1.5 py-0.5 rounded bg-blue-600 text-white text-[9px] font-extrabold">ADMIN</span>
              )}
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Spinning, Weaving, Processing &amp; Rice Mills Parts
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
              Gears and drives, batch manufacturing trolleys, passenger &amp; cargo lifts, overhead cranes, and conveyors supplied across Pakistan.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {isAdmin && (
              <button
                onClick={() => setShowAddModal(true)}
                id="admin-add-sparepart-btn"
                className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs transition-all"
              >
                <PlusCircle size={15} /> <span>+ Add Product</span>
              </button>
            )}
            <a
              href="#contact"
              id="download-catalog"
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 font-semibold rounded-xl text-xs hover:bg-slate-100 dark:hover:bg-slate-700"
            >
              <span>Get Quotation</span> <Tag size={13} />
            </a>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center space-x-2 overflow-x-auto pb-4 mb-8 hide-scrollbar">
          <Filter size={15} className="text-slate-400 mr-1 shrink-0" />
          {CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                id={`filter-${cat.replace(/[^a-zA-Z]/g, '-').toLowerCase()}`}
                className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex-shrink-0 ${
                  active
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Product Cards Grid */}
        {loadingProducts ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden animate-pulse">
                <div className="h-44 bg-slate-200 dark:bg-slate-800" />
                <div className="p-4 space-y-2.5">
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-3/4" />
                  <div className="h-4 bg-slate-200 dark:bg-slate-800 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard
                key={product._id || product.name}
                product={product}
                onOrder={handleOrderClick}
                isAdmin={isAdmin}
                onDelete={handleDeleteProduct}
              />
            ))}
          </div>
        )}

        {/* Custom Requirement Bar */}
        <div className="mt-12 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-7 flex flex-col md:flex-row items-center justify-between gap-5 shadow-sm">
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
              <Zap size={22} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Need a Custom Fabricated Lift or Machinery Part?
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm mt-0.5">
                Our mechanical engineering team manufactures custom gears, pulleys, shafts, conveyors, and complete elevator assemblies.
              </p>
            </div>
          </div>
          <a
            href="#contact"
            id="request-custom-part"
            className="inline-flex items-center gap-1.5 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition-all flex-shrink-0 shadow-md shadow-blue-600/20"
          >
            <span>Request Custom Fabrication</span> <ArrowRight size={14} />
          </a>
        </div>

      </div>

      {/* Modals */}
      {orderModal && <OrderModal product={orderModal} onClose={() => setOrderModal(null)} />}
      {showLoginPrompt && <LoginPrompt onClose={() => setShowLoginPrompt(false)} onLogin={openAuthModal} />}
      {showAddModal && <AddSparePartModal onClose={() => setShowAddModal(false)} onAdded={fetchProducts} />}
    </section>
  );
};

export default SpareParts;
