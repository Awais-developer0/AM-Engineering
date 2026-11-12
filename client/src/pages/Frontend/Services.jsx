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

// ── Complete Individual Products & Engineering Services from the Card ──
const ALL_CATALOG_SERVICES = [
  // 1. Loading Elevator
  {
    id: 'loading-elevator',
    catalogName: 'LOADING ELEVATOR',
    title: 'Loading & Cargo Elevator',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=900',
    category: 'Elevators & Lifts',
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
    title: 'Passenger Elevator',
    image: 'https://images.unsplash.com/photo-1592256410394-51c948ec13d5?auto=format&fit=crop&q=80&w=900',
    category: 'Elevators & Lifts',
    categoryIcon: Building2,
    badge: 'Commercial Plaza',
    tagline: 'Smooth, silent, luxurious automatic elevators for corporate plazas & apartments.',
    description: 'Corporate commercial plazas, residential apartment buildings, hospitals, aur hotels ke liye modern passenger elevators manufacture aur install karte hain. In me imported smooth VVVF gearless motor drives, digital floor displays, architectural glass ya hairline SS-304 cabin finish aur auto door sensors lagaye jaate hain.',
    specs: [
      'Speed: 1.0 m/s – 2.0 m/s',
      'Cabins: Hairline Stainless Steel / Glass Panoramic',
      'Safety: ARD Automatic Rescue System (No trapping)',
      'Operation: Single-touch intelligent microprocessor'
    ],
    weOfferText: 'Hum provide karte hain: Shaft measurement inspection, machine-room-less (MRL) design, interior cabin lighting, electrical wiring aur lifetime maintenance support.'
  },

  // 3. Home Lifts
  {
    id: 'home-lifts',
    catalogName: 'HOME LIFTS',
    title: 'Luxury Home & Villa Lifts',
    image: 'https://images.unsplash.com/photo-1708363795616-22b045b2b645?auto=format&fit=crop&q=80&w=900',
    category: 'Elevators & Lifts',
    categoryIcon: Building2,
    badge: 'Residential Luxury',
    tagline: 'Compact, quiet hydraulic & traction home elevators with zero pit requirement.',
    description: 'Private residences, luxury duplexes aur bungalows ke liye bespoke home elevators install karte hain. In me extra deep pit ya roof machine room ki zaroorat nahi hoti. Single phase (220V) par chalne wali ultra-silent machinery ke sath family members aur elders ke liye safe, comfortable mobility provide karte hain.',
    specs: [
      'Capacity: 4-6 Persons (320 kg – 450 kg)',
      'Power: Single Phase 220V regular electricity',
      'Cabins: Architectural glass / wood laminate aesthetic',
      'Safety: Instant battery backup automatic floor landing'
    ],
    weOfferText: 'Hum provide karte hain: Custom villa architectural shaft layout, glass panoramic capsule installation, luxury push buttons aur smooth hydraulic power pack.'
  },

  // 4. Beam Lifts
  {
    id: 'beam-lifts',
    catalogName: 'BEAM LIFTS',
    title: 'Cantilever Guided Beam Goods Lifts',
    image: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?auto=format&fit=crop&q=80&w=900',
    category: 'Elevators & Lifts',
    categoryIcon: Factory,
    badge: 'Mezzanine Hoist',
    tagline: 'Heavy guided steel beam cantilever lifts for factory mezzanine floors & storage lofts.',
    description: 'Textile mills, warehouses aur industrial workshops me ground floor se mezzanine storage floor tak pallets, yarn boxes aur machinery shifting ke liye single/double guided beam cantilever lifts manufacture karte hain. Concrete shaft ke baghair self-supporting steel beam framework par move karti hai.',
    specs: [
      'Capacity: 500 kg – 3,000 kg',
      'Mast: Prime heavy structural I-beam with guide rollers',
      'Civil Work: Zero overhead machine room & shallow pit',
      'Safety: Anti-drop safety clamps & emergency stop'
    ],
    weOfferText: 'Hum provide karte hain: Mezzanine height surveying, heavy cantilever carriage fabrication, hydraulic cylinder mounting aur safety interlocking gates.'
  },

  // 5. Overhead Crane
  {
    id: 'overhead-crane',
    catalogName: 'OVERHEAD CRANE',
    title: 'Overhead Traveling Bridge Crane (EOT)',
    image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&q=80&w=900',
    category: 'Cranes, Hoists & Conveyors',
    categoryIcon: Factory,
    badge: 'Heavy Factory Lifting',
    tagline: 'Single & double girder EOT bridge cranes for industrial manufacturing bays.',
    description: 'Heavy industrial production bays, steel mills, workshops aur processing plants ke liye overhead traveling bridge cranes (EOT) aur gantry cranes design, fabricate aur assemble karte hain. Heavy machinery parts, coils aur steel sections ko bay ke ek sire se doosre sire tak smoothly shift karti hain.',
    specs: [
      'Span: 10m to 35m custom bay span',
      'Type: Single Girder / Double Girder / Gantry Crane',
      'Drive: Variable frequency motor drives (VVVF)',
      'Runway: Heavy I-beam rail tracks & motorized end-trucks'
    ],
    weOfferText: 'Hum provide karte hain: Structural crane engineering, runway beam alignment, load deflection stress testing aur complete bridge erection.'
  },

  // 6. Hoist Wench
  {
    id: 'hoist-wench',
    catalogName: 'WENCH (HOIST WENCH)',
    title: 'Motorized Electric Wire Rope Hoist Wench',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&q=80&w=900',
    category: 'Cranes, Hoists & Conveyors',
    categoryIcon: Factory,
    badge: 'Precision Lifting',
    tagline: 'Heavy-duty motorized wire rope wench hoists with electromagnetic fail-safe brakes.',
    description: 'Overhead bridge cranes, monorail I-beams aur construction hoists ke liye motorized electric wire-rope hoist wenches assemble aur manufacture karte hain. High-torque pure copper winding motors aur precision hardened gearboxes ke sath yeh wenches heavy loads ko safe aur jerk-free vertically lift karti hain.',
    specs: [
      'Lifting Capacity: 1 Ton to 20+ Ton',
      'Rope: High-tensile galvanized steel wire rope',
      'Brake: Automatic electro-magnetic disc/shoe brake',
      'Control: Wireless radio remote & wired pendant switch'
    ],
    weOfferText: 'Hum provide karte hain: Custom rope drum grooving, forged steel hook block assembly, overload limiter integration aur hoist spare parts.'
  },

  // 7. Loading Conveyors
  {
    id: 'loading-conveyors',
    catalogName: 'LOADING CONVEYORS',
    title: 'Industrial Loading & Unloading Conveyors',
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=900',
    category: 'Cranes, Hoists & Conveyors',
    categoryIcon: Factory,
    badge: 'Bulk Material Handling',
    tagline: 'Automated mobile & telescopic belt conveyors for rapid truck & container loading.',
    description: 'Warehouses, packaging sheds, rice mills aur textile units me trucks aur containers me goods load/unload karne ke liye mobile inclined belt conveyors manufacture karte hain. Height adjustable frame aur forward-reverse motor drive ke sath yeh workers ki mehnat aur loading ka time 70% kam kar deti hain.',
    specs: [
      'Belt: High-friction heavy rubber / PVC vulcanized belt',
      'Mobility: Heavy castor wheels for easy yard movement',
      'Elevation: Hydraulic / mechanical height incline adjust',
      'Drive: High-torque geared motor with forward/reverse switch'
    ],
    weOfferText: 'Hum provide karte hain: Telescopic & inclined conveyor fabrication, custom length & belt width, electrical panel installation aur spare rubber rollers.'
  },

  // 8. Cloth Trolley
  {
    id: 'cloth-trolley',
    catalogName: 'CLOTH TROLLEY',
    title: 'Textile Cloth & Fabric Transport Trolley',
    image: 'https://images.unsplash.com/photo-1586528116493-a029325540fa?auto=format&fit=crop&q=80&w=900',
    category: 'Textile Trolleys & Warehouse Racks',
    categoryIcon: Truck,
    badge: 'Textile Processing',
    tagline: 'Smooth snag-free heavy steel cloth transport carts for weaving & processing.',
    description: 'Spinning, weaving, bleaching, dyeing aur garment printing mills ke liye high-durability cloth trolleys manufacture karte hain. Tubular steel piping aur polished smooth sheet se banti hain taake qeemti kapra phanse ya kharaab na ho aur floor par smooth PU wheels ke zariye aasaani se push kiya ja sake.',
    specs: [
      'Body: Heavy gauge tubular frame with smooth interior',
      'Wheels: Polyurethane (PU) smooth rolling castor wheels',
      'Protection: Anti-collision round corners & rubber bumpers',
      'Finish: Anti-corrosion industrial epoxy painted finish'
    ],
    weOfferText: 'Hum provide karte hain: Custom mill dimension fabrication, batch size tailoring, extra-heavy load castor upgrades aur bulk factory supply.'
  },

  // 9. Batching Trolley
  {
    id: 'batching-trolley',
    catalogName: 'BATCHING TROLLEY',
    title: 'A-Frame Batching Trolley',
    image: 'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&q=80&w=900',
    category: 'Textile Trolleys & Warehouse Racks',
    categoryIcon: Truck,
    badge: 'Fabric Beam Transit',
    tagline: 'Heavy triangular A-frame batching transport for jumbo fabric rolls & beams.',
    description: 'Weaving aur continuous dyeing mills me jumbo fabric rolls aur stenter winding beams ko hold aur transport karne ke liye specialized A-frame batching trolleys fabricate karte hain. Sturdy triangular geometry roll ko girne se rokti hai aur smooth heavy bearings roll ki unrolling ko easy banate hain.',
    specs: [
      'Structure: Heavy structural channel triangular A-frame',
      'Bearings: Heavy-duty pillow block roll shaft bearings',
      'Towing: Forklift & electric tugger hitch attachment',
      'Capacity: Large diameter jumbo textile fabric rolls'
    ],
    weOfferText: 'Hum provide karte hain: Mill beam size customization, center-of-gravity balance testing, brake-equipped castor assemblies aur heavy beam holders.'
  },

  // 10. Roll Trolley (Multi-Tier)
  {
    id: 'roll-trolley-multi-tier',
    catalogName: 'ROLL TROLLEY (MULTI-TIER)',
    title: 'Multi-Tier Pipe Frame Roll Trolley',
    image: 'https://images.unsplash.com/photo-1616401784845-180882ba9ba8?auto=format&fit=crop&q=80&w=900',
    category: 'Textile Trolleys & Warehouse Racks',
    categoryIcon: Truck,
    badge: 'Multi-Roll Storage',
    tagline: 'Multi-tier horizontal pipe racks for high-density fabric roll organization & transit.',
    description: 'Textile processing aur garment finishing departments ke liye multi-tier pipe frame roll trolleys provide karte hain. Is trolley me multiple horizontal support pipes hoti hain jin par fabric rolls alag alag rakhe jaate hain taake roll ka round shape kharab na ho aur ek waqt me kayi rolls move kiye ja sakein.',
    specs: [
      'Tiers: 2 to 4 tiers horizontal pipe support racks',
      'Pipes: Smooth round hollow steel seamless pipes',
      'Capacity: 8 to 24 finished fabric rolls',
      'Castors: 4-wheel swivel castor steering with foot brakes'
    ],
    weOfferText: 'Hum provide karte hain: Custom tier gap sizing according to roll diameter, heavy pipe welding, scratch-proof coating aur smooth maneuverability setup.'
  },

  // 11. Roll Trolley (Enclosed Cage)
  {
    id: 'roll-trolley-cage',
    catalogName: 'ROLL TROLLEY (CAGE)',
    title: 'Enclosed Wire-Mesh Roll Safety Trolley',
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&q=80&w=900',
    category: 'Textile Trolleys & Warehouse Racks',
    categoryIcon: Truck,
    badge: 'Protective Cage',
    tagline: 'Heavy structural wire-mesh enclosed carts preventing fabric rolls from dropping & damage.',
    description: 'Warehouses aur processing units me finished fabric rolls aur valuable goods ko transport ke dauran girne aur zameen par ganda hone se bachane ke liye fully enclosed wire-mesh cage trolleys fabricate karte hain. Front dropdown gate ke sath aati hai taake loading-unloading easy ho.',
    specs: [
      'Walls: Heavy gauge welded steel wire mesh enclosure',
      'Gate: Foldable / drop-down half gate with security latch',
      'Base: Reinforced sheet metal with underside cross braces',
      'Mobility: High-load industrial roller bearing castors'
    ],
    weOfferText: 'Hum provide karte hain: Custom cage dimensions, lockable safety latching, drop-down side panels aur corrosion resistant paint finishing.'
  },

  // 12. Folding Rack
  {
    id: 'folding-rack',
    catalogName: 'FOLDING RACK',
    title: 'Heavy Folding Racks & Pallet Stacking',
    image: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80&w=900',
    category: 'Textile Trolleys & Warehouse Racks',
    categoryIcon: Layers,
    badge: 'Warehouse Stacking',
    tagline: 'Modular heavy-gauge collapsible steel storage racks and inventory stackers.',
    description: 'Industrial warehouses, godowns aur factory storerooms ke liye heavy structural iron folding racks fabricate karte hain. Yeh space-saving modular racks zaroorat ke waqt multi-tier stack ho jaate hain aur jab use me na hon to fold ho kar 80% floor area free kar dete hain.',
    specs: [
      'Material: Prime structural channel & heavy angle iron',
      'Load Capacity: 500 kg – 2,500 kg per tier',
      'System: Boltless interlocking heavy pin collapsible design',
      'Stacking: Up to 4 tiers high vertical fork-lift stacking'
    ],
    weOfferText: 'Hum provide karte hain: Warehouse layout space planning, custom pallet dimensions, heavy duty base plates aur anti-rust primer coatings.'
  },

  // 13. Boiler Pipe Lines
  {
    id: 'boiler-pipe-lines',
    catalogName: 'BOILER PIPE LINES',
    title: 'High-Pressure Boiler Steam Pipe Lines',
    image: 'https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?auto=format&fit=crop&q=80&w=900',
    category: 'Industrial Piping & Pumps',
    categoryIcon: Flame,
    badge: 'Steam Engineering',
    tagline: 'High-pressure certified steam, thermal oil & condensate pipe manifolds.',
    description: 'Textile processing mills, chemical factories aur food plants me steam boilers se machines tak high-pressure steam distribution pipe lines, thermal oil circuits aur condensate return lines fabricate aur erect karte hain. Complete certified welding, flange jointing aur thermal insulation provide ki jaati hai.',
    specs: [
      'Pipes: Seamless Schedule 40 & 80 high-pressure carbon steel',
      'Joints: Certified butt-welded & high-pressure flanged fittings',
      'Valves: Globe valves, steam traps, safety pressure valves',
      'Testing: Hydrostatic pressure tested to certified safety bar'
    ],
    weOfferText: 'Hum provide karte hain: Turnkey pipe layout engineering, boiler manifold fabrication, rockwool thermal cladding insulation aur safety pressure certification.'
  },

  // 14. Mono Block Pump
  {
    id: 'mono-block-pump',
    catalogName: 'MONO BLOCK PUMP',
    title: 'Industrial Mono Block Centrifugal Pumps',
    image: 'https://images.unsplash.com/photo-1581092446327-9b52bd1570c2?auto=format&fit=crop&q=80&w=900',
    category: 'Industrial Piping & Pumps',
    categoryIcon: Factory,
    badge: 'Fluid Dynamics',
    tagline: 'Heavy cast-iron centrifugal pumping units for continuous factory fluid transfer.',
    description: 'Industrial plants, water supply networks, cooling towers aur processing fluid transfer ke liye heavy mono block centrifugal pumps supply aur install karte hain. Continuous 24/7 duty ke liye high efficiency copper winding motors aur dynamically balanced bronze/SS impellers ke sath deliver karte hain.',
    specs: [
      'Casing: Graded heavy-duty cast iron body',
      'Impeller: Precision balanced bronze / stainless steel',
      'Motor: TEFC high-efficiency industrial copper winding motor',
      'Seal: Wear-resistant mechanical seal for zero fluid leakage'
    ],
    weOfferText: 'Hum provide karte hain: Flow rate & head pressure calculation, pump foundation civil mounting, suction-delivery manifold piping aur starter panel integration.'
  },

  // 15. Emergency Exit Stairs
  {
    id: 'emergency-exit-stairs',
    catalogName: 'EMERGENCY EXIT STAIRS',
    title: 'Structural Steel Emergency Fire Exit Stairs',
    image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=900',
    category: 'Fire Safety & Compliance',
    categoryIcon: ShieldCheck,
    badge: 'Life Safety Code',
    tagline: 'Exterior heavy structural steel fire escape towers for commercial & mill plazas.',
    description: 'Multi-storey textile mills, commercial plazas aur factories ke liye heavy exterior emergency fire escape staircases fabricate aur erect karte hain. Serrated anti-slip steel grating steps, double-tier safety handrails aur sturdy platform landings ke sath banayi jaati hain taake kisi bhi emergency me safe evacuation ho sake.',
    specs: [
      'Structure: Heavy structural steel channel & box columns',
      'Steps: Anti-slip galvanized serrated safety grating',
      'Handrails: Double-tier heavy safety handrails & kickplates',
      'Compliance: Local labor laws & international factory safety codes'
    ],
    weOfferText: 'Hum provide karte hain: Site structural height surveying, certified anchor foundation engineering, anti-corrosion weather coating aur complete on-site assembly.'
  },

  // 16. Emergency Exit Doors
  {
    id: 'emergency-exit-doors',
    catalogName: 'EMERGENCY EXIT DOORS',
    title: 'Fire Exit Emergency Panic Doors',
    image: 'https://images.unsplash.com/photo-1517646287270-a5a9ca602e5c?auto=format&fit=crop&q=80&w=900',
    category: 'Fire Safety & Compliance',
    categoryIcon: ShieldCheck,
    badge: 'Building Compliance',
    tagline: 'Fire-rated insulated heavy steel emergency doors with push-bar panic hardware.',
    description: 'Factories, hospital wards, commercial plazas aur elevator lobbies ke liye certified steel fire exit emergency doors fabricate karte hain. Yeh doors certified panic crash push-bars ke sath aate hain taake kisi bhi emergency ya smoke ki soorat me halka sa push karne par darwaza foran bahar ki taraf open ho jaye.',
    specs: [
      'Leaf: Double-skin insulated heavy-gauge steel door',
      'Hardware: Heavy-duty horizontal panic crash exit push-bar',
      'Seals: Smoke & heat intumescent perimeter seals',
      'Finish: High-visibility fire red / safety orange industrial coat'
    ],
    weOfferText: 'Hum provide karte hain: Door frame fabrication, auto hydraulic door closer fitting, panic hardware installation aur building compliance sign-off.'
  },

  // 17. Fire Hydrant Pipe Lines
  {
    id: 'fire-hydrant-pipe-lines',
    catalogName: 'FIRE HYDRANT PIPE LINES',
    title: 'Factory Fire Hydrant Pipe Lines & Hose Cabinets',
    image: 'https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=900',
    category: 'Fire Safety & Compliance',
    categoryIcon: Flame,
    badge: 'Fire Infrastructure',
    tagline: 'Industrial fire fighting ring mains, landing valves & hose reel cabinets.',
    description: 'Factories, production sheds aur commercial plazas me fire safety ring mains, underground/overhead fire hydrant pipe networks, landing valves aur wall-mounted glass door fire hose reel cabinets fabricate aur install karte hain jo emergency firefighting ke liye har waqt high water pressure maintain rakhti hain.',
    specs: [
      'Pipes: Heavy high-pressure seamless steel piping with red finish',
      'Cabinet: Wall-mounted heavy steel box with glass viewing panel',
      'Hose: Heavy rubber/canvas fire hose with adjustable brass nozzle',
      'Valves: Landing valves, non-return valves & pressure boost Siamese'
    ],
    weOfferText: 'Hum provide karte hain: Complete factory fire line mapping, pump booster connection, hose cabinet fabrication aur hydrostatic flow testing.'
  },

  // 18. Gears
  {
    id: 'gears',
    catalogName: 'GEARS',
    title: 'Precision Industrial Gears & Worm Drives',
    image: 'https://images.unsplash.com/photo-1532382027701-7880cbd72789?auto=format&fit=crop&q=80&w=900',
    category: 'Gears, Pulleys & Mill Parts',
    categoryIcon: Cog,
    badge: 'CNC Gear Cutting',
    tagline: 'Custom gear cutting, spur, helical, bevel gears, worm drives & shafts.',
    description: 'Apni workshop me modern gear hobbing aur shaping machines par high-precision spur, helical, bevel aur worm gear sets manufacture karte hain. Textile machinery, elevator winches aur industrial gearboxes ke liye sample ya drawing ke mutabiq exact teeth pitch aur profile generate karte hain.',
    specs: [
      'Types: Spur, Helical, Bevel, Worm Wheel & Pinion Shafts',
      'Material: Alloy steel (EN-8, EN-24, 20MnCr5) & Phosphor Bronze',
      'Hardening: Induction hardening, case carburizing & precision tooth grinding',
      'Accuracy: High dimensional accuracy for vibration-free silent running'
    ],
    weOfferText: 'Hum provide karte hain: Sample-based reverse engineering, precision tooth cutting, custom shaft keyway broaching aur emergency broken gear duplication.'
  },

  // 19. V Pulley
  {
    id: 'v-pulley',
    catalogName: 'V PULLEY',
    title: 'Industrial Multi-Groove V-Pulleys & Sheaves',
    image: 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?auto=format&fit=crop&q=80&w=900',
    category: 'Gears, Pulleys & Mill Parts',
    categoryIcon: Cog,
    badge: 'Dynamic Balancing',
    tagline: 'Heavy cast-iron V-belt pulleys, elevator traction sheaves & taper lock bushings.',
    description: 'Graded cast iron aur steel se dynamically balanced multi-groove V-belt pulleys fabricate karte hain. Textile mills, compressors, flour mills aur elevator traction drive machines ke liye A, B, C, D aur SPB section grooves perfectly turn aur dynamic balance karte hain taake machinery vibration eliminate ho sake.',
    specs: [
      'Grooves: Single to 12-groove V-belt sections (A, B, C, D, SPA, SPB)',
      'Sheaves: Multi-rope elevator traction drive sheaves',
      'Material: High-grade close-grained Cast Iron (CI) & Mild Steel',
      'Balancing: Computerized dynamic balancing for zero wobble at high RPM'
    ],
    weOfferText: 'Hum provide karte hain: Custom diameter turning, taper lock bushing fitting, keyway broaching aur elevator sheave regrooving services.'
  },

  // 20. Spinning, Weaving, Processing & Rice Mill Parts
  {
    id: 'mill-spare-parts',
    catalogName: 'MILL SPARE PARTS',
    title: 'Spinning, Weaving, Processing & Rice Mill Spare Parts',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=900',
    category: 'Gears, Pulleys & Mill Parts',
    categoryIcon: Cog,
    badge: 'Mill Spare Parts',
    tagline: 'Custom mechanical components, shafts, rollers & transmission parts for textile & rice mills.',
    description: 'Spinning mills (blowroom, carding, ring frames), weaving looms (shuttleless, air jet, rapier), processing stenters aur modern rice mills ke critical mechanical spare parts fabricate karte hain. Precision machined rollers, shafts, drive couplings, brackets aur customized wear-resistant mill parts provide karte hain.',
    specs: [
      'Parts: Drive shafts, rollers, guide pins, bushes, flanges, couplings',
      'Machines: Ring frames, carding machines, looms, elevators, dehuskers',
      'Machining: Lathe turning, milling, surface grinding, broaching',
      'Material: Prime alloy steels, stainless steel, bronze & nylon polymers'
    ],
    weOfferText: 'Hum provide karte hain: Direct factory broken part replication, batch part manufacturing, metallurgical material consultation aur fast workshop delivery across Pakistan.'
  }
];

