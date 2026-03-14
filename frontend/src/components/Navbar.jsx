import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const BANNER_HEIGHT = 44;

const Navbar = ({ links, bannerVisible }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const topOffset = bannerVisible ? BANNER_HEIGHT : 0;

  const scrollToSection = (e, href) => {
    e.preventDefault();
    if (href === '#home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const el = document.querySelector(href);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <nav
      className={`fixed left-0 right-0 z-40 transition-all duration-500 ${
        isScrolled
          ? 'bg-[#0f0f10]/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
      style={{ top: isScrolled ? 0 : topOffset }}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <a
            href="#home"
            onClick={(e) => scrollToSection(e, '#home')}
            className="text-white text-2xl font-semibold tracking-tight hover:opacity-80 transition-opacity duration-300"
          >
            <span className="text-emerald-400 mr-1 font-bold">N</span>atilah
          </a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            {links.map((link, index) => (
              <React.Fragment key={link.label}>
                <a
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="text-white/90 hover:text-white text-[15px] font-light tracking-wide transition-colors duration-300 relative group"
                >
                  {link.label}
                  <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-white group-hover:w-full transition-all duration-300" />
                </a>
                {index < links.length - 1 && (
                  <span className="text-white/30 mx-5 text-sm font-light">/</span>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-white hover:text-white/80 transition-colors duration-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden absolute top-full left-0 right-0 bg-[#0f0f10]/98 backdrop-blur-lg overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="block text-white/80 hover:text-white text-lg font-light transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
