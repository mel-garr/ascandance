'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      !sectionRef.current ||
      !backgroundRef.current ||
      !overlayRef.current ||
      !contentRef.current
    )
      return;

    const sectionEl = sectionRef.current;
    const backgroundEl = backgroundRef.current;
    const overlayEl = overlayRef.current;
    const contentEl = contentRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top 80%',
        },
      });

      tl.fromTo(
        sectionEl,
        { opacity: 0, y: 60 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
      )
        .fromTo(
          backgroundEl,
          { scale: 1.05, opacity: 0.85 },
          { scale: 1, opacity: 1, duration: 1.2, ease: 'power2.out' },
          0
        )
        .fromTo(
          overlayEl,
          { opacity: 0.4 },
          { opacity: 0.2, duration: 1, ease: 'power2.out' },
          0
        )
        .fromTo(
          contentEl.children,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
          0.25
        );
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative w-full min-h-screen overflow-hidden bg-black text-white"
    >
      <div
        ref={backgroundRef}
        className="absolute inset-0 z-0 will-change-transform"
      >
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: 'url(/Herosection.webp)',
            backgroundPosition: 'center center',
          }}
        >
          <img
            src="/AboutUs.jpg"
            alt="About Ascendance"
            className="w-full h-full object-cover object-center opacity-0"
          />
        </div>
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/45 to-black/75"
        />
        <div className="absolute -left-24 top-1/3 w-72 h-72 bg-emerald-400/15 blur-[120px] rounded-full" />
        <div className="absolute right-0 bottom-10 w-64 h-64 bg-white/10 blur-[110px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-32 md:py-36">
        <div ref={contentRef} className="space-y-8 text-center max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-sm uppercase tracking-[0.25em] text-white/70 font-medium">
            <span className="h-px w-8 bg-white/40" />
            About Us
            <span className="h-px w-8 bg-white/40" />
          </div>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            Our <span className="text-white/80">Story</span>
          </h2>
          
          <div className="space-y-6 text-xl sm:text-2xl text-white/90 leading-relaxed font-light">
            <p>
              Founded with a vision to revolutionize urban mobility, Ascendance EV was born from a simple observation: the way we move in cities needs to change.
            </p>
            
            <p>
              We're a team of engineers, designers, and innovators who believe that electric vehicles should be accessible to everyone—not just luxury buyers. Our mission is to create beautiful, efficient, and affordable EVs that make sense for real-world use.
            </p>
            
            <p>
              Based at Mohammed VI Polytechnic University, we combine cutting-edge research with practical engineering to build the future of sustainable transportation, one vehicle at a time.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}