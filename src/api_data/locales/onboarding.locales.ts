import type { AppLanguage } from '../../i18n/types';
import type { OnboardingContent } from '../types';

const content: Record<AppLanguage, OnboardingContent> = {
  en: {
    splash: {
      hindiTitle: 'दीप',
      englishTitle: 'Deep',
      tagline: 'the inner lamp',
      footerText: 'A 40-day journey with the Gita',
      autoAdvanceMs: 2200,
    },
    welcome: {
      title: 'Ancient wisdom, held gently in your day.',
      subtitle: 'Wisdom for everyday life.',
      carouselDots: 3,
      activeDot: 0,
    },
    intentions: [
      { id: 'calm', en: 'Find calm', hi: 'Find calm' },
      { id: 'habit', en: 'Build a habit', hi: 'Build a habit' },
      { id: 'understand', en: 'Understand the Gita', hi: 'Understand the Gita', selected: true },
      { id: 'detach', en: 'Detach from outcomes', hi: 'Detach from outcomes', selected: true },
      { id: 'spiritual', en: 'Grow spiritually', hi: 'Grow spiritually' },
      { id: 'grief', en: 'Heal from grief', hi: 'Heal from grief' },
      { id: 'serve', en: 'Serve others', hi: 'Serve others' },
      { id: 'purpose', en: 'Discover purpose', hi: 'Discover purpose' },
    ],
    commitments: [
      { id: 'light', min: 5, label: 'Light', hi: 'Light', desc: '1 shloka · quick reflect' },
      { id: 'steady', min: 10, label: 'Steady', hi: 'Steady', desc: 'Full 5-chapter flow', selected: true },
      { id: 'deep', min: 20, label: 'Deep', hi: 'Deep', desc: 'Includes meditation + mantra' },
    ],
  },
  hi: {
    splash: {
      hindiTitle: 'दीप',
      englishTitle: 'Deep',
      tagline: 'अंतर का दीपक',
      footerText: 'गीता के साथ 40 दिन की यात्रा',
      autoAdvanceMs: 2200,
    },
    welcome: {
      title: 'प्राचीन ज्ञान, आज के जीवन में।',
      subtitle: 'हर दिन के लिए कोमल मार्गदर्शन।',
      carouselDots: 3,
      activeDot: 0,
    },
    intentions: [
      { id: 'calm', en: 'शांति', hi: 'शांति' },
      { id: 'habit', en: 'नियम', hi: 'नियम' },
      { id: 'understand', en: 'गीता को समझना', hi: 'गीता को समझना', selected: true },
      { id: 'detach', en: 'फल त्याग', hi: 'फल त्याग', selected: true },
      { id: 'spiritual', en: 'आध्यात्मिक विकास', hi: 'आध्यात्मिक विकास' },
      { id: 'grief', en: 'शोक से मुक्ति', hi: 'शोक से मुक्ति' },
      { id: 'serve', en: 'सेवा', hi: 'सेवा' },
      { id: 'purpose', en: 'उद्देश्य', hi: 'उद्देश्य' },
    ],
    commitments: [
      { id: 'light', min: 5, label: 'सरल', hi: 'सरल', desc: '1 श्लोक · त्वरित चिंतन' },
      { id: 'steady', min: 10, label: 'नियमित', hi: 'नियमित', desc: 'पूर्ण 5-चरण प्रवाह', selected: true },
      { id: 'deep', min: 20, label: 'गहन', hi: 'गहन', desc: 'ध्यान + मंत्र सहित' },
    ],
  },
  mr: {
    splash: {
      hindiTitle: 'दीप',
      englishTitle: 'Deep',
      tagline: 'आत्म्य दिवा',
      footerText: 'गीतेशी 40 दिवसांचा प्रवास',
      autoAdvanceMs: 2200,
    },
    welcome: {
      title: 'प्राचीन ज्ञान, आजचya दिवसात.',
      subtitle: 'दैनंदिन जीवनासाठी कोमल मार्गदर्शन.',
      carouselDots: 3,
      activeDot: 0,
    },
    intentions: [
      { id: 'calm', en: 'शांतता', hi: 'शांतता' },
      { id: 'habit', en: 'सवय', hi: 'सवय' },
      { id: 'understand', en: 'गीता समजणे', hi: 'गीता समजणे', selected: true },
      { id: 'detach', en: 'फळ त्याग', hi: 'फळ त्याग', selected: true },
      { id: 'spiritual', en: 'आध्यात्मिक विकास', hi: 'आध्यात्मिक विकास' },
      { id: 'grief', en: 'दुःखातून मुक्ती', hi: 'दुःखातून मुक्ती' },
      { id: 'serve', en: 'सेवा', hi: 'सेवा' },
      { id: 'purpose', en: 'उद्देश', hi: 'उद्देश' },
    ],
    commitments: [
      { id: 'light', min: 5, label: 'सोपे', hi: 'सोपे', desc: '1 श्लोक · जलद चिंतन' },
      { id: 'steady', min: 10, label: 'नियमित', hi: 'नियमित', desc: 'पूर्ण 5-टप्पे प्रवाह', selected: true },
      { id: 'deep', min: 20, label: 'सखोल', hi: 'सखोल', desc: 'ध्यान + मंत्रासह' },
    ],
  },
  gu: {
    splash: {
      hindiTitle: 'દીપ',
      englishTitle: 'Deep',
      tagline: 'આંતરિક દીવો',
      footerText: 'ગીતા સાથે 40 દિવસની યાત્રા',
      autoAdvanceMs: 2200,
    },
    welcome: {
      title: 'પ્રાચીન જ્ઞાન, આજના દિવસમાં.',
      subtitle: 'દૈનિક જીવન માટે કોમળ માર્ગદર્શન.',
      carouselDots: 3,
      activeDot: 0,
    },
    intentions: [
      { id: 'calm', en: 'શાંતિ', hi: 'શાંતિ' },
      { id: 'habit', en: 'આદત', hi: 'આદત' },
      { id: 'understand', en: 'ગીતા સમજવી', hi: 'ગીતા સમજવી', selected: true },
      { id: 'detach', en: 'ફળ ત્યાગ', hi: 'ફળ ત્યાગ', selected: true },
      { id: 'spiritual', en: 'આધ્યાત્મિક વિકાસ', hi: 'આધ્યાત્મિક વિકાસ' },
      { id: 'grief', en: 'દુઃખમાંથી મુક્તિ', hi: 'દુઃખમાંથી મુક્તિ' },
      { id: 'serve', en: 'સેવા', hi: 'સેવા' },
      { id: 'purpose', en: 'ઉદ્દેશ્ય', hi: 'ઉદ્દેશ્ય' },
    ],
    commitments: [
      { id: 'light', min: 5, label: 'હળવું', hi: 'હળવું', desc: '1 શ્લોક · ઝડપી ચિંતન' },
      { id: 'steady', min: 10, label: 'નિયમિત', hi: 'નિયમિત', desc: 'સંપૂર્ણ 5-પગલું પ્રવાહ', selected: true },
      { id: 'deep', min: 20, label: 'ઊંડું', hi: 'ઊંડું', desc: 'ધ્યાન + મંત્ર સાથે' },
    ],
  },
  ta: {
    splash: {
      hindiTitle: 'தீபம்',
      englishTitle: 'Deep',
      tagline: 'உள்ளார்ந்த விளக்கு',
      footerText: 'கீதையுடன் 40 நாள் பயணம்',
      autoAdvanceMs: 2200,
    },
    welcome: {
      title: 'பண்டைய ஞானம், உங்கள் நாளில்.',
      subtitle: 'தினசரி வாழ்வுக்கான மென்மையான வழிகாட்டுதல்.',
      carouselDots: 3,
      activeDot: 0,
    },
    intentions: [
      { id: 'calm', en: 'அமைதி', hi: 'அமைதி' },
      { id: 'habit', en: 'பழக்கம்', hi: 'பழக்கம்' },
      { id: 'understand', en: 'கீதை புரிந்துகொள்ள', hi: 'கீதை புரிந்துகொள்ள', selected: true },
      { id: 'detach', en: 'பலனை விட்டுவிட', hi: 'பலனை விட்டுவிட', selected: true },
      { id: 'spiritual', en: 'ஆன்மீக வளர்ச்சி', hi: 'ஆன்மீக வளர்ச்சி' },
      { id: 'grief', en: 'துயரத்திலிருந்து விடுதலை', hi: 'துயரத்திலிருந்து விடுதலை' },
      { id: 'serve', en: 'சேவை', hi: 'சேவை' },
      { id: 'purpose', en: 'நோக்கம்', hi: 'நோக்கம்' },
    ],
    commitments: [
      { id: 'light', min: 5, label: 'எளிய', hi: 'எளிய', desc: '1 ஸ்லோகம் · விரைவு சிந்தனை' },
      { id: 'steady', min: 10, label: 'நிலையான', hi: 'நிலையான', desc: 'முழு 5-படி ஓட்டம்', selected: true },
      { id: 'deep', min: 20, label: 'ஆழமான', hi: 'ஆழமான', desc: 'தியானம் + மந்திரம் உடன்' },
    ],
  },
  te: {
    splash: {
      hindiTitle: 'దీపం',
      englishTitle: 'Deep',
      tagline: 'అంతర్గత దీపం',
      footerText: 'గీతతో 40 రోజుల ప్రయాణం',
      autoAdvanceMs: 2200,
    },
    welcome: {
      title: 'ప్రాచీన జ్ఞానం, మీ రోజులో.',
      subtitle: 'దైనందిన జీవితానికి మృదువైన మార్గదర్శకత్వం.',
      carouselDots: 3,
      activeDot: 0,
    },
    intentions: [
      { id: 'calm', en: 'శాంతి', hi: 'శాంతి' },
      { id: 'habit', en: 'అలవాటు', hi: 'అలవాటు' },
      { id: 'understand', en: 'గీత అర్థం', hi: 'గీత అర్థం', selected: true },
      { id: 'detach', en: 'ఫల త్యాగం', hi: 'ఫల త్యాగం', selected: true },
      { id: 'spiritual', en: 'ఆధ్యాత్మిక పెరుగుదల', hi: 'ఆధ్యాత్మిక పెరుగుదల' },
      { id: 'grief', en: 'దుఃఖం నుండి విముక్తి', hi: 'దుఃఖం నుండి విముక్తి' },
      { id: 'serve', en: 'సేవ', hi: 'సేవ' },
      { id: 'purpose', en: 'ఉద్దేశ్యం', hi: 'ఉద్దేశ్యం' },
    ],
    commitments: [
      { id: 'light', min: 5, label: 'తేలిక', hi: 'తేలిక', desc: '1 శ్లోకం · త్వరిత చింతన' },
      { id: 'steady', min: 10, label: 'స్థిర', hi: 'స్థిర', desc: 'పూర్తి 5-దశల ప్రవాహం', selected: true },
      { id: 'deep', min: 20, label: 'లోతైన', hi: 'లోతైన', desc: 'ధ్యానం + మంత్రం తో' },
    ],
  },
};

export function getOnboardingContent(lang: AppLanguage): OnboardingContent {
  return content[lang] ?? content.en;
}
