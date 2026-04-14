import React, { useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import { FiDownload, FiEdit2, FiEye, FiPlus, FiTrash2 } from "react-icons/fi";
import { tcmiAttendanceRows, tcmiBatchRows, tcmiCertificateRows, tcmiCourseCatalog, tcmiDocumentRows, tcmiExamRows, tcmiFinanceRows, tcmiStudentRows } from "../data/sectionContent";
import LeadsModule from "../modules/LeadsModule";

const fallbackFeaturesByTitle = {
  "Module Dashboard": { featureTitle: "Dashboard Features", featureCards: [] },
};

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
};
const defaultFinanceForm = { student: "", totalFee: "", paid: "", discount: "0", installment: "No", date: "" };
const defaultBatchForm = {
  batchName: "",
  course: "",
  trainer: "",
  students: "",
  schedule: "",
  mode: "Offline",
};
const defaultAttendanceForm = { date: "", batch: "", student: "", status: "Present" };
const defaultExamModuleForm = { examName: "", batch: "", student: "", theoryMarks: "", practicalMarks: "", examDate: "" };
const defaultCertificateForm = { student: "", batch: "", type: "Certificate", grade: "", issueDate: "" };
const defaultDocumentForm = { student: "", batch: "", docType: "Registration Form", fileName: "", uploadedOn: "" };

