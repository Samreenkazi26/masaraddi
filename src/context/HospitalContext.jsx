import React, { createContext, useContext, useState, useEffect } from 'react';
import { hospitalConfig } from '../config/hospitalConfig.js';

const STORAGE_KEY = 'masaraddi_neuro_care_data_v2';

const HospitalContext = createContext(undefined);

export const HospitalProvider = ({ children }) => {
  const [data, setData] = useState(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed === 'object') {
          return {
            ...hospitalConfig,
            ...parsed,
            contact: {
              ...hospitalConfig.contact,
              ...(parsed.contact || {}),
              address: {
                ...hospitalConfig.contact.address,
                ...(parsed.contact?.address || {}),
              },
              timings: {
                ...hospitalConfig.contact.timings,
                ...(parsed.contact?.timings || {}),
              },
            },
            doctors: Array.isArray(parsed.doctors) && parsed.doctors.length > 0 ? parsed.doctors : hospitalConfig.doctors,
            services: Array.isArray(parsed.services) && parsed.services.length > 0 ? parsed.services : hospitalConfig.services,
            facilities: Array.isArray(parsed.facilities) && parsed.facilities.length > 0 ? parsed.facilities : hospitalConfig.facilities,
            gallery: Array.isArray(parsed.gallery) && parsed.gallery.length > 0 ? parsed.gallery : hospitalConfig.gallery,
            heroSlides: Array.isArray(parsed.heroSlides) && parsed.heroSlides.length > 0 ? parsed.heroSlides : hospitalConfig.heroSlides,
          };
        }
      }
    } catch (e) {
      console.warn('Failed to load stored hospital data, using defaults:', e);
    }
    return hospitalConfig;
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {
      console.warn('Failed to save hospital data to localStorage (quota or disabled):', e);
    }
  }, [data]);

  // Image validation and client-side canvas compression
  const processImageFile = async (file) => {
    // 1. Validate file format
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      throw new Error('Invalid image format. Allowed formats: JPG, JPEG, PNG, WEBP.');
    }

    // 2. Validate file size (max 8MB)
    const MAX_BYTES = 8 * 1024 * 1024;
    if (file.size > MAX_BYTES) {
      throw new Error('Image file is too large. Maximum allowed size is 8MB.');
    }

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (readerEvent) => {
        const img = new Image();
        img.onload = () => {
          try {
            // Resize with canvas to max 1600px width/height while keeping aspect ratio
            const maxDimension = 1600;
            let { width, height } = img;
            if (width > maxDimension || height > maxDimension) {
              if (width > height) {
                height = Math.round((height * maxDimension) / width);
                width = maxDimension;
              } else {
                width = Math.round((width * maxDimension) / height);
                height = maxDimension;
              }
            }

            const canvas = document.createElement('canvas');
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            if (!ctx) {
              throw new Error('Canvas context unavailable');
            }

            // High-quality smoothing
            ctx.imageSmoothingEnabled = true;
            ctx.imageSmoothingQuality = 'high';
            ctx.drawImage(img, 0, 0, width, height);

            // Compress as WebP or JPEG
            const compressedDataUrl = canvas.toDataURL('image/webp', 0.85);
            // Rough size calculation
            const compressedLength = Math.round((compressedDataUrl.length * 3) / 4);

            resolve({
              dataUrl: compressedDataUrl,
              originalSize: file.size,
              compressedSize: compressedLength,
              name: file.name,
            });
          } catch (err) {
            reject(err);
          }
        };
        img.onerror = () => reject(new Error('Failed to decode image file.'));
        img.src = readerEvent.target?.result;
      };
      reader.onerror = () => reject(new Error('Failed to read image file.'));
      reader.readAsDataURL(file);
    });
  };

  // Doctors
  const updateDoctor = (id, updated) => {
    setData((prev) => ({
      ...prev,
      doctors: prev.doctors.map((doc) => (doc.id === id ? { ...doc, ...updated } : doc)),
    }));
  };

  const addDoctor = (doctor) => {
    setData((prev) => ({
      ...prev,
      doctors: [...prev.doctors, doctor],
    }));
  };

  const deleteDoctor = (id) => {
    setData((prev) => ({
      ...prev,
      doctors: prev.doctors.filter((doc) => doc.id !== id),
    }));
  };

  // Gallery
  const addGalleryItem = (item) => {
    const newItem = {
      ...item,
      id: `gal-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      gallery: [newItem, ...prev.gallery],
    }));
  };

  const updateGalleryItem = (id, updated) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.map((g) => (g.id === id ? { ...g, ...updated } : g)),
    }));
  };

  const deleteGalleryItem = (id) => {
    setData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((g) => g.id !== id),
    }));
  };

  // Services
  const updateService = (id, updated) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === id ? { ...s, ...updated } : s)),
    }));
  };

  const addService = (service) => {
    const newService = {
      ...service,
      id: `srv-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      services: [...prev.services, newService],
    }));
  };

  const deleteService = (id) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
  };

  // Facilities
  const updateFacility = (id, updated) => {
    setData((prev) => ({
      ...prev,
      facilities: prev.facilities.map((f) => (f.id === id ? { ...f, ...updated } : f)),
    }));
  };

  const addFacility = (facility) => {
    const newFacility = {
      ...facility,
      id: `fac-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      facilities: [...prev.facilities, newFacility],
    }));
  };

  const deleteFacility = (id) => {
    setData((prev) => ({
      ...prev,
      facilities: prev.facilities.filter((f) => f.id !== id),
    }));
  };

  // Hospital Info
  const updateHospitalInfo = (info) => {
    setData((prev) => ({
      ...prev,
      ...(info.hospitalName && { hospitalName: info.hospitalName }),
      ...(info.tagline && { tagline: info.tagline }),
      ...(info.headline && { headline: info.headline }),
      ...(info.supportingText && { supportingText: info.supportingText }),
      ...(info.established && { established: info.established }),
      ...(info.contact && {
        contact: {
          ...prev.contact,
          ...info.contact,
          address: {
            ...prev.contact.address,
            ...(info.contact.address || {}),
          },
          timings: {
            ...prev.contact.timings,
            ...(info.contact.timings || {}),
          },
        },
      }),
    }));
  };

  // Reset to verified defaults
  const resetToDefaults = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (e) {
      console.warn('Failed to clear storage:', e);
    }
    setData(hospitalConfig);
  };

  // Export
  const exportData = () => {
    return JSON.stringify(data, null, 2);
  };

  // Import
  const importData = (jsonString) => {
    try {
      const parsed = JSON.parse(jsonString);
      if (parsed && parsed.hospitalName && Array.isArray(parsed.doctors)) {
        setData(parsed);
        return true;
      }
    } catch (e) {
      console.error('Invalid JSON import:', e);
    }
    return false;
  };

  return (
    <HospitalContext.Provider
      value={{
        data,
        updateDoctor,
        addDoctor,
        deleteDoctor,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        updateService,
        addService,
        deleteService,
        updateFacility,
        addFacility,
        deleteFacility,
        updateHospitalInfo,
        resetToDefaults,
        exportData,
        importData,
        processImageFile,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
};

export const useHospitalData = () => {
  const context = useContext(HospitalContext);
  if (!context) {
    throw new Error('useHospitalData must be used within a HospitalProvider');
  }
  return context;
};
