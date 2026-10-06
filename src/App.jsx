import React, { useState, useEffect } from 'react';
import { ShieldCheck } from 'lucide-react';
import { HospitalProvider } from './context/HospitalContext.jsx';
import { StructuredData } from './components/StructuredData.jsx';
import { Navbar } from './components/Navbar.jsx';
import { HeroSlideshow } from './components/HeroSlideshow.jsx';
import { TrustStatsBar } from './components/TrustStatsBar.jsx';
import { AboutSection } from './components/AboutSection.jsx';
import { ServicesSection } from './components/ServicesSection.jsx';
import { DoctorsSection } from './components/DoctorsSection.jsx';
import { FacilitiesSection } from './components/FacilitiesSection.jsx';
import { PhotoGallery } from './components/PhotoGallery.jsx';
import { FaqSection } from './components/FaqSection.jsx';
import { ContactSection } from './components/ContactSection.jsx';
import { Footer } from './components/Footer.jsx';
import { MobileStickyBar } from './components/MobileStickyBar.jsx';
import { AdminPanel } from './components/admin/AdminPanel.jsx';

class AdminErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Staff Portal Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#080E1A]/95 backdrop-blur-xl">
          <div className="bg-white rounded-3xl max-w-md w-full p-8 shadow-2xl border border-slate-100 text-center space-y-5">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center border border-rose-200">
              <ShieldCheck className="w-7 h-7" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900">Staff Portal Notice</h3>
              <p className="text-xs text-slate-500 mt-1">
                {this.state.error?.message || 'A temporary issue occurred while loading the staff panel.'}
              </p>
            </div>
            <div className="space-y-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  this.setState({ hasError: false, error: null });
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs shadow-md transition-colors cursor-pointer"
              >
                Reload Staff Portal
              </button>
              <button
                type="button"
                onClick={() => {
                  try {
                    localStorage.removeItem('masaraddi_neuro_care_data_v2');
                    sessionStorage.removeItem('masaraddi_admin_auth');
                  } catch (e) {}
                  window.location.reload();
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs transition-colors cursor-pointer"
              >
                Reset Stored Data &amp; Refresh
              </button>
              <button
                type="button"
                onClick={this.props.onClose}
                className="w-full py-2 px-4 text-slate-500 hover:text-slate-800 text-xs font-medium cursor-pointer"
              >
                Close and Return to Website
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Check URL hash, path, or query params for staff portal
  useEffect(() => {
    const checkAdminRoute = () => {
      const hash = (window.location.hash || '').toLowerCase();
      const pathname = (window.location.pathname || '').toLowerCase();
      const search = (window.location.search || '').toLowerCase();

      if (
        hash === '#admin' ||
        hash === '#/admin' ||
        hash === '#staff' ||
        hash === '#/staff' ||
        hash === '#portal' ||
        hash === '#staff-portal' ||
        pathname.endsWith('/admin') ||
        pathname.endsWith('/admin/') ||
        pathname.endsWith('/staff') ||
        pathname.endsWith('/staff/') ||
        pathname.includes('/admin') ||
        pathname.includes('/staff') ||
        search.includes('admin=true') ||
        search.includes('staff=true') ||
        search.includes('portal=true')
      ) {
        setIsAdminOpen(true);
      }
    };

    checkAdminRoute();
    window.addEventListener('hashchange', checkAdminRoute);
    window.addEventListener('popstate', checkAdminRoute);

    // Global helper so user or dev can trigger from console: window.openStaffPortal()
    window.openStaffPortal = () => setIsAdminOpen(true);
    window.closeStaffPortal = () => setIsAdminOpen(false);

    // Keyboard shortcut: Ctrl+Shift+A or Cmd+Shift+A or Alt+A to open Staff Portal
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === 'A' || e.key === 'a' || e.key === 'S' || e.key === 's')) {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', checkAdminRoute);
      window.removeEventListener('popstate', checkAdminRoute);
      window.removeEventListener('keydown', handleKeyDown);
      delete window.openStaffPortal;
      delete window.closeStaffPortal;
    };
  }, []);

  const handleCloseAdmin = () => {
    setIsAdminOpen(false);
    if (window.location.hash.includes('admin') || window.location.hash.includes('staff') || window.location.hash.includes('portal')) {
      try {
        window.history.pushState(null, '', window.location.pathname);
      } catch (e) {
        window.location.hash = '';
      }
    }
  };

  return (
    <HospitalProvider>
      <div className="min-h-screen bg-[#F8FAFC] text-slate-700 flex flex-col selection:bg-sky-500 selection:text-white font-sans">
        {/* Search Engine Structured Data (JSON-LD) */}
        <StructuredData />

        {/* Sticky Header Navigation: Home, Services, Doctors, Facilities, Gallery, FAQ, Contact */}
        <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

        {/* Main Content Area */}
        <main className="flex-1">
          {/* 1. Hero Section with Hospital Photo Slideshow (#home) */}
          <HeroSlideshow />

          {/* 2. Quick Verified Facts & Clinical Bar */}
          <TrustStatsBar />

          {/* 3. Hospital Overview & Clinical Focus */}
          <AboutSection />

          {/* 4. Complete Neurological Services, Stroke & Epilepsy (#services) */}
          <ServicesSection />

          {/* 5. Doctor Profile - Dr. Shivkumar Masaraddi (#doctors) */}
          <DoctorsSection />

          {/* 6. Hospital Infrastructure: 7 ICU, Pharmacy, Lab, Physiotherapy, X-Ray, OT (#facilities) */}
          <FacilitiesSection />

          {/* 7. Upgraded Photo Gallery with Lightbox & Hover Effects (#gallery) */}
          <PhotoGallery />

          {/* 8. Patient FAQ Section (#faq) */}
          <FaqSection />

          {/* 9. Hospital Address, Verified Timings & Contact (#contact) */}
          <ContactSection />
        </main>

        {/* Hospital Footer */}
        <Footer onOpenAdmin={() => setIsAdminOpen(true)} />

        {/* Mobile Sticky Bottom Bar: Call Hospital | WhatsApp | Directions */}
        <MobileStickyBar />

        {/* Floating Quick Access to Staff Portal */}
        {!isAdminOpen && (
          <button
            type="button"
            onClick={() => setIsAdminOpen(true)}
            className="fixed bottom-20 md:bottom-6 right-4 z-40 px-3.5 py-2 rounded-full bg-[#080E1A]/95 hover:bg-[#0B132B] text-sky-300 hover:text-white border border-sky-400/40 shadow-xl backdrop-blur-md text-xs font-bold transition-all duration-200 hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer group"
            title="Open Staff Portal (Manage Doctors, Facilities, Gallery, Services)"
            aria-label="Open Hospital Staff Portal"
          >
            <ShieldCheck className="w-4 h-4 text-sky-400 group-hover:scale-110 transition-transform" />
            <span>Staff Portal</span>
          </button>
        )}

        {/* Live Admin Panel Modal / Fullscreen Portal */}
        {isAdminOpen && (
          <AdminErrorBoundary onClose={handleCloseAdmin}>
            <AdminPanel onClose={handleCloseAdmin} />
          </AdminErrorBoundary>
        )}
      </div>
    </HospitalProvider>
  );
}
