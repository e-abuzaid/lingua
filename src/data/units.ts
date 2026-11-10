import { Unit } from "@/types/learning";

export const UNITS: Unit[] = [
  // Spanish Units
  {
    id: "unit-es-1",
    languageId: "es",
    unitNumber: 1,
    title: "Greetings & Introductions",
    description: "Say hello, introduce yourself, and meet new people in Spanish.",
    level: "A1",
    order: 1,
    lessonIds: ["lesson-es-1-1", "lesson-es-1-2"],
  },
  {
    id: "unit-es-2",
    languageId: "es",
    unitNumber: 2,
    title: "Daily Life & Routines",
    description: "Talk about daily habits, hobbies, and simple activities.",
    level: "A1",
    order: 2,
    lessonIds: ["lesson-es-2-1", "lesson-es-2-2"],
  },
  {
    id: "unit-es-3",
    languageId: "es",
    unitNumber: 3,
    title: "At the Café",
    description: "Order drinks and food, ask for prices, and chat with baristas.",
    level: "A1",
    order: 3,
    lessonIds: [
      "lesson-es-3-1",
      "lesson-es-3-2",
      "lesson-es-3-3",
      "lesson-es-3-4",
      "lesson-es-3-5",
      "lesson-es-3-6",
    ],
  },

  // French Units
  {
    id: "unit-fr-1",
    languageId: "fr",
    unitNumber: 1,
    title: "First Steps in French",
    description: "Master basic greetings, politeness, and introductions.",
    level: "A1",
    order: 1,
    lessonIds: ["lesson-fr-1-1", "lesson-fr-1-2"],
  },
  {
    id: "unit-fr-2",
    languageId: "fr",
    unitNumber: 2,
    title: "At the Bistro",
    description: "Order coffee, croissants, and delicious French meals.",
    level: "A1",
    order: 2,
    lessonIds: ["lesson-fr-2-1", "lesson-fr-2-2"],
  },
  {
    id: "unit-fr-3",
    languageId: "fr",
    unitNumber: 3,
    title: "Everyday Paris",
    description: "Order at cafés, ask directions, shop, and chat with friends.",
    level: "A1",
    order: 3,
    lessonIds: [
      "lesson-fr-3-1",
      "lesson-fr-3-2",
      "lesson-fr-3-3",
      "lesson-fr-3-4",
      "lesson-fr-3-5",
      "lesson-fr-3-6",
    ],
  },

  // Japanese Units
  {
    id: "unit-ja-1",
    languageId: "ja",
    unitNumber: 1,
    title: "First Encounters",
    description: "Learn essential greetings, self-introductions, and polite bowing phrases.",
    level: "A1",
    order: 1,
    lessonIds: ["lesson-ja-1-1", "lesson-ja-1-2"],
  },
  {
    id: "unit-ja-2",
    languageId: "ja",
    unitNumber: 2,
    title: "At the Restaurant",
    description: "Order ramen, sushi, and interact politely at Japanese eateries.",
    level: "A1",
    order: 2,
    lessonIds: ["lesson-ja-2-1", "lesson-ja-2-2"],
  },
  {
    id: "unit-ja-3",
    languageId: "ja",
    unitNumber: 3,
    title: "Tokyo Daily Life",
    description: "Visit cafés, ride trains, shop in Shibuya, and meet friends.",
    level: "A1",
    order: 3,
    lessonIds: [
      "lesson-ja-3-1",
      "lesson-ja-3-2",
      "lesson-ja-3-3",
      "lesson-ja-3-4",
      "lesson-ja-3-5",
      "lesson-ja-3-6",
    ],
  },

  // German Units
  {
    id: "unit-de-1",
    languageId: "de",
    unitNumber: 1,
    title: "Welcome to German",
    description: "Say hello, say goodbye, and exchange names confidently.",
    level: "A1",
    order: 1,
    lessonIds: ["lesson-de-1-1", "lesson-de-1-2"],
  },
  {
    id: "unit-de-2",
    languageId: "de",
    unitNumber: 2,
    title: "At the Bakery",
    description: "Order bread, pretzels, and pastries in German.",
    level: "A1",
    order: 2,
    lessonIds: ["lesson-de-2-1", "lesson-de-2-2"],
  },
  {
    id: "unit-de-3",
    languageId: "de",
    unitNumber: 3,
    title: "Life in Berlin",
    description: "Order at cafés, navigate the U-Bahn, shop, and socialize.",
    level: "A1",
    order: 3,
    lessonIds: [
      "lesson-de-3-1",
      "lesson-de-3-2",
      "lesson-de-3-3",
      "lesson-de-3-4",
      "lesson-de-3-5",
      "lesson-de-3-6",
    ],
  },

  // Korean Units
  {
    id: "unit-ko-1",
    languageId: "ko",
    unitNumber: 1,
    title: "Seoul Essentials",
    description: "Greet politely, order coffee in Hongdae, and navigate Seoul.",
    level: "A1",
    order: 1,
    lessonIds: [
      "lesson-ko-1-1",
      "lesson-ko-1-2",
      "lesson-ko-1-3",
      "lesson-ko-1-4",
      "lesson-ko-1-5",
      "lesson-ko-1-6",
    ],
  },

  // Chinese Units
  {
    id: "unit-zh-1",
    languageId: "zh",
    unitNumber: 1,
    title: "Mandarin Basics",
    description: "Master polite greetings, tea house orders, and everyday Mandarin.",
    level: "A1",
    order: 1,
    lessonIds: [
      "lesson-zh-1-1",
      "lesson-zh-1-2",
      "lesson-zh-1-3",
      "lesson-zh-1-4",
      "lesson-zh-1-5",
      "lesson-zh-1-6",
    ],
  },

  // Italian Units
  {
    id: "unit-it-1",
    languageId: "it",
    unitNumber: 1,
    title: "La Dolce Vita",
    description: "Order espresso, explore Roman piazzas, and chat with locals.",
    level: "A1",
    order: 1,
    lessonIds: [
      "lesson-it-1-1",
      "lesson-it-1-2",
      "lesson-it-1-3",
      "lesson-it-1-4",
      "lesson-it-1-5",
      "lesson-it-1-6",
    ],
  },

  // Portuguese Units
  {
    id: "unit-pt-1",
    languageId: "pt",
    unitNumber: 1,
    title: "Rio & Lisbon Essentials",
    description: "Warm greetings, café orders, beach directions, and daily life.",
    level: "A1",
    order: 1,
    lessonIds: [
      "lesson-pt-1-1",
      "lesson-pt-1-2",
      "lesson-pt-1-3",
      "lesson-pt-1-4",
      "lesson-pt-1-5",
      "lesson-pt-1-6",
    ],
  },
];

export function getUnitsByLanguage(languageId: string): Unit[] {
  return UNITS.filter((u) => u.languageId.toLowerCase() === languageId.toLowerCase());
}

export function getUnitById(id: string): Unit | undefined {
  return UNITS.find((u) => u.id === id);
}

export function getDefaultUnitForLanguage(languageId: string): Unit | undefined {
  const units = getUnitsByLanguage(languageId);
  return units.find((u) => u.unitNumber === 3) || units[0];
}

