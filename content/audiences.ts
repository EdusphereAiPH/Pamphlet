import type { Section } from "./types";

export const AUDIENCE_SLUGS = ["owner", "teacher", "government", "investor", "everyone"] as const;
export type AudienceSlug = (typeof AUDIENCE_SLUGS)[number];

export type Audience = {
  slug: AudienceSlug;
  /** Full label on the picker card. */
  label: string;
  /** Chip label in the role switcher. */
  short: string;
  /** One line under the label on the picker card. */
  tagline: string;
  /** "For teachers" — eyebrow above the track headline. */
  forLine: string;
  /** Track headline. */
  hook: string;
  /** One or two sentences under the headline. */
  intro: string;
  /** Subject line for the mailto CTA. */
  ctaSubject: string;
  /** Index of the section after which the live AI Teacher demo appears. Defaults to the last. */
  demoAfter?: number;
  sections: Section[];
};

const product = (n: 1 | 2 | 3 | 4, alt: string) => ({
  src: [
    "/product/step-1-upload.jpg",
    "/product/step-2-ai-understands.jpg",
    "/product/step-3-teacher-approves.jpg",
    "/product/step-4-one-record.jpg",
  ][n - 1],
  alt,
});

export const AUDIENCES: Audience[] = [
  {
    slug: "owner",
    label: "School owner or administrator",
    short: "Owner",
    tagline: "Run the whole school from one place.",
    forLine: "For school owners and administrators",
    hook: "Run the whole school from one place.",
    intro:
      "Enrollment, grades, billing, teaching and analytics in one platform that understands your whole school — instead of five systems stitched together.",
    ctaSubject: "Proposal for our school",
    sections: [
      {
        eyebrow: "The idea",
        heading: "A school shouldn't feel like five systems stitched together.",
        body: "It should feel like one. EduSphere combines school operations with intelligence, so records, finance and teaching share one source of truth instead of living in unrelated tools.",
        bullets: [
          "Smart enrollment & scheduling",
          "Student information system with analytics",
          "Finance & billing management",
          "Human resources & payroll",
          "Assets & procurement",
        ],
      },
      {
        eyebrow: "Command Center",
        heading: "See the school in real time.",
        body: "Enrollment, finance, teaching activity, student performance and alerts in one executive view. Not a report you wait for at the end of the term — the school as it is today.",
        image: product(4, "EduSphere dashboard showing one connected student record"),
      },
      {
        eyebrow: "Finance",
        heading: "Billing with school context.",
        body: "Payments, balances, official records, reconciliation and financial visibility tied to the student journey. Tuition, payroll, procurement and assets in the same platform as the students they serve.",
      },
      {
        eyebrow: "Pricing & rollout",
        heading: "Priced to your size. Rolled out at your pace.",
        body: "No public pricing — a proposal shaped around your size, workflow and rollout goals. Most schools begin with a pilot, then go school-wide with a dedicated onboarding lead and a structured implementation plan.",
        quote: {
          text: "A 200-student school should not pay the same as a 10,000-student university.",
          attribution: "EduSphere pricing principle",
        },
      },
    ],
  },
  {
    slug: "teacher",
    label: "Teacher",
    short: "Teacher",
    tagline: "Upload a lesson. Let AI do the heavy lifting. You approve.",
    forLine: "For teachers",
    hook: "Upload a lesson. AI teaches. You supervise.",
    intro:
      "EduSphere starts from your approved material and does the heavy lifting — narration, visuals, quizzes and feedback — while you stay in charge of what students see.",
    ctaSubject: "AI Teacher for my classes",
    demoAfter: 2,
    sections: [
      {
        eyebrow: "Step 01",
        heading: "Start with what you already have.",
        body: "PDF, PowerPoint, Word, images, video or a lesson plan. EduSphere starts from the teacher's approved material — no rewriting your lessons into a new format.",
        image: product(1, "Uploading a lesson file into EduSphere"),
      },
      {
        eyebrow: "Step 02",
        heading: "From lesson to learning.",
        body: "Approved lessons become narration, visuals, student Q&A, quizzes and feedback. Students can ask for it again in Taglish, and the AI stays grounded in your lesson.",
        quote: {
          text: "Imagine natin na may right triangle. The Pythagorean Theorem helps us relate its three sides…",
          attribution: "AI Teacher Mode · Grade 8 Mathematics",
        },
        image: product(2, "EduSphere AI understanding the uploaded lesson"),
      },
      {
        eyebrow: "Step 03",
        heading: "AI proposes. You approve.",
        body: "Generated lessons, quizzes and feedback stay in review until you sign off. Nothing reaches students without a human decision — it stays hidden from them until a teacher approves.",
        image: product(3, "Teacher reviewing and approving an AI-generated lesson"),
      },
      {
        eyebrow: "Step 04",
        heading: "Know where they're stuck.",
        body: "Teacher analytics show completion and quiz results by section, with insights you can act on the same day.",
        quote: {
          text: "Section 8-B struggled with hypotenuse problems in the last quiz. A guided 3-4-5 example is ready to add.",
          attribution: "EduSphere AI Insight",
        },
        stats: [
          { value: "128", label: "AI lessons" },
          { value: "92%", label: "Completion" },
          { value: "86%", label: "Average quiz score" },
        ],
      },
    ],
  },
  {
    slug: "government",
    label: "Government or DepEd official",
    short: "Government",
    tagline: "Accountability, audit trails and data boundaries by design.",
    forLine: "For government and DepEd officials",
    hook: "Accountability, built into the foundation.",
    intro:
      "Access control, audit history, data boundaries and teacher review are part of how EduSphere is built — not features added later.",
    ctaSubject: "EduSphere for our schools",
    sections: [
      {
        eyebrow: "Audit trail",
        heading: "Every change has an author and a time.",
        body: "Grades, enrollment, payments and lesson approvals are traceable. When something changes, the school can see who, what and when. Accountability without extra work.",
      },
      {
        eyebrow: "Protected school data",
        heading: "One school's records never reach another's.",
        body: "Each institution runs inside its own boundary. Data is separated by school and governed by access rules the school defines.",
        quote: { text: "No shared tables. No cross-school queries." },
      },
      {
        eyebrow: "Role-based access",
        heading: "Everyone sees what their role allows.",
        body: "Registrar, teachers, finance staff, students and parents each get their own view. Permissions follow responsibilities, not convenience. Least privilege by default.",
      },
      {
        eyebrow: "Teacher-governed AI",
        heading: "Human judgment stays in charge.",
        body: "AI-generated lessons, quizzes and feedback stay in review until a teacher signs off. Nothing reaches a student without a human decision. And the reporting institutions answer for — accreditation, compliance, quality assurance, outcomes — is built in, by a team in the Philippines building for Philippine schools.",
        bullets: [
          "Accreditation & compliance reporting",
          "Quality assurance dashboards",
          "Outcomes-based education tracking",
          "Internal audit & survey management",
        ],
      },
    ],
  },
  {
    slug: "investor",
    label: "Investor or partner",
    short: "Investor",
    tagline: "An AI-native school OS, live in Philippine schools.",
    forLine: "For investors and partners",
    hook: "The school operating system.",
    intro:
      "An AI-native platform for how Philippine institutions teach, manage and grow — already live in real schools.",
    ctaSubject: "Investor conversation",
    sections: [
      {
        eyebrow: "Thesis",
        heading: "One platform, not five tools.",
        body: "Schools today stitch together an LMS, a student information system, billing, HR and reporting from unrelated vendors. EduSphere replaces the stack with one platform where teaching, records, finance and analytics share a single source of truth — and the AI has the whole picture.",
        bullets: [
          "AI Academic Systems",
          "Management Information System",
          "Quality Information System",
          "Data & Analytics",
          "Institutional Systems",
        ],
      },
      {
        eyebrow: "Traction",
        heading: "Live in Philippine schools.",
        body: "Not a pilot deck. San Isidro Academy runs 96 sections on EduSphere today, and St. Clare College runs its management information system on the platform in production.",
        stats: [
          { value: "96", label: "Sections live" },
          { value: "128", label: "AI lessons" },
          { value: "92%", label: "Completion" },
          { value: "86%", label: "Average quiz score" },
        ],
      },
      {
        eyebrow: "Market",
        heading: "From high school to university.",
        body: "Institutions of 200 to 10,000+ students. Proposals scale with size, so pricing fits a 200-student school and a 10,000-student university alike. Rollout is pilot-first, then school-wide, with guided onboarding — a model built for the way schools actually buy.",
      },
      {
        eyebrow: "Moat",
        heading: "Trust is the product.",
        body: "Teacher-governed AI, full audit trails and per-school data boundaries are the foundation, not add-ons. That is what lets an AI platform earn a place in the institutions regulators watch most closely.",
      },
    ],
  },
  {
    slug: "everyone",
    label: "Everyone",
    short: "Everything",
    tagline: "The whole picture.",
    forLine: "For everyone",
    hook: "One platform. Complete school intelligence.",
    intro:
      "AI lessons, student records, operations and finance in one platform that understands your whole school.",
    ctaSubject: "Tell me more about EduSphere",
    demoAfter: 1,
    sections: [
      {
        eyebrow: "The idea",
        heading: "A school shouldn't feel like five systems stitched together.",
        body: "It should feel like one. EduSphere combines school operations with intelligence instead of making schools stitch together unrelated tools.",
      },
      {
        eyebrow: "AI Teacher",
        heading: "Upload lesson. AI teaches. Teacher supervises.",
        body: "Approved lessons become narration, visuals, student Q&A, quizzes and feedback. Generated material stays in review until a teacher signs off — nothing reaches students without a human decision.",
        quote: { text: "AI proposes. The teacher approves." },
        image: product(3, "Teacher reviewing and approving an AI-generated lesson"),
      },
      {
        eyebrow: "The school operating system",
        heading: "Everything important. Connected.",
        body: "Five service categories, fifteen services, one platform — for how Philippine institutions teach, manage and grow.",
        groups: [
          {
            title: "AI Academic Systems",
            items: ["AI-LMS", "Adaptive learning platforms", "AI-based assessment tools"],
          },
          {
            title: "Management Information System",
            items: ["Finance & billing", "HR & payroll", "Assets & procurement"],
          },
          {
            title: "Quality Information System",
            items: ["QA dashboards", "Outcomes-based education tracking", "Internal audit & surveys"],
          },
          {
            title: "Data & Analytics",
            items: ["Administrator dashboard", "Performance forecasting", "Accreditation & compliance reporting"],
          },
          {
            title: "Institutional Systems",
            items: ["Smart enrollment & scheduling", "Student information system", "Faculty performance monitoring"],
          },
        ],
      },
      {
        eyebrow: "Trust by design",
        heading: "Intelligence the whole school can trust.",
        body: "Access control, audit history, data boundaries and teacher review are part of the foundation, not features added later.",
        bullets: [
          "Role-based access",
          "Audit trail on every change",
          "Data isolated per school",
          "Teacher-governed AI",
        ],
      },
      {
        eyebrow: "Pricing",
        heading: "No public pricing. Just a custom proposal.",
        body: "Every proposal is shaped around your size, workflow and rollout goals, with guided onboarding and a structured implementation plan. Most schools can begin piloting within a short onboarding window.",
        quote: {
          text: "A 200-student school should not pay the same as a 10,000-student university.",
        },
      },
    ],
  },
];

export function getAudience(slug: string): Audience | undefined {
  return AUDIENCES.find((a) => a.slug === slug);
}
