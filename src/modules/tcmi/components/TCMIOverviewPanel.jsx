import React, { useMemo, useState } from "react";
import { tcmiLeadRows } from "../data/sectionContent";

const fallbackFeaturesByTitle = {
  "Module Dashboard": {
    featureTitle: "Dashboard Features",
    featureCards: [],
  },
  Leads: {
    featureTitle: "Lead Management System",
    featureCards: [
      { title: "Add / Edit Leads", description: "Create and update lead records with counselor assignment." },
      { title: "Lead Status Tracking", description: "Track New, Contacted, Qualified, and Closed stages." },
      { title: "Follow-up Reminders", description: "View due and overdue follow-up reminders by counselor." },
      { title: "Notes & Call Logs", description: "Maintain all call notes and communication history in one timeline." },
      { title: "Convert Lead to Student", description: "Move qualified leads directly to student enrollment flow." },
    ],
  },
};

const statusClass = {
  Hot: "bg-black text-white border-black",
  Warm: "bg-gray-200 text-black border-gray-300",
  Cold: "bg-white text-gray-600 border-gray-300",
};

const TCMIOverviewPanel = ({ content }) => {
  const [openLeadModal, setOpenLeadModal] = useState(false);

  if (!content) {
    return null;
  }

  const fallbackBlock = fallbackFeaturesByTitle[content.title] || { featureCards: [], featureTitle: "Features" };
  const featureCards = Array.isArray(content.featureCards) && content.featureCards.length > 0 ? content.featureCards : fallbackBlock.featureCards;
  const featureTitle = content.featureTitle || fallbackBlock.featureTitle;
  const hasFeatureCards = featureCards.length > 0;
  const isLeads = content.title === "Leads";

  const leadsData = useMemo(() => tcmiLeadRows, []);

  return (
    <section className="rounded-2xl border border-[var(--tcmi-border)] bg-white p-5 lg:p-7">
      <div className="flex flex-col gap-2 border-b border-[var(--tcmi-border)] pb-5">
        <p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Section Overview</p>
        <h3 className="font-heading text-3xl text-[var(--tcmi-text)]">{content.title}</h3>
        <p className="max-w-3xl font-body text-sm text-[var(--tcmi-muted)]">{content.description}</p>
      </div>

      {hasFeatureCards && (
        <div className="mt-5 border-b border-[var(--tcmi-border)] pb-5">
          <p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">{featureTitle}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {featureCards.map((feature) => (
              <article key={feature.title} className="rounded-xl border border-[var(--tcmi-border)] bg-[var(--tcmi-soft)] p-4">
                <p className="font-heading text-lg text-[var(--tcmi-text)]">{feature.title}</p>
                {feature.value && <p className="mt-2 font-heading text-2xl text-[var(--tcmi-text)]">{feature.value}</p>}
                <p className="mt-2 font-body text-xs text-[var(--tcmi-muted)]">{feature.description}</p>
              </article>
            ))}
          </div>
        </div>
      )}

      {isLeads && (
        <div className="mt-5 border-b border-[var(--tcmi-border)] pb-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Lead Actions & Tracking</p>
            <button
              type="button"
              onClick={() => setOpenLeadModal(true)}
              className="rounded-lg border border-black bg-black px-3 py-2 font-body text-xs text-white transition hover:bg-gray-800"
            >
              + Add Lead
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[var(--tcmi-border)]">
            <table className="min-w-full border-collapse">
              <thead className="bg-[var(--tcmi-soft)]">
                <tr className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">
                  <th className="px-3 py-2 text-left">Lead</th>
                  <th className="px-3 py-2 text-left">Source</th>
                  <th className="px-3 py-2 text-left">Status</th>
                  <th className="px-3 py-2 text-left">Follow-up</th>
                  <th className="px-3 py-2 text-left">Notes</th>
                  <th className="px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leadsData.map((lead) => (
                  <tr key={lead.name} className="border-t border-[var(--tcmi-border)] font-body text-sm">
                    <td className="px-3 py-2">{lead.name}</td>
                    <td className="px-3 py-2 text-[var(--tcmi-muted)]">{lead.source}</td>
                    <td className="px-3 py-2">
                      <span className={`rounded-full border px-2 py-1 text-xs ${statusClass[lead.status]}`}>{lead.status}</span>
                    </td>
                    <td className="px-3 py-2">{lead.followUp}</td>
                    <td className="px-3 py-2 text-[var(--tcmi-muted)]">{lead.notes}</td>
                    <td className="px-3 py-2">
                      <div className="flex gap-2">
                        <button className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">View</button>
                        <button className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">Edit</button>
                        <button className="rounded border border-black px-2 py-1 text-xs hover:bg-black hover:text-white">Convert</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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

      {openLeadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-[var(--tcmi-border)] bg-white p-5">
            <div className="mb-4 flex items-center justify-between">
              <h4 className="font-heading text-xl">Add Lead</h4>
              <button onClick={() => setOpenLeadModal(false)} className="rounded border px-2 py-1 text-xs">Close</button>
            </div>
            <p className="font-body text-sm text-[var(--tcmi-muted)]">
              Lead form placeholder added here. Next step: connect form fields to API/create flow.
            </p>
          </div>
        </div>
      )}
    </section>
  );
};

export default TCMIOverviewPanel;
