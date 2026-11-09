import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ShieldCheck, Users, Clock, Award, ArrowRight, Building2, Shield, Zap } from 'lucide-react';

// Animated counter hook
const useCountUp = (target, isInView) => {
  const [count, setCount] = React.useState(0);
  React.useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const isDecimal = String(target).includes('.');
    const increment = target / 60;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(isDecimal ? Math.floor(start * 10) / 10 : Math.floor(start));
      }
    }, 25);
    return () => clearInterval(timer);
  }, [isInView, target]);
  return count;
};

const statItems = [
  { icon: Building2, label: 'Lifts Installed', value: 500, suffix: '+', subtitle: 'Commercial & Industrial Sites', color: 'blue' },
  { icon: ShieldCheck, label: 'Safety Record', value: 100, suffix: '%', subtitle: 'Zero Failure Standards', color: 'emerald' },
  { icon: Clock, label: 'Years in Elevators', value: 15, suffix: '+', subtitle: 'Specialized Engineering', color: 'indigo' },
  { icon: Award, label: 'Client Satisfaction', value: 99, suffix: '%', subtitle: 'Nationwide Trusted Partner', color: 'sky' },
];

const liftPillars = [
  'Corporate Passenger Elevators',
  'Heavy Industrial Cargo Lifts',
  'Panoramic Glass Capsule Lifts',
  'Hydraulic Home & Villa Lifts',
  'Beam & Goods Mezzanine Lifts',
  'Lift Modernization & 24/7 AMC',
];

