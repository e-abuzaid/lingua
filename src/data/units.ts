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

