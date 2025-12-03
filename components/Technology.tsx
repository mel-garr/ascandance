'use client';
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Technology() {
  const mainRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!mainRef.current || !titleRef.current || !specsRef.current) return;

    const mainEl = mainRef.current;
    const titleEl = titleRef.current;
    const specsEl = specsRef.current;

    const ctx = gsap.context(() => {
      // Fade/slide the whole section in as it reaches the viewport (no gap before it appears)
      gsap.fromTo(
        mainEl,
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: mainEl,
            start: 'top 80%',
            end: 'top 50%',
            scrub: true,
          },
        }
      );

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: mainEl,
          start: 'top 70%',
        },
      });

      tl.fromTo(
        titleEl.children,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
      ).fromTo(
        specsEl.children,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
        '-=0.5'
      );
    }, mainRef);

    ScrollTrigger.refresh();

    return () => ctx.revert();
  }, []);

  return (
    <section id="tech" ref={mainRef} className="relative w-full h-screen overflow-hidden z-20">
      {/* Background Image - Same style as Hero */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url(/roud.jpg)',
            backgroundPosition: 'center center',
          }}
        >
          <img
            src="/roud.jpg"
            alt="Technology"
            className="w-full h-full object-cover object-center opacity-0"
          />
        </div>
        {/* Dark overlay matching Hero */}
        <div className="absolute inset-0 bg-black/30"></div>
      </div>

      {/* Title & Subtitle - Centered like Hero */}
      <div 
        ref={titleRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full px-4 sm:px-6"
      >
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-8xl uppercase font-semibold mb-3 tracking-tight drop-shadow-lg">
          Technology
        </h1>
        
        <p className="text-white text-base sm:text-lg md:text-2xl lg:text-3xl font-light tracking-wide drop-shadow-md mb-12">
          Built for the Future
        </p>
      </div>

      {/* Specs Grid - Bottom section matching Hero style */}
      <div 
        ref={specsRef}
        className="absolute bottom-0 left-0 right-0 z-10 pb-8 sm:pb-12 md:pb-16"
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          {/* Specs Grid - 4 columns on desktop, 2 on mobile */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center mb-6 sm:mb-8">
            <div>
              <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-1 drop-shadow-md">Fully Electric</p>
              <p className="text-white/90 text-[10px] sm:text-xs md:text-sm font-light">Zero Emissions</p>
            </div>
            <div>
              <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-1 drop-shadow-md">2 Seater</p>
              <p className="text-white/90 text-[10px] sm:text-xs md:text-sm font-light">Compact Design</p>
            </div>
            <div>
              <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-1 drop-shadow-md">10-30 KWh</p>
              <p className="text-white/90 text-[10px] sm:text-xs md:text-sm font-light">Battery Options</p>
            </div>
            <div>
              <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-1 drop-shadow-md">+300km</p>
              <p className="text-white/90 text-[10px] sm:text-xs md:text-sm font-light">Range</p>
            </div>
          </div>

          {/* Second Row of Specs */}
       <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 text-center mb-6 sm:mb-8">
            <div className="w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.5rem)]">
              <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-1 drop-shadow-md">150 km/h</p>
              <p className="text-white/90 text-[10px] sm:text-xs md:text-sm font-light">Top Speed</p>
            </div>
            <div className="w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.5rem)]">
              <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-1 drop-shadow-md">1-3 Wheel</p>
              <p className="text-white/90 text-[10px] sm:text-xs md:text-sm font-light">Drive Options</p>
            </div>
            <div className="w-[calc(50%-0.5rem)] sm:w-[calc(50%-0.75rem)] lg:w-[calc(25%-1.5rem)]">
              <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-1 drop-shadow-md">Active Lean</p>
              <p className="text-white/90 text-[10px] sm:text-xs md:text-sm font-light">Enhanced Cornering, Safety, stability, and smoothness</p>
            </div>
          </div>
          
      
        </div>
      </div>
    </section>
  );
}
