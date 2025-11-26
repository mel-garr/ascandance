'use client'

import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useRouter } from 'next/navigation';

type NavbarProps = {
  alwaysVisible?: boolean;
  darkText?: boolean;
};

export default function Navbar({ alwaysVisible = false, darkText = false }: NavbarProps) {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLImageElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const mobileButtonRef = useRef<HTMLButtonElement>(null);

  // Simplified navbar reveal - just show it after a short delay
  useEffect(() => {
    if (!navRef.current) return;
    
    // Always make navbar visible after short delay
    const timer = setTimeout(() => {
      if (navRef.current) {
        gsap.to(navRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: 'power2.out',
        });
      }
    }, alwaysVisible ? 0 : 1000); // Show immediately if alwaysVisible, otherwise after 1s

    return () => clearTimeout(timer);
  }, [alwaysVisible]);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      const hasScrolled = window.scrollY > 50;
      setIsScrolled(hasScrolled);

      gsap.to(navRef.current, {
        backgroundColor: hasScrolled ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0)',
        backdropFilter: hasScrolled ? 'blur(10px)' : 'blur(0px)',
        boxShadow: hasScrolled ? '0 1px 3px rgba(0,0,0,0.1)' : '0 0 0 rgba(0,0,0,0)',
        duration: 0.3,
        ease: 'power2.out',
      });

      if (!darkText && logoRef.current) {
        gsap.to(logoRef.current, { opacity: hasScrolled ? 1 : 0, duration: 0.3 });
      }

      if (!darkText && linksRef.current) {
        const links = linksRef.current.querySelectorAll('a');
        gsap.to(links, { color: hasScrolled ? '#111827' : '#ffffff', duration: 0.3 });
      }

      if (!darkText && buttonRef.current) {
        gsap.to(buttonRef.current, {
          backgroundColor: hasScrolled ? '#000000' : '#ffffff',
          color: hasScrolled ? '#ffffff' : '#000000',
          duration: 0.3,
        });
      }

      if (!darkText && mobileButtonRef.current) {
        gsap.to(mobileButtonRef.current, { color: hasScrolled ? '#111827' : '#ffffff', duration: 0.3 });
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [darkText]);

  const linkColor = darkText ? '#111827' : isScrolled ? '#111827' : '#ffffff';

  return (
    <nav ref={navRef} className="fixed top-0 w-full z-50 transition-all duration-300" style={{ opacity: 0 }}>
      <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-16">
        <div className="grid grid-cols-3 items-center h-16 md:h-20">
          {/* Logo */}
          <div className="flex justify-start">
            <div
              className="hover:opacity-80 transition-opacity cursor-pointer z-10 relative"
              onClick={() => router.push('/')}
            >
              <img src={darkText ? '/logoBlack.png' : '/logoWhite.png'} alt="Ascendance" className="h-12 sm:h-14 lg:h-16 xl:h-20 w-auto object-contain" />
              {!darkText && (
                <img ref={logoRef} src="/logoBlack.png" alt="Ascendance" className="h-12 sm:h-14 lg:h-16 xl:h-20 w-auto object-contain absolute top-0 left-0 opacity-0" />
              )}
            </div>
          </div>

          {/* Links */}
          <div ref={linksRef} className="hidden lg:flex items-center justify-center gap-6 xl:gap-10">
            <a href="/configurator" style={{ color: linkColor }} className="text-sm font-medium transition-opacity duration-200 whitespace-nowrap hover:opacity-70">Configurator</a>
            <a href="/#tech" style={{ color: linkColor }} className="text-sm font-medium transition-opacity duration-200 whitespace-nowrap hover:opacity-70">Technology</a>
            <a href="/#about" style={{ color: linkColor }} className="text-sm font-medium transition-opacity duration-200 whitespace-nowrap hover:opacity-70">About Us</a>
            <a href="/#contact" style={{ color: linkColor }} className="text-sm font-medium transition-opacity duration-200 whitespace-nowrap hover:opacity-70">Contact</a>
          </div>

          {/* CTA Button */}
          <div className="hidden lg:flex items-center justify-end">
            <button
              ref={buttonRef}
              onClick={() => router.push('/configurator')}
              className="px-6 xl:px-8 py-2 xl:py-3 rounded-lg transition-all duration-200 text-sm font-semibold shadow-sm hover:shadow-md hover:opacity-90"
              style={{
                backgroundColor: darkText ? '#000000' : isScrolled ? '#000000' : '#ffffff',
                color: darkText ? '#ffffff' : isScrolled ? '#ffffff' : '#000000',
              }}
            >
              Order Now
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex justify-end col-span-2">
            <button 
              ref={mobileButtonRef} 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="p-2 hover:bg-opacity-10 hover:bg-gray-500 rounded-lg transition-colors z-10" 
              aria-label="Toggle menu" 
              style={{ color: linkColor }}
            >
              <svg className="w-6 h-6" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? <path d="M6 18L18 6M6 6l12 12" /> : <path d="M4 6h16M4 12h16M4 18h16" />}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu Links */}
        {isMenuOpen && (
          <div className="lg:hidden border-t border-gray-200 bg-white">
            <div className="py-4 px-2 flex flex-col gap-2">
              <a href="/configurator" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">Configurator</a>
              <a href="/#tech" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">Technology</a>
              <a href="/#about" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">About Us</a>
              <a href="/#contact" onClick={() => setIsMenuOpen(false)} className="px-4 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 rounded-lg transition-colors">Contact</a>
              <div className="pt-2">
                <button onClick={() => { router.push('/configurator'); setIsMenuOpen(false); }} className="w-full px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition-all text-sm font-semibold">Order Now</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}