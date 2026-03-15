import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import NewsBanner from './NewsBanner';
import Navbar from './Navbar';
import Footer from './Footer';
import { newsBanner, navLinks, footerData } from '../data/mockData';

const Layout = ({ children }) => {
  const [bannerVisible, setBannerVisible] = useState(true);
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-[#0f0f10]">
      <NewsBanner data={newsBanner} onClose={() => setBannerVisible(false)} />
      <Navbar links={navLinks} bannerVisible={bannerVisible} isHome={isHome} />
      <main>{children}</main>
      <Footer data={footerData} />
    </div>
  );
};

export default Layout;
