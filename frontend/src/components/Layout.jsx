import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

// Hardcoding layout elements that are site defaults, so we don't need mockData.
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "News", href: "/news" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" }
];

const footerData = {
  columns: [
    { title: "Products", links: [{ label: "Quasar", href: "/applications" }] },
    { title: "Company", links: [{ label: "About Us", href: "/about" }, { label: "News", href: "/news" }, { label: "Contact", href: "/contact" }] }
  ]
};

const Layout = ({ children }) => {
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
