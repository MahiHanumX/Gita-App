import type { TranslationSchema } from '../types';

const hi: TranslationSchema = {
  tabs: { path: 'पथ', library: 'ग्रंथालय', practice: 'अभ्यास', profile: 'आप' },
  common: {
    skip: 'छोड़ें',
    begin: 'आरम्भ करें',
    continue: 'आगे बढ़ें',
    or: 'या',
    reflect: 'चिंतन',
    chapters: 'अध्याय',
    explore: 'अन्वेषण',
    verses: 'श्लोक',
    weeks: 'सप्ताह',
    language: 'भाषा',
    selectLanguage: 'अपनी भाषा चुनें',
    currentLanguage: 'ऐप की भाषा',
  },
  onboarding: {
    step1of2: 'चरण 1 / 2',
    step2of2: 'चरण 2 / 2',
    whyHere: 'आप यहाँ क्यों आए हैं?',
    whyHereSub: 'आप इस यात्रा पर क्यों आए?',
    chooseResonate: 'जो भी अनुभूत हो, चुनें। बाद में बदल सकते हैं।',
    timeQuestion: 'प्रतिदिन कितना समय?',
    lightLamp: 'पहला दीप जलाएँ',
  },
  auth: { guest: 'अतिथि के रूप में जारी रखें' },
  path: { day: 'दिवस', min: 'मि', chapterCount: 'अध्याय', reflect: 'चिंतन', startPractice: 'आज का अभ्यास आरंभ करें', startPracticeSub: 'आज का अभ्यास आरंभ करें' },
  profile: { you: 'आप', practiceHeatmap: 'अभ्यास' },
};

export default hi;
