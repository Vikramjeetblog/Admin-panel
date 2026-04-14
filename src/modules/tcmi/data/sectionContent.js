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
    id: "LD-1001",
    name: "Aarav Malhotra",
    source: "Instagram",
    leadPercentage: 82,
    followUp: "2026-04-16",
    notes: "Interested in Diploma - Piano",
    converted: false,
  },
  {
    id: "LD-1002",
    name: "Sara Khan",
    source: "Referral",
    leadPercentage: 61,
    followUp: "2026-04-17",
    notes: "Requested evening batch",
    converted: false,
  },
  {
    id: "LD-1003",
    name: "Vihaan Roy",
    source: "Website",
    leadPercentage: 34,
    followUp: "2026-04-19",
    notes: "Needs financing options",
    converted: false,
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

export const tcmiCourseCatalog = [
  {
    id: "CRS-101",
    title: "Certification Level 1",
    type: "Certification",
    duration: "3 months",
    fee: "₹18,000",
    assignment: "42 students assigned",
  },
  {
    id: "CRS-204",
    title: "Certification Level 4",
    type: "Certification",
    duration: "4 months",
    fee: "₹34,000",
    assignment: "31 students assigned",
  },
  {
    id: "CRS-301",
    title: "Diploma in Music Production",
    type: "Diploma",
    duration: "12 months",
    fee: "₹1,20,000",
    assignment: "18 students assigned",
  },
];

export const tcmiBatchRows = [
  {
    id: "BAT-201",
    batchName: "PIA-L2-EVE",
    course: "Certification L2",
    trainer: "Meera Joshi",
    students: 24,
    schedule: "Mon, Wed, Fri · 6:30 PM - 8:00 PM",
    mode: "Offline",
  },
  {
    id: "BAT-202",
    batchName: "VOC-L4-WKD",
    course: "Certification L4",
    trainer: "Arjun Dey",
    students: 18,
    schedule: "Sat, Sun · 10:00 AM - 12:00 PM",
    mode: "Hybrid",
  },
];

export const tcmiAttendanceRows = [
  { id: "ATT-1001", date: "2026-04-14", batch: "PIA-L2-EVE", student: "Nisha Mehta", status: "Present" },
  { id: "ATT-1002", date: "2026-04-14", batch: "PIA-L2-EVE", student: "Ritvik Suri", status: "Absent" },
  { id: "ATT-1003", date: "2026-04-14", batch: "VOC-L4-WKD", student: "Ishita Sen", status: "Present" },
  { id: "ATT-1004", date: "2026-04-13", batch: "PIA-L2-EVE", student: "Nisha Mehta", status: "Present" },
];

export const tcmiExamRows = [
  { id: "EX-1001", examName: "Midterm Practical", batch: "PIA-L2-EVE", student: "Nisha Mehta", theoryMarks: 43, practicalMarks: 45, totalMarks: 88, grade: "A", examDate: "2026-04-18" },
  { id: "EX-1002", examName: "Midterm Practical", batch: "PIA-L2-EVE", student: "Ritvik Suri", theoryMarks: 35, practicalMarks: 37, totalMarks: 72, grade: "B+", examDate: "2026-04-18" },
];

export const tcmiCertificateRows = [
  { id: "CERT-1001", student: "Ishita Sen", batch: "VOC-L4-WKD", type: "Certificate", grade: "A+", issueDate: "2026-04-10", qrCode: "TCMI-CERT-1001" },
];

export const tcmiDocumentRows = [
  { id: "DOC-1001", student: "Nisha Mehta", batch: "PIA-L2-EVE", docType: "Registration Form", fileName: "nisha-registration.pdf", status: "Verified", uploadedOn: "2026-04-05" },
  { id: "DOC-1002", student: "Nisha Mehta", batch: "PIA-L2-EVE", docType: "ID Proof", fileName: "nisha-aadhar.pdf", status: "Pending", uploadedOn: "2026-04-08" },
];


export const tcmiFinanceRows = [
  {
    id: "FIN-1001",
    student: "Nisha Mehta",
    totalFee: 34000,
    paid: 34000,
    discount: 0,
    installment: "No",
    due: 0,
    receipt: "REC-5001",
    date: "2026-04-14",
  },
  {
    id: "FIN-1002",
    student: "Ritvik Suri",
    totalFee: 60000,
    paid: 45000,
    discount: 2000,
    installment: "Yes",
    due: 13000,
    receipt: "REC-5002",
    date: "2026-04-13",
  },
];

export const tcmiSectionContent = {
  dashboard: {
    title: "Module Dashboard",
    description: "Unified snapshot of admissions, academics, operations, and collections for the TCMI unit.",
    featureTitle: "Dashboard Features",
    featureCards: tcmiSummaryCards.map((card) => ({ title: card.label, value: card.value, description: card.hint })),
  },
  leads: {
    title: "Leads",
    description: "Track inquiries from first touchpoint to counseling closure with clean lifecycle visibility.",
    featureTitle: "Lead Management System",
    featureCards: [
      { title: "Add / Edit Leads", description: "Create new leads and update existing lead records." },
      { title: "Lead Status Tracking", description: "Track Hot, Warm, and Cold statuses in the funnel." },
      { title: "Follow-up Reminders", description: "Manage next follow-up dates with counselor context." },
      { title: "Notes & Call Logs", description: "Capture conversation history and call summaries." },
      { title: "Convert Lead to Student", description: "Convert eligible leads into student enrollment." },
    ],
  },
  students: {
    title: "Students",
    description: "Central student records for enrollment, profile data, progress, and fee standing.",
  },
  courses: {
    title: "Courses",
    description: "Course system with certification and diploma management for scalable card-based operations.",
  },
  batches: {
    title: "Batches",
    description: "Schedule and trainer management for all morning, evening, and weekend cohorts.",
    featureTitle: "Batch Management Features",
    featureCards: [
      { title: "Batch Creation", description: "Create and maintain new batches with course, start date, and mode details." },
      { title: "Assign Students & Trainers", description: "Map enrolled students and trainers to each batch for clear ownership." },
      { title: "Schedule Timing", description: "Set and manage batch timings across weekdays, weekends, and special sessions." },
    ],
  },
  attendance: {
    title: "Attendance",
    description: "Monitor attendance performance with daily entries and low-attendance triggers.",
    featureTitle: "Attendance System",
    featureCards: [
      { title: "Daily attendance marking", description: "Mark students daily with strict duplicate prevention and field validation." },
      { title: "Batch-wise tracking", description: "Track present/absent ratio by each active batch." },
      { title: "Auto percentage calculation", description: "Auto-calculate attendance percentages per student." },
    ],
  },
  exams: {
    title: "Exams",
    description: "Plan assessments, publish scorecards, and maintain grading workflows by batch.",
    featureTitle: "Exam System",
    featureCards: [
      { title: "Create exams", description: "Create exam entries with required date and exam name." },
      { title: "Assign batches", description: "Attach each exam record to an assigned batch and student." },
      { title: "Theory & practical marks", description: "Capture theory and practical marks with numeric range checks." },
      { title: "Auto grading system", description: "Automatically generate grades from total marks." },
    ],
  },
  certificates: {
    title: "Certificates",
    description: "Generate, verify, and archive certificates and marksheets with version integrity.",
  },
  finance: {
    title: "Finance",
    description: "Track payments, installments, discounts, receipts, and pending dues with full card operations.",
  },
  documents: {
    title: "Documents",
    description: "Secure document desk for student IDs, forms, and verification files.",
  },
};
