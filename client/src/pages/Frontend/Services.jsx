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
  Check,
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LiftCategoriesTable from './LiftCategoriesTable';

// ── Complete 14 Official Products & Engineering Services from the Cards ──
const ALL_CATALOG_SERVICES = [
  // 1. Loading Elevator
  {
    id: 'loading-elevator',
    catalogName: 'LOADING ELEVATOR',
    title: 'Loading & Cargo Elevator',
    image: '/services/loading-elevator.jpg',
    category: 'Elevators & Vertical Transport',
    categoryIcon: Building2,
    badge: 'Heavy Industrial',
    tagline: 'High-payload freight elevators for factory & warehouse material shifting.',
    description: 'Hum high-capacity industrial loading elevators aur cargo lifts design aur manufacture karte hain jo factories, spinning mills, processing plants aur warehouses me heavy raw material, batch trolleys aur hand pallet trucks ko multi-floor easily shift karne ke liye use hoti hain. Strong steel frame aur heavy guide rails ke sath zero jerk operation provide karti hain.',
    specs: [
      'Capacity: 1,000 kg – 5,000+ kg',
      'Drive: Heavy Hydraulic Ram / Wire Rope Hoist',
      'Floor: Heavy-duty chequered anti-skid steel plate',
      'Safety: Mechanical rupture lock & limit switches'
    ],
    weOfferText: 'Hum provide karte hain: Complete custom size manufacturing, site shaft structural fabrication, automatic door/shutter assembly, testing aur turnkey commissioning.'
  },

  // 2. Passenger Elevator
  {
    id: 'passenger-elevator',
    catalogName: 'PASSENGER ELEVATOR',
    title: 'Passenger Elevator & Home Lifts',
    image: '/services/passenger-elevator.jpg',
    category: 'Elevators & Vertical Transport',
    categoryIcon: Building2,
    badge: 'Commercial & Residential',
    tagline: 'Smooth, silent, luxurious automatic elevators for plazas & homes.',
    description: 'Corporate commercial plazas, residential apartment buildings, hospitals, aur private luxury homes ke liye modern passenger elevators manufacture aur install karte hain. In me imported smooth VVVF gearless motor drives, digital floor displays, architectural glass ya hairline SS-304 cabin finish aur auto door sensors lagaye jaate hain.',
    specs: [
      'Speed: 1.0 m/s – 2.0 m/s',
      'Cabins: Hairline Stainless Steel / Glass Panoramic',
      'Safety: ARD Automatic Rescue System (No trapping)',
      'Operation: Single-touch intelligent microprocessor'
    ],
    weOfferText: 'Hum provide karte hain: Shaft measurement inspection, machine-room-less (MRL) design, interior cabin lighting, electrical wiring aur lifetime maintenance support.'
  },

  // 3. Overhead Crane
  {
    id: 'overhead-crane',
    catalogName: 'OVERHEAD CRANE',
    title: 'Overhead Bridge Cranes & Hoist Wench',
    image: '/services/overhead-crane.jpg',
    category: 'Cranes & Heavy Lifting',
    categoryIcon: Factory,
    badge: 'Factory Lifting',
    tagline: 'Single & double girder EOT bridge cranes for industrial manufacturing bays.',
    description: 'Heavy industrial production bays, metal fabrication workshops aur textile plants ke liye custom overhead traveling bridge cranes (EOT), gantry cranes aur motorized hoist wenches fabricate aur erect karte hain. Yeh cranes heavy machinery lifting, steel coils aur mold loading ko effortless aur safe bana deti hain.',
    specs: [
      'Type: Single Girder / Double Girder / Gantry Crane',
      'Hoist: Motorized electric wire-rope hoist wench',
      'Control: Push-button pendant & wireless radio remote',
      'Runway: Complete heavy I-beam rail tracks & end-trucks'
    ],
    weOfferText: 'Hum provide karte hain: Crane structural engineering, rail alignment, motorized trolley installation, load deflection stress testing aur annual servicing.'
  },

  // 4. Loading Conveyors
  {
    id: 'loading-conveyors',
    catalogName: 'LOADING CONVEYORS',
    title: 'Industrial Loading & Unloading Conveyors',
    image: '/services/loading-conveyors.jpg',
    category: 'Cranes & Heavy Lifting',
    categoryIcon: Factory,
    badge: 'Bulk Material Handling',
    tagline: 'Automated mobile & stationary belt conveyors for fast truck loading.',
    description: 'Warehouses, rice mills, packaging units aur textile logistics ke liye heavy-duty loading conveyors manufacture karte hain. Heavy bags, cartons aur material sacks ko trucks aur containers me bina kisi manual thakan ke direct load aur unload karne ke liye height adjustable mobile conveyor systems provide ki jaati hain.',
    specs: [
      'Belts: High-friction heavy rubber / PVC vulcanized belt',
      'Mobility: Heavy castor wheels for easy yard movement',
      'Elevation: Hydraulic / mechanical height incline adjust',
      'Drive: High-torque geared motor with forward/reverse'
    ],
    weOfferText: 'Hum provide karte hain: Telescopic & inclined conveyor fabrication, custom length/belt width options, electrical control panel installation aur spare rollers.'
  },

  // 5. Cloth Trolley
  {
    id: 'cloth-trolley',
    catalogName: 'CLOTH TROLLEY',
    title: 'Textile Cloth & Fabric Transport Trolley',
    image: '/services/cloth-trolley.jpg',
    category: 'Mill Trolleys & Storage Systems',
    categoryIcon: Truck,
    badge: 'Textile Processing',
    tagline: 'Heavy-gauge snag-free material transport carts for textile mills.',
    description: 'Textile spinning, weaving, dyeing, bleaching aur printing mills ke liye high-durability cloth trolleys fabricate karte hain. Strong steel tubular pipes aur smooth perforated sheets se banayi jaati hain taake qeemti kapra kahi phas kar phate nahi aur heavy rolls easily ek department se doosre department move ho sakein.',
    specs: [
      'Body: Heavy gauge tubular frame with smooth interior',
      'Wheels: Polyurethane (PU) smooth rolling castor wheels',
      'Coating: Anti-corrosion industrial epoxy painted finish',
      'Design: Ergonomic push handles with reinforced corners'
    ],
    weOfferText: 'Hum provide karte hain: Custom mill dimension fabrication, batch size tailoring, extra-heavy load castor upgrades aur bulk factory supply.'
  },

  // 6. Batching Trolley
  {
    id: 'batching-trolley',
    catalogName: 'BATCHING TROLLEY',
    title: 'A-Frame Batching Trolley',
    image: '/services/batching-trolley.jpg',
    category: 'Mill Trolleys & Storage Systems',
    categoryIcon: Truck,
    badge: 'Fabric Beam Handling',
    tagline: 'Precision triangular A-frame batching transport for continuous processing.',
    description: 'Weaving aur dyeing mills ke liye large fabric batch rolls aur stenter winding beams ko hold aur transport karne ke liye specialized A-Frame batching trolleys fabricate karte hain. Perfectly balanced triangular frame roll ko girne se mehfooz rakhta hai aur mill floor par smooth maneuverability deta hai.',
    specs: [
      'Structure: Heavy structural channel triangular A-frame',
      'Bearings: Heavy-duty pillow block roll shaft bearings',
      'Towing: Forklift & electric tugger hitch attachment',
      'Capacity: Large diameter jumbo textile fabric rolls'
    ],
    weOfferText: 'Hum provide karte hain: Mill beam size customization, center-of-gravity balance testing, brake-equipped castor assemblies aur heavy beam holders.'
  },

  // 7. Roll Trolley
  {
    id: 'roll-trolley',
    catalogName: 'ROLL TROLLEY',
    title: 'Fabric Roll Holding & Cage Trolleys',
    image: '/services/roll-trolley.jpg',
    category: 'Mill Trolleys & Storage Systems',
    categoryIcon: Truck,
    badge: 'Storage & Transit',
    tagline: 'Multi-tier roll storage racks and protective enclosed wire-mesh carts.',
    description: 'Textile mills aur garment warehouses me finished fabric rolls ko organize karne aur securely shift karne ke liye multi-tier roll trolleys aur enclosed protective steel mesh cage carts provide karte hain. Is se fabric roll zameen par ganda hone aur transport ke dauran girne se mehfooz rehta hai.',
    specs: [
      'Variants: Multi-tier horizontal pipes & wire-mesh safety cage',
      'Frame: Reinforced steel angles & tubular members',
      'Protection: Mesh walls for total roll drop containment',
      'Mobility: 4-wheel swivel castor steering with foot brakes'
    ],
    weOfferText: 'Hum provide karte hain: Custom shelf spacing, enclosed lockable doors, powder coated finish aur warehouse space optimization consultation.'
  },

  // 8. Folding Rack
  {
    id: 'folding-rack',
    catalogName: 'FOLDING RACK',
    title: 'Heavy Folding Racks & Pallet Stacking',
    image: '/services/folding-rack.jpg',
    category: 'Mill Trolleys & Storage Systems',
    categoryIcon: Layers,
    badge: 'Warehouse Storage',
    tagline: 'Modular industrial steel storage racks and folding inventory stackers.',
    description: 'Industrial storage rooms, factories aur logistics godowns ke liye heavy structural iron folding racks fabricate karte hain. Yeh space-saving modular racks hain jo zaroorat ke waqt easily stack ho jaate hain aur warehouse me heavy inventory aur machine parts ko clean organize rakhte hain.',
    specs: [
      'Material: Prime structural channel & angle iron steel',
      'Load Capacity: 500 kg – 2,500 kg per tier',
      'Design: Boltless / heavy pin collapsible locking system',
      'Finish: Heavy anti-rust primer and industrial topcoat'
    ],
    weOfferText: 'Hum provide karte hain: Complete warehouse racking layout design, customized tier heights, floor anchor mounting aur high-density storage setup.'
  },

  // 9. Boiler Pipe Lines
  {
    id: 'boiler-pipe-lines',
    catalogName: 'BOILER PIPE LINES',
    title: 'High-Pressure Boiler Steam Pipe Lines',
    image: '/services/boiler-pipe-lines.jpg',
    category: 'Piping & Fluid Dynamics',
    categoryIcon: Flame,
    badge: 'Steam Engineering',
    tagline: 'High-pressure certified steam, thermal oil & condensate pipe manifolds.',
    description: 'Textile processing mills, chemical factories aur food plants me steam boilers se production machines tak high-pressure steam distribution pipe lines, thermal oil circuits aur condensate return lines fabricate aur erect karte hain. Complete welding, flange jointing aur thermal insulation shamil hai.',
    specs: [
      'Pipes: Seamless Schedule 40 & 80 high-pressure carbon steel',
      'Joints: Certified butt-welded & high-pressure flanged fittings',
      'Valves: Globe valves, steam traps, safety pressure valves',
      'Testing: Hydrostatic pressure tested to certified safety bar'
    ],
    weOfferText: 'Hum provide karte hain: Turnkey pipe layout engineering, boiler manifold fabrication, rockwool thermal cladding insulation aur safety pressure certification.'
  },

  // 10. Mono Block Pump
  {
    id: 'mono-block-pump',
    catalogName: 'MONO BLOCK PUMP',
    title: 'Industrial Mono Block Pumps & Circulation',
    image: '/services/mono-block-pump.jpg',
    category: 'Piping & Fluid Dynamics',
    categoryIcon: Factory,
    badge: 'Heavy Pumping',
    tagline: 'Heavy cast-iron centrifugal pumping units for factory fluid transfer.',
    description: 'Factories, water supply networks, cooling towers aur industrial effluent processing ke liye high-efficiency mono block centrifugal pumps aur heavy fluid handling pumping sets supply aur install karte hain. Continuous 24/7 industrial running ke liye heavy cast-iron casing aur balanced impellers ke sath aate hain.',
    specs: [
      'Casing: Graded heavy-duty cast iron body',
      'Impeller: Precision balanced bronze / stainless steel',
      'Motor: TEFC high-efficiency industrial copper winding motor',
      'Seal: Wear-resistant mechanical seal for zero fluid leakage'
    ],
    weOfferText: 'Hum provide karte hain: Pump head & discharge flow calculation, foundation mounting, suction-delivery manifold piping aur electrical starter panel setup.'
  },

  // 11. Emergency Exit Stairs
  {
    id: 'emergency-exit-stairs',
    catalogName: 'EMERGENCY EXIT STAIRS',
    title: 'Structural Steel Emergency Fire Exit Stairs',
    image: '/services/emergency-exit-stairs.jpg',
    category: 'Life Safety & Compliance',
    categoryIcon: ShieldCheck,
    badge: 'Factory Fire Safety',
    tagline: 'Exterior heavy steel fire escape stair towers for commercial & mill plazas.',
    description: 'Industrial plazas, multi-storey textile mills aur commercial buildings ke liye heavy structural channel steel ki exterior emergency fire escape staircases fabricate aur assemble karte hain. Serrated anti-slip grating steps, double safety handrails aur sturdy platform landings ensure karte hain ke emergency me safe evacuation ho sake.',
    specs: [
      'Structure: Heavy structural steel channel & box columns',
      'Steps: Anti-slip galvanized serrated safety grating',
      'Handrails: Double-tier heavy safety handrails & kickplates',
      'Compliance: Local labor laws & international factory safety codes'
    ],
    weOfferText: 'Hum provide karte hain: Architectural height surveying, certified civil anchoring, anti-rust weather protective coatings aur fast on-site erection.'
  },

  // 12. Emergency Exit Doors
  {
    id: 'emergency-exit-doors',
    catalogName: 'EMERGENCY EXIT DOORS',
    title: 'Fire Exit Emergency Panic Doors',
    image: '/services/emergency-exit-doors.jpg',
    category: 'Life Safety & Compliance',
    categoryIcon: ShieldCheck,
    badge: 'Building Code Safety',
    tagline: 'Fire-rated heavy steel emergency doors with push-bar panic hardware.',
    description: 'Factories, hospital wards, commercial plazas aur elevator lobbies ke liye certified steel fire exit emergency doors fabricate karte hain. Yeh doors certified panic crash push-bars ke sath aate hain taake kisi bhi emergency ya smoke ki soorat me halka sa push karne par darwaza foran open ho jaye.',
    specs: [
      'Leaf: Double-skin insulated heavy-gauge steel door',
      'Hardware: Heavy-duty horizontal panic crash exit push-bar',
      'Seals: Smoke & heat intumescent perimeter seals',
      'Finish: High-visibility fire red / safety orange industrial coat'
    ],
    weOfferText: 'Hum provide karte hain: Door frame fabrication, auto hydraulic door closer fitting, panic hardware installation aur building compliance sign-off.'
  },

  // 13. Fire Hydrant Pipe Lines
  {
    id: 'fire-hydrant-pipe-lines',
    catalogName: 'FIRE HYDRANT PIPE LINES',
    title: 'Factory Fire Hydrant Pipe Lines & Hose Cabinets',
    image: '/services/fire-hydrant-pipe-lines.jpg',
    category: 'Life Safety & Compliance',
    categoryIcon: Flame,
    badge: 'Fire Safety Infrastructure',
    tagline: 'Industrial fire fighting ring mains, landing valves & hose reel cabinets.',
    description: 'Factories, production sheds aur commercial buildings me fire safety ring mains, underground/overhead fire hydrant pipe networks, landing valves aur wall-mounted glass door fire hose reel cabinets fabricate aur install karte hain jo emergency firefighting ke liye har waqt high water pressure maintain rakhti hain.',
    specs: [
      'Pipes: Heavy high-pressure seamless steel piping with red finish',
      'Cabinet: Wall-mounted heavy steel box with glass viewing panel',
      'Hose: Heavy rubber/canvas fire hose with adjustable brass nozzle',
      'Valves: Landing valves, non-return valves & pressure boost Siamese'
    ],
    weOfferText: 'Hum provide karte hain: Complete factory fire line mapping, pump booster connection, hose cabinet fabrication aur hydrostatic flow testing.'
  },

  // 14. Gears & V-Pulleys
  {
    id: 'gears-and-pulleys',
    catalogName: 'GEARS & V-PULLEY',
    title: 'Industrial Precision Gears, Worm Drives & V-Pulleys',
    image: '/services/gears.jpg',
    category: 'Mechanical Machining & Mill Spares',
    categoryIcon: Cog,
    badge: 'Precision Transmission',
    tagline: 'Custom gear cutting, elevator traction sheaves, worm drives & dynamically balanced V-pulleys.',
    description: 'Apni workshop me modern gear hobbing aur shaping machines par high-precision spur, helical, bevel aur worm gear sets manufacture karte hain. Sath hi dynamically balanced graded cast-iron V-belt pulleys aur elevator traction drive sheaves fabricate karte hain jo machinery vibration ko eliminate karti hain.',
    specs: [
      'Gears: Spur, helical, bevel, worm wheel & shaft gear sets',
      'Pulleys: Multi-groove V-belt pulleys (A, B, C, D, SPB sections)',
      'Material: Alloy steel, high-tensile bronze & graded cast iron',
      'Balancing: Computerized dynamic balancing for high-RPM vibration free running'
    ],
    weOfferText: 'Hum provide karte hain: Sample-based reverse engineering, precision tooth hardening & grinding, custom shaft machining aur direct mill replacement parts.'
  }
];

