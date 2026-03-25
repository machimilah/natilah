import React, { useState, useEffect, useRef } from 'react';
import { Mail, Linkedin, Twitter } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import PageHero from '../components/PageHero';
import QuantumBackground from '../components/QuantumBackground';

const FadeInSection = ({ children, delay = 0 }) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 3000);
  };

  return (
    <>
      <Helmet>
        <title>Contact — Natilah</title>
        <meta name="description" content="Get in touch with the Natilah team. We'd love to hear from you." />
        <meta property="og:title" content="Contact — Natilah" />
        <meta property="og:url" content="https://natilah.com/contact" />
        <link rel="canonical" href="https://natilah.com/contact" />
      </Helmet>
      <PageHero
        heading="Get in touch"
      />

      {/* Contact Form Section */}
      <section className="relative bg-black py-24 md:py-32 border-t border-white/[0.06] overflow-hidden quantum-grid">
        <QuantumBackground particleCount={8} connectDistance={120} speed={0.15} opacity={0.10} colorScheme="white" />
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <FadeInSection>
                <h2 className="text-3xl md:text-4xl font-light text-white leading-tight tracking-tight mb-12">
                  Contact information
                </h2>
              </FadeInSection>

              <div className="space-y-8">
                <FadeInSection delay={200}>
                  <div className="flex gap-4">
                    <Mail className="text-white/40 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="text-white/40 text-sm font-light mb-2">Email</p>
                      <a href="mailto:hello@natilah.com" className="text-white hover:text-gray-300 transition-colors duration-300">
                        hello@natilah.com
                      </a>
                    </div>
                  </div>
                </FadeInSection>

                <FadeInSection delay={400}>
                  <div className="flex gap-4">
                    <Linkedin className="text-white/40 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="text-white/40 text-sm font-light mb-2">LinkedIn</p>
                      <a href="#" className="text-white hover:text-gray-300 transition-colors duration-300">
                        linkedin.com/company/natilah
                      </a>
                    </div>
                  </div>
                </FadeInSection>

                <FadeInSection delay={600}>
                  <div className="flex gap-4">
                    <Twitter className="text-white/40 flex-shrink-0 mt-1" size={24} />
                    <div>
                      <p className="text-white/40 text-sm font-light mb-2">Twitter</p>
                      <a href="#" className="text-white hover:text-gray-300 transition-colors duration-300">
                        @natilah
                      </a>
                    </div>
                  </div>
                </FadeInSection>
              </div>
            </div>

            {/* Contact Form */}
            <FadeInSection delay={200}>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-white/40 text-sm font-light mb-3">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors duration-300"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-white/40 text-sm font-light mb-3">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors duration-300"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-white/40 text-sm font-light mb-3">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors duration-300"
                    placeholder="How can we help?"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-white/40 text-sm font-light mb-3">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows="6"
                    className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-white/30 transition-colors duration-300 resize-none"
                    placeholder="Your message..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-white text-black px-8 py-3 font-light hover:bg-gray-100 transition-colors duration-300"
                >
                  {submitted ? 'Message sent!' : 'Send message'}
                </button>
              </form>
            </FadeInSection>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactPage;
