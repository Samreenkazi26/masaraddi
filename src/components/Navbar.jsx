import React, { useState, useEffect } from 'react';
import { Phone, MessageSquare, Menu, X, MapPin, Activity, ShieldCheck } from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const Navbar = ({ onOpenAdmin }) => {
  const { data } = useHospitalData();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Exactly the 7 navigation links specified in requirements
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Services', href: '#services' },
    { name: 'Doctors', href: '#doctors' },
    { name: 'Facilities', href: '#facilities' },
    { name: 'Gallery', href: '#gallery' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'bg-[#080E1A]/95 backdrop-blur-xl border-b border-slate-800 shadow-lg shadow-black/25 py-2.5'
          : 'bg-[#080E1A]/85 backdrop-blur-md border-b border-white/10 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          
          {/* Hospital Brand Logo */}
          <a
            href="#home"
            className="flex items-center gap-3 group focus:outline-none focus:ring-2 focus:ring-sky-400 rounded-xl p-1"
            aria-label="Masaraddi Neuro Care Center Home"
          >
            {/* Logo Emblem */}
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-sky-500 via-sky-600 to-indigo-600 flex items-center justify-center text-white shadow-md shadow-sky-500/25 group-hover:scale-105 group-hover:shadow-sky-500/40 transition-all duration-300">
              <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-[#080E1A]" />
            </div>
            
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-extrabold tracking-tight text-white text-base sm:text-lg font-outfit uppercase">
                  Masaraddi
                </span>
                <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-sky-500/15 border border-sky-400/30 text-sky-300">
                  Neuro Care
                </span>
              </div>
              
              <div className="flex items-center gap-1.5 text-slate-300 text-[11px] sm:text-xs font-medium">
                <MapPin className="w-3 h-3 text-sky-400 shrink-0" />
                <span>Rotary Circle, Bagalkot</span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links - Exactly 7 items including FAQ */}
          <nav className="hidden lg:flex items-center space-x-1" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3 py-1.5 text-xs xl:text-sm font-semibold text-slate-200 hover:text-sky-300 hover:bg-white/5 rounded-lg transition-all duration-150"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Desktop Action CTAs: Call & WhatsApp */}
          <div className="hidden sm:flex items-center gap-2.5">
            {/* Direct Phone CTA */}
            <a
              href={`tel:${data.contact.phone}`}
              className="inline-flex items-center gap-2 px-4 py-2 text-xs md:text-sm font-bold rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white shadow-md shadow-sky-600/30 transition-all duration-200 hover:scale-[1.02] active:scale-95 border border-sky-300/30"
              aria-label="Call Masaraddi Neuro Care Center"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Hospital</span>
            </a>

            {/* WhatsApp CTA */}
            <a
              href={`https://wa.me/${data.contact.whatsappNumber}?text=${encodeURIComponent(
                data.contact.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-2 text-xs md:text-sm font-semibold rounded-xl bg-emerald-600/20 hover:bg-emerald-600/30 text-emerald-300 hover:text-emerald-200 border border-emerald-500/40 shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-95"
              aria-label="WhatsApp Masaraddi Neuro Care Center"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>

            {/* Staff Portal CTA */}
            {onOpenAdmin && (
              <button
                type="button"
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 px-3 py-2 text-xs md:text-sm font-semibold rounded-xl bg-slate-800/90 hover:bg-slate-700 text-sky-300 hover:text-white border border-slate-700 hover:border-sky-500/50 shadow-sm transition-all duration-200 hover:scale-[1.02] active:scale-95 cursor-pointer"
                title="Open Hospital Staff Portal"
                aria-label="Open Staff Portal"
              >
                <ShieldCheck className="w-3.5 h-3.5 text-sky-400" />
                <span>Staff Portal</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="flex items-center gap-2 lg:hidden">
            <a
              href={`tel:${data.contact.phone}`}
              className="sm:hidden p-2 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white shadow-sm"
              aria-label="Call Hospital"
            >
              <Phone className="w-4 h-4" />
            </a>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-slate-800/80 text-slate-200 hover:text-white border border-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-400"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#080E1A]/98 backdrop-blur-2xl border-b border-slate-800 px-4 pt-3 pb-6 space-y-3 animate-in slide-in-from-top-2 duration-200">
          <div className="grid grid-cols-2 gap-2 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-xs font-semibold text-slate-200 hover:text-sky-300 hover:bg-slate-800/60 rounded-xl transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Mobile Direct Action Buttons: Call & WhatsApp */}
          <div className="pt-2 border-t border-slate-800 grid grid-cols-2 gap-2">
            <a
              href={`tel:${data.contact.phone}`}
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs shadow-md shadow-sky-900/40"
            >
              <Phone className="w-3.5 h-3.5" />
              <span>Call Hospital</span>
            </a>
            <a
              href={`https://wa.me/${data.contact.whatsappNumber}?text=${encodeURIComponent(
                data.contact.whatsappMessage
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-950/80 text-emerald-300 font-semibold text-xs border border-emerald-600/40"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp</span>
            </a>
          </div>

          {onOpenAdmin && (
            <div className="pt-2 border-t border-slate-800/60 text-center">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="text-[11px] text-slate-500 hover:text-slate-300 font-medium inline-flex items-center gap-1.5"
              >
                <ShieldCheck className="w-3 h-3 text-slate-400" />
                <span>Hospital Staff Portal</span>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
};
