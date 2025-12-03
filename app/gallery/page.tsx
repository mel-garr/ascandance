'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/Navbar';

// Gallery images - using your actual .png and .jpg files from public folder
const galleryImages = [
  { id: 1, src: '/gallery/2.png', alt: 'Semeta-TRT Image 1' },
  { id: 2, src: '/gallery/3.png', alt: 'Semeta-TRT Image 2' },
  { id: 3, src: '/gallery/4.png', alt: 'Semeta-TRT Image 3' },
  { id: 4, src: '/gallery/5.png', alt: 'Semeta-TRT Image 4' },
  { id: 5, src: '/gallery/6.jpeg', alt: 'Semeta-TRT Image 5' },
  { id: 6, src: '/gallery/7.jpeg', alt: 'Semeta-TRT Image 6' },
  { id: 7, src: '/gallery/7.png', alt: 'Semeta-TRT Image 7' },
  { id: 8, src: '/gallery/8.png', alt: 'Semeta-TRT Image 8' },
  // { id: 9, src: '/gallery/9.png', alt: 'Semeta-TRT Image 9' },
  { id: 10, src: '/gallery/10.png', alt: 'Semeta-TRT Image 10' },
  { id: 11, src: '/gallery/11.png', alt: 'Semeta-TRT Image 11' },
  { id: 12, src: '/gallery/12.png', alt: 'Semeta-TRT Image 12' },
  { id: 13, src: '/gallery/13.png', alt: 'Semeta-TRT Image 13' },
  { id: 14, src: '/gallery/IMG-20250428-WA0005.jpg', alt: 'Semeta-TRT Image 14' },
];

export default function GalleryPage() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navbar alwaysVisible={true} darkText={false} />
      
      <div className="relative w-screen h-screen bg-black text-white overflow-hidden">
        {/* Background gradient effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-50" />
        <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-emerald-500/10 blur-[100px] md:blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/10 blur-[100px] md:blur-[120px] rounded-full" />

        {/* Title */}
        <div className="absolute top-8 md:top-12 left-0 right-0 text-center z-10">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-2 md:mb-3"
          >
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-sm md:text-lg lg:text-xl text-white/70 font-light"
          >
            Explore the Semeta-TRT
          </motion.p>
        </div>

        {/* Main Image Container - Full Width */}
        <div className="absolute inset-0 pt-32 md:pt-40 pb-24 md:pb-32">
          {/* Click areas for navigation */}
          <div 
            className="absolute left-0 w-1/2 h-full cursor-pointer z-10" 
            onClick={prevSlide}
          />
          <div 
            className="absolute right-0 w-1/2 h-full cursor-pointer z-10" 
            onClick={nextSlide}
          />

          {/* Left Navigation Arrow */}
          <div 
            className="absolute left-[5%] md:left-[10%] top-1/2 -translate-y-1/2 z-20 cursor-pointer group" 
            onClick={prevSlide}
          >
            <div className="flex gap-0 items-center text-6xl md:text-8xl font-bold leading-none">
              <span className="text-white/30 group-hover:text-white/50 transition-all duration-300 animate-[pulse_1.5s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }}>‹</span>
              <span className="text-white/50 group-hover:text-white/70 transition-all duration-300 animate-[pulse_1.5s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }}>‹</span>
              <span className="text-white/80 group-hover:text-white transition-all duration-300 animate-[pulse_1.5s_ease-in-out_infinite]">‹</span>
            </div>
          </div>

          {/* Right Navigation Arrow */}
          <div 
            className="absolute right-[5%] md:right-[10%] top-1/2 -translate-y-1/2 z-20 cursor-pointer group" 
            onClick={nextSlide}
          >
            <div className="flex gap-0 items-center text-6xl md:text-8xl font-bold leading-none">
              <span className="text-white/80 group-hover:text-white transition-all duration-300 animate-[pulse_1.5s_ease-in-out_infinite]">›</span>
              <span className="text-white/50 group-hover:text-white/70 transition-all duration-300 animate-[pulse_1.5s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }}>›</span>
              <span className="text-white/30 group-hover:text-white/50 transition-all duration-300 animate-[pulse_1.5s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }}>›</span>
            </div>
          </div>

          {/* Image Display */}
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
            className="w-full h-full flex items-center justify-center px-4 md:px-8 lg:px-16"
          >
            <div className="relative w-full h-full max-w-7xl">
              <img
                src={galleryImages[currentIndex].src}
                alt={galleryImages[currentIndex].alt}
                className="w-full h-full object-contain rounded-xl md:rounded-2xl"
              />
            </div>
          </motion.div>
        </div>

        {/* Pagination Dots */}
        <div className="absolute bottom-6 md:bottom-10 left-1/2 -translate-x-1/2 flex gap-2 md:gap-3 z-20">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-2 md:h-2.5 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-8 md:w-10'
                  : 'bg-white/40 hover:bg-white/60 w-2 md:w-2.5'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}