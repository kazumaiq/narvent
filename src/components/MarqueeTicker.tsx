import React from 'react';

interface MarqueeToken {
  text: string;
  style: 'solid' | 'accent' | 'outline';
}

/**
 * ROW 1 — Monumental Kinetic Band (Moves Left)
 * NARVENT // CINEMATIC SYNTHWAVE // DARK ELECTRONIC // WAVE PHONK // 2021—2026
 */
const row1Tokens: MarqueeToken[] = [
  { text: 'NARVENT', style: 'solid' },
  { text: 'CINEMATIC SYNTHWAVE', style: 'outline' },
  { text: 'DARK ELECTRONIC', style: 'accent' },
  { text: 'WAVE PHONK', style: 'solid' },
  { text: '2021—2026', style: 'outline' },
  { text: 'НОЧНОЙ ГОРОД', style: 'accent' },
];

/**
 * ROW 2 — Monumental Counter-Kinetic Band (Moves Right)
 * NO FIXED FREQUENCY // MEMORY REBOOT // INSOMNIA // FAINTED // DIGITAL UNIVERSE
 */
const row2Tokens: MarqueeToken[] = [
  { text: 'NO FIXED FREQUENCY', style: 'outline' },
  { text: 'MEMORY REBOOT', style: 'solid' },
  { text: 'INSOMNIA', style: 'accent' },
  { text: 'FAINTED', style: 'outline' },
  { text: 'DIGITAL UNIVERSE', style: 'solid' },
  { text: 'ЗВУКОВАЯ ВСЕЛЕННАЯ', style: 'outline' },
];

function getTokenTypography(style: MarqueeToken['style']): React.CSSProperties {
  if (style === 'accent') {
    return {
      color: 'var(--neon-magenta)',
      textShadow: '0 0 28px rgba(217, 70, 239, 0.35)',
    };
  }
  if (style === 'outline') {
    return {
      color: 'transparent',
      WebkitTextStroke: '1.5px rgba(255, 255, 255, 0.48)',
    };
  }
  return {
    color: '#ffffff',
  };
}

/**
 * HeroMarquee — Dual-row oversized architectural kinetic typography band
 */
export function HeroMarquee() {
  return (
    <div className="marquee-container hero-variant" aria-hidden="true">
      {/* ROW 1 */}
      <div className="marquee-row" style={{ padding: '0.35rem 0' }}>
        <div className="marquee-track slide-left-fast">
          {[...row1Tokens, ...row1Tokens].map((item, idx) => (
            <div
              key={`r1-${idx}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'clamp(1.25rem, 2.8vw, 2.5rem)',
                paddingRight: 'clamp(1.25rem, 2.8vw, 2.5rem)',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.65rem, 4.4vw, 3.6rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                lineHeight: 1.05,
                ...getTokenTypography(item.style),
              }}
            >
              <span>{item.text}</span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.45em',
                  color: 'rgba(255, 255, 255, 0.28)',
                  WebkitTextStroke: '0px',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                }}
              >
                //
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ROW 2 */}
      <div
        className="marquee-row"
        style={{
          padding: '0.35rem 0',
          borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        }}
      >
        <div className="marquee-track slide-right">
          {[...row2Tokens, ...row2Tokens].map((item, idx) => (
            <div
              key={`r2-${idx}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'clamp(1.25rem, 2.8vw, 2.5rem)',
                paddingRight: 'clamp(1.25rem, 2.8vw, 2.5rem)',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.5rem, 3.8vw, 3.1rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                lineHeight: 1.05,
                ...getTokenTypography(item.style),
              }}
            >
              <span>{item.text}</span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.45em',
                  color: 'rgba(217, 70, 239, 0.45)',
                  WebkitTextStroke: '0px',
                  fontWeight: 500,
                  letterSpacing: '0.05em',
                }}
              >
                //
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * TransitionMarquee — Single oversized kinetic band between Popular Hits & 3D Discography
 */
export function TransitionMarquee() {
  const items: MarqueeToken[] = [
    { text: 'NO FIXED FREQUENCY', style: 'solid' },
    { text: 'MEMORY REBOOT', style: 'outline' },
    { text: 'INSOMNIA', style: 'accent' },
    { text: 'FAINTED', style: 'solid' },
    { text: 'DIGITAL UNIVERSE', style: 'outline' },
    { text: 'ЭЛЕКТРОННАЯ МУЗЫКА', style: 'accent' },
  ];

  return (
    <div
      className="marquee-container"
      style={{
        padding: 'clamp(0.9rem, 2vh, 1.4rem) 0',
        background: 'rgba(4, 5, 14, 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      }}
      aria-hidden="true"
    >
      <div className="marquee-row">
        <div className="marquee-track slide-left">
          {[...items, ...items].map((item, idx) => (
            <div
              key={`tm-${idx}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 'clamp(1.25rem, 2.5vw, 2.25rem)',
                paddingRight: 'clamp(1.25rem, 2.5vw, 2.25rem)',
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.45rem, 3.6vw, 2.85rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                textTransform: 'uppercase',
                lineHeight: 1.05,
                ...getTokenTypography(item.style),
              }}
            >
              <span>{item.text}</span>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.45em',
                  color: 'rgba(56, 189, 248, 0.45)',
                  WebkitTextStroke: '0px',
                  fontWeight: 500,
                }}
              >
                //
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export function FooterMarquee() {
  return null;
}
