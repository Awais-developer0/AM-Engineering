import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Eye, EyeOff, Loader2, CheckCircle2, AlertCircle, Settings, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API_BASE = import.meta.env.VITE_API_URL || 'https://am-engineering-server.onrender.com';

// ─── Input Field Component ────────────────────────────────────────────────────
const InputField = ({ label, type, id, value, onChange, placeholder, error }) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === 'password';

  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-semibold text-slate-700 dark:text-slate-300">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type={isPassword && showPassword ? 'text' : type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete="off"
          className={`w-full pl-4 ${isPassword ? 'pr-10' : 'pr-4'} py-2.5 rounded-xl border text-sm font-medium transition-all duration-200 outline-none
            bg-slate-50 dark:bg-slate-800/60
            text-slate-900 dark:text-white
            placeholder-slate-400 dark:placeholder-slate-500
            ${error
              ? 'border-red-400 dark:border-red-500 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
              : 'border-slate-200 dark:border-slate-700 focus:border-brand-blue dark:focus:border-brand-blue focus:ring-2 focus:ring-brand-blue/20'
            }`}
        />
        {isPassword && (
          <button
            type="button"
            tabIndex={-1}
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
          >
            {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        )}
      </div>
      {error && (
        <p className="text-xs text-red-500 flex items-center gap-1">
          <AlertCircle size={12} /> {error}
        </p>
      )}
    </div>
  );
};

