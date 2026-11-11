import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Building2, 
  Factory, 
  Layers, 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  Cpu, 
  Gauge, 
  Ruler, 
  Clock, 
  Wrench,
  HelpCircle
} from 'lucide-react';

const CATEGORIES = [
  {
    id: 'passenger',
    title: 'Passenger Lifts (MRL / Traction)',
    shortLabel: 'Passenger Lifts',
    icon: Building2,
    badge: 'Residential & Corporate Plazas',
    tagline: 'High-speed, whisper-quiet gearless PMSM motor drives with zero machine room required (MRL).',
    description: 'Designed for residential apartment complexes, high-rise corporate plazas, hospitals, and hotels. Features full regenerative energy savings, microprocessor VVVF leveling, and automatic emergency rescue (ARD).',
    specs: [
      { label: 'Rated Capacity', value: '450 kg to 1,600 kg (6 to 21 Passengers)' },
      { label: 'Speed Range', value: '1.0 m/s – 2.5 m/s (Fast smooth travel)' },
      { label: 'Drive Type', value: 'Permanent Magnet Synchronous Motor (PMSM Gearless)' },
      { label: 'Shaft Geometry (Pit)', value: '1,200 mm – 1,500 mm' },
      { label: 'Overhead Clearance', value: '3,800 mm – 4,400 mm' },
      { label: 'Door Configuration', value: 'Center-Opening or Side-Slide Telescopic Stainless Steel' },
      { label: 'Safety Standard', value: 'EN81-20/50 & Pakistan Engineering Council Compliant' },
    ],
    features: [
      'Automatic Rescue Device (ARD) during load-shedding',
      'Infrared 3D light curtain door obstacle sensors',
      'Hairline / mirror finish SS304 cabin styling',
      'Overload voice alarm with digital LCD display'
    ],
    idealFor: 'Apartment buildings, corporate office towers, shopping malls, clinics and hotels.'
  },
  {
    id: 'cargo',
    title: 'Heavy-Duty Cargo & Freight Lifts (Hydraulic)',
    shortLabel: 'Cargo & Freight Lifts',
    icon: Factory,
    badge: 'Industrial Factories & Warehouses',
    tagline: 'Heavy-gauge reinforced steel platform with hydraulic rupture check valves for extreme workloads.',
    description: 'Custom engineered for textile processing mills, spinning units, engineering workshops, and distribution warehouses. Built with heavy structural steel channels that withstand rough forklift and batch trolley loading.',
    specs: [
      { label: 'Rated Capacity', value: '1,000 kg to 5,000+ kg (Heavy Freight & Forklifts)' },
      { label: 'Speed Range', value: '0.25 m/s – 0.6 m/s (Heavy-load stable descent)' },
      { label: 'Drive Type', value: 'Direct / Indirect Heavy Hydraulic Ram & Electric Hoist' },
      { label: 'Shaft Geometry (Pit)', value: '600 mm – 1,200 mm (Low pit adaptable)' },
      { label: 'Overhead Clearance', value: '3,200 mm – 3,800 mm' },
      { label: 'Door Configuration', value: 'Manual Collapsible Steel Shutter or Bi-Parting Vertical Gates' },
      { label: 'Platform Deck', value: 'Chequered Heavy Steel Anti-Skid Floor Plate' },
    ],
    features: [
      'Hydraulic line rupture burst safety lock valves',
      'Phase failure & reverse phase electrical protection',
      'Forklift reinforced landing sills & buffers',
      'Emergency manual lowering valve in case of power failure'
    ],
    idealFor: 'Textile spinning & weaving mills, rice mills, manufacturing plants, mezzanine floors and freight warehouses.'
  }
];

const LiftCategoriesTable = () => {
  const [activeTab, setActiveTab] = useState(CATEGORIES[0].id);
  const currentCategory = CATEGORIES.find(c => c.id === activeTab) || CATEGORIES[0];

  return (
    <div className="my-16 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 sm:p-8 lg:p-10 shadow-sm transition-colors duration-300">
      
      {/* Title & Section Introduction */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80 mb-2.5">
            <Ruler size={13} />
            <span>Engineering Dimension &amp; Civil Specs</span>
          </div>
          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Interactive Lift Categories &amp; Technical Specs
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 max-w-2xl">
            Compare architectural dimensions, motor drive types, and safety compliance across our primary elevator lines.
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex bg-slate-100 dark:bg-slate-800 p-1.5 rounded-2xl gap-1.5 self-start md:self-auto border border-slate-200/80 dark:border-slate-700/80">
          {CATEGORIES.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-bold text-xs sm:text-sm transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25'
                    : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-white/60 dark:hover:bg-slate-700/50'
                }`}
              >
                <Icon size={16} />
                <span>{tab.shortLabel}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Content Display */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentCategory.id}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.25 }}
          className="grid lg:grid-cols-12 gap-8 items-start"
        >
          {/* Left Column: Model Overview & Key Highlights */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <div className="inline-block px-3 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 text-xs font-semibold uppercase tracking-wider mb-3">
                {currentCategory.badge}
              </div>
              <h4 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {currentCategory.title}
              </h4>
              <p className="text-blue-600 dark:text-blue-400 text-sm font-semibold mb-3">
                {currentCategory.tagline}
              </p>
              <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-6">
                {currentCategory.description}
              </p>

              {/* Built-in Features */}
              <div className="mb-6">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block mb-3">
                  Safety &amp; Engineering Features:
                </span>
                <ul className="space-y-2">
                  {currentCategory.features.map((feat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                      <CheckCircle2 size={16} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Ideal For Card */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Typical Application Sites:
              </span>
              <p className="text-xs text-slate-700 dark:text-slate-200 font-medium">
                {currentCategory.idealFor}
              </p>
            </div>
          </div>

          {/* Right Column: Technical Dimension Specifications Table */}
          <div className="lg:col-span-7">
            <div className="overflow-hidden rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm bg-slate-50/50 dark:bg-slate-950/40">
              <div className="px-5 py-3.5 bg-slate-100 dark:bg-slate-800/80 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-200">
                  Engineering Specification Matrix
                </span>
                <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400">
                  Custom Fabrication Available
                </span>
              </div>

              <div className="divide-y divide-slate-200/80 dark:divide-slate-800">
                {currentCategory.specs.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 sm:grid-cols-12 p-4 text-xs sm:text-sm hover:bg-white dark:hover:bg-slate-900/60 transition-colors"
                  >
                    <div className="sm:col-span-5 font-semibold text-slate-500 dark:text-slate-400">
                      {item.label}
                    </div>
                    <div className="sm:col-span-7 font-bold text-slate-900 dark:text-white mt-1 sm:mt-0">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Action Buttons inside Tab */}
            <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
              <span className="text-xs text-slate-500 dark:text-slate-400 text-center sm:text-left">
                Need a site shaft dimension survey in Faisalabad or nearby cities?
              </span>
              <a
                href="#estimator"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm hover:scale-[1.02] active:scale-95"
              >
                <span>Calculate Exact Cost</span>
                <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

    </div>
  );
};

export default LiftCategoriesTable;

