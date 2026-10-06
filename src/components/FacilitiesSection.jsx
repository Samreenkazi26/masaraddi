import React from 'react';
import { 
  Building, 
  BedDouble, 
  Pill, 
  FlaskConical, 
  Activity, 
  Scan, 
  ShieldAlert,
  HeartPulse,
  Stethoscope,
  Zap,
  Phone,
  CheckCircle2
} from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const FacilitiesSection = () => {
  const { data } = useHospitalData();

  const getFacilityIcon = (iconName) => {
    switch (iconName) {
      case 'BedDouble': return BedDouble;
      case 'Pill': return Pill;
      case 'FlaskConical': return FlaskConical;
      case 'Activity': return Activity;
      case 'Scan': return Scan;
      case 'ShieldAlert': return ShieldAlert;
      case 'HeartPulse': return HeartPulse;
      case 'Stethoscope': return Stethoscope;
      case 'Zap': return Zap;
      default: return Building;
    }
  };

  return (
    <section id="facilities" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-sky-50 border border-sky-200 text-sky-800 text-xs font-bold tracking-wide uppercase shadow-sm">
            <Building className="w-3.5 h-3.5 text-sky-600" />
            <span>Hospital Infrastructure in Bagalkot</span>
          </div>
          
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#0B132B] tracking-tight font-outfit">
            Clinical Facilities &amp; Patient Care
          </h2>
          
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Confirmed medical infrastructure supporting comprehensive neurological care, diagnostics, and 7 ICU beds in Bagalkot.
          </p>
        </div>

        {/* Confirmed Facilities Cards Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {data.facilities.map((fac) => {
            const Icon = getFacilityIcon(fac.icon);
            return (
              <div
                key={fac.id}
                className="bg-[#F8FAFC] rounded-3xl p-7 border border-slate-200/80 hover:border-sky-300 hover:shadow-xl hover:shadow-sky-500/5 transition-all duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Icon & Category */}
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-white text-sky-600 border border-slate-200/80 shadow-sm flex items-center justify-center group-hover:bg-sky-600 group-hover:text-white group-hover:border-sky-600 transition-all duration-300">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-bold text-sky-700 bg-sky-100/70 border border-sky-200 px-3 py-1 rounded-full">
                      {fac.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-[#0B132B] font-outfit group-hover:text-sky-600 transition-colors">
                      {fac.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
                      {fac.description}
                    </p>
                  </div>

                  {/* Confirmed Features */}
                  <div className="pt-2 space-y-1.5">
                    {fac.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                        <CheckCircle2 className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card Footnote */}
                <div className="pt-6 mt-6 border-t border-slate-200/60 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Available on-site</span>
                  <a
                    href={`tel:${data.contact.phone}`}
                    className="font-bold text-sky-600 hover:underline flex items-center gap-1"
                  >
                    <span>Inquire</span>
                    <span>&rarr;</span>
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Emergency Care Available Callout */}
        <div className="mt-14 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-sm max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-6 h-6 text-emerald-600" />
            </div>
            <div className="space-y-0.5">
              <h4 className="text-base font-bold text-[#0B132B] font-outfit">
                {data.contact.timings.emergency}
              </h4>
              <p className="text-xs sm:text-sm text-slate-600">
                Contact our hospital desk directly for urgent neurological consultations and inpatient admissions.
              </p>
            </div>
          </div>

          <a
            href={`tel:${data.contact.phone}`}
            className="shrink-0 inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r from-sky-500 to-blue-600 text-white font-bold text-xs shadow-md shadow-sky-600/20 hover:scale-[1.02] transition-all"
          >
            <Phone className="w-4 h-4" />
            <span>Call Hospital Desk</span>
          </a>
        </div>

      </div>
    </section>
  );
};