const CATEGORIES = [
  'All 14 Official Services',
  'Elevators & Vertical Transport',
  'Cranes & Heavy Lifting',
  'Mill Trolleys & Storage Systems',
  'Piping & Fluid Dynamics',
  'Life Safety & Compliance',
  'Mechanical Machining & Mill Spares',
];

const whyItems = [
  { icon: ShieldCheck, title: '100% Quality Guaranteed', desc: 'Pre-dispatch testing & dimensional checks' },
  { icon: Clock, title: '24/7 Technical Support', desc: 'Round-the-clock engineer assistance' },
  { icon: Star, title: 'Competitive Factory Rates', desc: 'Direct in-house manufacturer pricing' },
  { icon: HeadphonesIcon, title: 'Nationwide Service', desc: 'Installation & delivery across Pakistan' },
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('All 14 Official Services');

  const filteredServices = activeCategory === 'All 14 Official Services'
    ? ALL_CATALOG_SERVICES
    : ALL_CATALOG_SERVICES.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-20 md:py-24 bg-white dark:bg-slate-900 transition-colors duration-300 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 uppercase tracking-widest bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80">
            <span>Official Workshop Catalog &amp; Services</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Hamari Official Engineering Services &amp; Products
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Jo products aur engineering machinery hamare official brochure card par hain, hum un sab ki in-house manufacturing, turnkey installation aur technical maintenance provide karte hain.
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
                transition={{ duration: 0.3, delay: index * 0.03 }}
                className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl overflow-hidden hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
              >
                {/* Product Image from Official Brochure */}
                <div className="h-56 bg-white dark:bg-slate-950 relative overflow-hidden flex items-center justify-center p-3 border-b border-slate-200 dark:border-slate-700/70">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3 flex flex-col gap-1">
                    <span className="px-2 py-0.5 text-[9px] font-black tracking-widest uppercase rounded bg-slate-900/90 text-yellow-400 border border-yellow-500/30">
                      Card: {service.catalogName}
                    </span>
                    <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded bg-blue-600 text-white shadow-sm self-start">
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
                  <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-xs sm:text-sm">
                    {service.description}
                  </p>

                  {/* Bullet Highlights / Specs */}
                  <div className="mb-4 pt-3 border-t border-slate-200/80 dark:border-slate-700/60">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                      Key Technical Specs:
                    </span>
                    <ul className="space-y-1">
                      {service.specs.map((item, i) => (
                        <li key={i} className="flex items-start text-slate-700 dark:text-slate-300 text-xs gap-2">
                          <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* What We Offer Box */}
                  <div className="p-3 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 mb-5">
                    <p className="text-[11px] text-blue-900 dark:text-blue-200 leading-snug">
                      <strong className="text-blue-700 dark:text-blue-300 font-bold">Hum provide karte hain:</strong> {service.weOfferText.replace('Hum provide karte hain: ', '')}
                    </p>
                  </div>

                  {/* WhatsApp Direct Inquiry */}
                  <div className="mt-auto pt-3 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                    <a
                      href={`https://wa.me/923064854418?text=Assalam-o-Alaikum%20A.M%20Engineering,%20I%20am%20interested%20in%20quotation%20and%20details%20for%20${encodeURIComponent(service.title)}.`}
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
