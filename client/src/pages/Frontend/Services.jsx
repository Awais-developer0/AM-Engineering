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
  Phone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import LiftCategoriesTable from './LiftCategoriesTable';

// ── 1. Complete Lift Systems (Primary Core Focus) ──
const LIFT_SERVICES = [
  // 1. Passenger Elevator
  {
    id: 'passenger-elevator',
    catalogName: 'PASSENGER ELEVATOR',
    title: 'High-Speed Commercial Passenger Elevator',
    image: '/services/passenger-elevator-hd.jpg',
    category: 'Commercial & Residential Lifts',
    categoryIcon: Building2,
    badge: 'Commercial & Plaza',
    tagline: 'Ultra-smooth, energy-efficient automated passenger lifts for commercial plazas and high-rises.',
    description: 'Precision-engineered commercial passenger elevators manufactured for shopping plazas, corporate towers, residential complexes, and healthcare institutions. Equipped with high-efficiency gearless VVVF PMSM traction motors, microprocessor supervisory group controllers, optical full-height door sensors, and premium architectural hairline stainless steel cabin finishes.',
    specs: [
      'Travel Speed: 1.0 m/s – 2.0 m/s with variable frequency drive',
      'Cabin Styling: Brushed SS-304 hairline finish with LED ambient ceiling',
      'Safety Compliance: ARD Automatic Rescue Device preventing power-loss trapping',
      'Control System: Microprocessor dispatching with full-height infrared door curtains'
    ],
    scope: 'Shaft survey, machine-room-less (MRL) engineering, cabin interior customization, certified electrical installation, and 24/7 maintenance support.'
  },

  // 2. Heavy Industrial Loading & Cargo Elevator
  {
    id: 'loading-elevator',
    catalogName: 'LOADING ELEVATOR',
    title: 'Heavy Industrial Cargo & Freight Elevator',
    image: '/services/loading-elevator-hd.jpg',
    category: 'Industrial Freight Lifts',
    categoryIcon: Building2,
    badge: 'Heavy Industrial',
    tagline: 'High-payload vertical goods hoists engineered for heavy factory and warehouse transport.',
    description: 'We design, manufacture, and erect heavy-duty industrial loading elevators and goods hoists built for manufacturing plants, spinning mills, processing facilities, and logistics centers. Engineered with heavy reinforced structural steel guide masts, hydraulic cylinder rams or wire-rope traction machines, and heavy-gauge protective mesh enclosures for safe multi-floor cargo transit.',
    specs: [
      'Payload Capacity: 1,000 kg – 5,000+ kg custom ratings',
      'Drive Mechanism: Heavy-duty hydraulic ram or wire-rope traction',
      'Platform Deck: Non-skid chequered steel plate with forklift bumper rails',
      'Safety Systems: Instant hydraulic rupture lock & electromechanical limit stops'
    ],
    scope: 'Custom platform sizing, structural shaft tower fabrication, automatic bi-parting shutter assembly, on-site load testing, and turnkey commissioning.'
  },

  // 3. Luxury Home & Villa Lifts
  {
    id: 'home-lifts',
    catalogName: 'HOME LIFTS',
    title: 'Architectural Luxury Home & Villa Elevator',
    image: '/services/home-lifts-hd.jpg',
    category: 'Residential Luxury Lifts',
    categoryIcon: Building2,
    badge: 'Residential Luxury',
    tagline: 'Whisper-quiet hydraulic and traction residential lifts requiring zero civil pit excavation.',
    description: 'Tailored luxury home elevators engineered specifically for modern private residences, duplexes, and villas. Operating on standard single-phase 220V power, our residential lifts eliminate the need for concrete machine rooms or deep pit digging, integrating seamlessly into existing interior architectural stairwells.',
    specs: [
      'Passenger Rating: 4 to 6 Persons (320 kg – 450 kg)',
      'Electrical Standard: Single-Phase 220V residential power supply',
      'Cabin Aesthetics: Panoramic safety glass walls & bespoke wood laminates',
      'Emergency Backup: Automatic battery-powered descent and emergency door release'
    ],
    scope: 'Residential architectural consultation, panoramic glass shaft erection, silent hydraulic power pack installation, and annual preventive servicing.'
  },

  // 4. Industrial Hydraulic Lifts
  {
    id: 'hydraulic-lifts',
    catalogName: 'HYDRAULIC LIFTS',
    title: 'Heavy Industrial & Commercial Hydraulic Lift',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=900',
    category: 'Hydraulic Elevator Systems',
    categoryIcon: Factory,
    badge: 'Direct Hydraulic Ram',
    tagline: 'Smooth hydraulic power packs engineered for maximum lifting power, stability, and low civil cost.',
    description: 'Precision hydraulic lift systems designed for both heavy industrial goods transit and low-rise passenger applications. Powered by high-pressure Italian hydraulic pump units and rupture-safe cylinder rams, these lifts eliminate overhead machine rooms and operate safely on single or dual cylinder configurations.',
    specs: [
      'Drive System: High-pressure precision hydraulic ram with proportional soft-stop valves',
      'Civil Advantage: Zero overhead machine room required; low pit depth adaptable',
      'Rupture Safety: Velocity fuse valves lock cylinder instantly if fluid pressure drops',
      'Emergency Operation: Battery manual lowering valve returns cabin safely to ground'
    ],
    scope: 'Hydraulic cylinder machining, pump station integration, guide rail installation, and rigorous full-load pressure testing.'
  },

  // 5. Panoramic Glass & Capsule Lifts
  {
    id: 'panoramic-glass-lifts',
    catalogName: 'GLASS CAPSULE LIFTS',
    title: 'Architectural Panoramic Glass Capsule Elevator',
    image: 'https://images.unsplash.com/photo-1532382027701-7880cbd72789?auto=format&fit=crop&q=80&w=900',
    category: 'Panoramic Glass Lifts',
    categoryIcon: Building2,
    badge: 'Panoramic Glass',
    tagline: '360° observation glass elevators adding architectural elegance to malls and luxury buildings.',
    description: 'Custom round, square, and polygon observation glass elevators fabricated with laminated safety glass and architectural stainless steel framework. Designed as a visual centerpiece for shopping malls, luxury hotels, corporate headquarters, and upscale residences across Pakistan.',
    specs: [
      'Glass Material: 10+10 mm curved or flat laminated structural safety glass',
      'Cabin Frame: Stainless steel SS-304 hairline or gold titanium mirror finish',
      'Drive Mechanism: Ultra-quiet gearless PMSM or whisper hydraulic system',
      'Interior Ambiance: Concealed LED downlighting and custom touch panel controls'
    ],
    scope: 'Architectural shaft coordination, glass fabrication and tempered certification, stainless steel cladding, and turnkey commissioning.'
  },

  // 6. Guided Beam Goods Lift
  {
    id: 'beam-lifts',
    catalogName: 'BEAM LIFTS',
    title: 'Guided Cantilever Beam Goods Lift',
    image: '/services/beam-lifts-hd.jpg',
    category: 'Mezzanine Hoist Systems',
    categoryIcon: Factory,
    badge: 'Mezzanine Hoist',
    tagline: 'Self-supporting steel cantilever beam hoists for warehouse mezzanines and storage lofts.',
    description: 'Heavy-duty single and double mast guided beam cantilever lifts designed to transport heavy pallets, yarn crates, and machinery parts between ground levels and mezzanine platforms. Requiring no dedicated civil concrete shaft, this self-supporting steel beam system mounts directly against existing floors.',
    specs: [
      'Load Capacity: 500 kg to 3,000 kg custom configurations',
      'Mast Construction: Prime structural I-beam columns with hardened guide rollers',
      'Civil Requirements: Zero overhead headroom requirement and surface ramp installation',
      'Safety Protocols: Mechanical anti-fall arrestors and interlocking landing gates'
    ],
    scope: 'Mezzanine dimensional survey, cantilever carriage welding, hydraulic cylinder assembly, interlock safety wiring, and proof load verification.'
  },
];