// ─── Main Auth Modal ──────────────────────────────────────────────────────────
const AuthModal = ({ isOpen, onClose, defaultTab = 'login' }) => {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState(defaultTab);
  const [status, setStatus] = useState({ type: null, message: '' });
  const [loading, setLoading] = useState(false);

  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [loginErrors, setLoginErrors] = useState({});

  const [registerForm, setRegisterForm] = useState({ fullName: '', email: '', password: '', confirmPassword: '' });
  const [registerErrors, setRegisterErrors] = useState({});

  useEffect(() => {
    setStatus({ type: null, message: '' });
    setLoginErrors({});
    setRegisterErrors({});
  }, [activeTab]);

  useEffect(() => {
    setActiveTab(defaultTab);
  }, [defaultTab, isOpen]);

  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Scroll lock
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!loginForm.email) errors.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(loginForm.email)) errors.email = 'Valid email enter karein';
    if (!loginForm.password) errors.password = 'Password required';
    if (Object.keys(errors).length) { setLoginErrors(errors); return; }

    setLoading(true);
    setStatus({ type: null, message: '' });
    try {
      const res = await axios.post(`${API_BASE}/auth/login`, loginForm);
      login(res.data.token, res.data.user);
      setStatus({ type: 'success', message: `Welcome back, ${res.data.user.fullName}!` });
      setTimeout(() => { onClose(); setLoginForm({ email: '', password: '' }); }, 1200);
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Login failed. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const errors = {};
    if (!registerForm.fullName.trim()) errors.fullName = 'Full name required';
    if (!registerForm.email) errors.email = 'Email required';
    else if (!/\S+@\S+\.\S+/.test(registerForm.email)) errors.email = 'Valid email enter karein';
    if (!registerForm.password) errors.password = 'Password required';
    else if (registerForm.password.length < 6) errors.password = 'Kam se kam 6 characters';
    if (registerForm.password !== registerForm.confirmPassword) errors.confirmPassword = 'Passwords match nahi kar rahe';
    if (Object.keys(errors).length) { setRegisterErrors(errors); return; }

    setLoading(true);
    setStatus({ type: null, message: '' });
    try {
      const res = await axios.post(`${API_BASE}/auth/register`, {
        fullName: registerForm.fullName,
        email: registerForm.email,
        password: registerForm.password,
      });
      login(res.data.token, res.data.user);
      setStatus({ type: 'success', message: `Account bana liya! Welcome, ${res.data.user.fullName}!` });
      setTimeout(() => { onClose(); setRegisterForm({ fullName: '', email: '', password: '', confirmPassword: '' }); }, 1200);
    } catch (err) {
      setStatus({ type: 'error', message: err.response?.data?.message || 'Registration failed. Try again.' });
    } finally {
      setLoading(false);
    }
  };

  // ─── Portal render — directly on document.body, completely outside Header ──
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="auth-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', zIndex: 9998 }}
          />

          {/* Modal */}
          <motion.div
            key="auth-modal"
            initial={{ opacity: 0, scale: 0.94, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 16 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '1rem',
              zIndex: 9999,
              pointerEvents: 'none',
              overflowY: 'auto',
            }}
          >
            <div
              style={{ pointerEvents: 'all' }}
              className="relative w-full max-w-md bg-white dark:bg-slate-900 rounded-3xl shadow-2xl border border-slate-200/80 dark:border-slate-700/80 overflow-hidden flex flex-col max-h-[92vh] my-auto"
            >
              {/* Top gradient bar */}
              <div className="h-1 w-full bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 flex-shrink-0" />

              {/* Close button */}
              <button
                onClick={onClose}
                id="auth-modal-close"
                className="absolute top-3.5 right-3.5 z-10 p-2 rounded-full text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
              >
                <X size={18} />
              </button>

              <div className="p-6 sm:p-7 overflow-y-auto">
                {/* Logo + Brand */}
                <div className="flex flex-col items-center mb-5">
                  <img src="/logo.png" alt="A.M Logo" className="w-12 h-12 rounded-full object-cover ring-2 ring-blue-500/40 mb-2 shadow-sm" />
                  <h2 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    A.M <span className="text-blue-600 dark:text-blue-400">Engineering</span>
                  </h2>
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">&amp; Elevators</span>
                  <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">
                    {activeTab === 'login' ? 'Sign in to your account' : 'Sign up your account'}
                  </p>
                </div>

                {/* Tabs */}
                <div className="flex bg-slate-100 dark:bg-slate-800 rounded-xl p-1 mb-5">
                  {['login', 'register'].map((tab) => (
                    <button
                      key={tab}
                      id={`auth-tab-${tab}`}
                      onClick={() => setActiveTab(tab)}
                      className={`flex-1 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 ${activeTab === tab
                        ? 'bg-white dark:bg-slate-700 text-brand-blue shadow-sm'
                        : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
                        }`}
                    >
                      {tab === 'login' ? 'Login' : 'Register'}
                    </button>
                  ))}
                </div>

                {/* Status Message */}
                <AnimatePresence mode="wait">
                  {status.message && (
                    <motion.div
                      key={status.type}
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -8 }}
                      className={`flex items-center gap-2 px-4 py-3 rounded-xl mb-4 text-sm font-medium ${status.type === 'success'
                        ? 'bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-800'
                        : 'bg-red-50 dark:bg-red-900/30 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-800'
                        }`}
                    >
                      {status.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
                      {status.message}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* ─── Login Form ─── */}
                <AnimatePresence mode="wait">
                  {activeTab === 'login' && (
                    <motion.form
                      key="login-form"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleLogin}
                      className="flex flex-col gap-4"
                    >
                      <InputField
                        label="Email Address"
                        type="email"
                        id="login-email"
                        value={loginForm.email}
                        onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                        placeholder="Enter your Email address"
                        error={loginErrors.email}
                      />
                      <InputField
                        label="Password"
                        type="password"
                        id="login-password"
                        value={loginForm.password}
                        onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                        placeholder="••••••••"
                        error={loginErrors.password}
                      />
                      <button
                        id="login-submit"
                        type="submit"
                        disabled={loading}
                        className="w-full mt-2 inline-flex items-center justify-center gap-2 font-semibold px-6 py-3 rounded-xl transition-all duration-200 text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {loading
                          ? <Loader2 size={18} className="animate-spin text-white" />
                          : <><span>Login</span> <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></>
                        }
                      </button>
                      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                        Account nahi hai?{' '}
                        <button type="button" onClick={() => setActiveTab('register')} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                          Register karein
                        </button>
                      </p>
                    </motion.form>
                  )}

                  {/* ─── Register Form ─── */}
                  {activeTab === 'register' && (
                    <motion.form
                      key="register-form"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.2 }}
                      onSubmit={handleRegister}
                      className="flex flex-col gap-3"
                    >
                      <InputField
                        label="Full Name"
                        type="text"
                        id="register-fullname"
                        value={registerForm.fullName}
                        onChange={(e) => setRegisterForm({ ...registerForm, fullName: e.target.value })}
                        placeholder="Enter your Name"
                        error={registerErrors.fullName}
                      />
                      <InputField
                        label="Email Address"
                        type="email"
                        id="register-email"
                        value={registerForm.email}
                        onChange={(e) => setRegisterForm({ ...registerForm, email: e.target.value })}
                        placeholder="Enter your Email address"
                        error={registerErrors.email}
                      />
                      <InputField
                        label="Password"
                        type="password"
                        id="register-password"
                        value={registerForm.password}
                        onChange={(e) => setRegisterForm({ ...registerForm, password: e.target.value })}
                        placeholder="Enter your password"
                        error={registerErrors.password}
                      />
                      <InputField
                        label="Confirm Password"
                        type="password"
                        id="register-confirm-password"
                        value={registerForm.confirmPassword}
                        onChange={(e) => setRegisterForm({ ...registerForm, confirmPassword: e.target.value })}
                        placeholder="Enter your Confirm Password"
                        error={registerErrors.confirmPassword}
                      />
                      <button
                        id="register-submit"
                        type="submit"
                        disabled={loading}
                        className="w-full mt-1 inline-flex items-center justify-center gap-2 font-semibold px-6 py-2.5 rounded-xl transition-all duration-200 text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {loading
                          ? <Loader2 size={18} className="animate-spin text-white" />
                          : <><span>Account Banayein</span> <ArrowRight size={15} className="group-hover:translate-x-1 transition-transform" /></>
                        }
                      </button>
                      <p className="text-center text-sm text-slate-500 dark:text-slate-400">
                        Pehle se account hai?{' '}
                        <button type="button" onClick={() => setActiveTab('login')} className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                          Login karein
                        </button>
                      </p>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default AuthModal;
