import React, { useMemo, useState } from "react";
import ModuleSidebar from "../../core/components/ModuleSidebar";
import { tcmiSections } from "../config/navigation";
import { tcmiExamRows, tcmiFinanceRows, tcmiLeadRows, tcmiSectionContent } from "../data/sectionContent";
import TCMIOverviewPanel from "../components/TCMIOverviewPanel";
import DashboardModule from "../modules/DashboardModule";

const TCMIDashboard = () => {
  const [activeSection, setActiveSection] = useState(tcmiSections[0].key);
  const [globalSearch, setGlobalSearch] = useState("");
  const [role, setRole] = useState("Admin");

  const activeContent = useMemo(() => tcmiSectionContent[activeSection], [activeSection]);
  const visibleSections = useMemo(() => tcmiSections.filter((section) => !(role === "Faculty" && section.key === "finance")), [role]);
  const recentLeads = tcmiLeadRows.slice(0, 3);
  const recentPayments = tcmiFinanceRows.slice(0, 3);
  const upcomingExams = tcmiExamRows.slice(0, 3);

  return (
    <div className="mx-auto w-full max-w-[1440px] px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
      <header className="mb-6 rounded-lg border border-[var(--tcmi-border)] bg-white p-3 lg:p-4">
        <p className="font-body text-[11px] uppercase tracking-[0.18em] text-[var(--tcmi-muted)]">Creatous Collective · Brands · TCMI</p>
        <div className="mt-3 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h1 className="font-heading text-4xl text-[var(--tcmi-text)] lg:text-5xl">TCMI Admin Panel</h1>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <input
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              placeholder="Global search (leads/students)..."
              className="rounded-lg border border-[var(--tcmi-border)] px-3 py-2 text-xs"
            />
            <select value={role} onChange={(e) => setRole(e.target.value)} className="rounded-lg border border-[var(--tcmi-border)] px-3 py-2 text-xs">
              {["Admin", "Counselor", "Faculty", "Accountant"].map((roleOption) => <option key={roleOption}>{roleOption}</option>)}
            </select>
          </div>
        </div>
      </header>

      <section className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <ModuleSidebar
          title="TCMI"
          subtitle="Module Structure"
          sections={visibleSections}
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />

        {activeSection === "dashboard" ? (
          <DashboardModule recentLeads={recentLeads} recentPayments={recentPayments} upcomingExams={upcomingExams} />
        ) : (
          <TCMIOverviewPanel content={activeContent} globalSearch={globalSearch} role={role} />
        )}
      </section>
    </div>
  );
};

export default TCMIDashboard;
