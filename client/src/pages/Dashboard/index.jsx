import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Settings, ArrowLeft, LayoutDashboard, MessageSquare, ShoppingBag,
  LogOut, Clock, CheckCircle2, Loader2, AlertCircle, RefreshCw,
  ChevronRight, User, Mail, Phone, Package, Menu, X, PlusCircle, Trash2, ImageIcon, Upload,
  Camera, Edit3, Save, XCircle, UserCircle
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_BASE = import.meta.env.VITE_API_URL || 'https://am-engineering-server.onrender.com';
const ADMIN_EMAIL = 'ameng307@gmail.com';

// ─── Helpers ──────────────────────────────────────────────────────────────────
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

const getInitials = (name = '') => {
  const parts = name.trim().split(' ');
  return parts.length >= 2 ? (parts[0][0] + parts[parts.length - 1][0]).toUpperCase() : name.slice(0, 2).toUpperCase();
};

const formatDate = (d) => new Date(d).toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });

const StatusBadge = ({ status }) => {
  const map = {
    pending: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 border-amber-200 dark:border-amber-800',
    processing: 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 border-blue-200 dark:border-blue-800',
    completed: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800',
    cancelled: 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 border-red-200 dark:border-red-800',
  };
  const icons = { pending: <Clock size={12} />, processing: <Loader2 size={12} className="animate-spin" />, completed: <CheckCircle2 size={12} />, cancelled: <AlertCircle size={12} /> };
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold border capitalize ${map[status] || map.pending}`}>
      {icons[status]} {status}
    </span>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════

const AdminMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchMessages = async () => {
    setLoading(true); setError('');
    try {
      const token = localStorage.getItem('am_token');
      const res = await axios.get(`${API_BASE}/messages`, { headers: { Authorization: `Bearer ${token}` } });
      setMessages(res.data.messages || []);
    } catch (e) { setError('Messages load nahi hue.'); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchMessages(); }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-brand-blue" /></div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>All Messages <span className="text-brand-blue">({messages.length})</span></h2>
        <button onClick={fetchMessages} className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-500 dark:text-slate-400"><RefreshCw size={16} /></button>
      </div>
      {messages.length === 0 ? (
        <div className="text-center py-20">
          <MessageSquare size={40} className="text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 dark:text-slate-400">Abhi koi message nahi aaya.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <motion.div key={msg._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 hover:border-brand-blue/30 dark:hover:border-brand-blue/40 transition-all">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-brand-blue to-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{getInitials(msg.name)}</div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white text-sm">{msg.name}</p>
                    <div className="flex items-center gap-3 mt-0.5">
                      <span className="flex items-center gap-1 text-xs text-slate-400"><Mail size={11} />{msg.email}</span>
                      {msg.phone && <span className="flex items-center gap-1 text-xs text-slate-400"><Phone size={11} />{msg.phone}</span>}
                    </div>
                  </div>
                </div>
                <div className="text-right flex-shrink-0">
                  {msg.service && <span className="inline-block px-2.5 py-1 bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-brand-blue-light text-xs font-semibold rounded-full mb-1">{msg.service}</span>}
                  <p className="text-xs text-slate-400">{formatDate(msg.createdAt)}</p>
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 rounded-xl p-3 border border-slate-100 dark:border-slate-700/50">{msg.message}</p>
              {msg.userId && <p className="text-xs text-emerald-500 mt-2 font-medium">✓ Registered user</p>}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const AdminOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [updating, setUpdating] = useState(null);

  const fetchOrders = async () => {
    setLoading(true); setError('');
    try {
      const token = localStorage.getItem('am_token');
      const res = await axios.get(`${API_BASE}/orders`, { headers: { Authorization: `Bearer ${token}` } });
      setOrders(res.data.orders || []);
    } catch (e) { setError('Orders load nahi hue.'); }
    finally { setLoading(false); }
  };

  const updateStatus = async (id, status) => {
    setUpdating(id);
    try {
      const token = localStorage.getItem('am_token');
      const res = await axios.patch(`${API_BASE}/orders/${id}/status`, { status }, { headers: { Authorization: `Bearer ${token}` } });
      setOrders(prev => prev.map(o => o._id === id ? res.data.order : o));
    } catch (e) { alert('Status update nahi hua.'); }
    finally { setUpdating(null); }
  };

  useEffect(() => { fetchOrders(); }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-brand-blue" /></div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  const statusFlow = { pending: ['processing', 'completed', 'cancelled'], processing: ['completed', 'cancelled'], completed: [], cancelled: [] };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>All Orders <span className="text-brand-blue">({orders.length})</span></h2>
        <button onClick={fetchOrders} className="p-2 rounded-xl border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-slate-500 dark:text-slate-400"><RefreshCw size={16} /></button>
      </div>
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag size={40} className="text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 dark:text-slate-400">Abhi koi order nahi aaya.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div key={order._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 hover:border-brand-blue/30 transition-all">
              <div className="flex items-start justify-between gap-4 mb-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Package size={16} className="text-brand-blue" />
                    <h3 className="font-bold text-slate-900 dark:text-white text-sm">{order.productName}</h3>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                    {order.category && <span>{order.category}</span>}
                    <span className="font-semibold text-brand-blue dark:text-brand-blue-light">{order.price}</span>
                    <span>Qty: <strong className="text-slate-700 dark:text-slate-200">{order.quantity}</strong></span>
                  </div>
                </div>
                <StatusBadge status={order.status} />
              </div>

              {/* Customer */}
              <div className="flex items-center gap-2 py-2.5 px-3 bg-slate-50 dark:bg-slate-900/60 rounded-xl border border-slate-100 dark:border-slate-700/50 mb-3">
                <User size={13} className="text-slate-400" />
                <span className="text-xs text-slate-600 dark:text-slate-300 font-medium">{order.userName}</span>
                <span className="text-slate-300 dark:text-slate-600">•</span>
                <span className="text-xs text-slate-400">{order.userEmail}</span>
              </div>

              {order.note && <p className="text-xs text-slate-500 dark:text-slate-400 italic mb-3">Note: {order.note}</p>}
              <p className="text-xs text-slate-400 mb-3">{formatDate(order.createdAt)}</p>

              {/* Status Actions */}
              {statusFlow[order.status]?.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {statusFlow[order.status].map((s) => (
                    <button key={s} onClick={() => updateStatus(order._id, s)} disabled={updating === order._id}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all border capitalize flex items-center gap-1.5 ${s === 'completed' ? 'bg-emerald-50 dark:bg-emerald-900/20 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100' :
                          s === 'processing' ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800 hover:bg-blue-100' :
                            'bg-red-50 dark:bg-red-900/20 text-red-500 border-red-200 dark:border-red-800 hover:bg-red-100'
                        }`}>
                      {updating === order._id ? <Loader2 size={12} className="animate-spin" /> : null}
                      Mark as {s}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════
