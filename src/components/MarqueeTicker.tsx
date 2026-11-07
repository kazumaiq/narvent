import React from 'react';

/**
 * ROW 1 Items (Large bold display typography)
 */
const row1Items = [
  'NARVENT',
  'SYNTHWAVE',
  'WAVE PHONK',
  'DARK ELECTRONIC',
  'MEMORY REBOOT',
  'ELECTRONIC MUSIC',
  'НОЧНОЙ ГОРОД',
  '夜のドライブ',
];

/**
 * ROW 2 Items (Bold typography with vivid red accents)
 */
const row2Items = [
  { text: '2023—2026', highlight: true },
  { text: 'DIGITAL UNIVERSE', highlight: false },
  { text: 'NO FIXED FREQUENCY', highlight: true },
  { text: 'NIGHT DRIVE', highlight: false },
  { text: 'SOUND ARCHIVE', highlight: true },
  { text: 'NARVENT', highlight: false },
  { text: 'ЭЛЕКТРОННАЯ МУЗЫКА', highlight: true },
  { text: '電子音楽', highlight: false },
];

/**
 * ROW 3 Items (Technical monospace telemetry)
 */
const row3Items = [
  'ARTIST ARCHIVE',
  'SOUND FREQUENCY // 432 HZ',
  'ELECTRONIC CULTURE',
  'NARVENT // OFFICIAL BROADCAST',
  'MUSIC TRANSMISSION',
  'ЗВУКОВАЯ ВСЕЛЕННАЯ',
  'RIAA GOLD CERTIFIED',
  'BILLBOARD #13 US',
];

/**
 * MarqueeTicker — 3-Row Futuristic Electronic Music Editorial System
 */
export function HeroMarquee() {
  return (
    <div className="marquee-container hero-variant" aria-hidden="true">
      {/* ROW 1: Large Bold White Typography */}
      <div className="marquee-row" style={{ padding: '0.4rem 0' }}>
        <div className="marquee-track slide-left-fast">
          {[...row1Items, ...row1Items].map((item, idx) => (
            <div
              key={`r1-${idx}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'clamp(1.5rem, 3vw, 2.5rem)',
                paddingRight: 'clamp(1.5rem, 3vw, 2.5rem)',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.6rem, 3.8vw, 2.85rem)',
                fontWeight: 800,
                color: '#ffffff',
                letterSpacing: '-0.02em',
                textTransform: 'uppercase',
                lineHeight: 1.1,
              }}
            >
              <span>{item}</span>
              <span
                style={{
                  color: 'var(--border-line)',
                  fontSize: '0.65em',
                  opacity: 0.7,
                }}
              >
                ✦
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ROW 2: Bold Typography with Alternating Vivid Red Accents */}
      <div
        className="marquee-row"
        style={{
          padding: '0.35rem 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.05)',
          borderBottom: '1px solid rgba(255, 255, 255, 0.05)',
        }}
      >
        <div className="marquee-track slide-right">
          {[...row2Items, ...row2Items].map((item, idx) => (
            <div
              key={`r2-${idx}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'clamp(1.25rem, 2.5vw, 2rem)',
                paddingRight: 'clamp(1.25rem, 2.5vw, 2rem)',
                fontFamily: 'var(--font-ui)',
                fontSize: 'clamp(0.95rem, 2vw, 1.35rem)',
                fontWeight: 700,
                color: item.highlight ? 'var(--vivid-red)' : '#f8fafc',
                textShadow: item.highlight ? '0 0 15px rgba(255, 42, 75, 0.4)' : 'none',
                letterSpacing: '0.04em',
                textTransform: 'uppercase',
                lineHeight: 1.2,
              }}
            >
              <span>{item.text}</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.25)', fontSize: '0.85em' }}>•</span>
            </div>
          ))}
        </div>
      </div>

      {/* ROW 3: Monospaced Technical Typography */}
      <div className="marquee-row" style={{ padding: '0.35rem 0' }}>
        <div className="marquee-track slide-left-slow">
          {[...row3Items, ...row3Items].map((item, idx) => (
            <div
              key={`r3-${idx}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'clamp(1rem, 2vw, 1.75rem)',
                paddingRight: 'clamp(1rem, 2vw, 1.75rem)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'clamp(0.68rem, 1.1vw, 0.82rem)',
                fontWeight: 500,
                color: 'var(--text-dim)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                lineHeight: 1.2,
              }}
            >
              <span>{item}</span>
              <span style={{ color: 'var(--vivid-red)', opacity: 0.7 }}>//</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * TransitionMarquee — Streamlined single-row ticker for section transitions
 */
export function TransitionMarquee({ text = 'SOUND ARCHIVE // SPOTIFY 3D EXPERIENCE // NO FIXED FREQUENCY // ЭЛЕКТРОННАЯ МУЗЫКА // 432 HZ' }: { text?: string }) {
  const parts = [
    'SOUND ARCHIVE',
    'SPOTIFY 3D EXPERIENCE',
    'NO FIXED FREQUENCY',
    'ЭЛЕКТРОННАЯ МУЗЫКА',
    'NARVENT // 2026',
    '432 HZ TRANSMISSION',
    'SPACE DISCOGRAPHY',
  ];

  return (
    <div
      className="marquee-container"
      style={{
        padding: '0.75rem 0',
        background: 'rgba(4, 5, 14, 0.9)',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
      }}
      aria-hidden="true"
    >
      <div className="marquee-row">
        <div className="marquee-track slide-left">
          {[...parts, ...parts].map((item, idx) => (
            <div
              key={`tm-${idx}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '1.75rem',
                paddingRight: '1.75rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.74rem',
                fontWeight: 600,
                color: idx % 3 === 0 ? 'var(--vivid-red)' : 'var(--text-muted)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              <span>{item}</span>
              <span style={{ color: 'rgba(255, 255, 255, 0.2)' }}>✦</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
