import React, { useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Calendar, ArrowRight, Rss } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useNews } from '../hooks/useData';

gsap.registerPlugin(ScrollTrigger, useGSAP);

const NewsPage = () => {
  const containerRef = useRef(null);
  const { data: newsData, loading } = useNews();

  useGSAP(() => {
  }, { scope: containerRef, dependencies: [loading, newsData] });

  return (
    <>
      <Helmet>
        <title>Updates & Press | Natilah Compute</title>
        <meta name="description" content="The latest breakthroughs, research, and platform updates from the architects at Natilah." />
      </Helmet>


      <div ref={containerRef} className="relative bg-black text-slate-200 font-sans min-h-screen pt-32 pb-48 overflow-hidden">

        <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
          <div className="reveal-up max-w-4xl mb-24 md:mb-32">

            <h1 className="text-5xl md:text-7xl font-light text-white leading-[1.05] tracking-tight mb-10">
              News and <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-white to-slate-400">Research</span>.
            </h1>
            <p className="text-xl md:text-2xl text-slate-400 font-light leading-relaxed max-w-3xl">
              Track our progress as we bypass silicon limitations and deploy the most advanced task schedulers the world has ever seen.
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64 text-slate-500">
              <span className="w-8 h-8 rounded-full border-2 border-white/10 border-t-white animate-spin" />
            </div>
          ) : (
            <div className="news-grid grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 mb-32">
              {newsData?.map((item, idx) => (
                <div key={idx} className="news-card flex flex-col p-10 bg-black rounded-3xl">
                  <div className="flex items-center gap-2 text-slate-500 text-sm font-semibold uppercase tracking-widest mb-6">
                    <Calendar size={14} className="text-slate-600" />
                    {item.date ? (isNaN(new Date(item.date).getTime()) ? item.date : new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })) : 'No Date'}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light text-white mb-6 leading-[1.2]">
                    {item.title}
                  </h3>
                  <p className="text-slate-400 font-light leading-relaxed text-lg mb-10 flex-grow">
                    {item.excerpt}
                  </p>
                  <Link to={`/news/${item.id}`} className="inline-flex items-center gap-2 font-medium text-slate-300 border-b border-white/[0.1] pb-1 self-start">
                    Read Publication <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="reveal-up border-t border-white/[0.06] pt-16 mt-16 text-center text-slate-400 font-light">
            Stay ahead of the curve. <Link to="/contact" className="text-white font-medium hover:underline">Subscribe to our technical briefing.</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsPage;
