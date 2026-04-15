import React from "react";

const DashboardModule = ({ recentLeads = [], recentPayments = [], upcomingExams = [] }) => (
  <section className="mb-5 rounded-lg border border-gray-200 bg-white p-3">
    <div className="grid gap-3 lg:grid-cols-3">
      <div className="rounded-lg border border-gray-200 p-3">
        <p className="text-[11px] uppercase tracking-[0.12em] text-gray-500">Dashboard Features</p>
        <div className="mt-2 grid gap-2">
          {["Total Students", "New Leads", "Conversion Rate", "Monthly Revenue", "Pending Fees", "Upcoming Exams"].map((feature, index) => (
            <div key={feature} className="flex items-center gap-3 rounded-lg border border-gray-100 bg-gray-50 px-3 py-2 text-sm">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded-full border border-gray-300 text-xs font-semibold">{index + 1}</span>
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>
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
