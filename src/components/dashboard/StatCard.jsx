import React from "react";

const StatCard = ({
  label,
  value,
  sub,
  icon,
  accentColor = "border-amber-500",
  iconBg = "bg-amber-100/60",
  iconColor = "text-amber-600",
}) => {
  return (
    <div
      className={`relative overflow-hidden bg-white rounded-[22px] p-6 border-t-4 ${accentColor} shadow-[0_10px_30px_rgba(0,0,0,0.04)] border-x border-b border-gray-100/80 flex flex-col justify-between min-h-[160px]`}
    >
      {/* Contenedor del icono: cuadrado con bordes suavemente redondeados */}
      {icon && (
        <div
          className={`w-10 h-10 rounded-xl ${iconBg} ${iconColor} flex items-center justify-center text-lg mb-4`}
        >
          {icon}
        </div>
      )}

      {/* Textos y número */}
      <div className="flex flex-col">
        <h3 className="text-[34px] font-bold text-[#1e293b] tracking-tight leading-none mb-2">
          {value}
        </h3>
        <p className="text-[12px] font-bold text-[#475569] uppercase tracking-wider m-0 mb-1">
          {label}
        </p>
        {sub && (
          <p className="text-[13px] font-normal text-slate-600 m-0">
            {sub}
          </p>
        )}
      </div>
    </div>
  );
};

export default StatCard;