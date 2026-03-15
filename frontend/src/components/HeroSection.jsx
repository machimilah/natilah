import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const HeroSection = ({ data, bannerVisible }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const videoRef = React.useRef(null);

  const videos = [
    '/videos/vecteezy_futuristic-data-center-server-room-corridor-walkthrough_72949348.mp4',
    '/videos/vecteezy_modern-industrial-zone-outdoors-large-factory-with-many_55334149.mp4',
    '/videos/vecteezy_a-row-of-servers-in-a-data-center_69464761.mp4',
  ];

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleVideoEnd = () => {
      setCurrentVideoIndex((prev) => (prev + 1) % videos.length);
    };

    const video = videoRef.current;
    if (video) {
      video.addEventListener('ended', handleVideoEnd);
      video.playbackRate = 0.75;
      return () => video.removeEventListener('ended', handleVideoEnd);
    }
  }, [currentVideoIndex, videos.length]);

  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Video with Vignette Overlay */}
      <div className="absolute inset-0">
        <video
          ref={videoRef}
          key={currentVideoIndex}
          autoPlay
          muted
          playsInline
          className="w-full h-full object-cover"
        >
          <source src={videos[currentVideoIndex]} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40" />
        {/* Vignette effect */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 0%, rgba(0,0,0,0.6) 100%)',
          }}
        />
      </div>

      {/* Content */}
      <div
        className="relative z-10 w-full lg:max-w-[70%] lg:mx-auto px-6 md:px-12 pb-20 flex items-center min-h-screen"
        style={{ paddingTop: bannerVisible ? '80px' : '40px' }}
      >
        <div className="max-w-3xl">
          <h1
            className={`text-5xl md:text-6xl lg:text-[72px] font-light text-white leading-[1.1] tracking-tight mb-8 transition-all duration-1000 ${
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {data.heading}
          </h1>
          <p
            className={`text-white/85 text-lg md:text-xl font-light leading-relaxed max-w-xl mb-12 transition-all duration-1000 delay-200 ${
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
          >
            {data.description}
          </p>
          <Link
            to={data.ctaLink}
            className={`inline-flex items-center gap-2 px-10 py-4 border border-white/80 rounded-full text-white text-base font-light tracking-wide hover:bg-white hover:text-gray-900 transition-all duration-500 group ${
              isLoaded
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-8'
            }`}
            style={{ transitionDelay: '400ms' }}
          >
            {data.ctaText}
            <ArrowRight
              size={20}
              className="group-hover:translate-x-1 transition-transform duration-300"
            />
          </Link>
        </div>
      </div>

      {/* Bottom gradient fade to dark */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0f0f10] to-transparent" />
    </section>
  );
};

export default HeroSection;
