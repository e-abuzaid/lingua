import { EXTRA_LESSONS } from "@/data/extraLessons";
import { Lesson } from "@/types/learning";

const BASE_LESSONS: Lesson[] = [
  // ==========================================
  // SPANISH - UNIT 3 (Featured in App Screens)
  // ==========================================
  {
    id: "lesson-es-3-1",
    unitId: "unit-es-3",
    languageId: "es",
    lessonNumber: 1,
    title: "Greetings & Introductions",
    description: "Learn how to greet café staff and introduce yourself politely.",
    status: "completed",
    xpReward: 15,
    estimatedMinutes: 5,
    icon: "hand-wave",
    goals: [
      "Say hello and good morning in Spanish",
      "Introduce yourself with 'Me llamo...'",
      "Ask 'How are you?' politely",
    ],
    vocabulary: [
      {
        id: "vocab-es-3-1-1",
        word: "Hola",
        translation: "Hello / Hi",
        phonetic: "OH-lah",
        partOfSpeech: "phrase",
        exampleSentence: "¡Hola! ¿Cómo estás?",
        exampleTranslation: "Hello! How are you?",
      },
      {
        id: "vocab-es-3-1-2",
        word: "Buenos días",
        translation: "Good morning",
        phonetic: "BWEH-nohs DEE-ahs",
        partOfSpeech: "phrase",
        exampleSentence: "Buenos días, señor.",
        exampleTranslation: "Good morning, sir.",
      },
      {
        id: "vocab-es-3-1-3",
        word: "Me llamo",
        translation: "My name is",
        phonetic: "meh YAH-moh",
        partOfSpeech: "phrase",
        exampleSentence: "Me llamo Alex.",
        exampleTranslation: "My name is Alex.",
      },
      {
        id: "vocab-es-3-1-4",
        word: "¿Cómo te llamas?",
        translation: "What is your name?",
        phonetic: "KOH-moh teh YAH-mahs",
        partOfSpeech: "phrase",
        exampleSentence: "Hola, ¿cómo te llamas?",
        exampleTranslation: "Hello, what is your name?",
      },
    ],
    phrases: [
      {
        id: "phrase-es-3-1-1",
        phrase: "Mucho gusto",
        translation: "Nice to meet you",
        context: "Used after exchanging names with someone",
        phonetic: "MOO-choh GOO-stoh",
      },
      {
        id: "phrase-es-3-1-2",
        phrase: "¿Cómo estás?",
        translation: "How are you?",
        context: "Friendly, informal greeting",
        phonetic: "KOH-moh ehs-TAHS",
      },
    ],
    activities: [
      {
        id: "act-es-3-1-1",
        type: "multiple_choice",
        prompt: "Choose the correct translation for 'Good morning':",
        question: "Buenos días",
        options: ["Good morning", "Good night", "Good afternoon", "See you later"],
        correctAnswer: "Good morning",
        explanation: "'Buenos días' is the Spanish greeting used in the morning.",
      },
      {
        id: "act-es-3-1-2",
        type: "translate",
        prompt: "How do you say 'My name is Alex'?",
        question: "My name is Alex",
        options: ["Me llamo Alex", "Hola Alex", "Soy de Alex", "Yo Alex"],
        correctAnswer: "Me llamo Alex",
        explanation: "'Me llamo' literally means 'I call myself'.",
      },
      {
        id: "act-es-3-1-3",
        type: "listen_and_repeat",
        prompt: "Listen and repeat the phrase clearly:",
        question: "¡Hola, mucho gusto!",
        correctAnswer: "Hola, mucho gusto",
        hint: "Pronounce the 'h' silently: OH-lah, MOO-choh GOO-stoh",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are Leo the Fox, an upbeat and friendly Spanish tutor. Speak warmly in English to guide the student, and ask them to practice saying 'Hola', 'Buenos días', and introducing their name in Spanish. Keep your answers brief, encouraging, and clear.",
      welcomeMessage:
        "¡Hola! I'm Leo, your AI teacher. Let's practice saying hello and introducing yourself in Spanish. Say: '¡Hola! Me llamo Alex'!",
      scenario:
        "Meeting a friendly Spanish speaker at a local coffee shop in Madrid.",
      targetLanguage: "Spanish",
      keyPhrasesToElicit: [
        "Hola",
        "Buenos días",
        "Me llamo...",
        "Mucho gusto",
      ],
      feedbackCriteria: [
        "Silent 'h' in Hola",
        "Clear vowels in Buenos días",
        "Polite tone and confidence",
      ],
      sampleDialogues: [
        { speaker: "teacher", text: "¡Hola! ¿Cómo te llamas?", translation: "Hello! What is your name?" },
        { speaker: "student", text: "Hola, me llamo Alex.", translation: "Hello, my name is Alex." },
        { speaker: "teacher", text: "¡Mucho gusto, Alex!", translation: "Nice to meet you, Alex!" },
      ],
    },
  },

  {
    id: "lesson-es-3-2",
    unitId: "unit-es-3",
    languageId: "es",
    lessonNumber: 2,
    title: "Daily Life",
    description: "Talk about daily habits, ordering what you love, and simple routines.",
    status: "completed",
    xpReward: 15,
    estimatedMinutes: 5,
    icon: "sun",
    goals: [
      "Express daily preferences with 'Me gusta...'",
      "Talk about morning routines",
      "Learn common verbs like tomar and comer",
    ],
    vocabulary: [
      {
        id: "vocab-es-3-2-1",
        word: "Me gusta",
        translation: "I like",
        phonetic: "meh GOO-stah",
        partOfSpeech: "phrase",
        exampleSentence: "Me gusta el café por la mañana.",
        exampleTranslation: "I like coffee in the morning.",
      },
      {
        id: "vocab-es-3-2-2",
        word: "Tomar",
        translation: "To drink / to take",
        phonetic: "toh-MAR",
        partOfSpeech: "verb",
        exampleSentence: "¿Qué vas a tomar?",
        exampleTranslation: "What are you going to drink?",
      },
      {
        id: "vocab-es-3-2-3",
        word: "Por la mañana",
        translation: "In the morning",
        phonetic: "por lah mah-NYAH-nah",
        partOfSpeech: "phrase",
        exampleSentence: "Estudio español por la mañana.",
        exampleTranslation: "I study Spanish in the morning.",
      },
    ],
    phrases: [
      {
        id: "phrase-es-3-2-1",
        phrase: "¿Qué te gusta hacer?",
        translation: "What do you like to do?",
        context: "Asking about someone's hobbies or routine",
        phonetic: "keh teh GOO-stah ah-SEHR",
      },
      {
        id: "phrase-es-3-2-2",
        phrase: "Siempre tomo café",
        translation: "I always drink coffee",
        context: "Describing a daily habit",
        phonetic: "see-EHM-preh TOH-moh kah-FEH",
      },
    ],
    activities: [
      {
        id: "act-es-3-2-1",
        type: "multiple_choice",
        prompt: "What does 'Me gusta el café' mean?",
        question: "Me gusta el café",
        options: ["I like coffee", "I don't like coffee", "I make coffee", "Where is the coffee?"],
        correctAnswer: "I like coffee",
        explanation: "'Me gusta' means 'I like' or 'it pleases me'.",
      },
      {
        id: "act-es-3-2-2",
        type: "translate",
        prompt: "Translate 'In the morning' to Spanish:",
        question: "In the morning",
        options: ["Por la mañana", "Por la noche", "Por la tarde", "Ayer"],
        correctAnswer: "Por la mañana",
        explanation: "'Mañana' means morning (or tomorrow).",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are Leo the Fox, an AI Spanish tutor. Ask the student about their daily morning routine in a supportive tone. Coach them to use 'Me gusta' and 'Por la mañana'.",
      welcomeMessage:
        "¡Hola de nuevo! Let's talk about your daily routine. Tell me: what do you like drinking in the morning? Try saying: 'Me gusta el café'!",
      scenario:
        "Chatting over breakfast about morning habits and favorite drinks.",
      targetLanguage: "Spanish",
      keyPhrasesToElicit: [
        "Me gusta el café",
        "Por la mañana",
        "Tomo café",
      ],
      feedbackCriteria: [
        "Pronunciation of 'gusta'",
        "Rolling or tapping the 'r' in 'por'",
        "Sentence flow",
      ],
    },
  },

  {
    id: "lesson-es-3-3",
    unitId: "unit-es-3",
    languageId: "es",
    lessonNumber: 3,
    title: "At the Café",
    description: "Order drinks and pastries, ask for the bill, and chat with the barista.",
    status: "in_progress",
    xpReward: 15,
    estimatedMinutes: 6,
    icon: "coffee",
    goals: [
      "Order coffee and snacks politely using 'por favor'",
      "Ask 'How much is it?' with '¿Cuánto cuesta?'",
      "Request the check with 'La cuenta, por favor'",
      "Say thank you with 'Muchas gracias'",
    ],
    vocabulary: [
      {
        id: "vocab-es-3-3-1",
        word: "El café",
        translation: "The coffee",
        phonetic: "el kah-FEH",
        partOfSpeech: "noun",
        exampleSentence: "Un café solo, por favor.",
        exampleTranslation: "A black coffee, please.",
      },
      {
        id: "vocab-es-3-3-2",
        word: "Con leche",
        translation: "With milk",
        phonetic: "kohn LEH-cheh",
        partOfSpeech: "phrase",
        exampleSentence: "Un café con leche y azúcar.",
        exampleTranslation: "A coffee with milk and sugar.",
      },
      {
        id: "vocab-es-3-3-3",
        word: "El croissant",
        translation: "The croissant",
        phonetic: "el krah-SAHN",
        partOfSpeech: "noun",
        exampleSentence: "¿Tienen croissants de mantequilla?",
        exampleTranslation: "Do you have butter croissants?",
      },
      {
        id: "vocab-es-3-3-4",
        word: "Por favor",
        translation: "Please",
        phonetic: "por fah-VOR",
        partOfSpeech: "phrase",
        exampleSentence: "La cuenta, por favor.",
        exampleTranslation: "The check, please.",
      },
      {
        id: "vocab-es-3-3-5",
        word: "Muchas gracias",
        translation: "Thank you very much",
        phonetic: "MOO-chahs GRAH-syahs",
        partOfSpeech: "phrase",
        exampleSentence: "Muchas gracias por el servicio.",
        exampleTranslation: "Thank you very much for the service.",
      },
      {
        id: "vocab-es-3-3-6",
        word: "La cuenta",
        translation: "The check / bill",
        phonetic: "lah KWEHN-tah",
        partOfSpeech: "noun",
        exampleSentence: "¿Nos trae la cuenta, por favor?",
        exampleTranslation: "Could you bring us the check, please?",
      },
    ],
    phrases: [
      {
        id: "phrase-es-3-3-1",
        phrase: "Un café, por favor",
        translation: "A coffee, please",
        context: "Standard polite way to order coffee at any counter",
        phonetic: "oon kah-FEH por fah-VOR",
      },
      {
        id: "phrase-es-3-3-2",
        phrase: "¿Cuánto cuesta?",
        translation: "How much does it cost?",
        context: "Used to inquire about prices",
        phonetic: "KWAN-toh KWEHS-tah",
      },
      {
        id: "phrase-es-3-3-3",
        phrase: "La cuenta, por favor",
        translation: "The bill, please",
        context: "Used when finishing your drink or meal",
        phonetic: "lah KWEHN-tah por fah-VOR",
      },
      {
        id: "phrase-es-3-3-4",
        phrase: "¡Muy bien! That was great! 👏",
        translation: "Very good! That was great!",
        context: "Encouraging teacher praise during the lesson",
        phonetic: "mwee byehn",
      },
    ],
    activities: [
      {
        id: "act-es-3-3-1",
        type: "multiple_choice",
        prompt: "How do you politely order coffee in Spanish?",
        question: "A coffee, please",
        options: [
          "Un café, por favor",
          "Dame un café",
          "Quiero un café ahora",
          "Café para mí",
        ],
        correctAnswer: "Un café, por favor",
        explanation: "'Un café, por favor' is the standard polite order.",
      },
      {
        id: "act-es-3-3-2",
        type: "translate",
        prompt: "Translate 'The bill, please':",
        question: "The bill, please",
        options: ["La cuenta, por favor", "El menú, por favor", "El café, por favor", "La mesa, por favor"],
        correctAnswer: "La cuenta, por favor",
        explanation: "'La cuenta' means the bill or check in a restaurant.",
      },
      {
        id: "act-es-3-3-3",
        type: "listen_and_repeat",
        prompt: "Practice asking for the price:",
        question: "¿Cuánto cuesta?",
        correctAnswer: "¿Cuánto cuesta?",
        hint: "Pronounce it smoothly: KWAN-toh KWEHS-tah",
      },
      {
        id: "act-es-3-3-4",
        type: "conversation",
        prompt: "You are at Café Central in Madrid. Order a coffee with milk and ask for the price.",
        question: "Barista: ¡Hola! ¿Qué desea tomar?",
        correctAnswer: "Un café con leche, por favor. ¿Cuánto cuesta?",
        explanation: "Combining your order with 'por favor' and '¿Cuánto cuesta?' creates a perfect natural interaction.",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are Leo the Fox, an AI Spanish teacher in an audio-first lesson. You are acting as a friendly barista at a vibrant café in Madrid. The user is a customer practicing Spanish. Guide the student step-by-step: first greet them and ask what they'd like to drink. Encourage them to say 'Un café, por favor' or 'Un café con leche, por favor'. Once they order, offer a croissant and elicit '¿Cuánto cuesta?'. Finally, practice asking for the bill with 'La cuenta, por favor'. Always give warm audio feedback such as '¡Muy bien! That was great!' and gentle pronunciation pointers. Speak mostly English for guidance, but prompt and praise in Spanish.",
      welcomeMessage:
        "¡Hola! Welcome to today's lesson. We are practicing ordering at a café in Spanish. When you're ready, try ordering a coffee by saying: 'Un café, por favor'!",
      scenario:
        "A bustling café in Madrid where you practice ordering coffee, asking prices, and requesting the bill.",
      targetLanguage: "Spanish",
      keyPhrasesToElicit: [
        "Un café, por favor",
        "Un café con leche",
        "¿Cuánto cuesta?",
        "La cuenta, por favor",
        "Muchas gracias",
      ],
      feedbackCriteria: [
        "Correct accent on café (kah-FEH)",
        "Clear pronunciation of por favor",
        "Natural tone when asking ¿Cuánto cuesta?",
        "Polite closure with Muchas gracias",
      ],
      sampleDialogues: [
        { speaker: "teacher", text: "¡Hola! Bienvenido al café. ¿Qué te gustaría tomar?", translation: "Hello! Welcome to the café. What would you like to drink?" },
        { speaker: "student", text: "Un café con leche, por favor.", translation: "A coffee with milk, please." },
        { speaker: "teacher", text: "¡Perfecto! ¿Te gustaría un croissant?", translation: "Perfect! Would you like a croissant?" },
        { speaker: "student", text: "Sí, gracias. ¿Cuánto cuesta?", translation: "Yes, thank you. How much is it?" },
        { speaker: "teacher", text: "Son dos euros con cincuenta. ¡Buen provecho!", translation: "It's two euros fifty. Enjoy!" },
        { speaker: "student", text: "La cuenta, por favor. Muchas gracias.", translation: "The bill, please. Thank you very much." },
      ],
    },
  },

  {
    id: "lesson-es-3-4",
    unitId: "unit-es-3",
    languageId: "es",
    lessonNumber: 4,
    title: "Travel & Directions",
    description: "Ask where places are, understand directions, and navigate the city.",
    status: "locked",
    xpReward: 15,
    estimatedMinutes: 6,
    icon: "map",
    goals: [
      "Ask 'Where is...?' using '¿Dónde está...?'",
      "Understand basic directions: izquierda, derecha, recto",
      "Find metro stations, cafés, and museums",
    ],
    vocabulary: [
      {
        id: "vocab-es-3-4-1",
        word: "¿Dónde está...?",
        translation: "Where is...?",
        phonetic: "DOHN-deh ehs-TAH",
        partOfSpeech: "phrase",
        exampleSentence: "¿Dónde está la estación de metro?",
        exampleTranslation: "Where is the metro station?",
      },
      {
        id: "vocab-es-3-4-2",
        word: "A la derecha",
        translation: "To the right",
        phonetic: "ah lah deh-REH-chah",
        partOfSpeech: "phrase",
        exampleSentence: "El café está a la derecha.",
        exampleTranslation: "The café is on the right.",
      },
      {
        id: "vocab-es-3-4-3",
        word: "A la izquierda",
        translation: "To the left",
        phonetic: "ah lah ees-KYEHR-dah",
        partOfSpeech: "phrase",
        exampleSentence: "Gira a la izquierda en la esquina.",
        exampleTranslation: "Turn left at the corner.",
      },
      {
        id: "vocab-es-3-4-4",
        word: "Todo recto",
        translation: "Straight ahead",
        phonetic: "TOH-doh REHK-toh",
        partOfSpeech: "phrase",
        exampleSentence: "Sigue todo recto por dos calles.",
        exampleTranslation: "Go straight ahead for two blocks.",
      },
    ],
    phrases: [
      {
        id: "phrase-es-3-4-1",
        phrase: "Disculpe, ¿dónde está el café?",
        translation: "Excuse me, where is the café?",
        context: "Polite inquiry to a stranger on the street",
        phonetic: "dees-KOOL-peh DOHN-deh ehs-TAH el kah-FEH",
      },
    ],
    activities: [
      {
        id: "act-es-3-4-1",
        type: "multiple_choice",
        prompt: "Choose the correct phrase for 'Where is the station?':",
        question: "Where is the station?",
        options: [
          "¿Dónde está la estación?",
          "¿Cuándo es la estación?",
          "¿Quién es la estación?",
          "¿Cómo es la estación?",
        ],
        correctAnswer: "¿Dónde está la estación?",
        explanation: "'¿Dónde está...?' is used to ask for locations.",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are Leo the Fox, helping the student ask for directions in Madrid. Speak English to guide and ask the student to practice '¿Dónde está el café?' and 'A la derecha'.",
      welcomeMessage:
        "¡Hola! Ready to explore the city? Let's practice asking for directions. Try asking me: 'Disculpe, ¿dónde está el café?'",
      scenario:
        "Walking through the streets of Barcelona or Madrid looking for a landmark.",
      targetLanguage: "Spanish",
      keyPhrasesToElicit: [
        "¿Dónde está...?",
        "A la derecha",
        "A la izquierda",
        "Todo recto",
      ],
      feedbackCriteria: ["Pronunciation of 'Dónde'", "Clear rolled or tapped 'r'"],
    },
  },

  {
    id: "lesson-es-3-5",
    unitId: "unit-es-3",
    languageId: "es",
    lessonNumber: 5,
    title: "Shopping",
    description: "Browse local markets, ask about sizes, colors, and prices.",
    status: "locked",
    xpReward: 15,
    estimatedMinutes: 5,
    icon: "shopping-bag",
    goals: [
      "Ask for items with 'Quisiera...' or 'Busco...'",
      "Talk about colors and sizes",
      "Pay with cash or card",
    ],
    vocabulary: [
      {
        id: "vocab-es-3-5-1",
        word: "Quisiera",
        translation: "I would like",
        phonetic: "kee-SYEH-rah",
        partOfSpeech: "verb",
        exampleSentence: "Quisiera ver esa camisa.",
        exampleTranslation: "I would like to see that shirt.",
      },
      {
        id: "vocab-es-3-5-2",
        word: "Tarjeta",
        translation: "Card (credit/debit)",
        phonetic: "tar-HEH-tah",
        partOfSpeech: "noun",
        exampleSentence: "¿Puedo pagar con tarjeta?",
        exampleTranslation: "Can I pay with card?",
      },
      {
        id: "vocab-es-3-5-3",
        word: "Efectivo",
        translation: "Cash",
        phonetic: "eh-fehk-TEE-boh",
        partOfSpeech: "noun",
        exampleSentence: "Pago en efectivo.",
        exampleTranslation: "I pay in cash.",
      },
    ],
    phrases: [
      {
        id: "phrase-es-3-5-1",
        phrase: "¿Puedo pagar con tarjeta?",
        translation: "Can I pay by card?",
        context: "Used at checkout counters",
        phonetic: "PWEH-doh pah-GAHR kohn tar-HEH-tah",
      },
    ],
    activities: [
      {
        id: "act-es-3-5-1",
        type: "multiple_choice",
        prompt: "How do you ask 'Can I pay by card?'",
        question: "Can I pay by card?",
        options: [
          "¿Puedo pagar con tarjeta?",
          "¿Tienes dinero?",
          "¿Dónde está el cajero?",
          "Quiero comprar esto",
        ],
        correctAnswer: "¿Puedo pagar con tarjeta?",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are Leo the Fox acting as a boutique shopkeeper in Seville. Help the student buy souvenirs and ask if they want to pay with cash or card.",
      welcomeMessage:
        "¡Hola! Let's go shopping. Practice asking if you can pay with card: '¿Puedo pagar con tarjeta?'",
      scenario: "Shopping at an artisan gift store in Seville.",
      targetLanguage: "Spanish",
      keyPhrasesToElicit: [
        "¿Puedo pagar con tarjeta?",
        "En efectivo",
        "Quisiera esto",
      ],
      feedbackCriteria: ["Pronunciation of tarjeta with soft 'j'"],
    },
  },

  {
    id: "lesson-es-3-6",
    unitId: "unit-es-3",
    languageId: "es",
    lessonNumber: 6,
    title: "Family & Friends",
    description: "Talk about your family members, friends, and special relationships.",
    status: "locked",
    xpReward: 15,
    estimatedMinutes: 5,
    icon: "users",
    goals: [
      "Name close family members in Spanish",
      "Describe people using simple adjectives",
      "Talk about friends and social plans",
    ],
    vocabulary: [
      {
        id: "vocab-es-3-6-1",
        word: "La familia",
        translation: "The family",
        phonetic: "lah fah-MEE-lyah",
        partOfSpeech: "noun",
        exampleSentence: "Mi familia es muy grande.",
        exampleTranslation: "My family is very big.",
      },
      {
        id: "vocab-es-3-6-2",
        word: "El amigo / La amiga",
        translation: "The friend (m/f)",
        phonetic: "el ah-MEE-goh",
        partOfSpeech: "noun",
        exampleSentence: "Él es mi mejor amigo.",
        exampleTranslation: "He is my best friend.",
      },
      {
        id: "vocab-es-3-6-3",
        word: "Hermano / Hermana",
        translation: "Brother / Sister",
        phonetic: "ehr-MAH-noh",
        partOfSpeech: "noun",
        exampleSentence: "Tengo un hermano y una hermana.",
        exampleTranslation: "I have a brother and a sister.",
      },
    ],
    phrases: [
      {
        id: "phrase-es-3-6-1",
        phrase: "Este es mi amigo",
        translation: "This is my friend",
        context: "Introducing a friend to someone else",
        phonetic: "EHS-teh ehs mee ah-MEE-goh",
      },
    ],
    activities: [
      {
        id: "act-es-3-6-1",
        type: "multiple_choice",
        prompt: "Translate 'My friend':",
        question: "My friend",
        options: ["Mi amigo", "Mi casa", "Mi hermano", "Mi café"],
        correctAnswer: "Mi amigo",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt:
        "You are Leo the Fox, an AI Spanish tutor. Ask the student about their family and friends in a warm conversational style.",
      welcomeMessage:
        "¡Hola! Today we're talking about family and friends. Tell me: do you have brothers or sisters?",
      scenario: "Casual chat introducing friends and family.",
      targetLanguage: "Spanish",
      keyPhrasesToElicit: [
        "Mi familia",
        "Mi amigo",
        "Tengo un hermano",
      ],
      feedbackCriteria: ["Clear vowel separation in familia"],
    },
  },

  // ==========================================
  // SPANISH - UNIT 1 & 2 (Foundational)
  // ==========================================
  {
    id: "lesson-es-1-1",
    unitId: "unit-es-1",
    languageId: "es",
    lessonNumber: 1,
    title: "Saying Hello & Goodbye",
    description: "Essential greetings for every situation.",
    status: "completed",
    xpReward: 10,
    estimatedMinutes: 4,
    icon: "hand-wave",
    goals: ["Say hello and goodbye", "Learn Adiós and Hasta luego"],
    vocabulary: [
      { id: "v-es-1-1", word: "Adiós", translation: "Goodbye", phonetic: "ah-DYOHS", partOfSpeech: "phrase" },
      { id: "v-es-1-2", word: "Hasta luego", translation: "See you later", phonetic: "AHS-tah LWEH-goh", partOfSpeech: "phrase" },
    ],
    phrases: [
      { id: "p-es-1-1", phrase: "¡Hasta mañana!", translation: "See you tomorrow!", context: "Evening farewell" },
    ],
    activities: [
      {
        id: "a-es-1-1",
        type: "multiple_choice",
        prompt: "How do you say goodbye in Spanish?",
        question: "Goodbye",
        options: ["Adiós", "Hola", "Por favor", "Gracias"],
        correctAnswer: "Adiós",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: "You are Leo the Fox teaching greetings. Help the student say goodbye warmly.",
      welcomeMessage: "¡Hola! Let's practice saying goodbye. Try saying: '¡Hasta luego!'",
      scenario: "Parting ways with a friend.",
      targetLanguage: "Spanish",
      keyPhrasesToElicit: ["Adiós", "Hasta luego"],
      feedbackCriteria: ["Enunciation of diphthongs"],
    },
  },
  {
    id: "lesson-es-1-2",
    unitId: "unit-es-1",
    languageId: "es",
    lessonNumber: 2,
    title: "Being Polite",
    description: "Por favor, gracias, and de nada.",
    status: "completed",
    xpReward: 10,
    estimatedMinutes: 4,
    icon: "sparkles",
    goals: ["Say please and thank you", "Reply 'you're welcome' with de nada"],
    vocabulary: [
      { id: "v-es-1-3", word: "Gracias", translation: "Thank you", phonetic: "GRAH-syahs", partOfSpeech: "phrase" },
      { id: "v-es-1-4", word: "De nada", translation: "You're welcome", phonetic: "deh NAH-dah", partOfSpeech: "phrase" },
    ],
    phrases: [
      { id: "p-es-1-2", phrase: "Muchas gracias", translation: "Thank you very much" },
    ],
    activities: [
      {
        id: "a-es-1-2",
        type: "translate",
        prompt: "Translate 'You're welcome':",
        question: "You're welcome",
        options: ["De nada", "Por favor", "Hola", "Adiós"],
        correctAnswer: "De nada",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: "You are Leo the Fox teaching manners. Practice gratitude exchanges.",
      welcomeMessage: "¡Hola! When someone says 'Gracias', how do you respond? Say: 'De nada'!",
      scenario: "Polite social exchange.",
      targetLanguage: "Spanish",
      keyPhrasesToElicit: ["Gracias", "De nada"],
      feedbackCriteria: ["Tone and warmth"],
    },
  },
  {
    id: "lesson-es-2-1",
    unitId: "unit-es-2",
    languageId: "es",
    lessonNumber: 1,
    title: "Morning Routine",
    description: "Waking up, having breakfast, and starting your day.",
    status: "completed",
    xpReward: 10,
    estimatedMinutes: 4,
    icon: "sun",
    goals: ["Talk about waking up", "Mention breakfast items"],
    vocabulary: [
      { id: "v-es-2-1", word: "El desayuno", translation: "Breakfast", phonetic: "el deh-sah-YOO-noh", partOfSpeech: "noun" },
      { id: "v-es-2-2", word: "El agua", translation: "Water", phonetic: "el AH-gwah", partOfSpeech: "noun" },
    ],
    phrases: [
      { id: "p-es-2-1", phrase: "Tomo agua", translation: "I drink water" },
    ],
    activities: [
      {
        id: "a-es-2-1",
        type: "multiple_choice",
        prompt: "Translate 'Breakfast':",
        question: "Breakfast",
        options: ["El desayuno", "La cena", "El almuerzo", "La siesta"],
        correctAnswer: "El desayuno",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: "You are Leo the Fox talking about morning habits.",
      welcomeMessage: "¡Buenos días! What is the first thing you drink in the morning? Say: 'Agua' or 'Café'!",
      scenario: "Breakfast kitchen conversation.",
      targetLanguage: "Spanish",
      keyPhrasesToElicit: ["El desayuno", "Agua"],
      feedbackCriteria: ["Clear articulation"],
    },
  },
  {
    id: "lesson-es-2-2",
    unitId: "unit-es-2",
    languageId: "es",
    lessonNumber: 2,
    title: "Hobbies & Free Time",
    description: "Music, sports, and reading in Spanish.",
    status: "completed",
    xpReward: 10,
    estimatedMinutes: 4,
    icon: "music",
    goals: ["Express likes with me gusta", "Talk about sports and music"],
    vocabulary: [
      { id: "v-es-2-3", word: "La música", translation: "The music", phonetic: "lah MOO-see-kah", partOfSpeech: "noun" },
      { id: "v-es-2-4", word: "Leer", translation: "To read", phonetic: "leh-EHR", partOfSpeech: "verb" },
    ],
    phrases: [
      { id: "p-es-2-2", phrase: "Me gusta la música", translation: "I like music" },
    ],
    activities: [
      {
        id: "a-es-2-2",
        type: "translate",
        prompt: "Translate 'I like music':",
        question: "I like music",
        options: ["Me gusta la música", "Canto música", "Escucho radio", "No me gusta"],
        correctAnswer: "Me gusta la música",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: "You are Leo the Fox discussing music and hobbies.",
      welcomeMessage: "¡Hola! Do you like music? Say: '¡Sí, me gusta la música!'",
      scenario: "Sharing favorite hobbies.",
      targetLanguage: "Spanish",
      keyPhrasesToElicit: ["Me gusta la música"],
      feedbackCriteria: ["Enthusiastic expression"],
    },
  },

  // ==========================================
  // FRENCH - SAMPLE DATASET
  // ==========================================
  {
    id: "lesson-fr-1-1",
    unitId: "unit-fr-1",
    languageId: "fr",
    lessonNumber: 1,
    title: "Greetings & Politeness",
    description: "Say hello, goodbye, and thank you like a true Parisian.",
    status: "available",
    xpReward: 15,
    estimatedMinutes: 5,
    icon: "hand-wave",
    goals: ["Say Bonjour and Bonsoir", "Use S'il vous plaît and Merci"],
    vocabulary: [
      { id: "v-fr-1-1", word: "Bonjour", translation: "Hello / Good day", phonetic: "bohn-ZHOOR", partOfSpeech: "phrase" },
      { id: "v-fr-1-2", word: "S'il vous plaît", translation: "Please", phonetic: "seel voo PLEH", partOfSpeech: "phrase" },
      { id: "v-fr-1-3", word: "Merci beaucoup", translation: "Thank you very much", phonetic: "mehr-SEE boh-KOO", partOfSpeech: "phrase" },
    ],
    phrases: [
      { id: "p-fr-1-1", phrase: "Comment allez-vous ?", translation: "How are you? (polite)", phonetic: "koh-mahn tah-lay VOO" },
    ],
    activities: [
      {
        id: "a-fr-1-1",
        type: "multiple_choice",
        prompt: "What is 'Hello' in French?",
        question: "Hello",
        options: ["Bonjour", "Au revoir", "Merci", "Oui"],
        correctAnswer: "Bonjour",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: "You are Chloe, a polite French tutor. Teach French greetings through English explanations.",
      welcomeMessage: "Bonjour ! Welcome to French. Let's start with a classic greeting. Try saying: 'Bonjour !'",
      scenario: "Meeting someone on a pleasant morning in Paris.",
      targetLanguage: "French",
      keyPhrasesToElicit: ["Bonjour", "Merci", "S'il vous plaît"],
      feedbackCriteria: ["Nasal vowel sounds", "Gentle 'r' sound"],
    },
  },
  {
    id: "lesson-fr-2-1",
    unitId: "unit-fr-2",
    languageId: "fr",
    lessonNumber: 1,
    title: "At the Bistro",
    description: "Order coffee and croissants at a Parisian terrace.",
    status: "available",
    xpReward: 15,
    estimatedMinutes: 5,
    icon: "coffee",
    goals: ["Order coffee with un café s'il vous plaît", "Ask for the bill"],
    vocabulary: [
      { id: "v-fr-2-1", word: "Un café", translation: "A coffee", phonetic: "uhn kah-FAY", partOfSpeech: "noun" },
      { id: "v-fr-2-2", word: "Un croissant", translation: "A croissant", phonetic: "uhn kwah-SAHN", partOfSpeech: "noun" },
      { id: "v-fr-2-3", word: "L'addition", translation: "The bill / check", phonetic: "lah-dee-SYOHN", partOfSpeech: "noun" },
    ],
    phrases: [
      { id: "p-fr-2-1", phrase: "Un café s'il vous plaît", translation: "A coffee, please" },
      { id: "p-fr-2-2", phrase: "L'addition, s'il vous plaît", translation: "The check, please" },
    ],
    activities: [
      {
        id: "a-fr-2-1",
        type: "translate",
        prompt: "How do you ask for the check in French?",
        question: "The check, please",
        options: ["L'addition, s'il vous plaît", "Un café s'il vous plaît", "Merci beaucoup", "Au revoir"],
        correctAnswer: "L'addition, s'il vous plaît",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: "You are Chloe, teaching bistro French. Help the student order on a Parisian terrace.",
      welcomeMessage: "Bienvenue au bistro ! Let's order your first French coffee. Say: 'Un café, s'il vous plaît'!",
      scenario: "Sitting outside at a café in Saint-Germain-des-Prés.",
      targetLanguage: "French",
      keyPhrasesToElicit: ["Un café s'il vous plaît", "L'addition s'il vous plaît"],
      feedbackCriteria: ["Pronunciation of s'il vous plaît"],
    },
  },

  // ==========================================
  // JAPANESE - SAMPLE DATASET
  // ==========================================
  {
    id: "lesson-ja-1-1",
    unitId: "unit-ja-1",
    languageId: "ja",
    lessonNumber: 1,
    title: "First Encounters",
    description: "Learn Konnichiwa, Arigatou gozaimasu, and polite bowing phrases.",
    status: "available",
    xpReward: 15,
    estimatedMinutes: 5,
    icon: "hand-wave",
    goals: ["Say Konnichiwa", "Express gratitude with Arigatou gozaimasu"],
    vocabulary: [
      { id: "v-ja-1-1", word: "こんにちは (Konnichiwa)", translation: "Hello / Good afternoon", phonetic: "kohn-nee-chee-wah", partOfSpeech: "phrase" },
      { id: "v-ja-1-2", word: "ありがとう (Arigatou)", translation: "Thank you", phonetic: "ah-ree-gah-toh", partOfSpeech: "phrase" },
      { id: "v-ja-1-3", word: "すみません (Sumimasen)", translation: "Excuse me / Sorry", phonetic: "soo-mee-mah-sehn", partOfSpeech: "phrase" },
    ],
    phrases: [
      { id: "p-ja-1-1", phrase: "はじめまして (Hajimemashite)", translation: "Nice to meet you (for the first time)" },
    ],
    activities: [
      {
        id: "a-ja-1-1",
        type: "multiple_choice",
        prompt: "What is 'Thank you' in polite Japanese?",
        question: "Thank you",
        options: ["Arigatou gozaimasu", "Konnichiwa", "Sayounara", "Ogenki desu ka"],
        correctAnswer: "Arigatou gozaimasu",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: "You are Kenji, a patient Japanese teacher. Teach foundational Japanese with clear phonetic cues.",
      welcomeMessage: "Konnichiwa! Welcome to your Japanese journey. Let's start with a friendly greeting. Say: 'Konnichiwa'!",
      scenario: "Greeting someone in Tokyo.",
      targetLanguage: "Japanese",
      keyPhrasesToElicit: ["Konnichiwa", "Sumimasen", "Arigatou gozaimasu"],
      feedbackCriteria: ["Even pitch accent and crisp syllables"],
    },
  },
  {
    id: "lesson-ja-2-1",
    unitId: "unit-ja-2",
    languageId: "ja",
    lessonNumber: 1,
    title: "At the Ramen Shop",
    description: "Call the waiter and order delicious hot ramen.",
    status: "available",
    xpReward: 15,
    estimatedMinutes: 5,
    icon: "soup",
    goals: ["Call the staff with Sumimasen", "Order ramen with Ramen o kudasai"],
    vocabulary: [
      { id: "v-ja-2-1", word: "ラーメン (Ramen)", translation: "Ramen", phonetic: "rah-men", partOfSpeech: "noun" },
      { id: "v-ja-2-2", word: "お水 (Omizu)", translation: "Water", phonetic: "oh-mee-zoo", partOfSpeech: "noun" },
      { id: "v-ja-2-3", word: "ください (Kudasai)", translation: "Please give me", phonetic: "koo-dah-sah-ee", partOfSpeech: "phrase" },
    ],
    phrases: [
      { id: "p-ja-2-1", phrase: "ラーメンをください (Ramen o kudasai)", translation: "Ramen, please" },
      { id: "p-ja-2-2", phrase: "お会計をおねがいします (Okaikei o onegaishimasu)", translation: "The bill, please" },
    ],
    activities: [
      {
        id: "a-ja-2-1",
        type: "translate",
        prompt: "How do you ask for water in Japanese?",
        question: "Water, please",
        options: ["Omizu o kudasai", "Ramen o kudasai", "Konnichiwa", "Arigatou"],
        correctAnswer: "Omizu o kudasai",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: "You are Kenji, guiding the student through ordering at a lively ramen shop in Shinjuku.",
      welcomeMessage: "Irasshaimase! Ready to order? First, get the server's attention by saying: 'Sumimasen'!",
      scenario: "Counter seating at a Tokyo ramen shop.",
      targetLanguage: "Japanese",
      keyPhrasesToElicit: ["Sumimasen", "Ramen o kudasai", "Okaikei o onegaishimasu"],
      feedbackCriteria: ["Clear pronunciation of kudasai"],
    },
  },

  // ==========================================
  // GERMAN - SAMPLE DATASET
  // ==========================================
  {
    id: "lesson-de-1-1",
    unitId: "unit-de-1",
    languageId: "de",
    lessonNumber: 1,
    title: "Welcome to German",
    description: "Say Hallo, Guten Tag, and exchange polite words.",
    status: "available",
    xpReward: 15,
    estimatedMinutes: 5,
    icon: "hand-wave",
    goals: ["Say Hallo and Guten Tag", "Use Bitte and Danke"],
    vocabulary: [
      { id: "v-de-1-1", word: "Hallo", translation: "Hello", phonetic: "HAH-loh", partOfSpeech: "phrase" },
      { id: "v-de-1-2", word: "Guten Tag", translation: "Good day", phonetic: "GOO-ten TAHK", partOfSpeech: "phrase" },
      { id: "v-de-1-3", word: "Danke schön", translation: "Thank you very much", phonetic: "DAHN-kuh shern", partOfSpeech: "phrase" },
      { id: "v-de-1-4", word: "Bitte", translation: "Please / You're welcome", phonetic: "BIT-tuh", partOfSpeech: "phrase" },
    ],
    phrases: [
      { id: "p-de-1-1", phrase: "Wie geht es Ihnen?", translation: "How are you? (formal)" },
    ],
    activities: [
      {
        id: "a-de-1-1",
        type: "multiple_choice",
        prompt: "Choose the correct translation for 'Thank you':",
        question: "Thank you",
        options: ["Danke", "Bitte", "Hallo", "Tschüss"],
        correctAnswer: "Danke",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: "You are Greta, an encouraging German tutor. Guide the student through basic German phonetics.",
      welcomeMessage: "Hallo! Willkommen! Let's practice saying hello in German. Say: 'Hallo, guten Tag'!",
      scenario: "Greeting colleagues in Berlin.",
      targetLanguage: "German",
      keyPhrasesToElicit: ["Hallo", "Guten Tag", "Danke schön", "Bitte"],
      feedbackCriteria: ["Crisp consonants and round vowels"],
    },
  },
  {
    id: "lesson-de-2-1",
    unitId: "unit-de-2",
    languageId: "de",
    lessonNumber: 1,
    title: "At the Bakery",
    description: "Order fresh bread, pretzels, and coffee in German.",
    status: "available",
    xpReward: 15,
    estimatedMinutes: 5,
    icon: "coffee",
    goals: ["Order with 'Ich möchte...'", "Ask for a pretzel and coffee"],
    vocabulary: [
      { id: "v-de-2-1", word: "Ein Kaffee", translation: "A coffee", phonetic: "eyen KAH-feh", partOfSpeech: "noun" },
      { id: "v-de-2-2", word: "Eine Brezel", translation: "A pretzel", phonetic: "EYE-nuh BRAYT-sel", partOfSpeech: "noun" },
      { id: "v-de-2-3", word: "Ich möchte...", translation: "I would like...", phonetic: "ikh MERKH-tuh", partOfSpeech: "phrase" },
    ],
    phrases: [
      { id: "p-de-2-1", phrase: "Einen Kaffee, bitte", translation: "A coffee, please" },
      { id: "p-de-2-2", phrase: "Die Rechnung, bitte", translation: "The bill, please" },
    ],
    activities: [
      {
        id: "a-de-2-1",
        type: "translate",
        prompt: "How do you say 'A coffee, please' in German?",
        question: "A coffee, please",
        options: ["Einen Kaffee, bitte", "Eine Brezel, bitte", "Danke schön", "Auf Wiedersehen"],
        correctAnswer: "Einen Kaffee, bitte",
      },
    ],
    aiTeacherPrompt: {
      systemPrompt: "You are Greta, helping the student order at a traditional German bakery in Munich.",
      welcomeMessage: "Guten Tag! Let's order a fresh coffee and pretzel at the Bäckerei. Say: 'Einen Kaffee, bitte'!",
      scenario: "Ordering breakfast at a bakery in Munich.",
      targetLanguage: "German",
      keyPhrasesToElicit: ["Einen Kaffee, bitte", "Eine Brezel, bitte", "Die Rechnung, bitte"],
      feedbackCriteria: ["Pronunciation of the 'ch' in möchte"],
    },
  },
];

export const LESSONS: Lesson[] = [...BASE_LESSONS, ...EXTRA_LESSONS];

// ==========================================
// HELPER QUERY FUNCTIONS
// ==========================================

export function getAllLessons(): Lesson[] {
  return LESSONS;
}

export function getLessonsByLanguage(languageId: string): Lesson[] {
  return LESSONS.filter(
    (l) => l.languageId.toLowerCase() === languageId.toLowerCase()
  );
}

export function getLessonsByUnit(unitId: string): Lesson[] {
  return LESSONS.filter((l) => l.unitId === unitId);
}

export function getLessonById(id: string): Lesson | undefined {
  return LESSONS.find((l) => l.id === id);
}

export function getDefaultLessonForLanguage(languageId: string): Lesson | undefined {
  const languageLessons = getLessonsByLanguage(languageId);
  // Default to lesson 3 (At the Café) if available, or first in-progress/available lesson
  return (
    languageLessons.find((l) => l.id === `lesson-${languageId.toLowerCase()}-3-3`) ||
    languageLessons.find((l) => l.status === "in_progress") ||
    languageLessons[0]
  );
}

