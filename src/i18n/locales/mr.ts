import type { TranslationSchema } from '../types';

const mr: TranslationSchema = {
  tabs: { path: 'मार्ग', library: 'ग्रंथालय', practice: 'साधना', profile: 'तुम्ही' },
  common: {
    skip: 'वगळा',
    begin: 'सुरुवात करा',
    continue: 'पुढे जा',
    or: 'किंवा',
    reflect: 'चिंतन',
    chapters: 'अध्याय',
    explore: 'शोधा',
    verses: 'श्लोक',
    weeks: 'आठवडे',
    language: 'भाषा',
    selectLanguage: 'तुमची भाषा निवडा',
    currentLanguage: 'अॅप भाषा',
  },
  onboarding: {
    step1of2: 'पायरी 1 / 2',
    step2of2: 'पायरी 2 / 2',
    whyHere: 'तुम्ही इथे का आला?',
    whyHereSub: 'ही यात्रा तुम्हाला का हवी आहे?',
    chooseResonate: 'जे जुळते ते निवडा. नंतर बदलू शकता.',
    timeQuestion: 'दररोज किती वेळ?',
    lightLamp: 'पहिला दिवा लावा',
  },
  auth: { guest: 'पाहुणे म्हणून सुरू ठेवा' },
  path: { day: 'दिवस', min: 'मि', chapterCount: 'अध्याय', reflect: 'चिंतन', startPractice: 'आजची साधना सुरू करा', startPracticeSub: 'आजची साधना सुरू करा' },
  profile: { you: 'तुम्ही', practiceHeatmap: 'साधना' },
};

export default mr;
