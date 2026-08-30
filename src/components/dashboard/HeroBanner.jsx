import React from "react";

const HeroBanner = ({ title, subtitle, impactLabel, impactScore }) => {
  return (
    <div className="relative overflow-hidden bg-[#108967] rounded-[20px] p-8 mb-8 text-white shadow-[0_8px_30px_rgba(16,137,103,0.25)]">
      {/* Fondo decorativo sutil */}
      <div className="absolute top-0 right-0 w-72 h-72 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

      <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div>
          <h1 className="text-3xl font-bold tracking-tight m-0 text-white">
            {title}
          </h1>
          {subtitle && (
            <p className="text-emerald-50 text-sm mt-2 m-0 font-normal">
              {subtitle}
            </p>
          )}
        </div>

        {impactScore !== undefined && (
          <div className="flex-shrink-0 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-3 px-4 flex flex-col items-start sm:items-end">
            <div className="flex items-center gap-1.5 mb-1">
              <svg className="w-4 h-4 text-emerald-100" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              <span className="text-[10px] uppercase tracking-wider text-emerald-100 font-bold">
                {impactLabel || "Impacto Ambiental"}
              </span>
            </div>
            <span className="text-2xl font-black text-white tracking-tight leading-none">
              {impactScore}
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default HeroBanner;