import React, { useState, useEffect } from 'react';
import { ArrowRight, Wrench, CheckCircle2, Star, TrendingUp, Zap, Phone, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// ─── 100% Real Modern Elevator & Lift Background Images ───
const bgImages = [
  // 1. Sleek stainless steel commercial passenger elevator doors with push buttons
  "https://images.unsplash.com/photo-1592256410394-51c948ec13d5?q=80&w=2070&auto=format&fit=crop",
  // 2. Futuristic panoramic glass elevators ascending inside a modern skyscraper atrium
  "https://images.unsplash.com/photo-1532382027701-7880cbd72789?q=80&w=2070&auto=format&fit=crop",
  // 3. Commercial metal elevator doors in an upscale corporate lobby
  "https://images.unsplash.com/photo-1585293878107-569e3ebdab53?q=80&w=2070&auto=format&fit=crop",
  // 4. Panoramic glass observation elevator with skyline view
  "https://images.unsplash.com/photo-1708363795616-22b045b2b645?q=80&w=2070&auto=format&fit=crop",
  // 5. Contemporary architectural hotel & corporate elevator lobby
  "https://images.unsplash.com/photo-1768346564825-6f90c0b89e2e?q=80&w=2070&auto=format&fit=crop",
];

const highlights = [
  { text: "Passenger, Cargo & Hydraulic Lifts", icon: Zap },
  { text: "Panoramic Glass & Home Elevators", icon: TrendingUp },
  { text: "Turnkey Installation & 24/7 Breakdown Support", icon: Shield },
];

const metrics = [
  { value: "500+", label: "Lifts Installed" },
  { value: "15+", label: "Yrs Experience" },
  { value: "100%", label: "Safety Tested" },
  { value: "24/7", label: "Emergency Support" },
];

const AnimatedTagline = () => {
  const [index, setIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setIndex(p => (p + 1) % highlights.length), 3200);
    return () => clearInterval(interval);
  }, []);
  const current = highlights[index];
  return (
    <div className="h-8 flex items-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ y: 16, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -16, opacity: 0 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="flex items-center gap-2 text-sm sm:text-base font-semibold text-blue-600 dark:text-blue-400"
        >
          <current.icon size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
          <span>{current.text}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

const Hero = () => {
  const [currentBg, setCurrentBg] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setCurrentBg(p => (p + 1) % bgImages.length), 5500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-slate-900 transition-colors duration-300">

      {/* ── Real Lift Background Carousel ── */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.img
            key={currentBg}
            src={bgImages[currentBg]}
            initial={{ opacity: 0, scale: 1.04 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0 w-full h-full object-cover"
            alt="Commercial Elevators by A.M Engineering & Elevators"
          />
        </AnimatePresence>
        
        {/* Clean, Readable Professional Overlays */}
        {/* Left-to-right gradient for crisp text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-slate-950/40" />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-slate-950/50" />
      </div>

      {/* ── Main Content Container ── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10 w-full pt-32 pb-20">
        <motion.div
          className="max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full mb-5 bg-blue-500/15 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-semibold tracking-wide"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, delay: 0.3 }}
          >
            <img src="/logo.png" alt="A.M Logo" className="w-5 h-5 rounded-full object-cover ring-1 ring-blue-400/50" />
            <span>A.M Engineering &amp; Elevators</span>
          </motion.div>

          {/* Heading */}
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-[1.08] tracking-tight mb-4 text-white"
            style={{ fontFamily: 'Outfit, sans-serif' }}
          >
            Modern, Safe &amp; Reliable{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-200">
              Elevator Solutions.
            </span>
          </h1>

          {/* Animated Tagline */}
          <div className="mb-5 bg-slate-900/60 backdrop-blur-sm border border-slate-700/50 px-3 py-1 rounded-xl inline-block">
            <AnimatedTagline />
          </div>

          {/* Description */}
          <p className="text-base sm:text-lg text-slate-200 leading-relaxed mb-7 max-w-xl">
            Specialists in <strong className="text-white">Commercial Passenger Elevators</strong>, <strong className="text-white">Industrial Cargo Lifts</strong>, <strong className="text-white">Panoramic Glass &amp; Home Lifts</strong> — with certified safety valves, smooth single-touch operation, and 24/7 technical maintenance across Pakistan.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3.5 mb-9">
            <a
              href="#services"
              id="hero-explore-services"
              className="inline-flex justify-center items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-all duration-200 shadow-lg shadow-blue-600/30 hover:scale-[1.02] active:scale-95"
            >
              <span>Explore Lift Services</span>
              <ArrowRight size={16} />
            </a>
            <a
              href="tel:+923206579307"
              id="hero-call-now"
              className="inline-flex justify-center items-center gap-2 px-6 py-3.5 bg-white/10 hover:bg-white/20 text-white border border-white/20 font-semibold rounded-xl text-sm transition-all duration-200 backdrop-blur-sm hover:scale-[1.02] active:scale-95"
            >
              <Phone size={15} className="text-blue-400" />
              <span>Call: 0320-657 9307</span>
            </a>
          </div>

          {/* Metrics Row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800">
            {metrics.map((m, i) => (
              <div key={i} className="text-left">
                <div className="text-2xl sm:text-3xl font-extrabold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {m.value}
                </div>
                <div className="text-xs text-slate-300 font-medium uppercase tracking-wider mt-0.5">
                  {m.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Clean & Professional Partners Card ── */}
        <motion.div
          className="mt-10 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/60 rounded-2xl p-4 sm:p-5 shadow-xl">
            <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-3 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span>Our Partners &amp; Technical Leads</span>
            </div>
            
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Partner 1: M. Naseer */}
              <div className="flex items-center gap-3.5 bg-slate-800/60 rounded-xl p-3 border border-slate-700/40">
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-11 rounded-xl bg-blue-600/20 border border-blue-500/40 flex items-center justify-center text-blue-300 font-extrabold text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    MN
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>M. Naseer</span>
                    <span className="text-[10px] font-bold text-blue-300 bg-blue-500/20 px-2 py-0.5 rounded-full">Partner</span>
                  </div>
                  <p className="text-slate-300 text-xs mt-0.5 font-medium">+92 320 657 9307</p>
                </div>
              </div>

              {/* Partner 2: Noor Ahmed */}
              <div className="flex items-center gap-3.5 bg-slate-800/60 rounded-xl p-3 border border-slate-700/40">
                <div className="relative flex-shrink-0">
                  <div className="w-11 h-11 rounded-xl bg-sky-600/20 border border-sky-500/40 flex items-center justify-center text-sky-300 font-extrabold text-base" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    NA
                  </div>
                  <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-slate-900" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>Noor Ahmed</span>
                    <span className="text-[10px] font-bold text-sky-300 bg-sky-500/20 px-2 py-0.5 rounded-full">Partner</span>
                  </div>
                  <p className="text-slate-300 text-xs mt-0.5 font-medium">+92 306 485 4418</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Slide Indicator Dots ── */}
      <div className="absolute bottom-6 right-6 flex items-center gap-2 z-10 bg-slate-950/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-800">
        <span className="text-[11px] text-slate-400 font-semibold mr-1">Lift Showcase</span>
        {bgImages.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrentBg(i)}
            aria-label={`Show elevator image ${i + 1}`}
            className="transition-all duration-300 rounded-full"
            style={{
              width: currentBg === i ? '20px' : '7px',
              height: '7px',
              backgroundColor: currentBg === i ? '#3b82f6' : 'rgba(255,255,255,0.3)',
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default Hero;
