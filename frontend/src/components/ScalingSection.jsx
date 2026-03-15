import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const ScalingSection = ({ data }) => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleItem = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section
      id="research"
      className="bg-[#0f0f10] py-28 md:py-36 border-t border-white/[0.06]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24">
          {/* Left: Heading + Description */}
          <div className="lg:w-5/12">
            <h2
              className="text-3xl md:text-4xl lg:text-[44px] font-light text-white leading-[1.2] tracking-tight mb-6"
            >
              {data.heading}
            </h2>
            <p
              className="text-white/50 text-base md:text-[17px] font-light leading-relaxed"
            >
              {data.description}
            </p>
          </div>

          {/* Right: Expandable List */}
          <div className="lg:w-7/12">
            {data.items.map((item, index) => (
              <div
                key={item.id}
                className={`border-t border-white/[0.08] ${
                  index === data.items.length - 1
                    ? 'border-b border-white/[0.08]'
                    : ''
                }`}
              >
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full flex items-center justify-between py-6 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <span className="text-white/30 text-xs font-mono">
                      {item.number}
                    </span>
                    <span className="text-white text-lg md:text-xl font-light group-hover:text-emerald-400 transition-colors duration-300">
                      {item.title}
                    </span>
                  </div>
                  <ChevronDown
                    size={20}
                    className={`text-white/40 transition-transform duration-500 ${
                      openIndex === index ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <div
                  className={`overflow-hidden transition-all duration-500 ease-out ${
                    openIndex === index
                      ? 'max-h-40 opacity-100 pb-6'
                      : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="text-white/45 text-[15px] font-light leading-relaxed pl-10">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScalingSection;
