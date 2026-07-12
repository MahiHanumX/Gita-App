const fs = require('fs');
const path = require('path');
const localesDir = path.join(__dirname, '../src/i18n/locales');
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

const defaults = {
  en: { chapterPrefix: 'Chapter', done: 'done', keyVerse: 'Key' },
  hi: { chapterPrefix: 'अध्याय', done: 'पूर्ण', keyVerse: 'प्रमुख' },
  mr: { chapterPrefix: 'अध्याय', done: 'पूर्ण', keyVerse: 'मुख्य' },
  gu: { chapterPrefix: 'અધ્યાય', done: 'પૂર્ણ', keyVerse: 'મુખ્ય' },
  ta: { chapterPrefix: 'அத்தியாயம்', done: 'முடிந்தது', keyVerse: 'முக்கிய' },
  te: { chapterPrefix: 'అధ్యాయం', done: 'పూర్తయింది', keyVerse: 'ముఖ్యమైన' }
};

files.forEach(file => {
  const lang = file.replace('.ts', '');
  const filePath = path.join(localesDir, file);
  let content = fs.readFileSync(filePath, 'utf8');
  
  const strings = defaults[lang] || defaults['en'];
  
  const versesRegex = /(verses:\s*'.*?',)/;
  if (content.match(versesRegex) && !content.includes('chapterPrefix:')) {
    content = content.replace(versesRegex, `$1
    chapterPrefix: '${strings.chapterPrefix}',
    done: '${strings.done}',
    keyVerse: '${strings.keyVerse}',`);
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated ' + file);
  } else {
    console.log('Skipped ' + file);
  }
});
