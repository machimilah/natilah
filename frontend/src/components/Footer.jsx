import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin } from 'lucide-react';
import QuantumBackground from './QuantumBackground';

const Footer = ({ data }) => {
  return (
    <footer className="relative bg-black pt-20 pb-16 overflow-hidden">
      <QuantumBackground particleCount={8} connectDistance={120} speed={0.15} opacity={0.08} colorScheme="white" />
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between">
          {/* Left: Logo + Copyright + Social */}
          <div>
            <Link
              to="/"
              className="inline-block mb-8 hover:opacity-80 transition-opacity duration-300"
            >
              <img
                src="/images/natilah_white_transparent.png"
                alt="Natilah Technologies"
                className="h-20 w-auto"
              />
            </Link>
            <p className="text-slate-400 text-sm font-light mb-3">
              &copy; 2026 Natilah Technologies. All rights reserved.
            </p>
            <div className="flex items-center gap-4">
              <a href="https://www.linkedin.com/company/natilahpi/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors duration-300" aria-label="LinkedIn"><Linkedin size={18} /></a>
            </div>
          </div>

          {/* Right: Phrase */}
          <div className="mt-12 lg:mt-0">
            
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
