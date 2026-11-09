import { Language } from "@/types/learning";

export const SUPPORTED_LANGUAGES: Language[] = [
  {
    id: "es",
    name: "Spanish",
    nativeName: "Español",
    flag: "🇪🇸",
    learnersCount: "28.4M learners",
    isPopular: true,
    greeting: "Hola",
    level: "A1",
    description: "Learn Spanish for travel, work, and vibrant daily conversation.",
  },
  {
    id: "fr",
    name: "French",
    nativeName: "Français",
    flag: "🇫🇷",
    learnersCount: "19.4M learners",
    isPopular: true,
    greeting: "Bonjour",
    level: "A1",
    description: "Master French pronunciation, culture, and essentials.",
  },
  {
    id: "ja",
    name: "Japanese",
    nativeName: "日本語",
    flag: "🇯🇵",
    learnersCount: "12.7M learners",
    isPopular: true,
    greeting: "Konnichiwa",
    level: "A1",
    description: "Learn hiragana, katakana, and natural conversational Japanese.",
  },
  {
    id: "ko",
    name: "Korean",
    nativeName: "한국어",
    flag: "🇰🇷",
    learnersCount: "9.3M learners",
    isPopular: true,
    greeting: "Annyeonghaseyo",
    level: "A1",
    description: "Learn Hangul and practical Korean from K-culture to daily life.",
  },
  {
    id: "de",
    name: "German",
    nativeName: "Deutsch",
    flag: "🇩🇪",
    learnersCount: "8.1M learners",
    isPopular: true,
    greeting: "Hallo",
    level: "A1",
    description: "Explore German grammar, practical vocabulary, and everyday dialogues.",
  },
  {
    id: "zh",
    name: "Chinese",
    nativeName: "中文",
    flag: "🇨🇳",
    learnersCount: "7.4M learners",
    isPopular: true,
    greeting: "Nǐ hǎo",
    level: "A1",
    description: "Learn Mandarin pronunciation, pinyin, and fundamental characters.",
  },
  {
    id: "it",
    name: "Italian",
    nativeName: "Italiano",
    flag: "🇮🇹",
    learnersCount: "6.2M learners",
    isPopular: false,
    greeting: "Ciao",
    level: "A1",
    description: "Immerse yourself in Italian art, food, and musical expressions.",
  },
  {
    id: "pt",
    name: "Portuguese",
    nativeName: "Português",
    flag: "🇧🇷",
    learnersCount: "5.5M learners",
    isPopular: false,
    greeting: "Olá",
    level: "A1",
    description: "Learn Brazilian Portuguese for friendly conversation and travel.",
  },
];

export const DEFAULT_LANGUAGE: Language = SUPPORTED_LANGUAGES[0];

export function getLanguageById(id: string): Language | undefined {
  return SUPPORTED_LANGUAGES.find((lang) => lang.id.toLowerCase() === id.toLowerCase());
}

export function getDefaultLanguage(): Language {
  return DEFAULT_LANGUAGE;
}

export function getPopularLanguages(): Language[] {
  return SUPPORTED_LANGUAGES.filter((lang) => lang.isPopular);
}

