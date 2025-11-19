import { useState } from "react";

export default function Navbar({ current, onChange }) {
  const tabs = [
    { key: "browse", label: "Browse" },
    { key: "submit", label: "Submit" },
    { key: "profile", label: "My Profile" },
    { key: "recommend", label: "Recommendations" },
  ];
  return (
    <div className="w-full flex items-center justify-between py-4">
      <div className="text-2xl font-bold text-white">Dalilah</div>
      <div className="flex gap-2 bg-slate-800/60 p-1 rounded-lg border border-slate-700/60">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => onChange(t.key)}
            className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
              current === t.key
                ? "bg-blue-500 text-white"
                : "text-blue-200 hover:bg-slate-700/70"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
    </div>
  );
}
