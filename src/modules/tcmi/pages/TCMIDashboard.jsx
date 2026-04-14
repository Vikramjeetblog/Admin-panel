import React, { useMemo, useState } from "react";
import ModuleSidebar from "../../core/components/ModuleSidebar";
import { tcmiSections } from "../config/navigation";
import { tcmiDashboardFeatures, tcmiSectionContent } from "../data/sectionContent";
import TCMIOverviewPanel from "../components/TCMIOverviewPanel";

const TCMIDashboard = () => {
  const [activeSection, setActiveSection] = useState(tcmiSections[0].key);

  const activeContent = useMemo(() => tcmiSectionContent[activeSection], [activeSection]);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <header className="mb-6 rounded-2xl border border-[var(--tcmi-border)] bg-white p-5 lg:p-7">
        <p className="font-body text-[11px] uppercase tracking-[0.18em] text-[var(--tcmi-muted)]">Creatous Collective · Brands · TCMI</p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-heading text-4xl text-[var(--tcmi-text)] lg:text-5xl">TCMI Admin Panel</h1>
            <p className="mt-2 max-w-3xl font-body text-sm text-[var(--tcmi-muted)]">
              Minimal and premium operations console for the TCMI business unit. Structured for scale so additional
              modules can plug in without changing the global navbar architecture.
            </p>
          </div>
          <div className="inline-flex items-center rounded-full border border-[var(--tcmi-border)] px-4 py-2">
            <span className="mr-2 h-2 w-2 rounded-full bg-black" />
            <span className="font-body text-xs uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Live Workspace</span>
          </div>
        </div>
      </header>

      <section className="mb-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {tcmiDashboardFeatures.map((card) => (
          <article key={card.label} className="rounded-2xl border border-[var(--tcmi-border)] bg-white p-4 lg:p-5">
            <p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">{card.label}</p>
            <p className="mt-3 font-heading text-3xl text-[var(--tcmi-text)]">{card.value}</p>
            <p className="mt-2 font-body text-xs text-[var(--tcmi-muted)]">{card.hint}</p>
          </article>
        ))}
      </section>

      <section className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <ModuleSidebar
          title="TCMI"
          subtitle="Module Structure"
          sections={tcmiSections}
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />

        <TCMIOverviewPanel content={activeContent} />
      </section>
    </div>
  );
};

export default TCMIDashboard;
