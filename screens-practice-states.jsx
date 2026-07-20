// Practice deep-dive: session detail (pre-play), pause overlay, complete, history, search

// ─── Session detail (pre-play, "Breath of the Warrior") ─────
function SessionDetailScreen() {
  const chapters = [
    { time: '0:00', label: 'Opening invocation', hi: 'आवाहन' },
    { time: '1:30', label: 'Setting the intention', hi: 'संकल्प' },
    { time: '3:00', label: 'Warrior breath — 4 rounds', hi: 'वीर श्वास' },
    { time: '6:30', label: 'Extended hold', hi: 'कुंभक' },
    { time: '8:00', label: 'Closing · Om', hi: 'ॐ' },
  ];

  return (
    <div style={{ width: 375, height: 812, position: 'relative', overflow: 'hidden', background: PALETTE.indigoDeep, color: PALETTE.cream }}>
      <MandalaBG opacity={0.04} from="#0f102b" via="#1a3d3a" to="#2d5f5a" />
      {/* hero backdrop image area */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 380,
        background: 'linear-gradient(180deg, rgba(232,168,56,0.15) 0%, rgba(95,200,180,0.15) 40%, transparent 100%)',
      }} />
      <div style={{
        position: 'absolute', top: 60, left: '50%', transform: 'translateX(-50%)',
        width: 420, height: 420, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,168,56,0.28) 0%, transparent 60%)',
      }} />

      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* header */}
        <div style={{ padding: '58px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(15,16,43,0.5)', backdropFilter: 'blur(10px)',
            border: '1px solid rgba(245,236,216,0.15)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24">
              <path d="M15 5 L 8 12 L 15 19" stroke={PALETTE.cream} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div style={{ display: 'flex', gap: 8 }}>
            <button style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(15,16,43,0.5)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(245,236,216,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                <path d="M12 4 C 8 4, 6 7, 6 10 c 0 4 6 8 6 8 s 6 -4 6 -8 c 0 -3 -2 -6 -6 -6 z" stroke={PALETTE.cream} strokeWidth="1.8" />
              </svg>
            </button>
            <button style={{
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(15,16,43,0.5)', backdropFilter: 'blur(10px)',
              border: '1px solid rgba(245,236,216,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M4 12 v 8 h 16 v -8 M 12 4 v 12 M 8 8 l 4 -4 l 4 4" stroke={PALETTE.cream} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* central play badge */}
        <div style={{ padding: '40px 24px 0', display: 'flex', justifyContent: 'center' }}>
          <div style={{
            width: 130, height: 130, borderRadius: '50%',
            background: 'linear-gradient(180deg, #ffe08a, #e8a838)',
            border: '3px solid rgba(255,244,214,0.55)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 20px 44px rgba(232,168,56,0.4), inset 0 -6px 0 rgba(140,80,15,0.4)',
            position: 'relative',
          }}>
            <div className="pulse-ring" style={{
              position: 'absolute', inset: -18, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(244,194,87,0.5) 0%, transparent 65%)',
            }} />
            <svg width="46" height="46" viewBox="0 0 24 24">
              <path d="M8 5 v 14 l 12 -7 z" fill={PALETTE.indigoDeep} />
            </svg>
          </div>
        </div>

        {/* title */}
        <div style={{ padding: '28px 32px 0', textAlign: 'center' }}>
          <div style={{
            fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
            color: PALETTE.saffronBright, letterSpacing: 2, textTransform: 'uppercase',
          }}>Suggested for today</div>
          <div style={{
            marginTop: 8,
            fontFamily: '"Playfair Display", serif', fontSize: 28, fontWeight: 500,
            color: PALETTE.cream, lineHeight: 1.15, letterSpacing: -0.5,
          }}>Breath of the Warrior</div>
          <div style={{
            marginTop: 4,
            fontFamily: '"Noto Sans Devanagari", serif', fontSize: 16,
            color: PALETTE.textOnDarkMuted,
          }}>वीर श्वास</div>
        </div>

        {/* meta pills */}
        <div style={{
          padding: '18px 24px 0',
          display: 'flex', justifyContent: 'center', gap: 8,
        }}>
          {[
            { icon: '⏱', label: '8 min' },
            { icon: '◔', label: 'Beginner' },
            { icon: '☾', label: 'Anytime' },
          ].map((p, i) => (
            <div key={i} style={{
              padding: '6px 12px', borderRadius: 999,
              background: 'rgba(245,236,216,0.06)',
              border: '1px solid rgba(245,236,216,0.12)',
              fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 500,
              color: PALETTE.cream,
              display: 'flex', alignItems: 'center', gap: 5,
            }}>
              <span style={{ color: PALETTE.saffronBright }}>{p.icon}</span>{p.label}
            </div>
          ))}
        </div>

        {/* description */}
        <div style={{ padding: '20px 32px 0', textAlign: 'center' }}>
          <div style={{
            fontFamily: '"Noto Serif", serif', fontStyle: 'italic',
            fontSize: 14, lineHeight: 1.6,
            color: PALETTE.textOnDarkMuted,
          }}>
            "Before Arjuna raised his bow, he steadied his breath. This practice draws from Ch. 2 — the warrior's calm before decisive action."
          </div>
        </div>

        {/* chapters */}
        <div style={{ padding: '22px 24px 0', flex: 1, overflow: 'hidden' }}>
          <div style={{
            fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
            color: PALETTE.textOnDarkMuted, letterSpacing: 1.5, textTransform: 'uppercase',
            marginBottom: 10,
          }}>Chapters · अध्याय</div>
          <div style={{
            background: 'rgba(245,236,216,0.04)',
            border: '1px solid rgba(245,236,216,0.08)',
            borderRadius: 16, overflow: 'hidden',
          }}>
            {chapters.map((c, i) => (
              <div key={i} style={{
                padding: '11px 14px',
                display: 'flex', alignItems: 'center', gap: 12,
                borderBottom: i < chapters.length - 1 ? '1px solid rgba(245,236,216,0.06)' : 'none',
              }}>
                <div style={{
                  width: 44,
                  fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
                  color: PALETTE.saffronBright,
                  fontVariantNumeric: 'tabular-nums',
                }}>{c.time}</div>
                <div style={{ flex: 1 }}>
                  <div style={{
                    fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 500, color: PALETTE.cream,
                  }}>{c.label}</div>
                  <div style={{
                    fontFamily: '"Noto Sans Devanagari", serif', fontSize: 11,
                    color: PALETTE.textOnDarkMuted, marginTop: 1,
                  }}>{c.hi}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: '16px 24px 32px' }}>
          <CTA label="Begin practice" subLabel="अभ्यास प्रारंभ" />
        </div>
      </div>
    </div>
  );
}

// ─── Session pause overlay ───────────────────────────────
function SessionPauseScreen() {
  return (
    <div style={{ width: 375, height: 812, position: 'relative', overflow: 'hidden', background: PALETTE.indigoDeep, color: PALETTE.cream }}>
      {/* dimmed background of active session */}
      <MandalaBG opacity={0.03} from="#0f102b" via="#1a3d3a" to="#2d5f5a" />
      <div style={{
        position: 'absolute', top: '30%', left: '50%', transform: 'translateX(-50%)',
        width: 400, height: 400, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(95,200,180,0.18) 0%, transparent 60%)',
      }} />
      {/* dark scrim */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'rgba(15,16,43,0.55)', backdropFilter: 'blur(2px)',
      }} />

      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '58px 24px 0', display: 'flex', justifyContent: 'flex-end' }}>
          <button style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(245,236,216,0.1)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24">
              <path d="M5 5 L 19 19 M 19 5 L 5 19" stroke={PALETTE.cream} strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* paused label */}
        <div style={{ padding: '40px 32px 0', textAlign: 'center' }}>
          <div style={{
            fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
            color: PALETTE.saffronBright, letterSpacing: 3, textTransform: 'uppercase',
          }}>Paused · विराम</div>
          <div style={{
            marginTop: 12,
            fontFamily: '"Playfair Display", serif', fontSize: 28, fontWeight: 500,
            color: PALETTE.cream, lineHeight: 1.15,
          }}>Breath of the Warrior</div>
          <div style={{
            marginTop: 4,
            fontFamily: '"Noto Sans Devanagari", serif', fontSize: 14,
            color: PALETTE.textOnDarkMuted,
          }}>वीर श्वास</div>
        </div>

        {/* time card */}
        <div style={{ padding: '32px 24px 0' }}>
          <div style={{
            padding: '20px', borderRadius: 20,
            background: 'rgba(245,236,216,0.06)',
            border: '1px solid rgba(245,236,216,0.1)',
            textAlign: 'center',
          }}>
            <div style={{
              fontFamily: '"Playfair Display", serif', fontSize: 56, fontWeight: 300,
              color: PALETTE.cream, letterSpacing: -2, lineHeight: 1,
            }}>3:12</div>
            <div style={{
              marginTop: 4,
              fontFamily: 'Poppins, sans-serif', fontSize: 12,
              color: PALETTE.textOnDarkMuted,
            }}>of 8:00 · 40% complete</div>
            <div style={{
              marginTop: 16, height: 4, borderRadius: 2,
              background: 'rgba(245,236,216,0.12)',
              overflow: 'hidden',
            }}>
              <div style={{
                width: '40%', height: '100%',
                background: 'linear-gradient(90deg, #f4c257, #e8a838)',
                borderRadius: 2,
              }} />
            </div>
          </div>
        </div>

        {/* verse to sit with */}
        <div style={{ padding: '22px 24px 0' }}>
          <div style={{
            padding: '18px 20px', borderRadius: 18,
            background: 'linear-gradient(160deg, rgba(232,168,56,0.15) 0%, rgba(232,168,56,0.04) 100%)',
            border: '1px solid rgba(232,168,56,0.25)',
          }}>
            <div style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 10, fontWeight: 600,
              color: PALETTE.saffronBright, letterSpacing: 1.5, textTransform: 'uppercase',
              marginBottom: 8,
            }}>Rest in this · विश्राम</div>
            <div style={{
              fontFamily: '"Noto Serif", serif', fontStyle: 'italic',
              fontSize: 14, lineHeight: 1.55, color: PALETTE.cream,
            }}>
              "When your intellect crosses beyond the tangle of delusion — then you will attain indifference to what is heard and what is yet to be heard."
            </div>
            <div style={{
              marginTop: 8,
              fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 500,
              color: PALETTE.saffronBright,
            }}>— Bhagavad Gita 2.52</div>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* controls */}
        <div style={{ padding: '0 24px 32px' }}>
          <button style={{
            width: '100%', padding: '18px', borderRadius: 18,
            background: 'linear-gradient(135deg, #f4c257, #c67a1a)',
            border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10,
            color: PALETTE.indigoDeep,
            fontFamily: 'Poppins, sans-serif', fontSize: 16, fontWeight: 600,
            boxShadow: '0 10px 24px rgba(232,168,56,0.35), inset 0 1px 0 rgba(255,255,255,0.5)',
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path d="M8 5 v 14 l 12 -7 z" fill={PALETTE.indigoDeep} />
            </svg>
            Continue
          </button>
          <div style={{
            marginTop: 10, display: 'flex', gap: 10,
          }}>
            <button style={{
              flex: 1, padding: '13px', borderRadius: 14,
              background: 'rgba(245,236,216,0.06)', border: '1px solid rgba(245,236,216,0.12)',
              color: PALETTE.cream,
              fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 500,
            }}>Restart</button>
            <button style={{
              flex: 1, padding: '13px', borderRadius: 14,
              background: 'rgba(245,236,216,0.06)', border: '1px solid rgba(245,236,216,0.12)',
              color: PALETTE.cream,
              fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 500,
            }}>End session</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Session complete ────────────────────────────────────
function SessionCompleteScreen() {
  return (
    <div style={{ width: 375, height: 812, position: 'relative', overflow: 'hidden', background: PALETTE.indigoDeep, color: PALETTE.cream }}>
      <MandalaBG opacity={0.05} from="#0f102b" via="#1a3d3a" to="#2d5f5a" />
      <div style={{
        position: 'absolute', top: '15%', left: '50%', transform: 'translateX(-50%)',
        width: 500, height: 500, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(232,168,56,0.3) 0%, transparent 60%)',
      }} />

      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* close */}
        <div style={{ padding: '58px 24px 0', display: 'flex', justifyContent: 'flex-end' }}>
          <button style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(245,236,216,0.1)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="12" height="12" viewBox="0 0 24 24">
              <path d="M5 5 L 19 19 M 19 5 L 5 19" stroke={PALETTE.cream} strokeWidth="2.4" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* completed diya */}
        <div style={{ padding: '30px 0 0', display: 'flex', justifyContent: 'center', position: 'relative' }}>
          <div style={{
            width: 140, height: 140, borderRadius: '50%',
            background: 'linear-gradient(180deg, #ffe08a, #e8a838)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 60px rgba(232,168,56,0.55), inset 0 -6px 0 rgba(140,80,15,0.4)',
            border: '3px solid #fff4d6',
            position: 'relative',
          }}>
            <div className="pulse-ring" style={{
              position: 'absolute', inset: -22, borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(244,194,87,0.45) 0%, transparent 65%)',
            }} />
            <DiyaIcon size={72} color={PALETTE.indigoDeep} flameColor="#c67a1a" />
          </div>
        </div>

        {/* message */}
        <div style={{ padding: '32px 32px 0', textAlign: 'center' }}>
          <div style={{
            fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
            color: PALETTE.saffronBright, letterSpacing: 2, textTransform: 'uppercase',
          }}>Session complete · पूर्ण</div>
          <div style={{
            marginTop: 14,
            fontFamily: '"Playfair Display", serif', fontSize: 30, fontWeight: 400,
            color: PALETTE.cream, lineHeight: 1.15, letterSpacing: -0.5,
          }}>You returned<br /><span style={{ fontStyle: 'italic', color: PALETTE.saffronBright }}>to your breath.</span></div>
          <div style={{
            marginTop: 12,
            fontFamily: '"Noto Sans Devanagari", serif', fontSize: 14,
            color: PALETTE.textOnDarkMuted,
          }}>श्वास लौट आई</div>
        </div>

        {/* stats grid */}
        <div style={{
          padding: '32px 24px 0',
          display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10,
        }}>
          {[
            { v: '8:00', hi: 'समय', en: 'Minutes' },
            { v: '32', hi: 'श्वास', en: 'Breaths' },
            { v: '+1', hi: 'दिन', en: 'Streak day' },
          ].map((s, i) => (
            <div key={i} style={{
              padding: '14px 12px', borderRadius: 16,
              background: 'rgba(245,236,216,0.05)',
              border: '1px solid rgba(245,236,216,0.08)',
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: '"Playfair Display", serif', fontSize: 26, fontWeight: 500,
                color: PALETTE.saffronBright, lineHeight: 1,
              }}>{s.v}</div>
              <div style={{
                marginTop: 6,
                fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 500,
                color: PALETTE.cream,
              }}>{s.en}</div>
              <div style={{
                fontFamily: '"Noto Sans Devanagari", serif', fontSize: 10,
                color: PALETTE.textOnDarkMuted, marginTop: 1,
              }}>{s.hi}</div>
            </div>
          ))}
        </div>

        {/* mood check */}
        <div style={{ padding: '24px 24px 0' }}>
          <div style={{
            padding: '16px 18px', borderRadius: 16,
            background: 'rgba(245,236,216,0.04)',
            border: '1px solid rgba(245,236,216,0.08)',
          }}>
            <div style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
              color: PALETTE.cream, marginBottom: 10,
            }}>How do you feel? · अभी कैसा है?</div>
            <div style={{ display: 'flex', gap: 8, justifyContent: 'space-between' }}>
              {[
                { e: '🌫', l: 'Foggy', a: false },
                { e: '☁', l: 'Meh', a: false },
                { e: '🌤', l: 'Better', a: true },
                { e: '☀', l: 'Clear', a: false },
                { e: '✨', l: 'Radiant', a: false },
              ].map((m, i) => (
                <div key={i} style={{
                  flex: 1, padding: '10px 4px', borderRadius: 12,
                  background: m.a ? 'linear-gradient(160deg, rgba(232,168,56,0.25), rgba(232,168,56,0.08))' : 'transparent',
                  border: m.a ? '1px solid rgba(232,168,56,0.5)' : '1px solid rgba(245,236,216,0.08)',
                  textAlign: 'center',
                }}>
                  <div style={{ fontSize: 20, filter: m.a ? 'none' : 'grayscale(0.5)' }}>{m.e}</div>
                  <div style={{
                    marginTop: 2,
                    fontFamily: 'Poppins, sans-serif', fontSize: 9, fontWeight: 500,
                    color: m.a ? PALETTE.saffronBright : PALETTE.textOnDarkMuted,
                  }}>{m.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* actions */}
        <div style={{ padding: '10px 24px 32px' }}>
          <CTA label="Save & return to Practice" subLabel="अभ्यास पर लौटें" />
          <button style={{
            width: '100%', marginTop: 8, padding: '12px', border: 'none',
            background: 'transparent',
            fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 500,
            color: PALETTE.saffronBright,
          }}>Add a reflection ›</button>
        </div>
      </div>
    </div>
  );
}

// ─── Practice history / stats ────────────────────────────
function PracticeHistoryScreen() {
  // 12 weeks of practice minutes
  const weeks = Array.from({ length: 12 }).map((_, i) => {
    const s = Math.sin(i * 4.2) * 43758.5;
    const r = s - Math.floor(s);
    return Math.floor(30 + r * 90); // 30-120 min
  });
  const max = Math.max(...weeks);

  const breakdown = [
    { hi: 'ध्यान', en: 'Meditation', min: 186, pct: 42, color: '#8a5eb8' },
    { hi: 'मंत्र', en: 'Mantra', min: 124, pct: 28, color: '#e8a838' },
    { hi: 'प्राणायाम', en: 'Breathwork', min: 89, pct: 20, color: '#4fb59f' },
    { hi: 'निद्रा', en: 'Yoga Nidra', min: 42, pct: 10, color: '#4a7c99' },
  ];

  return (
    <div style={{ width: 375, height: 812, position: 'relative', overflow: 'hidden', background: PALETTE.indigoDeep, color: PALETTE.cream }}>
      <MandalaBG opacity={0.04} />
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* header */}
        <div style={{ padding: '58px 24px 0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <button style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(245,236,216,0.1)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24">
              <path d="M15 5 L 8 12 L 15 19" stroke={PALETTE.cream} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div style={{ textAlign: 'center' }}>
            <div style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 600,
            }}>Practice History</div>
            <div style={{
              fontFamily: '"Noto Sans Devanagari", serif', fontSize: 12,
              color: PALETTE.textOnDarkMuted, marginTop: 1,
            }}>अभ्यास इतिहास</div>
          </div>
          <button style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(245,236,216,0.1)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M12 4 v 12 M 7 11 l 5 5 l 5 -5 M 4 20 h 16" stroke={PALETTE.cream} strokeWidth="1.8" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* headline stat */}
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{
            padding: '20px', borderRadius: 22,
            background: 'linear-gradient(160deg, rgba(232,168,56,0.22) 0%, rgba(232,168,56,0.04) 100%)',
            border: '1px solid rgba(232,168,56,0.3)',
          }}>
            <div style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
              color: PALETTE.saffronBright, letterSpacing: 1.5, textTransform: 'uppercase',
            }}>Total time in practice</div>
            <div style={{
              display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6,
            }}>
              <div style={{
                fontFamily: '"Playfair Display", serif', fontSize: 52, fontWeight: 500,
                color: PALETTE.cream, letterSpacing: -2, lineHeight: 1,
              }}>7h 21m</div>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 4, padding: '4px 8px', borderRadius: 8,
                background: 'rgba(127,209,150,0.15)',
                color: '#7fd196',
                fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
              }}>↑ 34%</div>
            </div>
            <div style={{
              marginTop: 4,
              fontFamily: 'Poppins, sans-serif', fontSize: 12,
              color: PALETTE.textOnDarkMuted,
            }}>vs the 12 weeks before · 441 min total</div>
          </div>
        </div>

        {/* bar chart */}
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{
            display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12,
          }}>
            <div style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
              color: PALETTE.textOnDarkMuted, letterSpacing: 1.5, textTransform: 'uppercase',
            }}>Last 12 weeks</div>
            <div style={{ display: 'flex', gap: 4 }}>
              {['Week', 'Month', 'Year'].map((t, i) => (
                <div key={i} style={{
                  padding: '4px 10px', borderRadius: 6,
                  background: i === 0 ? 'rgba(232,168,56,0.2)' : 'transparent',
                  fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 500,
                  color: i === 0 ? PALETTE.saffronBright : PALETTE.textOnDarkMuted,
                }}>{t}</div>
              ))}
            </div>
          </div>
          <div style={{
            padding: '18px 12px 14px',
            background: 'rgba(245,236,216,0.04)',
            border: '1px solid rgba(245,236,216,0.08)',
            borderRadius: 16,
            display: 'flex', alignItems: 'flex-end', gap: 6, height: 140,
          }}>
            {weeks.map((v, i) => (
              <div key={i} style={{
                flex: 1, height: `${(v / max) * 100}%`,
                background: i === 11
                  ? 'linear-gradient(180deg, #ffe08a, #e8a838)'
                  : 'linear-gradient(180deg, rgba(232,168,56,0.55), rgba(232,168,56,0.15))',
                borderRadius: 4,
                minHeight: 12,
                position: 'relative',
              }}>
                {i === 11 && (
                  <div style={{
                    position: 'absolute', top: -18, left: '50%', transform: 'translateX(-50%)',
                    padding: '1px 5px', borderRadius: 4,
                    background: PALETTE.saffronBright, color: PALETTE.indigoDeep,
                    fontFamily: 'Poppins, sans-serif', fontSize: 9, fontWeight: 700,
                    whiteSpace: 'nowrap',
                  }}>{v}m</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* breakdown */}
        <div style={{ padding: '20px 24px 0', flex: 1 }}>
          <div style={{
            fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
            color: PALETTE.textOnDarkMuted, letterSpacing: 1.5, textTransform: 'uppercase',
            marginBottom: 12,
          }}>By practice · अभ्यास अनुसार</div>
          {breakdown.map((b, i) => (
            <div key={i} style={{ marginBottom: 10 }}>
              <div style={{
                display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4,
              }}>
                <div style={{
                  width: 10, height: 10, borderRadius: '50%',
                  background: b.color,
                }} />
                <div style={{ flex: 1, display: 'flex', alignItems: 'baseline', gap: 6 }}>
                  <span style={{ fontFamily: 'Poppins, sans-serif', fontSize: 13, fontWeight: 500, color: PALETTE.cream }}>{b.en}</span>
                  <span style={{ fontFamily: '"Noto Sans Devanagari", serif', fontSize: 11, color: PALETTE.textOnDarkMuted }}>{b.hi}</span>
                </div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 500, color: PALETTE.cream }}>{b.min} min</div>
                <div style={{ fontFamily: 'Poppins, sans-serif', fontSize: 11, color: PALETTE.textOnDarkMuted, width: 32, textAlign: 'right' }}>{b.pct}%</div>
              </div>
              <div style={{
                height: 4, borderRadius: 2,
                background: 'rgba(245,236,216,0.08)', overflow: 'hidden',
              }}>
                <div style={{
                  width: `${b.pct}%`, height: '100%',
                  background: b.color, borderRadius: 2,
                }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Practice search ──────────────────────────────────────
function PracticeSearchScreen() {
  const results = [
    { en: 'Nadi Shodhana', hi: 'नाड़ी शोधन', teacher: 'Alternate nostril', duration: '8 min', tag: 'Anxiety', accent: 'linear-gradient(160deg, #4fb59f, #1a3d3a)', icon: <BreathIcon />, isFav: true },
    { en: 'Box breath 4-4-4-4', hi: 'बॉक्स श्वास', teacher: 'Beginner', duration: '4 min', tag: 'Anxiety', accent: 'linear-gradient(160deg, #4fb59f, #1a3d3a)', icon: <BreathIcon /> },
    { en: 'The Steady Flame', hi: 'स्थिर दीप', teacher: 'Vidya R.', duration: '20 min', tag: 'Anxiety', accent: 'linear-gradient(160deg, #6a4a9c, #3a2358)', icon: <MeditationIcon /> },
  ];
  const moods = [
    { hi: 'चिंतित', en: 'Anxious', a: true },
    { hi: 'क्रोध', en: 'Angry', a: false },
    { hi: 'उदास', en: 'Sad', a: false },
    { hi: 'बेचैन', en: 'Restless', a: false },
    { hi: 'थका', en: 'Tired', a: false },
    { hi: 'खुश', en: 'Grateful', a: false },
  ];

  return (
    <div style={{ width: 375, height: 812, position: 'relative', overflow: 'hidden', background: PALETTE.indigoDeep, color: PALETTE.cream }}>
      <MandalaBG opacity={0.04} />
      <div style={{ position: 'relative', zIndex: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* header w/ search bar */}
        <div style={{ padding: '58px 20px 0', display: 'flex', alignItems: 'center', gap: 10 }}>
          <button style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(245,236,216,0.1)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            flexShrink: 0,
          }}>
            <svg width="14" height="14" viewBox="0 0 24 24">
              <path d="M15 5 L 8 12 L 15 19" stroke={PALETTE.cream} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          <div style={{
            flex: 1, padding: '10px 14px', borderRadius: 14,
            background: 'rgba(245,236,216,0.06)',
            border: '1px solid rgba(232,168,56,0.35)',
            display: 'flex', alignItems: 'center', gap: 10,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke={PALETTE.saffronBright} strokeWidth="1.8" />
              <path d="M16 16 l 5 5" stroke={PALETTE.saffronBright} strokeWidth="1.8" strokeLinecap="round" />
            </svg>
            <span style={{
              flex: 1,
              fontFamily: 'Poppins, sans-serif', fontSize: 13, color: PALETTE.cream,
            }}>anxious</span>
            <button style={{
              width: 20, height: 20, borderRadius: '50%',
              background: 'rgba(245,236,216,0.15)', border: 'none',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <svg width="8" height="8" viewBox="0 0 24 24">
                <path d="M5 5 L 19 19 M 19 5 L 5 19" stroke={PALETTE.cream} strokeWidth="3" strokeLinecap="round" />
              </svg>
            </button>
          </div>
        </div>

        {/* filter by mood */}
        <div style={{ padding: '20px 24px 0' }}>
          <div style={{
            fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
            color: PALETTE.textOnDarkMuted, letterSpacing: 1.5, textTransform: 'uppercase',
            marginBottom: 10,
          }}>How are you feeling? · भाव</div>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
            {moods.map((m, i) => (
              <div key={i} style={{
                padding: '8px 14px', borderRadius: 999,
                background: m.a ? 'linear-gradient(135deg, #e8a838, #c67a1a)' : 'rgba(245,236,216,0.06)',
                border: m.a ? 'none' : '1px solid rgba(245,236,216,0.12)',
                color: m.a ? PALETTE.indigoDeep : PALETTE.cream,
                fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
                display: 'flex', alignItems: 'center', gap: 6,
              }}>
                <span style={{ fontFamily: '"Noto Sans Devanagari", serif', fontWeight: 500 }}>{m.hi}</span>
                <span style={{ opacity: 0.6 }}>·</span>
                <span>{m.en}</span>
              </div>
            ))}
          </div>
        </div>

        {/* duration filter */}
        <div style={{ padding: '18px 24px 0' }}>
          <div style={{
            fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
            color: PALETTE.textOnDarkMuted, letterSpacing: 1.5, textTransform: 'uppercase',
            marginBottom: 10,
          }}>Time you have · समय</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {['Any', '< 5 min', '5-15', '15-30', '30+'].map((d, i) => (
              <div key={i} style={{
                flex: 1, padding: '8px 4px', textAlign: 'center', borderRadius: 10,
                background: i === 2 ? 'rgba(232,168,56,0.15)' : 'rgba(245,236,216,0.04)',
                border: i === 2 ? '1px solid rgba(232,168,56,0.4)' : '1px solid rgba(245,236,216,0.08)',
                fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 500,
                color: i === 2 ? PALETTE.saffronBright : PALETTE.cream,
              }}>{d}</div>
            ))}
          </div>
        </div>

        {/* results */}
        <div style={{ padding: '22px 20px 0', flex: 1, overflow: 'hidden' }}>
          <div style={{
            padding: '0 4px 10px',
            display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
          }}>
            <div style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 11, fontWeight: 600,
              color: PALETTE.textOnDarkMuted, letterSpacing: 1.5, textTransform: 'uppercase',
            }}>3 practices for you</div>
            <div style={{
              fontFamily: 'Poppins, sans-serif', fontSize: 11,
              color: PALETTE.saffronBright, fontWeight: 500,
            }}>Sort</div>
          </div>
          {results.map((s, i) => <SessionRow key={i} {...s} />)}
        </div>
      </div>
    </div>
  );
}

Object.assign(window, {
  SessionDetailScreen, SessionPauseScreen, SessionCompleteScreen,
  PracticeHistoryScreen, PracticeSearchScreen,
});
