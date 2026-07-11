import type { AppLanguage } from '../../i18n/types';
import type { CtaLabels, DailyPractice } from '../types';
import { CHAPTER_CTA_MOCK, DAILY_PRACTICE_MOCK } from '../mock/chapters.mock';

type ChapterBundle = {
  cta: CtaLabels;
  practice: DailyPractice;
};

const en: ChapterBundle = {
  cta: CHAPTER_CTA_MOCK,
  practice: DAILY_PRACTICE_MOCK,
};

const hi: ChapterBundle = {
  cta: {
    shloka: { label: 'अर्थ पढ़ें', subLabel: 'अर्थ पढ़ें' },
    teaching: { label: 'आगे बढ़ें', subLabel: 'आगे बढ़ें' },
    task: { label: 'मैंने कर लिया', subLabel: 'मैंने कर लिया' },
    reflect: { label: 'विचार सहेजें', subLabel: 'विचार सहेजें' },
    complete: { label: 'अभ्यास पूर्ण करें', subLabel: 'अभ्यास पूर्ण करें' },
  },
  practice: {
    ...DAILY_PRACTICE_MOCK,
    shloka: { ...DAILY_PRACTICE_MOCK.shloka, chipEn: 'श्लोक · 01' },
    teaching: {
      ...DAILY_PRACTICE_MOCK.teaching,
      chipEn: 'शिक्षा',
      title: 'तुम्हारा अधिकार\nकेवल कर्म पर है,',
      titleItalic: 'फल पर कभी नहीं।',
      body: 'जब हम केवल फल के लिए कर्म करते हैं, तो हमारी खुशी उन परिणामों पर टिकी रहती है जिन पर हमारा नियंत्रण नहीं। कृष्ण अर्जुन को आत्मा का स्थान बदलना सिखाते हैं: पकड़ से देने की ओर, परिणाम से समर्पण की ओर।',
      reflectPrompt: 'अगर मैं आज किसी एक तरीके से होने की ज़रूरत छोड़ दूँ, तो कैसा लगेगा?',
    },
    task: {
      ...DAILY_PRACTICE_MOCK.task,
      chipEn: 'अभ्यास · 4 मि',
      title: 'प्रयत्न का समर्पण',
      steps: [
        { n: 1, text: 'आज अपनी सूची से एक कार्य चुनें — छोटा या बड़ा।', done: true },
        { n: 2, text: "शुरू करने से पहले एक बार साँस लें और चुपचाप समर्पित करें: 'यह केवल मेरे लिए नहीं।'", done: true },
        { n: 3, text: 'पूरा ध्यान देकर करें। परिणाम की ओर खिंचाव महसूस करें — कर्म में लौटें।', current: true },
        { n: 4, text: 'पूरा होने पर, परिणाम देखने की जल्दी न करें। आगे बढ़ें।' },
      ],
      note: 'अभ्यास पूरा होने पर यहाँ लौटें।',
    },
    reflect: {
      ...DAILY_PRACTICE_MOCK.reflect,
      chipEn: 'चिंतन',
      question: 'आज फल की चाह कहाँ जगी?',
      feelings: [
        { id: 'restless', label: 'अशांत' },
        { id: 'hopeful', label: 'आशावान' },
        { id: 'softer', label: 'कोमल', active: true },
        { id: 'add', label: '+ जोड़ें' },
      ],
      privacyNote: 'निजी · केवल आप देखेंगे',
    },
    complete: {
      ...DAILY_PRACTICE_MOCK.complete,
      chipEn: 'समापन',
      body: 'आपने आज की शिक्षा को कोमलता से धारण किया। इसमें विश्राम करें — अभ्यास अगले घंटे में जीने से जारी रहता है।',
    },
  },
};

const mr: ChapterBundle = {
  cta: {
    shloka: { label: 'अर्थ वाचा', subLabel: 'अर्थ वाचा' },
    teaching: { label: 'पुढे जा', subLabel: 'पुढे जा' },
    task: { label: 'मी केले', subLabel: 'मी केले' },
    reflect: { label: 'विचार जतन करा', subLabel: 'विचार जतन करा' },
    complete: { label: 'साधना पूर्ण करा', subLabel: 'साधना पूर्ण करा' },
  },
  practice: {
    ...DAILY_PRACTICE_MOCK,
    teaching: {
      ...DAILY_PRACTICE_MOCK.teaching,
      chipEn: 'शिक्षण',
      title: 'तुमचा अधिकार\nफक्त कर्मावर आहे,',
      titleItalic: 'फळावर कधीच नाही.',
      body: 'फळासाठीच कर्म केल्यास आनंद परिणामांवर अवलंबून राहतो. कृष्ण अर्जुनाला स्वतःचे स्थान बदलायला शिकवतात — पकडून ठेवण्यापासून समर्पणाकडे.',
      reflectPrompt: 'एखाद्या विशिष्ट परिणामाची गरज सोडल्यास आज कसे वाटेल?',
    },
    task: {
      ...DAILY_PRACTICE_MOCK.task,
      chipEn: 'साधना · 4 मि',
      title: 'प्रयत्नाचे समर्पण',
      steps: [
        { n: 1, text: 'आजच्या यादीतून एक काम निवडा.', done: true },
        { n: 2, text: "सुरू करण्यापूर्वी एक श्वास घ्या आणि म्हणा: 'हे फक्त माझ्यासाठी नाही.'", done: true },
        { n: 3, text: 'पूर्ण लक्षाने करा. परिणामाकडे ओढ जाणवा — कर्मात परत या.', current: true },
        { n: 4, text: 'संपल्यावर परिणाम तपासू नका. पुढे जा.' },
      ],
      note: 'साधना पूर्ण झाल्यावर इथे परत या.',
    },
    reflect: {
      ...DAILY_PRACTICE_MOCK.reflect,
      chipEn: 'चिंतन',
      question: 'आज फळाची इच्छा कुठे जागी?',
      privacyNote: 'खाजगी · फक्त तुम्हाला दिसेल',
    },
    complete: {
      ...DAILY_PRACTICE_MOCK.complete,
      chipEn: 'समाप्त',
      body: 'तुम्ही आजचे शिक्षण सौम्यतेने धरले. त्यात विश्रांती घ्या.',
    },
  },
};

