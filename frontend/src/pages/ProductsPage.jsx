import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const ProductsPage = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    window.scrollTo(0, 0);

    gsap.fromTo(
      cardsRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="bg-black min-h-screen pt-32 pb-24 text-slate-200 font-rubik">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="mb-16 md:mb-24">
          <h1 className="text-4xl md:text-6xl mb-6 text-white tracking-tight">
            Products
          </h1>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl leading-relaxed font-light">
            Natilah's cutting-edge solutions.
          </p>
        </div>

        {/* Scheduling Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl mb-8 text-white border-b border-white/[0.08] pb-4">
            Scheduling
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              to="/products/quasar"
              
              className="group block bg-black p-8 transition-colors duration-300 rounded-3xl border border-white/[0.06]"
            >
              <h3 className="text-2xl text-white mb-2 flex items-center">
                Quasar <span className="text-slate-400 ml-2 text-2xl font-normal transition-transform group-hover:text-white">{'>'}</span>
              </h3>
              <p className="text-slate-400 text-lg font-light leading-relaxed">
                Datacenter-level GPU scheduler designed for the most demanding workloads.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;