import { FiUserPlus, FiEye, FiEdit2 } from "react-icons/fi";
import StudentForm from "../components/forms/EnrollStudentForm";
import React, { useMemo, useState } from "react";
import {
  FiBarChart2,
  FiBookOpen,
  FiCalendar,
  FiCheckCircle,
  FiChevronRight,
  FiClock,
  FiCreditCard,
  FiDollarSign,
  FiDownload,
  FiEdit2,
  FiFileText,
  FiFilter,
  FiFolder,
  FiGrid,
  FiPercent,
  FiPlus,
  FiSearch,
  FiShield,
  FiTarget,
  FiTrendingUp,
  FiUpload,
  FiUser,
  FiUserCheck,
  FiUsers,
  FiX,
} from "react-icons/fi";

const sections = [
  "Dashboard",
  "Leads",
  "Students",
  "Courses",
  "Batches",
  "Attendance",
  "Exams",
  "Certificates",
  "Finance",
  "Documents",
];

const sectionSubSections = {
  Dashboard: ["Overview", "Analytics", "Revenue"],
  Leads: ["Pipeline", "Follow-ups", "Call Logs"],
  Students: ["Directory", "Profiles", "Records"],
  Courses: ["Certification", "Diploma", "Fee Setup"],
  Batches: ["Batch List", "Trainers", "Schedules"],
  Attendance: ["Daily Marking", "Batch View", "Percentages"],
  Exams: ["Exam List", "Marks Entry", "Grading"],
  Certificates: ["Certificate", "Marksheet", "Verification"],
  Finance: ["Payments", "Installments", "Dues"],
  Documents: ["Registration", "ID Proofs", "Student Files"],
};