const gu: ChapterBundle = {
  cta: {
    shloka: { label: 'અર્થ વાંચો', subLabel: 'અર્થ વાંચો' },
    teaching: { label: 'આગળ વધો', subLabel: 'આગળ વધો' },
    task: { label: 'મેં કરી લીધું', subLabel: 'મેં કરી લીધું' },
    reflect: { label: 'વિચાર સાચવો', subLabel: 'વિચાર સાચવો' },
    complete: { label: 'સાધના પૂર્ણ કરો', subLabel: 'સાધના પૂર્ણ કરો' },
  },
  practice: {
    ...DAILY_PRACTICE_MOCK,
    teaching: {
      ...DAILY_PRACTICE_MOCK.teaching,
      chipEn: 'શિક્ષણ',
      title: 'તમારો અધિકાર\nફક્ત કર્મ પર છે,',
      titleItalic: 'ફળ પર ક્યારેય નહીં.',
      body: 'ફળ માટે જ કર્મ કરીએ તો આનંદ પરિણામો પર અવલંબિત રહે છે. કૃષ્ણ અર્જુનને આત્માનું સ્થાન બદલવા શીખવે છે.',
      reflectPrompt: 'જો હું આજે ચોક્કસ પરિણામની જરૂર છોડી દું તો કેવું લાગશે?',
    },
    task: {
      ...DAILY_PRACTICE_MOCK.task,
      chipEn: 'સાધના · 4 મિ',
      title: 'પ્રયત્નનું સમર્પણ',
      steps: [
        { n: 1, text: 'આજની યાદીમાંથી એક કામ પસંદ કરો.', done: true },
        { n: 2, text: "શરૂ કરતા પહેલાં એક શ્વાસ લો અને કહો: 'આ ફક્ત મારા માટે નથી.'", done: true },
        { n: 3, text: 'પૂર્ણ ધ્યાનથી કરો. પરિણામ તરફ ખેંચાવ જણાય — કર્મમાં પાછા આવો.', current: true },
        { n: 4, text: 'પૂરું થયા પછી પરિણામ તપાસશો નહીં. આગળ વધો.' },
      ],
      note: 'સાધના પૂર્ણ થયા પછી અહીં પાછા આવો.',
    },
    reflect: {
      ...DAILY_PRACTICE_MOCK.reflect,
      chipEn: 'ચિંતન',
      question: 'આજે ફળની ઇચ્છા ક્યાં જાગી?',
      privacyNote: 'ખાનગી · ફક્ત તમને દેખાશે',
    },
    complete: {
      ...DAILY_PRACTICE_MOCK.complete,
      chipEn: 'સમાપ્ત',
      body: 'તમે આજની શિક્ષા કોમળતાથી ધારણ કરી. તેમાં વિશ્રામ કરો.',
    },
  },
};

