import React from 'react';
import { Link } from 'react-router-dom';
import { Linkedin, Youtube } from 'lucide-react';

const XIcon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const Footer = ({ data }) => {
  return (
    <footer className="bg-[#0f0f10] pt-20 pb-16 border-t border-white/[0.06]">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left: Logo + Copyright */}
          <div className="lg:w-5/12">
            <Link
              to="/"
              className="text-white text-2xl font-semibold tracking-tight inline-block mb-8 hover:opacity-80 transition-opacity duration-300"
            >
              <span className="text-emerald-400 mr-1 font-bold">N</span>atilah
            </Link>
            <p className="text-white/40 text-sm font-light mb-3">
              &copy; 2025 Natilah. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-white/40 text-sm font-light mb-8">
              <a href="#" className="hover:text-white transition-colors duration-300">Terms</a>
              <span>/</span>
              <a href="#" className="hover:text-white transition-colors duration-300">Privacy Policy</a>
            </div>
            <div className="flex items-center gap-4">
              <a href="#" className="text-white/40 hover:text-white transition-colors duration-300" aria-label="X (Twitter)"><XIcon /></a>
              <a href="#" className="text-white/40 hover:text-white transition-colors duration-300" aria-label="LinkedIn"><Linkedin size={18} /></a>
              <a href="#" className="text-white/40 hover:text-white transition-colors duration-300" aria-label="YouTube"><Youtube size={18} /></a>
            </div>
          </div>

          {/* Right: Link Columns */}
          <div className="lg:w-7/12 grid grid-cols-2 md:grid-cols-3 gap-10">
            <div>
              <h4 className="text-white/30 text-xs font-light tracking-widest uppercase mb-5">Global Facilities</h4>
              <ul className="space-y-3">
                {data.globalFacilities.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href} className="text-white/70 text-sm font-light hover:text-white transition-colors duration-300">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white/30 text-xs font-light tracking-widest uppercase mb-5">News</h4>
              <ul className="space-y-3">
                {data.news.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href} className="text-white/70 text-sm font-light hover:text-white transition-colors duration-300">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-white/30 text-xs font-light tracking-widest uppercase mb-5">Company</h4>
              <ul className="space-y-3">
                {data.company.map((item) => (
                  <li key={item.label}>
                    <Link to={item.href} className="text-white/70 text-sm font-light hover:text-white transition-colors duration-300">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
