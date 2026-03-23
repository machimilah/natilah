import React, { useEffect, useRef, useState } from 'react';
import { ArrowRight } from 'lucide-react';

const NewsSection = ({ data }) => {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      id="news"
      ref={sectionRef}
      className="bg-black py-28 md:py-36 border-t border-white/[0.06]"
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <h2
          className={`text-3xl md:text-4xl lg:text-[44px] font-light text-white leading-[1.2] tracking-tight mb-16 transition-all duration-1000 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
          }`}
        >
          Latest news
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.map((item, index) => (
            <article
              key={item.id}
              className={`group transition-all duration-1000 ${
                isVisible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ transitionDelay: `${(index + 1) * 150}ms` }}
            >
              <p className="text-white/30 text-xs font-light mb-4">
                {item.date}
              </p>
              <h3 className="text-white text-[15px] font-normal leading-snug mb-4 group-hover:text-gray-300 transition-colors duration-300">
                <a href={item.linkUrl}>{item.title}</a>
              </h3>
              <p className="text-white/40 text-sm font-light leading-relaxed mb-4 line-clamp-3">
                {item.excerpt}
              </p>
              <a
                href={item.linkUrl}
                className="inline-flex items-center gap-2 text-white text-sm font-light hover:text-gray-300 transition-colors duration-300 group/link"
              >
                Read More
                <ArrowRight
                  size={14}
                  className="group-hover/link:translate-x-1 transition-transform duration-300"
                />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewsSection;
