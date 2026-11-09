import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Home, ArrowLeft, Phone, Compass, ArrowUp, ArrowDown } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-800 dark:text-slate-100 flex flex-col justify-between relative overflow-hidden transition-colors duration-300">
      
      {/* Background Ambience */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] dark:bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none opacity-60" />

      {/* Top Header / Branding */}
      <header className="relative z-10 max-w-7xl mx-auto w-full px-6 py-6 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2.5 group">
          <img
            src="/logo.png"
            alt="A.M Engineering & Elevators Logo"
            className="w-10 h-10 rounded-full object-cover ring-2 ring-blue-500/30 group-hover:scale-105 transition-transform"
          />
          <div className="flex flex-col leading-tight">
            <span className="text-lg font-extrabold tracking-tight text-slate-900 dark:text-white uppercase" style={{ fontFamily: 'Outfit, sans-serif' }}>
              A.M <span className="text-blue-600 dark:text-blue-400">Engineering</span>
            </span>
            <span className="text-[10px] font-bold tracking-[0.16em] uppercase text-slate-500 dark:text-slate-400">&amp; Elevators</span>
          </div>
        </Link>

        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 shadow-sm transition-all"
        >
          <ArrowLeft size={14} />
          <span>Go Back</span>
        </button>
      </header>

      {/* Main 404 Hero Content */}
      <main className="relative z-10 max-w-3xl mx-auto px-6 py-12 text-center flex flex-col items-center my-auto">
        
        {/* Elevator Floor Display Widget */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: -20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-2xl bg-slate-900 text-white border border-slate-800 shadow-xl shadow-slate-900/20">
            {/* Flashing elevator arrows */}
            <div className="flex flex-col items-center gap-0.5 text-blue-400">
              <motion.div animate={{ opacity: [0.3, 1, 0.3] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ArrowUp size={12} strokeWidth={3} />
              </motion.div>
              <motion.div animate={{ opacity: [1, 0.3, 1] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                <ArrowDown size={12} strokeWidth={3} />
              </motion.div>
            </div>

            {/* LED Floor Indicator */}
            <div className="font-mono text-xs uppercase tracking-widest text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span>Elevator Status:</span>
              <span className="text-red-400 font-bold">Floor Missing</span>
            </div>
          </div>
        </motion.div>

        {/* Big 404 Visual Graphic */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mb-4"
        >
          <span
            className="text-8xl sm:text-9xl md:text-[13rem] font-black leading-none tracking-tight select-none text-transparent bg-clip-text bg-gradient-to-b from-blue-600 via-sky-500 to-blue-300 dark:from-blue-400 dark:via-blue-500 dark:to-slate-800 opacity-95"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            404
          </span>
          <div className="absolute inset-x-0 bottom-3 flex justify-center">
            <span className="px-4 py-1 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-widest bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm text-slate-800 dark:text-slate-200">
              Floor Not Found
            </span>
          </div>
        </motion.div>

        {/* Subtitle & Explanatory Text */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-lg mb-8"
        >
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Yeh Floor Mojood Nahi Hai!
          </h1>
          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 leading-relaxed">
            Lagta hai lift kisi ghalat shaft ya floor per ruk gayi hai. Aap jis page ko talaash kar rahe hain wo delete ho chuka hai ya uska URL badal gaya hai.
          </p>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto mb-10"
        >
          <Link
            to="/"
            id="not-found-home-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl font-bold text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-md shadow-blue-600/25 hover:scale-[1.02] active:scale-95 transition-all"
          >
            <Home size={16} />
            <span>Return to Ground Floor (Home)</span>
          </Link>

          <a
            href="https://wa.me/923064854418"
            target="_blank"
            rel="noopener noreferrer"
            id="not-found-contact-btn"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 transition-all"
          >
            <Phone size={15} className="text-emerald-500" />
            <span>Contact Partners: 0306-485 4418</span>
          </a>
        </motion.div>

        {/* Quick Navigation Directory */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-md p-4 rounded-2xl bg-white/60 dark:bg-slate-900/60 backdrop-blur-md border border-slate-200 dark:border-slate-800 text-left"
        >
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
            <Compass size={14} className="text-blue-500" />
            <span>Direct Floor Directory:</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs font-semibold">
            <Link to="/#about" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              → About Elevators
            </Link>
            <Link to="/#services" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              → Passenger &amp; Cargo Lifts
            </Link>
            <Link to="/#shop" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              → Spare Parts Catalog
            </Link>
            <Link to="/#contact" className="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              → Get Free Quotation
            </Link>
          </div>
        </motion.div>

      </main>

      {/* Footer Minimal */}
      <footer className="relative z-10 w-full text-center py-4 border-t border-slate-200 dark:border-slate-800 text-xs text-slate-500 dark:text-slate-400">
        © {new Date().getFullYear()} A.M Engineering &amp; Elevators. All Rights Reserved.
      </footer>

    </div>
  );
};

export default NotFound;