// ── 2. Industrial Machinery, Cranes, Conveyors & Mill Parts (Secondary Engineering Products) ──
const INDUSTRIAL_SERVICES = [

  // 5. Overhead Crane
  {
    id: 'overhead-crane',
    catalogName: 'OVERHEAD CRANE',
    title: 'Industrial Overhead Traveling Bridge Crane (EOT)',
    image: '/services/overhead-crane-hd.jpg',
    category: 'Cranes, Hoists & Conveyors',
    categoryIcon: Factory,
    badge: 'Heavy Factory Lifting',
    tagline: 'Single and double girder EOT bridge cranes engineered for factory manufacturing bays.',
    description: 'Heavy-duty Electric Overhead Traveling (EOT) bridge cranes and gantry cranes fabricated for metal fabrication plants, textile spinning facilities, steel mills, and heavy engineering workshops. Built to handle massive machinery components, dies, and raw coils with smooth multidirectional movement across building spans.',
    specs: [
      'Bridge Span: 10 meters to 35+ meters custom bay configurations',
      'Crane Types: Single Girder, Double Girder, and Semi-Gantry structures',
      'Motion Control: Dual-speed inverter drives for smooth acceleration and deceleration',
      'Runway Tracks: Heavy runway I-beam girders and motorized end-carriage assemblies'
    ],
    scope: 'Structural girder engineering, runway beam laser alignment, load deflection stress testing, wireless remote integration, and annual safety audits.'
  },

  // 6. Hoist Wench
  {
    id: 'hoist-wench',
    catalogName: 'WENCH (HOIST WENCH)',
    title: 'Electric Motorized Wire Rope Crane Hoist Winch',
    image: '/services/hoist-wench-hd.jpg',
    category: 'Cranes, Hoists & Conveyors',
    categoryIcon: Factory,
    badge: 'Precision Lifting',
    tagline: 'Heavy-duty motorized wire-rope winches with fail-safe electromagnetic disc brakes.',
    description: 'Motorized electric wire-rope hoist winches engineered for overhead bridge cranes, monorail I-beams, and heavy industrial hoisting frames. Built with high-torque copper-wound motors and precision-machined oil-bath gearboxes to ensure smooth, vertical lifting with zero slipping.',
    specs: [
      'Rated Lifting Capacity: 1 Ton to 20+ Ton heavy ratings',
      'Wire Rope: High-tensile galvanized anti-twist steel aircraft cable',
      'Brake Mechanism: Automated electromagnetic disc/shoe fail-safe brake',
      'Operator Controls: Industrial wireless radio remote & pendant push-button station'
    ],
    scope: 'Precision rope drum grooving, forged steel hook block assembly, electronic overload limiter calibration, and direct replacement parts.'
  },

  // 7. Loading Conveyors
  {
    id: 'loading-conveyors',
    catalogName: 'LOADING CONVEYORS',
    title: 'Mobile Inclined Truck Loading & Unloading Conveyor',
    image: '/services/loading-conveyors-hd.jpg',
    category: 'Cranes, Hoists & Conveyors',
    categoryIcon: Factory,
    badge: 'Bulk Material Handling',
    tagline: 'Mobile height-adjustable belt conveyor lines for rapid vehicle and container loading.',
    description: 'Heavy-duty mobile inclined belt conveyors engineered for warehouses, rice processing mills, packaging plants, and logistics hubs. Designed to eliminate manual labor fatigue, these conveyors quickly move bulk bags, cartons, and material sacks directly from floor levels into truck beds and shipping containers.',
    specs: [
      'Conveyor Belt: High-friction heavy-duty chevron rubber or PVC vulcanized belt',
      'Yard Mobility: Heavy-duty swivel castor wheels with industrial directional locks',
      'Incline Adjustment: Integrated hydraulic pump or manual winch elevation system',
      'Motor Transmission: High-torque reduction geared motor with forward/reverse switching'
    ],
    scope: 'Custom chassis length and belt width fabrication, electrical starter panel integration, telescopic boom extensions, and spare roller supply.'
  },

  // 8. Cloth Trolley
  {
    id: 'cloth-trolley',
    catalogName: 'CLOTH TROLLEY',
    title: 'Textile Fabric Transport Deep Box Trolley',
    image: '/services/cloth-trolley-hd.png',
    category: 'Textile Trolleys & Storage Systems',
    categoryIcon: Truck,
    badge: 'Textile Processing',
    tagline: 'Snag-free heavy tubular steel fabric carts for spinning, weaving, and dyeing mills.',
    description: 'Specialized material handling deep-box cloth trolleys fabricated for textile spinning, weaving, bleaching, dyeing, and garment manufacturing plants. Built from high-strength tubular steel frames and mirror-smooth interior sheets to prevent delicate fabrics from snagging, tearing, or staining during departmental transit.',
    specs: [
      'Chassis & Body: Heavy-gauge tubular steel framework with polished seamless interior',
      'Wheel Assembly: Heavy-duty Polyurethane (PU) smooth-rolling castor wheels',
      'Corner Protection: Smooth rounded edges with heavy industrial rubber bumpers',
      'Protective Coating: Chemical-resistant industrial anti-rust epoxy powder coat'
    ],
    scope: 'Mill-specific dimension tailoring, reinforced floor bottom plates, high-load caster wheel upgrades, and bulk factory consignment supply.'
  },

  // 9. Batching Trolley
  {
    id: 'batching-trolley',
    catalogName: 'BATCHING TROLLEY',
    title: 'Heavy Triangular A-Frame Batching Trolley',
    image: '/services/batching-trolley-hd.png',
    category: 'Textile Trolleys & Storage Systems',
    categoryIcon: Truck,
    badge: 'Fabric Beam Transit',
    tagline: 'Precision A-frame roll transport carriages for large textile fabric batches and beams.',
    description: 'Heavy-duty A-frame batching trolleys engineered for continuous dyeing plants, stenter winders, and modern weaving units to support and transport jumbo fabric rolls. The rigid triangular geometry guarantees optimal center-of-gravity balance, preventing roll deformation and ensuring smooth unrolling at machine feed stations.',
    specs: [
      'Structural Frame: Heavy structural steel channel triangular A-frame architecture',
      'Roll Bearings: Precision pillow-block bearings for effortless shaft rotation',
      'Tow Capability: Integrated forklift hitch and electric tugger tow bracket',
      'Capacity: Sized for extra-large diameter jumbo industrial textile batch rolls'
    ],
    scope: 'Winding machine shaft matching, center-of-gravity balance certification, brake-equipped castor assemblies, and heavy beam cradle holders.'
  },

  // 10. Roll Trolley (Multi-Tier)
  {
    id: 'roll-trolley-multi-tier',
    catalogName: 'ROLL TROLLEY (MULTI-TIER)',
    title: 'Multi-Tier Pipe Frame Fabric Roll Storage Trolley',
    image: '/services/roll-trolley-tier-hd.jpg',
    category: 'Textile Trolleys & Storage Systems',
    categoryIcon: Truck,
    badge: 'Multi-Roll Storage',
    tagline: 'Horizontal multi-tier pipe frame racks for high-density fabric roll transit and staging.',
    description: 'High-density multi-tier fabric roll trolleys fabricated for textile processing departments, quality inspection rooms, and cutting units. Individual horizontal tubular support pipes keep finished fabric rolls separated, preventing pressure flattening and enabling simultaneous transport of dozens of rolls across the production floor.',
    specs: [
      'Storage Tiering: 2 to 4 horizontal tiers with custom vertical roll spacing',
      'Support Members: High-polish round hollow seamless steel tubular rails',
      'Holding Capacity: Engineered to hold 8 to 24 finished fabric rolls simultaneously',
      'Floor Mobility: 4-wheel swivel castor steering with dual foot-brake locking'
    ],
    scope: 'Roll diameter gap customization, structural pipe weld inspection, scratch-resistant powder coating, and warehouse aisle maneuverability setup.'
  },

  // 11. Roll Trolley (Enclosed Cage)
  {
    id: 'roll-trolley-cage',
    catalogName: 'ROLL TROLLEY (CAGE)',
    title: 'Enclosed Wire-Mesh Fabric Roll Safety Cage Cart',
    image: '/services/roll-trolley-cage-hd.png',
    category: 'Textile Trolleys & Storage Systems',
    categoryIcon: Truck,
    badge: 'Protective Cage',
    tagline: 'Heavy structural wire-mesh enclosed carts preventing fabric rolls from dropping and damage.',
    description: 'Heavy protective wire-mesh cage trolleys fabricated for textile storage yards and commercial warehouses. Designed to securely move valuable fabric rolls, cartons, and yarn spools without risk of materials falling out during transit, featuring a folding front drop-down gate for rapid loading and unloading.',
    specs: [
      'Enclosure Walls: Heavy-gauge welded steel wire-mesh with reinforced angle iron frame',
      'Front Access Gate: Drop-down half-gate mechanism equipped with security latch',
      'Base Construction: Solid sheet-metal deck supported by structural cross braces',
      'Heavy-Duty Castors: High-load industrial roller bearing wheels with directional locks'
    ],
    scope: 'Custom enclosure dimensions, lockable security latching, fold-down side gate fabrication, and corrosion-resistant industrial epoxy finishing.'
  },

  // 12. Folding Rack
  {
    id: 'folding-rack',
    catalogName: 'FOLDING RACK',
    title: 'Heavy Folding Pallet Racks & Industrial Stackers',
    image: '/services/folding-rack-hd.jpg',
    category: 'Textile Trolleys & Storage Systems',
    categoryIcon: Layers,
    badge: 'Warehouse Stacking',
    tagline: 'Modular heavy-gauge collapsible steel storage racks and inventory stackers.',
    description: 'Heavy structural steel folding racks and pallet stacking systems fabricated for factory warehouses, material godowns, and distribution depots. These modular space-saving racks stack up to four levels high when loaded, and collapse completely flat when empty to recover over 80% of floor space.',
    specs: [
      'Raw Materials: Prime structural channel steel and heavy angle iron members',
      'Load Capacity: 500 kg to 2,500 kg per tier certified capacity',
      'Collapsible Design: Boltless interlocking heavy-pin locking mechanism',
      'Stacking Rating: Up to 4 tiers vertical forklift stacking capability'
    ],
    scope: 'Warehouse layout space optimization, custom pallet footprint design, heavy base plate anchoring, and anti-corrosion primer coating.'
  },

  // 13. Boiler Pipe Lines
  {
    id: 'boiler-pipe-lines',
    catalogName: 'BOILER PIPE LINES',
    title: 'High-Pressure Steam Boiler Piping & Manifolds',
    image: '/services/boiler-pipe-lines-hd.jpg',
    category: 'Industrial Piping & Pumping Systems',
    categoryIcon: Flame,
    badge: 'Steam Engineering',
    tagline: 'Certified high-pressure steam distribution pipelines, thermal oil loops, and headers.',
    description: 'High-pressure certified steam piping networks, thermal oil distribution circuits, and condensate recovery lines fabricated for textile processing plants, chemical factories, and food processing facilities. Includes certified pressure welding, flanged headers, expansion loops, and high-efficiency rockwool thermal lagging insulation.',
    specs: [
      'Piping Specification: Seamless Schedule 40 & Schedule 80 carbon steel piping',
      'Pipe Joints: Certified butt-welded fittings & high-pressure forged steel flanges',
      'Flow Control Valves: Steam globe valves, thermodynamic steam traps & safety relief valves',
      'Quality Testing: 100% hydrostatic pressure testing to certified industrial safety bars'
    ],
    scope: 'Turnkey pipeline routing engineering, boiler header manifold fabrication, rockwool thermal cladding insulation, and safety pressure testing certification.'
  },

  // 14. Mono Block Pump
  {
    id: 'mono-block-pump',
    catalogName: 'MONO BLOCK PUMP',
    title: 'Industrial Heavy Centrifugal Mono Block Pump',
    image: '/services/mono-block-pump-hd.jpg',
    category: 'Industrial Piping & Pumping Systems',
    categoryIcon: Factory,
    badge: 'Fluid Dynamics',
    tagline: 'Heavy cast-iron centrifugal pumping units for continuous factory fluid circulation.',
    description: 'Heavy-duty monoblock centrifugal pumps and industrial fluid handling pumping sets engineered for manufacturing plants, water supply networks, cooling towers, and industrial effluent transfer. Powered by high-efficiency copper-wound motors and dynamically balanced impellers built for non-stop 24/7 industrial duty.',
    specs: [
      'Pump Casing: Heavy-duty graded cast iron casing with flanged ports',
      'Impeller Material: Precision dynamically balanced bronze or stainless steel',
      'Electric Motor: Totally Enclosed Fan Cooled (TEFC) high-efficiency copper motor',
      'Shaft Seal: Wear-resistant industrial mechanical seal ensuring zero fluid leakage'
    ],
    scope: 'Head pressure and discharge flow calculation, concrete foundation mounting, suction/delivery manifold piping, and electrical starter panel wiring.'
  },

  // 15. Emergency Exit Stairs
  {
    id: 'emergency-exit-stairs',
    catalogName: 'EMERGENCY EXIT STAIRS',
    title: 'External Structural Steel Fire Escape Staircase',
    image: '/services/emergency-exit-stairs-hd.jpg',
    category: 'Life Safety & Fire Compliance',
    categoryIcon: ShieldCheck,
    badge: 'Life Safety Code',
    tagline: 'Exterior multi-tier structural steel fire escape towers for commercial and industrial plazas.',
    description: 'Heavy structural steel exterior fire escape staircase towers designed and fabricated for multi-story textile mills, industrial factories, and commercial plaza buildings. Built with serrated anti-slip galvanized steel grating treads, double safety handrails, and rigid platform landings to ensure rapid, secure evacuation during building emergencies.',
    specs: [
      'Support Columns: Heavy structural steel channel beams and box columns',
      'Tread Design: Hot-dip galvanized serrated anti-slip open safety grating',
      'Safety Railings: Dual-height perimeter safety handrails with kickplate protection',
      'Code Compliance: Built to Civil Defense, Labor Department, and building safety standards'
    ],
    scope: 'Site structural elevation survey, certified civil foundation anchoring, multi-coat weatherproofing finish, and turnkey on-site erection.'
  },

  // 16. Emergency Exit Doors
  {
    id: 'emergency-exit-doors',
    catalogName: 'EMERGENCY EXIT DOORS',
    title: 'Fire-Rated Steel Emergency Panic Exit Doors',
    image: '/services/emergency-exit-doors-hd.jpg',
    category: 'Life Safety & Fire Compliance',
    categoryIcon: ShieldCheck,
    badge: 'Building Compliance',
    tagline: 'Certified fire-resistant insulated steel emergency doors equipped with push-bar panic hardware.',
    description: 'Heavy insulated steel fire exit emergency doors fabricated for industrial factories, hospital wards, elevator lobbies, and commercial buildings. Equipped with certified horizontal panic crash push-bars that allow immediate, effortless single-push outward opening during smoke or emergency situations.',
    specs: [
      'Door Leaf: Double-skin insulated heavy-gauge steel door with rockwool core',
      'Panic Hardware: Heavy-duty horizontal panic crash exit push-bar',
      'Perimeter Seals: Intumescent smoke and heat expanding perimeter seals',
      'Protective Finish: High-visibility fire red or safety orange industrial powder coat'
    ],
    scope: 'Custom structural frame fabrication, automatic hydraulic door closer fitting, panic hardware installation, and building compliance sign-off.'
  },

  // 17. Fire Hydrant Pipe Lines
  {
    id: 'fire-hydrant-pipe-lines',
    catalogName: 'FIRE HYDRANT PIPE LINES',
    title: 'Factory Fire Hydrant Piping & Glass Hose Cabinets',
    image: '/services/fire-hydrant-pipe-lines-hd.jpg',
    category: 'Life Safety & Fire Compliance',
    categoryIcon: Flame,
    badge: 'Fire Infrastructure',
    tagline: 'Industrial fire fighting ring mains, landing valves, and wall-mounted hose reel cabinets.',
    description: 'Complete industrial fire fighting ring mains, overhead/underground fire hydrant piping systems, landing valves, and wall-mounted glass-door fire hose reel cabinets fabricated and installed for factories and commercial properties to maintain constant pressurized water for emergency firefighting.',
    specs: [
      'Pipeline Network: Heavy high-pressure seamless steel piping with bright red finish',
      'Hose Cabinet: Wall-mounted heavy steel cabinet box with tempered glass viewing panel',
      'Fire Hose: Reinforced synthetic rubber/canvas fire hose with adjustable brass spray nozzle',
      'Valving: Brass landing valves, check non-return valves & pressure boost Siamese connections'
    ],
    scope: 'Factory fire ring route mapping, pump booster connection, hose cabinet fabrication, and certified hydrostatic pressure flow testing.'
  },

  // 18. Gears
  {
    id: 'gears',
    catalogName: 'GEARS',
    title: 'Precision Machined Industrial Gears & Worm Drives',
    image: '/services/gears-hd.jpg',
    category: 'Mechanical Transmission & Mill Spares',
    categoryIcon: Cog,
    badge: 'CNC Gear Cutting',
    tagline: 'Custom gear cutting, spur, helical, bevel gears, worm drives, and transmission shafts.',
    description: 'Manufactured on modern CNC gear hobbers and shaping machines in our workshop. We cut high-precision spur, helical, bevel, and worm gear sets for textile machinery, elevator winch gearboxes, and industrial drives according to exact customer samples or engineering drawings.',
    specs: [
      'Gear Types: Spur, Helical, Spiral Bevel, Worm Wheels & Pinion Shafts',
      'Alloy Metallurgy: Forged alloy steels (EN-8, EN-24, 20MnCr5) & Phosphor Bronze',
      'Hardening: Case carburizing, induction tooth hardening & precision profile grinding',
      'Dimensional Accuracy: High tooth engagement accuracy for quiet, vibration-free operation'
    ],
    scope: 'Sample-based reverse engineering, precision tooth cutting, custom shaft keyway broaching, and emergency broken gear duplication.'
  },

  // 19. V Pulley
  {
    id: 'v-pulley',
    catalogName: 'V PULLEY',
    title: 'Industrial Multi-Groove V-Belt Pulleys & Sheaves',
    image: '/services/v-pulley-hd.jpg',
    category: 'Mechanical Transmission & Mill Spares',
    categoryIcon: Cog,
    badge: 'Dynamic Balancing',
    tagline: 'Heavy cast-iron multi-groove V-belt pulleys, elevator traction sheaves, and taper bushes.',
    description: 'Precision-machined from high-grade close-grained cast iron and steel. We produce dynamically balanced multi-groove V-belt pulleys and elevator traction drive sheaves for textile mills, air compressors, flour mills, and heavy equipment to completely eliminate high-RPM machine vibrations.',
    specs: [
      'Groove Profiles: Single to 12-groove industrial belt sections (A, B, C, D, SPA, SPB)',
      'Traction Sheaves: Multi-rope hardened elevator traction drive sheaves',
      'Casting Grade: Graded high-tensile close-grained Cast Iron (CI) & Mild Steel',
      'Balancing Standard: Computerized dynamic balancing ensuring zero wobble at high RPM'
    ],
    scope: 'Custom diameter turning, taper-lock bushing fitting, keyway broaching, and elevator sheave regrooving services.'
  },

  // 20. Spinning, Weaving & Rice Mill Spare Parts
  {
    id: 'mill-spare-parts',
    catalogName: 'MILL SPARE PARTS',
    title: 'Spinning, Weaving, Processing & Rice Mill Spare Parts',
    image: '/services/mill-spare-parts-hd.jpg',
    category: 'Mechanical Transmission & Mill Spares',
    categoryIcon: Cog,
    badge: 'Mill Spare Parts',
    tagline: 'Precision machinery components, shafts, rollers, and mechanical spares for mills.',
    description: 'Custom fabrication of critical mechanical spare parts for spinning mills (blowrooms, carding machines, ring frames), weaving looms (shuttleless, air jet, rapier), fabric processing stenters, and modern rice milling plants. We deliver precision-ground rollers, drive shafts, couplings, and wear-resistant machinery components.',
    specs: [
      'Components: Heavy drive shafts, rubber/steel rollers, bushes, guide pins, flanges, couplings',
      'Supported Machinery: Ring frames, carding engines, high-speed looms, dehusking elevators',
      'Machining Precision: CNC lathe turning, surface grinding, milling, and broaching',
      'Materials: Prime engineering alloy steels, stainless steel, bronze, and industrial polymers'
    ],
    scope: 'Sample replication of damaged factory parts, batch manufacturing runs, metallurgical analysis, and fast dispatch across Pakistan.'
  }
];

