import React, { useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import { Send, MapPin, Mail, Phone, ArrowUpRight } from 'lucide-react';
import { supabase } from '../lib/supabase';

const ContactPage = () => {
  const containerRef = useRef(null);
  const [formState, setFormState] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  useGSAP(() => {
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      // 1. Log to your Supabase database (Optional backup)
      if (supabase) {
        const { error } = await supabase
          .from('contact_messages')
          .insert([
            {
              name: formState.name,
              email: formState.email,
              message: formState.message
            }
          ]);

        if (error) console.error('Database backup error:', error);
      }

      // 2. Redirect straight to your email using Web3Forms (Frontend-friendly, no backend needed)
      const emailResponse = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          access_key: 'f6bf65d8-542a-4e27-af4d-f8ec1e547c0c',
          from_name: 'Natilah Website',
          subject: `New Transmission from ${formState.name} (${formState.email})`,
          name: formState.name,
          email: formState.email,
          message: formState.message,
        })
      });

      if (!emailResponse.ok) {
        throw new Error('Email service failed');
      }

      setSubmitStatus('success');
      setFormState({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitStatus(null), 5000);
    } catch (error) {
      console.error('Error submitting message:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Contact</title>
        <meta name="description" content="Reach out to the architects reshaping High Performance Computing. Schedule a demonstration or consult with our engineers." />
      </Helmet>

      <div ref={containerRef} className="relative bg-black text-slate-200 font-sans min-h-screen pt-32 pb-48 overflow-hidden flex flex-col justify-center">

        {/* Abstract Geometry */}
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
          <div className="orb-float absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-gradient-to-tr from-slate-700/20 to-slate-600/15 blur-[100px] rounded-full opacity-60" />
          <div className="absolute bottom-[0%] left-[-10%] w-[60vw] h-[60vw] bg-slate-800/15 blur-[120px] rounded-full opacity-50" />
        </div>

        <div className="max-w-[800px] w-full mx-auto px-6 relative z-10 flex-grow flex flex-col items-center mt-10">
          
          <div className="text-center mb-16 max-w-2xl">
            <h1 className="reveal-hero text-6xl md:text-8xl font-light text-white leading-[1] tracking-tight mb-8">
              Let's <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Connect</span>.
            </h1>
            
            <p className="reveal-hero text-xl md:text-2xl text-slate-400 font-light leading-relaxed mx-auto">
              Initiate a dialogue regarding enterprise deployment, custom integration schedules, or investment opportunities.
            </p>
          </div>

          {/* Form Box */}
          <div className="w-full bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] p-10 md:p-14 border border-white/[0.06] shadow-[0_8px_30px_-12px_rgba(0,0,0,0.4)] relative overflow-hidden">
            <div className="absolute top-0 right-0 w-[50%] h-[50%] bg-gradient-to-bl from-white/[0.03] to-transparent pointer-events-none" />

            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
              <div className="form-input-group">
                <label htmlFor="name" className="block text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3">Identification</label>
                <input
                  type="text"
                  id="name"
                  required
                  placeholder="Full Name / Organization"
                  className="w-full bg-transparent border-b border-white/[0.1] py-4 text-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-white/40 transition-colors duration-300"
                  value={formState.name}
                  onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                />
              </div>

              <div className="form-input-group">
                <label htmlFor="email" className="block text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3">Return Vector</label>
                <input
                  type="email"
                  id="email"
                  required
                  placeholder="Work Email Address"
                  className="w-full bg-transparent border-b border-white/[0.1] py-4 text-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-white/40 transition-colors duration-300"
                  value={formState.email}
                  onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                />
              </div>

              <div className="form-input-group pt-4">
                <label htmlFor="message" className="block text-sm font-semibold uppercase tracking-widest text-slate-500 mb-3">Transmission Payload</label>
                <textarea
                  id="message"
                  required
                  rows="4"
                  placeholder="Describe your computational bottlenecks or deployment timeline..."
                  className="w-full bg-transparent border-b border-white/[0.1] py-4 text-xl text-white placeholder:text-slate-600 focus:outline-none focus:border-white/40 transition-colors duration-300 resize-none"
                  value={formState.message}
                  onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                />
              </div>

              <div className="form-input-group pt-8">
                <button
                  type="submit"
                  disabled={isSubmitting || submitStatus === 'success'}
                  className={`group w-full flex items-center justify-between rounded-full px-8 py-5 text-lg font-medium transition-all duration-500 shadow-xl ${
                    submitStatus === 'success' 
                      ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/50 shadow-emerald-500/10' 
                      : submitStatus === 'error'
                      ? 'bg-red-500/20 text-red-300 border border-red-500/50 shadow-red-500/10'
                      : 'text-slate-900 bg-white hover:bg-slate-200 shadow-black/20 hover:shadow-white/10'
                  } disabled:opacity-70 disabled:cursor-not-allowed`}
                >
                  <span>
                    {isSubmitting ? 'Transmitting...' : 
                     submitStatus === 'success' ? 'Transmission Complete' : 
                     submitStatus === 'error' ? 'Transmission Failed' : 
                     'Initiate Sequence'}
                  </span>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors ${
                    submitStatus === 'success' ? 'bg-emerald-500/20' : 
                    submitStatus === 'error' ? 'bg-red-500/20' : 
                    'bg-black/10 group-hover:bg-black/20'
                  }`}>
                    {isSubmitting ? (
                      <span className="w-5 h-5 border-2 border-slate-400/30 border-t-current rounded-full animate-spin" />
                    ) : (
                      <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    )}
                  </div>
                </button>
              </div>
              
              {/* Optional explicit status text beneath button */}
              {submitStatus === 'success' && (
                <p className="text-emerald-400 text-center mt-4">Message received. Natilah Support will be in touch shortly.</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-center mt-4">System error during transmission. Please try again.</p>
              )}
            </form>
          </div>

        </div>
      </div>
    </>
  );
};

export default ContactPage;
