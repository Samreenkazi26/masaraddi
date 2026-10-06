import React from 'react';
import { ShieldCheck, MapPin, Stethoscope, BedDouble, Award } from 'lucide-react';
import { useHospitalData } from '../context/HospitalContext.jsx';

export const TrustStatsBar = () => {
  const { data } = useHospitalData();
  const doctor = data.doctors[0];

  return (
    <section className="relative z-20 -mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-[0_20px_50px_rgba(15,23,42,0.08)] border border-slate-200/80 transition-all duration-300">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 divide-y lg:divide-y-0 lg:divide-x divide-slate-100">
          
          {/* Stat 1: Verified Specialist Doctor */}
          <div className="flex items-center gap-4 pt-4 first:pt-0 lg:pt-0 lg:px-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0">
              <Stethoscope className="w-6 h-6 text-sky-600" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#0B132B] font-outfit">
                DM Neurology
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
                {doctor?.name || 'Dr. Shivkumar Masaraddi'}
              </p>
            </div>
          </div>

          {/* Stat 2: Verified Clinical Experience */}
          <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center shrink-0">
              <Award className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#0B132B] font-outfit">
                {doctor?.experience || '12+ Years'}
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
                Clinical Experience (Since 2014)
              </p>
            </div>
          </div>

          {/* Stat 3: 7 ICU Confirmed in Form */}
          <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0">
              <BedDouble className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#0B132B] font-outfit">
                7 ICU Beds
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
                Patient Care Facilities
              </p>
            </div>
          </div>

          {/* Stat 4: Verified Location */}
          <div className="flex items-center gap-4 pt-4 lg:pt-0 lg:px-4">
            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center shrink-0">
              <MapPin className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#0B132B] font-outfit">
                Bagalkot
              </div>
              <p className="text-xs sm:text-sm font-semibold text-slate-600 mt-0.5">
                Rotary Circle, Navanagar Rd
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