const CATEGORIES = [
  'All Products & Machinery',
  'Elevators & Lifts',
  'Cranes, Hoists & Conveyors',
  'Textile Trolleys & Warehouse Racks',
  'Industrial Piping & Pumps',
  'Fire Safety & Compliance',
  'Gears, Pulleys & Mill Parts',
];

const whyItems = [
  { icon: ShieldCheck, title: '100% Quality Guaranteed', desc: 'Pre-dispatch testing & dimensional checks' },
  { icon: Clock, title: '24/7 Technical Support', desc: 'Round-the-clock engineer assistance' },
  { icon: Star, title: 'Competitive Factory Rates', desc: 'Direct in-house manufacturer pricing' },
  { icon: HeadphonesIcon, title: 'Nationwide Service', desc: 'Installation & delivery across Pakistan' },
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('All Products & Machinery');

  const filteredServices = activeCategory === 'All Products & Machinery'
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
                {/* Product Image from High-Definition Industrial Catalog */}
                <div className="h-56 bg-slate-900 relative overflow-hidden border-b border-slate-200 dark:border-slate-700/70">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-black/20 pointer-events-none" />
                  <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                    <span className="px-2.5 py-1 text-[10px] font-black tracking-widest uppercase rounded bg-slate-950/85 backdrop-blur text-yellow-400 border border-yellow-500/40 shadow-sm">
                      {service.catalogName}
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
