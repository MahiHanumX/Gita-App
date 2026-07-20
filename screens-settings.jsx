// Settings deep-dive: destination screens for every row in SettingsScreen
// All screens use light/parchment theme to match the Settings entry point

// ─── Shared light-mode chrome ─────────────────────────────
function SettingsPageFrame({ title, hi, right, children, footer }) {
  return (
    <div style={{ width: 375, height: 812, position: 'relative', overflow: 'hidden', background: PALETTE.cream, color: PALETTE.indigoDeep }}>
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #faf5eb 0%, #f5ecd8 100%)' }} />
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* header */}
        <div style={{ padding: '58px 20px 8px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <button style={{
            width: 36, height: 36, borderRadius: '50%',
            background: '#fff', border: 'none',
            boxShadow: '0 2px 8px rgba(26,27,58,0.06)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24">
              <path d="M15 5 L 8 12 L 15 19" stroke={PALETTE.indigoDeep} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 20, fontWeight: 600,
            }}>{title}</div>
            {hi && <div style={{
              fontFamily: '"Noto Sans Devanagari", serif', fontSize: 13,
              color: 'rgba(26,27,58,0.55)',
            }}>{hi}</div>}
          </div>
          {right}
        </div>
        <div style={{ flex: 1, overflow: 'hidden', padding: '10px 20px 0' }}>
          {children}
        </div>
        {footer}
      </div>
    </div>
  );
}