const initialStudents = [
const dashboardStats = [
  { label: "Total Students", value: "1,280", icon: FiUsers },
  { label: "New Leads", value: "146", icon: FiTarget },
  { label: "Conversion Rate", value: "38%", icon: FiPercent },
  { label: "Monthly Revenue", value: "₹18.4L", icon: FiDollarSign },
  { label: "Pending Fees", value: "₹3.1L", icon: FiCreditCard },
  { label: "Upcoming Exams", value: "12", icon: FiCalendar },
];

const leadData = [
  {
    name: "Aarav Malhotra",
    status: "Hot",
    source: "Instagram",
    followUp: "15 Apr 2026",
    notes: "Interested in Diploma - Piano",
  },
  {
    id: 1,
    name: "Rahul Sharma",
    course: "Guitar",
    status: "Active",
    date: "18/04/26",
    fullData: {},
    name: "Sara Khan",
    status: "Warm",
    source: "Referral",
    followUp: "16 Apr 2026",
    notes: "Requested evening batch",
  },
  {
    name: "Vihaan Roy",
    status: "Cold",
    source: "Website",
    followUp: "18 Apr 2026",
    notes: "Needs financing options",
  },
];

const TCMI = () => {
  const [data, setData] = useState(initialStudents);
  const [openForm, setOpenForm] = useState(false);
  const [editStudent, setEditStudent] = useState(null);
  const [viewStudent, setViewStudent] = useState(null);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");

  // ADD / EDIT
  const handleAddStudent = (student) => {
    if (editStudent) {
      // EDIT
      setData((prev) =>
        prev.map((item) =>
          item.id === editStudent.id
            ? {
                ...item,
                name: student.name,
                course: student.level || student.courseType,
                fullData: student,
              }
            : item
        )
      );
      setEditStudent(null);
    } else {
      // ADD
      setData([
        {
          id: Date.now(),
          name: student.name,
          course: student.level || student.courseType,
          status: "Active",
          date: new Date().toLocaleDateString("en-GB"),
          fullData: student,
        },
        ...data,
      ]);
    }
  };

  // FILTER
  const filteredData = data.filter((item) => {
    const matchSearch =
      item.name?.toLowerCase().includes(search.toLowerCase()) ||
      item.course?.toLowerCase().includes(search.toLowerCase());

    const matchFilter =
      filter === "All" || item.status === filter;
const studentData = [
  {
    name: "Nisha Mehta",
    course: "Certification L2",
    batch: "GTR-L2-EVE",
    attendance: "93%",
    exam: "A",
    feeStatus: "Paid",
  },
  {
    name: "Ritvik Suri",
    course: "Diploma - Sound Design",
    batch: "SD-DIP-MOR",
    attendance: "86%",
    exam: "B+",
    feeStatus: "Pending",
  },
  {
    name: "Ishita Sen",
    course: "Certification L4",
    batch: "VOC-L4-WKD",
    attendance: "97%",
    exam: "A+",
    feeStatus: "Installment",
  },
];

    return matchSearch && matchFilter;
  });
const courseData = [
  { program: "Certification - Level 1", duration: "3 months", fee: "₹18,000", students: 84 },
  { program: "Certification - Level 4", duration: "4 months", fee: "₹34,000", students: 61 },
  { program: "Diploma in Music Production", duration: "12 months", fee: "₹1,20,000", students: 38 },
];

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
const batchData = [
  { code: "PIA-L2-EVE", trainer: "Shreya Dutta", timing: "Mon-Wed-Fri | 6:00 PM", students: 22 },
  { code: "GTR-L3-MOR", trainer: "Karan Singh", timing: "Tue-Thu | 9:00 AM", students: 16 },
];

      {/* HEADER */}
      <div>
        <p className="text-xs uppercase text-gray-400">Brands / TCMI</p>
        <h1 className="text-4xl italic">Music Institute</h1>
      </div>
const examData = [
  { exam: "Quarterly Skill Assessment", batch: "VOC-L4-WKD", date: "22 Apr 2026", marksType: "Theory + Practical" },
  { exam: "Diploma Mid-Term", batch: "SD-DIP-MOR", date: "26 Apr 2026", marksType: "Practical" },
];

      {/* TOP BAR */}
      <div className="flex justify-between items-center gap-3 flex-wrap">
const financeData = [
  { student: "Ritvik Suri", plan: "Installment", paid: "₹45,000", due: "₹15,000", receipt: "REC-1024" },
  { student: "Nisha Mehta", plan: "Full Payment", paid: "₹34,000", due: "₹0", receipt: "REC-1030" },
];

        <input
          placeholder="Search student..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="border px-3 py-2 rounded-md w-full max-w-sm"
        />
const documentData = [
  { student: "Ishita Sen", file: "ID Proof", type: "PDF", updated: "10 Apr 2026" },
  { student: "Nisha Mehta", file: "Registration Form", type: "PDF", updated: "08 Apr 2026" },
  { student: "Ritvik Suri", file: "Course Certificate", type: "PDF", updated: "05 Apr 2026" },
];

        <div className="flex gap-2">
const roleData = [
  { role: "Admin", access: "Full access" },
  { role: "Counselor", access: "Leads & Students" },
  { role: "Faculty", access: "Attendance & Exams" },
  { role: "Accountant", access: "Finance" },
];

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border px-3 py-2 rounded-md"
          >
            <option>All</option>
            <option>Active</option>
            <option>Completed</option>
          </select>
const statusClass = {
  Hot: "bg-black text-white border-black",
  Warm: "bg-gray-100 text-black border-gray-300",
  Cold: "bg-white text-gray-500 border-gray-300",
  Paid: "bg-black text-white border-black",
  Pending: "bg-white text-black border-black",
  Installment: "bg-gray-100 text-black border-gray-300",
};

          <button
            onClick={() => {
              setEditStudent(null);
              setOpenForm(true);
            }}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-md"
          >
            <FiUserPlus size={16} />
            Add Student
          </button>
const cardClass = "rounded-2xl border border-gray-200 bg-white p-4 sm:p-5 transition duration-200 hover:border-black";

const headingStyle = { fontFamily: '"Cooper Hewitt Heavy", "Syne", sans-serif' };
const bodyStyle = { fontFamily: '"Canva Sans", "Inter", "JetBrains Mono", sans-serif' };

const TableHeader = ({ titles }) => (
  <div
    className="grid border-b border-gray-200 bg-gray-50 px-4 py-3 text-xs uppercase tracking-[0.15em] text-gray-500"
    style={{ gridTemplateColumns: `repeat(${titles.length}, minmax(0, 1fr))` }}
  >
    {titles.map((title) => (
      <div key={title}>{title}</div>
    ))}
  </div>
);

const Modal = ({ title, fields, onClose }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
    <div className="w-full max-w-xl rounded-2xl border border-gray-200 bg-white p-5 sm:p-6" style={bodyStyle}>
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-lg font-semibold tracking-wide" style={headingStyle}>{title}</h3>
        <button onClick={onClose} className="rounded-full border border-gray-300 p-2 transition hover:border-black" aria-label="Close">
          <FiX />
        </button>
      </div>

        </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((field) => (
          <label key={field} className="text-sm text-gray-600">
            {field}
            <input
              className="mt-2 w-full rounded-lg border border-gray-300 px-3 py-2 outline-none transition focus:border-black"
              placeholder={`Enter ${field.toLowerCase()}`}
            />
          </label>
        ))}
      </div>

      {/* TABLE */}
      <div className="border border-gray-200 rounded-lg overflow-hidden">
      <div className="mt-6 flex flex-wrap justify-end gap-3">
        <button onClick={onClose} className="rounded-lg border border-gray-300 px-4 py-2 text-sm transition hover:border-black">Cancel</button>
        <button className="rounded-lg bg-black px-4 py-2 text-sm text-white transition hover:bg-gray-800">Save</button>
      </div>
    </div>
  </div>
);

        {/* HEADER */}
        <div className="grid grid-cols-5 text-xs uppercase text-gray-500 bg-gray-50 px-4 py-3 border-b">
          <div>Name</div>
          <div>Course</div>
          <div>Date</div>
          <div>Status</div>
          <div>Action</div>
        </div>
const TCMI = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [activeSubSection, setActiveSubSection] = useState(sectionSubSections.Dashboard[0]);
  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [openModal, setOpenModal] = useState(null);

  const filteredLeads = useMemo(
    () =>
      leadData.filter((lead) => {
        const matchesSearch =
          lead.name.toLowerCase().includes(searchText.toLowerCase()) ||
          lead.source.toLowerCase().includes(searchText.toLowerCase());
        const matchesFilter = statusFilter === "All" || lead.status === statusFilter;
        return matchesSearch && matchesFilter;
      }),
    [searchText, statusFilter]
  );

        {/* ROWS */}
        {filteredData.length === 0 ? (
          <div className="p-6 text-center text-sm text-gray-400">
            No students found
          </div>
        ) : (
          filteredData.map((item) => (
            <div
              key={item.id}
              className="grid grid-cols-5 px-4 py-3 border-b text-sm items-center hover:bg-gray-50"
            >
              <div>{item.name}</div>
              <div>{item.course}</div>
              <div>{item.date}</div>

              <div>
                <span className="text-xs px-2 py-1 rounded-full border border-green-600 text-green-600">
                  {item.status}
                </span>
              </div>
  const filteredStudents = useMemo(
    () =>
      studentData.filter((student) => {
        if (!searchText) return true;
        return (
          student.name.toLowerCase().includes(searchText.toLowerCase()) ||
          student.course.toLowerCase().includes(searchText.toLowerCase()) ||
          student.batch.toLowerCase().includes(searchText.toLowerCase())
        );
      }),
    [searchText]
  );

              {/* ACTIONS */}
              <div className="flex gap-2">

                {/* VIEW */}
                <button
                  onClick={() => setViewStudent(item.fullData)}
                  className="p-2 border rounded hover:bg-gray-100"
                >
                  <FiEye />
                </button>

                {/* EDIT */}
                <button
                  onClick={() => {
                    setEditStudent(item);
                    setOpenForm(true);
                  }}
                  className="p-2 border rounded hover:bg-gray-100"
                >
                  <FiEdit2 />
                </button>
  const switchSection = (section) => {
    setActiveSection(section);
    setActiveSubSection(sectionSubSections[section][0]);
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case "Dashboard":
        return (
          <>
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {dashboardStats.map(({ label, value, icon: Icon }) => (
                <div key={label} className={cardClass}>
                  <div className="flex items-center justify-between text-gray-500"><Icon size={18} /><FiTrendingUp size={16} /></div>
                  <p className="mt-4 text-2xl font-semibold">{value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.16em] text-gray-500">{label}</p>
                </div>
              ))}
            </div>
            <section className={cardClass}>
              <h2 className="mb-2 text-sm uppercase tracking-[0.16em]" style={headingStyle}>Role-Based Access</h2>
              <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
                {roleData.map((role) => (
                  <div key={role.role} className="rounded-lg border border-gray-200 p-3">
                    <p className="text-sm font-medium">{role.role}</p>
                    <p className="text-xs text-gray-500">{role.access}</p>
                  </div>
                ))}
              </div>
            </section>
          </>
        );
      case "Leads":
        return (
          <section className={cardClass}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-[0.16em]" style={headingStyle}>Lead Management</h2>
              <FiChevronRight className="text-gray-500" />
            </div>
          ))
        )}
      </div>

      {/* FORM */}
      <StudentForm
        isOpen={openForm}
        onClose={() => {
          setOpenForm(false);
          setEditStudent(null);
        }}
        onSubmit={handleAddStudent}
        editData={editStudent?.fullData} // 🔥 IMPORTANT
      />

      {/* VIEW MODAL */}
      {viewStudent && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-2xl p-6 rounded-xl space-y-4 max-h-[80vh] overflow-y-auto">

            <div className="flex justify-between items-center">
              <h2 className="text-lg font-medium">Student Details</h2>
              <button onClick={() => setViewStudent(null)}>✕</button>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <TableHeader titles={["Lead", "Status", "Source", "Follow-up", "Notes"]} />
              {filteredLeads.map((lead) => (
                <div key={lead.name} className="grid border-b border-gray-100 px-4 py-3 text-sm last:border-b-0" style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }}>
                  <div>{lead.name}</div>
                  <div><span className={`rounded-full border px-2 py-1 text-xs ${statusClass[lead.status]}`}>{lead.status}</span></div>
                  <div>{lead.source}</div>
                  <div>{lead.followUp}</div>
                  <div className="text-gray-500">{lead.notes}</div>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">

              {Object.entries(viewStudent).map(([key, value]) => (
                <div key={key}>
                  <p className="text-gray-400 text-xs capitalize">{key}</p>
                  <p>{value?.toString()}</p>
            <div className="mt-4 grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
              <button className="rounded-lg border border-gray-300 p-2 text-left transition hover:border-black"><FiClock className="mb-1" /> Follow-up reminders</button>
              <button className="rounded-lg border border-gray-300 p-2 text-left transition hover:border-black"><FiUserCheck className="mb-1" /> Convert lead to student</button>
            </div>
          </section>
        );
      case "Students":
        return (
          <section className={cardClass}>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm uppercase tracking-[0.16em]" style={headingStyle}>Student Management</h2>
              <FiChevronRight className="text-gray-500" />
            </div>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <TableHeader titles={["Student", "Course", "Batch", "Attendance", "Fees"]} />
              {filteredStudents.map((student) => (
                <div key={student.name} className="grid border-b border-gray-100 px-4 py-3 text-sm last:border-b-0" style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }}>
                  <div>{student.name}</div>
                  <div>{student.course}</div>
                  <div>{student.batch}</div>
                  <div>{student.attendance}</div>
                  <div><span className={`rounded-full border px-2 py-1 text-xs ${statusClass[student.feeStatus]}`}>{student.feeStatus}</span></div>
                </div>
              ))}
            </div>
          </section>
        );
      case "Courses":
        return (
          <section className={cardClass}>
            <h2 className="mb-3 text-sm uppercase tracking-[0.16em]" style={headingStyle}>Course System</h2>
            <div className="grid gap-3 lg:grid-cols-3">
              {courseData.map((course) => (
                <div key={course.program} className="rounded-xl border border-gray-200 p-3">
                  <p className="text-sm font-medium">{course.program}</p>
                  <p className="text-xs text-gray-600">{course.duration} • {course.fee}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.14em] text-gray-500">{course.students} assigned students</p>
                </div>
              ))}
            </div>
          </section>
        );
      case "Batches":
      case "Attendance":
        return (
          <section className={cardClass}>
            <h2 className="mb-3 text-sm uppercase tracking-[0.16em]" style={headingStyle}>Batch & Attendance</h2>
            <div className="space-y-2">
              {batchData.map((batch) => (
                <div key={batch.code} className="rounded-xl border border-gray-200 p-3">
                  <p className="text-sm font-medium">{batch.code}</p>
                  <p className="text-xs text-gray-600">{batch.trainer} • {batch.timing}</p>
                  <p className="text-xs text-gray-500">{batch.students} students • auto percentage enabled</p>
                </div>
              ))}
            </div>
          </section>
        );
      case "Exams":
      case "Certificates":
        return (
          <section className={cardClass}>
            <h2 className="mb-3 text-sm uppercase tracking-[0.16em]" style={headingStyle}>Exams & Certificates</h2>
            <div className="space-y-2">
              {examData.map((exam) => (
                <div key={exam.exam} className="rounded-xl border border-gray-200 p-3">
                  <p className="text-sm font-medium">{exam.exam}</p>
                  <p className="text-xs text-gray-600">{exam.batch} • {exam.date}</p>
                  <p className="text-xs text-gray-500">{exam.marksType} • auto grading</p>
                </div>
              ))}
              <button className="flex w-full items-center justify-between rounded-xl border border-gray-300 p-3 text-sm transition hover:border-black">
                Generate marksheet & certificate PDF
                <FiDownload />
              </button>
            </div>
          </section>
        );
      case "Finance":
        return (
          <section className={cardClass}>
            <h2 className="mb-3 text-sm uppercase tracking-[0.16em]" style={headingStyle}>Finance System</h2>
            <div className="overflow-x-auto rounded-xl border border-gray-200">
              <TableHeader titles={["Student", "Plan", "Paid", "Due", "Receipt"]} />
              {financeData.map((record) => (
                <div key={record.receipt} className="grid border-b border-gray-100 px-4 py-3 text-sm last:border-b-0" style={{ gridTemplateColumns: "repeat(5, minmax(0, 1fr))" }}>
                  <div>{record.student}</div>
                  <div>{record.plan}</div>
                  <div>{record.paid}</div>
                  <div>{record.due}</div>
                  <div>{record.receipt}</div>
                </div>
              ))}
            </div>
          </section>
        );
      case "Documents":
        return (
          <section className={cardClass}>
            <h2 className="mb-3 text-sm uppercase tracking-[0.16em]" style={headingStyle}>Document Management</h2>
            <div className="rounded-xl border border-gray-200">
              {documentData.map((doc) => (
                <div key={`${doc.student}-${doc.file}`} className="flex items-center justify-between gap-3 border-b border-gray-100 p-3 text-sm last:border-b-0">
                  <div>
                    <p>{doc.student}</p>
                    <p className="text-xs text-gray-500">{doc.file} • {doc.type}</p>
                  </div>
                  <div className="text-xs text-gray-500">{doc.updated}</div>
                  <button className="rounded-lg border border-gray-300 p-2 transition hover:border-black" aria-label="Download document"><FiDownload size={14} /></button>
                </div>
              ))}

            </div>
          </section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-3 py-1 text-black sm:px-4" style={bodyStyle}>
      <div className="rounded-2xl border border-gray-200 bg-white p-4 sm:p-6">
        <p className="text-xs uppercase tracking-[0.2em] text-gray-500">Creatous Collective / TCMI</p>
        <h1 className="mt-2 text-2xl uppercase tracking-[0.08em] sm:text-3xl" style={headingStyle}>The Creatous Music Institute</h1>
        <p className="mt-2 max-w-3xl text-sm text-gray-600">Minimal, premium, editorial interface using a black/grey/white system with clean borders and subtle interactions.</p>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white p-3">
        <div className="flex gap-2 overflow-x-auto pb-1">
          {sections.map((section) => (
            <button
              key={section}
              onClick={() => switchSection(section)}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs uppercase tracking-[0.15em] transition ${
                activeSection === section ? "border-black bg-black text-white" : "border-gray-300 bg-white text-gray-700 hover:border-black"
              }`}
            >
              {section}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap gap-2">
          {sectionSubSections[activeSection].map((sub) => (
            <button
              key={sub}
              onClick={() => setActiveSubSection(sub)}
              className={`rounded-lg border px-3 py-1.5 text-xs uppercase tracking-[0.12em] transition ${
                sub === activeSubSection ? "border-black text-black" : "border-gray-300 text-gray-500 hover:border-black"
              }`}
            >
              {sub}
            </button>
          ))}
        </div>
      </div>

          </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="relative sm:col-span-2 lg:col-span-2">
          <FiSearch className="pointer-events-none absolute left-3 top-3.5 text-gray-400" />
          <input
            value={searchText}
            onChange={(event) => setSearchText(event.target.value)}
            placeholder="Search by name, batch, source..."
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-black"
          />
        </div>
      )}

        <div className="relative">
          <FiFilter className="pointer-events-none absolute left-3 top-3.5 text-gray-400" />
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value)}
            className="w-full appearance-none rounded-xl border border-gray-300 bg-white py-3 pl-10 pr-4 text-sm outline-none transition focus:border-black"
          >
            <option>All</option><option>Hot</option><option>Warm</option><option>Cold</option>
          </select>
        </div>

        <button
          onClick={() => setOpenModal(activeSection)}
          className="flex items-center justify-center gap-2 rounded-xl bg-black px-4 py-3 text-sm text-white transition hover:bg-gray-800"
        >
          <FiPlus /> Add {activeSection === "Dashboard" ? "Entry" : activeSection.slice(0, -1)}
        </button>
      </div>

      {renderSectionContent()}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <button className="flex items-center justify-between rounded-xl border border-gray-300 bg-white p-3 text-sm transition hover:border-black"><span className="flex items-center gap-2"><FiPlus /> Create Batch</span><FiGrid size={14} /></button>
        <button className="flex items-center justify-between rounded-xl border border-gray-300 bg-white p-3 text-sm transition hover:border-black"><span className="flex items-center gap-2"><FiUser /> Assign Trainer</span><FiEdit2 size={14} /></button>
        <button className="flex items-center justify-between rounded-xl border border-gray-300 bg-white p-3 text-sm transition hover:border-black"><span className="flex items-center gap-2"><FiFileText /> Upload Registration</span><FiUpload size={14} /></button>
        <button className="flex items-center justify-between rounded-xl border border-gray-300 bg-white p-3 text-sm transition hover:border-black"><span className="flex items-center gap-2"><FiFolder /> Student Files</span><FiChevronRight size={14} /></button>
      </div>

      {openModal && (
        <Modal
          title={`${openModal === "Dashboard" ? "Quick" : openModal} Form`}
          fields={
            {
              Dashboard: ["Metric", "Value", "Date", "Owner"],
              Leads: ["Name", "Phone", "Status", "Notes"],
              Students: ["Name", "Course", "Batch", "Fee Plan"],
              Courses: ["Program", "Duration", "Fee", "Level"],
              Batches: ["Batch Name", "Trainer", "Timing", "Capacity"],
              Attendance: ["Batch", "Date", "Present", "Absent"],
              Exams: ["Exam Name", "Batch", "Date", "Type"],
              Certificates: ["Student", "Course", "Grade", "QR ID"],
              Finance: ["Student", "Amount", "Installment", "Discount"],
              Documents: ["Student", "File Type", "Reference", "Remarks"],
            }[openModal]
          }
          onClose={() => setOpenModal(null)}
        />
      )}
    </div>
  );
};

export default TCMI;