const TCMIOverviewPanel = ({ content, globalSearch = "", role = "Admin" }) => {
  const [selectedStudentId, setSelectedStudentId] = useState(tcmiStudentRows[0].id);
  const [openStudentModal, setOpenStudentModal] = useState(false);
  const [openCourseModal, setOpenCourseModal] = useState(false);

  const [studentRows, setStudentRows] = useState(tcmiStudentRows);
  const [studentModal, setStudentModal] = useState({ open: false, mode: "add", studentId: null });
  const [studentForm, setStudentForm] = useState(defaultStudentForm);
  const [studentErrors, setStudentErrors] = useState({});
  const [studentPhotoPreview, setStudentPhotoPreview] = useState("");

  const [generatedDocs, setGeneratedDocs] = useState({});

  const [financeRows, setFinanceRows] = useState(tcmiFinanceRows);
  const [financeModal, setFinanceModal] = useState(false);
  const [financeForm, setFinanceForm] = useState(defaultFinanceForm);
  const [financeErrors, setFinanceErrors] = useState({});
  const [financeEditModal, setFinanceEditModal] = useState({ open: false, id: null });
  const [financeEditForm, setFinanceEditForm] = useState(defaultFinanceForm);
  const [financeEditErrors, setFinanceEditErrors] = useState({});

  const [courseCards, setCourseCards] = useState(tcmiCourseCatalog);
  const [batchRows, setBatchRows] = useState(tcmiBatchRows);
  const [batchModal, setBatchModal] = useState(false);
  const [batchForm, setBatchForm] = useState(defaultBatchForm);
  const [batchErrors, setBatchErrors] = useState({});
  const [attendanceRows, setAttendanceRows] = useState(tcmiAttendanceRows);
  const [attendanceModal, setAttendanceModal] = useState(false);
  const [attendanceForm, setAttendanceForm] = useState(defaultAttendanceForm);
  const [attendanceErrors, setAttendanceErrors] = useState({});
  const [examRows, setExamRows] = useState(tcmiExamRows);
  const [examModuleModal, setExamModuleModal] = useState(false);
  const [examModuleForm, setExamModuleForm] = useState(defaultExamModuleForm);
  const [examModuleErrors, setExamModuleErrors] = useState({});
  const [certificateRows, setCertificateRows] = useState(tcmiCertificateRows);
  const [certificateModal, setCertificateModal] = useState(false);
  const [certificateForm, setCertificateForm] = useState(defaultCertificateForm);
  const [certificateErrors, setCertificateErrors] = useState({});
  const [documentRows, setDocumentRows] = useState(tcmiDocumentRows);
  const [documentModal, setDocumentModal] = useState(false);
  const [documentForm, setDocumentForm] = useState(defaultDocumentForm);
  const [documentErrors, setDocumentErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [selectedStudentIds, setSelectedStudentIds] = useState([]);
  const [studentSort, setStudentSort] = useState({ key: "name", order: "asc" });
  const [studentPage, setStudentPage] = useState(1);
  const [toastMessage, setToastMessage] = useState("");
  const [confirmDialog, setConfirmDialog] = useState({ open: false, type: "", payload: null, message: "" });

  if (!content) return null;

  const fallbackBlock = fallbackFeaturesByTitle[content.title] || { featureCards: [], featureTitle: "Features" };
  const featureCards = Array.isArray(content.featureCards) && content.featureCards.length > 0 ? content.featureCards : fallbackBlock.featureCards;
  const featureTitle = content.featureTitle || fallbackBlock.featureTitle;

  const isLeads = content.title === "Leads";
  const isStudents = content.title === "Students";
  const isCourses = content.title === "Courses";
  const isBatches = content.title === "Batches";
  const isAttendance = content.title === "Attendance";
  const isExams = content.title === "Exams";
  const isCertificates = content.title === "Certificates";
  const isDocuments = content.title === "Documents";
  const isFinance = content.title === "Finance" && role !== "Faculty";
  const showFeatureCards = featureCards.length > 0 && !isStudents && !isLeads;

  const selectedStudent = studentRows.find((student) => student.id === selectedStudentId) || studentRows[0];
  const pageSize = 5;

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 180);
    return () => clearTimeout(timer);
  }, [content?.title]);

  const filteredStudentRows = useMemo(() => {
    const query = globalSearch.trim().toLowerCase();
    const rows = query ? studentRows.filter((student) => [student.name, student.course, student.batch].join(" ").toLowerCase().includes(query)) : studentRows;
    const sorted = [...rows].sort((a, b) => {
      const left = String(a[studentSort.key] || "").toLowerCase();
      const right = String(b[studentSort.key] || "").toLowerCase();
      return studentSort.order === "asc" ? left.localeCompare(right) : right.localeCompare(left);
    });
    return sorted;
  }, [globalSearch, studentRows, studentSort]);

  const pagedStudents = filteredStudentRows.slice((studentPage - 1) * pageSize, studentPage * pageSize);

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
        phone: (student.phone || "").replace(/\D/g, "").slice(-10),
        altPhone: student.altPhone || "",
        guardian: student.guardian || "",
        guardianPhone: student.guardianPhone || "",
        address: student.address || "",
        courseType: student.courseType || "Certification",
        course: student.course || "",
        mode: student.mode || "Offline",
        batch: student.batch || "",
        fees: student.fees || "",
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
    if (!/^\d{10}$/.test(studentForm.phone)) errors.phone = "Student mobile must be exactly 10 digits.";
    if (!studentForm.guardian.trim()) errors.guardian = "Guardian name is required.";
    if (!studentForm.course.trim()) errors.course = "Course assignment is required.";
    if (!studentForm.batch.trim()) errors.batch = "Batch assignment is required.";
    if (!studentForm.fees.trim()) errors.fees = "Fees status is required.";
    if (!studentPhotoPreview) errors.photo = "Student photo is required.";

    setStudentErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const saveStudent = () => {
    if (!validateStudentForm()) return;

    const payload = {
      ...studentForm,
      idDoc: "Pending",
      formDoc: "Pending",
      photo: studentPhotoPreview,
    };

    if (studentModal.mode === "edit" && !window.confirm("Are you sure you want to update student details?")) return;

    if (studentModal.mode === "add") {
      const newId = `STU-${1000 + studentRows.length + 1}`;
      setStudentRows((prev) => [{ id: newId, ...payload }, ...prev]);
      setSelectedStudentId(newId);
    } else {
      setStudentRows((prev) => prev.map((student) => (student.id === studentModal.studentId ? { ...student, ...payload } : student)));
      setSelectedStudentId(studentModal.studentId);
    }

    setStudentModal({ open: false, mode: "add", studentId: null });
    setToastMessage("Student saved successfully.");
    setTimeout(() => setToastMessage(""), 2000);
  };

  const requestDelete = (type, payload, message) => setConfirmDialog({ open: true, type, payload, message });

  const confirmDeleteAction = () => {
    if (confirmDialog.type === "student_single") {
      setStudentRows((prev) => prev.filter((row) => row.id !== confirmDialog.payload));
      setSelectedStudentIds((prev) => prev.filter((id) => id !== confirmDialog.payload));
      setToastMessage("Student deleted.");
    }
    if (confirmDialog.type === "student_bulk") {
      const ids = confirmDialog.payload || [];
      setStudentRows((prev) => prev.filter((row) => !ids.includes(row.id)));
      setSelectedStudentIds([]);
      setToastMessage("Selected students deleted.");
    }
    setConfirmDialog({ open: false, type: "", payload: null, message: "" });
    setTimeout(() => setToastMessage(""), 2000);
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

  const openBatchDialog = () => {
    setBatchErrors({});
    setBatchForm(defaultBatchForm);
    setBatchModal(true);
  };

  const saveBatch = () => {
    const errors = {};
    const assignedStudents = Number(batchForm.students);

    if (!batchForm.batchName.trim()) errors.batchName = "Batch name is required.";
    if (!batchForm.course.trim()) errors.course = "Course is required.";
    if (!batchForm.trainer.trim()) errors.trainer = "Trainer name is required.";
    if (Number.isNaN(assignedStudents) || assignedStudents < 0) errors.students = "Student count must be 0 or more.";
    if (!batchForm.schedule.trim()) errors.schedule = "Batch timing is required.";

    setBatchErrors(errors);
    if (Object.keys(errors).length) return;

    setBatchRows((prev) => [
      {
        id: `BAT-${200 + prev.length + 1}`,
        batchName: batchForm.batchName.trim(),
        course: batchForm.course.trim(),
        trainer: batchForm.trainer.trim(),
        students: assignedStudents,
        schedule: batchForm.schedule.trim(),
        mode: batchForm.mode,
      },
      ...prev,
    ]);
    setBatchModal(false);
  };

  const openAttendanceDialog = () => {
    setAttendanceErrors({});
    setAttendanceForm({ ...defaultAttendanceForm, date: format(new Date(), "yyyy-MM-dd") });
    setAttendanceModal(true);
  };

  const saveAttendance = () => {
    const errors = {};
    if (!attendanceForm.date) errors.date = "Date is required.";
    if (!attendanceForm.batch.trim()) errors.batch = "Batch is required.";
    if (!attendanceForm.student.trim()) errors.student = "Student is required.";
    if (!attendanceForm.status) errors.status = "Status is required.";

    const duplicate = attendanceRows.find(
      (row) =>
        row.date === attendanceForm.date &&
        row.batch.toLowerCase() === attendanceForm.batch.trim().toLowerCase() &&
        row.student.toLowerCase() === attendanceForm.student.trim().toLowerCase()
    );
    if (duplicate) errors.student = "Attendance already marked for this student and date.";

    setAttendanceErrors(errors);
    if (Object.keys(errors).length) return;

    setAttendanceRows((prev) => [
      { id: `ATT-${1000 + prev.length + 1}`, date: attendanceForm.date, batch: attendanceForm.batch.trim(), student: attendanceForm.student.trim(), status: attendanceForm.status },
      ...prev,
    ]);
    setAttendanceModal(false);
  };

  const openExamModuleDialog = () => {
    setExamModuleErrors({});
    setExamModuleForm({ ...defaultExamModuleForm, examDate: format(new Date(), "yyyy-MM-dd") });
    setExamModuleModal(true);
  };

  const calculateGrade = (total) => {
    if (total >= 90) return "A+";
    if (total >= 80) return "A";
    if (total >= 70) return "B+";
    if (total >= 60) return "B";
    if (total >= 50) return "C";
    if (total >= 35) return "D";
    return "F";
  };

  const saveExamModuleRecord = () => {
    const errors = {};
    const theory = Number(examModuleForm.theoryMarks);
    const practical = Number(examModuleForm.practicalMarks);
    if (!examModuleForm.examName.trim()) errors.examName = "Exam name is required.";
    if (!examModuleForm.batch.trim()) errors.batch = "Batch is required.";
    if (!examModuleForm.student.trim()) errors.student = "Student is required.";
    if (Number.isNaN(theory) || theory < 0 || theory > 50) errors.theoryMarks = "Theory marks must be between 0 and 50.";
    if (Number.isNaN(practical) || practical < 0 || practical > 50) errors.practicalMarks = "Practical marks must be between 0 and 50.";
    if (!examModuleForm.examDate) errors.examDate = "Exam date is required.";
    setExamModuleErrors(errors);
    if (Object.keys(errors).length) return;

    const totalMarks = theory + practical;
    setExamRows((prev) => [
      {
        id: `EX-${1000 + prev.length + 1}`,
        examName: examModuleForm.examName.trim(),
        batch: examModuleForm.batch.trim(),
        student: examModuleForm.student.trim(),
        theoryMarks: theory,
        practicalMarks: practical,
        totalMarks,
        grade: calculateGrade(totalMarks),
        examDate: examModuleForm.examDate,
      },
      ...prev,
    ]);
    setExamModuleModal(false);
  };

  const openCertificateDialog = () => {
    setCertificateErrors({});
    setCertificateForm({ ...defaultCertificateForm, issueDate: format(new Date(), "yyyy-MM-dd") });
    setCertificateModal(true);
  };

  const saveCertificate = () => {
    const errors = {};
    if (!certificateForm.student.trim()) errors.student = "Student is required.";
    if (!certificateForm.batch.trim()) errors.batch = "Batch is required.";
    if (!certificateForm.grade.trim()) errors.grade = "Grade is required.";
    if (!certificateForm.issueDate) errors.issueDate = "Issue date is required.";
    setCertificateErrors(errors);
    if (Object.keys(errors).length) return;

    const next = 1000 + certificateRows.length + 1;
    setCertificateRows((prev) => [
      { id: `CERT-${next}`, student: certificateForm.student.trim(), batch: certificateForm.batch.trim(), type: certificateForm.type, grade: certificateForm.grade.trim(), issueDate: certificateForm.issueDate, qrCode: `TCMI-CERT-${next}` },
      ...prev,
    ]);
    setCertificateModal(false);
  };

  const openDocumentDialog = () => {
    setDocumentErrors({});
    setDocumentForm({ ...defaultDocumentForm, uploadedOn: format(new Date(), "yyyy-MM-dd") });
    setDocumentModal(true);
  };

  const saveDocument = () => {
    const errors = {};
    const fileName = documentForm.fileName.trim().toLowerCase();
    const allowed = [".pdf", ".png", ".jpg", ".jpeg"];
    if (!documentForm.student.trim()) errors.student = "Student is required.";
    if (!documentForm.batch.trim()) errors.batch = "Batch is required.";
    if (!documentForm.docType) errors.docType = "Document type is required.";
    if (!documentForm.fileName.trim()) errors.fileName = "File name is required.";
    else if (!allowed.some((ext) => fileName.endsWith(ext))) errors.fileName = "Allowed formats: .pdf, .png, .jpg, .jpeg.";
    if (!documentForm.uploadedOn) errors.uploadedOn = "Upload date is required.";
    setDocumentErrors(errors);
    if (Object.keys(errors).length) return;

    setDocumentRows((prev) => [
      { id: `DOC-${1000 + prev.length + 1}`, student: documentForm.student.trim(), batch: documentForm.batch.trim(), docType: documentForm.docType, fileName: documentForm.fileName.trim(), status: "Pending", uploadedOn: documentForm.uploadedOn },
      ...prev,
    ]);
    setDocumentModal(false);
  };

  const attendanceByBatch = Object.values(
    attendanceRows.reduce((acc, row) => {
      if (!acc[row.batch]) acc[row.batch] = { batch: row.batch, total: 0, present: 0 };
      acc[row.batch].total += 1;
      if (row.status === "Present") acc[row.batch].present += 1;
      return acc;
    }, {})
  );

  const attendanceByStudent = Object.values(
    attendanceRows.reduce((acc, row) => {
      const key = `${row.batch}__${row.student}`;
      if (!acc[key]) acc[key] = { student: row.student, batch: row.batch, total: 0, present: 0 };
      acc[key].total += 1;
      if (row.status === "Present") acc[key].present += 1;
      return acc;
    }, {})
  ).map((row) => ({ ...row, percentage: row.total ? Number(((row.present / row.total) * 100).toFixed(2)) : 0 }));

  const handlePhotoChange = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setStudentPhotoPreview(reader.result?.toString() || "");
    reader.readAsDataURL(file);
  };

  return (
    <section className="rounded-lg border border-[var(--tcmi-border)] bg-white p-3 lg:p-4">
      {toastMessage && <div className="mb-3 rounded-lg border border-gray-200 bg-white p-2 text-sm">{toastMessage}</div>}
      <div className="flex flex-col gap-2 border-b border-[var(--tcmi-border)] pb-5">
        <p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Section Overview</p>
        <h3 className="font-heading text-3xl text-[var(--tcmi-text)]">{content.title}</h3>
        {!isLeads && <p className="max-w-3xl font-body text-sm text-[var(--tcmi-muted)]">{content.description}</p>}
      </div>
      {loading && <div className="mt-3 rounded-lg border border-[var(--tcmi-border)] bg-[var(--tcmi-soft)] p-3 text-sm">Loading...</div>}

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

      {isLeads && <LeadsModule globalSearch={globalSearch} />}

      {isStudents && (
        <div className="mt-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2"><p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Student Operations</p><div className="flex gap-2"><button onClick={() => openStudentDialog("add")} className="rounded-lg border border-black bg-black px-3 py-2 text-xs text-white">+ Enroll Student</button><button onClick={() => requestDelete("student_bulk", selectedStudentIds, "Are you sure you want to delete selected students?")} className="rounded-lg border px-3 py-2 text-xs">Bulk Delete</button><button onClick={() => { setToastMessage(`Exported ${selectedStudentIds.length} students.`); setTimeout(() => setToastMessage(""), 2000); }} className="rounded-lg border px-3 py-2 text-xs">Bulk Export</button></div></div>
          <div className="rounded-xl border border-[var(--tcmi-border)]"><div className="border-b border-[var(--tcmi-border)] bg-[var(--tcmi-soft)] px-4 py-3 font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Detailed Student Table</div><div className="overflow-x-auto"><table className="min-w-full border-collapse"><thead><tr className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]"><th className="px-3 py-2 text-left"><input type="checkbox" checked={pagedStudents.length > 0 && pagedStudents.every((student) => selectedStudentIds.includes(student.id))} onChange={(e) => setSelectedStudentIds(e.target.checked ? pagedStudents.map((student) => student.id) : [])} /></th><th className="px-3 py-2 text-left cursor-pointer" onClick={() => setStudentSort((prev) => ({ key: "name", order: prev.order === "asc" ? "desc" : "asc" }))}>Student ↑↓</th><th className="px-3 py-2 text-left">Course</th><th className="px-3 py-2 text-left cursor-pointer" onClick={() => setStudentSort((prev) => ({ key: "batch", order: prev.order === "asc" ? "desc" : "asc" }))}>Batch ↑↓</th><th className="px-3 py-2 text-left">Fees</th><th className="px-3 py-2 text-left">Attendance</th><th className="px-3 py-2 text-left">Exam</th><th className="px-3 py-2 text-left">Actions</th></tr></thead><tbody>{pagedStudents.length === 0 && <tr><td colSpan={8} className="px-3 py-6 text-center text-sm text-[var(--tcmi-muted)]">No students found. Start by adding a new student.</td></tr>}{pagedStudents.map((student) => (<tr key={student.id} className="border-t border-[var(--tcmi-border)] font-body text-sm"><td className="px-3 py-2"><input type="checkbox" checked={selectedStudentIds.includes(student.id)} onChange={(e) => setSelectedStudentIds((prev) => e.target.checked ? [...prev, student.id] : prev.filter((id) => id !== student.id))} /></td><td className="px-3 py-2">{student.name}</td><td className="px-3 py-2">{student.course}</td><td className="px-3 py-2">{student.batch}</td><td className="px-3 py-2"><span className={`rounded-lg border px-2 py-1 text-xs ${student.fees === "Pending" ? "border-gray-400" : "border-gray-200"}`}>{student.fees}</span></td><td className="px-3 py-2">{student.attendance}</td><td className="px-3 py-2">{student.exam}</td><td className="px-3 py-2"><div className="flex gap-2"><button onClick={() => { setSelectedStudentId(student.id); setOpenStudentModal(true); }} className="rounded border border-[var(--tcmi-border)] p-2 hover:border-black" aria-label="View profile"><FiEye size={14} /></button><button onClick={() => openStudentDialog("edit", student)} className="rounded border border-[var(--tcmi-border)] p-2 hover:border-black" aria-label="Edit student"><FiEdit2 size={14} /></button><button onClick={() => requestDelete("student_single", student.id, "Are you sure you want to delete this student?")} className="rounded border border-[var(--tcmi-border)] p-2 hover:border-black" aria-label="Delete student"><FiTrash2 size={14} /></button></div></td></tr>))}</tbody></table></div></div>
          <div className="mt-2 flex items-center justify-end gap-2">
            <button onClick={() => setStudentPage((p) => Math.max(p - 1, 1))} className="rounded border px-2 py-1 text-xs">Prev</button>
            <span className="text-xs">Page {studentPage}</span>
            <button onClick={() => setStudentPage((p) => (p * pageSize < filteredStudentRows.length ? p + 1 : p))} className="rounded border px-2 py-1 text-xs">Next</button>
          </div>
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
                    <td className="px-3 py-2">{row.student}</td><td className="px-3 py-2">₹{row.totalFee.toLocaleString()}</td><td className="px-3 py-2">₹{row.paid.toLocaleString()}</td><td className="px-3 py-2">₹{row.discount.toLocaleString()}</td><td className="px-3 py-2">{row.installment}</td><td className="px-3 py-2"><span className={row.due > 0 ? "text-black font-semibold" : "text-gray-500"}>₹{row.due.toLocaleString()}</span></td><td className="px-3 py-2">{row.receipt}</td><td className="px-3 py-2">{format(new Date(row.date), "dd/MM/yy")}</td><td className="px-3 py-2"><button onClick={() => openFinanceEditDialog(row)} className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">Update Fee</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {isCourses && <div className="mt-5"><div className="mb-3 flex items-center justify-between"><p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Course System</p><button type="button" onClick={() => setOpenCourseModal(true)} className="inline-flex items-center gap-1 rounded-lg border border-black bg-black px-3 py-2 font-body text-xs text-white hover:bg-gray-800"><FiPlus size={14} /> Add Course</button></div><div className="mb-3 flex flex-wrap gap-2">{["Certification (Level 1–4)", "Diploma programs", "Duration & fee setup", "Student assignment"].map((tag) => (<span key={tag} className="rounded-full border border-[var(--tcmi-border)] px-3 py-1 font-body text-xs">{tag}</span>))}</div><div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">{courseCards.map((course) => (<article key={course.id} className="rounded-xl border border-[var(--tcmi-border)] bg-white p-4"><p className="font-heading text-lg">{course.title}</p><p className="mt-2 font-body text-xs text-[var(--tcmi-muted)]">{course.type}</p><p className="mt-1 font-body text-sm">Duration: {course.duration}</p><p className="font-body text-sm">Fee: {course.fee}</p><p className="font-body text-xs text-[var(--tcmi-muted)]">{course.assignment}</p><div className="mt-3 flex gap-2"><button className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">Edit</button><button className="rounded border border-[var(--tcmi-border)] px-2 py-1 text-xs hover:border-black">Assign</button></div></article>))}</div></div>}

      {isBatches && <div className="mt-5 space-y-4"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Batch Management</p><button type="button" onClick={openBatchDialog} className="inline-flex items-center gap-1 rounded-lg border border-black bg-black px-3 py-2 font-body text-xs text-white hover:bg-gray-800"><FiPlus size={14} /> Add Batch</button></div><div className="overflow-x-auto rounded-xl border border-[var(--tcmi-border)]"><table className="min-w-full border-collapse"><thead className="bg-[var(--tcmi-soft)]"><tr className="text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]"><th className="px-3 py-2 text-left">Batch</th><th className="px-3 py-2 text-left">Course</th><th className="px-3 py-2 text-left">Trainer</th><th className="px-3 py-2 text-left">Students</th><th className="px-3 py-2 text-left">Schedule Timing</th><th className="px-3 py-2 text-left">Mode</th></tr></thead><tbody>{batchRows.map((batch) => (<tr key={batch.id} className="border-t border-[var(--tcmi-border)] text-sm"><td className="px-3 py-2">{batch.batchName}</td><td className="px-3 py-2">{batch.course}</td><td className="px-3 py-2">{batch.trainer}</td><td className="px-3 py-2">{batch.students}</td><td className="px-3 py-2">{batch.schedule}</td><td className="px-3 py-2">{batch.mode}</td></tr>))}</tbody></table></div></div>}
      {isAttendance && <div className="mt-5 space-y-4"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Attendance System</p><button type="button" onClick={openAttendanceDialog} className="rounded-lg border border-black bg-black px-3 py-2 text-xs text-white">+ Daily Marking</button></div><div className="overflow-x-auto rounded-xl border border-[var(--tcmi-border)]"><table className="min-w-full border-collapse"><thead className="bg-[var(--tcmi-soft)]"><tr className="text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]"><th className="px-3 py-2 text-left">Date</th><th className="px-3 py-2 text-left">Batch</th><th className="px-3 py-2 text-left">Student</th><th className="px-3 py-2 text-left">Status</th></tr></thead><tbody>{attendanceRows.map((row) => (<tr key={row.id} className="border-t border-[var(--tcmi-border)] text-sm"><td className="px-3 py-2">{format(new Date(row.date), "dd/MM/yy")}</td><td className="px-3 py-2">{row.batch}</td><td className="px-3 py-2">{row.student}</td><td className="px-3 py-2">{row.status}</td></tr>))}</tbody></table></div><div className="grid gap-3 xl:grid-cols-2"><div className="rounded-xl border border-[var(--tcmi-border)] p-4"><p className="text-xs uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Batch-wise Tracking</p><div className="mt-3 space-y-2">{attendanceByBatch.map((row) => (<div key={row.batch} className="flex items-center justify-between text-sm"><span>{row.batch}</span><span>{row.present}/{row.total} Present ({row.total ? ((row.present / row.total) * 100).toFixed(1) : "0"}%)</span></div>))}</div></div><div className="rounded-xl border border-[var(--tcmi-border)] p-4"><p className="text-xs uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Auto Percentage Calculation</p><div className="mt-3 overflow-x-auto"><table className="min-w-full text-sm"><thead><tr className="text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]"><th className="text-left">Student</th><th className="text-left">Batch</th><th className="text-left">Attendance %</th></tr></thead><tbody>{attendanceByStudent.map((row) => (<tr key={`${row.batch}-${row.student}`} className="border-t border-[var(--tcmi-border)]"><td className="py-2">{row.student}</td><td className="py-2">{row.batch}</td><td className="py-2">{row.percentage}%</td></tr>))}</tbody></table></div></div></div></div>}
      {isExams && <div className="mt-5 space-y-4"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Exam System</p><button type="button" onClick={openExamModuleDialog} className="rounded-lg border border-black bg-black px-3 py-2 text-xs text-white">+ Create Exam</button></div><div className="overflow-x-auto rounded-xl border border-[var(--tcmi-border)]"><table className="min-w-full border-collapse"><thead className="bg-[var(--tcmi-soft)]"><tr className="text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]"><th className="px-3 py-2 text-left">Exam</th><th className="px-3 py-2 text-left">Batch</th><th className="px-3 py-2 text-left">Student</th><th className="px-3 py-2 text-left">Theory</th><th className="px-3 py-2 text-left">Practical</th><th className="px-3 py-2 text-left">Total</th><th className="px-3 py-2 text-left">Grade</th></tr></thead><tbody>{examRows.map((row) => (<tr key={row.id} className="border-t border-[var(--tcmi-border)] text-sm"><td className="px-3 py-2">{row.examName}</td><td className="px-3 py-2">{row.batch}</td><td className="px-3 py-2">{row.student}</td><td className="px-3 py-2">{row.theoryMarks}/50</td><td className="px-3 py-2">{row.practicalMarks}/50</td><td className="px-3 py-2">{row.totalMarks}/100</td><td className="px-3 py-2">{row.grade}</td></tr>))}</tbody></table></div></div>}
      {isCertificates && <div className="mt-5 space-y-4"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Certificate & Marksheet</p><button type="button" onClick={openCertificateDialog} className="rounded-lg border border-black bg-black px-3 py-2 text-xs text-white">+ Auto-generate</button></div><div className="overflow-x-auto rounded-xl border border-[var(--tcmi-border)]"><table className="min-w-full border-collapse"><thead className="bg-[var(--tcmi-soft)]"><tr className="text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]"><th className="px-3 py-2 text-left">Student</th><th className="px-3 py-2 text-left">Batch</th><th className="px-3 py-2 text-left">Type</th><th className="px-3 py-2 text-left">Grade</th><th className="px-3 py-2 text-left">Issue Date</th><th className="px-3 py-2 text-left">QR Verification</th></tr></thead><tbody>{certificateRows.map((row) => (<tr key={row.id} className="border-t border-[var(--tcmi-border)] text-sm"><td className="px-3 py-2">{row.student}</td><td className="px-3 py-2">{row.batch}</td><td className="px-3 py-2">{row.type}</td><td className="px-3 py-2">{row.grade}</td><td className="px-3 py-2">{format(new Date(row.issueDate), "dd/MM/yy")}</td><td className="px-3 py-2"><code className="rounded bg-[var(--tcmi-soft)] px-2 py-1 text-xs">{row.qrCode}</code></td></tr>))}</tbody></table></div></div>}
      {isDocuments && <div className="mt-5 space-y-4"><div className="flex flex-wrap items-center justify-between gap-2"><p className="font-body text-[11px] uppercase tracking-[0.16em] text-[var(--tcmi-muted)]">Document Management</p><button type="button" onClick={openDocumentDialog} className="rounded-lg border border-black bg-black px-3 py-2 text-xs text-white">+ Add Document</button></div><div className="overflow-x-auto rounded-xl border border-[var(--tcmi-border)]"><table className="min-w-full border-collapse"><thead className="bg-[var(--tcmi-soft)]"><tr className="text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]"><th className="px-3 py-2 text-left">Student</th><th className="px-3 py-2 text-left">Batch</th><th className="px-3 py-2 text-left">Type</th><th className="px-3 py-2 text-left">File</th><th className="px-3 py-2 text-left">Status</th><th className="px-3 py-2 text-left">Uploaded On</th><th className="px-3 py-2 text-left">Actions</th></tr></thead><tbody>{documentRows.map((row) => (<tr key={row.id} className="border-t border-[var(--tcmi-border)] text-sm"><td className="px-3 py-2">{row.student}</td><td className="px-3 py-2">{row.batch}</td><td className="px-3 py-2">{row.docType}</td><td className="px-3 py-2">{row.fileName}</td><td className="px-3 py-2">{row.status}</td><td className="px-3 py-2">{format(new Date(row.uploadedOn), "dd/MM/yy")}</td><td className="px-3 py-2"><button className="rounded-lg border border-gray-200 p-2 hover:bg-gray-50" aria-label="Download"><FiDownload size={14} /></button></td></tr>))}</tbody></table></div></div>}

      {studentModal.open && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-4xl rounded-2xl border border-[var(--tcmi-border)] bg-white p-5"><div className="mb-4 flex items-center justify-between border-b border-[var(--tcmi-border)] pb-3"><h4 className="font-heading text-xl">{studentModal.mode === "add" ? "Student Enrollment Form" : "Update Student Enrollment"}</h4><button onClick={() => setStudentModal({ open: false, mode: "add", studentId: null })} className="rounded border px-2 py-1 text-xs">Close</button></div><div className="grid gap-4 lg:grid-cols-2"><div className="space-y-3"><p className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Student Information</p><label className="block text-xs">Full Name<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.name} onChange={(e) => setStudentForm((p) => ({ ...p, name: e.target.value }))} />{studentErrors.name && <p className="text-xs text-red-600">{studentErrors.name}</p>}</label><label className="block text-xs">Date of Birth<input type="date" className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.dob} onChange={(e) => setStudentForm((p) => ({ ...p, dob: e.target.value }))} />{studentErrors.dob && <p className="text-xs text-red-600">{studentErrors.dob}</p>}</label><label className="block text-xs">Gender<select className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.gender} onChange={(e) => setStudentForm((p) => ({ ...p, gender: e.target.value }))}><option value="">Select</option><option>Male</option><option>Female</option><option>Other</option></select>{studentErrors.gender && <p className="text-xs text-red-600">{studentErrors.gender}</p>}</label><label className="block text-xs">Nationality<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.nationality} onChange={(e) => setStudentForm((p) => ({ ...p, nationality: e.target.value }))} />{studentErrors.nationality && <p className="text-xs text-red-600">{studentErrors.nationality}</p>}</label><label className="block text-xs">Aadhar / National ID<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.aadhar} onChange={(e) => setStudentForm((p) => ({ ...p, aadhar: e.target.value }))} />{studentErrors.aadhar && <p className="text-xs text-red-600">{studentErrors.aadhar}</p>}</label><label className="block text-xs">Student Photo Upload<input type="file" accept="image/*" className="mt-1 w-full rounded border px-2 py-2 text-sm" onChange={handlePhotoChange} />{studentErrors.photo && <p className="text-xs text-red-600">{studentErrors.photo}</p>}</label>{studentPhotoPreview && <img src={studentPhotoPreview} alt="Student" className="h-20 w-20 rounded border object-cover" />}</div><div className="space-y-3"><p className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Contact, Course & Fee Assignment</p><label className="block text-xs">Email<input type="email" className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.email} onChange={(e) => setStudentForm((p) => ({ ...p, email: e.target.value }))} />{studentErrors.email && <p className="text-xs text-red-600">{studentErrors.email}</p>}</label><label className="block text-xs">Student Mobile<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.phone} onChange={(e) => setStudentForm((p) => ({ ...p, phone: e.target.value }))} />{studentErrors.phone && <p className="text-xs text-red-600">{studentErrors.phone}</p>}</label><label className="block text-xs">Alternate Phone<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.altPhone} onChange={(e) => setStudentForm((p) => ({ ...p, altPhone: e.target.value }))} /></label><label className="block text-xs">Guardian Name<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.guardian} onChange={(e) => setStudentForm((p) => ({ ...p, guardian: e.target.value }))} />{studentErrors.guardian && <p className="text-xs text-red-600">{studentErrors.guardian}</p>}</label><label className="block text-xs">Guardian Phone<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.guardianPhone} onChange={(e) => setStudentForm((p) => ({ ...p, guardianPhone: e.target.value }))} /></label><label className="block text-xs">Address<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.address} onChange={(e) => setStudentForm((p) => ({ ...p, address: e.target.value }))} /></label><label className="block text-xs">Course Type<select className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.courseType} onChange={(e) => setStudentForm((p) => ({ ...p, courseType: e.target.value }))}><option>Certification</option><option>Diploma</option></select></label><label className="block text-xs">Assign Course<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.course} onChange={(e) => setStudentForm((p) => ({ ...p, course: e.target.value }))} />{studentErrors.course && <p className="text-xs text-red-600">{studentErrors.course}</p>}</label><label className="block text-xs">Assign Batch<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.batch} onChange={(e) => setStudentForm((p) => ({ ...p, batch: e.target.value }))} />{studentErrors.batch && <p className="text-xs text-red-600">{studentErrors.batch}</p>}</label><label className="block text-xs">Mode<select className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.mode} onChange={(e) => setStudentForm((p) => ({ ...p, mode: e.target.value }))}><option>Offline</option><option>Online</option></select></label><label className="block text-xs">Fees Status<input className="mt-1 w-full rounded border px-2 py-2 text-sm" value={studentForm.fees} onChange={(e) => setStudentForm((p) => ({ ...p, fees: e.target.value }))} />{studentErrors.fees && <p className="text-xs text-red-600">{studentErrors.fees}</p>}</label></div></div><div className="mt-4 flex justify-end gap-2"><button onClick={() => setStudentModal({ open: false, mode: "add", studentId: null })} className="rounded border border-[var(--tcmi-border)] px-3 py-2 text-xs">Cancel</button><button onClick={saveStudent} className="rounded border border-black bg-black px-3 py-2 text-xs text-white">Save Student</button></div></div></div>}

      {openStudentModal && selectedStudent && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-2xl rounded-2xl border border-[var(--tcmi-border)] bg-white p-5"><div className="mb-4 flex items-center justify-between border-b pb-3"><div><p className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Student Profile</p><h4 className="font-heading text-2xl">{selectedStudent.name}</h4></div><button onClick={() => setOpenStudentModal(false)} className="rounded border px-2 py-1 text-xs">Close</button></div><div className="grid gap-3 sm:grid-cols-2 font-body text-sm"><p><span className="text-[var(--tcmi-muted)]">ID:</span> {selectedStudent.id}</p><p><span className="text-[var(--tcmi-muted)]">Email:</span> {selectedStudent.email}</p><p><span className="text-[var(--tcmi-muted)]">Phone:</span> {selectedStudent.phone}</p><p><span className="text-[var(--tcmi-muted)]">Guardian:</span> {selectedStudent.guardian}</p><p><span className="text-[var(--tcmi-muted)]">Address:</span> {selectedStudent.address}</p><p><span className="text-[var(--tcmi-muted)]">Course:</span> {selectedStudent.course}</p><p><span className="text-[var(--tcmi-muted)]">Batch:</span> {selectedStudent.batch}</p><p><span className="text-[var(--tcmi-muted)]">Fees:</span> {selectedStudent.fees}</p><p><span className="text-[var(--tcmi-muted)]">Attendance:</span> {selectedStudent.attendance}</p><p><span className="text-[var(--tcmi-muted)]">Exam:</span> {selectedStudent.exam}</p></div><div className="mt-4 border-t pt-3"><p className="font-body text-[11px] uppercase tracking-[0.12em] text-[var(--tcmi-muted)]">Generate Documents</p><div className="mt-2 flex flex-wrap gap-2"><button onClick={() => generateDocument(selectedStudent.id, "marksheet")} className="rounded border px-2 py-1 text-xs">Generate Marksheet</button><button onClick={() => generateDocument(selectedStudent.id, "idMarksheet")} className="rounded border px-2 py-1 text-xs">Generate ID Marksheet</button></div><p className="mt-2 font-body text-xs text-[var(--tcmi-muted)]">{generatedDocs[selectedStudent.id]?.marksheet || "Marksheet not generated"} · {generatedDocs[selectedStudent.id]?.idMarksheet || "ID marksheet not generated"}</p></div></div></div>}

      {financeModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-lg rounded-2xl border border-[var(--tcmi-border)] bg-white p-5"><div className="mb-4 flex items-center justify-between border-b pb-3"><h4 className="font-heading text-xl">Add Finance Entry</h4><button onClick={() => setFinanceModal(false)} className="rounded border px-2 py-1 text-xs">Close</button></div><div className="grid gap-3">{["student", "totalFee", "paid", "discount", "date"].map((field) => (<label key={field} className="text-xs">{field === "totalFee" ? "Total Fee" : field.charAt(0).toUpperCase() + field.slice(1)}<input type={field === "date" ? "date" : "text"} value={financeForm[field]} onChange={(e) => setFinanceForm((prev) => ({ ...prev, [field]: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{financeErrors[field] && <p className="text-xs text-red-600">{financeErrors[field]}</p>}</label>))}<label className="text-xs">Installment<select value={financeForm.installment} onChange={(e) => setFinanceForm((prev) => ({ ...prev, installment: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm"><option>No</option><option>Yes</option></select></label></div><div className="mt-4 flex justify-end gap-2"><button onClick={() => setFinanceModal(false)} className="rounded border px-3 py-2 text-xs">Cancel</button><button onClick={saveFinanceEntry} className="rounded border border-black bg-black px-3 py-2 text-xs text-white">Save & Generate Receipt</button></div></div></div>}

      {financeEditModal.open && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-lg rounded-2xl border border-[var(--tcmi-border)] bg-white p-5"><div className="mb-4 flex items-center justify-between border-b pb-3"><h4 className="font-heading text-xl">Update Fee Entry</h4><button onClick={() => setFinanceEditModal({ open: false, id: null })} className="rounded border px-2 py-1 text-xs">Close</button></div><div className="grid gap-3">{["student", "totalFee", "paid", "discount", "date"].map((field) => (<label key={field} className="text-xs">{field === "totalFee" ? "Total Fee" : field.charAt(0).toUpperCase() + field.slice(1)}<input type={field === "date" ? "date" : "text"} value={financeEditForm[field]} onChange={(e) => setFinanceEditForm((prev) => ({ ...prev, [field]: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{financeEditErrors[field] && <p className="text-xs text-red-600">{financeEditErrors[field]}</p>}</label>))}<label className="text-xs">Installment<select value={financeEditForm.installment} onChange={(e) => setFinanceEditForm((prev) => ({ ...prev, installment: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm"><option>No</option><option>Yes</option></select></label></div><div className="mt-4 flex justify-end gap-2"><button onClick={() => setFinanceEditModal({ open: false, id: null })} className="rounded border px-3 py-2 text-xs">Cancel</button><button onClick={saveFinanceUpdate} className="rounded border border-black bg-black px-3 py-2 text-xs text-white">Update Fee</button></div></div></div>}

      {openCourseModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-lg rounded-2xl border border-[var(--tcmi-border)] bg-white p-5"><div className="mb-4 flex items-center justify-between"><h4 className="font-heading text-xl">Add Course</h4><button onClick={() => setOpenCourseModal(false)} className="rounded border px-2 py-1 text-xs">Close</button></div><p className="mb-3 font-body text-sm text-[var(--tcmi-muted)]">Click save to add a sample course card. This operation is prepared for full card CRUD in future.</p><button onClick={() => { const next = courseCards.length + 1; setCourseCards((prev) => [...prev, { id: `CRS-${400 + next}`, title: `New Course ${next}`, type: "Certification", duration: "3 months", fee: "₹22,000", assignment: "0 students assigned" }]); setOpenCourseModal(false); }} className="rounded-lg border border-black bg-black px-3 py-2 text-xs text-white">Save Sample Course</button></div></div>}

      {batchModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-xl rounded-2xl border border-[var(--tcmi-border)] bg-white p-5"><div className="mb-4 flex items-center justify-between border-b pb-3"><h4 className="font-heading text-xl">Add Batch</h4><button onClick={() => setBatchModal(false)} className="rounded border px-2 py-1 text-xs">Close</button></div><div className="grid gap-3 sm:grid-cols-2"><label className="text-xs">Batch Name<input value={batchForm.batchName} onChange={(e) => setBatchForm((prev) => ({ ...prev, batchName: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{batchErrors.batchName && <p className="text-xs text-red-600">{batchErrors.batchName}</p>}</label><label className="text-xs">Course<input value={batchForm.course} onChange={(e) => setBatchForm((prev) => ({ ...prev, course: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{batchErrors.course && <p className="text-xs text-red-600">{batchErrors.course}</p>}</label><label className="text-xs">Trainer<input value={batchForm.trainer} onChange={(e) => setBatchForm((prev) => ({ ...prev, trainer: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{batchErrors.trainer && <p className="text-xs text-red-600">{batchErrors.trainer}</p>}</label><label className="text-xs">Assigned Students<input type="number" min="0" value={batchForm.students} onChange={(e) => setBatchForm((prev) => ({ ...prev, students: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{batchErrors.students && <p className="text-xs text-red-600">{batchErrors.students}</p>}</label><label className="text-xs sm:col-span-2">Schedule Timing<input value={batchForm.schedule} onChange={(e) => setBatchForm((prev) => ({ ...prev, schedule: e.target.value }))} placeholder="Mon, Wed, Fri · 6:30 PM - 8:00 PM" className="mt-1 w-full rounded border px-2 py-2 text-sm" />{batchErrors.schedule && <p className="text-xs text-red-600">{batchErrors.schedule}</p>}</label><label className="text-xs sm:col-span-2">Mode<select value={batchForm.mode} onChange={(e) => setBatchForm((prev) => ({ ...prev, mode: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm"><option>Offline</option><option>Online</option><option>Hybrid</option></select></label></div><div className="mt-4 flex justify-end gap-2"><button onClick={() => setBatchModal(false)} className="rounded border px-3 py-2 text-xs">Cancel</button><button onClick={saveBatch} className="rounded border border-black bg-black px-3 py-2 text-xs text-white">Save Batch</button></div></div></div>}
      {attendanceModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-lg rounded-2xl border border-[var(--tcmi-border)] bg-white p-5"><div className="mb-4 flex items-center justify-between border-b pb-3"><h4 className="font-heading text-xl">Daily Attendance Marking</h4><button onClick={() => setAttendanceModal(false)} className="rounded border px-2 py-1 text-xs">Close</button></div><div className="grid gap-3">{["date", "batch", "student"].map((field) => (<label key={field} className="text-xs">{field.charAt(0).toUpperCase() + field.slice(1)}<input type={field === "date" ? "date" : "text"} value={attendanceForm[field]} onChange={(e) => setAttendanceForm((prev) => ({ ...prev, [field]: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{attendanceErrors[field] && <p className="text-xs text-red-600">{attendanceErrors[field]}</p>}</label>))}<label className="text-xs">Status<select value={attendanceForm.status} onChange={(e) => setAttendanceForm((prev) => ({ ...prev, status: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm"><option>Present</option><option>Absent</option></select>{attendanceErrors.status && <p className="text-xs text-red-600">{attendanceErrors.status}</p>}</label></div><div className="mt-4 flex justify-end gap-2"><button onClick={() => setAttendanceModal(false)} className="rounded border px-3 py-2 text-xs">Cancel</button><button onClick={saveAttendance} className="rounded border border-black bg-black px-3 py-2 text-xs text-white">Save Attendance</button></div></div></div>}
      {examModuleModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-xl rounded-2xl border border-[var(--tcmi-border)] bg-white p-5"><div className="mb-4 flex items-center justify-between border-b pb-3"><h4 className="font-heading text-xl">Create Exam Record</h4><button onClick={() => setExamModuleModal(false)} className="rounded border px-2 py-1 text-xs">Close</button></div><div className="grid gap-3 sm:grid-cols-2"><label className="text-xs sm:col-span-2">Exam Name<input value={examModuleForm.examName} onChange={(e) => setExamModuleForm((prev) => ({ ...prev, examName: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{examModuleErrors.examName && <p className="text-xs text-red-600">{examModuleErrors.examName}</p>}</label><label className="text-xs">Batch<input value={examModuleForm.batch} onChange={(e) => setExamModuleForm((prev) => ({ ...prev, batch: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{examModuleErrors.batch && <p className="text-xs text-red-600">{examModuleErrors.batch}</p>}</label><label className="text-xs">Student<input value={examModuleForm.student} onChange={(e) => setExamModuleForm((prev) => ({ ...prev, student: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{examModuleErrors.student && <p className="text-xs text-red-600">{examModuleErrors.student}</p>}</label><label className="text-xs">Theory Marks (0-50)<input type="number" min="0" max="50" value={examModuleForm.theoryMarks} onChange={(e) => setExamModuleForm((prev) => ({ ...prev, theoryMarks: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{examModuleErrors.theoryMarks && <p className="text-xs text-red-600">{examModuleErrors.theoryMarks}</p>}</label><label className="text-xs">Practical Marks (0-50)<input type="number" min="0" max="50" value={examModuleForm.practicalMarks} onChange={(e) => setExamModuleForm((prev) => ({ ...prev, practicalMarks: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{examModuleErrors.practicalMarks && <p className="text-xs text-red-600">{examModuleErrors.practicalMarks}</p>}</label><label className="text-xs sm:col-span-2">Exam Date<input type="date" value={examModuleForm.examDate} onChange={(e) => setExamModuleForm((prev) => ({ ...prev, examDate: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{examModuleErrors.examDate && <p className="text-xs text-red-600">{examModuleErrors.examDate}</p>}</label></div><div className="mt-4 flex justify-end gap-2"><button onClick={() => setExamModuleModal(false)} className="rounded border px-3 py-2 text-xs">Cancel</button><button onClick={saveExamModuleRecord} className="rounded border border-black bg-black px-3 py-2 text-xs text-white">Save Exam</button></div></div></div>}
      {certificateModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-lg rounded-2xl border border-[var(--tcmi-border)] bg-white p-5"><div className="mb-4 flex items-center justify-between border-b pb-3"><h4 className="font-heading text-xl">Generate Certificate / Marksheet</h4><button onClick={() => setCertificateModal(false)} className="rounded border px-2 py-1 text-xs">Close</button></div><div className="grid gap-3"><label className="text-xs">Student<input value={certificateForm.student} onChange={(e) => setCertificateForm((prev) => ({ ...prev, student: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{certificateErrors.student && <p className="text-xs text-red-600">{certificateErrors.student}</p>}</label><label className="text-xs">Batch<input value={certificateForm.batch} onChange={(e) => setCertificateForm((prev) => ({ ...prev, batch: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{certificateErrors.batch && <p className="text-xs text-red-600">{certificateErrors.batch}</p>}</label><label className="text-xs">Type<select value={certificateForm.type} onChange={(e) => setCertificateForm((prev) => ({ ...prev, type: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm"><option>Certificate</option><option>Marksheet</option></select></label><label className="text-xs">Grade<input value={certificateForm.grade} onChange={(e) => setCertificateForm((prev) => ({ ...prev, grade: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{certificateErrors.grade && <p className="text-xs text-red-600">{certificateErrors.grade}</p>}</label><label className="text-xs">Issue Date<input type="date" value={certificateForm.issueDate} onChange={(e) => setCertificateForm((prev) => ({ ...prev, issueDate: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{certificateErrors.issueDate && <p className="text-xs text-red-600">{certificateErrors.issueDate}</p>}</label></div><div className="mt-4 flex justify-end gap-2"><button onClick={() => setCertificateModal(false)} className="rounded border px-3 py-2 text-xs">Cancel</button><button onClick={saveCertificate} className="rounded border border-black bg-black px-3 py-2 text-xs text-white">Generate</button></div></div></div>}
      {documentModal && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-lg rounded-2xl border border-[var(--tcmi-border)] bg-white p-5"><div className="mb-4 flex items-center justify-between border-b pb-3"><h4 className="font-heading text-xl">Add Student Document</h4><button onClick={() => setDocumentModal(false)} className="rounded border px-2 py-1 text-xs">Close</button></div><div className="grid gap-3"><label className="text-xs">Student<input value={documentForm.student} onChange={(e) => setDocumentForm((prev) => ({ ...prev, student: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{documentErrors.student && <p className="text-xs text-red-600">{documentErrors.student}</p>}</label><label className="text-xs">Batch<input value={documentForm.batch} onChange={(e) => setDocumentForm((prev) => ({ ...prev, batch: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{documentErrors.batch && <p className="text-xs text-red-600">{documentErrors.batch}</p>}</label><label className="text-xs">Document Type<select value={documentForm.docType} onChange={(e) => setDocumentForm((prev) => ({ ...prev, docType: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm"><option>Registration Form</option><option>ID Proof</option><option>Certificate</option><option>Student File</option></select>{documentErrors.docType && <p className="text-xs text-red-600">{documentErrors.docType}</p>}</label><label className="text-xs">File Name<input value={documentForm.fileName} onChange={(e) => setDocumentForm((prev) => ({ ...prev, fileName: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" placeholder="example.pdf" />{documentErrors.fileName && <p className="text-xs text-red-600">{documentErrors.fileName}</p>}</label><label className="text-xs">Upload Date<input type="date" value={documentForm.uploadedOn} onChange={(e) => setDocumentForm((prev) => ({ ...prev, uploadedOn: e.target.value }))} className="mt-1 w-full rounded border px-2 py-2 text-sm" />{documentErrors.uploadedOn && <p className="text-xs text-red-600">{documentErrors.uploadedOn}</p>}</label></div><div className="mt-4 flex justify-end gap-2"><button onClick={() => setDocumentModal(false)} className="rounded border px-3 py-2 text-xs">Cancel</button><button onClick={saveDocument} className="rounded border border-black bg-black px-3 py-2 text-xs text-white">Save Document</button></div></div></div>}
      {confirmDialog.open && <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"><div className="w-full max-w-md rounded-lg border border-gray-200 bg-white p-3"><div className="mb-3 border-b border-gray-200 pb-2"><h4 className="text-lg font-semibold">Confirm Action</h4></div><p className="text-sm">{confirmDialog.message}</p><div className="mt-3 flex justify-end gap-2"><button onClick={() => setConfirmDialog({ open: false, type: "", payload: null, message: "" })} className="rounded-lg border border-gray-200 px-3 py-2 text-xs hover:bg-gray-50">Cancel</button><button onClick={confirmDeleteAction} className="rounded-lg border border-black bg-black px-3 py-2 text-xs text-white">Confirm</button></div></div></div>}
    </section>
  );
};

export default TCMIOverviewPanel;
