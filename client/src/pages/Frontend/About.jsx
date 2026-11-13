import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { 
  CheckCircle2, 
  ShieldCheck, 
  Users, 
  Clock, 
  Award, 
  ArrowRight, 
  Building2, 
  Shield, 
  Zap, 
  Phone, 
  MessageSquare, 
  GraduationCap, 
  Briefcase, 
  UserCheck,
  Compass
} from 'lucide-react';

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
  { icon: Building2, label: 'All Lift Types', value: 'All Models', suffix: '', subtitle: 'Custom In-House Fabrication', color: 'blue' },
  { icon: ShieldCheck, label: 'Safety Compliance', value: 'Strict ARD', suffix: '', subtitle: 'Certified Dual Brake Systems', color: 'emerald' },
  { icon: Clock, label: 'Graduate Engineers', value: 'B.Sc.', suffix: '', subtitle: 'Mechanical Engineering Leads', color: 'indigo' },
  { icon: Award, label: 'Technical Service', value: '24/7', suffix: '', subtitle: 'Continuous Support & AMC Repair', color: 'sky' },
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

// ─── Executive Engineering Leadership & Technical Team ───
const teamMembers = [
  {
    id: 1,
    name: 'M. Naseer',
    designation: 'Chief Executive Officer (CEO)',
    subTitle: 'Principal Mechanical Engineer',
    qualification: 'Graduate Mechanical Engineer',
    phone: '0320-6579307',
    cleanPhone: '923206579307',
    initials: 'MN',
    accentColor: 'from-blue-600 to-indigo-700',
    badgeColor: 'bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800',
    description: 'Chief Executive Officer leading strategic development, engineering innovation, and high-capacity elevator system design. Personally oversees structural calculations, hydraulic load balancing, and nationwide corporate project consulting.',
    specializations: [
      'Strategic Corporate Leadership',
      'Heavy Passenger & Cargo Lift Design',
      'Hydraulic System Architecture',
      'Client Technical Consulting'
    ]
  },
  {
    id: 2,
    name: 'Noor Ahmad',
    designation: 'Managing Director (MD)',
    subTitle: 'Senior Mechanical Engineer',
    qualification: 'Graduate Mechanical Engineer',
    phone: '0306-4854418',
    cleanPhone: '923064854418',
    initials: 'NA',
    accentColor: 'from-emerald-600 to-teal-700',
    badgeColor: 'bg-emerald-100 dark:bg-emerald-900/50 text-emerald-700 dark:text-emerald-300 border-emerald-200 dark:border-emerald-800',
    description: 'Managing Director directing factory workshop operations, precision lathe & CNC machining, overhead crane winch fabrication, conveyor production, and mechanical quality verification prior to field dispatch.',
    specializations: [
      'Industrial Workshop Operations',
      'Precision Lathe & Gear Machining',
      'Overhead Crane Winch Assembly',
      'Quality Assurance & Material Dispatch'
    ]
  },
  {
    id: 3,
    name: 'M. Arslan',
    designation: 'Project & Technical Engineer',
    subTitle: 'Site Mechanical Engineer',
    qualification: 'Graduate Mechanical Engineer',
    phone: '0307-4860805',
    cleanPhone: '923074860805',
    initials: 'MA',
    accentColor: 'from-sky-600 to-blue-700',
    badgeColor: 'bg-sky-100 dark:bg-sky-900/50 text-sky-700 dark:text-sky-300 border-sky-200 dark:border-sky-800',
    description: 'Field Mechanical Engineer leading on-site elevator erections, hoistway shaft alignment, ARD (Automatic Rescue Device) safety testing, speed governor calibrations, and preventive maintenance programs.',
    specializations: [
      'On-Site Lift Erection & Fitting',
      'Shaft Geometry & Rail Alignment',
      'ARD Emergency Testing & Calibration',
      'Preventive Maintenance Protocols'
    ]
  }
];

