import React, { useState } from 'react';
import { Phone, X, AlertTriangle, ArrowUpRight, Siren } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const FloatingContact = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2.5 font-sans">
      
      {/* Expanded Emergency Breakdown Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 15, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="bg-slate-900 text-white rounded-2xl p-4 shadow-2xl border border-red-500/40 w-80 mb-1 backdrop-blur-xl"
          >
            <div className="flex items-center justify-between pb-2 mb-2.5 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
                <span className="w-2.5 h-2.5 rounded-full bg-red-500 -ml-4.5" />
                <span className="text-xs font-bold uppercase tracking-wider text-red-400">
                  24/7 Breakdown Hotline
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-md transition-colors"
                aria-label="Close"
              >
                <X size={15} />
              </button>
            </div>

            <p className="text-[12px] text-slate-300 mb-3.5 leading-snug">
              Immediate technical engineering response for elevator entrapment, sudden power shutdown, or mechanical breakdown.
            </p>

            <div className="space-y-2">
              {/* Direct Tel Emergency Call */}
              <a
                href="tel:+923064854418"
                className="flex items-center justify-between p-3 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold transition-all shadow-lg shadow-red-950/40 hover:scale-[1.01]"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-lg bg-white/20 flex items-center justify-center">
                    <Phone size={14} className="animate-pulse" />
                  </div>
                  <div>
                    <div className="text-[10px] text-red-100 uppercase tracking-widest leading-none">Emergency Call Now</div>
                    <div className="text-sm font-extrabold mt-0.5">0306-485 4418</div>
                  </div>
                </div>
                <ArrowUpRight size={16} />
              </a>

              {/* WhatsApp Direct Hotline */}
              <a
                href="https://wa.me/923064854418?text=EMERGENCY%20ELEVATOR%20BREAKDOWN:%20We%20require%20immediate%20technical%20assistance%20at%20our%20site."
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold transition-all shadow-md"
              >
                <div className="flex items-center gap-2">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.25-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.79.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z"/>
                  </svg>
                  <span>WhatsApp Emergency Dispatch</span>
                </div>
                <ArrowUpRight size={14} />
              </a>

              {/* Secondary Technical Contact */}
              <div className="pt-2 border-t border-slate-800 text-[11px] text-slate-400 flex items-center justify-between">
                <span>Eng. M. Naseer:</span>
                <a href="tel:+923206579307" className="text-blue-400 hover:underline font-semibold">0320-657 9307</a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Floating Trigger Button with Siren/Phone & Glowing Pulse */}
      <div className="flex items-center gap-2 group">
        
        {/* Label Badge */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="cursor-pointer hidden sm:inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-slate-900/95 text-white text-xs font-extrabold border border-red-500/50 shadow-xl backdrop-blur-md hover:border-red-400 transition-all hover:scale-105"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="text-red-400">24/7 Breakdown</span>
          <span className="text-slate-300">Hotline</span>
        </button>

        {/* Floating Glowing Action Button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="24/7 Emergency Breakdown Hotline"
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-tr from-red-600 via-rose-600 to-red-500 text-white shadow-2xl shadow-red-600/50 hover:scale-110 active:scale-95 transition-all duration-300 ring-4 ring-red-500/30"
        >
          {/* Animated Glow Rings */}
          <span className="absolute -inset-1 rounded-full bg-red-500/40 animate-ping pointer-events-none" />
          <span className="absolute -inset-2 rounded-full border border-red-400/50 animate-pulse pointer-events-none" />

          {/* Siren / Phone Icon */}
          <Phone size={24} className="relative z-10 animate-bounce" />
        </button>
      </div>

    </div>
  );
};

export default FloatingContact;

