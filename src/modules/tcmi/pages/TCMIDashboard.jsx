import React, { useMemo, useState } from "react";
import ModuleSidebar from "../../core/components/ModuleSidebar";
import { tcmiSections } from "../config/navigation";
import { tcmiExamRows, tcmiFinanceRows, tcmiLeadRows, tcmiSectionContent, tcmiSummaryCards } from "../data/sectionContent";
import TCMIOverviewPanel from "../components/TCMIOverviewPanel";

const TCMIDashboard = () => {
  const [activeSection, setActiveSection] = useState(tcmiSections[0].key);
  const [globalSearch, setGlobalSearch] = useState("");
  const [role, setRole] = useState("Admin");

  const activeContent = useMemo(() => tcmiSectionContent[activeSection], [activeSection]);
  const visibleSections = useMemo(() => tcmiSections.filter((section) => !(role === "Faculty" && section.key === "finance")), [role]);
  const showDashboardStats = activeSection === "dashboard";
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
            <p className="mt-2 max-w-3xl font-body text-sm text-[var(--tcmi-muted)]">
              Minimal and premium operations console for the TCMI business unit. Structured for scale so additional
              modules can plug in without changing the global navbar architecture.
            </p>
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

      {showDashboardStats && (
        <section className="mb-5 rounded-2xl border border-[var(--tcmi-border)] bg-white p-4 lg:p-5">
          <p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Dashboard Features</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {tcmiSummaryCards.map((item) => (
              <div key={item.label} className="rounded-lg border border-[var(--tcmi-border)] bg-[var(--tcmi-soft)] p-4">
                <p className="font-heading text-2xl text-[var(--tcmi-text)]">{item.value}</p>
                <p className="mt-1 font-body text-xs uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">{item.label}</p>
              </div>
            ))}
          </div>
          <div className="mt-4 grid gap-3 lg:grid-cols-3">
            <div className="rounded-lg border border-[var(--tcmi-border)] p-3">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Recent Leads</p>
              {recentLeads.map((lead) => <p key={lead.id} className="mt-1 text-sm">{lead.name} · {lead.source}</p>)}
            </div>
            <div className="rounded-lg border border-[var(--tcmi-border)] p-3">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Recent Payments</p>
              {recentPayments.map((payment) => <p key={payment.id} className="mt-1 text-sm">{payment.student} · ₹{payment.paid}</p>)}
            </div>
            <div className="rounded-lg border border-[var(--tcmi-border)] p-3">
              <p className="text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Upcoming Exams</p>
              {upcomingExams.map((exam) => <p key={exam.id} className="mt-1 text-sm">{exam.examName} · {exam.batch}</p>)}
            </div>
          </div>
        </section>
      )}

      <section className="grid gap-5 lg:grid-cols-[280px_minmax(0,1fr)]">
        <ModuleSidebar
          title="TCMI"
          subtitle="Module Structure"
          sections={visibleSections}
          activeSection={activeSection}
          onSelectSection={setActiveSection}
        />

        <TCMIOverviewPanel content={activeContent} globalSearch={globalSearch} role={role} />
      </section>
    </div>
  );
};

export default TCMIDashboard;
