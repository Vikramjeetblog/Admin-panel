import React from "react";

const ModuleSidebar = ({ title, subtitle, sections, activeSection, onSelectSection }) => {
  return (
    <aside className="rounded-2xl border border-[var(--tcmi-border)] bg-white p-4 lg:p-5">
      <div className="border-b border-[var(--tcmi-border)] pb-4">
        <p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">{subtitle}</p>
        <h2 className="mt-2 font-heading text-2xl text-[var(--tcmi-text)]">{title}</h2>
      </div>

      <nav className="mt-4 space-y-1">
        {sections.map((section, index) => {
          const isActive = activeSection === section.key;
          return (
            <button
              key={section.key}
              type="button"
              onClick={() => onSelectSection(section.key)}
              className={`group flex w-full items-center justify-between rounded-xl border px-3 py-2.5 text-left transition-colors ${
                isActive
                  ? "border-black bg-black text-white"
                  : "border-transparent bg-white text-[var(--tcmi-text)] hover:border-[var(--tcmi-border)] hover:bg-[var(--tcmi-soft)]"
              }`}
            >
              <span className="font-body text-sm">{section.label}</span>
              <span
                className={`font-body text-xs ${isActive ? "text-white" : "text-[var(--tcmi-muted)] group-hover:text-[var(--tcmi-text)]"}`}
              >
                {String(index + 1).padStart(2, "0")}
              </span>
            </button>
          );
        })}
      </nav>
    </aside>
  );
};

export default ModuleSidebar;