const colorStyles = {
  blue: { icon: 'bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border-blue-200 dark:border-blue-800' },
  emerald: { icon: 'bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 border-emerald-200 dark:border-emerald-800' },
  indigo: { icon: 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400 border-indigo-200 dark:border-indigo-800' },
  sky: { icon: 'bg-sky-50 dark:bg-sky-950/50 text-sky-600 dark:text-sky-400 border-sky-200 dark:border-sky-800' },
};

// ─── Commercial & Corporate Lift Projects Data ───
const liftCategories = [
  'All Lifts',
  'Passenger Elevators',
  'Industrial Cargo Lifts',
  'Panoramic & Glass',
  'Home & Villa Lifts',
];

const liftProjects = [
  {
    id: 1,
    title: 'High-Speed Commercial Corporate Elevator',
    category: 'Passenger Elevators',
    tag: 'Corporate Office Lift',
    location: 'Corporate Plaza & Commercial Towers, Faisalabad',
    image: 'https://images.unsplash.com/photo-1592256410394-51c948ec13d5?auto=format&fit=crop&q=80&w=900',
    description: 'Stainless steel brushed hairline cabin featuring VVVF intelligent drive for smooth jerk-free travel, integrated braille touch panels, LED ambient lighting, and automated floor announcement.',
    specs: ['Capacity: 10-14 Persons (800-1000 kg)', 'Speed: 1.5 - 2.0 m/s', 'Drive: Energy-Efficient Gearless Traction'],
    application: 'Corporate Head Offices, Banks & Commercial Plazas',
  },
  {
    id: 2,
    title: 'Architectural Panoramic Glass Capsule Elevator',
    category: 'Panoramic & Glass',
    tag: 'Panoramic Glass Lift',
    location: 'Shopping Mall & Hotel Atrium, Lahore',
    image: 'https://images.unsplash.com/photo-1532382027701-7880cbd72789?auto=format&fit=crop&q=80&w=900',
    description: 'Custom round and polygon 360° observation glass elevator. Constructed with laminated safety glass and architectural stainless steel frames, creating a stunning visual centerpiece for high-end commercial properties.',
    specs: ['Glass: 10+10 mm Laminated Curved Safety Glass', 'Operation: Ultra-Quiet Hydraulic / Traction', 'Lighting: Custom LED Atrium Glow'],
    application: 'Shopping Malls, Hotels & High-End Plazas',
  },
  {
    id: 3,
    title: 'Heavy-Duty Industrial Freight & Cargo Elevator',
    category: 'Industrial Cargo Lifts',
    tag: 'Industrial Cargo Lift',
    location: 'Textile Processing & Manufacturing Plant, Faisalabad',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=900',
    description: 'Engineered specifically for heavy factory environments to haul pallet trucks, forklifts, and bulk raw materials between floors. Fitted with reinforced checker steel flooring, anti-collision bumper rails, and heavy-duty vertical bi-parting doors.',
    specs: ['Payload: 2,000 kg – 5,000 kg', 'Structure: Heavy Welded Steel Channels', 'Safety: Instant Hydraulic Rupture Valves'],
    application: 'Factories, Warehouses & Logistics Depots',
  },
  {
    id: 4,
    title: 'Corporate Multi-Car Elevator Lobby Installation',
    category: 'Passenger Elevators',
    tag: 'Twin Corporate Lobby',
    location: 'Multi-Story Corporate Headquarters, Islamabad',
    image: 'https://images.unsplash.com/photo-1585293878107-569e3ebdab53?auto=format&fit=crop&q=80&w=900',
    description: 'Complete multi-car elevator installation with group supervisory control that minimizes passenger wait time. Custom luxury entrance frames, infrared full-height door sensors, and emergency ARD backup.',
    specs: ['Configuration: Duplex / Triplex Group Control', 'Door Type: Center-Opening Stainless Steel', 'Safety: Full ARD Emergency Rescue'],
    application: 'Financial Centers, Universities & Corporate Parks',
  },
  {
    id: 5,
    title: 'Heavy Hydraulic Beam & Goods Mezzanine Lift',
    category: 'Industrial Cargo Lifts',
    tag: 'Beam Cargo Lift',
    location: 'Industrial Warehouse & Assembly Facility, Punjab',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=900',
    description: 'Self-supporting beam and cantilever hydraulic lift for moving heavy machinery, drums, and crates between ground floor and mezzanine storage. Requires minimal civil shaft work and zero overhead machine room.',
    specs: ['Capacity: 1,500 kg – 3,000 kg', 'Design: Cantilever Guided Beam', 'Pit Requirement: Shallow / Ramp Mounted'],
    application: 'Industrial Mezzanines & Commercial Warehouses',
  },
  {
    id: 6,
    title: 'Luxury Residential & Villa Hydraulic Home Lift',
    category: 'Home & Villa Lifts',
    tag: 'Luxury Home Lift',
    location: 'Executive Villa & Modern Residence, DHA',
    image: 'https://images.unsplash.com/photo-1708363795616-22b045b2b645?auto=format&fit=crop&q=80&w=900',
    description: 'Ultra-silent, compact home elevator designed to blend seamlessly into luxury private residences. Requires no overhead room and features elegant glass/wood interiors with emergency automatic battery lowering.',
    specs: ['Capacity: 4-6 Persons (320-450 kg)', 'Power: Single Phase (220V) Compatible', 'Operation: Whisper-Quiet Italian Hydraulic Pump'],
    application: 'Private Villas, Duplexes & Multi-Story Homes',
  },
];

const safetyFeatures = [
  { title: 'Automatic Rescue Device (ARD)', desc: 'Safely moves the elevator to the nearest floor and opens doors automatically during load shedding or power cuts.' },
  { title: 'Infrared Multi-Beam Curtains', desc: 'Full-height door safety sensors detect any obstacle instantly, ensuring zero pinch accidents.' },
  { title: 'Over-Speed Governor & Clamps', desc: 'Mechanical safety gear instantly locks the cabin onto guide rails if speed exceeds normal limits.' },
  { title: '24/7 Breakdown Response', desc: 'Specialized mobile technician team on call 24 hours a day for immediate site response.' },
];

const StatCard = ({ icon: Icon, label, value, suffix, subtitle, color, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const count = useCountUp(value || 0, inView);
  const style = colorStyles[color] || colorStyles.blue;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 sm:p-6 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-200"
    >
      <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-3.5 border ${style.icon}`}>
        <Icon size={22} />
      </div>
      <div className="text-3xl font-extrabold text-slate-900 dark:text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
        {inView ? count : 0}{suffix}
      </div>
      <div className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
        {label}
      </div>
      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
        {subtitle}
      </div>
    </motion.div>
  );
};

const AboutUs = () => {
  const [activeTab, setActiveTab] = useState('All Lifts');

  const filteredLifts = activeTab === 'All Lifts'
    ? liftProjects
    : liftProjects.filter(p => p.category === activeTab);

  return (
    <section id="about" className="py-20 md:py-24 bg-slate-50 dark:bg-slate-950 transition-colors duration-300 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">

        {/* ── Top Story & Stats ── */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center mb-20">

          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-4 uppercase tracking-widest bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <Zap size={13} className="text-blue-600 dark:text-blue-400" />
              <span>Elevator &amp; Lift Specialists</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-5 leading-tight" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Specialists in Safe, High-Speed{' '}
              <span className="text-blue-600 dark:text-blue-400">
                Elevators &amp; Lifts
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 mb-4 leading-relaxed font-medium">
              Are you looking for a safe and efficient passenger lift? Are you tired of spending money on the maintenance of passenger lifts? Well, then you have landed at the right place. Because <strong className="text-slate-900 dark:text-white">A.M ENGINEERING &amp; ELEVATORS</strong> deals in all kinds of passenger lifts and automatic elevators.
            </p>

            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mb-4 leading-relaxed">
              Our company offers different kinds of passenger lifts used for different purposes. Most of our automatic lifts are hydraulic, ensuring maximum safety. In addition to space-efficient elevators, we deal in high speed and stylish lifts in various sizes, shapes, and materials — whether you are looking for <strong>mild steel lifts</strong> or <strong>glass elevators</strong>, our company covers everything.
            </p>

            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
              We are committed to providing the best cargo lift services throughout the country (installation, modernization, testing, and commissioning), heavy overhead crane wench, all types of conveyors, and all kinds of spinning, weaving, processing &amp; rice mill parts at reasonable rates.
            </p>

            {/* Check Pillars */}
            <div className="grid sm:grid-cols-2 gap-2.5 mb-7">
              {liftPillars.map((item, i) => (
                <div key={i} className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300 text-sm">
                  <CheckCircle2 size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                  <span className="font-medium">{item}</span>
                </div>
              ))}
            </div>

            <a
              href="#contact"
              id="about-cta"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all duration-200 shadow-md shadow-blue-600/20 hover:scale-[1.02] active:scale-95"
            >
              <span>Get a Lift Installation Quote</span>
              <ArrowRight size={16} />
            </a>
          </motion.div>

          {/* Stats Grid & Partners */}
          <div className="grid grid-cols-2 gap-4">
            {statItems.map((stat, i) => (
              <StatCard key={i} {...stat} index={i} />
            ))}

            {/* Partners Card */}
            <div className="col-span-2 bg-gradient-to-r from-blue-700 to-blue-900 rounded-2xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
                  <Users size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Managed by Experienced Lift Engineers
                  </h3>
                  <p className="text-blue-100 text-xs sm:text-sm mt-0.5 leading-relaxed">
                    Partners <strong>Noor Ahmed (0306-485 4418)</strong> &amp; <strong>M. Naseer (0320-657 9307)</strong> personally supervise shaft geometry, safety testing, and nationwide commissioning.
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* ── Safety Standards Bar ── */}
        <div className="mb-20 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-6 pb-5 border-b border-slate-150 dark:border-slate-800">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Certified Safety Engineering
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Why Companies Trust Our Lifts &amp; Elevators
              </h3>
            </div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 self-start sm:self-auto">
              <Shield size={14} />
              <span>Zero-Defect Quality Pledge</span>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {safetyFeatures.map((feat, idx) => (
              <div key={idx} className="flex flex-col">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className="w-2 h-2 rounded-full bg-blue-600 dark:bg-blue-400" />
                  <span className="font-bold text-slate-900 dark:text-white text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>{feat.title}</span>
                </div>
                <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Commercial Lifts Showcase ── */}
        <div>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 mb-1">
                Elevator Installation Portfolio
              </div>
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                Our Commercial &amp; Industrial Lifts
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-1 max-w-xl">
                Real elevator installations for corporate plazas, multinational offices, shopping centers, factories, and residences.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-1.5">
              {liftCategories.map((cat) => {
                const isActive = activeTab === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveTab(cat)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 ${isActive
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Cards Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-7">
            <AnimatePresence>
              {filteredLifts.map((lift) => (
                <div
                  key={lift.id}
                  className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-lg hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300"
                >
                  {/* Real Lift Photo */}
                  <div className="relative h-56 sm:h-60 overflow-hidden bg-slate-100 dark:bg-slate-800">
                    <img
                      src={lift.image}
                      alt={`${lift.title} - Hydraulic lift installation at AM Engineering Faisalabad`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3">
                      <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-600 text-white shadow-sm">
                        {lift.tag}
                      </span>
                    </div>
                    <div className="absolute bottom-2.5 left-2.5 right-2.5">
                      <span className="text-[11px] font-medium text-white bg-slate-950/75 backdrop-blur-sm px-2.5 py-1 rounded-md block truncate">
                        📍 {lift.location}
                      </span>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-5 sm:p-6 flex flex-col flex-grow">
                    <h4 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white mb-1.5 leading-snug" style={{ fontFamily: 'Outfit, sans-serif' }}>
                      {lift.title}
                    </h4>

                    <div className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide mb-2.5">
                      Suitable for: {lift.application}
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-xs leading-relaxed mb-4 flex-grow">
                      {lift.description}
                    </p>

                    {/* Specs List */}
                    <div className="space-y-1 mb-5 pt-3 border-t border-slate-150 dark:border-slate-800">
                      {lift.specs.map((spec, sIdx) => (
                        <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                          <CheckCircle2 size={13} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>

                    {/* Button */}
                    <a
                      href="#contact"
                      className="inline-flex items-center justify-between font-bold text-xs uppercase tracking-wider py-2.5 px-4 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-blue-600 hover:text-white dark:hover:bg-blue-600 text-slate-800 dark:text-slate-200 transition-all duration-200 group"
                    >
                      <span>Inquire About This Lift</span>
                      <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              ))}
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};

export default AboutUs;
