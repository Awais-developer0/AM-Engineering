import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Settings, ArrowRight, ChevronRight, Moon, Sun, LayoutDashboard, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import AuthModal from '../Auth/AuthModal';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Services', href: '#services' },
  { label: 'Estimator', href: '#estimator' },
  { label: 'Spare Parts', href: '#shop' },
  { label: 'FAQ', href: '#faq' },
  { label: 'Contact', href: '#contact' },
];

// ─── Avatar / Initials Helper ─────────────────────────────────────────────────
const getInitials = (name = '') => {
  const parts = name.trim().split(' ');
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
  return name.slice(0, 2).toUpperCase();
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [profileDropdown, setProfileDropdown] = useState(false);
  const [authModal, setAuthModal] = useState({ open: false, tab: 'login' });

  const { isDarkMode, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setProfileDropdown(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  // Custom event: SpareParts ya koi bhi component auth modal khol sakta hai
  useEffect(() => {
    const handler = (e) => openModal(e.detail?.tab || 'login');
    window.addEventListener('open-auth-modal', handler);
    return () => window.removeEventListener('open-auth-modal', handler);
  }, []);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navLinks.map(l => l.href.replace('#', ''));
    const THRESHOLD = window.innerHeight * 0.4;
    const getActiveSection = () => {
      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const el = document.getElementById(sectionIds[i]);
        if (!el) continue;
        const top = el.getBoundingClientRect().top;
        if (top <= THRESHOLD) { setActiveSection(sectionIds[i]); return; }
      }
      setActiveSection(sectionIds[0]);
    };
    getActiveSection();
    window.addEventListener('scroll', getActiveSection, { passive: true });
    return () => window.removeEventListener('scroll', getActiveSection);
  }, []);

  const handleLogout = () => {
    logout();
    setProfileDropdown(false);
    navigate('/');
  };

  const openModal = (tab) => setAuthModal({ open: true, tab });
  const closeModal = () => setAuthModal({ open: false, tab: 'login' });

  return (
    <>
      <div className="flex justify-center w-full px-4 pt-2.5 md:pt-3.5">
        <motion.div
          layout
          className={`pointer-events-auto flex items-center justify-between transition-all duration-300 rounded-full w-full max-w-6xl px-4 sm:px-6 py-2.5 md:py-3 ${
            isScrolled
              ? 'bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl border border-slate-200 dark:border-slate-800 shadow-lg shadow-slate-900/5 dark:shadow-black/30'
              : 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border border-slate-200/70 dark:border-slate-800/70 shadow-sm'
          }`}
        >
          {/* Logo */}
          <a href="#home" className="flex items-center space-x-2.5 group" id="nav-logo">
            <img
              src="/logo.jpg"
              alt="A.M Engineering & Elevators Logo"
              className="w-10 h-10 rounded-full object-cover object-center ring-2 ring-yellow-500/40 group-hover:scale-105 transition-transform shadow-md"
            />
            <div className="flex flex-col leading-tight hidden sm:flex">
              <span className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 dark:text-white uppercase" style={{ fontFamily: 'Outfit, sans-serif' }}>
                A.M <span className="text-blue-600 dark:text-blue-400">Engineering</span>
              </span>
              <span className="text-[9px] font-bold tracking-[0.16em] uppercase text-slate-500 dark:text-slate-400">&amp; Elevators</span>
            </div>
            <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white uppercase sm:hidden" style={{ fontFamily: 'Outfit, sans-serif' }}>A.M</span>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center space-x-1 rounded-full px-1.5 py-1 bg-slate-100/80 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/60">
            {navLinks.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={item.label}
                  href={item.href}
                  id={`nav-link-${sectionId}`}
                  className={`relative px-3 lg:px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-blue-600 text-white shadow-sm shadow-blue-600/30'
                      : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/60 dark:hover:bg-slate-700/50'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Desktop Right Actions */}
          <div className="hidden md:flex items-center space-x-2">
            {/* Theme Toggle Button */}
            <button
              onClick={toggleTheme}
              id="nav-theme-toggle"
              aria-label="Toggle Dark/Light Mode"
              className="p-2 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isDarkMode ? <Sun size={17} /> : <Moon size={17} />}
            </button>

            {/* ─── Logged OUT: Login + Register buttons ─── */}
            {!user && (
              <>
                <button
                  id="nav-login-btn"
                  onClick={() => openModal('login')}
                  className="px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  Login
                </button>
                <button
                  id="nav-register-btn"
                  onClick={() => openModal('register')}
                  className="px-4 py-1.5 rounded-full text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow transition-all hover:scale-[1.02] active:scale-95"
                >
                  Register
                </button>
              </>
            )}

            {/* ─── Logged IN: Profile Avatar + Dropdown ─── */}
            {user && (
              <div className="relative" ref={dropdownRef}>
                <button
                  id="nav-profile-btn"
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="flex items-center gap-2 pl-1 pr-3 py-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
                >
                  {user?.avatar ? (
                    <img
                      src={user.avatar}
                      alt={user.fullName}
                      className="w-8 h-8 rounded-full object-cover shadow-sm ring-2 ring-white dark:ring-slate-800"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-extrabold shadow-sm ring-2 ring-white dark:ring-slate-800">
                      {getInitials(user.fullName)}
                    </div>
                  )}
                  <span className="text-xs font-semibold text-slate-700 dark:text-slate-200 max-w-[100px] truncate">
                    {user.fullName}
                  </span>
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {profileDropdown && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95, y: 8 }}
                      animate={{ opacity: 1, scale: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.95, y: 8 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 mt-2 w-56 rounded-2xl bg-white dark:bg-slate-900 shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden z-50"
                    >
                      <div className="px-4 py-3 border-b border-slate-100 dark:border-slate-800">
                        <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.fullName}</p>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate">{user.email}</p>
                      </div>

                      <div className="p-1.5">
                        <button
                          id="nav-dashboard-btn"
                          onClick={() => { setProfileDropdown(false); navigate('/dashboard'); }}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-blue-600 dark:hover:text-blue-400 transition-all"
                        >
                          <LayoutDashboard size={15} />
                          <span>Dashboard</span>
                          <ChevronRight size={14} className="ml-auto text-slate-400" />
                        </button>

                        <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

                        <button
                          id="nav-logout-btn"
                          onClick={handleLogout}
                          className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-semibold text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30 transition-all"
                        >
                          <LogOut size={15} />
                          <span>Logout</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center space-x-1.5">
            <button
              onClick={toggleTheme}
              id="theme-toggle-mobile"
              className="p-2 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
            >
              {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {user && (
              <button
                id="mobile-profile-avatar"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="w-8 h-8 rounded-full overflow-hidden flex items-center justify-center text-white text-xs font-bold bg-blue-600"
              >
                {user?.avatar ? (
                  <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
                ) : (
                  getInitials(user.fullName)
                )}
              </button>
            )}

            <button
              id="mobile-menu-toggle"
              className="text-slate-700 dark:text-slate-300 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </motion.div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -16, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -16, scale: 0.96 }}
              transition={{ duration: 0.2 }}
              className="pointer-events-auto absolute top-16 left-4 right-4 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl rounded-2xl p-3 flex flex-col space-y-1 shadow-xl border border-slate-200 dark:border-slate-800 md:hidden z-50"
            >
              {user && (
                <div className="px-3 py-2.5 mb-1 border-b border-slate-100 dark:border-slate-800 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full overflow-hidden bg-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                    {user?.avatar ? (
                      <img src={user.avatar} alt={user.fullName} className="w-full h-full object-cover" />
                    ) : (
                      getInitials(user.fullName)
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-slate-900 dark:text-white">{user.fullName}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{user.email}</p>
                  </div>
                </div>
              )}

              {navLinks.map((item) => {
                const sectionId = item.href.replace('#', '');
                const isActive = activeSection === sectionId;
                return (
                  <a
                    key={item.label}
                    href={item.href}
                    id={`mobile-nav-${sectionId}`}
                    className={`font-semibold px-4 py-2.5 rounded-xl flex justify-between items-center text-sm transition-all ${
                      isActive
                        ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                        : 'text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800'
                    }`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>{item.label}</span>
                    <ChevronRight size={14} className={isActive ? 'text-blue-600 dark:text-blue-400' : 'text-slate-400'} />
                  </a>
                );
              })}

              <div className="pt-2 mt-1 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2">
                {!user && (
                  <>
                    <button
                      id="mobile-login-btn"
                      onClick={() => { setMobileMenuOpen(false); openModal('login'); }}
                      className="w-full font-semibold px-4 py-2.5 rounded-xl text-center text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all text-xs"
                    >
                      Login
                    </button>
                    <button
                      id="mobile-register-btn"
                      onClick={() => { setMobileMenuOpen(false); openModal('register'); }}
                      className="w-full inline-flex justify-center items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2.5 rounded-xl text-center shadow-sm text-xs"
                    >
                      <span>Register</span>
                      <ArrowRight size={14} />
                    </button>
                  </>
                )}

                {user && (
                  <>
                    <button
                      id="mobile-dashboard-btn"
                      onClick={() => { setMobileMenuOpen(false); navigate('/dashboard'); }}
                      className="w-full flex items-center justify-center gap-2 font-semibold px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 text-xs"
                    >
                      <LayoutDashboard size={14} /> Dashboard
                    </button>
                    <button
                      id="mobile-logout-btn"
                      onClick={() => { setMobileMenuOpen(false); handleLogout(); }}
                      className="w-full flex items-center justify-center gap-2 font-semibold px-4 py-2 rounded-xl bg-red-50 dark:bg-red-950/30 text-red-600 text-xs"
                    >
                      <LogOut size={14} /> Logout
                    </button>
                  </>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Auth Modal */}
      <AuthModal isOpen={authModal.open} onClose={closeModal} defaultTab={authModal.tab} />
    </>
  );
};

export default Navbar;
