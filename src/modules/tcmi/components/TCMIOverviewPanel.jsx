import React from "react";

const TCMIOverviewPanel = ({ content, activeSection, dashboardFeatures = [] }) => {
  if (!content) {
    return null;
  }

  const isDashboard = activeSection === "dashboard";

  return (
    <section className="rounded-2xl border border-[var(--tcmi-border)] bg-white p-5 lg:p-7">
      <div className="flex flex-col gap-2 border-b border-[var(--tcmi-border)] pb-5">
        <p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Section Overview</p>
        <h3 className="font-heading text-3xl text-[var(--tcmi-text)]">{content.title}</h3>
        <p className="max-w-3xl font-body text-sm text-[var(--tcmi-muted)]">{content.description}</p>
      </div>

      {isDashboard && (
        <div className="mt-5 border-b border-[var(--tcmi-border)] pb-5">
          <p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Dashboard Features</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {dashboardFeatures.map((feature) => (
              <article key={feature.label} className="rounded-xl border border-[var(--tcmi-border)] bg-white p-4">
                <p className="font-body text-[11px] uppercase tracking-[0.14em] text-[var(--tcmi-muted)]">{feature.label}</p>
                <p className="mt-2 font-heading text-2xl text-[var(--tcmi-text)]">{feature.value}</p>
                <p className="mt-1 font-body text-xs text-[var(--tcmi-muted)]">{feature.hint}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {content.points.map((point) => (
          <article key={point} className="rounded-xl border border-[var(--tcmi-border)] bg-[var(--tcmi-soft)] p-4">
            <p className="font-body text-sm text-[var(--tcmi-text)]">{point}</p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default TCMIOverviewPanel;
