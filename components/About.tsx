'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const points = [
  '75% of car journeys are under 10km and usually solo.',
  'We should not need a 3-ton vehicle for short trips.',
  'Batteries trend below $100 per kWh—EVs must be affordable.',
  'A sedan carries just the driver 90% of its life.',
  'Affordable vehicles have no right to be ugly.',
  'We configure performance to your budget: $5k–$30k+.',
];

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      !sectionRef.current ||
      !backgroundRef.current ||
      !overlayRef.current ||
      !contentRef.current ||
      !cardsRef.current
    )
      return;

    const sectionEl = sectionRef.current;
    const backgroundEl = backgroundRef.current;
    const overlayEl = overlayRef.current;
    const contentEl = contentRef.current;
    const cardsEl = cardsRef.current;

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
          { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' },
          0.25
        )
        .fromTo(
          cardsEl.children,
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power2.out' },
          '-=0.3'
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
            backgroundImage: 'url(/AboutUs.jpg)',
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 md:py-32 space-y-12">
        <div ref={contentRef} className="space-y-5 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-xs uppercase tracking-[0.25em] text-white/70">
            <span className="h-px w-8 bg-white/40" />
            About Us
            <span className="h-px w-8 bg-white/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            Why <span className="text-white/80">Semeta-TRT</span>?
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed">
            Ascendance EV designs beautiful, efficient mobility for how people really move—short,
            frequent trips that deserve lightweight, attainable electric vehicles without
            compromising on style.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
        >
          {points.map((point) => (
            <div
              key={point}
              className="group bg-white/5 border border-white/10 rounded-2xl p-5 sm:p-6 md:p-7 backdrop-blur-sm shadow-lg shadow-black/20 transition transform duration-500 hover:-translate-y-1 hover:bg-white/8 hover:border-white/20"
            >
              <p className="text-base sm:text-lg text-white/90 leading-relaxed">{point}</p>
              <div className="mt-4 h-px w-12 bg-white/15 group-hover:w-16 transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
