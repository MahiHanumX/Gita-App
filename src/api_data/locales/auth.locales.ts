import type { AppLanguage } from '../../i18n/types';
import type { AuthContent } from '../types';

const auth: Record<AppLanguage, AuthContent> = {
  en: {
    title: 'Welcome back',
    hindiTitle: 'Welcome back',
    description: 'Your lamp is waiting. Sign in to continue your journey.',
    providers: [
      { provider: 'apple', label: 'Continue with Apple' },
      { provider: 'google', label: 'Continue with Google' },
      { provider: 'email', label: 'Continue with Email' },
    ],
    guestLabel: 'Continue as guest',
  },
  hi: {
    title: 'पुनः स्वागत है',
    hindiTitle: 'पुनः स्वागत है',
    description: 'आपका दीप प्रतीक्षा कर रहा है। अपनी यात्रा जारी रखने के लिए साइन इन करें।',
    providers: [
      { provider: 'apple', label: 'Apple से जारी रखें' },
      { provider: 'google', label: 'Google से जारी रखें' },
      { provider: 'email', label: 'ईमेल से जारी रखें' },
    ],
    guestLabel: 'अतिथि के रूप में जारी रखें',
  },
  mr: {
    title: 'पुन्हा स्वागत',
    hindiTitle: 'पुन्हा स्वागत',
    description: 'तुमचा दिवा वाट पाहत आहे. प्रवास सुरू ठेवण्यासाठी साइन इन करा.',
    providers: [
      { provider: 'apple', label: 'Apple सह सुरू ठेवा' },
      { provider: 'google', label: 'Google सह सुरू ठेवा' },
      { provider: 'email', label: 'ईमेल सह सुरू ठेवा' },
    ],
    guestLabel: 'पाहुणे म्हणून सुरू ठेवा',
  },
  gu: {
    title: 'પુનઃ સ્વાગત',
    hindiTitle: 'પુનઃ સ્વાગત',
    description: 'તમારો દીવો રાહ જોઈ રહ્યો છે. યાત્રા ચાલુ રાખવા સાઇન ઇન કરો.',
    providers: [
      { provider: 'apple', label: 'Apple સાથે ચાલુ રાખો' },
      { provider: 'google', label: 'Google સાથે ચાલુ રાખો' },
      { provider: 'email', label: 'ઈમેઈલ સાથે ચાલુ રાખો' },
    ],
    guestLabel: 'મહેમાન તરીકે ચાલુ રાખો',
  },
  ta: {
    title: 'மீண்டும் வரவேற்பு',
    hindiTitle: 'மீண்டும் வரவேற்பு',
    description: 'உங்கள் விளக்கு காத்திருக்கிறது. பயணத்தைத் தொடர உள்நுழையுங்கள்.',
    providers: [
      { provider: 'apple', label: 'Apple உடன் தொடரவும்' },
      { provider: 'google', label: 'Google உடன் தொடரவும்' },
      { provider: 'email', label: 'மின்னஞ்சலுடன் தொடரவும்' },
    ],
    guestLabel: 'விருந்தினராக தொடரவும்',
  },
  te: {
    title: 'మళ్లీ స్వాగతం',
    hindiTitle: 'మళ్లీ స్వాగతం',
    description: 'మీ దీపం వేచి ఉంది. ప్రయాణం కొనసాగించడానికి సైన్ ఇన్ చేయండి.',
    providers: [
      { provider: 'apple', label: 'Apple తో కొనసాగించండి' },
      { provider: 'google', label: 'Google తో కొనసాగించండి' },
      { provider: 'email', label: 'ఈమెయిల్‌తో కొనసాగించండి' },
    ],
    guestLabel: 'అతిథిగా కొనసాగించండి',
  },
};

export function getAuthContent(lang: AppLanguage): AuthContent {
  return auth[lang] ?? auth.en;
}
