// Practice Hub deep-dive: library screens for Meditation, Mantra, Breathwork, Yoga Nidra
// Each is reached by tapping a tile on PracticeHomeScreen

// ─── Shared list-row card ─────────────────────────────────
function SessionRow({ hi, en, teacher, duration, tag, icon, accent, isNew, isPlaying, isFav }) {
  return (
    <div style={{
      padding: '12px 14px',
      background: 'rgba(245,236,216,0.04)',
      border: '1px solid rgba(245,236,216,0.08)',
      borderRadius: 16,
      marginBottom: 10,
      display: 'flex', alignItems: 'center', gap: 12,
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: accent,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexShrink: 0, position: 'relative',
      }}>
        {icon}
        {isPlaying && (
          <div style={{
            position: 'absolute', inset: -3, borderRadius: 16,
            border: '2px solid #7fd196',
          }} />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
          <div style={{
            fontFamily: 'Poppins, sans-serif', fontSize: 14, fontWeight: 600, color: PALETTE.cream,
          }}>{en}</div>
          {isNew && (
            <div style={{
              padding: '2px 6px', borderRadius: 4,
              background: 'rgba(232,168,56,0.2)',
              color: PALETTE.saffronBright,
              fontFamily: 'Poppins, sans-serif', fontSize: 9, fontWeight: 700,
              letterSpacing: 0.5,
            }}>NEW</div>
          )}
        </div>
        <div style={{
          fontFamily: '"Noto Sans Devanagari", serif', fontSize: 12,
          color: PALETTE.saffronBright, marginTop: 1,
        }}>{hi}</div>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8, marginTop: 4,
          fontFamily: 'Poppins, sans-serif', fontSize: 11,
          color: PALETTE.textOnDarkMuted,
        }}>
          <span>{duration}</span>
          {teacher && <><span style={{ opacity: 0.5 }}>·</span><span>{teacher}</span></>}
          {tag && <><span style={{ opacity: 0.5 }}>·</span><span style={{ color: PALETTE.saffronBright }}>{tag}</span></>}
        </div>
      </div>
      <button style={{
        width: 32, height: 32, borderRadius: '50%',
        background: 'transparent', border: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: isFav ? PALETTE.saffronBright : PALETTE.textOnDarkMuted,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'}>
          <path d="M12 4 C 8 4, 6 7, 6 10 c 0 4 6 8 6 8 s 6 -4 6 -8 c 0 -3 -2 -6 -6 -6 z" stroke="currentColor" strokeWidth="1.6" />
        </svg>
      </button>
    </div>
  );
}

// ─── Icons for practice types ─────────────────────────────
const MeditationIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="7" r="3" fill="#fff" opacity="0.9" />
    <path d="M4 20 c 0 -5, 4 -8, 8 -8 s 8 3 8 8" fill="#fff" opacity="0.9" />
    <circle cx="7" cy="14" r="1.5" fill="#fff" opacity="0.85" />
    <circle cx="17" cy="14" r="1.5" fill="#fff" opacity="0.85" />
  </svg>
);
const MantraBeadIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="7" stroke="#fff" strokeWidth="1.6" opacity="0.9" />
    {Array.from({ length: 12 }).map((_, i) => {
      const a = (i * 30) * Math.PI / 180;
      return <circle key={i} cx={12 + Math.cos(a) * 7} cy={12 + Math.sin(a) * 7} r="1.4" fill="#fff" opacity="0.9" />;
    })}
    <circle cx="12" cy="4.5" r="1.8" fill="#fff" />
  </svg>
);
const BreathIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="9" stroke="#fff" strokeWidth="1.5" opacity="0.9" />
    <circle cx="12" cy="12" r="5" stroke="#fff" strokeWidth="1.5" opacity="0.75" />
    <circle cx="12" cy="12" r="2" fill="#fff" opacity="0.95" />
  </svg>
);
const NidraIcon = ({ size = 22 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <path d="M18 14 A 8 8 0 1 1 10 6 a 6 6 0 0 0 8 8 z" fill="#fff" opacity="0.9" />
    <circle cx="18" cy="6" r="0.8" fill="#fff" opacity="0.6" />
    <circle cx="20" cy="9" r="0.6" fill="#fff" opacity="0.5" />
  </svg>
);

// ─── Library page frame (reused) ──────────────────────────
function LibraryFrame({ hi, en, count, tint, glow, filters, children, subtitle }) {
  return (
    <div style={{ width: 375, height: 812, position: 'relative', overflow: 'hidden', background: PALETTE.indigoDeep, color: PALETTE.cream }}>
      <MandalaBG opacity={0.04} />
      {glow && (
        <div style={{
          position: 'absolute', top: -60, left: '50%', transform: 'translateX(-50%)',
          width: 460, height: 460, borderRadius: '50%',
          background: `radial-gradient(circle, ${glow} 0%, transparent 60%)`,
        }} />
      )}
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
          <button style={{
            width: 36, height: 36, borderRadius: '50%',
            background: 'rgba(245,236,216,0.1)', border: 'none',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <circle cx="11" cy="11" r="7" stroke={PALETTE.cream} strokeWidth="1.8" />
              <path d="M16 16 l 5 5" stroke={PALETTE.cream} strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* title */}
        <div style={{ padding: '16px 24px 0' }}>
          <div style={{
            fontFamily: '"Noto Sans Devanagari", serif', fontSize: 32, fontWeight: 500, lineHeight: 1.1,
            color: tint || PALETTE.cream,
          }}>{hi}</div>
          <div style={{
            marginTop: 4,
            fontFamily: 'Poppins, sans-serif', fontSize: 15, fontWeight: 500,
            color: PALETTE.cream, letterSpacing: 0.3,
          }}>{en} <span style={{ color: PALETTE.textOnDarkMuted, fontWeight: 400 }}>· {count}</span></div>
          {subtitle && (
            <div style={{
              marginTop: 8,
              fontFamily: '"Noto Serif", serif', fontStyle: 'italic',
              fontSize: 13, lineHeight: 1.5,
              color: PALETTE.textOnDarkMuted, maxWidth: 300,
            }}>{subtitle}</div>
          )}
        </div>

        {/* filter chips */}
        {filters && (
          <div style={{
            padding: '18px 24px 4px',
            display: 'flex', gap: 8, overflowX: 'auto',
          }}>
            {filters.map((f, i) => (
              <div key={i} style={{
                padding: '7px 14px', borderRadius: 999,
                background: f.active
                  ? 'linear-gradient(135deg, #e8a838, #c67a1a)'
                  : 'rgba(245,236,216,0.06)',
                border: f.active ? 'none' : '1px solid rgba(245,236,216,0.12)',
                color: f.active ? PALETTE.indigoDeep : PALETTE.cream,
                fontFamily: 'Poppins, sans-serif', fontSize: 12, fontWeight: 600,
                whiteSpace: 'nowrap', flexShrink: 0,
              }}>{f.label}</div>
            ))}
          </div>
        )}

        {/* list */}
        <div style={{ flex: 1, overflow: 'hidden', padding: '14px 20px 0' }}>
          {children}
        </div>

        <BottomNav active="practice" />
      </div>
    </div>
  );
}

// ─── Meditation library ─────────────────────────────────────
function MeditationLibraryScreen() {
  const sessions = [
    { en: 'Stillness of the River', hi: 'नदी की शांति', teacher: 'Vidya R.', duration: '12 min', tag: 'Morning', accent: 'linear-gradient(160deg, #6a4a9c, #3a2358)', icon: <MeditationIcon />, isPlaying: true, isFav: true },
    { en: 'Witness the Mind', hi: 'साक्षी भाव', teacher: 'Pandit R.', duration: '8 min', tag: 'Anytime', accent: 'linear-gradient(160deg, #6a4a9c, #3a2358)', icon: <MeditationIcon />, isNew: true },
    { en: 'Detachment · Vairagya', hi: 'वैराग्य', teacher: 'Deepa M.', duration: '15 min', tag: 'Focus', accent: 'linear-gradient(160deg, #6a4a9c, #3a2358)', icon: <MeditationIcon /> },
    { en: 'The Steady Flame', hi: 'स्थिर दीप', teacher: 'Vidya R.', duration: '20 min', tag: 'Anxiety', accent: 'linear-gradient(160deg, #6a4a9c, #3a2358)', icon: <MeditationIcon />, isFav: true },
    { en: 'Arjuna\'s Doubt', hi: 'अर्जुन विषाद', teacher: 'Pandit R.', duration: '10 min', tag: 'Grief', accent: 'linear-gradient(160deg, #6a4a9c, #3a2358)', icon: <MeditationIcon /> },
  ];
  return (
    <LibraryFrame
      hi="ध्यान" en="Meditation" count="24 sessions"
      tint="#c9a3ff"
      glow="rgba(138,94,184,0.28)"
      subtitle="Guided practices rooted in the Gita — one for every mood, from before-work stillness to before-sleep surrender."
      filters={[
        { label: 'All · सभी', active: true },
        { label: 'Morning', active: false },
        { label: 'Anxiety', active: false },
        { label: 'Focus', active: false },
        { label: 'Sleep', active: false },
      ]}
    >
      {sessions.map((s, i) => <SessionRow key={i} {...s} />)}
    </LibraryFrame>
  );
}

// ─── Mantra library ────────────────────────────────────────
function MantraLibraryScreen() {
  const mantras = [
    { en: 'Om Namah Shivaya', hi: 'ॐ नमः शिवाय', teacher: '108 beads', duration: '11 min', tag: 'Everyday', accent: 'linear-gradient(160deg, #e8a838, #8a5010)', icon: <MantraBeadIcon />, isFav: true },
    { en: 'Gayatri Mantra', hi: 'गायत्री मंत्र', teacher: '108 beads', duration: '14 min', tag: 'Sunrise', accent: 'linear-gradient(160deg, #e8a838, #8a5010)', icon: <MantraBeadIcon />, isPlaying: true, isFav: true },
    { en: 'Maha Mrityunjaya', hi: 'महामृत्युंजय', teacher: '108 beads', duration: '18 min', tag: 'Healing', accent: 'linear-gradient(160deg, #e8a838, #8a5010)', icon: <MantraBeadIcon /> },
    { en: 'Hare Krishna', hi: 'हरे कृष्ण', teacher: '32 rounds', duration: '25 min', tag: 'Bhakti', accent: 'linear-gradient(160deg, #e8a838, #8a5010)', icon: <MantraBeadIcon /> },
    { en: 'Om Mani Padme Hum', hi: 'ॐ मणि पद्मे हूँ', teacher: '108 beads', duration: '9 min', tag: 'Compassion', accent: 'linear-gradient(160deg, #e8a838, #8a5010)', icon: <MantraBeadIcon />, isNew: true },
    { en: 'Sarveshaam Svastir', hi: 'सर्वेषां स्वस्तिः', teacher: '54 beads', duration: '6 min', tag: 'Blessing', accent: 'linear-gradient(160deg, #e8a838, #8a5010)', icon: <MantraBeadIcon /> },
  ];
  return (
    <LibraryFrame
      hi="मंत्र जाप" en="Mantra Chanting" count="12 mantras"
      tint={PALETTE.saffronBright}
      glow="rgba(232,168,56,0.28)"
      subtitle="Bead-counted repetition. Each mantra carries a specific vibration — pick one and stay with it for 40 days."
      filters={[
        { label: 'All · सभी', active: true },
        { label: 'Everyday', active: false },
        { label: 'Healing', active: false },
        { label: 'Bhakti', active: false },
        { label: 'Sunrise', active: false },
      ]}
    >
      {mantras.map((s, i) => <SessionRow key={i} {...s} />)}
    </LibraryFrame>
  );
}

// ─── Breathwork library ────────────────────────────────────
function BreathworkLibraryScreen() {
  const techniques = [
    { en: 'Nadi Shodhana', hi: 'नाड़ी शोधन', teacher: 'Alternate nostril', duration: '8 min', tag: 'Balance', accent: 'linear-gradient(160deg, #4fb59f, #1a3d3a)', icon: <BreathIcon />, isFav: true, isPlaying: true },
    { en: 'Bhramari · Bee Breath', hi: 'भ्रामरी', teacher: 'Humming', duration: '6 min', tag: 'Calm', accent: 'linear-gradient(160deg, #4fb59f, #1a3d3a)', icon: <BreathIcon /> },
    { en: 'Kapalabhati', hi: 'कपालभाति', teacher: 'Skull-shining', duration: '5 min', tag: 'Energize', accent: 'linear-gradient(160deg, #4fb59f, #1a3d3a)', icon: <BreathIcon /> },
    { en: 'Ujjayi · Victorious', hi: 'उज्जायी', teacher: 'Ocean breath', duration: '10 min', tag: 'Focus', accent: 'linear-gradient(160deg, #4fb59f, #1a3d3a)', icon: <BreathIcon /> },
    { en: 'Sheetali · Cooling', hi: 'शीतली', teacher: 'Tongue breath', duration: '7 min', tag: 'Anger', accent: 'linear-gradient(160deg, #4fb59f, #1a3d3a)', icon: <BreathIcon />, isNew: true },
    { en: 'Box breath 4-4-4-4', hi: 'बॉक्स श्वास', teacher: 'Beginner', duration: '4 min', tag: 'Anxiety', accent: 'linear-gradient(160deg, #4fb59f, #1a3d3a)', icon: <BreathIcon /> },
  ];
  return (
    <LibraryFrame
      hi="प्राणायाम" en="Breathwork" count="8 techniques"
      tint="#7fd196"
      glow="rgba(95,200,180,0.24)"
      subtitle="Pranayama — the ancient science of breath as bridge between body and mind."
      filters={[
        { label: 'All · सभी', active: true },
        { label: 'Calm', active: false },
        { label: 'Energize', active: false },
        { label: 'Anger', active: false },
        { label: 'Focus', active: false },
      ]}
    >
      {techniques.map((s, i) => <SessionRow key={i} {...s} />)}
    </LibraryFrame>
  );
}

// ─── Yoga Nidra library ────────────────────────────────────
function YogaNidraLibraryScreen() {
  const journeys = [
    { en: 'Ocean of Rest', hi: 'विश्राम सागर', teacher: 'Meera J.', duration: '25 min', tag: 'Deep sleep', accent: 'linear-gradient(160deg, #2a3d6e, #0f102b)', icon: <NidraIcon />, isFav: true },
    { en: 'The Chariot Rests', hi: 'रथ विश्राम', teacher: 'Pandit R.', duration: '35 min', tag: 'Story', accent: 'linear-gradient(160deg, #2a3d6e, #0f102b)', icon: <NidraIcon />, isNew: true },
    { en: 'Body Scan · 61 points', hi: 'अंग न्यास', teacher: 'Vidya R.', duration: '20 min', tag: 'Body', accent: 'linear-gradient(160deg, #2a3d6e, #0f102b)', icon: <NidraIcon />, isPlaying: true },
    { en: 'Return to Krishna', hi: 'कृष्ण-गमन', teacher: 'Deepa M.', duration: '30 min', tag: 'Bhakti', accent: 'linear-gradient(160deg, #2a3d6e, #0f102b)', icon: <NidraIcon /> },
    { en: 'Sankalpa · Intention', hi: 'संकल्प', teacher: 'Vidya R.', duration: '18 min', tag: 'Manifest', accent: 'linear-gradient(160deg, #2a3d6e, #0f102b)', icon: <NidraIcon /> },
    { en: 'Silent Witness', hi: 'मौन साक्षी', teacher: 'No voice', duration: '40 min', tag: 'Advanced', accent: 'linear-gradient(160deg, #2a3d6e, #0f102b)', icon: <NidraIcon /> },
  ];
  return (
    <LibraryFrame
      hi="निद्रा" en="Yoga Nidra" count="6 journeys"
      tint="#a5b6e6"
      glow="rgba(74,110,180,0.24)"
      subtitle="Conscious sleep — a state between waking and dreaming. 30 minutes here is said to equal 3 hours of ordinary rest."
      filters={[
        { label: 'All · सभी', active: true },
        { label: 'Deep sleep', active: false },
        { label: 'Story', active: false },
        { label: 'Body', active: false },
        { label: 'Bhakti', active: false },
      ]}
    >
      {journeys.map((s, i) => <SessionRow key={i} {...s} />)}
    </LibraryFrame>
  );
}

Object.assign(window, {
  MeditationLibraryScreen, MantraLibraryScreen, BreathworkLibraryScreen, YogaNidraLibraryScreen,
  SessionRow, LibraryFrame,
});
