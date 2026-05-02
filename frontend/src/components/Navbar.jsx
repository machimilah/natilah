import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const Navbar = ({ links }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  const [showLogo, setShowLogo] = useState(location.pathname !== '/');
  const locationPath = location.pathname;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      // Show logo on scroll or if not on home page
      if (locationPath === '/') {
        setShowLogo(window.scrollY > 400);
      } else {
        setShowLogo(true);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [locationPath]);

  // Handle logo visibility when switching pages
  useEffect(() => {
    if (location.pathname !== '/') {
      setShowLogo(true);
    } else if (window.scrollY <= 400) {
      setShowLogo(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    setIsMobileMenuOpen(false);
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        isScrolled
          ? 'bg-black/80 backdrop-blur-xl border-white/[0.06] shadow-[0_4px_30px_-10px_rgba(0,0,0,0.4)]'
          : 'bg-transparent border-transparent'
      }`}
    >
      <div className="max-w-[1440px] w-full mx-auto px-6 md:px-8 lg:px-12">



        <div className={`hidden lg:flex items-center transition-all duration-300 ${isScrolled ? 'h-16' : 'h-24'}`}>
          {/* Logo - left */}
          <div className="flex justify-start flex-1">
            <Link
              to="/"
              className={`transition-all duration-700 flex items-center flex-shrink-0 ${
                showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
              }`}
            >
              <img
                src="/images/natilah_white_transparent.png"
                alt="Natilah Technologies"
                className="h-10 md:h-12 lg:h-16 w-auto object-contain"
              />
            </Link>
          </div>

          {/* Desktop Navigation - shifted right */}
          <div className="flex justify-start flex-1 lg:ml-24 xl:ml-40 2xl:ml-64">
            {links.map((link, index) => (
              <React.Fragment key={link.label}>
                <Link
                  to={link.href}
                  className={`text-sm tracking-widest uppercase font-semibold transition-colors duration-300 relative group whitespace-nowrap mx-2 ${
                    location.pathname === link.href
                      ? 'text-white'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute -bottom-1.5 left-0 h-[2px] bg-white transition-all duration-300 ${
                      location.pathname === link.href
                        ? 'w-full'
                        : 'w-0 group-hover:w-full'
                    }`}
                  />
                </Link>
                {index < links.length - 1 && (
                  <span className="text-slate-600 mx-2 text-sm font-light">/</span>
                )}
              </React.Fragment>
            ))}
          </div>
        </div>

        {/* Mobile layout (unchanged) */}
        <div className={`flex items-center justify-center lg:hidden transition-all duration-300 ${isScrolled ? 'h-16' : 'h-24'}`}>
          {/* Logo */}
          <Link
            to="/"
            className={`transition-all duration-700 flex items-center flex-shrink-0 lg:mr-12 ${
              showLogo ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
            }`}
            style={{ position: 'absolute', left: 0 }}
          >
            <img
              src="/images/natilah_white_transparent.png"
              alt="Natilah Technologies"
              className="h-12 md:h-14 w-auto object-contain"
            />
          </Link>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden text-slate-200 hover:text-white transition-colors duration-300 p-2 -mr-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-2xl border-b border-white/[0.06] overflow-hidden transition-all duration-400 ${
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
                    ? 'text-white bg-white/5'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
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
