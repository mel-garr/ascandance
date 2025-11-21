'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function LoadingOverlay() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const [isDone, setIsDone] = useState(false);

  useEffect(() => {
    if (!containerRef.current || !ringRef.current || !logoRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

      // Pop the logo in, spin the ring, then fade the overlay away
      tl.fromTo(
        logoRef.current,
        { opacity: 0, scale: 0.85 },
        { opacity: 1, scale: 1, duration: 0.9, ease: 'elastic.out(1, 0.65)' }
      )
        .fromTo(
          ringRef.current,
          { rotate: 0 },
          { rotate: 360, duration: 1.2, repeat: 1, ease: 'power1.inOut' },
          0
        )
        .to(containerRef.current, {
          opacity: 0,
          duration: 0.5,
          ease: 'power1.inOut',
          delay: 0.15,
          onComplete: () => {
            (window as any).__ascIntroFinished = true;
            window.dispatchEvent(new Event('asc-intro-finished'));
            setIsDone(true);
          },
        });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  if (isDone) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[60] bg-black flex items-center justify-center"
    >
      <div className="relative flex items-center justify-center w-32 h-32">
        <div
          ref={ringRef}
          className="absolute inset-0 rounded-full border border-white/15 border-t-white/70 border-l-white/70"
        />
        <div className="absolute inset-4 rounded-full bg-white/5 blur-2xl" />
        <img
          ref={logoRef}
          src="/iconWhite.png"
          alt="Loading"
          className="w-16 h-16 object-contain drop-shadow-lg"
        />
      </div>
    </div>
  );
}
