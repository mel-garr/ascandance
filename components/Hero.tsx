'use client'
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useLayoutEffect(() => {
    if (
      !heroRef.current ||
      !backgroundRef.current ||
      !overlayRef.current ||
      !titleRef.current ||
      !specsRef.current
    )
      return;

    const ctx = gsap.context(() => {
      gsap.set(heroRef.current, { opacity: 0 });
      gsap.set([titleRef.current, specsRef.current], { opacity: 0, y: 28 });

      const tl = gsap.timeline({ paused: true });

      tl.add(() => {
        (window as any).__ascHeroRevealed = true;
        window.dispatchEvent(new Event('asc-hero-revealed'));
      }, 0.05)
        .to(heroRef.current, { opacity: 1, duration: 0.25, ease: 'power1.out' })
        .fromTo(
          backgroundRef.current,
          { scale: 1.05, opacity: 0.9 },
          { scale: 1, opacity: 1, duration: 1.1, ease: 'power2.out' },
          0
        )
        .fromTo(
          overlayRef.current,
          { opacity: 0.35 },
          { opacity: 0.12, duration: 1, ease: 'power2.out' },
          0
        )
        .to(
          titleRef.current,
          { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' },
          0.35
        )
        .to(
          specsRef.current,
          { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
          '-=0.25'
        );

      const playReveal = () => {
        if (tl.isActive() || tl.progress() > 0) return;
        tl.play();
      };

      const introHandler = () => {
        playReveal();
        window.removeEventListener('asc-intro-finished', introHandler);
      };

      window.addEventListener('asc-intro-finished', introHandler);

      if ((window as any).__ascIntroFinished) {
        playReveal();
      }

      return () => {
        window.removeEventListener('asc-intro-finished', introHandler);
        tl.kill();
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={heroRef} 
      id="hero"
      className="relative w-full h-screen overflow-hidden"
    >
      {/* Background */}
      <div ref={backgroundRef} className="absolute inset-0 z-0 will-change-transform">
        {/* Mobile Image */}
        <div
          className="
            md:hidden
            w-full h-full 
            bg-cover
            bg-no-repeat 
            bg-center
          "
          style={{ backgroundImage: 'url(/mobile2.png)' }}
        >
          <img
            src="/mobile2.png"
            alt="Ascendance Vehicle"
            className="w-full h-full object-cover object-center opacity-0"
          />
        </div>

        {/* Desktop Image */}
        <div
          className="
            hidden md:block
            w-full h-full 
            bg-contain
            sm:bg-contain
            md:bg-cover
            bg-no-repeat 
            bg-center
          "
          style={{ backgroundImage: 'url(/Herosection.jpeg)' }}
        >
          <img
            src="/Herosection.webp"
            alt="Ascendance Vehicle"
            className="
              w-full h-full 
              object-contain
              md:object-cover
              object-center 
              opacity-0
            "
          />
        </div>

        <div ref={overlayRef} className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Bottom Specs & Center Content */}
      <div ref={specsRef} className="absolute bottom-0 left-0 right-0 z-10 pb-8 sm:pb-12 md:pb-16">
        <div className="flex items-center justify-between w-full relative">

          {/* Left Column */}
          <div className="text-left ml-4 sm:ml-8 md:ml-16 lg:ml-[10rem]">
            <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-1 drop-shadow-md">3.1s</p>
            <p className="text-white/90 text-[10px] sm:text-xs md:text-sm font-light mb-2">0-60 mph*</p>
            <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-1 drop-shadow-md">350mi</p>
            <p className="text-white/90 text-[10px] sm:text-xs md:text-sm font-light">Range (EPA est.)</p>
          </div>

          {/* Center Column */}
          <div ref={titleRef} className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-7xl uppercase font-semibold tracking-tight drop-shadow-lg whitespace-nowrap">
              Semeta-TRT
            </h1>
            <p className="text-white text-sm sm:text-lg md:text-2xl lg:text-3xl font-light tracking-wide drop-shadow-md text-center mt-2 mb-4 px-2">
              Urban Mobility Tilting Reverse Trike
            </p>
            <button
              onClick={() => router.push('/configurator')}
              className="px-8 sm:px-12 md:px-16 lg:px-20 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold border border-white/30 rounded hover:bg-white/20 transition-all uppercase tracking-wider"
            >
              Configure Your Semeta Ev
            </button>
          </div>

          {/* Right Column */}
          <div className="text-right mr-4 sm:mr-8 md:mr-16 lg:mr-[10rem]">
            <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-1 drop-shadow-md">150mph</p>
            <p className="text-white/90 text-[10px] sm:text-xs md:text-sm font-light mb-2">Top Speed</p>
            <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-1 drop-shadow-md">+$5,000</p>
            <p className="text-white/90 text-[10px] sm:text-xs md:text-sm font-light">Vehicle starting price</p>
          </div>

        </div>
      </div>
    </section>
  );
}