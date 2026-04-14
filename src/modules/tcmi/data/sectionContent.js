export const tcmiDashboardFeatures = [
  { label: "Total Students", value: "1,280", hint: "Active enrollments across all batches" },
  { label: "New Leads", value: "146", hint: "Fresh inquiries this cycle" },
  { label: "Conversion Rate", value: "38%", hint: "Lead to enrollment conversion" },
  { label: "Monthly Revenue", value: "₹18.4L", hint: "Collected in current month" },
  { label: "Pending Fees", value: "₹3.1L", hint: "Outstanding dues to be collected" },
  { label: "Upcoming Exams", value: "12", hint: "Scheduled in the next window" },
];

export const tcmiSectionContent = {
  dashboard: {
    title: "Module Dashboard",
    description:
      "Unified snapshot of admissions, academics, operations, and collections for the TCMI unit.",
    points: [
      "Operational health indicators across all teams",
      "Current admissions funnel and closure velocity",
      "Revenue, dues, and utilization in one place",
    ],
  },
  leads: {
    title: "Leads",
    description:
      "Track inquiries from first touchpoint to counseling closure with clean lifecycle visibility.",
    points: [
      "Source-wise lead segmentation",
      "Follow-up timeline and counselor assignment",
      "Priority tags for hot, warm, and cold prospects",
    ],
  },
  students: {
    title: "Students",
    description: "Central student records for enrollment, profile data, progress, and fee standing.",
    points: [
      "Batch and program mapping",
      "Academic profile and progression overview",
      "Fee status with pending alerts",
    ],
  },
  courses: {
    title: "Courses",
    description: "Program library with duration, fee structure, capacity, and curriculum status.",
    points: [
      "Certification and diploma program catalogue",
      "Course-level capacity and seat fill rate",
      "Curriculum publishing state",
    ],
  },
  batches: {
    title: "Batches",
    description: "Schedule and trainer management for all morning, evening, and weekend cohorts.",
    points: [
      "Batch roster and timing matrix",
      "Trainer allocation dashboard",
      "Classroom and studio load visibility",
    ],
  },
  attendance: {
    title: "Attendance",
    description: "Monitor attendance performance with daily entries and low-attendance triggers.",
    points: [
      "Daily and weekly attendance capture",
      "Batch-wise percentage trends",
      "Automated low-attendance flagging",
    ],
  },
  exams: {
    title: "Exams",
    description: "Plan assessments, publish scorecards, and maintain grading workflows by batch.",
    points: [
      "Exam calendar by course and term",
      "Marks entry and moderation flow",
      "Result publication status",
    ],
  },
  certificates: {
    title: "Certificates",
    description: "Generate, verify, and archive certificates and marksheets with version integrity.",
    points: [
      "Template-driven certificate generation",
      "Verification IDs for issued certificates",
      "Bulk issue queue and audit trail",
    ],
  },
  finance: {
    title: "Finance",
    description: "End-to-end fee lifecycle management from invoicing to dues reconciliation.",
    points: [
      "Collection vs dues overview",
      "Installment tracking by student",
      "Receipt and ledger references",
    ],
  },
  documents: {
    title: "Documents",
    description: "Secure document desk for student IDs, forms, and verification files.",
    points: [
      "Required document checklist",
      "File status and upload timestamps",
      "Ready-to-verify document bins",
    ],
  },
};
