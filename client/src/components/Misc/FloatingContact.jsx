import React, { useState } from 'react';
import { Phone, X, ArrowUpRight, MessageCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5 font-sans">
      
      {/* Expanded Quick Contact Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-white dark:bg-slate-900 text-slate-800 dark:text-white rounded-2xl p-4 shadow-2xl border border-slate-200 dark:border-slate-800 w-80 mb-1 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-150 dark:border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                  Quick Consultation &amp; Inquiry
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-slate-700 dark:hover:text-white p-1 rounded-md transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X size={15} />
              </button>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mb-3.5 leading-snug">
              Need instant elevator pricing, customized shaft sizing, site inspection or repair service?
            </p>

            <div className="space-y-2">
              {/* WhatsApp Quick Chat */}
              <a
                href="https://wa.me/923064854418?text=Assalam-o-Alaikum%20A.M%20Engineering,%20I%20am%20interested%20in%20an%20elevator%20quotation."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md shadow-emerald-900/20 hover:scale-[1.01]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                    <MessageCircle size={15} />
                  </div>
                  <div>
                    <div className="text-[10px] text-emerald-100 uppercase tracking-widest leading-none">Instant WhatsApp</div>
                    <div className="text-xs font-extrabold mt-0.5">Chat on WhatsApp</div>
                  </div>
                </div>
                <ArrowUpRight size={15} />
              </a>

              {/* Direct Call Button */}
              <a
                href="tel:+923064854418"
                className="flex items-center justify-between p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 text-xs font-semibold transition-all"
              >
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-blue-600 dark:text-blue-400" />
                  <span>Call: 0306-485 4418 (Noor Ahmed)</span>
                </div>
                <ArrowUpRight size={14} className="text-slate-400" />
              </a>

              {/* Secondary Call */}
              <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>Eng. M. Naseer:</span>
                <a href="tel:+923206579307" className="text-blue-600 dark:text-blue-400 hover:underline font-semibold">0320-657 9307</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button - Clean & Professional */}
      <div className="flex items-center gap-2 group">
        
        {/* Subtle pill indicator */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-white/90 dark:bg-slate-900/90 text-slate-700 dark:text-slate-200 text-xs font-bold border border-slate-200 dark:border-slate-700 shadow-lg backdrop-blur-md hover:border-emerald-500/60 transition-all hover:scale-105"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span>Contact Engineers</span>
        </button>

        {/* Floating Action Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Direct Lift Consultation"
          className="relative flex items-center justify-center w-13 h-13 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white shadow-xl shadow-emerald-950/30 hover:scale-105 active:scale-95 transition-all duration-200 ring-4 ring-emerald-500/20 cursor-pointer"
        >
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-900 animate-ping" />
          <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white dark:ring-slate-900" />
          
          <Phone size={22} />
        </button>
      </div>

    </div>
  );
};

export default FloatingContact;
