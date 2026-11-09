import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, ArrowUp, Settings, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.25 }}
          onClick={scrollToTop}
          id="back-to-top"
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-blue-600 text-white shadow-lg hover:bg-blue-700 flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-200"
        >
          <ArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

const footerLinks = {
  quickLinks: [
    { label: 'Home', href: '#home' },
    { label: 'About Us', href: '#about' },
    { label: 'Our Services', href: '#services' },
    { label: 'Lift Estimator', href: '#estimator' },
    { label: 'Safety Standards', href: '#standards' },
    { label: 'Spare Parts', href: '#shop' },
    { label: 'FAQs', href: '#faq' },
    { label: 'Contact', href: '#contact' },
  ],
  services: [
    { label: 'Passenger & Home Lifts', href: '#services' },
    { label: 'Cargo & Beam Lifts', href: '#services' },
    { label: 'Panoramic Glass Lifts', href: '#about' },
    { label: 'Overhead Cranes', href: '#services' },
    { label: 'Conveyors', href: '#services' },
    { label: 'Spinning & Mill Parts', href: '#shop' },
  ],
};

const socials = [
  { label: 'Facebook', href: 'https://www.facebook.com/profile.php?id=100092909139765', color: 'hover:text-blue-500 hover:border-blue-500/50', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg> },
  { label: 'TikTok', href: 'https://www.tiktok.com/@a.mengineerings?is_from_webapp=1&sender_device=pc', color: 'hover:text-pink-400 hover:border-pink-400/50', icon: <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .59.05.86.15V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.96-4.52V8.92a8.28 8.28 0 0 0 4.81 1.52v-3.45a4.85 4.85 0 0 1-1-.3z"/></svg> },
  { label: 'Instagram', href: 'https://instagram.com/', color: 'hover:text-pink-500 hover:border-pink-500/50', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg> },
  { label: 'LinkedIn', href: 'https://linkedin.com/', color: 'hover:text-blue-600 hover:border-blue-600/50', icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></svg> },
];

const Footer = () => {
  const [email, setEmail] = useState('');
  const [newsletterSent, setNewsletterSent] = useState(false);

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email) {
      setNewsletterSent(true);
      setEmail('');
    }
  };

  return (
    <>
      <BackToTop />

      <footer className="bg-slate-900 text-slate-300 relative overflow-hidden transition-colors duration-300 border-t border-slate-800">
        {/* Subtle accent line */}
        <div className="h-1 bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-400" />

        {/* Newsletter Section */}
        <div className="relative border-b border-slate-800/80">
          <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
            <motion.div
              className="flex flex-col md:flex-row items-center justify-between gap-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <div>
                <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                  Stay Updated with A.M Engineering & Elevators
                </h3>
                <p className="text-slate-400 text-sm">Receive product catalog updates on passenger lifts, cargo elevators, and industrial components.</p>
              </div>
              {newsletterSent ? (
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-sm">
                  <div className="w-7 h-7 rounded-full bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center">
                    ✓
                  </div>
                  You're subscribed! Thank you.
                </div>
              ) : (
                <form onSubmit={handleNewsletter} className="flex w-full md:w-auto gap-2 max-w-md">
                  <input
                    type="email"
                    id="newsletter-email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    required
                    className="flex-1 bg-slate-800/90 border border-slate-700 focus:border-blue-500 rounded-xl px-4 py-2.5 text-white text-sm placeholder:text-slate-400 outline-none transition-all md:min-w-64"
                  />
                  <button
                    type="submit"
                    id="newsletter-subscribe"
                    className="px-5 py-2.5 font-semibold rounded-xl text-sm flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white transition-all duration-200 flex-shrink-0"
                  >
                    Subscribe
                    <Send size={14} />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>

        {/* Main Footer Grid */}
        <div className="max-w-7xl mx-auto px-4 md:px-8 pt-14 pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">

            {/* Brand & About */}
            <div className="lg:col-span-1">
              <a href="#home" className="flex items-center gap-2.5 mb-4 group">
                <img src="/logo.png" alt="A.M Engineering & Elevators Logo" className="w-8 h-8 rounded-full object-cover ring-1 ring-slate-700 group-hover:scale-105 transition-transform" />
                <span className="text-lg font-bold text-white tracking-tight">
                  A.M <span className="text-blue-400 font-medium">Engineering & Elevators</span>
                </span>
              </a>
              <p className="text-slate-400 mb-5 leading-relaxed text-sm">
                Specialists in Passenger, Cargo & Beam Lifts, Overhead Cranes, Conveyors, and Spinning, Weaving & Rice Mill Parts — serving industries nationwide.
              </p>
              <div className="flex space-x-2.5">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    className={`w-9 h-9 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-400 transition-all duration-200 ${s.color}`}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Quick Links</h4>
              <ul className="space-y-2.5">
                {footerLinks.quickLinks.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors flex-shrink-0" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Our Specialities</h4>
              <ul className="space-y-2.5">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-slate-400 hover:text-white text-sm transition-colors flex items-center gap-2 group"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover:bg-blue-400 transition-colors flex-shrink-0" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-semibold text-sm uppercase tracking-wider mb-4">Direct Contact</h4>
              <ul className="space-y-3.5">
                <li className="flex items-start gap-3 text-slate-400 text-sm">
                  <MapPin size={16} className="text-blue-400 mt-0.5 flex-shrink-0" />
                  <a
                    href="https://goo.gl/maps/tnQpavkiijQUSBTX7"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white transition-colors underline-offset-2 hover:underline"
                  >
                    Crescent Sugar Mill Road<br />Near Shakeel Park Qabristan<br />Faisalabad, Pakistan
                  </a>
                </li>
                <li className="flex items-center gap-3 text-slate-400 text-sm">
                  <Phone size={16} className="text-blue-400 flex-shrink-0" />
                  <div className="flex flex-col gap-0.5">
                    <a href="https://wa.me/923064854418" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Noor Ahmed: 0306-485 4418</a>
                    <a href="tel:+923206579307" className="hover:text-white transition-colors">M. Naseer: 0320-657 9307</a>
                  </div>
                </li>
                <li className="flex items-center gap-3 text-slate-400 text-sm">
                  <Mail size={16} className="text-blue-400 flex-shrink-0" />
                  <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ameng307@gmail.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">ameng307@gmail.com</a>
                </li>
              </ul>

              {/* Working Hours Badge */}
              <div className="mt-4 px-3 py-2 bg-slate-800/80 border border-slate-700/80 rounded-xl flex items-center gap-2.5">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse flex-shrink-0" />
                <div>
                  <div className="text-white text-xs font-medium">Workshop Open</div>
                  <div className="text-slate-400 text-[10px]">Mon – Sat: 8:00 AM – 6:00 PM</div>
                </div>
              </div>
            </div>

          </div>

          <div className="border-t border-slate-800/80 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-sm">
              © {new Date().getFullYear()} A.M Engineering & Elevators. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-xs text-slate-500">
              <a href="#about" className="hover:text-slate-300 transition-colors">About Us</a>
              <span>•</span>
              <a href="#services" className="hover:text-slate-300 transition-colors">Elevator Solutions</a>
              <span>•</span>
              <a href="#contact" className="hover:text-slate-300 transition-colors">Get a Quote</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
