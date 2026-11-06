import React from 'react';
import { ShieldCheck, Zap, AlertTriangle, CheckCircle2, Lock, Cpu, Activity, Award } from 'lucide-react';
import { motion } from 'framer-motion';

const safetyFeatures = [
  {
    icon: Zap,
    title: 'ARD Automatic Rescue Device',
    subtitle: 'Zero Trapping During Load-Shedding',
    desc: 'Equipped with battery backup systems that immediately detect power cuts, smoothly maneuver the lift to the nearest landing floor, and open doors automatically.',
    tag: '100% Power Failure Protection',
  },
  {
    icon: Lock,
    title: 'Progressive Mechanical Safety Gear',
    subtitle: 'Instant Mechanical Rail Grippers',
    desc: 'An independent overspeed governor activates heavy mechanical wedges that clamp directly onto the solid steel T-guide rails, preventing any abnormal acceleration.',
    tag: 'Triple Redundant Braking',
  },
  {
    icon: Activity,
    title: 'Full-Height Infrared Light Curtains',
    subtitle: 'Smart Anti-Entrapment Door Guard',
    desc: 'Multi-beam infrared laser sensor grid protects passengers, elderly, children, and cargo pallets from door impacts without needing physical touch.',
    tag: 'Millimeter Sensitivity',
  },
  {
    icon: AlertTriangle,
    title: 'Hydraulic Rupture Safety Valves',
    subtitle: 'Heavy Cargo & Goods Protection',
    desc: 'Automatic hydraulic check valves immediately lock oil flow if line pressure fluctuations occur, preventing sudden cabin descent under full 5,000 kg load.',
    tag: 'Industrial Heavy Duty',
  },
  {
    icon: Cpu,
    title: 'Smart Microprocessor Controller',
    subtitle: 'VVVF Smooth Acceleration & Deceleration',
    desc: 'Variable Voltage Variable Frequency (VVVF) motor drives ensure whisper-quiet leveling with zero millimeter floor misalignment and jerk-free travel.',
    tag: 'Intelligent Control',
  },
  {
    icon: Award,
    title: '125% Overload Stress Testing',
    subtitle: 'Pre-Handover Site Certification',
    desc: 'Every lift undergoes dynamic load testing at 125% rated capacity, structural weld inspection, and complete safety sign-off before official client handover.',
    tag: 'Certified Safety Standard',
  },
];

const SafetyStandards = () => {
  return (
    <section id="standards" className="py-20 md:py-24 bg-slate-50 dark:bg-slate-900/60 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-4 uppercase tracking-widest bg-emerald-100 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-400">
            <ShieldCheck size={15} />
            <span>Uncompromising Life Safety Engineering</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Engineered for 100% Passenger &amp; Cargo Safety
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            At A.M Engineering &amp; Elevators, every lift is built around fail-safe mechanical and electronic redundancies. We ensure absolute peace of mind for commercial plazas, residential homes, and heavy industrial facilities across Pakistan.
          </p>
        </div>

        {/* 6 Safety Pillars Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {safetyFeatures.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className="bg-white dark:bg-slate-800/80 rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-slate-700/80 shadow-sm hover:shadow-md hover:border-emerald-500/50 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800 flex items-center justify-center">
                      <Icon size={24} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700/50 text-slate-600 dark:text-slate-300">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-1" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {item.title}
                  </h3>
                  <div className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 mb-3">
                    {item.subtitle}
                  </div>
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 dark:border-slate-700/50 flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  <span>Standard on all A.M Installations</span>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Trust Endorsement Strip */}
        <div className="bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 border border-blue-900/60 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-blue-600/30 border border-blue-500/40 flex items-center justify-center text-blue-400 flex-shrink-0">
              <ShieldCheck size={32} />
            </div>
            <div>
              <div className="text-base sm:text-lg font-bold">Need a Safety Audit or AMC Maintenance for Your Existing Lift?</div>
              <div className="text-xs sm:text-sm text-slate-300">Our senior field engineers perform complete safety testing, cable inspection, and motor health checks across Pakistan.</div>
            </div>
          </div>
          <a
            href="tel:+923206579307"
            className="flex-shrink-0 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs uppercase tracking-wider transition-all shadow-md shadow-blue-600/20 hover:scale-105 active:scale-95"
          >
            Book Free Inspection
          </a>
        </div>

      </div>
    </section>
  );
};

export default SafetyStandards;

