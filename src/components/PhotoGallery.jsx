import React, { useState, useEffect } from 'react';
import { Camera, Eye, X, ChevronLeft, ChevronRight, Maximize2, Layers, Sparkles } from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const PhotoGallery = () => {
  const { data } = useHospitalData();
  const photos = data.gallery;

  const [selectedImageIndex, setSelectedImageIndex] = useState(null);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loadedImages, setLoadedImages] = useState({});

  const filters = [
    { id: 'all', label: 'All Photos' },
    { id: 'exterior', label: 'Premises' },
    { id: 'consultation', label: 'Consultation' },
    { id: 'patient_care', label: 'ICU & Inpatient' },
    { id: 'facilities', label: 'Facilities' },
    { id: 'diagnostics', label: 'Diagnostics' },
  ];

  const filteredPhotos = activeFilter === 'all'
    ? photos
    : photos.filter((p) => p.category === activeFilter);

  // Keyboard navigation for Lightbox
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') setSelectedImageIndex(null);
      if (e.key === 'ArrowRight') nextPhoto();
      if (e.key === 'ArrowLeft') prevPhoto();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, filteredPhotos.length]);

  const openLightbox = (index) => {
    setSelectedImageIndex(index);
  };

  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };

  const nextPhoto = () => {
    if (selectedImageIndex === null || filteredPhotos.length === 0) return;
    setSelectedImageIndex((selectedImageIndex + 1) % filteredPhotos.length);
  };

  const prevPhoto = () => {
    if (selectedImageIndex === null || filteredPhotos.length === 0) return;
    setSelectedImageIndex(
      (selectedImageIndex - 1 + filteredPhotos.length) % filteredPhotos.length
    );
  };

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="gallery" className="py-24 bg-[#080E1A] text-white relative overflow-hidden">
      {/* Subtle ambient lighting */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-sky-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900 border border-sky-500/30 text-sky-400 text-xs font-bold tracking-wide uppercase shadow-sm">
            <Camera className="w-3.5 h-3.5 text-sky-400" />
            <span>Clinical Environment</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight font-outfit">
            Hospital Facilities &amp; Campus Gallery
          </h2>
          
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
            Take a visual tour of Masaraddi Neuro Care Center in Bagalkot, showcasing our neurology consultation suites, 7 ICU beds, diagnostic support, and patient amenities.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-2">
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setActiveFilter(f.id)}
              className={`px-4 py-2 rounded-2xl text-xs sm:text-sm font-bold transition-all duration-200 cursor-pointer ${
                activeFilter === f.id
                  ? 'bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-lg shadow-sky-600/30 scale-[1.02]'
                  : 'bg-slate-900/90 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {f.label}
              {f.id !== 'all' && (
                <span className="ml-1.5 text-[10px] opacity-75">
                  ({photos.filter((p) => p.category === f.id).length})
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Masonry / Responsive Grid Gallery with Smooth Hover Effects */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredPhotos.map((photo, index) => {
            const isLoaded = loadedImages[photo.id];
            return (
              <div
                key={photo.id}
                onClick={() => openLightbox(index)}
                className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 cursor-pointer shadow-lg hover:border-sky-500/50 hover:shadow-2xl hover:shadow-sky-500/10 transition-all duration-500 flex flex-col aspect-[4/3]"
              >
                {/* Skeleton Loader placeholder */}
                {!isLoaded && (
                  <div className="absolute inset-0 bg-slate-800/80 animate-pulse flex items-center justify-center">
                    <Camera className="w-8 h-8 text-slate-600" />
                  </div>
                )}

                <img
                  src={photo.image}
                  alt={photo.altText || photo.title}
                  className={`w-full h-full object-cover group-hover:scale-108 transition-all duration-700 ease-out ${
                    isLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                  loading="lazy"
                  onLoad={() => handleImageLoad(photo.id)}
                />
                
                {/* Multi-layer Dark Gradient for optimal contrast */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#080E1A] via-[#080E1A]/40 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Top Badge: Category & Expand Icon */}
                <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between pointer-events-none">
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#080E1A]/85 backdrop-blur-md text-sky-300 border border-white/10 shadow-xs">
                    {photo.categoryLabel}
                  </span>
                  
                  <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transform translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-md">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>

                {/* Bottom Caption & Title */}
                <div className="absolute bottom-3.5 inset-x-3.5 space-y-1 pointer-events-none">
                  <h3 className="text-sm font-bold text-white font-outfit group-hover:text-sky-300 transition-colors line-clamp-1">
                    {photo.title}
                  </h3>
                  <p className="text-[11px] text-slate-300 line-clamp-1 opacity-90">
                    {photo.caption}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Gallery Caption Footnote */}
        <div className="mt-14 text-center">
          <p className="text-xs text-slate-400 max-w-xl mx-auto">
            Photographs illustrate clinical infrastructure and facilities designed for patient care at Masaraddi Neuro Care Center, Gouri Layout, Rotary Circle, Bagalkot.
          </p>
        </div>

      </div>

      {/* Lightbox / Fullscreen Preview Modal */}
      {selectedImageIndex !== null && filteredPhotos[selectedImageIndex] && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/95 backdrop-blur-xl animate-in fade-in duration-200">
          
          {/* Top Bar: Counter & Close */}
          <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between max-w-6xl mx-auto">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-xs text-white">
              <span className="text-sky-400 font-bold">{filteredPhotos[selectedImageIndex].categoryLabel}</span>
              <span className="text-slate-500">•</span>
              <span>
                {selectedImageIndex + 1} of {filteredPhotos.length}
              </span>
            </div>

            <button
              onClick={closeLightbox}
              className="p-2.5 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/10"
              aria-label="Close photo preview"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Previous Photo Button */}
          <button
            onClick={prevPhoto}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all z-20 border border-white/10 hover:scale-105 cursor-pointer"
            aria-label="Previous photo"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>

          {/* Next Photo Button */}
          <button
            onClick={nextPhoto}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 p-3 sm:p-4 rounded-full bg-black/50 hover:bg-black/80 text-white transition-all z-20 border border-white/10 hover:scale-105 cursor-pointer"
            aria-label="Next photo"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Image & Caption Container */}
          <div className="max-w-5xl w-full max-h-[85vh] flex flex-col items-center justify-center space-y-4 px-4">
            <div className="relative rounded-3xl overflow-hidden max-h-[68vh] border border-white/10 shadow-2xl bg-black">
              <img
                src={filteredPhotos[selectedImageIndex].image}
                alt={filteredPhotos[selectedImageIndex].altText || filteredPhotos[selectedImageIndex].title}
                className="max-h-[68vh] w-auto max-w-full object-contain mx-auto"
              />
            </div>

            {/* Caption & Title */}
            <div className="text-center space-y-1 max-w-2xl">
              <h3 className="text-base sm:text-lg font-bold text-white font-outfit">
                {filteredPhotos[selectedImageIndex].title}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300">
                {filteredPhotos[selectedImageIndex].caption}
              </p>
            </div>

            {/* Thumbnail Strip */}
            <div className="hidden sm:flex items-center gap-2 overflow-x-auto max-w-full py-2 px-4 bg-white/5 rounded-2xl border border-white/10">
              {filteredPhotos.map((thumb, idx) => (
                <button
                  key={thumb.id}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`w-14 h-10 rounded-lg overflow-hidden shrink-0 transition-all border-2 cursor-pointer ${
                    idx === selectedImageIndex
                      ? 'border-sky-400 scale-105 opacity-100'
                      : 'border-transparent opacity-50 hover:opacity-80'
                  }`}
                  aria-label={`Jump to photo ${idx + 1}`}
                >
                  <img src={thumb.image} alt={thumb.title} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </div>

        </div>
      )}
    </section>
  );
};
