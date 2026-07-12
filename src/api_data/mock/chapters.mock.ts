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
    chipEn: 'Shloka · 10 Verses',
    shlokas: [
      {
        lines: ['कर्मण्येवाधिकारस्ते', 'मा फलेषु कदाचन।'],
        subLines: ['मा कर्मफलहेतुर्भूः', 'मा ते सङ्गोऽस्त्वकर्मणि॥'],
        transliteration: 'karmaṇy-evādhikāras te\nmā phaleṣu kadācana',
        reference: 'Bhagavad Gita · 2.47',
      },
      {
        lines: ['योगस्थः कुरु कर्माणि', 'सङ्गं त्यक्त्वा धनञ्जय।'],
        subLines: ['सिद्ध्यसिद्ध्योः समो भूत्वा', 'समत्वं योग उच्यते॥'],
        transliteration: 'yoga-sthaḥ kuru karmāṇi\nsaṅgaṁ tyaktvā dhanañjaya',
        reference: 'Bhagavad Gita · 2.48',
      },
      {
        lines: ['नैनं छिन्दन्ति शस्त्राणि', 'नैनं दहति पावकः।'],
        subLines: ['न चैनं क्लेदयन्त्यापो', 'न शोषयति मारुतः॥'],
        transliteration: 'nainaṁ chindanti śastrāṇi\nnainaṁ dahati pāvakaḥ',
        reference: 'Bhagavad Gita · 2.23',
      },
      {
        lines: ['वासांसि जीर्णानि यथा', 'विहाय नवानि गृह्णाति नरोऽपराणि।'],
        subLines: ['तथा शरीराणि विहाय जीर्णा-', 'न्यन्यानि संयाति नवानि देही॥'],
        transliteration: 'vāsāṁsi jīrṇāni yathā vihāya\nnavāni gṛhṇāti naro \'parāṇi',
        reference: 'Bhagavad Gita · 2.22',
      },
      {
        lines: ['यदा यदा हि धर्मस्य', 'ग्लानिर्भवति भारत।'],
        subLines: ['अभ्युत्थानमधर्मस्य', 'तदात्मानं सृजाम्यहम्॥'],
        transliteration: 'yadā yadā hi dharmasya\nglānir bhavati bhārata',
        reference: 'Bhagavad Gita · 4.7',
      },
      {
        lines: ['परित्राणाय साधूनां', 'विनाशाय च दुष्कृताम्।'],
        subLines: ['धर्मसंस्थापनार्थाय', 'सम्भवामि युगे युगे॥'],
        transliteration: 'paritrāṇāya sādhūnāṁ\nvināśāya ca duṣkṛtām',
        reference: 'Bhagavad Gita · 4.8',
      },
      {
        lines: ['श्रेयान्स्वधर्मो विगुणः', 'परधर्मात्स्वनुष्ठितात्।'],
        subLines: ['स्वधर्मे निधनं श्रेयः', 'परधर्मो भयावहः॥'],
        transliteration: 'śreyān sva-dharmo viguṇaḥ\npara-dharmāt sv-anuṣṭhitāt',
        reference: 'Bhagavad Gita · 3.35',
      },
      {
        lines: ['मन्मना भव मद्भक्तो', 'मद्याजी मां नमस्कुरु।'],
        subLines: ['मामेवैष्यसि सत्यं ते', 'प्रतिजाने प्रियोऽसि मे॥'],
        transliteration: 'man-manā bhava mad-bhakto\nmad-yājī māṁ namaskuru',
        reference: 'Bhagavad Gita · 18.65',
      },
      {
        lines: ['सर्वधर्मान्परित्यज्य', 'मामेकं शरणं व्रज।'],
        subLines: ['अहं त्वां सर्वपापेभ्यो', 'मोक्षयिष्यामि मा शुचः॥'],
        transliteration: 'sarva-dharmān parityajya\nmām ekaṁ śaraṇaṁ vraja',
        reference: 'Bhagavad Gita · 18.66',
      },
      {
        lines: ['अनन्याश्चिन्तयन्तो मां', 'ये जनाः पर्युपासते।'],
        subLines: ['तेषां नित्याभियुक्तानां', 'योगक्षेमं वहाम्यहम्॥'],
        transliteration: 'ananyāś cintayanto māṁ\nye janāḥ paryupāsate',
        reference: 'Bhagavad Gita · 9.22',
      },
    ],
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
