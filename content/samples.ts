import type { DemoResult } from "@/lib/ai-types";
import type { AudienceSlug } from "./audiences";

// Sample lessons a visitor can tap instead of pasting their own.
export const SAMPLE_LESSONS: { id: string; label: string; text: string }[] = [
  {
    id: "pythagoras",
    label: "Grade 8 Math · Pythagorean Theorem",
    text: `In a right triangle, the longest side is called the hypotenuse. It is always the side opposite the right angle. The other two sides are called the legs.

The Pythagorean Theorem says that the square of the hypotenuse is equal to the sum of the squares of the two legs. If the legs are a and b and the hypotenuse is c, then a² + b² = c².

For example, if one leg is 3 units and the other leg is 4 units, then 3² + 4² = 9 + 16 = 25, so the hypotenuse is 5 units. This is called a 3-4-5 triangle.

We use the theorem to find a missing side of a right triangle when we know the other two sides, such as finding how long a ladder must be to reach a window.`,
  },
  {
    id: "photosynthesis",
    label: "Grade 7 Science · Photosynthesis",
    text: `Photosynthesis is the process plants use to make their own food. It happens mainly in the leaves, inside tiny parts of the cell called chloroplasts. Chloroplasts contain a green pigment called chlorophyll, which captures energy from sunlight.

The plant takes in carbon dioxide from the air through small openings in the leaves called stomata, and absorbs water from the soil through its roots. Using the energy from sunlight, the plant turns carbon dioxide and water into glucose, a kind of sugar, and releases oxygen into the air.

Glucose gives the plant energy to grow. The oxygen released is the same oxygen that people and animals breathe. This is why plants are important not only as food, but for the air we breathe.`,
  },
  {
    id: "katipunan",
    label: "Grade 6 AP · Ang Katipunan",
    text: `Ang Katipunan, o Kataas-taasang, Kagalang-galangang Katipunan ng mga Anak ng Bayan (KKK), ay isang lihim na samahan na itinatag noong 1892 sa Maynila. Ang layunin nito ay makamit ang kalayaan ng Pilipinas mula sa Espanya sa pamamagitan ng himagsikan.

Si Andrés Bonifacio ang kilala bilang Supremo ng Katipunan. Ang mga kasapi ay sumusumpa ng katapatan sa samahan, at madalas silang gumagamit ng mga lihim na pangalan upang hindi mahuli ng mga Espanyol.

Noong Agosto 1896, natuklasan ng mga Espanyol ang samahan. Pinunit ng mga Katipunero ang kanilang mga cedula, o sertipiko ng pagbabayad ng buwis, bilang tanda ng kanilang paghihimagsik. Ito ang naging simula ng Himagsikang Pilipino laban sa Espanya.`,
  },
];

// What the demo shows when the booth wifi fails or the AI is over budget.
// Generated for the Pythagorean sample; matches the shape the API returns.
export const FALLBACK_DEMO: DemoResult = {
  summary:
    "In a right triangle, the longest side — the hypotenuse — sits opposite the right angle. The Pythagorean Theorem says a² + b² = c²: the squares of the two legs add up to the square of the hypotenuse. That lets you find any missing side, like a 3-4-5 triangle where 9 + 16 = 25.",
  questions: [
    {
      question: "Which side of a right triangle is the hypotenuse?",
      options: [
        "The shortest side",
        "The side opposite the right angle",
        "Either of the two legs",
        "The side next to the smallest angle",
      ],
      answer: 1,
    },
    {
      question: "If the legs of a right triangle are 3 and 4, how long is the hypotenuse?",
      options: ["5", "7", "12", "25"],
      answer: 0,
    },
    {
      question: "Which equation states the Pythagorean Theorem?",
      options: ["a + b = c", "a² − b² = c²", "a² + b² = c²", "a × b = c"],
      answer: 2,
    },
  ],
  note: "Students often forget that c² = 25 still needs a square root — expect some to answer 25 instead of 5.",
};

// Suggested questions for the Ask box, by audience.
export const SUGGESTED_QUESTIONS: Record<AudienceSlug, string[]> = {
  owner: ["How is pricing decided?", "Can we start with a pilot?", "Does it handle billing and enrollment?"],
  teacher: [
    "What file types can I upload?",
    "Can students ask questions in Taglish?",
    "Do I approve everything before students see it?",
  ],
  government: [
    "Who can see a student's records?",
    "Is every grade change traceable?",
    "Is one school's data separated from another's?",
  ],
  investor: ["Which schools use EduSphere today?", "What does the platform replace?", "How does rollout work?"],
  everyone: ["What is EduSphere in one sentence?", "How does the AI Teacher work?", "How much does it cost?"],
};
