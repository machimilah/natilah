import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const BANNER_HEIGHT = 44;

const Navbar = ({ links, bannerVisible, isHome }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  const topOffset = bannerVisible ? BANNER_HEIGHT : 0;
  const showDarkBg = isScrolled || !isHome;

  return (
    <nav
      className={`fixed left-1/2 -translate-x-1/2 z-40 transition-all duration-500 rounded-2xl mx-4 ${
        showDarkBg
          ? 'bg-black/95 backdrop-blur-md shadow-lg'
          : 'bg-transparent'
      }`}
      style={{ top: isScrolled ? '20px' : topOffset + 20, maxWidth: 'calc(100% - 32px)' }}
    >
      <div className="w-full px-6 md:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link
            to="/"
            className="hover:opacity-80 transition-opacity duration-300 flex items-center flex-shrink-0 lg:mr-20"
          >
            <img
              src="/images/natilah_white_transparent.png"
              alt="Natilah Technologies"
              className="h-20 lg:h-12 w-auto"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center">
            {links.map((link, index) => (
              <React.Fragment key={link.label}>
                <Link
                  to={link.href}
                  className={`text-lg font-light tracking-wide transition-colors duration-300 relative group ${
                    location.pathname === link.href
                      ? 'text-white'
                      : 'text-white/70 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1 left-0 h-[1px] bg-white transition-all duration-300 ${
                      location.pathname === link.href
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
                {index < links.length - 1 && (
                  <span className="text-white/30 mx-5 text-base font-light">/</span>
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
        className={`lg:hidden absolute top-full left-0 right-0 bg-black/98 backdrop-blur-lg overflow-hidden transition-all duration-500 rounded-b-2xl ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-6 space-y-4">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className={`block text-xl font-light transition-colors duration-300 ${
                location.pathname === link.href
                  ? 'text-white'
                  : 'text-white/60 hover:text-white'
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
