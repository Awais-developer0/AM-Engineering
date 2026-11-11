import React, { useEffect } from 'react';
import { ArrowUpCircle, ShieldCheck, Factory, Gauge, CheckCircle2, ArrowRight, Clock, HeadphonesIcon, Star, Settings2, Wrench } from 'lucide-react';
import { motion } from 'framer-motion';
import LiftCategoriesTable from './LiftCategoriesTable';

const ServiceCard = ({ icon: Icon, title, description, features }) => (
  <motion.div
    variants={{
      hidden: { opacity: 0, y: 20 },
      show: { opacity: 1, y: 0 }
    }}
    className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl p-6 sm:p-7 hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col"
  >
    {/* Icon */}
    <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-5 bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
      <Icon size={24} />
    </div>

    {/* H3 for semantic hierarchy */}
    <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
      {title}
    </h3>
    <p className="text-slate-600 dark:text-slate-400 mb-5 leading-relaxed text-sm flex-grow">
      {description}
    </p>

    <ul className="space-y-2 mb-6">
      {features.map((feature, i) => (
        <li key={i} className="flex items-start text-slate-700 dark:text-slate-300 text-xs sm:text-sm gap-2">
          <CheckCircle2 size={15} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
          <span>{feature}</span>
        </li>
      ))}
    </ul>

    <div className="mt-auto pt-4 border-t border-slate-200 dark:border-slate-700/60">
      <a
        href="#contact"
        className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group transition-all"
      >
        <span>Inquire About This Service</span>
        <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
      </a>
    </div>
  </motion.div>
);

const whyItems = [
  { icon: ShieldCheck, title: '100% Quality Guaranteed', desc: 'Pre-dispatch testing & safety checks' },
  { icon: Clock, title: '24/7 Breakdown Response', desc: 'Round-the-clock emergency support' },
  { icon: Star, title: 'Competitive Transparent Rates', desc: 'Fair solutions for all budget groups' },
  { icon: HeadphonesIcon, title: 'Nationwide Service', desc: 'Installation & supply across Pakistan' },
];

const Services = () => {
  const servicesData = [
    {
      icon: ArrowUpCircle,
      title: "Passenger Lifts & Automatic Elevators",
      description: "Safe, efficient, space-saving hydraulic and traction passenger lifts for residential and commercial tall buildings. Available in mild steel or glass elevators with single-button easy operation.",
      features: [
        "Hydraulic & High-Speed Lifts",
        "Mild Steel & Glass Elevators",
        "Tested for 24-Hour Continuous Safety",
        "Single-Button Easy Operation",
      ]
    },
    {
      icon: Factory,
      title: "Cargo & Beam Lifts",
      description: "Committed to providing the best cargo lift services across the country. Complete elevator installation, modernization, testing, and commissioning for indoor and outdoor industrial use.",
      features: [
        "Automatic Cargo Lifts & Elevators",
        "Indoor & Outdoor Installation",
        "Turnkey Testing & Commissioning",
        "High-Quality Lifetime Investment",
      ]
    },
    {
      icon: Gauge,
      title: "Overhead Crane & Conveyors",
      description: "Industrial bridge cranes, gantry, and jib cranes with electric wench, plus heavy-duty conveyor systems including belts, rollers, chains, chutes, buckets, slats, and spiral conveyors.",
      features: [
        "Bridge, Gantry & Jib Cranes",
        "Electric Motorized Hoist Wench",
        "Belt, Roller & Chain Conveyors",
        "Horizontal, Inclined & Spiral Systems",
      ]
    },
    {
      icon: Settings2,
      title: "Spinning, Weaving, Processing & Rice Mill Parts",
      description: "Precision gears and drives transmitting power and motion, and specialized manufacturing trolleys to transport materials in batches across textile, manufacturing, and rice mills.",
      features: [
        "Precision Industrial Gears & Drives",
        "Heavy Manufacturing Batch Trolleys",
        "Spinning & Weaving Machine Parts",
        "Rice Mill Components & Screens",
      ]
    },
  ];

  return (
    <section id="services" className="py-20 md:py-24 bg-white dark:bg-slate-900 transition-colors duration-300 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header - H2 Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-widest bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <span>All Kinds Spinning Weaving Processing &amp; Rice Mill Parts</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Passenger, Cargo, Beam Lifts, Overhead Cranes &amp; Conveyors
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Specialist in Passenger, Cargo, Beam, Home Lifts, Overhead Crane Wench, and All Type of Conveyors throughout Pakistan at reasonable rates.
          </p>
        </div>

        {/* 4 Service Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {servicesData.map((service, index) => (
            <ServiceCard key={index} {...service} index={index} />
          ))}
        </div>

        {/* Interactive Lift Categories & Specs Table Component */}
        <LiftCategoriesTable />

        {/* Why Choose Us */}
        <div className="mb-16">
          <h3 className="text-center text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mb-7" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Why Choose A.M Engineering &amp; Elevators?
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whyItems.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-3.5 p-4 bg-slate-50 dark:bg-slate-800/50 rounded-xl border border-slate-200 dark:border-slate-700/70"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center flex-shrink-0">
                  <item.icon size={18} />
                </div>
                <div>
                  <div className="font-bold text-slate-900 dark:text-white text-sm" style={{ fontFamily: 'Outfit, sans-serif' }}>{item.title}</div>
                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Statistics Blue Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-0 bg-blue-700 rounded-2xl overflow-hidden shadow-lg text-white">
          {[
            { num: '500+', label: 'Lifts Installed' },
            { num: '15+', label: 'Years Experience' },
            { num: '24/7', label: 'Emergency Support' },
            { num: '10k+', label: 'Parts Supplied' },
          ].map((s, i) => (
            <div key={i} className="text-center py-7 px-4 border-r border-blue-600/60 last:border-r-0">
              <div className="text-3xl sm:text-4xl font-extrabold text-white mb-0.5" style={{ fontFamily: 'Outfit, sans-serif' }}>
                {s.num}
              </div>
              <div className="text-blue-100 text-xs sm:text-sm font-medium">{s.label}</div>
            </div>
          ))}
        </div>

        {/* CTA Bar */}
        <div className="mt-12 text-center">
          <p className="text-slate-600 dark:text-slate-400 mb-3 text-base sm:text-lg">Need a custom elevator, crane, or replacement parts?</p>
          <a
            href="#contact"
            id="services-contact-cta"
            className="inline-flex items-center gap-2 px-7 py-3.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl text-sm transition-all duration-200 shadow-md shadow-blue-600/20 hover:scale-[1.02] active:scale-95"
          >
            <span>Request a Free Quote</span>
            <ArrowRight size={16} />
          </a>
        </div>

      </div>
    </section>
  );
};

export default Services;
