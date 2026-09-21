import type { Stat } from "./types";

// Every line here traces back to edusphere-ai.com. Do not add claims the site doesn't make.
export const SITE = {
  name: "EduSphere AI",
  url: "https://edusphere-ai.com",
  tagline: "One platform. Complete school intelligence.",
  description:
    "AI lessons, student records, operations and finance in one platform that understands your whole school.",
  contactEmail: "edusphereai.ph@gmail.com",
  facebook: "https://www.facebook.com/profile.php?id=61593503322497",
  footerLine: "Built in the Philippines for schools",
  year: "2026",

  proof: {
    school: "San Isidro Academy",
    asOf: "September 2026",
    stats: [
      { value: "96", label: "Sections live" },
      { value: "128", label: "AI lessons" },
      { value: "92%", label: "Completion" },
      { value: "86%", label: "Average quiz score" },
    ] satisfies Stat[],
  },

  pillars: [
    {
      title: "AI Academic Systems",
      items: [
        "Intelligent Learning Management System (AI-LMS)",
        "Adaptive Learning Platforms",
        "AI-based Assessment Tools",
      ],
    },
    {
      title: "Management Information System",
      items: [
        "Finance & Billing Management",
        "Human Resources & Payroll",
        "Assets & Procurement",
      ],
    },
    {
      title: "Quality Information System",
      items: [
        "Quality Assurance Dashboards",
        "Outcomes-Based Education Tracking",
        "Internal Audit & Survey Management",
      ],
    },
    {
      title: "Data & Analytics",
      items: [
        "Administrator Dashboard",
        "Academic Performance Forecasting",
        "Accreditation & Compliance Reporting",
      ],
    },
    {
      title: "Institutional Systems",
      items: [
        "Smart Enrollment & Scheduling",
        "Student Information System with Analytics",
        "Faculty Performance Monitoring",
      ],
    },
  ],
} as const;
