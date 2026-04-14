import React, { useState } from "react";
import { format } from "date-fns";
import { FiEdit2, FiEye, FiPlus } from "react-icons/fi";
import { tcmiCourseCatalog, tcmiFinanceRows, tcmiLeadRows, tcmiStudentRows } from "../data/sectionContent";

const fallbackFeaturesByTitle = {
  "Module Dashboard": { featureTitle: "Dashboard Features", featureCards: [] },
};

const defaultLeadForm = { name: "", source: "", leadPercentage: "", followUp: "", notes: "" };
const defaultStudentForm = {
  name: "",
  dob: "",
  gender: "",
  nationality: "",
  aadhar: "",
  email: "",
  phone: "",
  altPhone: "",
  guardian: "",
  guardianPhone: "",
  address: "",
  courseType: "Certification",
  course: "",
  mode: "Offline",
  batch: "",
  fees: "",
  attendance: "",
  exam: "",
};
const defaultExamForm = { exam: "", attendance: "", marksheetDate: "" };
const defaultFinanceForm = { student: "", totalFee: "", paid: "", discount: "0", installment: "No", date: "" };

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
  const [studentPhotoPreview, setStudentPhotoPreview] = useState("");

  const [examModal, setExamModal] = useState({ open: false, studentId: null });
  const [examForm, setExamForm] = useState(defaultExamForm);
  const [examErrors, setExamErrors] = useState({});

  const [generatedDocs, setGeneratedDocs] = useState({});

  const [financeRows, setFinanceRows] = useState(tcmiFinanceRows);
  const [financeModal, setFinanceModal] = useState(false);
  const [financeForm, setFinanceForm] = useState(defaultFinanceForm);
  const [financeErrors, setFinanceErrors] = useState({});
  const [financeEditModal, setFinanceEditModal] = useState({ open: false, id: null });
  const [financeEditForm, setFinanceEditForm] = useState(defaultFinanceForm);
  const [financeEditErrors, setFinanceEditErrors] = useState({});

  const [courseCards, setCourseCards] = useState(tcmiCourseCatalog);

  if (!content) return null;

  const fallbackBlock = fallbackFeaturesByTitle[content.title] || { featureCards: [], featureTitle: "Features" };
  const featureCards = Array.isArray(content.featureCards) && content.featureCards.length > 0 ? content.featureCards : fallbackBlock.featureCards;
  const featureTitle = content.featureTitle || fallbackBlock.featureTitle;

  const isLeads = content.title === "Leads";
  const isStudents = content.title === "Students";
  const isCourses = content.title === "Courses";
  const isFinance = content.title === "Finance";
  const showFeatureCards = featureCards.length > 0 && !isStudents && !isLeads;

  const selectedStudent = studentRows.find((student) => student.id === selectedStudentId) || studentRows[0];
  const activeLead = leadRows.find((lead) => lead.id === leadModal.leadId);

  const openLeadDialog = (mode, lead = null) => {
    setLeadErrors({});
    setLeadModal({ open: true, mode, leadId: lead?.id || null });
    if (mode === "add") return setLeadForm(defaultLeadForm);
    if (lead) setLeadForm({ name: lead.name, source: lead.source, leadPercentage: String(lead.leadPercentage), followUp: lead.followUp, notes: lead.notes });
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
    const payload = { name: leadForm.name.trim(), source: leadForm.source.trim(), leadPercentage: Number(leadForm.leadPercentage), followUp: leadForm.followUp, notes: leadForm.notes.trim(), converted: false };
    if (leadModal.mode === "add") setLeadRows((prev) => [{ ...payload, id: `LD-${1000 + prev.length + 1}` }, ...prev]);
    else setLeadRows((prev) => prev.map((lead) => (lead.id === leadModal.leadId ? { ...lead, ...payload, converted: lead.converted } : lead)));
    setLeadModal({ open: false, mode: "add", leadId: null });
  };

  const openStudentDialog = (mode, student = null) => {
    setStudentErrors({});
    setStudentModal({ open: true, mode, studentId: student?.id || null });
    if (mode === "add") {
      setStudentPhotoPreview("");
      return setStudentForm(defaultStudentForm);
    }

    if (student) {
      setStudentForm({
        name: student.name || "",
        dob: student.dob || "",
        gender: student.gender || "",
        nationality: student.nationality || "",
        aadhar: student.aadhar || "",
        email: student.email || "",
        phone: student.phone || "",
        altPhone: student.altPhone || "",
        guardian: student.guardian || "",
        guardianPhone: student.guardianPhone || "",
        address: student.address || "",
        courseType: student.courseType || "Certification",
        course: student.course || "",
        mode: student.mode || "Offline",
        batch: student.batch || "",
        fees: student.fees || "",
        attendance: String(student.attendance || "").replace("%", ""),
        exam: student.exam || "",
      });
      setStudentPhotoPreview(student.photo || "");
    }
  };

  const validateStudentForm = () => {
    const errors = {};
    if (!studentForm.name.trim()) errors.name = "Full name is required.";
    if (!studentForm.dob) errors.dob = "Date of birth is required.";
    if (!studentForm.gender) errors.gender = "Gender is required.";
    if (!studentForm.nationality.trim()) errors.nationality = "Nationality is required.";
    if (!studentForm.aadhar.trim()) errors.aadhar = "Aadhar/National ID is required.";
    if (!/^\S+@\S+\.\S+$/.test(studentForm.email)) errors.email = "Valid email is required.";
    if (!studentForm.phone.trim()) errors.phone = "Student mobile is required.";
    if (!studentForm.guardian.trim()) errors.guardian = "Guardian name is required.";
    if (!studentForm.course.trim()) errors.course = "Course assignment is required.";
    if (!studentForm.batch.trim()) errors.batch = "Batch assignment is required.";
    if (!studentForm.fees.trim()) errors.fees = "Fees status is required.";
    const attendanceNum = Number(studentForm.attendance);
    if (studentForm.attendance === "") errors.attendance = "Attendance is required.";
    else if (Number.isNaN(attendanceNum) || attendanceNum < 0 || attendanceNum > 100) errors.attendance = "Attendance must be 0 to 100.";
    if (!studentForm.exam.trim()) errors.exam = "Exam record is required.";
    if (!studentPhotoPreview) errors.photo = "Student photo is required.";

    setStudentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveStudent = () => {
    if (!validateStudentForm()) return;

    const payload = {
      ...studentForm,
      attendance: `${studentForm.attendance}%`,
      idDoc: "Pending",
      formDoc: "Pending",
      photo: studentPhotoPreview,
    };

    if (studentModal.mode === "add") {
      const newId = `STU-${1000 + studentRows.length + 1}`;
      setStudentRows((prev) => [{ id: newId, ...payload }, ...prev]);
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

    setStudentRows((prev) => prev.map((student) => (student.id === examModal.studentId ? { ...student, exam: examForm.exam.trim(), attendance: `${examForm.attendance}%` } : student)));
    setExamModal({ open: false, studentId: null });
  };

  const generateDocument = (studentId, type) => {
    const stamp = format(new Date(), "dd/MM/yy");
    setGeneratedDocs((prev) => ({ ...prev, [studentId]: { ...(prev[studentId] || {}), [type]: `Generated on ${stamp}` } }));
  };


  const openFinanceDialog = () => {
    setFinanceErrors({});
    setFinanceForm({ ...defaultFinanceForm, date: format(new Date(), "yyyy-MM-dd") });
    setFinanceModal(true);
  };

  const saveFinanceEntry = () => {
    const errors = {};
    const totalFee = Number(financeForm.totalFee);
    const paid = Number(financeForm.paid);
    const discount = Number(financeForm.discount || 0);

    if (!financeForm.student.trim()) errors.student = "Student name is required.";
    if (Number.isNaN(totalFee) || totalFee <= 0) errors.totalFee = "Total fee must be greater than 0.";
    if (Number.isNaN(paid) || paid < 0) errors.paid = "Paid amount must be 0 or more.";
    if (Number.isNaN(discount) || discount < 0) errors.discount = "Discount must be 0 or more.";
    if (!financeForm.date) errors.date = "Date is required.";
    if (!errors.totalFee && !errors.paid && !errors.discount && paid + discount > totalFee) {
      errors.paid = "Paid + discount cannot exceed total fee.";
    }

    setFinanceErrors(errors);
    if (Object.keys(errors).length) return;

    const due = Math.max(totalFee - paid - discount, 0);
    const receipt = `REC-${6000 + financeRows.length + 1}`;

    setFinanceRows((prev) => [
      {
        id: `FIN-${1000 + prev.length + 1}`,
        student: financeForm.student.trim(),
        totalFee,
        paid,
        discount,
        installment: financeForm.installment,
        due,
        receipt,
        date: financeForm.date,
      },
      ...prev,
    ]);

    setFinanceModal(false);
  };


  const openFinanceEditDialog = (row) => {
    setFinanceEditErrors({});
    setFinanceEditForm({
      student: row.student,
      totalFee: String(row.totalFee),
      paid: String(row.paid),
      discount: String(row.discount),
      installment: row.installment,
      date: row.date,
    });
    setFinanceEditModal({ open: true, id: row.id });
  };

  const saveFinanceUpdate = () => {
    const errors = {};
    const totalFee = Number(financeEditForm.totalFee);
    const paid = Number(financeEditForm.paid);
    const discount = Number(financeEditForm.discount || 0);

    if (!financeEditForm.student.trim()) errors.student = "Student name is required.";
    if (Number.isNaN(totalFee) || totalFee <= 0) errors.totalFee = "Total fee must be greater than 0.";
    if (Number.isNaN(paid) || paid < 0) errors.paid = "Paid amount must be 0 or more.";
    if (Number.isNaN(discount) || discount < 0) errors.discount = "Discount must be 0 or more.";
    if (!financeEditForm.date) errors.date = "Date is required.";
    if (!errors.totalFee && !errors.paid && !errors.discount && paid + discount > totalFee) {
      errors.paid = "Paid + discount cannot exceed total fee.";
    }

    setFinanceEditErrors(errors);
    if (Object.keys(errors).length) return;

    const due = Math.max(totalFee - paid - discount, 0);

    setFinanceRows((prev) =>
      prev.map((row) =>
        row.id === financeEditModal.id
          ? {
              ...row,
              student: financeEditForm.student.trim(),
              totalFee,
              paid,
              discount,
              installment: financeEditForm.installment,
              due,
              date: financeEditForm.date,
            }
          : row
      )
    );

    setFinanceEditModal({ open: false, id: null });
  };

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setStudentPhotoPreview(reader.result?.toString() || "");
    reader.readAsDataURL(file);
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
          <div className="mb-3 flex items-center justify-between"><p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Lead Actions & Tracking</p><button type="button" onClick={() => openLeadDialog("add")} className="rounded-lg border border-black bg-black px-3 py-2 font-body text-xs text-white transition hover:bg-gray-800">+ Add Lead</button></div>
          <div className="overflow-x-auto rounded-xl border border-[var(--tcmi-border)]"><table className="min-w-full border-collapse"><thead className="bg-[var(--tcmi-soft)]"><tr className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]"><th className="px-3 py-2 text-left">Lead</th><th className="px-3 py-2 text-left">Source</th><th className="px-3 py-2 text-left">Lead %</th><th className="px-3 py-2 text-left">Follow-up</th><th className="px-3 py-2 text-left">Actions</th></tr></thead><tbody>{leadRows.map((lead) => (<tr key={lead.id} className="border-t border-[var(--tcmi-border)] font-body text-sm"><td className="px-3 py-2">{lead.name}</td><td className="px-3 py-2 text-[var(--tcmi-muted)]">{lead.source}</td><td className="px-3 py-2">{lead.leadPercentage}%</td><td className="px-3 py-2">{format(new Date(lead.followUp), "dd/MM/yy")}</td><td className="px-3 py-2"><div className="flex gap-2"><button onClick={() => openLeadDialog("view", lead)} className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">View</button><button onClick={() => openLeadDialog("edit", lead)} className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">Edit</button><button onClick={() => setLeadRows((prev) => prev.map((row) => (row.id === lead.id ? { ...row, converted: true } : row)))} disabled={lead.converted} className="rounded border border-black px-2 py-1 text-xs hover:bg-black hover:text-white disabled:cursor-not-allowed disabled:border-gray-300 disabled:text-gray-400">{lead.converted ? "Converted" : "Convert"}</button></div></td></tr>))}</tbody></table></div>
        </div>
      )}

      {isStudents && (
        <div className="mt-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Student Operations</p><div className="flex gap-2"><button onClick={() => openStudentDialog("add")} className="rounded-lg border border-black bg-black px-3 py-2 text-xs text-white">+ Enroll Student</button>{selectedStudent && <button onClick={() => openExamDialog(selectedStudent)} className="rounded-lg border border-[var(--tcmi-border)] px-3 py-2 text-xs hover:border-black">Create / Edit Exam</button>}</div></div>
          <div className="rounded-xl border border-[var(--tcmi-border)]"><div className="border-b border-[var(--tcmi-border)] bg-[var(--tcmi-soft)] px-4 py-3 font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Detailed Student Table</div><div className="overflow-x-auto"><table className="min-w-full border-collapse"><thead><tr className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]"><th className="px-3 py-2 text-left">Student</th><th className="px-3 py-2 text-left">Course</th><th className="px-3 py-2 text-left">Batch</th><th className="px-3 py-2 text-left">Fees</th><th className="px-3 py-2 text-left">Attendance</th><th className="px-3 py-2 text-left">Exam</th><th className="px-3 py-2 text-left">Actions</th></tr></thead><tbody>{studentRows.map((student) => (<tr key={student.id} className="border-t border-[var(--tcmi-border)] font-body text-sm"><td className="px-3 py-2">{student.name}</td><td className="px-3 py-2">{student.course}</td><td className="px-3 py-2">{student.batch}</td><td className="px-3 py-2">{student.fees}</td><td className="px-3 py-2">{student.attendance}</td><td className="px-3 py-2">{student.exam}</td><td className="px-3 py-2"><div className="flex gap-2"><button onClick={() => { setSelectedStudentId(student.id); setOpenStudentModal(true); }} className="rounded border border-[var(--tcmi-border)] p-2 hover:border-black" aria-label="View profile"><FiEye size={14} /></button><button onClick={() => openStudentDialog("edit", student)} className="rounded border border-[var(--tcmi-border)] p-2 hover:border-black" aria-label="Edit student"><FiEdit2 size={14} /></button></div></td></tr>))}</tbody></table></div></div>
        </div>
      )}

      {isFinance && (
        <div className="mt-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Finance System</p>
            <button onClick={openFinanceDialog} className="rounded-lg border border-black bg-black px-3 py-2 text-xs text-white">+ Add Payment Entry</button>
          </div>

          <div className="flex flex-wrap gap-2">
            {["Track fees & payments", "Installment handling", "Discount management", "Auto receipt generation", "Pending dues tracking"].map((tag) => (
              <span key={tag} className="rounded-full border border-[var(--tcmi-border)] px-3 py-1 text-xs">{tag}</span>
            ))}
          </div>

          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Total Collected", value: `₹${financeRows.reduce((sum, row) => sum + row.paid, 0).toLocaleString()}` },
              { label: "Total Discount", value: `₹${financeRows.reduce((sum, row) => sum + row.discount, 0).toLocaleString()}` },
              { label: "Pending Dues", value: `₹${financeRows.reduce((sum, row) => sum + row.due, 0).toLocaleString()}` },
              { label: "Installment Cases", value: financeRows.filter((row) => row.installment === "Yes").length },
            ].map((card) => (
              <div key={card.label} className="rounded-xl border border-[var(--tcmi-border)] bg-[var(--tcmi-soft)] p-4">
                <p className="text-xs uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">{card.label}</p>
                <p className="mt-2 text-xl font-semibold">{card.value}</p>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto rounded-xl border border-[var(--tcmi-border)]">
            <table className="min-w-full border-collapse">
              <thead className="bg-[var(--tcmi-soft)]">
                <tr className="text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">
                  <th className="px-3 py-2 text-left">Student</th><th className="px-3 py-2 text-left">Total Fee</th><th className="px-3 py-2 text-left">Paid</th><th className="px-3 py-2 text-left">Discount</th><th className="px-3 py-2 text-left">Installment</th><th className="px-3 py-2 text-left">Due</th><th className="px-3 py-2 text-left">Receipt</th><th className="px-3 py-2 text-left">Date</th><th className="px-3 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {financeRows.map((row) => (
                  <tr key={row.id} className="border-t border-[var(--tcmi-border)] text-sm">
                    <td className="px-3 py-2">{row.student}</td><td className="px-3 py-2">₹{row.totalFee.toLocaleString()}</td><td className="px-3 py-2">₹{row.paid.toLocaleString()}</td><td className="px-3 py-2">₹{row.discount.toLocaleString()}</td><td className="px-3 py-2">{row.installment}</td><td className="px-3 py-2">₹{row.due.toLocaleString()}</td><td className="px-3 py-2">{row.receipt}</td><td className="px-3 py-2">{format(new Date(row.date), "dd/MM/yy")}</td><td className="px-3 py-2"><button onClick={() => openFinanceEditDialog(row)} className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">Update Fee</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isCourses && <div className="mt-5"><div className="mb-3 flex items-center justify-between"><p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Course System</p><button type="button" onClick={() => setOpenCourseModal(true)} className="inline-flex items-center gap-1 rounded-lg border border-black bg-black px-3 py-2 font-body text-xs text-white hover:bg-gray-800"><FiPlus size={14} /> Add Course</button></div><div className="mb-3 flex flex-wrap gap-2">{["Certification (Level 1–4)", "Diploma programs", "Duration & fee setup", "Student assignment"].map((tag) => (<span key={tag} className="rounded-full border border-[var(--tcmi-border)] px-3 py-1 font-body text-xs">{tag}</span>))}</div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{courseCards.map((course) => (<article key={course.id} className="rounded-xl border border-[var(--tcmi-border)] bg-white p-4"><p className="font-heading text-lg">{course.title}</p><p className="mt-2 font-body text-xs text-[var(--tcmi-muted)]">{course.type}</p><p className="mt-1 font-body text-sm">Duration: {course.duration}</p><p className="font-body text-sm">Fee: {course.fee}</p><p className="font-body text-xs text-[var(--tcmi-muted)]">{course.assignment}</p><div className="mt-3 flex gap-2"><button className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">Edit</button><button className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">Assign</button></div></article>))}</div></div>}

      {leadModal.open && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-xl rounded-2xl border border-[var(--tcmi-border)] bg-white p-5"><div className="mb-4 flex items-center justify-between border-b border-[var(--tcmi-border)] pb-3"><h4 className="font-heading text-xl">{leadModal.mode === "add" ? "Add Lead" : leadModal.mode === "view" ? "View Lead" : "Edit Lead"}</h4><button onClick={() => setLeadModal({ open: false, mode: "add", leadId: null })} className="rounded border px-2 py-1 text-xs">Close</button></div><div className="grid gap-3 sm:grid-cols-2">{["name", "source", "leadPercentage", "followUp"].map((field) => (<label key={field} className="font-body text-xs text-[var(--tcmi-muted)]">{field === "leadPercentage" ? "Lead Percentage" : field.charAt(0).toUpperCase() + field.slice(1)}<input type={field === "followUp" ? "date" : field === "leadPercentage" ? "number" : "text"} value={leadForm[field]} onChange={(e) => setLeadForm((prev) => ({ ...prev, [field]: e.target.value }))} readOnly={leadModal.mode === "view"} className="mt-1 w-full rounded border border-[var(--tcmi-border)] px-2 py-2 text-sm" />{leadErrors[field] && <p className="mt-1 text-xs text-red-600">{leadErrors[field]}</p>}</label>))}<label className="sm:col-span-2 font-body text-xs text-[var(--tcmi-muted)]">Notes<textarea value={leadForm.notes} onChange={(e) => setLeadForm((prev) => ({ ...prev, notes: e.target.value }))} readOnly={leadModal.mode === "view"} className="mt-1 w-full rounded border border-[var(--tcmi-border)] px-2 py-2 text-sm" rows={3} />{leadErrors.notes && <p className="mt-1 text-xs text-red-600">{leadErrors.notes}</p>}</label></div>{leadModal.mode !== "view" && <div className="mt-4 flex justify-end gap-2"><button onClick={() => setLeadModal({ open: false, mode: "add", leadId: null })} className="rounded border border-[var(--tcmi-border)] px-3 py-2 text-xs">Cancel</button><button onClick={saveLead} className="rounded border border-black bg-black px-3 py-2 text-xs text-white">Save</button></div>}{leadModal.mode === "view" && activeLead?.converted && <p className="mt-3 font-body text-xs text-green-700">This lead is already converted to student.</p>}</div></div>}

      {studentModal.open && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-4xl rounded-2xl border border-[var(--tcmi-border)] bg-white p-5"><div className="mb-4 flex items-center justify-between border-b border-[var(--tcmi-border)] pb-3"><h4 className="font-heading text-xl">{studentModal.mode === "add" ? "Enroll New Student" : "Edit Enrolled Student"}</h4><button onClick={() => setStudentModal({ open: false, mode: "add", studentId: null })} className="rounded border px-2 py-1 text-xs">Close</button></div><div className="grid gap-4 lg:grid-cols-2"><div className="space-y-3"><p className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Student Information</p><label className="block text-xs">Full Name<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.name} onChange={(e) => setStudentForm((p) => ({ ...p, name: e.target.value }))} />{studentErrors.name && <p className="text-xs text-red-600">{studentErrors.name}</p>}</label><label className="block text-xs">Date of Birth<input type="date" className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.dob} onChange={(e) => setStudentForm((p) => ({ ...p, dob: e.target.value }))} />{studentErrors.dob && <p className="text-xs text-red-600">{studentErrors.dob}</p>}</label><label className="block text-xs">Gender<select className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.gender} onChange={(e) => setStudentForm((p) => ({ ...p, gender: e.target.value }))}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select>{studentErrors.gender && <p className="text-xs text-red-600">{studentErrors.gender}</p>}</label><label className="block text-xs">Nationality<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.nationality} onChange={(e) => setStudentForm((p) => ({ ...p, nationality: e.target.value }))} />{studentErrors.nationality && <p className="text-xs text-red-600">{studentErrors.nationality}</p>}</label><label className="block text-xs">Aadhar / National ID<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.aadhar} onChange={(e) => setStudentForm((p) => ({ ...p, aadhar: e.target.value }))} />{studentErrors.aadhar && <p className="text-xs text-red-600">{studentErrors.aadhar}</p>}</label><label className="block text-xs">Student Photo Upload<input type="file" accept="image/*" className="mt-1 w-full rounded border px-2 py-2 text-sm" onChange={handlePhotoChange} />{studentErrors.photo && <p className="text-xs text-red-600">{studentErrors.photo}</p>}</label>{studentPhotoPreview && <img src={studentPhotoPreview} alt="Student" className="h-20 w-20 rounded border object-cover" />}</div><div className="space-y-3"><p className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Contact, Course & Assignment</p><label className="block text-xs">Email<input type="email" className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.email} onChange={(e) => setStudentForm((p) => ({ ...p, email: e.target.value }))} />{studentErrors.email && <p className="text-xs text-red-600">{studentErrors.email}</p>}</label><label className="block text-xs">Student Mobile<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.phone} onChange={(e) => setStudentForm((p) => ({ ...p, phone: e.target.value }))} />{studentErrors.phone && <p className="text-xs text-red-600">{studentErrors.phone}</p>}</label><label className="block text-xs">Alternate Phone<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.altPhone} onChange={(e) => setStudentForm((p) => ({ ...p, altPhone: e.target.value }))} /></label><label className="block text-xs">Guardian Name<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.guardian} onChange={(e) => setStudentForm((p) => ({ ...p, guardian: e.target.value }))} />{studentErrors.guardian && <p className="text-xs text-red-600">{studentErrors.guardian}</p>}</label><label className="block text-xs">Guardian Phone<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.guardianPhone} onChange={(e) => setStudentForm((p) => ({ ...p, guardianPhone: e.target.value }))} /></label><label className="block text-xs">Address<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.address} onChange={(e) => setStudentForm((p) => ({ ...p, address: e.target.value }))} /></label><label className="block text-xs">Course Type<select className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.courseType} onChange={(e) => setStudentForm((p) => ({ ...p, courseType: e.target.value }))}><option>Certification</option><option>Diploma</option></select></label><label className="block text-xs">Assign Course<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.course} onChange={(e) => setStudentForm((p) => ({ ...p, course: e.target.value }))} />{studentErrors.course && <p className="text-xs text-red-600">{studentErrors.course}</p>}</label><label className="block text-xs">Assign Batch<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.batch} onChange={(e) => setStudentForm((p) => ({ ...p, batch: e.target.value }))} />{studentErrors.batch && <p className="text-xs text-red-600">{studentErrors.batch}</p>}</label><label className="block text-xs">Mode<select className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.mode} onChange={(e) => setStudentForm((p) => ({ ...p, mode: e.target.value }))}><option>Offline</option><option>Online</option></select></label><label className="block text-xs">Fees Status<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.fees} onChange={(e) => setStudentForm((p) => ({ ...p, fees: e.target.value }))} />{studentErrors.fees && <p className="text-xs text-red-600">{studentErrors.fees}</p>}</label><label className="block text-xs">Attendance %<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.attendance} onChange={(e) => setStudentForm((p) => ({ ...p, attendance: e.target.value }))} />{studentErrors.attendance && <p className="text-xs text-red-600">{studentErrors.attendance}</p>}</label><label className="block text-xs">Exam Record<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.exam} onChange={(e) => setStudentForm((p) => ({ ...p, exam: e.target.value }))} />{studentErrors.exam && <p className="text-xs text-red-600">{studentErrors.exam}</p>}</label></div></div><div className="mt-4 flex justify-end gap-2"><button onClick={() => setStudentModal({ open: false, mode: "add", studentId: null })} className="rounded border border-[var(--tcmi-border)] px-3 py-2 text-xs">Cancel</button><button onClick={saveStudent} className="rounded border border-black bg-black px-3 py-2 text-xs text-white">Save Student</button></div></div></div>}

      {examModal.open && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-lg rounded-2xl border border-[var(--tcmi-border)] bg-white p-5"><div className="mb-4 flex items-center justify-between border-b pb-3"><h4 className="font-heading text-xl">Create / Edit Exam Record</h4><button onClick={() => setExamModal({ open: false, studentId: null })} className="rounded border px-2 py-1 text-xs">Close</button></div><div className="grid gap-3">{["exam", "attendance", "marksheetDate"].map((field) => (<label key={field} className="font-body text-xs text-[var(--tcmi-muted)]">{field === "marksheetDate" ? "Marksheet Date" : field.charAt(0).toUpperCase() + field.slice(1)}<input type={field === "marksheetDate" ? "date" : "text"} value={examForm[field]} onChange={(e) => setExamForm((prev) => ({ ...prev, [field]: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{examErrors[field] && <p className="text-xs text-red-600">{examErrors[field]}</p>}</label>))}</div><div className="mt-4 flex justify-end gap-2"><button onClick={() => setExamModal({ open: false, studentId: null })} className="rounded border px-3 py-2 text-xs">Cancel</button><button onClick={saveExamRecord} className="rounded border border-black bg-black px-3 py-2 text-xs text-white">Save Exam</button></div></div></div>}

      {openStudentModal && selectedStudent && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-2xl rounded-2xl border border-[var(--tcmi-border)] bg-white p-5"><div className="mb-4 flex items-center justify-between border-b pb-3"><div><p className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Student Profile</p><h4 className="font-heading text-2xl">{selectedStudent.name}</h4></div><button onClick={() => setOpenStudentModal(false)} className="rounded border px-2 py-1 text-xs">Close</button></div><div className="grid gap-3 sm:grid-cols-2 font-body text-sm"><p><span className="text-[var(--tcmi-muted)]">ID:</span> {selectedStudent.id}</p><p><span className="text-[var(--tcmi-muted)]">Email:</span> {selectedStudent.email}</p><p><span className="text-[var(--tcmi-muted)]">Phone:</span> {selectedStudent.phone}</p><p><span className="text-[var(--tcmi-muted)]">Guardian:</span> {selectedStudent.guardian}</p><p><span className="text-[var(--tcmi-muted)]">Address:</span> {selectedStudent.address}</p><p><span className="text-[var(--tcmi-muted)]">Course:</span> {selectedStudent.course}</p><p><span className="text-[var(--tcmi-muted)]">Batch:</span> {selectedStudent.batch}</p><p><span className="text-[var(--tcmi-muted)]">Fees:</span> {selectedStudent.fees}</p><p><span className="text-[var(--tcmi-muted)]">Attendance:</span> {selectedStudent.attendance}</p><p><span className="text-[var(--tcmi-muted)]">Exam:</span> {selectedStudent.exam}</p></div><div className="mt-4 border-t pt-3"><p className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Generate Documents</p><div className="mt-2 flex flex-wrap gap-2"><button onClick={() => generateDocument(selectedStudent.id, "marksheet")} className="rounded border px-2 py-1 text-xs">Generate Marksheet</button><button onClick={() => generateDocument(selectedStudent.id, "idMarksheet")} className="rounded border px-2 py-1 text-xs">Generate ID Marksheet</button></div><p className="mt-2 font-body text-xs text-[var(--tcmi-muted)]">{generatedDocs[selectedStudent.id]?.marksheet || "Marksheet not generated"} · {generatedDocs[selectedStudent.id]?.idMarksheet || "ID marksheet not generated"}</p></div></div></div>}

      {financeModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-lg rounded-2xl border border-[var(--tcmi-border)] bg-white p-5"><div className="mb-4 flex items-center justify-between border-b pb-3"><h4 className="font-heading text-xl">Add Finance Entry</h4><button onClick={() => setFinanceModal(false)} className="rounded border px-2 py-1 text-xs">Close</button></div><div className="grid gap-3">{["student", "totalFee", "paid", "discount", "date"].map((field) => (<label key={field} className="text-xs">{field === "totalFee" ? "Total Fee" : field.charAt(0).toUpperCase() + field.slice(1)}<input type={field === "date" ? "date" : "text"} value={financeForm[field]} onChange={(e) => setFinanceForm((prev) => ({ ...prev, [field]: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{financeErrors[field] && <p className="text-xs text-red-600">{financeErrors[field]}</p>}</label>))}<label className="text-xs">Installment<select value={financeForm.installment} onChange={(e) => setFinanceForm((prev) => ({ ...prev, installment: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm"><option>No</option><option>Yes</option></select></label></div><div className="mt-4 flex justify-end gap-2"><button onClick={() => setFinanceModal(false)} className="rounded border px-3 py-2 text-xs">Cancel</button><button onClick={saveFinanceEntry} className="rounded border border-black bg-black px-3 py-2 text-xs text-white">Save & Generate Receipt</button></div></div></div>}

      {financeEditModal.open && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-lg rounded-2xl border border-[var(--tcmi-border)] bg-white p-5"><div className="mb-4 flex items-center justify-between border-b pb-3"><h4 className="font-heading text-xl">Update Fee Entry</h4><button onClick={() => setFinanceEditModal({ open: false, id: null })} className="rounded border px-2 py-1 text-xs">Close</button></div><div className="grid gap-3">{["student", "totalFee", "paid", "discount", "date"].map((field) => (<label key={field} className="text-xs">{field === "totalFee" ? "Total Fee" : field.charAt(0).toUpperCase() + field.slice(1)}<input type={field === "date" ? "date" : "text"} value={financeEditForm[field]} onChange={(e) => setFinanceEditForm((prev) => ({ ...prev, [field]: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{financeEditErrors[field] && <p className="text-xs text-red-600">{financeEditErrors[field]}</p>}</label>))}<label className="text-xs">Installment<select value={financeEditForm.installment} onChange={(e) => setFinanceEditForm((prev) => ({ ...prev, installment: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm"><option>No</option><option>Yes</option></select></label></div><div className="mt-4 flex justify-end gap-2"><button onClick={() => setFinanceEditModal({ open: false, id: null })} className="rounded border px-3 py-2 text-xs">Cancel</button><button onClick={saveFinanceUpdate} className="rounded border border-black bg-black px-3 py-2 text-xs text-white">Update Fee</button></div></div></div>}

      {openCourseModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-lg rounded-2xl border border-[var(--tcmi-border)] bg-white p-5"><div className="mb-4 flex items-center justify-between"><h4 className="font-heading text-xl">Add Course</h4><button onClick={() => setOpenCourseModal(false)} className="rounded border px-2 py-1 text-xs">Close</button></div><p className="mb-3 font-body text-sm text-[var(--tcmi-muted)]">Click save to add a sample course card. This operation is prepared for full card CRUD in future.</p><button onClick={() => { const next = courseCards.length + 1; setCourseCards((prev) => [...prev, { id: `CRS-${400 + next}`, title: `New Course ${next}`, type: "Certification", duration: "3 months", fee: "₹22,000", assignment: "0 students assigned" }]); setOpenCourseModal(false); }} className="rounded-lg border border-black bg-black px-3 py-2 text-xs text-white">Save Sample Course</button></div></div>}
    </section>
  );
};

export default TCMIOverviewPanel;
