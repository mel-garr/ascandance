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
  'We configure performance to your budget: $5k—$30k+.',
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

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-28 sm:py-32 md:py-36 space-y-16">
        <div ref={contentRef} className="space-y-6 text-center">
          <div className="inline-flex items-center gap-3 px-5 py-3 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-sm uppercase tracking-[0.25em] text-white/70 font-medium">
            <span className="h-px w-8 bg-white/40" />
            Our Vision
            <span className="h-px w-8 bg-white/40" />
          </div>
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight">
            Why <span className="text-white/80">Semeta-TRT</span>?
          </h2>
          <p className="text-xl sm:text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed font-light">
            Ascendance EV designs beautiful, efficient mobility for how people really move—short,
            frequent trips that deserve lightweight, attainable electric vehicles without
            compromising on style.
          </p>
        </div>

        <div
          ref={cardsRef}
          className="max-w-4xl mx-auto"
        >
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-10 md:p-12 backdrop-blur-sm shadow-lg shadow-black/20">
            <div className="space-y-6 text-white/90 leading-relaxed">
              {points.map((point, index) => (
                <p key={point} className="text-lg sm:text-xl">
                  {point}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}