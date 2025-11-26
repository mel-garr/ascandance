'use client'
import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation'; // <--- import router

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const specsRef = useRef<HTMLDivElement>(null);
  const router = useRouter(); // <--- initialize router

  const scrollToContent = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: 'smooth',
    });
  };

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
        <div className="w-full h-full bg-cover bg-center bg-no-repeat" style={{ backgroundImage: 'url(/Herosection.webp)' }}>
          <img src="/Herosection.webp" alt="Ascendance Vehicle" className="w-full h-full object-cover object-center opacity-0" />
        </div>
        <div ref={overlayRef} className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Title */}
      <div ref={titleRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 text-center w-full px-4 sm:px-6">
        <h1 className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-8xl uppercase font-semibold mb-3 tracking-tight drop-shadow-lg">
          Semeta-TRT
        </h1>
        <p className="text-white text-base sm:text-lg md:text-2xl lg:text-3xl font-light tracking-wide drop-shadow-md">
          Our Featured Electric Vehicles
        </p>
      </div>

      {/* Specs & Button */}
      <div ref={specsRef} className="absolute bottom-0 left-0 right-0 z-10 pb-8 sm:pb-12 md:pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center mb-6 sm:mb-8">
            <div>
              <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-1 drop-shadow-md">350mi</p>
              <p className="text-white/90 text-[10px] sm:text-xs md:text-sm font-light">Range (EPA est.)</p>
            </div>
            <div>
              <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-1 drop-shadow-md">3.1s</p>
              <p className="text-white/90 text-[10px] sm:text-xs md:text-sm font-light">0-60 mph*</p>
            </div>
            <div>
              <p className="text-white text-xl sm:text-2xl md:text-3xl font-semibold mb-1 drop-shadow-md">150mph</p>
              <p className="text-white/90 text-[10px] sm:text-xs md:text-sm font-light">Top Speed</p>
            </div>
          </div>

          {/* CTA Button */}
          <div className="flex justify-center">
            <button
              onClick={() => router.push('/configurator')} // <--- navigate to configurator
              className="px-12 sm:px-16 md:px-20 py-2.5 sm:py-3 bg-white/10 backdrop-blur-sm text-white text-xs sm:text-sm font-semibold border border-white/30 rounded hover:bg-white/20 transition-all uppercase tracking-wider"
            >
              Build Your Vision
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
