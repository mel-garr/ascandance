'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '@/components/Navbar';

// Gallery images - using your actual .png and .jpg files from public folder
const galleryImages = [
  { id: 1, src: '/Herosection.jpeg', alt: 'Semeta-TRT Hero View' },
  { id: 2, src: '/Herosection.webp', alt: 'Semeta-TRT Hero WebP' },
  { id: 3, src: '/mobile2.png', alt: 'Semeta-TRT Mobile View' },
  { id: 4, src: '/roud.jpg', alt: 'Semeta-TRT On Road' },
  { id: 5, src: '/AboutUs.jpg', alt: 'Semeta-TRT About Us' },
  { id: 6, src: '/contact.png', alt: 'Semeta-TRT Contact' },
];

// Gallery Slider Component
function GallerySlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState<number>(0);
  const [touchEnd, setTouchEnd] = useState<number>(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }

    setTouchStart(0);
    setTouchEnd(0);
  };

  const getSlidePosition = (index: number): string => {
    const diff = index - currentIndex;
    if (diff === 0) return 'center';
    if (diff === 1 || diff === -(galleryImages.length - 1)) return 'right';
    if (diff === -1 || diff === galleryImages.length - 1) return 'left';
    return 'hidden';
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20 md:pt-24">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-gray-900 to-black opacity-50" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 md:w-96 md:h-96 bg-emerald-500/10 blur-[100px] md:blur-[120px] rounded-full" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 md:w-96 md:h-96 bg-blue-500/10 blur-[100px] md:blur-[120px] rounded-full" />

      <div className="relative w-full max-w-7xl px-4">
        {/* Title */}
        <div className="text-center mb-8 md:mb-12 lg:mb-16 z-10 relative">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-3 md:mb-4"
          >
            Gallery
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-base md:text-lg lg:text-xl text-white/70 font-light"
          >
            Explore the Semeta-TRT
          </motion.p>
        </div>

        {/* Slider Container */}
        <div
          className="relative w-full h-[350px] sm:h-[450px] md:h-[500px] lg:h-[600px] flex items-center justify-center mb-12 md:mb-16"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {galleryImages.map((image, index) => {
            const position = getSlidePosition(index);
            
            return (
              <motion.div
                key={image.id}
                className="absolute"
                initial={false}
                animate={{
                  x: position === 'center' ? 0 : position === 'left' ? '-70%' : position === 'right' ? '70%' : 0,
                  scale: position === 'center' ? 1 : 0.65,
                  opacity: position === 'center' ? 1 : position === 'hidden' ? 0 : 0.3,
                  zIndex: position === 'center' ? 10 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: [0.32, 0.72, 0, 1],
                }}
                style={{
                  pointerEvents: position === 'center' ? 'auto' : 'none',
                }}
              >
                <div className="relative w-[240px] h-[240px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] lg:w-[550px] lg:h-[550px]">
                  <motion.div
                    className="w-full h-full rounded-xl md:rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                    whileHover={position === 'center' ? { scale: 1.02 } : {}}
                    transition={{ duration: 0.3 }}
                  >
                    <img
                      src={image.src}
                      alt={image.alt}
                      className="w-full h-full object-cover"
                    />
                  </motion.div>
                  
                  {/* Image caption - only show on center image */}
                  {position === 'center' && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                      className="absolute -bottom-10 sm:-bottom-12 md:-bottom-14 left-0 right-0 text-center px-4"
                    >
                      <p className="text-white text-xs sm:text-sm md:text-base font-light">
                        {image.alt}
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 md:left-8 lg:left-16 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 md:p-4 rounded-full transition-all hover:scale-110 border border-white/20"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 z-20 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 sm:p-3 md:p-4 rounded-full transition-all hover:scale-110 border border-white/20"
          aria-label="Next image"
        >
          <ChevronRight size={20} className="sm:w-6 sm:h-6 md:w-8 md:h-8" />
        </button>

        {/* Pagination Dots */}
        <div className="absolute bottom-4 sm:bottom-6 md:bottom-8 left-1/2 -translate-x-1/2 flex gap-1.5 sm:gap-2 z-20">
          {galleryImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`h-1.5 sm:h-2 rounded-full transition-all ${
                index === currentIndex
                  ? 'bg-white w-6 sm:w-8'
                  : 'bg-white/40 hover:bg-white/60 w-1.5 sm:w-2'
              }`}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

// Main Gallery Page
export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-black">
      <Navbar alwaysVisible={true} darkText={false} />
      <GallerySlider />
    </div>
  );
}