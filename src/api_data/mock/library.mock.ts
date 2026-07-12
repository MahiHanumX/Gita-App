import type { LibraryContent, Verse, SuggestedSearch } from '../types';

export const LIBRARY_MOCK: LibraryContent = {
  title: 'Library',
  hindiTitle: 'ग्रंथालय',
  verseOfDay: {
    label: 'Verse of the Day',
    shloka: 'यदा यदा हि धर्मस्य\nग्लानिर्भवति भारत।',
    quote: '"Whenever righteousness declines, O Bharata…"',
    reference: 'Gita 4.7',
  },
  chapters: [
    { id: 1, hi: 'अर्जुनविषादयोग', en: "Arjuna's Sorrow", verses: 47, progress: 100, tone: 'gold' },
    { id: 2, hi: 'सांख्ययोग', en: 'The Path of Knowledge', verses: 72, progress: 68, tone: 'gold' },
    { id: 3, hi: 'कर्मयोग', en: 'The Path of Action', verses: 43, progress: 34, tone: 'active' },
    { id: 4, hi: 'ज्ञानकर्मसंन्यासयोग', en: 'Renunciation of Action', verses: 42, progress: 0 },
    { id: 5, hi: 'कर्मसंन्यासयोग', en: 'True Renunciation', verses: 29, progress: 0 },
  ],
};

export const RECENT_SEARCHES_MOCK = ['karma', 'निष्काम', 'meditation', 'Chapter 2', 'devotion'];

export const SUGGESTED_SEARCHES_MOCK: SuggestedSearch[] = [
  { hi: 'निष्काम कर्म', en: 'Selfless action', tag: 'Theme' },
  { hi: 'भक्ति योग', en: 'Path of devotion', tag: 'Chapter 12' },
  { hi: 'आत्मा', en: 'The Self / Soul', tag: 'Concept' },
  { hi: 'ॐ नमो भगवते', en: 'Om Namo Bhagavate', tag: 'Mantra' },
  { hi: 'ध्यान', en: 'Meditation', tag: 'Practice' },
  { hi: 'कर्म योग', en: 'Path of action', tag: 'Chapter 3' },
  { hi: 'ज्ञान योग', en: 'Path of wisdom', tag: 'Chapter 4' },
];

export const CHAPTER_VERSES_MOCK: Record<number, Verse[]> = {
  1: [
    { n: 1, key: true, hi: 'धर्मक्षेत्रे कुरुक्षेत्रे समवेता युयुत्सवः।\nमामकाः पाण्डवाश्चैव किमकुर्वत सञ्जय॥', en: 'Sanjaya said: On the holy field of Kurukshetra, gathered and eager to fight, what did my sons and Pandu\'s sons do?' },
    { n: 20, key: false, hi: 'अथ व्यवस्थितान्दृष्ट्वा धार्तराष्ट्रान्कपिध्वजः।\nप्रवृत्ते शस्त्रसम्पाते धनुरुद्यम्य पाण्डवः॥', en: 'Then Arjuna, seeing the sons of Dhritarashtra arrayed, raised his bow.' },
    { n: 47, key: true, hi: 'एवमुक्त्वार्जुनः सङ्ख्ये रथोपस्थ उपाविशत्।\nविसृज्य सशरं चापं शोकसंविग्नमानसः॥', en: 'Having spoken thus, Arjuna sank down on the seat of his chariot, casting aside his bow and arrow, his mind overwhelmed with grief.' },
  ],
  2: [
    { n: 47, key: true, hi: 'कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि॥', en: 'You have the right to perform your actions, but never to their fruits. Let not the fruits of action be your motive, nor let your attachment be to inaction.' },
    { n: 48, key: false, hi: 'योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनञ्जय।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते॥', en: 'Perform your duty equipoised, O Arjuna, abandoning all attachment to success or failure. Such equanimity is called Yoga.' },
    { n: 49, key: false, hi: 'दूरेण ह्यवरं कर्म बुद्धियोगाद्धनञ्जय।\nबुद्धौ शरणमन्विच्छ कृपणाः फलहेतవః॥', en: 'Seek refuge in divine intellect, Arjuna. Action performed with desire for fruits is far inferior to selfless action.' },
    { n: 50, key: false, hi: 'बुद्धियुक्तो जहातीह उभे सुकृतदुष्कृते।\nतस्माद्योगाय युज्यस्व योगः कर्मसु कौशलम्॥', en: 'Endowed with wisdom, one discards both good and evil actions in this life. Therefore, strive for Yoga—Yoga is skill in action.' },
    { n: 51, key: false, hi: 'कर्मजं बुद्धियुक्ता हि फलं त्यक्त्वा मनीषिणः।\nजन्मबन्धविनिर्मुक्ताः पदं गच्छन्त्यनामयम्॥', en: 'The wise, possessed of unified intellect, abandon the fruits born of action. Freed from the bonds of rebirth, they attain the state beyond all sorrow.' },
  ],
  3: [
    { n: 9, key: true, hi: 'यज्ञार्थात्कर्मणोऽन्यत्र लोकोऽयं कर्मबन्धनः।\nतदर्थं कर्म कौन्तेय मुक्तसङ्गः समाचर॥', en: 'Work done as a sacrifice for God must be performed, otherwise, work binds one to this material world. Therefore, perform your duties for His satisfaction.' },
    { n: 19, key: true, hi: 'तस्मादसक्तः सततम् कार्यम् कर्म समाचर।\nअसक्तो ह्याचरन्कर्म परमाप्नोति पूరుషః॥', en: 'Therefore, constantly perform your obligatory duties without attachment, for by performing action without attachment, one attains the Supreme.' },
    { n: 43, key: false, hi: 'एवं बुद्धेः परं बुद्ध्वा संस्तभ्यात्मानमात्मना।\nजहि शत्रुं महाबाहो कामरूपं दुरासदम्॥', en: 'Thus knowing the soul to be superior to intellect, steady the mind, and conquer this elusive enemy in the form of lust.' },
  ],
};

export const DEFAULT_VERSES_MOCK: Verse[] = [
  { n: 1, key: true, hi: 'यदा यदा हि धर्मस्य ग्लानिर्भवति भारत।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम्॥', en: 'Whenever there is a decline in righteousness and a rise in unrighteousness, O Bharata, then I manifest Myself.' },
  { n: 2, key: false, hi: 'परित्राणाय साधूनां विनाशाय च दुष्कृताम्।\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे॥', en: 'For the protection of the good, for the destruction of the wicked, and for the establishment of righteousness, I am born age after age.' },
];
