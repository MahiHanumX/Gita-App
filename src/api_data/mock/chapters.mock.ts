import type { CtaLabels, DailyPractice } from '../types';

export const CHAPTER_CTA_MOCK: CtaLabels = {
  shloka: { label: 'Read Meaning', subLabel: 'अर्थ पढ़ें' },
  teaching: { label: 'Continue', subLabel: 'आगे बढ़ें' },
  task: { label: "I've Done It", subLabel: 'मैंने कर लिया' },
  reflect: { label: 'Save Reflection', subLabel: 'विचार सहेजें' },
  complete: { label: "Seal Today's Practice", subLabel: 'अभ्यास पूर्ण करें' },
};

export const DAILY_PRACTICE_MOCK: DailyPractice = {
  dayId: 13,
  totalSteps: 5,
  shloka: {
    type: 'shloka',
    chipHi: 'श्लोक',
    chipEn: 'Shloka · 01',
    lines: ['कर्मण्येवाधिकारस्ते', 'मा फलेषु कदाचन।'],
    subLines: ['मा कर्मफलहेतुर्भूः', 'मा ते सङ्गोऽस्त्वकर्मणि॥'],
    transliteration: 'karmaṇy-evādhikāras te\nmā phaleṣu kadācana',
    reference: 'Bhagavad Gita · 2.47',
  },
  teaching: {
    type: 'teaching',
    chipHi: 'शिक्षा',
    chipEn: 'Teaching',
    title: 'You have the right\nto your work,',
    titleItalic: 'but never to its fruits.',
    body:
      'When we act only for reward, our joy hangs on outcomes we do not control. Krishna teaches Arjuna to shift the seat of the self: from grasping to giving, from result to offering.',
    reflectPrompt: 'What would today feel like if I released the need for it to go a certain way?',
  },
  task: {
    type: 'task',
    chipHi: 'अभ्यास',
    chipEn: 'Task · 4 min',
    title: 'The Offering of Effort',
    hindiTitle: 'प्रयत्न का समर्पण',
    steps: [
      { n: 1, text: 'Choose one task on your list today — small or large.', done: true },
      {
        n: 2,
        text: "Before starting, breathe once and silently offer the work: 'This is not for me alone.'",
        done: true,
      },
      {
        n: 3,
        text: 'Do it with full attention. Notice the pull toward the outcome — return to the doing.',
        current: true,
      },
      { n: 4, text: 'When finished, do not check what came of it. Move on.' },
    ],
    note: "Return here once you've completed the practice.",
  },
  reflect: {
    type: 'reflect',
    chipHi: 'चिंतन',
    chipEn: 'Reflect',
    question: 'Where did the pull toward the fruit arise today?',
    questionHi: 'आज फल की चाह कहाँ जगी?',
    sampleText:
      'I noticed it when I checked my phone after sending the email — hoping for a reply that would tell me I did well',
    feelings: [
      { id: 'restless', label: 'restless' },
      { id: 'hopeful', label: 'hopeful' },
      { id: 'softer', label: 'softer', active: true },
      { id: 'add', label: '+ add' },
    ],
    privacyNote: 'Private · only you will see this',
  },
  complete: {
    type: 'complete',
    chipHi: 'समापन',
    chipEn: 'Complete',
    title: 'The lamp is lit.',
    hindiTitle: 'दीप प्रज्वलित है।',
    body:
      "You held today's teaching gently. Rest in it — the practice continues in how you live the next hour.",
  },
};

export const DAY_SHEET_CTA_MOCK = {
  label: "Start Today's Practice",
  subLabel: 'आज का अभ्यास आरंभ करें',
};
