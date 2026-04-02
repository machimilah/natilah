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
    // Keeping only non-entrance animations if any exist here.
  }, { scope: containerRef, dependencies: [loading, newsData] });

  return (
    <>
      <Helmet>
        <title>Updates & Press | Natilah Compute</title>
        <meta name="description" content="The latest breakthroughs, research, and platform updates from the architects at Natilah." />
      </Helmet>

      <div ref={containerRef} className="relative bg-[#FAFAFA] text-slate-800 font-sans min-h-screen pt-32 pb-48 overflow-hidden">
         {/* Parallax BG */}
         <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute top-[30%] right-[-20%] w-[70vw] h-[70vw] bg-gradient-to-tr from-purple-100/30 to-blue-50/20 blur-[130px] rounded-full mix-blend-multiply" />
        </div>

        <div className="max-w-[1440px] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
          <div className="reveal-up max-w-4xl mb-24 md:mb-32">
             
            <h1 className="text-5xl md:text-7xl font-light text-slate-900 leading-[1.05] tracking-tight mb-10">
              News and <span className="font-normal text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-blue-500">Research</span>.
            </h1>
            <p className="text-xl md:text-2xl text-slate-500 font-light leading-relaxed max-w-3xl">
              Track our progress as we bypass silicon limitations and deploy the most advanced task schedulers the world has ever seen.
            </p>
          </div>

          {loading ? (
             <div className="flex justify-center items-center h-64 text-slate-400">
               <span className="w-8 h-8 rounded-full border-2 border-slate-200 border-t-blue-500 animate-spin"/>
             </div>
          ) : (
            <div className="news-grid grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 mb-32">
              {newsData?.map((item, idx) => (
                <div key={idx} className="news-card group flex flex-col p-10 bg-white rounded-3xl border border-slate-200/60 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.05)] hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
                  <div className="flex items-center gap-2 text-slate-400 text-sm font-semibold uppercase tracking-widest mb-6">
                    <Calendar size={14} className="text-slate-300" />
                    {new Date(item.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-light text-slate-900 mb-6 leading-[1.2] group-hover:text-[#ffca55] transition-colors duration-300">
                    {item.title}
                  </h3>
                  <p className="text-slate-500 font-light leading-relaxed text-lg mb-10 flex-grow">
                    {item.excerpt}
                  </p>
                  <Link to={`/news/${item.id}`} className="inline-flex items-center gap-2 font-medium text-slate-800 hover:gap-4 transition-all duration-300 border-b border-slate-300 pb-1 self-start">
                    Read Publication <ArrowRight size={16} />
                  </Link>
                </div>
              ))}
            </div>
          )}

          <div className="reveal-up border-t border-slate-200 pt-16 mt-16 text-center text-slate-500 font-light">
            Stay ahead of the curve. <Link to="/contact" className="text-[#ffca55] font-medium hover:underline">Subscribe to our technical briefing.</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsPage;
