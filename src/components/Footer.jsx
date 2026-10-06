import React from 'react';
import { Phone, MapPin, Mail, MessageSquare, Activity, ShieldCheck, Heart } from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const Footer = ({ onOpenAdmin }) => {
  const { data } = useHospitalData();

  return (
    <footer className="bg-[#080E1A] text-white pt-16 pb-24 md:pb-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800/80">
          
          {/* Col 1: Hospital Branding & Summary */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-lg shadow-sky-500/20">
                <Activity className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-extrabold text-lg text-white font-outfit uppercase tracking-tight block">
                  Masaraddi
                </span>
                <span className="text-sky-400 text-xs font-bold uppercase tracking-wider block">
                  Neuro Care Center
                </span>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Specialized neurological clinical consultations, stroke care, epilepsy management, and 7 ICU beds located at Gouri Layout, Rotary Circle, Navanagar Road, Bagalkot.
            </p>

            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-slate-900 border border-slate-800 text-xs text-slate-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>{data.established}</span>
            </div>
          </div>

          {/* Col 2: Navigation Links (Exact 7 items requested) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <a href="#home" className="hover:text-white transition-colors">Home</a>
              </li>
              <li>
                <a href="#services" className="hover:text-white transition-colors">Services</a>
              </li>
              <li>
                <a href="#doctors" className="hover:text-white transition-colors">Doctors</a>
              </li>
              <li>
                <a href="#facilities" className="hover:text-white transition-colors">Facilities</a>
              </li>
              <li>
                <a href="#gallery" className="hover:text-white transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
              </li>
              <li>
                <a href="#contact" className="hover:text-white transition-colors">Contact</a>
              </li>
            </ul>
          </div>

          {/* Col 3: Specialties */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
              Confirmed Care Areas
            </h4>
            <ul className="space-y-1.5 text-xs text-slate-400">
              <li>• Complete Neurological Services</li>
              <li>• Stroke Care &amp; Rehabilitation</li>
              <li>• Epilepsy &amp; Seizure Care</li>
              <li>• Headache &amp; Migraine Management</li>
              <li>• Peripheral Neuropathy &amp; Nerve Care</li>
              <li>• 7 ICU Patient Observation Beds</li>
            </ul>
          </div>

          {/* Col 4: Contact & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold text-sky-400 uppercase tracking-wider">
              Hospital Contact
            </h4>
            <div className="space-y-2.5 text-xs text-slate-300">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span>{data.contact.address.full}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`tel:${data.contact.phone}`} className="hover:text-sky-300 font-bold">
                  {data.contact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-sky-400 shrink-0" />
                <a href={`mailto:${data.contact.email}`} className="hover:text-sky-300 truncate">
                  {data.contact.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0" />
                <a
                  href={`https://wa.me/${data.contact.whatsappNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-emerald-300"
                >
                  WhatsApp Desk
                </a>
              </div>
            </div>

            {/* Timings */}
            <div className="pt-2 text-[11px] text-slate-400 border-t border-slate-800 space-y-0.5">
              <p>OPD Hours: {data.contact.timings.opd}</p>
              <p className="text-emerald-400 font-semibold">{data.contact.timings.emergency}</p>
            </div>
          </div>

        </div>

        {/* Medical & Legal Disclaimer */}
        <div className="pt-6 pb-2 text-center space-y-3">
          <p className="text-[11px] text-slate-400 max-w-3xl mx-auto leading-relaxed">
            <strong>Medical Disclaimer:</strong> The information published on this website is for patient information and guidance. It does not replace professional medical diagnosis, specialist doctor consultation, or customized treatment plans. Please consult Dr. Shivkumar Masaraddi at Masaraddi Neuro Care Center for personalized clinical care.
          </p>
          
          <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-slate-500 pt-1">
            <span>&copy; {new Date().getFullYear()} Masaraddi Neuro Care Center, Bagalkot. All rights reserved.</span>
            <span>&bull;</span>
            <span>Gouri Layout, Rotary Circle, Navanagar Road, Bagalkot, Karnataka</span>
            {onOpenAdmin && (
              <>
                <span>&bull;</span>
                <button
                  onClick={onOpenAdmin}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-500 hover:text-sky-400 transition-colors cursor-pointer"
                >
                  <ShieldCheck className="w-3 h-3" />
                  <span>Staff Portal</span>
                </button>
              </>
            )}
          </div>

          {/* Development Credit & Contact */}
          <div className="pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-center gap-2 text-[11px] text-slate-400">
            <span>Website designed &amp; developed by <strong className="text-slate-200 font-semibold">ZORAX AI</strong></span>
            <span>&bull;</span>
            <span>Contact: <a href="tel:9481000941" className="text-sky-400 hover:text-sky-300 font-medium underline">9481000941</a></span>
          </div>
        </div>

      </div>
    </footer>
  );
};
