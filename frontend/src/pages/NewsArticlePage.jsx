import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft, ArrowRight, Rss } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useNews } from '../hooks/useData';

const NewsArticlePage = () => {
  const { id } = useParams();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);
  const { data: allNews, loading: newsLoading } = useNews();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchArticle = async () => {
      setLoading(true);

      if (supabase) {
        const { data, error } = await supabase
          .from('news')
          .select('*')
          .eq('id', id)
          .single();
          
        if (!error && data) {
          setArticle({
            id: data.id,
            date: data.date,
            title: data.title,
            excerpt: data.excerpt,
            fullContent: data.full_content,
            linkUrl: data.link_url,
          });
        }
      }
      setLoading(false);
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <div className="pt-32 min-h-screen bg-black flex flex-col items-center justify-center">
        <span className="w-8 h-8 rounded-full border-2 border-white/10 border-t-white animate-spin"/>
      </div>
    );
  }

  if (!article) {
    return (
      <div className="pt-32 min-h-screen bg-black flex flex-col items-center justify-center">
        <h1 className="text-4xl font-light text-white mb-4">Article Not Found</h1>
        <Link to="/news" className="text-slate-300 hover:text-white flex items-center gap-2">
          <ArrowLeft size={16} /> Back to News
        </Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>{article.title} | Natilah News</title>
        <meta name="description" content={article.excerpt} />
      </Helmet>

      <div className="pt-32 pb-40 min-h-screen bg-black selection:bg-white/10 selection:text-white">
<div className="max-w-[1440px] mx-auto px-6 md:px-12">

          <Link
            to="/news"
            className="inline-flex items-center gap-2 text-slate-400 hover:text-white transition-colors mb-12 font-medium"
          >
            <ArrowLeft size={18} />
            Back to All News
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            {/* Left: Main Article Content */}
            <article className="lg:col-span-8">
              <header className="mb-12 md:mb-16">
                <div className="text-slate-400 font-semibold tracking-wider text-sm uppercase mb-4">
                  {article.date}
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-5xl xl:text-6xl font-light text-white leading-[1.1] tracking-tight">
                  {article.title}
                </h1>
              </header>

              <div className="prose prose-lg prose-invert max-w-none prose-p:font-light prose-p:leading-relaxed prose-p:text-slate-400 prose-headings:font-light prose-headings:text-white prose-a:text-slate-300">
                {article.fullContent.split('\n\n').map((paragraph, index) => (      
                  <p key={index} className="mb-6">{paragraph}</p>
                ))}
              </div>
            </article>

            {/* Right: Sidebar for More News */}
            <aside className="lg:col-span-4 relative border-t lg:border-t-0 lg:border-l border-white/[0.06] pt-16 lg:pt-0 lg:pl-12">
              <div className="sticky top-32">
                <div className="flex items-center gap-3 mb-8 pb-4 border-b border-white/[0.06]">
                  <Rss size={20} className="text-slate-500" />
                  <h3 className="text-lg font-medium text-white tracking-wide uppercase">More News</h3>
                </div>

                {newsLoading ? (
                  <div className="flex justify-center items-center h-32">
                    <span className="w-6 h-6 rounded-full border-2 border-white/10 border-t-white animate-spin"/>
                  </div>
                ) : (
                  <div className="space-y-10 flex flex-col">
                    {allNews
                      ?.filter(item => item.id.toString() !== id)
                      .slice(0, 4)
                      .map((item) => (
                        <div key={item.id} className="group block">
                          <Link 
                            to={`/news/${item.id}`}
                          >
                            <div className="text-xs font-semibold text-slate-500 uppercase tracking-widest mb-2">
                              {item.date}
                            </div>
                            <h4 className="text-xl leading-[1.3] font-light text-slate-300 group-hover:text-white transition-colors mb-4 line-clamp-3">
                              {item.title}
                            </h4>
                            <div className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 group-hover:text-white transition-all duration-300 group-hover:gap-3">
                              Read article <ArrowRight size={14} />
                            </div>
                          </Link>
                        </div>
                    ))}
                    
                    {allNews?.filter(item => item.id.toString() !== id).length === 0 && (
                      <p className="text-slate-500 italic text-sm">No other news available.</p>
                    )}
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsArticlePage;
