import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = ({ links }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-white/70 backdrop-blur-xl border-slate-200/60 shadow-[0_4px_30px_-10px_rgba(0,0,0,0.05)]'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-8 lg:px-12">
        <div className={`flex items-center justify-between transition-all duration-300 ${isScrolled ? 'h-16' : 'h-24'}`}>
          {/* Logo */}
          <Link
            to="/"
            className="hover:opacity-80 transition-opacity duration-300 flex items-center flex-shrink-0 lg:mr-20"
          >
            <img
              src="/images/natilahlonglogobg.png"
              alt="Natilah Technologies"
              className="h-16 md:h-20 lg:h-28 w-auto object-contain mt-1 lg:mt-3"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            {links.map((link, index) => (
              <React.Fragment key={link.label}>
                <Link
                  to={link.href}
                  className={`text-sm tracking-widest uppercase font-semibold transition-colors duration-300 relative group whitespace-nowrap ${
                    location.pathname === link.href
                      ? 'text-[#ffca55]'
                      : 'text-slate-500 hover:text-slate-900'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-[2px] bg-blue-600 transition-all duration-300 ${
                      location.pathname === link.href
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
                {index < links.length - 1 && (
                  <span className="text-slate-300 mx-5 text-sm font-light">/</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Quick CTA placeholder to maintain layout */}
          <div className="hidden lg:flex items-center invisible pointer-events-none select-none">
             <Link
                to="/contact"
                className="px-5 py-2 bg-slate-900 text-white text-sm font-semibold uppercase tracking-widest rounded-full"
              >
                Access Platform
             </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-slate-800 hover:text-[#ffca55] transition-colors duration-300 p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-2xl border-b border-slate-200 overflow-hidden transition-all duration-400 ${
            isMobileMenuOpen ? 'max-h-screen opacity-100 pointer-events-auto' : 'max-h-0 opacity-0 pointer-events-none'
          }`}
        >
          <div className="px-6 py-8 space-y-4">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className={`block px-4 py-3 text-lg font-medium tracking-wide transition-colors duration-300 rounded-xl ${
                  location.pathname === link.href
                    ? 'text-[#ffca55] bg-blue-50/50'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
