import React from 'react';
import { Phone, MessageSquare, MapPin } from 'lucide-react';
import { hospitalConfig } from '../config/hospitalConfig.js';

export const MobileStickyBar = () => {
  return (
    <aside
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#080E1A]/95 backdrop-blur-xl border-t border-slate-800 px-3 py-2 shadow-2xl"
      aria-label="Mobile Quick Hospital Actions"
    >
      <div className="grid grid-cols-3 gap-2 max-w-md mx-auto">
        
        {/* Call Hospital Desk */}
        <a
          href={`tel:${hospitalConfig.contact.phone}`}
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 hover:from-sky-400 hover:to-blue-500 text-white active:scale-95 transition-all text-center border border-sky-400/30 shadow-sm"
          aria-label="Call Hospital Desk"
        >
          <Phone className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">Call Hospital</span>
        </a>

        {/* WhatsApp */}
        <a
          href={`https://wa.me/${hospitalConfig.contact.whatsappNumber}?text=${encodeURIComponent(
            hospitalConfig.contact.whatsappMessage
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-emerald-950/80 hover:bg-emerald-900 text-emerald-300 active:scale-95 transition-all text-center border border-emerald-600/40"
          aria-label="WhatsApp Hospital Desk"
        >
          <MessageSquare className="w-4 h-4 mb-0.5" />
          <span className="text-[11px] font-bold tracking-tight">WhatsApp</span>
        </a>

        {/* Directions */}
        <a
          href={hospitalConfig.contact.googleMapsDirectionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2 px-1 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 active:scale-95 transition-all text-center border border-slate-700/80"
          aria-label="Directions to Bagalkot Hospital"
        >
          <MapPin className="w-4 h-4 text-sky-400 mb-0.5" />
          <span className="text-[11px] font-medium tracking-tight">Directions</span>
        </a>

      </div>
    </aside>
  );
};
