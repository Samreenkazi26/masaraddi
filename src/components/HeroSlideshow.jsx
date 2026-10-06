import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Phone, MessageSquare, ChevronLeft, ChevronRight, Pause, Play, MapPin, CheckCircle2, Clock } from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const HeroSlideshow = () => {
  const { data } = useHospitalData();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);
  const timerRef = useRef(null);

  const slides = data.heroSlides;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  }, [slides.length]);

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Auto transition
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        nextSlide();
      }, 5000);
    }
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, nextSlide]);

  // Touch gesture handling
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const minSwipeDistance = 50;

    if (distance > minSwipeDistance) {
      nextSlide();
    } else if (distance < -minSwipeDistance) {
      prevSlide();
    }
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <section
      id="home"
      className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center overflow-hidden bg-[#080E1A] pt-24 pb-16"
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Masaraddi Neuro Care Center Hero Introduction"
    >
      {/* Background Slideshow Layer */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {slides.map((slide, index) => {
          const isActive = index === currentIndex;
          return (
            <div
              key={slide.id}
              className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
              }`}
            >
              <img
                src={slide.url}
                alt={slide.altText}
                className={`w-full h-full object-cover object-center ${
                  isActive ? 'animate-ken-burns' : ''
                }`}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          );
        })}

        {/* Multi-layer Gradient Mesh for Superior Readability */}
        <div className="absolute inset-0 z-20 bg-gradient-to-r from-[#080E1A] via-[#080E1A]/95 to-[#080E1A]/75" />
        <div className="absolute inset-0 z-20 bg-gradient-to-t from-[#080E1A] via-transparent to-[#080E1A]/85" />
        <div className="absolute inset-0 z-20 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-sky-900/25 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Hero Content Layer */}
      <div className="relative z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-12 md:py-20">
        <div className="max-w-3xl space-y-6">
          
          {/* Verified Hospital Information Badge */}
          <div className="inline-flex flex-wrap items-center gap-2.5 px-4 py-2 rounded-full bg-slate-900/90 border border-sky-500/30 backdrop-blur-xl shadow-lg">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white text-xs font-semibold tracking-wide">
              {data.established} &bull; Bagalkot
            </span>
            <span className="text-slate-600 text-xs hidden sm:inline">|</span>
            <div className="hidden sm:flex items-center gap-1.5 text-sky-300 text-xs font-medium">
              <MapPin className="w-3.5 h-3.5 text-sky-400" />
              <span>Gouri Layout, Rotary Circle</span>
            </div>
          </div>

          {/* Main H1 Headline with Local SEO context */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.14] font-outfit">
            Complete Neurological Services. <br />
            <span className="neuro-gradient-text">Neurology Hospital in Bagalkot.</span>
          </h1>

          {/* Supporting Verified Hospital Copy */}
          <p className="text-base sm:text-lg text-slate-200/90 font-normal leading-relaxed max-w-2xl">
            {data.supportingText}
          </p>

          {/* OPD Consultation Timings Display */}
          <div className="p-4 rounded-2xl bg-slate-900/80 border border-sky-500/30 backdrop-blur-md max-w-xl">
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-sky-400 shrink-0 mt-0.5" />
              <div className="space-y-0.5 text-xs sm:text-sm">
                <span className="text-slate-400 font-semibold block">OPD / Consultation Timings:</span>
                <p className="text-white font-bold">
                  {data.contact.timings.opdSlot1} &bull; {data.contact.timings.opdSlot2}
                </p>
                <p className="text-sky-300 text-xs font-medium pt-0.5">
                  Call the hospital to check doctor availability and schedule your visit.
                </p>
              </div>
            </div>
          </div>

          {/* Primary Action Buttons (Call Hospital & WhatsApp Only) */}
          <div className="pt-2 flex flex-wrap items-center gap-3 sm:gap-4">
            {/* Primary Call CTA */}
            <a
              href={`tel:${data.contact.phone}`}
              className="inline-flex items-center justify-center gap-2.5 px-6 py-3.5 rounded-2xl bg-gradient-to-r from-sky-500 via-sky-600 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white font-bold text-sm sm:text-base shadow-xl shadow-sky-600/30 hover:scale-[1.02] active:scale-95 transition-all duration-200 border border-sky-300/30"
              aria-label="Call Masaraddi Neuro Care Center"
            >
              <Phone className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
              <span>Call to Schedule Visit</span>
            </a>

            {/* Secondary WhatsApp CTA */}
            <a
              href={`https://wa.me/${data.contact.whatsappNumber}?text=${encodeURIComponent(
                data.contact.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 px-5 py-3.5 rounded-2xl bg-slate-900/90 hover:bg-slate-800 text-slate-100 font-bold text-sm sm:text-base border border-slate-700/80 backdrop-blur-md shadow-md hover:scale-[1.02] active:scale-95 transition-all duration-200"
              aria-label="WhatsApp Masaraddi Neuro Care Center"
            >
              <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />
              <span>WhatsApp Inquiry</span>
            </a>
          </div>

          {/* Quick Key Highlights Strip */}
          <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 border-t border-slate-800/80 max-w-2xl">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="text-xs text-slate-300 font-medium">7 ICU Beds Available</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="text-xs text-slate-300 font-medium">Stroke &amp; Epilepsy Care</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
              <span className="text-xs text-slate-300 font-medium">Rotary Circle, Navanagar Rd</span>
            </div>
          </div>

        </div>
      </div>

      {/* Slide Navigation Controls */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-0 right-0 z-30 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-1.5 rounded-xl bg-slate-900/80 backdrop-blur-md border border-slate-800 text-xs text-slate-300">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="font-medium text-slate-400">Clinical Facility:</span>
            <span className="text-white font-semibold">{slides[currentIndex]?.tag}</span>
          </div>

          <div className="flex items-center gap-3 bg-slate-900/80 backdrop-blur-xl px-4 py-2 rounded-full border border-slate-800 ml-auto shadow-xl">
            <button
              onClick={prevSlide}
              className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Previous photo"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-1.5" role="tablist" aria-label="Slideshow pagination">
              {slides.map((slide, idx) => (
                <button
                  key={slide.id}
                  onClick={() => goToSlide(idx)}
                  className={`transition-all duration-300 rounded-full cursor-pointer ${
                    idx === currentIndex
                      ? 'w-6 h-2 bg-gradient-to-r from-sky-400 to-blue-500'
                      : 'w-2 h-2 bg-slate-700 hover:bg-slate-500'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                  aria-selected={idx === currentIndex}
                  role="tab"
                />
              ))}
            </div>

            <button
              onClick={nextSlide}
              className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              aria-label="Next photo"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className="p-1 rounded-full text-slate-300 hover:text-white hover:bg-white/10 transition-colors ml-1 cursor-pointer"
              aria-label={isPlaying ? 'Pause slideshow' : 'Play slideshow'}
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};