const ta: ChapterBundle = {
  cta: {
    shloka: { label: 'பொருள் படிக்க', subLabel: 'பொருள் படிக்க' },
    teaching: { label: 'தொடரவும்', subLabel: 'தொடரவும்' },
    task: { label: 'செய்துவிட்டேன்', subLabel: 'செய்துவிட்டேன்' },
    reflect: { label: 'சிந்தனை சேமிக்க', subLabel: 'சிந்தனை சேமிக்க' },
    complete: { label: 'பயிற்சி முடிக்க', subLabel: 'பயிற்சி முடிக்க' },
  },
  practice: {
    ...DAILY_PRACTICE_MOCK,
    teaching: {
      ...DAILY_PRACTICE_MOCK.teaching,
      chipEn: 'போதனை',
      title: 'உங்கள் உரிமை\nவேலையில் மட்டுமே,',
      titleItalic: 'பலனில் ஒருபோதும் அல்ல.',
      body: 'பலனுக்காக மட்டும் செயல்படும்போது, நமது மகிழ்ச்சி கட்டுப்படுத்த முடியாத விளைவுகளைச் சார்ந்திருக்கும்.',
      reflectPrompt: 'ஒரு குறிப்பிட்ட விதத்தில் நடக்க வேண்டும் என்ற தேவையை விட்டுவிட்டால் இன்று எப்படி இருக்கும்?',
    },
    task: {
      ...DAILY_PRACTICE_MOCK.task,
      chipEn: 'பயிற்சி · 4 நி',
      title: 'முயற்சியின் அர்ப்பணிப்பு',
      steps: [
        { n: 1, text: 'இன்றைய பட்டியலில் இருந்து ஒரு பணியைத் தேர்ந்தெடுக்கவும்.', done: true },
        { n: 2, text: "தொடங்குவதற்கு முன் ஒரு மூச்சு எடுத்து: 'இது எனக்காக மட்டும் அல்ல.'", done: true },
        { n: 3, text: 'முழு கவனத்துடன் செய்யுங்கள். விளைவை நோக்கிய இழுப்பை உணருங்கள் — செயலில் திரும்புங்கள்.', current: true },
        { n: 4, text: 'முடிந்ததும் விளைவைப் பார்க்க வேண்டாம். முன்னே செல்லுங்கள்.' },
      ],
      note: 'பயிற்சி முடிந்ததும் இங்கே திரும்புங்கள்.',
    },
    reflect: {
      ...DAILY_PRACTICE_MOCK.reflect,
      chipEn: 'சிந்தனை',
      question: 'இன்று பலனின் இழுப்பு எங்கு எழுந்தது?',
      privacyNote: 'தனிப்பட்ட · நீங்கள் மட்டுமே பார்ப்பீர்கள்',
    },
    complete: {
      ...DAILY_PRACTICE_MOCK.complete,
      chipEn: 'முடிவு',
      body: 'இன்றைய போதனையை மென்மையாக ஏற்றீர்கள். அதில் ஓய்வெடுங்கள்.',
    },
  },
};

const te: ChapterBundle = {
  cta: {
    shloka: { label: 'అర్థం చదవండి', subLabel: 'అర్థం చదవండి' },
    teaching: { label: 'కొనసాగించండి', subLabel: 'కొనసాగించండి' },
    task: { label: 'చేసాను', subLabel: 'చేసాను' },
    reflect: { label: 'ఆలోచన సేవ్', subLabel: 'ఆలోచన సేవ్' },
    complete: { label: 'అభ్యాసం పూర్తి', subLabel: 'అభ్యాసం పూర్తి' },
  },
  practice: {
    ...DAILY_PRACTICE_MOCK,
    teaching: {
      ...DAILY_PRACTICE_MOCK.teaching,
      chipEn: 'బోధన',
      title: 'మీ హక్కు\nపనిపై మాత్రమే,',
      titleItalic: 'ఫలితాలపై ఎప్పుడూ కాదు.',
      body: 'ఫలితం కోసం మాత్రమే చర్య చేస్తే, మన ఆనందం నియంత్రించలేని ఫలితాలపై ఆధారపడి ఉంటుంది.',
      reflectPrompt: 'ఒక నిర్దిష్ట విధంగా జరగాలనే అవసరాన్ని వదిలిస్తే ఈరోజు ఎలా అనిపిస్తుంది?',
    },
    task: {
      ...DAILY_PRACTICE_MOCK.task,
      chipEn: 'అభ్యాసం · 4 ని',
      title: 'ప్రయత్న సమర్పణ',
      steps: [
        { n: 1, text: 'నేటి జాబితా నుండి ఒక పని ఎంచుకోండి.', done: true },
        { n: 2, text: "మొదలు పెట్టే ముందు ఒక ఊపిరి తీసుకుని: 'ఇది నాకు మాత్రమే కాదు.'", done: true },
        { n: 3, text: 'పూర్తి దృష్టితో చేయండి. ఫలితం వైపు లాగటాన్ని గమనించండి — చర్యకు తిరిగి రండి.', current: true },
        { n: 4, text: 'పూర్తయిన తర్వాత ఫలితం చూడవద్దు. ముందుకు సాగండి.' },
      ],
      note: 'అభ్యాసం పూర్తైన తర్వాత ఇక్కడకు తిరిగి రండి.',
    },
    reflect: {
      ...DAILY_PRACTICE_MOCK.reflect,
      chipEn: 'ఆలోచన',
      question: 'నేడు ఫలం వైపు లాగటం ఎక్కడ ఎదిగింది?',
      privacyNote: 'ప్రైవేట్ · మీరు మాత్రమే చూస్తారు',
    },
    complete: {
      ...DAILY_PRACTICE_MOCK.complete,
      chipEn: 'పూర్తి',
      body: 'మీరు నేటి బోధనను మృదువుగా పట్టుకున్నారు. దానిలో విశ్రాంతి తీసుకోండి.',
    },
  },
};

const bundles: Record<AppLanguage, ChapterBundle> = { en, hi, mr, gu, ta, te };

export function getChapterContent(lang: AppLanguage, dayId = 13): ChapterBundle {
  const bundle = bundles[lang] ?? bundles.en;
  return {
    cta: bundle.cta,
    practice: { ...bundle.practice, dayId },
  };
}
