import React, { useEffect, useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = ({ data, missionData, bannerVisible }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = React.useRef(null);
  const nextVideoRef = React.useRef(null);

  const videos = useMemo(() => [
    '/videos/hallway.mp4',
    '/videos/vecteezy_modern-industrial-zone-outdoors-large-factory-with-many_55334149.mp4',
    '/videos/vecteezy_a-row-of-servers-in-a-data-center_69464761.mp4',
  ], []);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    const nextVideo = nextVideoRef.current;
    if (!video || !nextVideo) return;

    const handleVideoEnd = () => {
      const nextIndex = (currentVideoIndex + 1) % videos.length;
      setCurrentVideoIndex(nextIndex);
      video.src = videos[nextIndex];
      video.play().catch(() => {});
    };

    video.addEventListener('ended', handleVideoEnd);
    video.playbackRate = 1;

    // Preload next video
    const preloadIndex = (currentVideoIndex + 1) % videos.length;
    nextVideo.src = videos[preloadIndex];

    return () => video.removeEventListener('ended', handleVideoEnd);
  }, [currentVideoIndex, videos]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const video = videoRef.current;
    if (video && !video.src) {
      video.src = videos[currentVideoIndex];
      video.play().catch(() => {});
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <section id="home" className="relative w-full min-h-screen flex flex-col overflow-hidden">
      {/* Background Video — spans full section height, bottom half covered by bg-black */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
        {/* Hidden video for preloading next video */}
        <video
          ref={nextVideoRef}
          muted
          playsInline
          className="hidden"
          preload="auto"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div
          className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)' }}
        />
      </div>

      {/* Video hero content */}
      <div
        className="relative z-10 h-[70vh] flex items-center w-full px-6 md:px-12"
        style={{ paddingTop: bannerVisible ? '80px' : '40px' }}
      >
        <div className="max-w-[1400px] mx-auto w-full">
          <div className="max-w-3xl">
            <h1
              className={`text-5xl md:text-6xl lg:text-[72px] font-light text-white leading-[1.1] tracking-tight mb-8 transition-all duration-1000 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {data.heading}
            </h1>
            <p
              className={`text-white/85 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-12 transition-all duration-1000 delay-200 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
            >
              {data.description}
            </p>
            <Link
              to={data.ctaLink}
              className={`inline-flex items-center gap-2 px-10 py-4 border border-white/80 rounded-full text-white text-base font-light tracking-wide hover:bg-white hover:text-gray-900 transition-all duration-500 group ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: '400ms' }}
            >
              {data.ctaText}
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
            </Link>
          </div>
        </div>
      </div>

      {/* Mission section: two-column layout */}
      {missionData && (
        <div className="relative z-10 flex-1 bg-black w-full px-6 md:px-12 border-t border-white/[0.08]">
          <div className="max-w-[1400px] mx-auto w-full py-16 md:py-20 flex flex-col lg:flex-row">
            {/* Left: heading */}
            <div className="lg:w-2/5 lg:pr-16 mb-10 lg:mb-0">
              <h2
                className={`text-3xl md:text-4xl lg:text-[44px] font-light text-white leading-[1.2] tracking-tight transition-all duration-1000 delay-300 ${
                  isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
              >
                {missionData.heading}
              </h2>
            </div>
            {/* Vertical divider */}
            <div className="hidden lg:block w-px bg-white/[0.08] flex-none" />
            {/* Right: paragraphs */}
            <div className="lg:flex-1 lg:pl-16 space-y-5">
              {missionData.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className={`text-white/60 text-base md:text-lg font-light leading-relaxed transition-all duration-1000 ${
                    isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${(index + 3) * 150}ms` }}
                  dangerouslySetInnerHTML={{
                    __html: paragraph.replace(
                      /\*\*(.*?)\*\*/g,
                      '<strong class="text-white font-medium">$1</strong>'
                    ),
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default HeroSection;
