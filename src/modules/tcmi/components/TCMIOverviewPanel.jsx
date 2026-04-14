import React, { useMemo, useState } from "react";
import { FiEye, FiPlus } from "react-icons/fi";
import { tcmiCourseCatalog, tcmiLeadRows, tcmiStudentRows } from "../data/sectionContent";

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
  const [selectedStudentId, setSelectedStudentId] = useState(tcmiStudentRows[0].id);
  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [openCourseModal, setOpenCourseModal] = useState(false);
  const [courseCards, setCourseCards] = useState(tcmiCourseCatalog);

  if (!content) {
    return null;
  }

  const fallbackBlock = fallbackFeaturesByTitle[content.title] || { featureCards: [], featureTitle: "Features" };
  const featureCards = Array.isArray(content.featureCards) && content.featureCards.length > 0 ? content.featureCards : fallbackBlock.featureCards;
  const featureTitle = content.featureTitle || fallbackBlock.featureTitle;
  const isLeads = content.title === "Leads";
  const isStudents = content.title === "Students";
  const isCourses = content.title === "Courses";
  const showFeatureCards = featureCards.length > 0 && !isStudents;

  const leadsData = useMemo(() => tcmiLeadRows, []);
  const studentsData = useMemo(() => tcmiStudentRows, []);
  const selectedStudent = studentsData.find((student) => student.id === selectedStudentId) || studentsData[0];

  return (
    <section className="rounded-2xl border border-[var(--tcmi-border)] bg-white p-5 lg:p-7">
      <div className="flex flex-col gap-2 border-b border-[var(--tcmi-border)] pb-5">
        <p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Section Overview</p>
        <h3 className="font-heading text-3xl text-[var(--tcmi-text)]">{content.title}</h3>
        <p className="max-w-3xl font-body text-sm text-[var(--tcmi-muted)]">{content.description}</p>
      </div>

      {showFeatureCards && (
        <div className="mt-5 border-b border-[var(--tcmi-border)] pb-5">
          <p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">{featureTitle}</p>
          <div className="mt-3 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {featureCards.map((feature) => (
              <article key={feature.title} className="rounded-xl border border-[var(--tcmi-border)] bg-[var(--tcmi-soft)] p-4">
                <p className="font-heading text-lg text-[var(--tcmi-text)]">{feature.title}</p>
                {feature.value && <p className="mt-2 font-heading text-2xl text-[var(--tcmi-text)]">{feature.value}</p>}
                {feature.description && <p className="mt-2 font-body text-xs text-[var(--tcmi-muted)]">{feature.description}</p>}
              </article>
            ))}
          </div>
        </div>
      )}

      {isLeads && (
        <div className="mt-5 border-b border-[var(--tcmi-border)] pb-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Lead Actions & Tracking</p>
            <button type="button" onClick={() => setOpenLeadModal(true)} className="rounded-lg border border-black bg-black px-3 py-2 font-body text-xs text-white transition hover:bg-gray-800">
              + Add Lead
            </button>
          </div>
          <div className="overflow-x-auto rounded-xl border border-[var(--tcmi-border)]">
            <table className="min-w-full border-collapse">
              <thead className="bg-[var(--tcmi-soft)]">
                <tr className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">
                  <th className="px-3 py-2 text-left">Lead</th><th className="px-3 py-2 text-left">Source</th><th className="px-3 py-2 text-left">Status</th><th className="px-3 py-2 text-left">Follow-up</th><th className="px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {leadsData.map((lead) => (
                  <tr key={lead.name} className="border-t border-[var(--tcmi-border)] font-body text-sm">
                    <td className="px-3 py-2">{lead.name}</td><td className="px-3 py-2 text-[var(--tcmi-muted)]">{lead.source}</td>
                    <td className="px-3 py-2"><span className={`rounded-full border px-2 py-1 text-xs ${statusClass[lead.status]}`}>{lead.status}</span></td>
                    <td className="px-3 py-2">{lead.followUp}</td>
                    <td className="px-3 py-2"><div className="flex gap-2"><button className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">View</button><button className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">Edit</button><button className="rounded border border-black px-2 py-1 text-xs hover:bg-black hover:text-white">Convert</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isStudents && selectedStudent && (
        <div className="mt-5 rounded-xl border border-[var(--tcmi-border)]">
          <div className="border-b border-[var(--tcmi-border)] bg-[var(--tcmi-soft)] px-4 py-3 font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Detailed Student Table</div>
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse">
              <thead><tr className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]"><th className="px-3 py-2 text-left">Student</th><th className="px-3 py-2 text-left">Course</th><th className="px-3 py-2 text-left">Batch</th><th className="px-3 py-2 text-left">Fees</th><th className="px-3 py-2 text-left">Attendance</th><th className="px-3 py-2 text-left">Exam</th><th className="px-3 py-2 text-left">Profile</th></tr></thead>
              <tbody>
                {studentsData.map((student) => (
                  <tr key={student.id} className="border-t border-[var(--tcmi-border)] font-body text-sm">
                    <td className="px-3 py-2">{student.name}</td><td className="px-3 py-2">{student.course}</td><td className="px-3 py-2">{student.batch}</td><td className="px-3 py-2">{student.fees}</td><td className="px-3 py-2">{student.attendance}</td><td className="px-3 py-2">{student.exam}</td>
                    <td className="px-3 py-2"><button onClick={() => { setSelectedStudentId(student.id); setOpenStudentModal(true); }} className="rounded border border-[var(--tcmi-border)] p-2 hover:border-black" aria-label="Open profile"><FiEye size={14} /></button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isCourses && (
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between">
            <p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Course System</p>
            <button type="button" onClick={() => setOpenCourseModal(true)} className="inline-flex items-center gap-1 rounded-lg border border-black bg-black px-3 py-2 font-body text-xs text-white hover:bg-gray-800"><FiPlus size={14} /> Add Course</button>
          </div>
          <div className="mb-3 flex flex-wrap gap-2">
            {["Certification (Level 1–4)", "Diploma programs", "Duration & fee setup", "Student assignment"].map((tag) => (
              <span key={tag} className="rounded-full border border-[var(--tcmi-border)] px-3 py-1 font-body text-xs">{tag}</span>
            ))}
          </div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {courseCards.map((course) => (
              <article key={course.id} className="rounded-xl border border-[var(--tcmi-border)] bg-white p-4">
                <p className="font-heading text-lg">{course.title}</p>
                <p className="mt-2 font-body text-xs text-[var(--tcmi-muted)]">{course.type}</p>
                <p className="mt-1 font-body text-sm">Duration: {course.duration}</p>
                <p className="font-body text-sm">Fee: {course.fee}</p>
                <p className="font-body text-xs text-[var(--tcmi-muted)]">{course.assignment}</p>
                <div className="mt-3 flex gap-2">
                  <button className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">Edit</button>
                  <button className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">Assign</button>
                </div>
              </article>
            ))}
          </div>
        </div>
      )}

      {openLeadModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-lg rounded-2xl border border-[var(--tcmi-border)] bg-white p-5"><div className="mb-4 flex items-center justify-between"><h4 className="font-heading text-xl">Add Lead</h4><button onClick={() => setOpenLeadModal(false)} className="rounded border px-2 py-1 text-xs">Close</button></div><p className="font-body text-sm text-[var(--tcmi-muted)]">Lead form placeholder added here. Next step: connect form fields to API/create flow.</p></div></div>}

      {openStudentModal && selectedStudent && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-2xl rounded-2xl border border-[var(--tcmi-border)] bg-white p-5"><div className="mb-4 flex items-center justify-between border-b border-[var(--tcmi-border)] pb-3"><div><p className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Student Profile</p><h4 className="font-heading text-2xl">{selectedStudent.name}</h4></div><button onClick={() => setOpenStudentModal(false)} className="rounded border px-2 py-1 text-xs">Close</button></div><div className="grid gap-3 sm:grid-cols-2 font-body text-sm"><p><span className="text-[var(--tcmi-muted)]">ID:</span> {selectedStudent.id}</p><p><span className="text-[var(--tcmi-muted)]">Email:</span> {selectedStudent.email}</p><p><span className="text-[var(--tcmi-muted)]">Phone:</span> {selectedStudent.phone}</p><p><span className="text-[var(--tcmi-muted)]">Guardian:</span> {selectedStudent.guardian}</p><p><span className="text-[var(--tcmi-muted)]">Address:</span> {selectedStudent.address}</p><p><span className="text-[var(--tcmi-muted)]">Course:</span> {selectedStudent.course}</p><p><span className="text-[var(--tcmi-muted)]">Batch:</span> {selectedStudent.batch}</p><p><span className="text-[var(--tcmi-muted)]">Fees:</span> {selectedStudent.fees}</p><p><span className="text-[var(--tcmi-muted)]">Attendance:</span> {selectedStudent.attendance}</p><p><span className="text-[var(--tcmi-muted)]">Exam:</span> {selectedStudent.exam}</p></div><div className="mt-4 border-t border-[var(--tcmi-border)] pt-3"><p className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Documents Upload</p><div className="mt-2 flex flex-wrap gap-2"><button className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">Upload ID</button><button className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">Upload Form</button></div><p className="mt-2 font-body text-xs text-[var(--tcmi-muted)]">ID: {selectedStudent.idDoc} · Form: {selectedStudent.formDoc}</p></div></div></div>}

      {openCourseModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-lg rounded-2xl border border-[var(--tcmi-border)] bg-white p-5"><div className="mb-4 flex items-center justify-between"><h4 className="font-heading text-xl">Add Course</h4><button onClick={() => setOpenCourseModal(false)} className="rounded border px-2 py-1 text-xs">Close</button></div><p className="mb-3 font-body text-sm text-[var(--tcmi-muted)]">Click save to add a sample course card. This operation is prepared for full card CRUD in future.</p><button onClick={() => { const next = courseCards.length + 1; setCourseCards((prev) => [...prev, { id: `CRS-${400 + next}`, title: `New Course ${next}`, type: "Certification", duration: "3 months", fee: "₹22,000", assignment: "0 students assigned" }]); setOpenCourseModal(false); }} className="rounded-lg border border-black bg-black px-3 py-2 text-xs text-white">Save Sample Course</button></div></div>}
    </section>
  );
};

export default TCMIOverviewPanel;