const INDUSTRIAL_CATEGORIES = [
  'All Industrial Equipment',
  'Cranes, Hoists & Conveyors',
  'Textile Trolleys & Storage Systems',
  'Industrial Piping & Pumping Systems',
  'Life Safety & Fire Compliance',
  'Mechanical Transmission & Mill Spares',
];

const whyItems = [
  { icon: ShieldCheck, title: 'Certified Safety Compliance', desc: 'Strict ARD automatic rescue device & dual speed governor compliance' },
  { icon: Clock, title: '24/7 Service & Breakdown Repair', desc: 'Round-the-clock rapid response engineering and maintenance assistance' },
  { icon: Star, title: 'Direct Workshop Pricing', desc: 'In-house precision fabrication with cost-effective local engineering' },
  { icon: HeadphonesIcon, title: 'Nationwide Commissioning', desc: 'Certified delivery, erection & turnkey installation across Pakistan' },
];

const Services = () => {
  const [activeCategory, setActiveCategory] = useState('All Industrial Equipment');

  const filteredIndustrial = activeCategory === 'All Industrial Equipment'
    ? INDUSTRIAL_SERVICES
    : INDUSTRIAL_SERVICES.filter(s => s.category === activeCategory);

  return (
    <section id="services" className="py-20 md:py-24 bg-white dark:bg-slate-900 transition-colors duration-300 border-b border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* ═════════════════════════════════════════════════════════════════
            PRIMARY CORE SECTION: LIFTS & ELEVATOR SYSTEMS
        ═════════════════════════════════════════════════════════════════ */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 uppercase tracking-widest bg-blue-100 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800/80">
            <Building2 size={13} />
            <span>Primary Specialization: Vertical Transportation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            All Types of Lift Installation, Manufacturing &amp; Repair in Faisalabad
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg leading-relaxed">
            <strong className="text-slate-900 dark:text-white">A.M Engineering &amp; Elevators</strong> designs, manufactures, and installs <strong>every type of lift</strong> across Faisalabad, Lahore, and throughout Punjab — including commercial passenger elevators, heavy industrial cargo lifts, residential home lifts, hydraulic systems, panoramic glass lifts, and guided beam mezzanine hoists, supported by 24/7 maintenance and emergency breakdown repair.
          </p>
        </div>

        {/* Primary Lift Cards Grid (All 6 Lift Types) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {LIFT_SERVICES.map((service, index) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
              className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl overflow-hidden hover:border-blue-400 dark:hover:border-blue-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
            >
              {/* Lift Image */}
              <div className="h-64 bg-slate-100 dark:bg-slate-900/80 relative overflow-hidden border-b border-slate-200 dark:border-slate-700/70 flex items-center justify-center p-3">
                <img
                  src={service.image}
                  alt={`${service.title} - Lift installation in Faisalabad`}
                  className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                  loading="lazy"
                />
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                  <span className="px-2.5 py-1 text-[10px] font-black tracking-widest uppercase rounded bg-slate-950/85 backdrop-blur text-yellow-400 border border-yellow-500/40 shadow-sm">
                    {service.catalogName}
                  </span>
                  <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded bg-blue-600 text-white shadow-sm self-start">
                    {service.badge}
                  </span>
                </div>
              </div>

              {/* Lift Card Content */}
              <div className="p-6 flex-1 flex flex-col">
                <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                  {service.category}
                </span>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
                  {service.title}
                </h3>
                <p className="text-xs font-semibold text-slate-700 dark:text-slate-300 mb-2.5">
                  {service.tagline}
                </p>
                <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-xs sm:text-sm">
                  {service.description}
                </p>

                {/* Technical Specifications */}
                <div className="mb-4 pt-3 border-t border-slate-200/80 dark:border-slate-700/60">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                    Key Technical Specifications:
                  </span>
                  <ul className="space-y-1.5">
                    {service.specs.map((item, i) => (
                      <li key={i} className="flex items-start text-slate-700 dark:text-slate-300 text-xs gap-2">
                        <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Manufacturing & Scope Box */}
                <div className="p-3.5 rounded-xl bg-blue-50/80 dark:bg-blue-950/30 border border-blue-100 dark:border-blue-900/40 mb-5">
                  <p className="text-[11px] text-blue-900 dark:text-blue-200 leading-snug">
                    <strong className="text-blue-700 dark:text-blue-300 font-bold block mb-0.5">Manufacturing &amp; Engineering Scope:</strong>
                    {service.scope}
                  </p>
                </div>

                {/* Direct Quotation & Engineering Contact */}
                <div className="mt-auto pt-3 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                  <a
                    href={`https://wa.me/923064854418?text=Hello%20A.M%20Engineering,%20I%20am%20interested%20in%20quotation%20and%20technical%20specifications%20for%20${encodeURIComponent(service.title)}.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 group transition-all"
                  >
                    <span>Request Technical Quote</span>
                    <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                  </a>
                  <a
                    href="tel:+923064854418"
                    className="p-2 rounded-lg bg-slate-200/70 dark:bg-slate-700/60 hover:bg-emerald-600 hover:text-white text-slate-600 dark:text-slate-300 transition-colors"
                    title="Direct Call: Noor Ahmed (0306-4854418)"
                  >
                    <Phone size={14} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Technical Specs Comparison Matrix Component */}
        <LiftCategoriesTable />

        {/* ═════════════════════════════════════════════════════════════════
            SECONDARY DISTINCT SECTION: INDUSTRIAL MACHINERY & MILL PARTS
        ═════════════════════════════════════════════════════════════════ */}
        <div className="mt-24 pt-16 border-t-2 border-slate-200 dark:border-slate-800" id="industrial-machinery">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 uppercase tracking-widest bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-800/80">
              <Factory size={13} />
              <span>Secondary Workshop Fabrication &amp; Equipment</span>
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Industrial Machinery, Overhead Cranes, Conveyors &amp; Mill Parts
            </h2>
            <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
              In addition to our elevator systems, our Faisalabad workshop manufactures heavy overhead crane winches, industrial belt and roller conveyors, textile handling trolleys, steam boiler pipelines, centrifugal pumps, certified fire escape stairs and doors, and precision CNC gears.
            </p>
          </div>

          {/* Secondary Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
            {INDUSTRIAL_CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                    isActive
                      ? 'bg-amber-600 text-white shadow-md shadow-amber-600/25 scale-105'
                      : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/80 dark:hover:bg-slate-700/60'
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Secondary Products Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            <AnimatePresence mode="popLayout">
              {filteredIndustrial.map((service, index) => (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 rounded-2xl overflow-hidden hover:border-amber-400 dark:hover:border-amber-600 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group"
                >
                  {/* Product Image */}
                  <div className="h-64 bg-slate-100 dark:bg-slate-900/80 relative overflow-hidden border-b border-slate-200 dark:border-slate-700/70 flex items-center justify-center p-3">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="max-h-full max-w-full object-contain group-hover:scale-105 transition-transform duration-300 drop-shadow-md"
                      loading="lazy"
                    />
                    <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
                      <span className="px-2.5 py-1 text-[10px] font-black tracking-widest uppercase rounded bg-slate-950/85 backdrop-blur text-yellow-400 border border-yellow-500/40 shadow-sm">
                        {service.catalogName}
                      </span>
                      <span className="px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider rounded bg-amber-600 text-white shadow-sm self-start">
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
                    <p className="text-xs font-semibold text-amber-600 dark:text-amber-400 mb-2.5">
                      {service.tagline}
                    </p>
                    <p className="text-slate-600 dark:text-slate-400 mb-4 leading-relaxed text-xs sm:text-sm">
                      {service.description}
                    </p>

                    {/* Bullet Highlights / Technical Specs */}
                    <div className="mb-4 pt-3 border-t border-slate-200/80 dark:border-slate-700/60">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                        Key Technical Specifications:
                      </span>
                      <ul className="space-y-1.5">
                        {service.specs.map((item, i) => (
                          <li key={i} className="flex items-start text-slate-700 dark:text-slate-300 text-xs gap-2">
                            <CheckCircle2 size={13} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Manufacturing & Scope Box */}
                    <div className="p-3.5 rounded-xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-100 dark:border-amber-900/40 mb-5">
                      <p className="text-[11px] text-amber-900 dark:text-amber-200 leading-snug">
                        <strong className="text-amber-700 dark:text-amber-300 font-bold block mb-0.5">Manufacturing &amp; Engineering Scope:</strong>
                        {service.scope}
                      </p>
                    </div>

                    {/* Direct Quotation & Engineering Contact */}
                    <div className="mt-auto pt-3 border-t border-slate-200 dark:border-slate-700/60 flex items-center justify-between">
                      <a
                        href={`https://wa.me/923064854418?text=Hello%20A.M%20Engineering,%20I%20am%20interested%20in%20quotation%20and%20technical%20specifications%20for%20${encodeURIComponent(service.title)}.`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 font-bold text-xs uppercase tracking-wider text-amber-600 dark:text-amber-400 hover:text-amber-700 dark:hover:text-amber-300 group transition-all"
                      >
                        <span>Request Technical Quote</span>
                        <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                      </a>
                      <a
                        href="tel:+923064854418"
                        className="p-2 rounded-lg bg-slate-200/70 dark:bg-slate-700/60 hover:bg-amber-600 hover:text-white text-slate-600 dark:text-slate-300 transition-colors"
                        title="Direct Call: Noor Ahmed (0306-4854418)"
                      >
                        <Phone size={14} />
                      </a>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        {/* ═════════════════════════════════════════════════════════════════
            WHY CHOOSE A.M ENGINEERING
        ═════════════════════════════════════════════════════════════════ */}
        <div className="mt-20 pt-16 border-t border-slate-200 dark:border-slate-800">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-3" style={{ fontFamily: 'Outfit, sans-serif' }}>
              Why Industrial Clients Partner With A.M Engineering &amp; Elevators
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Direct workshop manufacturing, strict ARD safety compliance, and round-the-clock 24/7 technical field support across Pakistan.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {whyItems.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="p-6 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700/60 text-center hover:border-blue-500 dark:hover:border-blue-500 transition-all duration-300 group"
                >
                  <div className="w-12 h-12 rounded-xl bg-blue-100 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={24} />
                  </div>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white mb-2">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
