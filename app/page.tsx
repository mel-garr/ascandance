'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import Technology from '@/components/Technology';
import About from '@/components/About';
import Contact from '@/components/Contact';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroWrapperRef = useRef<HTMLDivElement>(null);
  const techWrapperRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!heroWrapperRef.current || !techWrapperRef.current) return;

    const heroEl = heroWrapperRef.current;
    const techEl = techWrapperRef.current;

    const ctx = gsap.context(() => {
      // Pin the hero section
      ScrollTrigger.create({
        trigger: heroEl,
        start: 'top top',
        end: 'bottom top',
        pin: true,
        pinSpacing: false, // This is key - no extra space
        anticipatePin: 1,
      });

      // Animate hero fade/scale
      gsap.to(heroEl, {
        opacity: 0.5,
        scale: 0.95,
        scrollTrigger: {
          trigger: techEl,
          start: 'top bottom',
          end: 'top center',
          scrub: true,
        },
      });

      // Animate tech section sliding up
      gsap.fromTo(
        techEl,
        {
          yPercent: 0,
        },
        {
          yPercent: 0,
          scrollTrigger: {
            trigger: techEl,
            start: 'top center',
            end: 'top top',
            scrub: true,
          },
        }
      );
    }, heroWrapperRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <div className="min-h-screen bg-black">
      <Navbar />
      <div ref={heroWrapperRef} className="relative z-10 h-screen">
        <Hero />
      </div>
      <div ref={techWrapperRef} className="relative z-20 bg-black">
        <Technology />
      </div>
      <div className="relative z-30 bg-black">
        <About />
      </div>
      <div className="relative z-30 bg-black">
        <Contact />
      </div>
      <Footer />
    </div>
  );
}
