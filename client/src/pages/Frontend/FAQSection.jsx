import React, { useState } from 'react';
import { ChevronDown, HelpCircle, PhoneCall, MessageCircle, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    q: "How much does a passenger or home elevator cost in Pakistan?",
    a: "Elevator pricing depends on the number of stops/floors, payload capacity (4 to 16 persons), cabin interior finish (Hairline stainless steel vs Gold titanium vs Panoramic glass), and drive technology (Gearless PMSM vs Hydraulic). Because A.M Engineering & Elevators manufactures structural frames and components directly in our Faisalabad workshop while integrating certified safety parts, our pricing is cost-effective and highly competitive compared to fully imported foreign units without compromising on engineering precision. Contact us for an exact itemized quotation tailored to your site.",
  },
  {
    q: "What happens to the elevator during sudden WAPDA power cuts or load shedding?",
    a: "All A.M elevators come equipped with an Automatic Rescue Device (ARD) powered by emergency battery banks. In the event of a power outage, the ARD activates within seconds, smoothly navigates the elevator car to the nearest landing floor, and automatically opens the doors to allow passengers to exit safely.",
  },
  {
    q: "How long does manufacturing, site fabrication, and lift installation take?",
    a: "A standard 2 to 5 floor passenger or cargo lift is typically fabricated in our workshop within 2 to 3 weeks. On-site shaft rail alignment, motor hoisting, electrical wiring, and safety stress testing take approximately 7 to 14 working days. Turnkey commissioning is completed with full load testing and handover certification.",
  },
  {
    q: "Can your industrial cargo lifts handle heavy forklifts, pallet trucks, and machinery?",
    a: "Yes. Our heavy industrial cargo and goods freight elevators are engineered with heavy-gauge structural channel steel frames, anti-slip checkered diamond flooring, and heavy-duty vertical bi-parting doors. We engineer cargo lifts with payload capacities ranging from 1,000 kg up to 5,000 kg, tailored for textile mills, rice mills, factories, and commercial warehouses.",
  },
  {
    q: "Can you install an elevator in an existing home or building without an existing concrete shaft?",
    a: "Absolutely. For existing villas, duplexes, or commercial buildings without a pre-constructed concrete shaft, we fabricate self-supporting structural steel glass towers. These can be installed either inside an open stairwell atrium or attached externally on the exterior facade of the building.",
  },
  {
    q: "Do you provide 24/7 emergency lift breakdown repair and annual maintenance (AMC)?",
    a: "Yes. Our engineering support is open 24 hours a day, 7 days a week (including Sundays — no off day). Our certified elevator technicians and mechanical engineers respond rapidly to breakdown calls across Faisalabad, Lahore, and adjacent industrial hubs. We also provide Annual Maintenance Contracts (AMC) covering regular safety audits, lubrication, cable inspections, and motor servicing.",
  },
  {
    q: "What warranty coverage is included with A.M Engineering elevator installations?",
    a: "Every new elevator installation includes a comprehensive 1-Year Full Warranty covering mechanical components, motor drive, electrical control board, and safety gears, backed by scheduled monthly maintenance visits during the warranty period.",
  },
  {
    q: "In which cities across Pakistan do you supply, install, and service elevators?",
    a: "Our head workshop and manufacturing facility is located in Faisalabad, Punjab, but our engineering installation teams operate nationwide — successfully commissioning elevator and crane projects in Faisalabad, Lahore, Islamabad, Rawalpindi, Karachi, Multan, Gujranwala, Sialkot, Sheikhupura, and surrounding districts.",
  },
];

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  // Google FAQPage Schema definition
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((f) => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": f.a,
      },
    })),
  };

  return (
    <section id="faq" className="py-20 md:py-24 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 transition-colors duration-300">
      {/* Inject Google FAQPage Schema for Rich Snippets */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8">
        
        {/* Header */}
        <div className="text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold mb-3 uppercase tracking-widest bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            <HelpCircle size={14} />
            <span>Got Questions? We Have Answers</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Frequently Asked Questions
          </h2>
          <p className="text-slate-600 dark:text-slate-400 text-base sm:text-lg">
            Everything you need to know about elevator manufacturing, pricing, safety standards, installation timelines, and technical support in Pakistan.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3.5 mb-14">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-slate-50 dark:bg-slate-800/80 border-blue-500/50 dark:border-blue-500/50 shadow-md'
                    : 'bg-white dark:bg-slate-800/40 border-slate-200 dark:border-slate-700/70 hover:border-slate-300 dark:hover:border-slate-600'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  className="w-full text-left py-4.5 px-5 sm:px-6 flex items-center justify-between gap-4 font-bold text-slate-900 dark:text-white text-base sm:text-lg"
                  style={{ fontFamily: 'Outfit, sans-serif' }}
                  aria-expanded={isOpen}
                >
                  <span className="leading-snug">{faq.q}</span>
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-transform duration-200 ${
                      isOpen
                        ? 'bg-blue-600 text-white rotate-180'
                        : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    <ChevronDown size={18} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: 'easeOut' }}
                    >
                      <div className="px-5 sm:px-6 pb-5 pt-1 text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed border-t border-slate-200/50 dark:border-slate-700/50">
                        {faq.a}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

        {/* Quick Consultation Callout */}
        <div className="bg-slate-100 dark:bg-slate-800/60 rounded-2xl p-6 sm:p-7 border border-slate-200 dark:border-slate-700 text-center">
          <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white mb-2" style={{ fontFamily: 'Outfit, sans-serif' }}>
            Have a Specific Question About Your Building or Factory?
          </h3>
          <p className="text-slate-600 dark:text-slate-400 text-sm mb-5 max-w-lg mx-auto">
            Our Senior Partners M. Naseer and Noor Ahmed are available for direct engineering consultation and free site visits.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/923064854418"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold uppercase tracking-wider transition-all shadow-sm"
            >
              <MessageCircle size={15} />
              <span>Ask on WhatsApp (0306-485 4418)</span>
            </a>
            <a
              href="tel:+923206579307"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 text-slate-900 dark:text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              <PhoneCall size={15} className="text-blue-600 dark:text-blue-400" />
              <span>Call M. Naseer (0320-657 9307)</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default FAQSection;

