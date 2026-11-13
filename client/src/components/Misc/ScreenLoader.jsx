import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings } from 'lucide-react';

const ScreenLoader = () => {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate progress
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(progressInterval); return 100; }
        return prev + Math.random() * 12;
      });
    }, 200);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2200);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -30 }}
          transition={{ duration: 0.7, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-slate-950 overflow-hidden"
        >
          {/* Animated background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/10 via-transparent to-electric-cyan/5 animate-gradient-shift" />
          
          {/* Grid pattern */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(rgba(255,255,255,.06)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.06)_1px,transparent_1px)] bg-[size:24px_24px]" />

          {/* Glow orbs */}
          <div className="absolute top-1/3 left-1/4 w-64 h-64 bg-brand-blue/15 rounded-full blur-[80px] animate-float" />
          <div className="absolute bottom-1/3 right-1/4 w-48 h-48 bg-electric-cyan/10 rounded-full blur-[60px] animate-float-delayed" />

          <div className="relative z-10 flex flex-col items-center">
            {/* Gear animation */}
            <div className="relative mb-8">
              {/* Outer pulse ring */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-24 h-24 rounded-full border-2 border-brand-blue/20 animate-pulse-ring" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 rounded-full border border-brand-blue/15 animate-pulse-ring" style={{ animationDelay: '0.5s' }} />
              </div>

              {/* Rotating gear */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
                className="relative z-10 w-16 h-16 flex items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-brand-blue to-blue-600 flex items-center justify-center shadow-[0_0_40px_rgba(37,99,235,0.4)]">
                  <Settings size={30} className="text-white" strokeWidth={1.5} />
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-center"
            >
              <div
                className="text-3xl sm:text-4xl font-extrabold text-white tracking-wider uppercase mb-1"
                style={{ fontFamily: 'Outfit, sans-serif' }}
              >
                A.M <span className="text-blue-400">Engineering</span>
              </div>
              <p className="text-blue-300/80 text-[11px] font-bold tracking-[0.25em] uppercase mb-1">
                &amp; Elevators
              </p>
              <p className="text-slate-400 text-xs font-medium tracking-[0.2em] uppercase">
                Loading Elevator Systems...
              </p>
            </motion.div>
            
            {/* Progress bar */}
            <div className="w-72 h-1.5 bg-slate-800 rounded-full mt-8 overflow-hidden relative">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: `${Math.min(progress, 100)}%` }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute top-0 left-0 h-full rounded-full bg-gradient-to-r from-brand-blue via-blue-400 to-brand-blue animate-gradient-shift"
              />
              {/* Shimmer effect */}
              <motion.div
                animate={{ x: ['-100%', '400%'] }}
                transition={{ repeat: Infinity, duration: 1.2, ease: 'linear' }}
                className="absolute top-0 left-0 h-full w-16 bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-12"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-slate-500 text-[11px] mt-3 tracking-widest"
            >
              {Math.min(Math.round(progress), 100)}%
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ScreenLoader;
