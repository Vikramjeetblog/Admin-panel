import React from "react";

const toneClass = {
  neutral: "bg-white text-black border-gray-200",
  hot: "bg-gray-100 text-black border-gray-200",
  warm: "bg-gray-50 text-black border-gray-200",
  cold: "bg-white text-gray-700 border-gray-200",
  success: "bg-gray-100 text-black border-gray-200",
  warning: "bg-gray-50 text-black border-gray-200",
  danger: "bg-white text-gray-700 border-gray-200",
};

const Badge = ({ children, tone = "neutral", className = "" }) => (
  <span className={`inline-flex items-center rounded-lg border px-2 py-1 text-xs ${toneClass[tone] || toneClass.neutral} ${className}`}>
    {children}
  </span>
);

export default Badge;
