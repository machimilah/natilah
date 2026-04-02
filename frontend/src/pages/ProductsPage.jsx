import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

const ProductsPage = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    // Scroll to top when mounted
    window.scrollTo(0, 0);

    // Fade in animation
    gsap.fromTo(
      cardsRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "power3.out" }
    );
  }, []);

  return (
    <div className="bg-white min-h-screen pt-32 pb-24 text-slate-800 font-rubik">
      <div className="container mx-auto px-4 md:px-8">
        {/* Header Section */}
        <div className="mb-16 md:mb-24">
          <p className="text-natilah-accent font-medium mb-3 tracking-wide text-sm md:text-base">
            OUR OFFERINGS
          </p>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-slate-900 tracking-tight">
            Products
          </h1>
          <p className="text-slate-600 text-lg md:text-xl max-w-2xl leading-relaxed font-light">
            Discover our cutting-edge solutions built up block by block from foundational quantum innovation.
          </p>
        </div>

        {/* Scheduling Section */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 text-black border-b border-gray-200 pb-4">
            Scheduling
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Quasar Product Card */}
            <Link
              to="/products/quasar"
              ref={(el) => (cardsRef.current[0] = el)}
              className="group block bg-[#F4F4F4] p-8 hover:bg-grey transition-colors duration-300 rounded-3xl"
            >
              <h3 className="text-2xl text-black mb-2 flex items-center">
                Quasar <span className="text-[#ffca55] ml-2 text-2xl font-normal transition-transform group-hover:translate-x-1">{'>'}</span>
              </h3>
              <p className="text-[#555555] text-lg font-light leading-relaxed">
                The most advanced, low-latency quantum search algorithmic framework built for massive datasets and rapid retrieval.
              </p>
            </Link>
          </div>
        </div>

        {/* Section #2 */}
        <div className="mb-16">
          <h2 className="text-2xl md:text-3xl mb-8 text-black border-b border-gray-200 pb-4">
            Section #2
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Product Card */}
            <Link
              to="/products/example"
              ref={(el) => (cardsRef.current[1] = el)}
              className="group block bg-[#F4F4F4] p-8 hover:bg-[#EAEAEA] transition-colors duration-300 rounded-3xl"
            >
              <h3 className="text-2xl text-black mb-2 flex items-center">
                Example Product <span className="text-[#ffca55] ml-2 text-2xl font-normal transition-transform group-hover:translate-x-1">{'>'}</span>
              </h3>
              <p className="text-[#555555] text-lg font-light leading-relaxed">
                Placeholder description for a different section to demonstrate the layout structure and spacing.
              </p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsPage;