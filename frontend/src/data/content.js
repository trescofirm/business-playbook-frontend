// =========================================================
// CATEGORIES
// =========================================================

export const categories = [
  "MINDSET",
  "BUSINESS",
  "PERSUASION",
  "DISCIPLINE",
  "CONFIDENCE",
  "LEADERSHIP",
  "PHYSIQUE",
  "STRATEGY",
];


// =========================================================
// BOOKS / PRODUCTS
// =========================================================

export const books = [

  // =======================================================
  // BOOK 1
  // =======================================================

  {
    id: "how-to-attract-women",

    title: "How to Attract Women",

    subtitle:
      "If You Have Zero Options and Are Starting at Ground Zero",

    category: "CONFIDENCE",

    type: "E-BOOK",

    description:
      "A practical guide focused on confidence, communication, self-development and building better social skills from the ground up.",

    author: "Dr. Kenneth Anderson",

    images: {
      cover: "/images/books/how-to-attract-women-cover.jpeg",
      mockup: "/images/books/how-to-attract-women-cover.jpeg",
    },

    features: [
      "Digital access",
      "Instant delivery",
      "Phone, tablet & computer",
      "One-time purchase",
    ],

    price: 19.99,

    oldPrice: 25.00,

    available: true,
  },


  // =======================================================
  // BOOK 2
  // =======================================================

  {
    id: "dopamine-detox",

    title: "30 Day Dopamine Detox Workbook",

    subtitle:
      "Focus and Control for Your Exam Period",

    category: "DISCIPLINE",

    type: "WORKBOOK",

    description:
      "A 30-day workbook designed to help you build focus, reduce distractions and stay consistent during your exam period.",

    author: "",

    images: {
      cover: "/images/books/dopamine-detox.jpeg",
      mockup: "/images/books/book2-mockup.jpeg",
    },

    features: [
      "30-day workbook",
      "Digital access",
      "Instant delivery",
      "Phone, tablet & computer",
    ],

    /* UPDATED PRICE */

    price: 15.99,

    oldPrice: 20.00,

    available: true,
  },


  // =======================================================
  // BOOK 3
  // =======================================================

  {
    id: "unlock-focus",

    title: "How to Unlock Your Focus",

    subtitle:
      "Build Better Focus and Control",

    category: "MINDSET",

    type: "E-BOOK",

    description:
      "A practical guide focused on improving concentration, reducing distractions and developing better focus.",

    author: "Vishal Kumar",

    images: {
      cover: "/images/books/unlock-focus-cover.jpeg",
      mockup: "/images/books/unlock-focus.jpeg",
    },

    features: [
      "Digital access",
      "Instant delivery",
      "Phone, tablet & computer",
      "One-time purchase",
    ],

    /* UPDATED PRICE */

    price: 15.99,

    oldPrice: 20.00,

    available: true,
  },
];


// =========================================================
// COMPLETE COLLECTION
// =========================================================

export const collection = {
  title: "Complete Collection",

  description:
    "Get all three practical playbooks together and save more.",

  /* Individual sale prices:
     $19.99 + $15.99 + $15.99 = $51.97
  */

  individualTotal: 51.97,

  regularPrice: 50.00,

  price: 45.00,

  /* $51.97 - $45.00 = $6.97 */

  saving: 6.97,
};


// =========================================================
// TESTIMONIALS
// =========================================================

export const testimonials = [
  {
    id: 1,

    name: "John Mitchell",

    role: "Entrepreneur",

    quote:
      "The short lessons make it incredibly easy to pick an idea and actually use it.",
  },

  {
    id: 2,

    name: "Michael Richardson",

    role: "Student",

    quote:
      "I like that I don't have to spend hours reading before finding something useful.",
  },

  {
    id: 3,

    name: "Daniel Wilson",

    role: "Professional",

    quote:
      "Simple, practical and something I can come back to whenever I need a reset.",
  },
];


// =========================================================
// FAQ
// =========================================================

export const faqs = [
  {
    id: 1,

    question:
      "Who can benefit from these books?",

    answer:
      "If you struggle with distractions, low focus, lack of confidence, or want to improve your dating and social life, these books are for you.",
  },

  {
    id: 2,

    question:
      "Are these books actually helpful?",

    answer:
      "They’re built around practical ideas and actionable advice you can apply in everyday life—not just theory.",
  },

  {
    id: 3,

    question:
      "What if I’m completely new to self-improvement?",

    answer:
      "That’s okay. The books are beginner-friendly and focus on simple steps you can start using immediately.",
  },

  {
    id: 4,

    question:
      "Will one book solve all my problems?",

    answer:
      "No book can do that. These are tools to help you understand yourself, build better habits, and take meaningful action.",
  },

  {
    id: 5,

    question:
      "How do I know which book is right for me?",

    answer:
      "Choose based on what you want to improve—focus, discipline, confidence, relationships, dating, or personal growth.",
  },

  {
    id: 6,

    question:
      "Are these books just motivational content?",

    answer:
      "No. They focus on practical strategies, insights, and actions rather than empty motivation.",
  },

  {
    id: 7,

    question:
      "Can these books really help me become more confident?",

    answer:
      "They can give you useful perspectives and practical steps, but real confidence comes from applying them consistently.",
  },

  {
    id: 8,

    question:
      "Are the dating and attraction books about manipulation?",

    answer:
      "No. They focus on confidence, communication, understanding attraction, and building healthier social interactions.",
  },

  {
    id: 9,

    question:
      "Can I get a refund after purchasing?",

    answer:
      "Please check our refund policy for details regarding eligibility and applicable conditions.",
  },
];