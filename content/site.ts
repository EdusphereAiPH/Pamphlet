// Every line here traces back to edusphere-ai.com. Do not add claims the site doesn't make.

export const SITE = {
  name: "EduSphere AI",
  url: "https://edusphere-ai.com",
  urlLabel: "edusphere-ai.com",
  tagline: "One platform. Complete school intelligence.",
  description:
    "AI lessons, student records, operations and finance in one platform that understands your whole school.",
  contactEmail: "edusphereai.ph@gmail.com",
  facebook: "https://www.facebook.com/profile.php?id=61593503322497",
  footerLine: "Built in the Philippines for schools",
  copyright: "© 2026 EduSphere AI. All rights reserved.",

  proof: {
    school: "San Isidro Academy",
    headline: "96 sections live",
    stats: [
      { value: "96", label: "Sections live" },
      { value: "128", label: "AI lessons" },
      { value: "92%", label: "Completion" },
      { value: "86%", label: "Average quiz score" },
    ],
  },

  idea: {
    eyebrow: "The idea",
    heading: "A school shouldn't feel like five systems stitched together.",
    body: "It should feel like one.",
  },

  teacher: {
    eyebrow: "EduSphere AI Virtual Teacher",
    heading: "Upload lesson. AI teaches. Teacher supervises.",
    body: "Approved lessons become narration, visuals, student Q&A, quizzes and feedback.",
    steps: [
      { n: "01", title: "Upload lesson", body: "PDF, PowerPoint, Word, images, video or a lesson plan. EduSphere starts from the teacher's approved material.", image: "/product/step-1.webp" },
      { n: "02", title: "AI understands", body: "Lesson context stays grounded in the teacher's material.", image: "/product/step-2.webp" },
      { n: "03", title: "Teacher approves", body: "Hidden from students until a teacher approves.", image: "/product/step-3.webp" },
      { n: "04", title: "One record", body: "Enrollment, grades, documents and academic history stay connected.", image: "/product/step-4.webp" },
    ],
    demo: {
      context: "Grade 8 • Mathematics",
      objective: "Understand the relationship between the sides of a right triangle.",
      quote: "Imagine natin na may right triangle. The Pythagorean Theorem helps us relate its three sides…",
      studentAsk: "Can you explain that again in Taglish?",
      reply: "Sure. Isipin natin na may right triangle. The longest side is the hypotenuse, and that's the side represented by c.",
      chips: ["Lesson context · Grounded", "Voice narration · On", "Student Q&A · Enabled", "Quiz · Ready"],
    },
  },

  os: {
    eyebrow: "The school operating system",
    heading: "Everything important. Connected.",
    body: "EduSphere combines school operations with intelligence instead of making schools stitch together unrelated tools.",
    systems: [
      { id: "teaching", title: "Teaching System", lead: "AI-assisted teaching inside the LMS.", body: "Lesson upload, AI lesson building, narration, avatar delivery, Q&A, quizzes, feedback, and teacher analytics.", stats: [{ value: "128", label: "AI lessons" }, { value: "92%", label: "Completion" }] },
      { id: "records", title: "Student Records", lead: "Records that stay connected.", body: "Enrollment, grades, documents, academic history, and traceable changes." },
      { id: "billing", title: "Finance & Billing", lead: "Billing with school context.", body: "Payments, balances, official records, reconciliation, and financial visibility tied to the student journey." },
      { id: "command-center", title: "Command Center", lead: "See the school in real time.", body: "Enrollment, finance, teaching activity, student performance, and alerts in one executive view." },
    ],
  },

  trust: {
    eyebrow: "Trust by design",
    heading: "Intelligence the whole school can trust.",
    body: "Access control, audit history, data boundaries and teacher review are part of the foundation, not features added later.",
    pillars: [
      { id: "rbac", title: "Role-based access", lead: "Everyone sees what their role allows.", body: "Registrar, teachers, finance staff, students and parents each get their own view. Permissions follow responsibilities, not convenience.", tag: "Least privilege by default." },
      { id: "audit", title: "Audit trail", lead: "Every change has an author and a time.", body: "Grades, enrollment, payments and lesson approvals are traceable. When something changes, the school can see who, what and when.", tag: "Accountability without extra work." },
      { id: "data-boundary", title: "Protected school data", lead: "One school's records never reach another's.", body: "Each institution runs inside its own boundary. Data is separated by school and governed by access rules the school defines.", tag: "No shared tables. No cross-school queries." },
      { id: "teacher-governed", title: "Teacher-governed AI", lead: "AI proposes. The teacher approves.", body: "Generated lessons, quizzes and feedback stay in review until a teacher signs off. Nothing reaches students without a human decision.", tag: "Human judgment stays in charge." },
    ],
  },

  services: {
    eyebrow: "Core services",
    heading: "All services. Five categories.",
    body: "AI-powered services for how Philippine institutions teach, manage and grow.",
    categories: [
      { id: "cat-academic", letter: "A", title: "AI Academic Systems", items: ["Intelligent Learning Management System (AI-LMS)", "Adaptive Learning Platforms", "AI-based Assessment Tools"] },
      { id: "cat-mis", letter: "B", title: "Management Information System", items: ["Finance & Billing Management", "Human Resources & Payroll", "Assets & Procurement"] },
      { id: "cat-qis", letter: "C", title: "Quality Information System", items: ["Quality Assurance Dashboards", "Outcomes-Based Education Tracking", "Internal Audit & Survey Management"] },
      { id: "cat-analytics", letter: "D", title: "Data & Analytics", items: ["Administrator Dashboard", "Academic Performance Forecasting", "Accreditation & Compliance Reporting"] },
      { id: "cat-institutional", letter: "E", title: "Institutional Systems", items: ["Smart Enrollment & Scheduling", "Student Information System with Analytics", "Faculty Performance Monitoring"] },
    ],
  },

  pricing: {
    eyebrow: "Pricing",
    heading: "No public pricing. Just a custom proposal.",
    body: "Tell us about your institution and we'll recommend the best setup for your school.",
    quote: "A 200-student school should not pay the same as a 10,000-student university.",
    points: [
      { title: "Tailored for your school", body: "Every proposal is shaped around your size, workflow, and rollout goals." },
      { title: "Guided onboarding", body: "We help your team get started smoothly with a structured implementation plan." },
      { title: "Fast setup", body: "Most schools can begin piloting within a short onboarding window." },
    ],
  },

  close: {
    heading: "Ready when your school is.",
    body: "Tell us about your institution and we'll recommend the best setup for your school.",
    cta: "Book a Demo",
    cta2: "Talk to Our Team",
    write: "Write to us",
  },
} as const;
