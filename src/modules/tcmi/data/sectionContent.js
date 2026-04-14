export const tcmiSummaryCards = [
  { label: "Total Students", value: "1,280", hint: "Active enrollments" },
  { label: "New Leads", value: "146", hint: "Fresh inquiries" },
  { label: "Conversion Rate", value: "38%", hint: "Lead to enrollment" },
  { label: "Monthly Revenue", value: "₹18.4L", hint: "Collected this month" },
  { label: "Pending Fees", value: "₹3.1L", hint: "Outstanding" },
  { label: "Upcoming Exams", value: "12", hint: "Next schedule" },
];

export const tcmiLeadRows = [
  {
    name: "Aarav Malhotra",
    source: "Instagram",
    status: "Hot",
    followUp: "16 Apr 2026",
    notes: "Interested in Diploma - Piano",
  },
  {
    name: "Sara Khan",
    source: "Referral",
    status: "Warm",
    followUp: "17 Apr 2026",
    notes: "Requested evening batch",
  },
  {
    name: "Vihaan Roy",
    source: "Website",
    status: "Cold",
    followUp: "19 Apr 2026",
    notes: "Needs financing options",
  },
];

export const tcmiStudentRows = [
  {
    id: "STU-1001",
    name: "Nisha Mehta",
    course: "Certification L2",
    batch: "PIA-L2-EVE",
    fees: "Paid",
    attendance: "93%",
    exam: "A",
    idDoc: "Uploaded",
    formDoc: "Uploaded",
    email: "nisha.mehta@example.com",
    phone: "+91 98765 43210",
    guardian: "Rakesh Mehta",
    address: "Andheri West, Mumbai",
  },
  {
    id: "STU-1002",
    name: "Ritvik Suri",
    course: "Diploma - Sound Design",
    batch: "SD-DIP-MOR",
    fees: "Pending",
    attendance: "86%",
    exam: "B+",
    idDoc: "Uploaded",
    formDoc: "Pending",
    email: "ritvik.suri@example.com",
    phone: "+91 91234 56789",
    guardian: "Anita Suri",
    address: "Koregaon Park, Pune",
  },
  {
    id: "STU-1003",
    name: "Ishita Sen",
    course: "Certification L4",
    batch: "VOC-L4-WKD",
    fees: "Installment",
    attendance: "97%",
    exam: "A+",
    idDoc: "Pending",
    formDoc: "Uploaded",
    email: "ishita.sen@example.com",
    phone: "+91 99887 77665",
    guardian: "Arindam Sen",
    address: "Salt Lake, Kolkata",
  },
];

export const tcmiSectionContent = {
  dashboard: {
    title: "Module Dashboard",
    description: "Unified snapshot of admissions, academics, operations, and collections for the TCMI unit.",
    featureTitle: "Dashboard Features",
    featureCards: tcmiSummaryCards.map((card) => ({ title: card.label, value: card.value })),
  },
  leads: {
    title: "Leads",
    description: "Track inquiries from first touchpoint to counseling closure with clean lifecycle visibility.",
    featureTitle: "Lead Management System",
    featureCards: [
      { title: "Add / Edit Leads" },
      { title: "Lead Status Tracking" },
      { title: "Follow-up Reminders" },
      { title: "Notes & Call Logs" },
      { title: "Convert Lead to Student" },
    ],
  },
  students: {
    title: "Students",
    description: "Central student records for enrollment, profile data, progress, and fee standing.",
    featureTitle: "Student Management",
    featureCards: [
      { title: "Detailed student table" },
      { title: "Student profile with full data" },
      { title: "Documents upload (ID, form)" },
      { title: "Course & batch info" },
      { title: "Fees, attendance, exam records" },
    ],
  },
  courses: {
    title: "Courses",
    description: "Program library with duration, fee structure, capacity, and curriculum status.",
  },
  batches: {
    title: "Batches",
    description: "Schedule and trainer management for all morning, evening, and weekend cohorts.",
  },
  attendance: {
    title: "Attendance",
    description: "Monitor attendance performance with daily entries and low-attendance triggers.",
  },
  exams: {
    title: "Exams",
    description: "Plan assessments, publish scorecards, and maintain grading workflows by batch.",
  },
  certificates: {
    title: "Certificates",
    description: "Generate, verify, and archive certificates and marksheets with version integrity.",
  },
  finance: {
    title: "Finance",
    description: "End-to-end fee lifecycle management from invoicing to dues reconciliation.",
  },
  documents: {
    title: "Documents",
    description: "Secure document desk for student IDs, forms, and verification files.",
  },
};
