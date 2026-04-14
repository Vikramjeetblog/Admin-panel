import React, { useState } from "react";
import { format } from "date-fns";
import { FiEdit2, FiEye, FiPlus } from "react-icons/fi";
import { tcmiCourseCatalog, tcmiLeadRows, tcmiStudentRows } from "../data/sectionContent";

const fallbackFeaturesByTitle = {
  "Module Dashboard": { featureTitle: "Dashboard Features", featureCards: [] },
};

const defaultLeadForm = { name: "", source: "", leadPercentage: "", followUp: "", notes: "" };
const defaultStudentForm = {
  name: "",
  email: "",
  phone: "",
  guardian: "",
  address: "",
  course: "",
  batch: "",
  fees: "",
  attendance: "",
  exam: "",
};
const defaultExamForm = { exam: "", attendance: "", marksheetDate: "" };

const TCMIOverviewPanel = ({ content }) => {
  const [selectedStudentId, setSelectedStudentId] = useState(tcmiStudentRows[0].id);
  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [openCourseModal, setOpenCourseModal] = useState(false);

  const [leadRows, setLeadRows] = useState(tcmiLeadRows);
  const [leadModal, setLeadModal] = useState({ open: false, mode: "add", leadId: null });
  const [leadForm, setLeadForm] = useState(defaultLeadForm);
  const [leadErrors, setLeadErrors] = useState({});

  const [studentRows, setStudentRows] = useState(tcmiStudentRows);
  const [studentModal, setStudentModal] = useState({ open: false, mode: "add", studentId: null });
  const [studentForm, setStudentForm] = useState(defaultStudentForm);
  const [studentErrors, setStudentErrors] = useState({});

  const [examModal, setExamModal] = useState({ open: false, studentId: null });
  const [examForm, setExamForm] = useState(defaultExamForm);
  const [examErrors, setExamErrors] = useState({});

  const [generatedDocs, setGeneratedDocs] = useState({});

  const [courseCards, setCourseCards] = useState(tcmiCourseCatalog);

  if (!content) return null;

  const fallbackBlock = fallbackFeaturesByTitle[content.title] || { featureCards: [], featureTitle: "Features" };
  const featureCards = Array.isArray(content.featureCards) && content.featureCards.length > 0 ? content.featureCards : fallbackBlock.featureCards;
  const featureTitle = content.featureTitle || fallbackBlock.featureTitle;

  const isLeads = content.title === "Leads";
  const isStudents = content.title === "Students";
  const isCourses = content.title === "Courses";
  const showFeatureCards = featureCards.length > 0 && !isStudents && !isLeads;

  const selectedStudent = studentRows.find((student) => student.id === selectedStudentId) || studentRows[0];
  const activeLead = leadRows.find((lead) => lead.id === leadModal.leadId);

  const openLeadDialog = (mode, lead = null) => {
    setLeadErrors({});
    setLeadModal({ open: true, mode, leadId: lead?.id || null });

    if (mode === "add") return setLeadForm(defaultLeadForm);
    if (lead) {
      setLeadForm({ name: lead.name, source: lead.source, leadPercentage: String(lead.leadPercentage), followUp: lead.followUp, notes: lead.notes });
    }
  };

  const validateLeadForm = () => {
    const errors = {};
    if (!leadForm.name.trim()) errors.name = "Lead name is required.";
    if (!leadForm.source.trim()) errors.source = "Source is required.";

    const percentage = Number(leadForm.leadPercentage);
    if (leadForm.leadPercentage === "") errors.leadPercentage = "Lead percentage is required.";
    else if (Number.isNaN(percentage) || percentage < 0 || percentage > 100) errors.leadPercentage = "Lead percentage must be between 0 and 100.";

    if (!leadForm.followUp) errors.followUp = "Follow-up date is required.";
    if (!leadForm.notes.trim()) errors.notes = "Notes are required.";

    setLeadErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveLead = () => {
    if (!validateLeadForm()) return;

    const payload = {
      name: leadForm.name.trim(),
      source: leadForm.source.trim(),
      leadPercentage: Number(leadForm.leadPercentage),
      followUp: leadForm.followUp,
      notes: leadForm.notes.trim(),
      converted: false,
    };

    if (leadModal.mode === "add") {
      const newLead = { ...payload, id: `LD-${1000 + leadRows.length + 1}` };
      setLeadRows((prev) => [newLead, ...prev]);
    } else {
      setLeadRows((prev) => prev.map((lead) => (lead.id === leadModal.leadId ? { ...lead, ...payload, converted: lead.converted } : lead)));
    }

    setLeadModal({ open: false, mode: "add", leadId: null });
  };

  const convertLead = (leadId) => setLeadRows((prev) => prev.map((lead) => (lead.id === leadId ? { ...lead, converted: true } : lead)));

  const openStudentDialog = (mode, student = null) => {
    setStudentErrors({});
    setStudentModal({ open: true, mode, studentId: student?.id || null });

    if (mode === "add") return setStudentForm(defaultStudentForm);
    if (student) {
      setStudentForm({
        name: student.name,
        email: student.email,
        phone: student.phone,
        guardian: student.guardian,
        address: student.address,
        course: student.course,
        batch: student.batch,
        fees: student.fees,
        attendance: student.attendance,
        exam: student.exam,
      });
    }
  };

  const validateStudentForm = () => {
    const errors = {};
    if (!studentForm.name.trim()) errors.name = "Name is required.";
    if (!/^\S+@\S+\.\S+$/.test(studentForm.email)) errors.email = "Valid email is required.";
    if (!studentForm.phone.trim()) errors.phone = "Phone is required.";
    if (!studentForm.course.trim()) errors.course = "Course is required.";
    if (!studentForm.batch.trim()) errors.batch = "Batch is required.";
    if (!studentForm.fees.trim()) errors.fees = "Fees status is required.";

    const attendanceNum = Number(String(studentForm.attendance).replace("%", ""));
    if (studentForm.attendance === "") errors.attendance = "Attendance is required.";
    else if (Number.isNaN(attendanceNum) || attendanceNum < 0 || attendanceNum > 100) errors.attendance = "Attendance must be 0 to 100.";

    if (!studentForm.exam.trim()) errors.exam = "Exam record is required.";

    setStudentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveStudent = () => {
    if (!validateStudentForm()) return;

    const payload = {
      ...studentForm,
      attendance: String(studentForm.attendance).includes("%") ? String(studentForm.attendance) : `${studentForm.attendance}%`,
      idDoc: "Pending",
      formDoc: "Pending",
    };

    if (studentModal.mode === "add") {
      const newId = `STU-${1000 + studentRows.length + 1}`;
      const newStudent = { id: newId, ...payload };
      setStudentRows((prev) => [newStudent, ...prev]);
      setSelectedStudentId(newId);
    } else {
      setStudentRows((prev) => prev.map((student) => (student.id === studentModal.studentId ? { ...student, ...payload } : student)));
      setSelectedStudentId(studentModal.studentId);
    }

    setStudentModal({ open: false, mode: "add", studentId: null });
  };

  const openExamDialog = (student) => {
    setExamErrors({});
    setExamModal({ open: true, studentId: student.id });
    setExamForm({ exam: student.exam || "", attendance: String(student.attendance || "").replace("%", ""), marksheetDate: format(new Date(), "yyyy-MM-dd") });
  };

  const saveExamRecord = () => {
    const errors = {};
    if (!examForm.exam.trim()) errors.exam = "Exam grade/record is required.";
    const att = Number(examForm.attendance);
    if (examForm.attendance === "") errors.attendance = "Attendance is required.";
    else if (Number.isNaN(att) || att < 0 || att > 100) errors.attendance = "Attendance must be 0 to 100.";
    if (!examForm.marksheetDate) errors.marksheetDate = "Date is required.";

    setExamErrors(errors);
    if (Object.keys(errors).length) return;

    setStudentRows((prev) =>
      prev.map((student) =>
        student.id === examModal.studentId
          ? { ...student, exam: examForm.exam.trim(), attendance: `${examForm.attendance}%` }
          : student
      )
    );

    setExamModal({ open: false, studentId: null });
  };

  const generateDocument = (studentId, type) => {
    const stamp = format(new Date(), "dd/MM/yy");
    setGeneratedDocs((prev) => ({ ...prev, [studentId]: { ...(prev[studentId] || {}), [type]: `Generated on ${stamp}` } }));
  };

  return (
    <section className="rounded-2xl border border-[var(--tcmi-border)] bg-white p-5 lg:p-7">
      <div className="flex flex-col gap-2 border-b border-[var(--tcmi-border)] pb-5">
        <p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Section Overview</p>
        <h3 className="font-heading text-3xl text-[var(--tcmi-text)]">{content.title}</h3>
        {!isLeads && <p className="max-w-3xl font-body text-sm text-[var(--tcmi-muted)]">{content.description}</p>}
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
            <button type="button" onClick={() => openLeadDialog("add")} className="rounded-lg border border-black bg-black px-3 py-2 font-body text-xs text-white transition hover:bg-gray-800">+ Add Lead</button>
          </div>
          <div className="overflow-x-auto rounded-xl border border-[var(--tcmi-border)]">
            <table className="min-w-full border-collapse">
              <thead className="bg-[var(--tcmi-soft)]"><tr className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]"><th className="px-3 py-2 text-left">Lead</th><th className="px-3 py-2 text-left">Source</th><th className="px-3 py-2 text-left">Lead %</th><th className="px-3 py-2 text-left">Follow-up</th><th className="px-3 py-2 text-left">Actions</th></tr></thead>
              <tbody>
                {leadRows.map((lead) => (
                  <tr key={lead.id} className="border-t border-[var(--tcmi-border)] font-body text-sm">
                    <td className="px-3 py-2">{lead.name}</td><td className="px-3 py-2 text-[var(--tcmi-muted)]">{lead.source}</td><td className="px-3 py-2">{lead.leadPercentage}%</td><td className="px-3 py-2">{format(new Date(lead.followUp), "dd/MM/yy")}</td>
                    <td className="px-3 py-2"><div className="flex gap-2"><button onClick={() => openLeadDialog("view", lead)} className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">View</button><button onClick={() => openLeadDialog("edit", lead)} className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">Edit</button><button onClick={() => convertLead(lead.id)} disabled={lead.converted} className="rounded border border-black px-2 py-1 text-xs hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400">{lead.converted ? "Converted" : "Convert"}</button></div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isStudents && (
        <div className="mt-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Student Operations</p>
            <div className="flex gap-2">
              <button onClick={() => openStudentDialog("add")} className="rounded-lg border border-black bg-black px-3 py-2 text-xs text-white">+ Enroll Student</button>
              {selectedStudent && <button onClick={() => openExamDialog(selectedStudent)} className="rounded-lg border border-[var(--tcmi-border)] px-3 py-2 text-xs hover:border-black">Create / Edit Exam</button>}
            </div>
          </div>

          <div className="rounded-xl border border-[var(--tcmi-border)]">
            <div className="border-b border-[var(--tcmi-border)] bg-[var(--tcmi-soft)] px-4 py-3 font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Detailed Student Table</div>
            <div className="overflow-x-auto">
              <table className="min-w-full border-collapse">
                <thead><tr className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]"><th className="px-3 py-2 text-left">Student</th><th className="px-3 py-2 text-left">Course</th><th className="px-3 py-2 text-left">Batch</th><th className="px-3 py-2 text-left">Fees</th><th className="px-3 py-2 text-left">Attendance</th><th className="px-3 py-2 text-left">Exam</th><th className="px-3 py-2 text-left">Actions</th></tr></thead>
                <tbody>
                  {studentRows.map((student) => (
                    <tr key={student.id} className="border-t border-[var(--tcmi-border)] font-body text-sm">
                      <td className="px-3 py-2">{student.name}</td><td className="px-3 py-2">{student.course}</td><td className="px-3 py-2">{student.batch}</td><td className="px-3 py-2">{student.fees}</td><td className="px-3 py-2">{student.attendance}</td><td className="px-3 py-2">{student.exam}</td>
                      <td className="px-3 py-2"><div className="flex gap-2"><button onClick={() => { setSelectedStudentId(student.id); setOpenStudentModal(true); }} className="rounded border border-[var(--tcmi-border)] p-2 hover:border-black" aria-label="View profile"><FiEye size={14} /></button><button onClick={() => openStudentDialog("edit", student)} className="rounded border border-[var(--tcmi-border)] p-2 hover:border-black" aria-label="Edit student"><FiEdit2 size={14} /></button></div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {isCourses && (
        <div className="mt-5">
          <div className="mb-3 flex items-center justify-between"><p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Course System</p><button type="button" onClick={() => setOpenCourseModal(true)} className="inline-flex items-center gap-1 rounded-lg border border-black bg-black px-3 py-2 font-body text-xs text-white hover:bg-gray-800"><FiPlus size={14} /> Add Course</button></div>
          <div className="mb-3 flex flex-wrap gap-2">{["Certification (Level 1–4)", "Diploma programs", "Duration & fee setup", "Student assignment"].map((tag) => (<span key={tag} className="rounded-full border border-[var(--tcmi-border)] px-3 py-1 font-body text-xs">{tag}</span>))}</div>
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{courseCards.map((course) => (<article key={course.id} className="rounded-xl border border-[var(--tcmi-border)] bg-white p-4"><p className="font-heading text-lg">{course.title}</p><p className="mt-2 font-body text-xs text-[var(--tcmi-muted)]">{course.type}</p><p className="mt-1 font-body text-sm">Duration: {course.duration}</p><p className="font-body text-sm">Fee: {course.fee}</p><p className="font-body text-xs text-[var(--tcmi-muted)]">{course.assignment}</p><div className="mt-3 flex gap-2"><button className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">Edit</button><button className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">Assign</button></div></article>))}</div>
        </div>
      )}

      {leadModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-xl rounded-2xl border border-[var(--tcmi-border)] bg-white p-5">
            <div className="mb-4 flex items-center justify-between border-b border-[var(--tcmi-border)] pb-3"><h4 className="font-heading text-xl">{leadModal.mode === "add" ? "Add Lead" : leadModal.mode === "view" ? "View Lead" : "Edit Lead"}</h4><button onClick={() => setLeadModal({ open: false, mode: "add", leadId: null })} className="rounded border px-2 py-1 text-xs">Close</button></div>
            <div className="grid gap-3 sm:grid-cols-2">{["name", "source", "leadPercentage", "followUp"].map((field) => (<label key={field} className="font-body text-xs text-[var(--tcmi-muted)]">{field === "leadPercentage" ? "Lead Percentage" : field.charAt(0).toUpperCase() + field.slice(1)}<input type={field === "followUp" ? "date" : field === "leadPercentage" ? "number" : "text"} value={leadForm[field]} onChange={(e) => setLeadForm((prev) => ({ ...prev, [field]: e.target.value }))} readOnly={leadModal.mode === "view"} className="mt-1 w-full rounded border border-[var(--tcmi-border)] px-2 py-2 text-sm" />{leadErrors[field] && <p className="mt-1 text-xs text-red-600">{leadErrors[field]}</p>}</label>))}<label className="sm:col-span-2 font-body text-xs text-[var(--tcmi-muted)]">Notes<textarea value={leadForm.notes} onChange={(e) => setLeadForm((prev) => ({ ...prev, notes: e.target.value }))} readOnly={leadModal.mode === "view"} className="mt-1 w-full rounded border border-[var(--tcmi-border)] px-2 py-2 text-sm" rows={3} />{leadErrors.notes && <p className="mt-1 text-xs text-red-600">{leadErrors.notes}</p>}</label></div>
            {leadModal.mode !== "view" && <div className="mt-4 flex justify-end gap-2"><button onClick={() => setLeadModal({ open: false, mode: "add", leadId: null })} className="rounded border border-[var(--tcmi-border)] px-3 py-2 text-xs">Cancel</button><button onClick={saveLead} className="rounded border border-black bg-black px-3 py-2 text-xs text-white">Save</button></div>}
            {leadModal.mode === "view" && activeLead?.converted && <p className="mt-3 font-body text-xs text-green-700">This lead is already converted to student.</p>}
          </div>
        </div>
      )}

      {studentModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-[var(--tcmi-border)] bg-white p-5">
            <div className="mb-4 flex items-center justify-between border-b border-[var(--tcmi-border)] pb-3"><h4 className="font-heading text-xl">{studentModal.mode === "add" ? "Enroll New Student" : "Edit Student"}</h4><button onClick={() => setStudentModal({ open: false, mode: "add", studentId: null })} className="rounded border px-2 py-1 text-xs">Close</button></div>
            <div className="grid gap-3 sm:grid-cols-2">{Object.keys(defaultStudentForm).map((field) => (<label key={field} className="font-body text-xs text-[var(--tcmi-muted)]">{field.charAt(0).toUpperCase() + field.slice(1)}<input type={field === "email" ? "email" : "text"} value={studentForm[field]} onChange={(e) => setStudentForm((prev) => ({ ...prev, [field]: e.target.value }))} className="mt-1 w-full rounded border border-[var(--tcmi-border)] px-2 py-2 text-sm" />{studentErrors[field] && <p className="mt-1 text-xs text-red-600">{studentErrors[field]}</p>}</label>))}</div>
            <div className="mt-4 flex justify-end gap-2"><button onClick={() => setStudentModal({ open: false, mode: "add", studentId: null })} className="rounded border border-[var(--tcmi-border)] px-3 py-2 text-xs">Cancel</button><button onClick={saveStudent} className="rounded border border-black bg-black px-3 py-2 text-xs text-white">Save Student</button></div>
          </div>
        </div>
      )}

      {examModal.open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-lg rounded-2xl border border-[var(--tcmi-border)] bg-white p-5">
            <div className="mb-4 flex items-center justify-between border-b border-[var(--tcmi-border)] pb-3"><h4 className="font-heading text-xl">Create / Edit Exam Record</h4><button onClick={() => setExamModal({ open: false, studentId: null })} className="rounded border px-2 py-1 text-xs">Close</button></div>
            <div className="grid gap-3">{["exam", "attendance", "marksheetDate"].map((field) => (<label key={field} className="font-body text-xs text-[var(--tcmi-muted)]">{field === "marksheetDate" ? "Marksheet Date" : field.charAt(0).toUpperCase() + field.slice(1)}<input type={field === "marksheetDate" ? "date" : "text"} value={examForm[field]} onChange={(e) => setExamForm((prev) => ({ ...prev, [field]: e.target.value }))} className="mt-1 w-full rounded border border-[var(--tcmi-border)] px-2 py-2 text-sm" />{examErrors[field] && <p className="mt-1 text-xs text-red-600">{examErrors[field]}</p>}</label>))}</div>
            <div className="mt-4 flex justify-end gap-2"><button onClick={() => setExamModal({ open: false, studentId: null })} className="rounded border border-[var(--tcmi-border)] px-3 py-2 text-xs">Cancel</button><button onClick={saveExamRecord} className="rounded border border-black bg-black px-3 py-2 text-xs text-white">Save Exam</button></div>
          </div>
        </div>
      )}

      {openStudentModal && selectedStudent && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="w-full max-w-2xl rounded-2xl border border-[var(--tcmi-border)] bg-white p-5">
            <div className="mb-4 flex items-center justify-between border-b border-[var(--tcmi-border)] pb-3"><div><p className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Student Profile</p><h4 className="font-heading text-2xl">{selectedStudent.name}</h4></div><button onClick={() => setOpenStudentModal(false)} className="rounded border px-2 py-1 text-xs">Close</button></div>
            <div className="grid gap-3 sm:grid-cols-2 font-body text-sm"><p><span className="text-[var(--tcmi-muted)]">ID:</span> {selectedStudent.id}</p><p><span className="text-[var(--tcmi-muted)]">Email:</span> {selectedStudent.email}</p><p><span className="text-[var(--tcmi-muted)]">Phone:</span> {selectedStudent.phone}</p><p><span className="text-[var(--tcmi-muted)]">Guardian:</span> {selectedStudent.guardian}</p><p><span className="text-[var(--tcmi-muted)]">Address:</span> {selectedStudent.address}</p><p><span className="text-[var(--tcmi-muted)]">Course:</span> {selectedStudent.course}</p><p><span className="text-[var(--tcmi-muted)]">Batch:</span> {selectedStudent.batch}</p><p><span className="text-[var(--tcmi-muted)]">Fees:</span> {selectedStudent.fees}</p><p><span className="text-[var(--tcmi-muted)]">Attendance:</span> {selectedStudent.attendance}</p><p><span className="text-[var(--tcmi-muted)]">Exam:</span> {selectedStudent.exam}</p></div>
            <div className="mt-4 border-t border-[var(--tcmi-border)] pt-3"><p className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Generate Documents</p><div className="mt-2 flex flex-wrap gap-2"><button onClick={() => generateDocument(selectedStudent.id, "marksheet")} className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">Generate Marksheet</button><button onClick={() => generateDocument(selectedStudent.id, "idMarksheet")} className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">Generate ID Marksheet</button></div><p className="mt-2 font-body text-xs text-[var(--tcmi-muted)]">{generatedDocs[selectedStudent.id]?.marksheet || "Marksheet not generated"} · {generatedDocs[selectedStudent.id]?.idMarksheet || "ID marksheet not generated"}</p></div>
          </div>
        </div>
      )}

      {openCourseModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-lg rounded-2xl border border-[var(--tcmi-border)] bg-white p-5"><div className="mb-4 flex items-center justify-between"><h4 className="font-heading text-xl">Add Course</h4><button onClick={() => setOpenCourseModal(false)} className="rounded border px-2 py-1 text-xs">Close</button></div><p className="mb-3 font-body text-sm text-[var(--tcmi-muted)]">Click save to add a sample course card. This operation is prepared for full card CRUD in future.</p><button onClick={() => { const next = courseCards.length + 1; setCourseCards((prev) => [...prev, { id: `CRS-${400 + next}`, title: `New Course ${next}`, type: "Certification", duration: "3 months", fee: "₹22,000", assignment: "0 students assigned" }]); setOpenCourseModal(false); }} className="rounded-lg border border-black bg-black px-3 py-2 text-xs text-white">Save Sample Course</button></div></div>}
    </section>
  );
};

export default TCMIOverviewPanel;
