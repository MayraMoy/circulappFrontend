import React from "react";

const SectionCard = ({
  title,
  icon: Icon,
  actionLabel,
  onAction,
  children,
  className = "",
}) => {
  return (
    <div className={`bg-white rounded-2xl border border-gray-100 p-6 shadow-[0_2px_12px_rgb(0,0,0,0.03)] flex flex-col ${className}`}>
      {(title || actionLabel) && (
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            {Icon && (
              <div className="w-9 h-9 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center">
                <Icon />
              </div>
            )}
            {title && (
              <h2 className="text-[15px] font-bold text-gray-800 m-0">
                {title}
              </h2>
            )}
          </div>

          {actionLabel && onAction && (
            <button
              onClick={onAction}
              className="text-sm font-medium text-emerald-700 hover:text-emerald-800 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-700 flex items-center gap-1 bg-transparent border-0 cursor-pointer p-0"
            >
              {actionLabel}
            </button>
          )}
        </div>
      )}

      <div className="flex-1">{children}</div>
    </div>
  );
};

export default SectionCard;