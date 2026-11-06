import React from 'react';
import { Phone, MapPin, Mail } from 'lucide-react';

const Topbar = () => {
  return (
    <div className="pointer-events-auto relative bg-slate-900 text-slate-300 transition-colors duration-300 overflow-hidden border-b border-slate-800">
      {/* Blue top accent line */}
      <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600" />

      <div className="py-2 px-4 md:px-8 flex flex-row justify-between items-center text-[10px] md:text-[11px] uppercase tracking-wider font-semibold">
        {/* Left: Contact Info */}
        <div className="flex items-center space-x-4 md:space-x-6">
          <a href="https://wa.me/923206579307" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors group" title="M. Naseer">
            <Phone size={13} className="text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">0320-657 9307</span>
          </a>
          <a href="https://wa.me/923064854418" target="_blank" rel="noopener noreferrer" className="flex items-center gap-1.5 hover:text-blue-400 transition-colors group" title="M. Naseer">
            <Phone size={13} className="text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">0306-4854418</span>
          </a>

          <a href="https://goo.gl/maps/tnQpavkiijQUSBTX7" target="_blank" rel="noreferrer" className="flex items-center gap-1.5 hover:text-white transition-colors group" title="Location">
            <MapPin size={13} className="text-blue-400 group-hover:scale-110 transition-transform" />
            <span className="hidden sm:inline">Crescent Sugar Mill Rd, Faisalabad</span>
          </a>
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=ameng307@gmail.com" target="_blank" rel="noopener noreferrer" className="hidden xl:flex items-center gap-1.5 hover:text-white transition-colors group" title="Email">
            <Mail size={13} className="text-blue-400 group-hover:scale-110" />
            <span>ameng307@gmail.com</span>
          </a>
        </div>

        {/* Right: WhatsApp CTA + Facebook */}
        <div className="flex items-center space-x-3">
          <a
            href="https://wa.me/923206579307"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-[10px] tracking-wider transition-all hover:scale-105 shadow-sm"
            title="WhatsApp Quick Contact"
          >
            <span>WhatsApp Us</span>
          </a>

          {/* Social Icons */}
          <div className="flex items-center space-x-2.5 pl-3 border-l border-slate-700">
            {/* Facebook */}
            <a
              href="https://www.facebook.com/profile.php?id=100092909139765"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-400 transition-colors"
              title="Facebook"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>

            {/* TikTok */}
            <a
              href="https://www.tiktok.com/@a.mengineerings?is_from_webapp=1&sender_device=pc"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
              title="TikTok (@a.mengineerings)"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64c.298 0 .59.05.86.15V9.4a6.33 6.33 0 0 0-1-.08A6.34 6.34 0 0 0 3 15.66a6.34 6.34 0 0 0 10.82 4.49 6.3 6.3 0 0 0 1.96-4.52V8.92a8.28 8.28 0 0 0 4.81 1.52v-3.45a4.85 4.85 0 0 1-1-.3z" />
              </svg>
            </a>

            {/* Instagram */}
            <a
              href="https://instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-pink-400 transition-colors"
              title="Instagram (Update link later)"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