// USER PROFILE EDIT
// ═══════════════════════════════════════════════════════════════════════════

const UserProfile = () => {
  const { user, setUser } = useAuth();
  const fileInputRef = useRef(null);

  const [form, setForm] = useState({ fullName: user?.fullName || '', bio: user?.bio || '' });
  const [avatar, setAvatar] = useState(user?.avatar || '');
  const [avatarPreview, setAvatarPreview] = useState(user?.avatar || '');
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setForm({ fullName: user?.fullName || '', bio: user?.bio || '' });
    setAvatar(user?.avatar || '');
    setAvatarPreview(user?.avatar || '');
  }, [user]);

  const handleAvatarChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const base64 = await compressImageFile(file);
      setAvatarPreview(base64);
      setAvatar(base64);
    } catch {
      setError('Image load nahi hui. Doosri image try karein.');
    }
  };

  const handleRemoveAvatar = () => {
    setAvatarPreview('');
    setAvatar('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setError(''); setSuccess('');
    if (!form.fullName.trim()) { setError('Name required hai.'); return; }
    setSaving(true);
    try {
      const token = localStorage.getItem('am_token');
      const res = await axios.put(
        `${API_BASE}/auth/profile`,
        { fullName: form.fullName, bio: form.bio, avatar },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setUser(prev => ({ ...prev, ...res.data.user }));
      setSuccess('Profile successfully update ho gayi! ✅');
      setEditing(false);
      setTimeout(() => setSuccess(''), 3500);
    } catch (err) {
      setError(err.response?.data?.message || 'Profile save nahi hui. Dobara koshish karein.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setForm({ fullName: user?.fullName || '', bio: user?.bio || '' });
    setAvatarPreview(user?.avatar || '');
    setAvatar(user?.avatar || '');
    setError(''); setSuccess('');
    setEditing(false);
  };

  const initials = getInitials(user?.fullName || '');

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>
        My <span className="text-brand-blue">Profile</span>
      </h2>

      <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}
        className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden shadow-sm">

        {/* Header banner */}
        <div className="h-24 bg-gradient-to-r from-brand-blue via-blue-500 to-indigo-500 relative">
          <div className="absolute inset-0 opacity-20"
            style={{ backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(255,255,255,0.1) 10px, rgba(255,255,255,0.1) 20px)' }} />
        </div>

        <div className="px-6 pb-6">
          {/* Avatar + name row */}
          <div className="flex items-end gap-4 -mt-10 mb-5">
            <div className="relative flex-shrink-0">
              {avatarPreview ? (
                <img src={avatarPreview} alt="Profile"
                  className="w-20 h-20 rounded-2xl object-cover border-4 border-white dark:border-slate-800 shadow-lg" />
              ) : (
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-brand-blue to-blue-500 border-4 border-white dark:border-slate-800 shadow-lg flex items-center justify-center text-white text-2xl font-extrabold">
                  {initials}
                </div>
              )}
              {editing && (
                <button type="button" onClick={() => fileInputRef.current?.click()}
                  className="absolute -bottom-1.5 -right-1.5 w-7 h-7 rounded-lg bg-brand-blue hover:bg-blue-700 text-white flex items-center justify-center shadow-md transition-all hover:scale-110">
                  <Camera size={13} />
                </button>
              )}
            </div>
            <div className="pb-1 flex-1 min-w-0">
              <p className="text-lg font-extrabold text-slate-900 dark:text-white truncate">{user?.fullName}</p>
              <p className="text-xs text-slate-400 truncate">{user?.email}</p>
            </div>
            {!editing && (
              <button onClick={() => setEditing(true)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-brand-blue hover:bg-blue-700 text-white text-sm font-semibold transition-all hover:scale-105 shadow-sm mb-1">
                <Edit3 size={14} /> Edit Profile
              </button>
            )}
          </div>

          <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleAvatarChange} />

          {/* View mode */}
          {!editing ? (
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                <User size={16} className="text-brand-blue flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Full Name</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user?.fullName}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                <Mail size={16} className="text-brand-blue flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Email</p>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">{user?.email}</p>
                </div>
              </div>
              {user?.bio ? (
                <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-100 dark:border-slate-700/50">
                  <UserCircle size={16} className="text-brand-blue flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">About</p>
                    <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{user.bio}</p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-slate-400 text-center py-2">
                  Koi bio nahi — Edit karein aur apne baare mein kuch likhein!
                </p>
              )}
              {success && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-emerald-50 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800 text-emerald-600 dark:text-emerald-400 text-sm">
                  <CheckCircle2 size={15} /> {success}
                </div>
              )}
            </div>
          ) : (
            /* Edit mode form */
            <form onSubmit={handleSave} className="space-y-4">
              {avatarPreview ? (
                <div className="flex items-center gap-3">
                  <button type="button" onClick={handleRemoveAvatar}
                    className="flex items-center gap-1.5 text-xs text-red-500 hover:text-red-600 font-semibold transition-colors">
                    <XCircle size={13} /> Remove photo
                  </button>
                  <span className="text-xs text-slate-300 dark:text-slate-600">|</span>
                  <button type="button" onClick={() => fileInputRef.current?.click()}
                    className="flex items-center gap-1.5 text-xs text-brand-blue hover:text-blue-700 font-semibold transition-colors">
                    <Camera size={13} /> Change photo
                  </button>
                </div>
              ) : (
                <button type="button" onClick={() => fileInputRef.current?.click()}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-brand-blue/40 hover:border-brand-blue text-brand-blue hover:bg-brand-blue/5 text-sm font-semibold transition-all">
                  <Upload size={15} /> Photo upload karein
                </button>
              )}

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">Full Name *</label>
                <input
                  value={form.fullName}
                  onChange={e => setForm(p => ({ ...p, fullName: e.target.value }))}
                  placeholder="Apna poora naam likhein"
                  required
                  className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest mb-1.5">About / Bio</label>
                <textarea
                  value={form.bio}
                  onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                  placeholder="Apne baare mein kuch likhein (optional)..."
                  rows={3}
                  maxLength={200}
                  className="w-full bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-700 rounded-xl px-4 py-2.5 text-sm text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20 transition-all resize-none"
                />
                <p className="text-right text-xs text-slate-400 mt-1">{form.bio.length}/200</p>
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400 text-sm">
                  <AlertCircle size={15} /> {error}
                </div>
              )}

              <div className="flex gap-3 pt-1">
                <button type="button" onClick={handleCancel}
                  className="flex-1 py-2.5 rounded-xl border border-slate-200 dark:border-slate-700 text-sm font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                  Cancel
                </button>
                <button type="submit" disabled={saving}
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-gradient-to-r from-brand-blue to-blue-500 text-white text-sm font-bold shadow-[0_4px_14px_rgba(37,99,235,0.35)] hover:scale-[1.02] transition-all disabled:opacity-70 disabled:cursor-not-allowed disabled:scale-100">
                  {saving ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />}
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
};


// ═══════════════════════════════════════════════════════════════════════════════
// USER VIEWS
// ═══════════════════════════════════════════════════════════════════════════════

const UserOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem('am_token');
        const res = await axios.get(`${API_BASE}/orders/mine`, { headers: { Authorization: `Bearer ${token}` } });
        setOrders(res.data.orders || []);
      } catch { setError('Orders load nahi hue.'); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-brand-blue" /></div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>My Orders <span className="text-brand-blue">({orders.length})</span></h2>
      {orders.length === 0 ? (
        <div className="text-center py-20">
          <ShoppingBag size={40} className="text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 dark:text-slate-400 font-medium">Aapne abhi koi order nahi kiya.</p>
          <a href="/#services" className="mt-4 inline-flex items-center gap-1.5 text-brand-blue font-semibold text-sm hover:underline">Services dekhein <ChevronRight size={14} /></a>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order) => (
            <motion.div key={order._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 hover:border-brand-blue/30 transition-all">
              <div className="flex items-start justify-between gap-4 mb-2">
                <div>
                  <div className="flex items-center gap-2 mb-1"><Package size={16} className="text-brand-blue" /><h3 className="font-bold text-slate-900 dark:text-white text-sm">{order.productName}</h3></div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-slate-400">
                    {order.category && <span>{order.category}</span>}
                    <span className="font-semibold text-brand-blue dark:text-brand-blue-light">{order.price}</span>
                    <span>Qty: <strong className="text-slate-700 dark:text-slate-200">{order.quantity}</strong></span>
                  </div>
                </div>
                <StatusBadge status={order.status} />
              </div>
              {order.note && <p className="text-xs text-slate-500 italic mt-2">Note: {order.note}</p>}
              <p className="text-xs text-slate-400 mt-2">{formatDate(order.createdAt)}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

const UserMessages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetch = async () => {
      try {
        const token = localStorage.getItem('am_token');
        const res = await axios.get(`${API_BASE}/messages/mine`, { headers: { Authorization: `Bearer ${token}` } });
        setMessages(res.data.messages || []);
      } catch { setError('Messages load nahi hue.'); }
      finally { setLoading(false); }
    };
    fetch();
  }, []);

  if (loading) return <div className="flex items-center justify-center py-20"><Loader2 size={32} className="animate-spin text-brand-blue" /></div>;
  if (error) return <div className="text-center py-20 text-red-500">{error}</div>;

  return (
    <div>
      <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white mb-6" style={{ fontFamily: 'Outfit, sans-serif' }}>My Messages <span className="text-brand-blue">({messages.length})</span></h2>
      {messages.length === 0 ? (
        <div className="text-center py-20">
          <MessageSquare size={40} className="text-slate-300 dark:text-slate-600 mx-auto mb-3" />
          <p className="text-slate-500 dark:text-slate-400">Aapne abhi koi message nahi bheja.</p>
          <a href="/#contact" className="mt-4 inline-flex items-center gap-1.5 text-brand-blue font-semibold text-sm hover:underline">Contact form fill karein <ChevronRight size={14} /></a>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((msg) => (
            <motion.div key={msg._id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800/60 rounded-2xl border border-slate-200 dark:border-slate-700 p-5 hover:border-brand-blue/30 transition-all">
              <div className="flex items-center justify-between mb-2">
                {msg.service && <span className="px-2.5 py-1 bg-brand-blue/10 dark:bg-brand-blue/20 text-brand-blue dark:text-brand-blue-light text-xs font-semibold rounded-full">{msg.service}</span>}
                <p className="text-xs text-slate-400 ml-auto">{formatDate(msg.createdAt)}</p>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/60 rounded-xl p-3 border border-slate-100 dark:border-slate-700/50">{msg.message}</p>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════

const DashboardPage = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const isAdmin = user?.email === ADMIN_EMAIL;

  const adminTabs = [
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'products', label: 'Spare Parts', icon: Package },
  ];
  const userTabs = [
    { id: 'orders', label: 'My Orders', icon: ShoppingBag },
    { id: 'messages', label: 'My Messages', icon: MessageSquare },
    { id: 'profile', label: 'My Profile', icon: User },
  ];

  const tabs = isAdmin ? adminTabs : userTabs;
  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/'); };

  const renderContent = () => {
    if (isAdmin) {
      if (activeTab === 'messages') return <AdminMessages />;
      if (activeTab === 'orders') return <AdminOrders />;
      if (activeTab === 'products') return <AdminProducts />;
    } else {
      if (activeTab === 'orders') return <UserOrders />;
      if (activeTab === 'messages') return <UserMessages />;
      if (activeTab === 'profile') return <UserProfile />;
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-40 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 px-4 md:px-6 py-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Mobile sidebar toggle */}
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="md:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all">
              <Menu size={20} />
            </button>
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-blue to-blue-500 flex items-center justify-center">
              <Settings size={16} className="text-white" />
            </div>
            <div>
              <span className="text-base font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                AM <span className="text-gradient-blue">Engineering</span>
              </span>
              <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest -mt-0.5">
                {isAdmin ? 'Admin Dashboard' : 'User Dashboard'}
              </span>
            </div>
            {isAdmin && <span className="hidden sm:inline-flex px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-blue text-white">ADMIN</span>}
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => navigate('/')} className="hidden sm:flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400 hover:text-brand-blue transition-colors font-medium px-3 py-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800">
              <ArrowLeft size={14} /> Site
            </button>
            <div className="flex items-center gap-2">
              {user?.avatar ? (
                <img src={user.avatar} alt="avatar" className="w-8 h-8 rounded-full object-cover border-2 border-brand-blue/30" />
              ) : (
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-blue to-blue-500 flex items-center justify-center text-white text-xs font-extrabold">
                  {getInitials(user?.fullName || '')}
                </div>
              )}
              <div className="hidden md:block">
                <p className="text-sm font-bold text-slate-900 dark:text-white leading-none">{user?.fullName}</p>
                <p className="text-xs text-slate-400">{user?.email}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="p-2 rounded-xl text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all" title="Logout"><LogOut size={16} /></button>
          </div>
        </div>
      </header>

      <div className="flex flex-1 overflow-hidden">
        {/* Vertical Sidebar — desktop */}
        <aside className="hidden md:flex w-56 flex-col bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 p-4 gap-1">
          {/* User info mini */}
          <div className="flex items-center gap-3 px-3 py-3 mb-3 border-b border-slate-100 dark:border-slate-800">
            {user?.avatar ? (
              <img src={user.avatar} alt="avatar" className="w-9 h-9 rounded-full object-cover flex-shrink-0 border-2 border-brand-blue/30" />
            ) : (
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-brand-blue to-blue-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0">{getInitials(user?.fullName || '')}</div>
            )}
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user?.fullName}</p>
              <p className="text-xs text-slate-400 truncate">{isAdmin ? '🔴 Admin' : '🟢 User'}</p>
            </div>
          </div>

          {tabs.map((tab) => (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all group ${activeTab === tab.id ? 'bg-brand-blue text-white shadow-[0_4px_12px_rgba(37,99,235,0.3)]' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-brand-blue dark:hover:text-brand-blue-light'}`}>
              <tab.icon size={17} className={activeTab === tab.id ? 'text-white' : 'text-slate-400 group-hover:text-brand-blue dark:group-hover:text-brand-blue-light'} />
              {tab.label}
              {activeTab === tab.id && <ChevronRight size={14} className="ml-auto" />}
            </button>
          ))}

          <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
            <button onClick={() => navigate('/')} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-slate-500 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-700 dark:hover:text-slate-200 transition-all">
              <ArrowLeft size={17} /> Back to Site
            </button>
            <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all">
              <LogOut size={17} /> Logout
            </button>
          </div>
        </aside>

        {/* Mobile Sidebar Overlay */}
        <AnimatePresence>
          {sidebarOpen && (
            <>
              <motion.div key="sb-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                onClick={() => setSidebarOpen(false)} className="md:hidden fixed inset-0 bg-black/50 z-40" />
              <motion.aside key="sb-panel" initial={{ x: -240 }} animate={{ x: 0 }} exit={{ x: -240 }} transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="md:hidden fixed left-0 top-0 bottom-0 w-56 bg-white dark:bg-slate-900 z-50 flex flex-col p-4 gap-1 border-r border-slate-200 dark:border-slate-800 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-bold text-slate-900 dark:text-white text-sm">Menu</span>
                  <button onClick={() => setSidebarOpen(false)} className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500"><X size={18} /></button>
                </div>
                {tabs.map((tab) => (
                  <button key={tab.id} onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold transition-all ${activeTab === tab.id ? 'bg-brand-blue text-white' : 'text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800'}`}>
                    <tab.icon size={17} /> {tab.label}
                  </button>
                ))}
                <div className="mt-auto pt-3 border-t border-slate-100 dark:border-slate-800">
                  <button onClick={handleLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all"><LogOut size={17} />Logout</button>
                </div>
              </motion.aside>
            </>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.2 }}>
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
};

export default DashboardPage;

