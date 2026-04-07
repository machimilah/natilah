import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import NewsBanner from './NewsBanner';
import Navbar from './Navbar';
import Footer from './Footer';
import { newsBanner, navLinks, footerData } from '../data/mockData';

const Layout = ({ children }) => {
  const [bannerVisible, setBannerVisible] = useState(true);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    // Always apply dark mode
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-black text-slate-100 transition-colors duration-300">
      <Navbar
        links={navLinks}
        isHome={isHome}
      />
      <main>{children}</main>
      <Footer data={footerData} />
    </div>
  );
};

export default Layout;
