import React from "react";
import { tcmiSummaryCards } from "../data/sectionContent";

const DashboardModule = ({ recentLeads = [], recentPayments = [], upcomingExams = [] }) => (
  <section className="mb-5 rounded-lg border border-gray-200 bg-white p-3">
    <p className="text-[11px] uppercase tracking-[0.16em] text-gray-500">Dashboard Features</p>
    <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
      {tcmiSummaryCards.map((item) => (
        <div key={item.label} className="rounded-lg border border-gray-200 p-3">
          <p className="text-2xl font-semibold">{item.value}</p>
          <p className="mt-1 text-xs uppercase tracking-[0.12em] text-gray-500">{item.label}</p>
          <p className="mt-1 text-xs text-gray-500">{item.hint}</p>
        </div>
      ))}
    </div>
    <div className="mt-4 grid gap-3 lg:grid-cols-3">
      <div className="rounded-lg border border-gray-200 p-3">
        <p className="text-[11px] uppercase tracking-[0.12em] text-gray-500">Recent Leads</p>
        {recentLeads.map((lead) => <p key={lead.id} className="mt-1 text-sm">{lead.name}</p>)}
      </div>
      <div className="rounded-lg border border-gray-200 p-3">
        <p className="text-[11px] uppercase tracking-[0.12em] text-gray-500">Recent Payments</p>
        {recentPayments.map((row) => <p key={row.id} className="mt-1 text-sm">{row.student} · ₹{row.paid}</p>)}
      </div>
      <div className="rounded-lg border border-gray-200 p-3">
        <p className="text-[11px] uppercase tracking-[0.12em] text-gray-500">Upcoming Exams</p>
        {upcomingExams.map((row) => <p key={row.id} className="mt-1 text-sm">{row.examName}</p>)}
      </div>
    </div>
  </section>
);

export default DashboardModule;
