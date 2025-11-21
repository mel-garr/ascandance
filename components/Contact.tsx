'use client';

import { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (
      !sectionRef.current ||
      !bgRef.current ||
      !overlayRef.current ||
      !contentRef.current ||
      !formRef.current ||
      !infoRef.current
    )
      return;

    const sectionEl = sectionRef.current;
    const bgEl = bgRef.current;
    const overlayEl = overlayRef.current;
    const contentEl = contentRef.current;
    const formEl = formRef.current;
    const infoEl = infoRef.current;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionEl,
          start: 'top 80%',
        },
      });

      tl.fromTo(sectionEl, { opacity: 0, y: 60 }, { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' })
        .fromTo(bgEl, { scale: 1.05, opacity: 0.85 }, { scale: 1, opacity: 1, duration: 1.1, ease: 'power2.out' }, 0)
        .fromTo(overlayEl, { opacity: 0.45 }, { opacity: 0.25, duration: 1, ease: 'power2.out' }, 0)
        .fromTo(contentEl.children, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }, 0.2)
        .fromTo(
          [formEl, infoEl],
          { opacity: 0, y: 26 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.12, ease: 'power2.out' },
          '-=0.25'
        );
    }, sectionRef);

    ScrollTrigger.refresh();
    return () => ctx.revert();
  }, []);

  return (
    <section id="contact" ref={sectionRef} className="relative w-full min-h-screen overflow-hidden bg-black text-white">
      <div ref={bgRef} className="absolute inset-0 z-0 will-change-transform">
        <div
          className="w-full h-full bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url(/contact.png)', backgroundPosition: 'center center' }}
        >
          <img src="/contact.png" alt="Contact Ascendance" className="w-full h-full object-cover opacity-0" />
        </div>
        <div
          ref={overlayRef}
          className="absolute inset-0 bg-gradient-to-b from-black/85 via-black/70 to-black/90"
        />
        <div className="absolute left-10 top-10 w-64 h-64 bg-emerald-400/10 blur-[120px] rounded-full" />
        <div className="absolute right-0 bottom-0 w-80 h-80 bg-white/10 blur-[140px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-28 md:py-32 space-y-12">
        <div ref={contentRef} className="space-y-5 text-center">
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full border border-white/15 bg-white/5 backdrop-blur-sm text-xs uppercase tracking-[0.25em] text-white/70">
            <span className="h-px w-8 bg-white/40" />
            Contact Us
            <span className="h-px w-8 bg-white/40" />
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight leading-tight">
            Let&apos;s build the future of mobility together
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-white/85 max-w-3xl mx-auto leading-relaxed">
            Affordable EVs, beautiful design, and real-world efficiency. Share your vision or visit us to experience
            Ascendance firsthand.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 md:gap-10">
          <div
            ref={formRef}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 md:p-8 backdrop-blur-sm shadow-lg shadow-black/25"
          >
            <p className="text-xl font-semibold text-white uppercase mb-4">Get in touch</p>
            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm text-white/80">Name</label>
                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="email" className="text-sm text-white/80">Email</label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
                />
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-sm text-white/80">Message</label>
                <textarea
                  id="message"
                  rows={4}
                  placeholder="Tell us about your project or questions..."
                  className="w-full rounded-xl bg-white/5 border border-white/15 px-4 py-3 text-white placeholder:text-white/50 focus:outline-none focus:border-white/40"
                />
              </div>
              <button
                type="submit"
                className="mt-2 inline-flex items-center justify-center w-full sm:w-auto rounded-xl bg-white text-black px-6 py-3 font-semibold hover:bg-white/90 transition"
              >
                Send Message
              </button>
            </form>
          </div>

          <div
            ref={infoRef}
            className="bg-white/5 border border-white/10 rounded-2xl p-6 sm:p-7 md:p-8 backdrop-blur-sm shadow-lg shadow-black/25 space-y-4 flex flex-col"
          >
            <p className="text-xl font-semibold text-white">Location</p>
            <p className="text-white/80 leading-relaxed">Mohammed VI Polytechnic University</p>
            <div className="mt-4 w-full overflow-hidden rounded-xl border border-white/10 bg-black/30 flex-1">
              <div className="relative w-full h-full min-h-[260px]">
               
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d6751.1618787053885!2d-7.9365134!3d32.21552085!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xdaf7b03f2634597%3A0x2a17b5da81219cfd!2sCampus%20universitaire%20UM6P%20Benguerir!5e0!3m2!1sen!2sma!4v1763287290130!5m2!1sen!2sma" 
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="absolute inset-0 h-full w-full"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