// Radio row (used in pickers) ─────────────────────────────
function RadioRow({ title, subtitle, hi, right, active, divider = true }) {
  return (
    <div style={{
      padding: '14px 16px',
      display: 'flex', alignItems: 'center', gap: 14,
      borderBottom: divider ? '1px solid rgba(26,27,58,0.05)' : 'none',
      background: active ? 'rgba(232,168,56,0.08)' : 'transparent',
    }}>
      <div style={{
        width: 22, height: 22, borderRadius: '50%',
        border: active ? 'none' : '2px solid rgba(26,27,58,0.2)',
        background: active ? 'linear-gradient(135deg, #f4c257, #c67a1a)' : 'transparent',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0,
      }}>
        {active && (
          <svg width="10" height="10" viewBox="0 0 24 24">
            <path d="M5 12 l 5 5 l 9 -11" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{
            fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 500,
            color: PALETTE.indigoDeep,
          }}>{title}</span>
          {hi && <span style={{
            fontFamily: '"Noto Sans Devanagari", serif', fontSize: 12,
            color: 'rgba(26,27,58,0.5)',
          }}>{hi}</span>}
        </div>
        {subtitle && <div style={{
          marginTop: 2,
          fontFamily: 'Poppins, sans-serif', fontSize: 12,
          color: 'rgba(26,27,58,0.55)', lineHeight: 1.4,
        }}>{subtitle}</div>}
      </div>
      {right}
    </div>
  );
}

// Group card (identical to SettingsGroup but exported here) ─
function GroupCard({ title, children, footnote }) {
  return (
    <div style={{ marginBottom: 22 }}>
      {title && <div style={{
        fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
        color: 'rgba(26,27,58,0.5)', letterSpacing: 1.5, textTransform: 'uppercase',
        marginBottom: 8, padding: '0 4px',
      }}>{title}</div>}
      <div style={{
        background: '#fff', borderRadius: 18,
        boxShadow: '0 2px 8px rgba(26,27,58,0.04)',
        overflow: 'hidden',
      }}>{children}</div>
      {footnote && <div style={{
        marginTop: 8, padding: '0 6px',
        fontFamily: 'Poppins, sans-serif', fontSize: 11, lineHeight: 1.5,
        color: 'rgba(26,27,58,0.55)',
      }}>{footnote}</div>}
    </div>
  );
}

// ─── 1. Session length picker ─────────────────────────────
function SessionLengthScreen() {
  const options = [
    { title: 'Brief', hi: 'क्षणिक', sub: 'Just 5 minutes — a lit match', min: 5 },
    { title: 'Gentle', hi: 'सौम्य', sub: 'A comfortable start', min: 7 },
    { title: 'Steady', hi: 'स्थिर', sub: 'The full daily reading + task', min: 10, active: true },
    { title: 'Deep', hi: 'गहन', sub: 'Includes extra reflection time', min: 15 },
    { title: 'Complete', hi: 'सम्पूर्ण', sub: 'Full study + audio recitation', min: 25 },
  ];
  return (
    <SettingsPageFrame title="Session length" hi="अभ्यास अवधि">
      <div style={{
        margin: '4px 4px 20px',
        padding: '16px 18px', borderRadius: 16,
        background: 'linear-gradient(160deg, rgba(232,168,56,0.15), rgba(232,168,56,0.03))',
        border: '1px solid rgba(232,168,56,0.28)',
        display: 'flex', alignItems: 'center', gap: 14,
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: 'linear-gradient(180deg, #ffe08a, #e8a838)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(232,168,56,0.35)',
          flexShrink: 0,
        }}>
          <DiyaIcon size={28} color={PALETTE.indigoDeep} flameColor="#c67a1a" />
        </div>
        <div>
          <div style={{
            fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
            color: PALETTE.saffronDeep, letterSpacing: 1.5, textTransform: 'uppercase',
          }}>Right now</div>
          <div style={{
            marginTop: 2,
            fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 600,
          }}>Steady · 10 minutes</div>
          <div style={{
            fontFamily: 'Poppins, sans-serif', fontSize: 12,
            color: 'rgba(26,27,58,0.6)', marginTop: 1,
          }}>You've kept this for 12 days</div>
        </div>
      </div>

      <GroupCard title="Choose a rhythm">
        {options.map((o, i) => (
          <RadioRow
            key={o.title}
            title={o.title}
            hi={o.hi}
            subtitle={o.sub}
            active={o.active}
            divider={i < options.length - 1}
            right={
              <div style={{
                padding: '4px 10px', borderRadius: 999,
                background: o.active ? 'linear-gradient(135deg, #f4c257, #c67a1a)' : 'rgba(26,27,58,0.05)',
                color: o.active ? '#fff' : 'rgba(26,27,58,0.6)',
                fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
                letterSpacing: 0.3,
              }}>{o.min} min</div>
            }
          />
        ))}
      </GroupCard>

      <GroupCard title="On busy days" footnote="If you skip your chosen length, a brief 3-minute version will offer itself instead of nothing.">
        <div style={{
          padding: '14px 16px',
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 500 }}>Allow "3-minute rescue"</div>
            <div style={{ fontFamily: '"Noto Sans Devanagari", serif', fontSize: 12, color: 'rgba(26,27,58,0.55)', marginTop: 1 }}>तीन-मिनट का बचाव</div>
          </div>
          <div style={{ width: 42, height: 24, borderRadius: 12, background: PALETTE.saffron, padding: 2 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', transform: 'translateX(18px)', boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }} />
          </div>
        </div>
      </GroupCard>
    </SettingsPageFrame>
  );
}

// ─── 2. Rest days picker ──────────────────────────────────
function RestDaysScreen() {
  const days = [
    { l: 'M', hi: 'सो', active: false },
    { l: 'T', hi: 'मं', active: false },
    { l: 'W', hi: 'बु', active: false },
    { l: 'T', hi: 'गु', active: false },
    { l: 'F', hi: 'शु', active: false },
    { l: 'S', hi: 'श', active: false },
    { l: 'S', hi: 'र', active: true },
  ];
  return (
    <SettingsPageFrame title="Rest days" hi="विश्राम दिवस">
      <div style={{ padding: '4px 4px 18px' }}>
        <div style={{
          fontFamily: '"Noto Serif", serif', fontStyle: 'italic',
          fontSize: 13.5, lineHeight: 1.55,
          color: 'rgba(26,27,58,0.7)',
        }}>
          "Rest is not the opposite of practice — it is part of it. Even Arjuna paused between arrows."
        </div>
      </div>

      <GroupCard title="Weekly pattern">
        <div style={{ padding: '18px 16px' }}>
          <div style={{ display: 'flex', gap: 8 }}>
            {days.map((d, i) => (
              <div key={i} style={{ flex: 1, textAlign: 'center' }}>
                <div style={{
                  aspectRatio: '1',
                  background: d.active ? 'linear-gradient(180deg, #f4c257, #c67a1a)' : '#fff',
                  border: d.active ? 'none' : '1.5px solid rgba(26,27,58,0.1)',
                  borderRadius: 14,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 600,
                  color: d.active ? '#fff' : 'rgba(26,27,58,0.7)',
                  boxShadow: d.active ? '0 4px 12px rgba(232,168,56,0.35)' : 'none',
                }}>{d.l}</div>
                <div style={{
                  marginTop: 6,
                  fontFamily: '"Noto Sans Devanagari", serif', fontSize: 11,
                  color: d.active ? PALETTE.saffronDeep : 'rgba(26,27,58,0.4)',
                }}>{d.hi}</div>
              </div>
            ))}
          </div>
        </div>
      </GroupCard>

      <GroupCard title="Presets">
        <RadioRow title="No rest days" subtitle="Practice every day" />
        <RadioRow title="Sunday only" hi="रविवार" subtitle="Traditional weekly pause" active />
        <RadioRow title="Weekends" subtitle="Saturday & Sunday" />
        <RadioRow title="Ekadashi days" hi="एकादशी" subtitle="Twice a month · lunar" divider={false} />
      </GroupCard>

      <GroupCard footnote="Streak is preserved through rest days — Krishna doesn't count against you for what you chose to pause.">
        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 500 }}>Rest days count for streak</div>
          </div>
          <div style={{ width: 42, height: 24, borderRadius: 12, background: PALETTE.saffron, padding: 2 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', transform: 'translateX(18px)', boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }} />
          </div>
        </div>
      </GroupCard>
    </SettingsPageFrame>
  );
}

// ─── 3. Interface language picker ─────────────────────────
function LanguagePickerScreen() {
  const langs = [
    { name: 'English', native: 'English', greet: 'Welcome, seeker', active: true, coverage: '100%' },
    { name: 'Hindi', native: 'हिन्दी', greet: 'स्वागत है, साधक', coverage: '100%' },
    { name: 'Sanskrit', native: 'संस्कृतम्', greet: 'स्वागतम्, साधक', coverage: '86%' },
    { name: 'Bengali', native: 'বাংলা', greet: 'স্বাগতম, সাধক', coverage: '78%' },
    { name: 'Marathi', native: 'मराठी', greet: 'स्वागत आहे, साधक', coverage: '72%' },
    { name: 'Tamil', native: 'தமிழ்', greet: 'வரவேற்கிறோம், சாதகா', coverage: '65%' },
    { name: 'Gujarati', native: 'ગુજરાતી', greet: 'સ્વાગત, સાધક', coverage: '58%' },
    { name: 'Telugu', native: 'తెలుగు', greet: 'స్వాగతం, సాధకా', coverage: '54%' },
    { name: 'Kannada', native: 'ಕನ್ನಡ', greet: 'ಸ್ವಾಗತ, ಸಾಧಕ', coverage: '46%' },
  ];
  return (
    <SettingsPageFrame title="Language" hi="भाषा"
      right={
        <button style={{
          width: 36, height: 36, borderRadius: '50%',
          background: '#fff', border: 'none',
          boxShadow: '0 2px 8px rgba(26,27,58,0.06)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke={PALETTE.indigoDeep} strokeWidth="1.8" />
            <path d="M16 16 l 5 5" stroke={PALETTE.indigoDeep} strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      }
    >
      <GroupCard>
        {langs.map((l, i) => (
          <div key={l.name} style={{
            padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 14,
            borderBottom: i < langs.length - 1 ? '1px solid rgba(26,27,58,0.05)' : 'none',
            background: l.active ? 'rgba(232,168,56,0.08)' : 'transparent',
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              border: l.active ? 'none' : '2px solid rgba(26,27,58,0.2)',
              background: l.active ? 'linear-gradient(135deg, #f4c257, #c67a1a)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {l.active && (
                <svg width="10" height="10" viewBox="0 0 24 24">
                  <path d="M5 12 l 5 5 l 9 -11" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600 }}>{l.name}</span>
                <span style={{
                  fontFamily: '"Noto Sans Devanagari", serif', fontSize: 13,
                  color: 'rgba(26,27,58,0.55)',
                }}>{l.native}</span>
              </div>
              <div style={{
                marginTop: 2,
                fontFamily: '"Noto Sans Devanagari", serif', fontSize: 12,
                color: 'rgba(26,27,58,0.55)',
              }}>{l.greet}</div>
            </div>
            <div style={{
              padding: '3px 8px', borderRadius: 999,
              background: l.coverage === '100%' ? 'rgba(127,180,110,0.15)' : 'rgba(26,27,58,0.06)',
              fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 600,
              color: l.coverage === '100%' ? '#4a8c3a' : 'rgba(26,27,58,0.5)',
              letterSpacing: 0.3,
            }}>{l.coverage}</div>
          </div>
        ))}
      </GroupCard>

      <div style={{
        marginTop: -8, padding: '0 6px',
        fontFamily: 'Poppins, sans-serif', fontSize: 11, lineHeight: 1.5,
        color: 'rgba(26,27,58,0.55)',
      }}>Partial coverage means some daily readings will fall back to English. Sanskrit verses always appear in Devanagari regardless of interface language.</div>
    </SettingsPageFrame>
  );
}

// ─── 4. Translation source picker ────────────────────────
function TranslationSourceScreen() {
  const sources = [
    { name: 'Modern · Deep', hi: 'आधुनिक', sub: 'Contemporary voice, plain English. Written for today\'s reader.', badge: 'Default', active: true },
    { name: 'Eknath Easwaran', sub: 'Warm, poetic, universal. From Blue Mountain Center of Meditation.', year: '1985' },
    { name: 'Swami Sivananda', sub: 'Direct and devotional. Rooted in the traditional Vedantic reading.', year: '1942' },
    { name: 'A.C. Bhaktivedanta Swami', sub: 'Purport-heavy. The ISKCON tradition. Extensive commentary.', year: '1968' },
    { name: 'Winthrop Sargeant', sub: 'Word-by-word Sanskrit lexicon. For serious scholarship.', year: '1979' },
  ];
  return (
    <SettingsPageFrame title="Translation" hi="अनुवाद स्रोत">
      <div style={{ padding: '0 4px 16px',
        fontFamily: '"Noto Serif", serif', fontStyle: 'italic',
        fontSize: 13.5, lineHeight: 1.55,
        color: 'rgba(26,27,58,0.7)',
      }}>
        Choose the voice that speaks to you. The Sanskrit is unchanging — the English rendering shapes how it lands.
      </div>

      <GroupCard>
        {sources.map((s, i) => (
          <div key={s.name} style={{
            padding: '16px 16px',
            display: 'flex', alignItems: 'flex-start', gap: 14,
            borderBottom: i < sources.length - 1 ? '1px solid rgba(26,27,58,0.05)' : 'none',
            background: s.active ? 'rgba(232,168,56,0.08)' : 'transparent',
          }}>
            <div style={{
              width: 22, height: 22, borderRadius: '50%', marginTop: 2,
              border: s.active ? 'none' : '2px solid rgba(26,27,58,0.2)',
              background: s.active ? 'linear-gradient(135deg, #f4c257, #c67a1a)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {s.active && (
                <svg width="10" height="10" viewBox="0 0 24 24">
                  <path d="M5 12 l 5 5 l 9 -11" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600 }}>{s.name}</span>
                {s.hi && <span style={{ fontFamily: '"Noto Sans Devanagari", serif', fontSize: 12, color: 'rgba(26,27,58,0.5)' }}>{s.hi}</span>}
                {s.badge && (
                  <span style={{
                    padding: '2px 6px', borderRadius: 4,
                    background: 'rgba(232,168,56,0.2)',
                    color: PALETTE.saffronDeep,
                    fontFamily: 'Poppins, sans-serif', fontSize: 9, fontWeight: 700,
                    letterSpacing: 0.5,
                  }}>{s.badge.toUpperCase()}</span>
                )}
                {s.year && <span style={{
                  fontFamily: 'Poppins, sans-serif', fontSize: 11,
                  color: 'rgba(26,27,58,0.4)',
                }}>· {s.year}</span>}
              </div>
              <div style={{
                marginTop: 4,
                fontFamily: 'Poppins, sans-serif', fontSize: 12, lineHeight: 1.5,
                color: 'rgba(26,27,58,0.6)',
              }}>{s.sub}</div>
            </div>
          </div>
        ))}
      </GroupCard>

      {/* preview */}
      <GroupCard title="Preview · श्लोक २.४७">
        <div style={{ padding: '16px 18px' }}>
          <div style={{
            fontFamily: '"Noto Sans Devanagari", serif', fontSize: 15, lineHeight: 1.6,
            color: PALETTE.saffronDeep, textAlign: 'center',
          }}>कर्मण्येवाधिकारस्ते मा फलेषु कदाचन।</div>
          <div style={{
            marginTop: 14,
            fontFamily: '"Noto Serif", serif', fontStyle: 'italic',
            fontSize: 14, lineHeight: 1.55, color: PALETTE.indigoDeep,
          }}>"You have the right to work only, never to the fruit of that work. Do not be motivated by results — but do not be attached to inaction either."</div>
        </div>
      </GroupCard>
    </SettingsPageFrame>
  );
}

// ─── 5. Theme picker ─────────────────────────────────────
function ThemePickerScreen() {
  const themes = [
    { name: 'Warm dark', hi: 'रात्रि', sub: 'Deep indigo with saffron warmth', active: true, colors: ['#0f102b', '#2d2b5f', '#e8a838'] },
    { name: 'Deep night', hi: 'गहरा अंधकार', sub: 'Pure black — for the dedicated pre-dawn practitioner', colors: ['#000000', '#1a1a1a', '#c67a1a'] },
    { name: 'Parchment', hi: 'पाण्डुलिपि', sub: 'Cream and ink — a physical book feel', colors: ['#faf5eb', '#f5ecd8', '#c67a1a'] },
    { name: 'Sunrise', hi: 'उषा', sub: 'Rose-gold gradients — the color of morning practice', colors: ['#fce4ce', '#f2a679', '#c67a1a'] },
    { name: 'Temple', hi: 'मन्दिर', sub: 'Deep maroon and gold — traditional', colors: ['#3a1420', '#5c1e33', '#f4c257'] },
  ];
  return (
    <SettingsPageFrame title="Theme" hi="रंग विषय">
      <div style={{ padding: '0 4px 18px',
        fontFamily: 'Poppins, sans-serif', fontSize: 12, lineHeight: 1.5,
        color: 'rgba(26,27,58,0.6)',
      }}>Follow system theme is on — the app switches to <b style={{ color: PALETTE.indigoDeep }}>Warm dark</b> at sunset, <b style={{ color: PALETTE.indigoDeep }}>Parchment</b> at sunrise.</div>

      {/* preview card */}
      <div style={{
        marginBottom: 22, height: 200, borderRadius: 22,
        background: 'linear-gradient(160deg, #0f102b 0%, #2d2b5f 100%)',
        position: 'relative', overflow: 'hidden',
        boxShadow: '0 8px 24px rgba(26,27,58,0.15)',
      }}>
        <svg width="100%" height="100%" style={{ position: 'absolute', inset: 0, opacity: 0.08 }} aria-hidden>
          <defs>
            <pattern id="mandala-preview" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <g fill="none" stroke="#f4c257" strokeWidth="0.6">
                <circle cx="60" cy="60" r="45" />
                <circle cx="60" cy="60" r="28" />
              </g>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#mandala-preview)" />
        </svg>
        <div style={{
          position: 'absolute', top: 20, left: 20, right: 20, color: PALETTE.cream,
        }}>
          <div style={{ fontFamily: '"Noto Sans Devanagari", serif', fontSize: 18, fontWeight: 500 }}>दिन १३</div>
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: 22, fontWeight: 500, marginTop: 4 }}>The Steadfast Mind</div>
          <div style={{ marginTop: 12,
            padding: '8px 12px', borderRadius: 10,
            background: 'rgba(232,168,56,0.2)', border: '1px solid rgba(232,168,56,0.35)',
            display: 'inline-flex', alignItems: 'center', gap: 8,
          }}>
            <DiyaIcon size={16} color={PALETTE.saffronBright} flameColor="#fff4d6" />
            <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600, color: PALETTE.saffronBright }}>Live preview</span>
          </div>
        </div>
      </div>

      <GroupCard>
        {themes.map((t, i) => (
          <div key={t.name} style={{
            padding: '14px 16px',
            display: 'flex', alignItems: 'center', gap: 14,
            borderBottom: i < themes.length - 1 ? '1px solid rgba(26,27,58,0.05)' : 'none',
            background: t.active ? 'rgba(232,168,56,0.08)' : 'transparent',
          }}>
            <div style={{ display: 'flex', gap: -6, flexShrink: 0 }}>
              {t.colors.map((c, j) => (
                <div key={j} style={{
                  width: 24, height: 24, borderRadius: '50%',
                  background: c,
                  border: '2px solid #fff',
                  marginLeft: j === 0 ? 0 : -8,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  zIndex: 3 - j,
                }} />
              ))}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 500 }}>{t.name}</span>
                <span style={{ fontFamily: '"Noto Sans Devanagari", serif', fontSize: 12, color: 'rgba(26,27,58,0.5)' }}>{t.hi}</span>
              </div>
              <div style={{
                marginTop: 2,
                fontFamily: 'Poppins, sans-serif', fontSize: 11.5, lineHeight: 1.4,
                color: 'rgba(26,27,58,0.55)',
              }}>{t.sub}</div>
            </div>
            <div style={{
              width: 22, height: 22, borderRadius: '50%',
              border: t.active ? 'none' : '2px solid rgba(26,27,58,0.2)',
              background: t.active ? 'linear-gradient(135deg, #f4c257, #c67a1a)' : 'transparent',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              flexShrink: 0,
            }}>
              {t.active && (
                <svg width="10" height="10" viewBox="0 0 24 24">
                  <path d="M5 12 l 5 5 l 9 -11" stroke="#fff" strokeWidth="3.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </div>
          </div>
        ))}
      </GroupCard>

      <GroupCard>
        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 500 }}>Follow system theme</div>
            <div style={{ marginTop: 2, fontFamily: 'Poppins, sans-serif', fontSize: 11.5, color: 'rgba(26,27,58,0.55)' }}>Dark after sunset, light at sunrise</div>
          </div>
          <div style={{ width: 42, height: 24, borderRadius: 12, background: PALETTE.saffron, padding: 2 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', transform: 'translateX(18px)', boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }} />
          </div>
        </div>
      </GroupCard>
    </SettingsPageFrame>
  );
}

// ─── 6. Text size picker ─────────────────────────────────
function TextSizeScreen() {
  const size = 2; // 0..4 → Small, Comfortable, Regular, Large, Very Large
  const labels = ['Small', 'Comfy', 'Regular', 'Large', 'X-Large'];
  return (
    <SettingsPageFrame title="Text size" hi="अक्षर आकार">
      {/* live preview card */}
      <div style={{
        marginBottom: 22, padding: '22px 22px',
        background: '#fff', borderRadius: 20,
        boxShadow: '0 2px 8px rgba(26,27,58,0.04)',
      }}>
        <div style={{
          fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 600,
          color: PALETTE.saffronDeep, letterSpacing: 1.5, textTransform: 'uppercase',
        }}>Live preview · श्लोक २.४७</div>

        <div style={{
          marginTop: 14,
          fontFamily: '"Noto Sans Devanagari", serif',
          fontSize: 20 + size * 2, lineHeight: 1.55,
          color: PALETTE.saffronDeep, textAlign: 'center',
        }}>कर्मण्येवाधिकारस्ते</div>

        <div style={{
          marginTop: 10, textAlign: 'center',
          fontFamily: '"Playfair Display", serif', fontStyle: 'italic',
          fontSize: 13 + size * 1.5, lineHeight: 1.6,
          color: 'rgba(26,27,58,0.6)',
        }}>karmaṇy-evādhikāras te</div>

        <div style={{
          marginTop: 14,
          fontFamily: '"Noto Serif", serif',
          fontSize: 13 + size * 2, lineHeight: 1.6,
          color: PALETTE.indigoDeep,
        }}>You have the right to work only — never to the fruit of that work.</div>
      </div>

      {/* slider */}
      <GroupCard title="Adjust">
        <div style={{ padding: '20px 20px 16px' }}>
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <span style={{
              fontFamily: '"Noto Sans Devanagari", serif', fontSize: 14,
              color: 'rgba(26,27,58,0.55)',
            }}>अ</span>
            <div style={{
              flex: 1, height: 4, borderRadius: 2,
              background: 'rgba(26,27,58,0.1)',
              position: 'relative',
            }}>
              {/* track fill */}
              <div style={{
                position: 'absolute', top: 0, left: 0, bottom: 0,
                width: `${(size / 4) * 100}%`,
                background: 'linear-gradient(90deg, #f4c257, #e8a838)',
                borderRadius: 2,
              }} />
              {/* tick marks */}
              {[0, 1, 2, 3, 4].map((i) => (
                <div key={i} style={{
                  position: 'absolute', top: '50%', left: `${(i / 4) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  width: 3, height: 12, borderRadius: 2,
                  background: i <= size ? PALETTE.saffronDeep : 'rgba(26,27,58,0.2)',
                }} />
              ))}
              {/* thumb */}
              <div style={{
                position: 'absolute', top: '50%', left: `${(size / 4) * 100}%`,
                transform: 'translate(-50%, -50%)',
                width: 26, height: 26, borderRadius: '50%',
                background: 'linear-gradient(180deg, #ffe08a, #c67a1a)',
                border: '3px solid #fff',
                boxShadow: '0 4px 12px rgba(232,168,56,0.45)',
              }} />
            </div>
            <span style={{
              fontFamily: '"Noto Sans Devanagari", serif', fontSize: 22,
              color: PALETTE.saffronDeep,
            }}>अ</span>
          </div>
          <div style={{ marginTop: 22, display: 'flex', justifyContent: 'space-between' }}>
            {labels.map((l, i) => (
              <div key={l} style={{
                fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: i === size ? 600 : 400,
                color: i === size ? PALETTE.saffronDeep : 'rgba(26,27,58,0.45)',
              }}>{l}</div>
            ))}
          </div>
        </div>
      </GroupCard>

      <GroupCard title="Related">
        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14, borderBottom: '1px solid rgba(26,27,58,0.05)' }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 500 }}>Bold Devanagari</div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11.5, color: 'rgba(26,27,58,0.55)', marginTop: 1 }}>Heavier weight for Sanskrit verses</div>
          </div>
          <div style={{ width: 42, height: 24, borderRadius: 12, background: 'rgba(26,27,58,0.15)', padding: 2 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }} />
          </div>
        </div>
        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 500 }}>High contrast</div>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11.5, color: 'rgba(26,27,58,0.55)', marginTop: 1 }}>Deeper black on cream</div>
          </div>
          <div style={{ width: 42, height: 24, borderRadius: 12, background: 'rgba(26,27,58,0.15)', padding: 2 }}>
            <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }} />
          </div>
        </div>
      </GroupCard>
    </SettingsPageFrame>
  );
}

// ─── 7. Notifications hub ─────────────────────────────────
function NotificationsHubScreen() {
  return (
    <SettingsPageFrame title="Notifications" hi="सूचनाएँ">
      <GroupCard title="Practice · अभ्यास">
        <NotifRow title="Daily reminder" sub="7:00 AM · Weekdays + Saturday" on chevron />
        <NotifRow title="Gentle pre-bell" sub="3 min before your reminder" on />
        <NotifRow title="Streak in danger" sub="If you haven't practiced by 9 PM" on divider={false} />
      </GroupCard>

      <GroupCard title="Milestones · मील का पत्थर">
        <NotifRow title="Day 7 / 21 / 40" sub="When you complete a chapter" on />
        <NotifRow title="Weekly summary" sub="Sundays · your week in numbers" on divider={false} />
      </GroupCard>

      <GroupCard title="Sangha · सत्संग">
        <NotifRow title="Replies to your reflections" on />
        <NotifRow title="Pranams received" sub="When someone honors your post" />
        <NotifRow title="Study circle activity" sub="Ravi, Meera, Kabir + 3 others" on />
        <NotifRow title="Weekly satsang" sub="Saturday 8 AM meetup reminder" on divider={false} />
      </GroupCard>

      <GroupCard footnote="You can silence everything for a day, week, or during a retreat.">
        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flex: 1 }}>
            <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 500 }}>Silent retreat mode</div>
            <div style={{ fontFamily: '"Noto Sans Devanagari", serif', fontSize: 11.5, color: 'rgba(26,27,58,0.55)', marginTop: 1 }}>मौन साधना</div>
          </div>
          <button style={{
            padding: '6px 12px', borderRadius: 999,
            background: 'rgba(232,168,56,0.15)', border: '1px solid rgba(232,168,56,0.35)',
            color: PALETTE.saffronDeep,
            fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
          }}>Turn on</button>
        </div>
      </GroupCard>
    </SettingsPageFrame>
  );
}

function NotifRow({ title, sub, on, chevron, divider = true }) {
  return (
    <div style={{
      padding: '13px 16px',
      display: 'flex', alignItems: 'center', gap: 14,
      borderBottom: divider ? '1px solid rgba(26,27,58,0.05)' : 'none',
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 500 }}>{title}</div>
        {sub && <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11.5, color: 'rgba(26,27,58,0.55)', marginTop: 1 }}>{sub}</div>}
      </div>
      {chevron ? (
        <svg width="7" height="12" viewBox="0 0 8 14">
          <path d="M1 1 L 7 7 L 1 13" stroke="rgba(26,27,58,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ) : (
        <div style={{ width: 42, height: 24, borderRadius: 12, background: on ? PALETTE.saffron : 'rgba(26,27,58,0.15)', padding: 2 }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', transform: `translateX(${on ? 18 : 0}px)`, boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }} />
        </div>
      )}
    </div>
  );
}

// ─── 8. Account ──────────────────────────────────────────
function AccountScreen() {
  return (
    <SettingsPageFrame title="Account" hi="खाता">
      {/* header card */}
      <div style={{
        marginBottom: 22,
        padding: '20px 20px', borderRadius: 20,
        background: '#fff', boxShadow: '0 2px 8px rgba(26,27,58,0.04)',
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <div style={{
          width: 56, height: 56, borderRadius: '50%',
          background: 'linear-gradient(160deg, #f4c257 0%, #c67a1a 100%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: '"Playfair Display", serif', fontSize: 24, fontWeight: 600,
          color: '#fff',
          boxShadow: '0 4px 12px rgba(232,168,56,0.35)',
        }}>अ</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 600 }}>Ananya Sharma</div>
          <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, color: 'rgba(26,27,58,0.55)', marginTop: 1 }}>ananya.s@icloud.com</div>
          <div style={{
            marginTop: 6, display: 'inline-flex', alignItems: 'center', gap: 5,
            padding: '3px 8px', borderRadius: 999,
            background: 'rgba(232,168,56,0.15)',
          }}>
            <DiyaIcon size={12} color={PALETTE.saffronDeep} flameColor="#c67a1a" />
            <span style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 10.5, fontWeight: 700,
              color: PALETTE.saffronDeep, letterSpacing: 0.3,
            }}>MALA · $5/MONTH</span>
          </div>
        </div>
      </div>

      <GroupCard title="Profile">
        <SimpleRow label="Name" value="Ananya Sharma" chevron />
        <SimpleRow label="Email" value="ananya.s@icloud.com" chevron />
        <SimpleRow label="Journey started" value="June 25, 2026" />
        <SimpleRow label="Sanskrit name" hi="साधक नाम" value="साधिका" chevron divider={false} />
      </GroupCard>

      <GroupCard title="Support the journey · दान">
        <SimpleRow label="Your contribution" value="Mala · $5 / month" chevron />
        <SimpleRow label="Payment method" value="•••• 4231" chevron />
        <SimpleRow label="Receipts" chevron divider={false} />
      </GroupCard>

      <GroupCard title="Security">
        <SimpleRow label="Face ID lock" toggle on />
        <SimpleRow label="Change password" chevron />
        <SimpleRow label="Connected accounts" value="Apple, Google" chevron divider={false} />
      </GroupCard>

      <GroupCard>
        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flex: 1,
            fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 500,
            color: PALETTE.rose,
          }}>Sign out · लौटें</div>
          <svg width="7" height="12" viewBox="0 0 8 14">
            <path d="M1 1 L 7 7 L 1 13" stroke={PALETTE.rose} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </GroupCard>
    </SettingsPageFrame>
  );
}

function SimpleRow({ label, hi, value, chevron, toggle, on, divider = true }) {
  return (
    <div style={{
      padding: '14px 16px',
      display: 'flex', alignItems: 'center', gap: 14,
      borderBottom: divider ? '1px solid rgba(26,27,58,0.05)' : 'none',
    }}>
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
          <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 500 }}>{label}</span>
          {hi && <span style={{ fontFamily: '"Noto Sans Devanagari", serif', fontSize: 12, color: 'rgba(26,27,58,0.5)' }}>{hi}</span>}
        </div>
      </div>
      {value && (
        <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, color: 'rgba(26,27,58,0.55)' }}>{value}</div>
      )}
      {toggle && (
        <div style={{ width: 42, height: 24, borderRadius: 12, background: on ? PALETTE.saffron : 'rgba(26,27,58,0.15)', padding: 2 }}>
          <div style={{ width: 20, height: 20, borderRadius: '50%', background: '#fff', transform: `translateX(${on ? 18 : 0}px)`, boxShadow: '0 2px 4px rgba(0,0,0,0.15)' }} />
        </div>
      )}
      {chevron && (
        <svg width="7" height="12" viewBox="0 0 8 14">
          <path d="M1 1 L 7 7 L 1 13" stroke="rgba(26,27,58,0.35)" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </div>
  );
}

// ─── 9. Data & privacy ────────────────────────────────────
function DataPrivacyScreen() {
  return (
    <SettingsPageFrame title="Data & Privacy" hi="डेटा और गोपनीयता">
      {/* storage bar */}
      <div style={{
        marginBottom: 22,
        padding: '18px 20px', borderRadius: 20,
        background: '#fff', boxShadow: '0 2px 8px rgba(26,27,58,0.04)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
          <div style={{
            fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
            color: PALETTE.saffronDeep, letterSpacing: 1.5, textTransform: 'uppercase',
          }}>On your phone</div>
          <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, color: 'rgba(26,27,58,0.55)' }}>
            <span style={{ color: PALETTE.indigoDeep, fontWeight: 600 }}>247 MB</span> of 500 MB
          </div>
        </div>
        <div style={{
          marginTop: 12, height: 8, borderRadius: 4,
          background: 'rgba(26,27,58,0.06)', overflow: 'hidden',
          display: 'flex',
        }}>
          <div style={{ width: '48%', background: 'linear-gradient(90deg, #8a5eb8, #6a4a9c)' }} />
          <div style={{ width: '20%', background: 'linear-gradient(90deg, #e8a838, #c67a1a)' }} />
          <div style={{ width: '12%', background: 'linear-gradient(90deg, #4fb59f, #2d5f5a)' }} />
          <div style={{ width: '5%', background: 'rgba(26,27,58,0.3)' }} />
        </div>
        <div style={{ marginTop: 12, display: 'flex', flexWrap: 'wrap', gap: 12 }}>
          {[
            { c: '#8a5eb8', l: 'Meditation audio', v: '118 MB' },
            { c: '#e8a838', l: 'Mantra recordings', v: '48 MB' },
            { c: '#4fb59f', l: 'Yoga Nidra', v: '30 MB' },
            { c: 'rgba(26,27,58,0.3)', l: 'Your reflections', v: '12 MB' },
          ].map((r) => (
            <div key={r.l} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 8, height: 8, borderRadius: 2, background: r.c }} />
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: 'rgba(26,27,58,0.7)' }}>{r.l}</span>
              <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: 'rgba(26,27,58,0.45)' }}>{r.v}</span>
            </div>
          ))}
        </div>
      </div>

      <GroupCard title="Offline · अपांतर">
        <SimpleRow label="Auto-download today's practice" toggle on />
        <SimpleRow label="Download over Wi-Fi only" toggle on />
        <SimpleRow label="Manage downloaded audio" value="8 files" chevron divider={false} />
      </GroupCard>

      <GroupCard title="Your data">
        <SimpleRow label="Download my reflections" value=".pdf · 47 entries" chevron />
        <SimpleRow label="Export practice history" value=".csv" chevron />
        <SimpleRow label="Share anonymously with sangha" toggle on divider={false} />
      </GroupCard>

      <GroupCard title="Privacy">
        <SimpleRow label="Privacy policy" chevron />
        <SimpleRow label="Analytics" value="Off" chevron divider={false} />
      </GroupCard>

      <GroupCard>
        <div style={{ padding: '14px 16px', display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{ flex: 1,
            fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 500,
            color: PALETTE.rose,
          }}>Delete my account & all data</div>
          <svg width="7" height="12" viewBox="0 0 8 14">
            <path d="M1 1 L 7 7 L 1 13" stroke={PALETTE.rose} strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </GroupCard>
    </SettingsPageFrame>
  );
}

// ─── 10. About ────────────────────────────────────────────
function AboutScreen() {
  return (
    <SettingsPageFrame title="About" hi="परिचय">
      {/* app card */}
      <div style={{
        marginBottom: 22,
        padding: '28px 20px', borderRadius: 22,
        background: 'linear-gradient(160deg, #fff 0%, #f5ecd8 100%)',
        boxShadow: '0 2px 8px rgba(26,27,58,0.04)',
        textAlign: 'center',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: 72, height: 72, borderRadius: 18,
            background: 'linear-gradient(180deg, #ffe08a, #c67a1a)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 8px 20px rgba(232,168,56,0.35), inset 0 -4px 0 rgba(140,80,15,0.4)',
          }}>
            <DiyaIcon size={40} color={PALETTE.indigoDeep} flameColor="#c67a1a" />
          </div>
        </div>
        <div style={{
          marginTop: 16,
          fontFamily: '"Playfair Display", serif', fontSize: 26, fontWeight: 500,
        }}>Deep</div>
        <div style={{
          fontFamily: '"Noto Sans Devanagari", serif', fontSize: 15,
          color: PALETTE.saffronDeep, marginTop: 2,
        }}>दीप</div>
        <div style={{
          marginTop: 8,
          fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 500,
          color: 'rgba(26,27,58,0.5)', letterSpacing: 0.5,
        }}>Version 2.4.1 · Built with reverence</div>
      </div>

      <GroupCard title="Credits · कृतज्ञता">
        <SimpleRow label="Translations by" value="Eknath Easwaran" chevron />
        <SimpleRow label="Sanskrit recitation" value="Pandit R. Iyer" chevron />
        <SimpleRow label="Guided meditations" value="Vidya R. + 3 others" chevron />
        <SimpleRow label="Illustrations & mandalas" value="Meena K." chevron divider={false} />
      </GroupCard>

      <GroupCard title="Community">
        <SimpleRow label="Rate on the App Store" chevron />
        <SimpleRow label="Share Deep with a friend" chevron />
        <SimpleRow label="Community guidelines" chevron divider={false} />
      </GroupCard>

      <GroupCard title="Legal & help">
        <SimpleRow label="Contact us" value="hello@deep.app" chevron />
        <SimpleRow label="Terms of service" chevron />
        <SimpleRow label="Open source licenses" chevron divider={false} />
      </GroupCard>

      <div style={{
        padding: '18px 8px 30px', textAlign: 'center',
        fontFamily: '"Noto Serif", serif', fontStyle: 'italic',
        fontSize: 12, lineHeight: 1.6,
        color: 'rgba(26,27,58,0.55)',
      }}>
        "यदा यदा हि धर्मस्य…"<br />
        Whenever there is a decline in dharma — the lamp is lit again.
      </div>
    </SettingsPageFrame>
  );
}

// ─── 11. Sign-out confirmation ────────────────────────────
function SignOutConfirmScreen() {
  return (
    <div style={{ width: 375, height: 812, position: 'relative', overflow: 'hidden', background: 'rgba(15,16,43,0.4)' }}>
      {/* faded background settings behind */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, #faf5eb 0%, #f5ecd8 100%)', opacity: 0.5 }} />
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(15,16,43,0.35)', backdropFilter: 'blur(4px)' }} />

      {/* modal card */}
      <div style={{
        position: 'absolute', left: 24, right: 24, top: '50%', transform: 'translateY(-50%)',
        background: '#faf5eb', borderRadius: 24,
        padding: '32px 26px 24px',
        boxShadow: '0 24px 60px rgba(15,16,43,0.35)',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: 68, height: 68, borderRadius: '50%',
            background: 'linear-gradient(180deg, #3d3f65, #2d2b5f)',
            border: '2px solid rgba(245,236,216,0.5)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <DiyaIcon size={38} lit={false} color="rgba(245,236,216,0.7)" flameColor="#c67a1a" />
          </div>
        </div>

        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <div style={{
            fontFamily: '"Playfair Display", serif', fontSize: 22, fontWeight: 500,
            color: PALETTE.indigoDeep, lineHeight: 1.2,
          }}>Sign out for now?</div>
          <div style={{
            marginTop: 4,
            fontFamily: '"Noto Sans Devanagari", serif', fontSize: 14,
            color: 'rgba(26,27,58,0.55)',
          }}>अभी लौटें?</div>
        </div>

        <div style={{
          marginTop: 16,
          fontFamily: '"Noto Serif", serif', fontStyle: 'italic',
          fontSize: 14, lineHeight: 1.55,
          color: 'rgba(26,27,58,0.7)', textAlign: 'center',
        }}>
          Your Day 13 progress, streak, and reflections all stay safe. The lamp will be waiting when you return.
        </div>

        <div style={{
          marginTop: 20, padding: '12px 16px',
          background: 'rgba(232,168,56,0.12)',
          border: '1px solid rgba(232,168,56,0.28)',
          borderRadius: 14,
          display: 'flex', gap: 12, alignItems: 'center',
        }}>
          <FlameIcon size={20} color={PALETTE.saffronDeep} />
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
              color: PALETTE.saffronDeep,
            }}>12-day streak paused, not lost</div>
            <div style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 11,
              color: 'rgba(26,27,58,0.6)', marginTop: 1,
            }}>Return within 2 days to keep it alive</div>
          </div>
        </div>

        <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button style={{
            padding: '15px', borderRadius: 14, border: 'none',
            background: PALETTE.indigoDeep, color: PALETTE.cream,
            fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 600,
          }}>Sign out</button>
          <button style={{
            padding: '13px', borderRadius: 14, border: 'none',
            background: 'transparent', color: PALETTE.indigoDeep,
            fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 500,
          }}>Stay signed in</button>
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  SessionLengthScreen, RestDaysScreen,
  LanguagePickerScreen, TranslationSourceScreen,
  ThemePickerScreen, TextSizeScreen,
  NotificationsHubScreen, AccountScreen, DataPrivacyScreen, AboutScreen,
  SignOutConfirmScreen,
});
