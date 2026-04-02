import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import { Send, MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';

const ContactPage = () => {
  const containerRef = useRef(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useGSAP(() => {
    // Subtle background float
    gsap.to('.orb-float', {
      y: '20vh',
      rotation: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      }
    });

  }, { scope: containerRef });

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setFormState({ name: '', email: '', message: '' });
      alert("Message received. Natilah Support will be in touch shortly.");
    }, 1500);
  };

  return (
    <>
      <Helmet>
        <title>Initiate Contact | Natilah Compute</title>
        <meta name="description" content="Reach out to the architects reshaping High Performance Computing. Schedule a demonstration or consult with our engineers." />
      </Helmet>

      <div ref={containerRef} className="relative bg-[#FAFAFA] text-slate-800 font-sans min-h-screen pt-32 pb-48 overflow-hidden flex flex-col justify-center">
        
        {/* Abstract Geometry */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="orb-float absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-gradient-to-tr from-purple-100/40 to-blue-100/30 blur-[100px] mix-blend-multiply rounded-full opacity-60" />
          <div className="absolute bottom-[0%] left-[-10%] w-[60vw] h-[60vw] bg-emerald-50/30 blur-[120px] mix-blend-multiply rounded-full opacity-50" />
        </div>

        <div className="max-w-[1440px] w-full mx-auto px-6 md:px-8 lg:px-12 relative z-10 flex-grow grid grid-cols-1 lg:grid-cols-2 gap-20 items-start mt-10">
          
          {/* Left Column - Information */}
          <div className="max-w-2xl pr-4">
            
            
            <h1 className="reveal-hero text-6xl md:text-8xl font-light text-slate-900 leading-[1] tracking-tight mb-8">
              Let's <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Connect</span>.
            </h1>
            
            <p className="reveal-hero text-xl md:text-2xl text-slate-500 font-light leading-relaxed mb-16 max-w-xl">
              Initiate a dialogue regarding enterprise deployment, custom integration schedules, or investment opportunities.
            </p>

            <div className="space-y-12">
              <div className="contact-item group flex gap-6 items-start">
                <div className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500 shrink-0">
                   <MapPin className="text-[#ffca55]" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-slate-900 mb-2">Global Headquarters</h3>
                  <p className="text-slate-500 leading-relaxed font-light text-lg">
                    Silicon Valley Division<br/>
                    100 Innovation Way<br/>
                    Palo Alto, CA 94301
                  </p>
                </div>
              </div>

              <div className="contact-item group flex gap-6 items-start">
                <div className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500 shrink-0">
                   <Phone className="text-purple-500" size={24} />
                </div>
                <div>
                   <h3 className="text-xl font-medium text-slate-900 mb-2">Direct Line</h3>
                  <a href="tel:+18005550199" className="text-slate-500 leading-relaxed font-light text-lg hover:text-[#ffca55] transition-colors">
                    +1 (800) 555-0199
                  </a>
                </div>
              </div>

              <div className="contact-item group flex gap-6 items-start">
                <div className="w-14 h-14 rounded-full bg-white border border-slate-200 flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform duration-500 shrink-0">
                   <Mail className="text-emerald-500" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-medium text-slate-900 mb-2">Electronic Mail</h3>
                  <a href="mailto:deploy@natilah.com" className="text-slate-500 leading-relaxed font-light text-lg hover:text-[#ffca55] transition-colors break-words">
                    deploy@natilah.com
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white/80 backdrop-blur-3xl rounded-[2.5rem] p-10 md:p-14 border border-slate-200/60 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.05)] relative overflow-hidden">
             {/* Form subtle glow bg */}
             <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-bl from-blue-50/50 to-transparent pointer-events-none" />

            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
              <div className="form-input-group">
                <label htmlFor="name" className="block text-sm font-semibold uppercase tracking-widest text-slate-400 mb-3">Identification</label>
                <input 
                  type="text" 
                  id="name"
                  required
                  placeholder="Full Name / Organization"
                  className="w-full bg-transparent border-b border-slate-300 py-4 text-xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-blue-600 transition-colors duration-300"
                  value={formState.name}
                  onChange={(e) => setFormState({...formState, name: e.target.value})}
                />
              </div>

              <div className="form-input-group">
                <label htmlFor="email" className="block text-sm font-semibold uppercase tracking-widest text-slate-400 mb-3">Return Vector</label>
                <input 
                  type="email" 
                  id="email"
                  required
                  placeholder="Work Email Address"
                  className="w-full bg-transparent border-b border-slate-300 py-4 text-xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-blue-600 transition-colors duration-300"
                  value={formState.email}
                  onChange={(e) => setFormState({...formState, email: e.target.value})}
                />
              </div>

              <div className="form-input-group pt-4">
                <label htmlFor="message" className="block text-sm font-semibold uppercase tracking-widest text-slate-400 mb-3">Transmission Payload</label>
                <textarea 
                  id="message"
                  required
                  rows="4"
                  placeholder="Describe your computational bottlenecks or deployment timeline..."
                  className="w-full bg-transparent border-b border-slate-300 py-4 text-xl text-slate-900 placeholder:text-slate-300 focus:outline-none focus:border-blue-600 transition-colors duration-300 resize-none"
                  value={formState.message}
                  onChange={(e) => setFormState({...formState, message: e.target.value})}
                />
              </div>

              <div className="form-input-group pt-8">
                <button 
                  type="submit" 
                  disabled={isSubmitting}
                  className="group w-full flex items-center justify-between text-white bg-slate-900 hover:bg-blue-600 rounded-full px-8 py-5 text-lg font-medium transition-all duration-500 shadow-xl shadow-slate-200 hover:shadow-blue-200 disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  <span>{isSubmitting ? 'Transmitting...' : 'Initiate Sequence'}</span>
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
                     {isSubmitting ? <span className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />}
                  </div>
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
    </>
  );
};

export default ContactPage;
