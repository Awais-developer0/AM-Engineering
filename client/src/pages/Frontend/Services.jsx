import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Clock, 
  Star, 
  HeadphonesIcon, 
  CheckCircle2, 
  ArrowRight, 
  Building2, 
  Factory, 
  Flame, 
  Cog, 
  Truck, 
  Layers, 
  PhoneCall, 
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LiftCategoriesTable from './LiftCategoriesTable';

// ── Complete Catalog Services from Official A.M Engineering Brochure ──
const SERVICES_DATA = [
  // 1. Elevators & Vertical Transport
  {
    id: 'passenger-elevator',
    category: 'Elevators & Vertical Transport',
    categoryIcon: Building2,
    badge: 'Flagship Vertical Mobility',
    title: 'Passenger Elevator & Lifts',
    image: '/services/passenger-elevator.jpg',
    tagline: 'High-speed, smooth & whisper-quiet automatic passenger elevators.',
    description: 'Custom manufactured traction and hydraulic passenger lifts for corporate commercial plazas, residential apartments, luxury villas, and hospitals. Featuring premium stainless steel hairline/mirror cabin finishes, automated door operators, digital floor indicator screens, and advanced ARD safety rescue.',
    features: [
      'VVVF Gearless PMSM smooth drive',
      'Mild Steel & Architectural Glass cabins',
      'Single-button intelligent micro-controller',
      'Automatic Rescue Device (ARD) during load-shedding',
    ],
  },
  {
    id: 'loading-elevator',
    category: 'Elevators & Vertical Transport',
    categoryIcon: Building2,
    badge: 'Heavy Industrial',
    title: 'Loading & Cargo Elevator',
    image: '/services/loading-elevator.jpg',
    tagline: 'Heavy structural steel cargo lifts built for extreme payloads.',
    description: 'Engineered specifically for manufacturing mills, warehouses, and multi-storey industrial plants. Built with heavy-duty guide rails, anti-skid chequered steel flooring, and reinforced structural columns that easily withstand heavy forklifts, hand pallet jacks, and heavy batch material transfer.',
    features: [
      'Heavy payload capacity (1,000 kg – 5,000+ kg)',
      'Hydraulic ram or heavy motorized wire-rope hoist',
      'Rupture safety burst check valves',
      'Indoor & outdoor weatherproof installation',
    ],
  },

  // 2. Cranes & Material Handling
  {
    id: 'overhead-crane',
    category: 'Cranes & Material Handling',
    categoryIcon: Factory,
    badge: 'Workshop & Mill Cranes',
    title: 'Overhead Bridge Cranes & Hoist Wench',
    image: '/services/overhead-crane.jpg',
    tagline: 'High-capacity industrial bridge, gantry & jib cranes.',
    description: 'Custom fabrication, turnkey installation, and commissioning of overhead electric traveling (EOT) bridge cranes, single and double girder systems, gantry cranes, and heavy-duty motorized electric hoist wenches engineered for textile mills, metal workshops, and production plants.',
    features: [
      'Single & double girder EOT bridge cranes',
      'Heavy-duty electric motorized hoist wench',
      'Precision pendant & wireless remote operation',
      'Heavy structural steel runway beams & safety stops',
    ],
  },
  {
    id: 'loading-conveyors',
    category: 'Cranes & Material Handling',
    categoryIcon: Factory,
    badge: 'Continuous Logistics',
    title: 'Industrial Loading Conveyors',
    image: '/services/loading-conveyors.jpg',
    tagline: 'High-efficiency material, bag & carton loading systems.',
    description: 'Automated loading and material handling conveyors tailored for warehouse loading docks, rice mills, textile units, and packaging facilities. Designed with durable rubber/PVC belts, robust roller assemblies, and adjustable inclination systems for continuous bulk transportation.',
    features: [
      'Horizontal, inclined & telescopic mobile conveyors',
      'Belt, roller & heavy chain conveyor configurations',
      'Variable speed drive motors for smooth handling',
      'Sturdy mobility wheels for quick dock repositioning',
    ],
  },

  // 3. Mill Material Handling Trolleys
  {
    id: 'cloth-trolley',
    category: 'Mill Trolleys & Storage Systems',
    categoryIcon: Truck,
    badge: 'Textile Material Handling',
    title: 'Industrial Cloth Trolley',
    image: '/services/cloth-trolley.jpg',
    tagline: 'Heavy-gauge steel perforated material transit carts.',
    description: 'Heavy fabricated industrial cloth and fabric transport trolleys designed for textile weaving, dyeing, bleaching, and processing plants. Built with reinforced frames, smooth heavy castor wheels, and snag-free perforated side panels to protect valuable textile goods.',
    features: [
      'Heavy-gauge tubular steel construction',
      'Heavy-duty polyurethane swivel castor wheels',
      'Perforated & sheet metal snag-free interior',
      'Corrosion-resistant epoxy coated finish',
    ],
  },
  {
    id: 'batching-trolley',
    category: 'Mill Trolleys & Storage Systems',
    categoryIcon: Truck,
    badge: 'Spinning & Dyeing Units',
    title: 'Batching Trolley (A-Frame)',
    image: '/services/batching-trolley.jpg',
    tagline: 'Precision A-frame batching transport for textile processing.',
    description: 'Engineered A-frame batching trolleys for handling large fabric rolls, yarn beams, and batch rolls directly from winding and stenter machines. Balanced center-of-gravity design ensures safe, effortless manual and forklift towing inside busy textile mills.',
    features: [
      'Reinforced triangular A-frame engineering',
      'High-load spindle bearings & lock-collars',
      'Tow-hitch compatible for motorized warehouse tuggers',
      'Custom width & height for varying mill beam sizes',
    ],
  },
  {
    id: 'roll-trolley',
    category: 'Mill Trolleys & Storage Systems',
    categoryIcon: Truck,
    badge: 'Multi-Tier Fabric Handling',
    title: 'Roll Trolley (Multi-Tier & Enclosed)',
    image: '/services/roll-trolley.jpg',
    tagline: 'Heavy roll holding racks and enclosed transport carts.',
    description: 'Specialized fabric roll transport solutions available in open multi-tier configurations as well as yellow-mesh enclosed cage trolleys (shown in catalog). Prevents roll damage, simplifies sorting, and maximizes floor-space efficiency in warehouse staging areas.',
    features: [
      'Multi-tier horizontal roll support pipes',
      'Enclosed steel wire-mesh safety cage models',
      'Easy forklift pocket integration',
      'Heavy static load capacity per tier',
    ],
  },
  {
    id: 'folding-rack',
    category: 'Mill Trolleys & Storage Systems',
    categoryIcon: Layers,
    badge: 'Warehouse Stacking',
    title: 'Heavy Folding Racks & Pallet Storage',
    image: '/services/folding-rack.jpg',
    tagline: 'Modular industrial storage and space-saving folding racks.',
    description: 'High-density industrial steel storage and folding pallet racks fabricated from prime structural channel iron. Engineered for organized warehouse inventory, heavy machinery parts storage, fabric rolls, and bulk goods with easy modular assembly and long service life.',
    features: [
      'Modular boltless / welded structural steel frame',
      'High per-beam load rating (500 kg – 2,000 kg)',
      'Epoxy powder-coated anti-rust industrial finish',
      'Customized shelf depth, length, and floor clearance',
    ],
  },

  // 4. Industrial Piping & Fluid Dynamics
  {
    id: 'boiler-pipe-lines',
    category: 'Piping, Pumps & Safety Systems',
    categoryIcon: Flame,
    badge: 'High-Pressure Steam',
    title: 'Boiler Pipe Lines & Steam Distribution',
    image: '/services/boiler-pipe-lines.jpg',
    tagline: 'Certified high-pressure steam, thermal & condensate piping.',
    description: 'Turnkey fabrication, welding, layout routing, and insulation of high-pressure boiler steam pipelines, thermal oil loops, and condensate lines for textile processing mills, chemical plants, and food factories. Compliant with pressure vessel safety codes.',
    features: [
      'Seamless Schedule 40 & 80 steel steam pipe welding',
      'Certified high-pressure flanged joints & expansion loops',
      'Thermal insulation cladding for maximum heat efficiency',
      'Pressure testing, safety valve & steam trap installation',
    ],
  },
  {
    id: 'mono-block-pump',
    category: 'Piping, Pumps & Safety Systems',
    categoryIcon: Factory,
    badge: 'Industrial Pumping',
    title: 'Mono Block Pumps & Fluid Circulation',
    image: '/services/mono-block-pump.jpg',
    tagline: 'Heavy cast-iron centrifugal pumping units.',
    description: 'High-performance mono-block centrifugal and end-suction industrial pumps for water supply, chemical transfer, boiler feeding, cooling tower circulation, and industrial effluent transfer across processing facilities in Faisalabad and nationwide.',
    features: [
      'Cast-iron casing with dynamic balanced bronze/SS impellers',
      'High-efficiency TEFC industrial electric motor coupled',
      'Continuous duty ratings for 24/7 factory operations',
      'Wear-resistant mechanical seals for leak-free pumping',
    ],
  },
  {
    id: 'emergency-exit-stairs',
    category: 'Piping, Pumps & Safety Systems',
    categoryIcon: ShieldCheck,
    badge: 'Life Safety Compliance',
    title: 'Emergency Fire Exit Stairs & Fire Doors',
    image: '/services/emergency-exit-stairs.jpg',
    tagline: 'Structural steel fire escape staircases & fire-rated exit doors.',
    description: 'Fabrication and erection of heavy exterior structural steel emergency exit staircases, safety platforms, handrails, and certified fire exit emergency doors with push-bar panic hardware. Engineered to meet strict industrial labor and building code compliance.',
    features: [
      'Heavy structural channel & angle iron framework',
      'Anti-slip serrated grating stair treads & landing platforms',
      'Fire-rated steel exit doors with certified panic crash bars',
      'Weather-proof galvanized or heavy zinc-chromate primer coating',
    ],
  },
  {
    id: 'fire-hydrant-pipe-lines',
    category: 'Piping, Pumps & Safety Systems',
    categoryIcon: Flame,
    badge: 'Factory Fire Protection',
    title: 'Fire Hydrant Pipe Lines & Hose Cabinets',
    image: '/services/fire-hydrant-pipe-lines.jpg',
    tagline: 'Factory-wide ring main fire protection infrastructure.',
    description: 'Complete fabrication and installation of industrial fire hydrant piping networks, ring mains, landing valves, fire hose reel cabinets, and pressure boost connections to safeguard industrial plants, factories, and warehouses from fire hazards.',
    features: [
      'High-pressure red epoxy coated fire line piping',
      'Wall-mounted steel fire hose box & glass door cabinets',
      'Precision gate valves, check valves & Siamese connections',
      'Hydrostatic pressure tested for instant emergency readiness',
    ],
  },

  // 5. Mechanical Machining & Mill Spares
  {
    id: 'gears',
    category: 'Precision Machining & Mill Parts',
    categoryIcon: Cog,
    badge: 'Precision Transmission',
    title: 'Industrial Gears & Worm Drives',
    image: '/services/gears.jpg',
    tagline: 'Custom spur, helical, bevel, and worm gear cutting.',
    description: 'In-house high-precision gear manufacturing on modern gear hobbing, shaping, and milling machines. We manufacture high-tensile steel, bronze, and nylon gears for spinning, weaving, rice mills, elevator traction gearboxes, and heavy industrial machinery.',
    features: [
      'Spur, helical, spiral bevel, and worm drive gear sets',
      'Alloy steel carburizing, hardening & precision tooth grinding',
      'Direct replacement for imported spinning & weaving machinery',
      'Custom reverse-engineering from sample gears and shafts',
    ],
  },
  {
    id: 'v-pulley',
    category: 'Precision Machining & Mill Parts',
    categoryIcon: Cog,
    badge: 'Power Transmission',
    title: 'V-Pulleys & Heavy Drive Sheaves',
    image: '/services/v-pulley.jpg',
    tagline: 'Dynamically balanced cast iron and steel multi-groove pulleys.',
    description: 'Manufacturing of precision cast-iron, mild steel, and taper-lock V-belt pulleys, elevator traction drive sheaves, and flywheel sheaves. Dynamically balanced to eliminate machine vibration, prevent premature belt wear, and ensure maximum torque transfer.',
    features: [
      'Single to multi-groove pulleys (A, B, C, D, SPZ, SPA, SPB section)',
      'Graded cast-iron GG25 / steel billet construction',
      'Taper-lock bush and standard keyway hub options',
      'Computerized dynamic balancing for high-RPM operation',
    ],
  },
];

