import React, { useState, useId } from 'react';
import { Calculator, ArrowRight, ShieldCheck, CheckCircle2, Zap, Phone, Sparkles, Building2, Layers, Users, Gauge, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const LIFT_TYPES = [
  {
    id: 'passenger',
    title: 'Commercial Passenger Lift',
    desc: 'For corporate offices, commercial plazas, hotels, and hospitals.',
    baseSpeed: '1.5 m/s - 2.0 m/s',
    recommendedDrive: 'VVVF Gearless PMSM',
    pitDepth: '1400 mm',
    overhead: '4200 mm',
    defaultCapacity: '8-10 Persons (680-800 kg)',
    icon: Building2,
  },
  {
    id: 'cargo',
    title: 'Industrial Heavy Cargo Lift',
    desc: 'For factories, warehouses, textile & logistics plants.',
    baseSpeed: '0.5 m/s - 0.75 m/s',
    recommendedDrive: 'Heavy Hydraulic or Geared Traction',
    pitDepth: '1500 mm - 1800 mm',
    overhead: '4400 mm',
    defaultCapacity: 'Heavy Freight (2000 - 5000 kg)',
    icon: Gauge,
  },
  {
    id: 'panoramic',
    title: 'Panoramic Glass Capsule Lift',
    desc: 'Architectural 360° scenic observation glass for malls & atriums.',
    baseSpeed: '1.0 m/s - 1.5 m/s',
    recommendedDrive: 'Ultra-Quiet Gearless PMSM',
    pitDepth: '1300 mm',
    overhead: '4300 mm',
    defaultCapacity: '8-10 Persons (680-800 kg)',
    icon: Sparkles,
  },
  {
    id: 'home',
    title: 'Residential Home & Villa Lift',
    desc: 'Compact, pitless, machine-room-less (MRL) for luxury homes.',
    baseSpeed: '0.4 m/s - 0.63 m/s',
    recommendedDrive: 'Single-Phase / 3-Phase Hydraulic MRL',
    pitDepth: '200 mm - 400 mm (Pitless)',
    overhead: '2800 mm',
    defaultCapacity: '4-6 Persons (320-450 kg)',
    icon: Layers,
  },
];

const FLOOR_OPTIONS = [
  { label: '2 Floors (G+1)', stops: '2 Stops' },
  { label: '3 Floors (G+2)', stops: '3 Stops' },
  { label: '4 Floors (G+3)', stops: '4 Stops' },
  { label: '5 Floors (G+4)', stops: '5 Stops' },
  { label: '6+ Floors (High Rise)', stops: '6+ Stops' },
];

const CAPACITY_OPTIONS = [
  { id: 'small', label: '4 - 6 Persons', weight: '320 - 450 kg', use: 'Homes & Small Clinics' },
  { id: 'medium', label: '8 - 10 Persons', weight: '630 - 800 kg', use: 'Standard Commercial Plazas' },
  { id: 'large', label: '13 - 16 Persons', weight: '1000 - 1250 kg', use: 'Busy Corporate & Hospitals' },
  { id: 'cargo', label: 'Heavy Goods / Pallet', weight: '2,000 - 5,000 kg', use: 'Industrial & Factory Warehouses' },
];

const CABIN_FINISHES = [
  { id: 'hairline', label: 'Hairline Stainless Steel 304', desc: 'Durable, modern commercial satin finish' },
  { id: 'gold', label: 'Titanium Gold Mirror Etched', desc: 'Luxury hotel & premium villa aesthetic' },
  { id: 'glass', label: 'Laminated Architectural Glass', desc: '360-degree panoramic scenic view' },
  { id: 'checker', label: 'Heavy Diamond Steel Plate', desc: 'Reinforced industrial anti-slip flooring' },
];

const DRIVES = [
  { id: 'pmsm', label: 'Gearless Permanent Magnet (PMSM)', note: '40% energy savings, whisper-quiet travel' },
  { id: 'hydraulic', label: 'Heavy Hydraulic Cylinder System', note: 'No overhead room needed, ideal for heavy loads' },
  { id: 'traction', label: 'Geared Heavy Traction Machine', note: 'Cost-effective, reliable heavy-duty workhorse' },
];

const LiftEstimator = () => {
  const [liftType, setLiftType] = useState('passenger');
  const [floors, setFloors] = useState(FLOOR_OPTIONS[1].label);
  const [capacity, setCapacity] = useState(CAPACITY_OPTIONS[1].id);
  const [cabinFinish, setCabinFinish] = useState('hairline');
  const [drive, setDrive] = useState('pmsm');

  const selectedType = LIFT_TYPES.find(t => t.id === liftType) || LIFT_TYPES[0];
  const selectedCap = CAPACITY_OPTIONS.find(c => c.id === capacity) || CAPACITY_OPTIONS[1];
  const selectedFinish = CABIN_FINISHES.find(f => f.id === cabinFinish) || CABIN_FINISHES[0];
  const selectedDrive = DRIVES.find(d => d.id === drive) || DRIVES[0];

  // WhatsApp Pre-filled message generator
  const getWhatsAppUrl = () => {
    const text = `Assalam-o-Alaikum A.M Engineering & Elevators,
I would like an official quotation for an elevator:
- Lift Type: ${selectedType.title}
- Floors/Stops: ${floors}
- Capacity: ${selectedCap.label} (${selectedCap.weight})
- Cabin Finish: ${selectedFinish.label}
- Machine Drive: ${selectedDrive.label}

Please share the estimated price, shaft structural requirements, and delivery timeline.`;
    return `https://wa.me/923064854418?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="estimator" className="py-20 md:py-24 bg-slate-900 text-white relative overflow-hidden transition-colors duration-300">
      {/* Background aesthetic grid & glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px]" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest bg-blue-500/15 border border-blue-400/30 text-blue-300">
            <Calculator size={14} />
            <span>Interactive Lift Specification &amp; Cost Estimator</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Configure Your Elevator in Minutes
          </h2>
          <p className="text-slate-300 text-base sm:text-lg">
            Select your building requirements below to get instant engineering specifications and a free customized WhatsApp quotation directly from our senior engineers.
          </p>
        </div>

        {/* 2-Column Configuration Grid */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* Left Column: Interactive Selectors (7 Cols) */}
          <div className="lg:col-span-7 space-y-7 bg-slate-800/60 backdrop-blur-md p-6 sm:p-8 rounded-2xl border border-slate-700/80 shadow-xl">
            
            {/* Step 1: Lift Type */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-blue-400 mb-3">
                1. Select Elevator Type
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {LIFT_TYPES.map((type) => {
                  const Icon = type.icon;
                  const isSelected = liftType === type.id;
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setLiftType(type.id)}
                      className={`text-left p-4 rounded-xl border transition-all duration-200 flex flex-col justify-between ${
                        isSelected
                          ? 'bg-blue-600/25 border-blue-500 ring-2 ring-blue-500/40 text-white shadow-lg'
                          : 'bg-slate-900/60 border-slate-700/70 hover:border-slate-600 text-slate-300 hover:text-white'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <Icon size={20} className={isSelected ? 'text-blue-400' : 'text-slate-400'} />
                        {isSelected && <CheckCircle2 size={16} className="text-blue-400" />}
                      </div>
                      <div className="font-bold text-sm mb-1">{type.title}</div>
                      <div className="text-[11px] text-slate-400 leading-snug">{type.desc}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 2: Floors / Stops */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-blue-400 mb-3">
                2. Number of Floors / Stops
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {FLOOR_OPTIONS.map((f) => (
                  <button
                    key={f.label}
                    type="button"
                    onClick={() => setFloors(f.label)}
                    className={`py-2.5 px-3 rounded-xl text-xs font-bold border transition-all ${
                      floors === f.label
                        ? 'bg-blue-600 border-blue-500 text-white shadow-md'
                        : 'bg-slate-900/60 border-slate-700/70 text-slate-300 hover:border-slate-600 hover:text-white'
                    }`}
                  >
                    {f.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: Capacity */}
            <div>
              <label className="block text-sm font-bold uppercase tracking-wider text-blue-400 mb-3">
                3. Passenger / Payload Capacity
              </label>
              <div className="grid sm:grid-cols-2 gap-3">
                {CAPACITY_OPTIONS.map((cap) => {
                  const isSelected = capacity === cap.id;
                  return (
                    <button
                      key={cap.id}
                      type="button"
                      onClick={() => setCapacity(cap.id)}
                      className={`text-left p-3.5 rounded-xl border transition-all ${
                        isSelected
                          ? 'bg-blue-600/25 border-blue-500 ring-1 ring-blue-500/50 text-white'
                          : 'bg-slate-900/60 border-slate-700/70 hover:border-slate-600 text-slate-300'
                      }`}
                    >
                      <div className="flex items-center justify-between font-bold text-sm">
                        <span>{cap.label}</span>
                        <span className="text-xs text-blue-300">{cap.weight}</span>
                      </div>
                      <div className="text-[11px] text-slate-400 mt-1">{cap.use}</div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Cabin Finish & Drive (2 columns) */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-blue-400 mb-2">
                  4. Cabin Wall Finish
                </label>
                <select
                  value={cabinFinish}
                  onChange={(e) => setCabinFinish(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-slate-200 outline-none focus:border-blue-500 transition-colors"
                >
                  {CABIN_FINISHES.map((f) => (
                    <option key={f.id} value={f.id}>{f.label}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold uppercase tracking-wider text-blue-400 mb-2">
                  5. Traction / Drive System
                </label>
                <select
                  value={drive}
                  onChange={(e) => setDrive(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-3 text-sm text-slate-200 outline-none focus:border-blue-500 transition-colors"
                >
                  {DRIVES.map((d) => (
                    <option key={d.id} value={d.id}>{d.label}</option>
                  ))}
                </select>
              </div>
            </div>

          </div>

          {/* Right Column: Calculated Specification Sheet & Action Card (5 Cols) */}
          <div className="lg:col-span-5 sticky top-28 space-y-5">
            <div className="bg-gradient-to-b from-slate-800 to-slate-900 rounded-2xl p-6 sm:p-7 border border-blue-500/30 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />

              <div className="flex items-center justify-between pb-4 border-b border-slate-700/80 mb-5">
                <div>
                  <span className="text-[10px] font-bold tracking-widest uppercase text-blue-400">Engineering Recommendation</span>
                  <h3 className="text-xl font-extrabold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {selectedType.title}
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400">
                  <ShieldCheck size={22} />
                </div>
              </div>

              {/* Specs Breakdown */}
              <div className="space-y-3.5 text-xs text-slate-300 mb-6">
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Building Height:</span>
                  <span className="font-semibold text-white">{floors}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Rated Payload:</span>
                  <span className="font-semibold text-white">{selectedCap.label} ({selectedCap.weight})</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Operating Travel Speed:</span>
                  <span className="font-semibold text-blue-400">{selectedType.baseSpeed}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Recommended Drive:</span>
                  <span className="font-semibold text-white">{selectedDrive.label}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Cabin Aesthetics:</span>
                  <span className="font-semibold text-white">{selectedFinish.label}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Minimum Pit Depth:</span>
                  <span className="font-semibold text-white">{selectedType.pitDepth}</span>
                </div>
                <div className="flex justify-between py-1.5 border-b border-slate-800">
                  <span className="text-slate-400">Top Floor Overhead:</span>
                  <span className="font-semibold text-white">{selectedType.overhead}</span>
                </div>
              </div>

              {/* Safety Guarantees Included */}
              <div className="bg-slate-900/80 rounded-xl p-3.5 border border-slate-800 mb-6">
                <div className="font-bold text-[11px] uppercase tracking-wider text-emerald-400 mb-2 flex items-center gap-1.5">
                  <CheckCircle2 size={13} />
                  <span>Standard Safety Package Included</span>
                </div>
                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1">✓ ARD Load-shedding rescue</div>
                  <div className="flex items-center gap-1">✓ Infrared light curtain</div>
                  <div className="flex items-center gap-1">✓ Instant mechanical brake</div>
                  <div className="flex items-center gap-1">✓ 1-Year comprehensive warranty</div>
                </div>
              </div>

              {/* 1-Click WhatsApp CTA */}
              <div className="space-y-3">
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3.5 px-5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm transition-all duration-200 shadow-lg shadow-emerald-600/30 hover:scale-[1.02] active:scale-95"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.225 8.225 0 0 1 2.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.196 8.196 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.25-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1 0 1.24.9 2.44 1.03 2.61.13.17 1.77 2.71 4.3 3.79.6.26 1.07.41 1.44.53.61.19 1.16.17 1.6.1.49-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z"/>
                  </svg>
                  <span>Get Exact Quote on WhatsApp</span>
                </a>

                <div className="flex items-center gap-3">
                  <a
                    href="tel:+923064854418"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
                  >
                    <Phone size={14} className="text-blue-400" />
                    <span>0306-485 4418</span>
                  </a>
                  <a
                    href="tel:+923206579307"
                    className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold transition-all"
                  >
                    <Phone size={14} className="text-blue-400" />
                    <span>0320-657 9307</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

export default LiftEstimator;

