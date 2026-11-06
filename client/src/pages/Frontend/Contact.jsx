import React, { useState, useEffect } from 'react';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { useAuth } from '../../context/AuthContext';

const API_BASE = 'http://localhost:8000';

const FloatingInput = ({ id, label, type = 'text', required, value, onChange }) => {
  const [focused, setFocused] = useState(false);
  const filled = !!value;
  return (
    <div className="relative">
      <input
        id={id}
        type={type}
        placeholder=" "
        required={required}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full rounded-xl px-4 pt-6 pb-2.5 text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 transition-all duration-200 text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium ${(focused || filled) ? 'top-2 text-[10px] uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold' : 'top-4 text-sm text-slate-500 dark:text-slate-400'}`}
      >
        {label}
      </label>
    </div>
  );
};

const FloatingTextarea = ({ id, label, rows = 4, value, onChange }) => {
  const [focused, setFocused] = useState(false);
  const filled = !!value;
  return (
    <div className="relative">
      <textarea
        id={id}
        rows={rows}
        placeholder=" "
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className="peer w-full rounded-xl px-4 pt-6 pb-2.5 text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 transition-all duration-200 resize-none text-sm outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
      />
      <label
        htmlFor={id}
        className={`absolute left-4 transition-all duration-200 pointer-events-none font-medium ${(focused || filled) ? 'top-2 text-[10px] uppercase tracking-wider text-blue-600 dark:text-blue-400 font-semibold' : 'top-4 text-sm text-slate-500 dark:text-slate-400'}`}
      >
        {label}
      </label>
    </div>
  );
};

const contactItems = [
  { icon: MapPin, title: 'Workshop Address', content: 'Crescent Sugar Mill Road\nNear Shakeel Park Qabristan\nFaisalabad, Pakistan', href: 'https://goo.gl/maps/tnQpavkiijQUSBTX7' },
  { icon: Phone, title: 'Direct Partner Numbers', content: 'M. Naseer: +92 320 657 9307\nNoor Ahmed: +92 306 485 4418', href: 'https://wa.me/923206579307' },
  { icon: Mail, title: 'Email Address', content: 'ameng307@gmail.com', href: 'https://mail.google.com/mail/?view=cm&fs=1&to=ameng307@gmail.com' },
  { icon: Clock, title: 'Operating Hours', content: 'Mon – Sat: 8:00 AM – 6:00 PM\nSunday: Emergency Orders Only' },
];

const Contact = () => {
  const { user } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    document.title = "Contact Details & Location | A.M Engineering & Elevators";
  }, []);

  const [form, setForm] = useState({
    firstName: '', lastName: '', email: user?.email || '', phone: '', service: 'Passenger Lift Installation', message: ''
  });

  const set = (field) => (e) => setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!form.firstName || !form.email || !form.message) {
      setError('Name, email aur message required hain.');
      return;
    }
    setSubmitting(true);
    try {
      const token = localStorage.getItem('am_token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      await axios.post(`${API_BASE}/messages`, {
        name: `${form.firstName} ${form.lastName}`.trim(),
        email: form.email,
        phone: form.phone,
        service: form.service,
        message: form.message,
      }, { headers });
      setSubmitted(true);
    } catch (err) {
      setError(err.response?.data?.message || 'Message send nahi hua. Dobara try karein.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-50 dark:bg-slate-950 relative overflow-hidden transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        
        {/* Header */}
        <motion.div className="text-center mb-16" initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold mb-4 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
            Get In Touch
          </div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 dark:text-white mb-4 tracking-tight">
            Let's Discuss Your <span className="text-blue-600 dark:text-blue-400">Lift & Machinery Needs</span>
          </h2>
          <p className="text-base md:text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Whether you need passenger, cargo, or glass elevator installation, overhead cranes, conveyors, or spinning & rice mill parts — our partners are ready to assist.
          </p>
        </motion.div>

        {/* WhatsApp Quick Connect Banner */}
        <motion.a
          href="https://wa.me/923206579307"
          target="_blank"
          rel="noopener noreferrer"
          id="whatsapp-contact-banner"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex items-center justify-between gap-4 px-6 py-4 mb-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-all group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
            </div>
            <div>
              <div className="font-bold text-slate-900 dark:text-white text-sm">Quick Connect via WhatsApp</div>
              <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">M. Naseer: 0320-657 9307 · Noor Ahmed: 0306-485 4418</div>
            </div>
          </div>
          <ArrowRight size={18} className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
        </motion.a>

        <div className="grid lg:grid-cols-2 gap-10">
          
          {/* Left Column: Details & Map */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
            <div className="space-y-3.5 mb-8">
              {contactItems.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
                >
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-800/50">
                    <item.icon size={19} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white text-sm mb-0.5">{item.title}</h4>
                    {item.href ? (
                      <a href={item.href} target="_blank" rel="noreferrer" className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed whitespace-pre-line hover:text-blue-600 dark:hover:text-blue-400 transition-colors underline-offset-2 hover:underline">
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed whitespace-pre-line">{item.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Map Frame */}
            <div className="h-60 sm:h-72 rounded-2xl overflow-hidden relative shadow-sm border border-slate-200 dark:border-slate-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3403.0260434556867!2d73.12346987389706!3d31.468469749707474!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2291fd5066fb957b%3A0x6a476bbfa774cf87!2sA.M%20ENGINEERING!5e0!3m2!1sen!2s!4v1788465602375!5m2!1sen!2s"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="A.M Engineering & Elevators Map"
              />
            </div>

            {/* Facebook Link */}
            <motion.a
              href="https://www.facebook.com/profile.php?id=100092909139765"
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-4 flex items-center gap-3 p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm transition-all group hover:shadow-md"
            >
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0 text-white">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <div className="font-bold text-slate-900 dark:text-white text-sm">Official Facebook Page</div>
                <div className="text-slate-500 dark:text-slate-400 text-xs mt-0.5">A.M Engineering & Elevators</div>
              </div>
              <ArrowRight size={16} className="text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform flex-shrink-0" />
            </motion.a>
          </motion.div>

          {/* Right Column: Inquiry Form */}
          <motion.div
            className="p-8 md:p-10 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm relative"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center h-full py-16 text-center">
                <div className="w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">Message Sent Successfully!</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm">Our partners (M. Naseer & Noor Ahmed) will review your requirements and respond shortly.</p>
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setForm({ firstName: '', lastName: '', email: user?.email || '', phone: '', service: 'Passenger Lift Installation', message: '' });
                  }}
                  className="mt-6 font-semibold text-sm text-blue-600 dark:text-blue-400 hover:underline"
                >
                  Send another inquiry
                </button>
              </motion.div>
            ) : (
              <>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                  Send an Inquiry
                </h3>
                <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
                  Fill out the form below and we will get back to you with specs and a quotation.
                </p>

                {error && (
                  <div className="mb-5 px-4 py-3 rounded-xl text-sm bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 text-red-600 dark:text-red-400">
                    {error}
                  </div>
                )}
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <FloatingInput id="contact-first-name" label="First Name" required value={form.firstName} onChange={set('firstName')} />
                    <FloatingInput id="contact-last-name" label="Last Name" value={form.lastName} onChange={set('lastName')} />
                  </div>
                  <FloatingInput id="contact-email" label="Email Address" type="email" required value={form.email} onChange={set('email')} />
                  <FloatingInput id="contact-phone" label="Phone Number" type="tel" value={form.phone} onChange={set('phone')} />
                  
                  <div className="space-y-1.5">
                    <label htmlFor="contact-service" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
                      Service Required
                    </label>
                    <select
                      id="contact-service"
                      value={form.service}
                      onChange={set('service')}
                      className="w-full rounded-xl px-4 py-3 text-slate-900 dark:text-white bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80 text-sm font-medium outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-500/20"
                    >
                      <option value="Passenger Lift Installation">Passenger Lift Installation</option>
                      <option value="Cargo Lift Installation">Cargo Lift Installation</option>
                      <option value="Beam / Home Lift">Beam / Home Lift</option>
                      <option value="Overhead Crane & Conveyor">Overhead Crane & Conveyor</option>
                      <option value="Spinning, Weaving & Mill Parts">Spinning, Weaving & Mill Parts</option>
                      <option value="Other Enquiry">Other Enquiry</option>
                    </select>
                  </div>

                  <FloatingTextarea id="contact-message" label="Tell us about your requirements..." rows={4} value={form.message} onChange={set('message')} />

                  <button
                    type="submit"
                    id="contact-submit"
                    disabled={submitting}
                    className="w-full py-3.5 px-6 font-semibold rounded-xl transition-all duration-200 flex justify-center items-center gap-2 text-sm bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow-md disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {submitting ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Submit Inquiry</span>
                        <Send size={15} />
                      </>
                    )}
                  </button>
                </form>
              </>
            )}
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Contact;