const CATEGORIES = [
  'All Services',
  'Elevators & Vertical Transport',
  'Cranes & Material Handling',
  'Mill Trolleys & Storage Systems',
  'Piping, Pumps & Safety Systems',
  'Precision Machining & Mill Parts',
];

const whyItems = [
  { icon: ShieldCheck, title: '100% Quality Guaranteed', desc: 'Pre-dispatch testing & dimensional checks' },
  { icon: Clock, title: '24/7 Technical Support', desc: 'Round-the-clock engineer assistance' },
  { icon: Star, title: 'Competitive Factory Rates', desc: 'Direct in-house manufacturer pricing' },
  { icon: HeadphonesIcon, title: 'Nationwide Service', desc: 'Installation & delivery across Pakistan' },
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('All Services');

  const filteredServices = activeCategory === 'All Services'
    ? SERVICES_DATA
    : SERVICES_DATA.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-20 md:py-24 bg-white dark:bg-slate-900 transition-colors duration-300 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold mb-3 uppercase tracking-widest bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80">
            <span>Official Factory &amp; Engineering Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Elevators, Cranes, Mill Trolleys &amp; Industrial Engineering
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Directly from the workshop catalog of <strong className="text-slate-800 dark:text-slate-200">A.M Engineering &amp; Elevators</strong>. Complete manufacturing, mechanical fabrication, steam piping, and life-safety systems throughout Pakistan.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-blue-600 text-white shadow-md shadow-blue-600/25 scale-105'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700/60'
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Services Grid with Actual Catalog Images */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <AnimatePresence mode="popLayout">
            {filteredServices.map((service, index) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3, delay: index * 0.04 }}
                className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl overflow-hidden hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Product Image from Official Brochure */}
                <div className="h-52 bg-white dark:bg-slate-900 relative overflow-hidden flex items-center justify-center p-3 border-b border-slate-200 dark:border-slate-700/70">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 text-[10px] font-extrabold uppercase tracking-wider rounded-lg bg-blue-600 text-white shadow-sm">
                      {service.badge}
                    </span>
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    {service.category}
                  </span>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                    {service.title}
                  </h3>
                  <p className="text-xs font-semibold text-blue-600 dark:text-blue-400 mb-2.5">
                    {service.tagline}
                  </p>
                  <p className="text-slate-600 dark:text-slate-400 mb-5 leading-relaxed text-xs sm:text-sm flex-grow">
                    {service.description}
                  </p>

                  {/* Bullet Highlights */}
                  <ul className="space-y-1.5 mb-6 pt-3 border-t border-slate-200/80 dark:border-slate-700/60">
                    {service.features.map((feat, i) => (
                      <li key={i} className="flex items-start text-slate-700 dark:text-slate-300 text-xs gap-2">
                        <CheckCircle2 size={14} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  {/* WhatsApp Direct Inquiry */}
                  <div className="mt-auto pt-3 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                    <a
                      href={`https://wa.me/923064854418?text=Assalam-o-Alaikum%20A.M%20Engineering,%20I%20am%20interested%20in%20details%20for%20${encodeURIComponent(service.title)}.`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group transition-all"
                    >
                      <span>Inquire On WhatsApp</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                    <a
                      href="tel:+923064854418"
                      className="p-2 rounded-lg bg-slate-200/70 dark:bg-slate-700/60 hover:bg-blue-600 hover:text-white text-slate-600 dark:text-slate-300 transition-colors"
                      title="Direct Call"
                    >
                      <PhoneCall size={13} />
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
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
            { num: '24/7', label: 'Technical Support' },
            { num: '10k+', label: 'Components Fabricated' },
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
          <p className="text-slate-600 dark:text-slate-400 mb-3 text-base sm:text-lg">Need custom fabrication, elevator installation or industrial mill components?</p>
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