const StatCard = ({ icon: Icon, label, value, suffix, subtitle, color, index }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const isNumber = typeof value === 'number';
  const count = useCountUp(isNumber ? value : 0, inView);
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
      <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
        {isNumber ? `${inView ? count : 0}${suffix}` : value}
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
              Custom Design &amp; Installation of{' '}
              <span className="text-blue-600 dark:text-blue-400">
                All Types of Lifts in Faisalabad
              </span>
            </h2>

            <p className="text-base sm:text-lg text-slate-700 dark:text-slate-300 mb-4 leading-relaxed font-medium">
              Are you looking for a safe, reliable, and energy-efficient elevator? Tired of recurrent maintenance issues? At <strong className="text-slate-900 dark:text-white">A.M ENGINEERING &amp; ELEVATORS</strong>, we manufacture, erect, and service <strong>every type of lift</strong> across Faisalabad and all of Punjab.
            </p>

            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mb-4 leading-relaxed">
              We specialize in the complete spectrum of vertical transportation: high-speed commercial <strong>passenger elevators</strong>, heavy industrial <strong>cargo &amp; freight lifts</strong> up to 5,000 kg, luxury residential <strong>home &amp; villa lifts</strong>, smooth <strong>hydraulic elevators</strong>, architectural <strong>panoramic glass capsule lifts</strong>, and self-supporting <strong>guided beam mezzanine hoists</strong>.
            </p>

            <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
              Every system is engineered in our local workshop under the direct supervision of certified Graduate Mechanical Engineers, backed by round-the-clock <strong>24/7 maintenance, inspection, and emergency breakdown repair</strong>.
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
            <div className="col-span-2 bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-2xl p-5 sm:p-6 text-white shadow-lg relative overflow-hidden">
              <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 rounded-xl bg-white/15 border border-white/20 flex items-center justify-center flex-shrink-0">
                  <GraduationCap size={24} className="text-white" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-white/20 text-blue-100 mb-1">
                    Graduate Mechanical Engineers
                  </div>
                  <h3 className="text-lg font-bold text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    Qualified Engineering Leadership
                  </h3>
                  <p className="text-blue-100 text-xs sm:text-sm mt-0.5 leading-relaxed">
                    Directed by certified mechanical engineers <strong>Noor Ahmad (Primary: 0306-485 4418)</strong>, <strong>M. Naseer (CEO: 0320-657 9307)</strong>, and <strong>M. Arslan (Project Engineer: 0307-486 0805)</strong> — ensuring precision calculations, certified fabrication, and zero-defect elevator commissioning.
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

        {/* ── Executive Leadership & Engineering Team ── */}
        <div className="mb-24">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-widest bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              <GraduationCap size={14} className="text-blue-600 dark:text-blue-400" />
              <span>Qualified Mechanical Engineering Team</span>
            </div>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Meet Our Executive Leadership
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base mt-2 leading-relaxed">
              Every passenger elevator, heavy cargo lift, crane winch, and industrial conveyor manufactured at A.M Engineering is engineered, supervised, and tested by certified <strong>Graduate Mechanical Engineers</strong>.
            </p>
          </div>

          {/* 3 Team Cards Grid */}
          <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
            {teamMembers.map((member) => (
              <div
                key={member.id}
                className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:border-blue-300 dark:hover:border-blue-700 transition-all duration-300 group"
              >
                {/* Photo Space / Placeholder Area (Left empty as requested) */}
                <div className="relative h-64 sm:h-72 bg-gradient-to-b from-slate-100 via-slate-50 to-slate-200 dark:from-slate-800 dark:via-slate-850 dark:to-slate-900 flex flex-col items-center justify-center p-6 border-b border-slate-200 dark:border-slate-800 overflow-hidden">
                  
                  {/* Subtle Background Pattern */}
                  <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.06] bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:16px_16px]" />

                  {/* Empty Photo Frame with Initials Badge */}
                  <div className="relative z-10 w-28 h-28 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 bg-white/60 dark:bg-slate-800/60 backdrop-blur-sm flex flex-col items-center justify-center group-hover:border-blue-400 dark:group-hover:border-blue-500 transition-colors shadow-inner">
                    <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center text-slate-700 dark:text-slate-200 font-extrabold text-xl tracking-wider shadow-sm">
                      {member.initials}
                    </div>
                    <span className="text-[10px] font-semibold text-slate-400 dark:text-slate-500 mt-1.5 uppercase tracking-wider">
                      Photo Space
                    </span>
                  </div>

                  {/* Top Designation Badge */}
                  <div className="absolute top-4 left-4 z-10">
                    <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold border shadow-xs ${member.badgeColor}`}>
                      <Briefcase size={12} />
                      <span>{member.designation}</span>
                    </span>
                  </div>

                  {/* Graduate Engineer Pill */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-bold bg-slate-900/80 dark:bg-slate-950/80 text-white backdrop-blur-xs shadow-xs">
                      <GraduationCap size={12} className="text-amber-400" />
                      <span>Graduate</span>
                    </span>
                  </div>

                  {/* Bottom Bar in Photo Frame */}
                  <div className="absolute bottom-3 left-4 right-4 z-10 text-center">
                    <span className="inline-block text-[11px] font-medium text-slate-500 dark:text-slate-400 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xs px-3 py-0.5 rounded-full border border-slate-200/60 dark:border-slate-800/60 shadow-xs">
                      Mechanical Engineering Faculty
                    </span>
                  </div>
                </div>

                {/* Member Details */}
                <div className="p-6 flex flex-col flex-grow">
                  {/* Name & Credentials */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between gap-2">
                      <h4 className="text-xl font-black text-slate-900 dark:text-white" style={{ fontFamily: 'Outfit, sans-serif' }}>
                        {member.name}
                      </h4>
                      <span className="text-[11px] font-bold text-blue-600 dark:text-blue-400 uppercase tracking-wide">
                        {member.subTitle}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400 mt-1">
                      <GraduationCap size={14} className="flex-shrink-0" />
                      <span>{member.qualification}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-600 dark:text-slate-400 text-xs sm:text-sm leading-relaxed mb-5 flex-grow">
                    {member.description}
                  </p>

                  {/* Specializations */}
                  <div className="space-y-1.5 mb-6 pt-4 border-t border-slate-150 dark:border-slate-800">
                    <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                      Core Responsibilities
                    </div>
                    {member.specializations.map((spec, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-2 text-xs text-slate-700 dark:text-slate-300">
                        <CheckCircle2 size={13} className="text-blue-600 dark:text-blue-400 flex-shrink-0" />
                        <span>{spec}</span>
                      </div>
                    ))}
                  </div>

                  {/* Contact Actions */}
                  <div className="grid grid-cols-2 gap-2.5 pt-4 border-t border-slate-150 dark:border-slate-800">
                    <a
                      href={`tel:${member.cleanPhone}`}
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-900 dark:text-white font-bold text-xs transition-colors group/call"
                      title={`Call ${member.name} at ${member.phone}`}
                    >
                      <Phone size={14} className="text-blue-600 dark:text-blue-400 group-hover/call:scale-110 transition-transform" />
                      <span>{member.phone}</span>
                    </a>

                    <a
                      href={`https://wa.me/${member.cleanPhone}?text=${encodeURIComponent(`Hello ${member.name}, I would like to consult with you regarding an elevator/engineering project from A.M Engineering.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors shadow-xs shadow-emerald-600/20 group/wa"
                      title={`WhatsApp message to ${member.name}`}
                    >
                      <MessageSquare size={14} className="group-hover/wa:scale-110 transition-transform" />
                      <span>WhatsApp</span>
                    </a>
                  </div>
                </div>
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
