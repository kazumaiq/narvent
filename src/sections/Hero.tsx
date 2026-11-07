import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowRight, Disc3, ArrowUpRight } from 'lucide-react';
import CosmicResonator3D from '../scenes/CosmicResonator3D';
import ReleaseModal from '../components/ReleaseModal';
import { PlusCrossMatrix } from '../components/CinematicReveal';
import { releases, Release, formatReleaseDate } from '../data/releases';
import { useLanguage } from '../context/LanguageContext';

const HERO_SHOWCASE_IDS = ['recall-ep', 'memory-reboot', 'genesis', 'insomnia'];

/** Subtle editorial accent colors harmonized to each release cover */
const ERA_ACCENTS: Record<string, string> = {
  'recall-ep': '#a855f7',
  'memory-reboot': '#38bdf8',
  genesis: '#cbd5e1',
  insomnia: '#818cf8',
};

export default function Hero() {
  const { t, lang } = useLanguage();

  const showcaseReleases = HERO_SHOWCASE_IDS.map(
    (id) => releases.find((r) => r.id === id) || releases[0]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const activeRelease = showcaseReleases[activeIndex] || releases[0];
  const activeAccent = ERA_ACCENTS[activeRelease.id] || '#a855f7';
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

  // Auto-cycle hero showcase every 7.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcaseReleases.length);
    }, 7500);
    return () => clearInterval(timer);
  }, [showcaseReleases.length]);

  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 700], [0, -35]);
  const stageY = useTransform(scrollY, [0, 700], [0, 28]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        paddingTop: 'clamp(5.6rem, 11vh, 7.5rem)',
        paddingBottom: 'clamp(4.5rem, 8vh, 5.5rem)',
        zIndex: 2,
      }}
    >
      {/* Decorative Bottom-Left "+ ×" Geometric Cross-Grid Matrix */}
      <div
        className="desktop-only"
        style={{
          position: 'absolute',
          bottom: '5.5rem',
          left: 'clamp(1rem, 3vw, 2.5rem)',
          zIndex: 1,
        }}
      >
        <PlusCrossMatrix rows={5} cols={6} />
      </div>

      {/* Main Centered Martin Garrix Style Art Installation Stage */}
      <div
        className="container-wide"
        style={{
          position: 'relative',
          zIndex: 3,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          margin: 'auto',
          width: '100%',
        }}
      >
        {/* Top Kicker Above Giant Title */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            fontFamily: 'var(--font-mono)',
            fontSize: 'clamp(0.6rem, 1vw, 0.72rem)',
            fontWeight: 600,
            letterSpacing: '0.22em',
            textTransform: 'uppercase',
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '0.45rem',
          }}
        >
          <span style={{ color: '#ffffff' }}>+×</span>
          <span>{t.hero.badge}</span>
          <span style={{ color: 'var(--text-dim)' }}>// 2026</span>
        </motion.div>

        {/* MONUMENTAL OVERLAPPING DISPLAY TITLE */}
        <motion.h1
          style={{
            y: titleY,
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.35rem, 9.4vw, 8.4rem)',
            fontWeight: 900,
            letterSpacing: '-0.045em',
            lineHeight: 0.86,
            color: '#ffffff',
            textTransform: 'uppercase',
            textAlign: 'center',
            margin: 0,
            position: 'relative',
            zIndex: 6,
            marginBottom: 'clamp(-0.75rem, -1.8vw, -1.75rem)',
            mixBlendMode: 'difference',
            userSelect: 'none',
            pointerEvents: 'none',
            maxWidth: '100%',
          }}
        >
          NARVENT
        </motion.h1>

        {/* ARCHITECTURAL 2-CHAMBER DIPTYCH STAGE (Left: Uncropped Editorial Cover & Info | Right: Pure Dark-Editorial 3D Black Hole) */}
        <motion.div style={{ y: stageY }} className="hero-diptych-stage">
          {/* LEFT CHAMBER: Editorial Release Presentation */}
          <div
            style={{
              position: 'relative',
              padding: 'clamp(1.35rem, 2.8vw, 2.35rem)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '1.35rem',
              overflow: 'hidden',
              background: 'linear-gradient(160deg, rgba(10, 11, 22, 0.95) 0%, rgba(3, 3, 8, 0.98) 100%)',
            }}
          >
            {/* Ultra-subtle blurred ambient backdrop from active cover */}
            <AnimatePresence mode="wait">
              <motion.img
                key={`bg-${activeRelease.id}`}
                src={activeRelease.coverImage}
                alt=""
                aria-hidden="true"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.14 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.7 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  filter: 'blur(36px) saturate(1.2)',
                  transform: 'scale(1.2)',
                  pointerEvents: 'none',
                }}
              />
            </AnimatePresence>

            {/* Top Index & Release Date */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.66rem',
                letterSpacing: '0.16em',
                color: 'rgba(255, 255, 255, 0.65)',
                textTransform: 'uppercase',
              }}
            >
              <span>
                0{activeIndex + 1} / 0{showcaseReleases.length} // {formatReleaseDate(activeRelease.releaseDate, lang)}
              </span>
              <span style={{ color: 'rgba(255, 255, 255, 0.4)' }}>+ ×</span>
            </div>

            {/* Center Uncropped 1:1 Cover + Play Trigger + Title */}
            <div
              onClick={() => setSelectedRelease(activeRelease)}
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'grid',
                gridTemplateColumns: 'clamp(108px, 13vw, 156px) minmax(0, 1fr)',
                gap: 'clamp(1rem, 2vw, 1.5rem)',
                alignItems: 'center',
                cursor: 'pointer',
              }}
            >
              {/* Crisp 1:1 Square Artwork */}
              <div
                style={{
                  width: '100%',
                  aspectRatio: '1 / 1',
                  position: 'relative',
                  border: '1px solid rgba(255, 255, 255, 0.22)',
                  boxShadow: '0 20px 45px rgba(0, 0, 0, 0.85)',
                  overflow: 'hidden',
                  background: '#05060f',
                }}
              >
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeRelease.id}
                    src={activeRelease.coverImage}
                    alt={activeRelease.title}
                    width={160}
                    height={160}
                    initial={{ clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 }}
                    animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                </AnimatePresence>
              </div>

              {/* Release Typography & Play Circle */}
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.64rem',
                    fontWeight: 600,
                    letterSpacing: '0.16em',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                    marginBottom: '0.45rem',
                  }}
                >
                  {t.hero.subtitle}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.25rem, 2.4vw, 2.05rem)',
                    fontWeight: 900,
                    color: '#ffffff',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.02,
                    textTransform: 'uppercase',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {activeRelease.title}
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.84rem',
                    color: 'rgba(255, 255, 255, 0.72)',
                    marginTop: '0.3rem',
                    marginBottom: '0.85rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  — {activeRelease.artist}
                  {activeRelease.featuring ? ` ft. ${activeRelease.featuring.join(', ')}` : ''}
                </div>

                <button
                  aria-label={t.hero.listen}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedRelease(activeRelease);
                  }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    padding: '0.45rem 0.95rem',
                    border: '1px solid rgba(255, 255, 255, 0.32)',
                    background: 'rgba(255, 255, 255, 0.04)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.66rem',
                    fontWeight: 700,
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    cursor: 'pointer',
                  }}
                >
                  <Play size={11} fill="currentColor" />
                  <span>{t.hero.listen}</span>
                </button>
              </div>
            </div>

            {/* Bottom Era Switcher Tabs */}
            <div
              style={{
                position: 'relative',
                zIndex: 2,
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.4rem',
              }}
            >
              {showcaseReleases.map((rel, idx) => {
                const isCurrent = idx === activeIndex;
                return (
                  <button
                    key={rel.id}
                    onClick={() => setActiveIndex(idx)}
                    style={{
                      padding: '0.34rem 0.65rem',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.6rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      background: isCurrent ? '#ffffff' : 'rgba(2, 2, 6, 0.65)',
                      color: isCurrent ? '#020206' : 'rgba(255, 255, 255, 0.6)',
                      border: isCurrent
                        ? '1px solid #ffffff'
                        : '1px solid rgba(255, 255, 255, 0.16)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                  >
                    0{idx + 1} {rel.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ARCHITECTURAL HAIRLINE DIVIDER */}
          <div className="hero-diptych-divider" aria-hidden="true" />

          {/* RIGHT CHAMBER: Pure Dark-Editorial 3D Gargantua Singularity Observatory */}
          <div
            style={{
              position: 'relative',
              minHeight: 'clamp(290px, 44vh, 460px)',
              background:
                'radial-gradient(circle at 50% 50%, rgba(12, 14, 28, 0.55) 0%, rgba(2, 2, 6, 0.98) 78%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* Top Telemetry Header inside 3D Chamber */}
            <div
              style={{
                position: 'absolute',
                top: 'clamp(1rem, 2.2vw, 1.65rem)',
                left: 'clamp(1rem, 2.2vw, 1.65rem)',
                right: 'clamp(1rem, 2.2vw, 1.65rem)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.62rem',
                letterSpacing: '0.18em',
                color: 'rgba(255, 255, 255, 0.45)',
                textTransform: 'uppercase',
                pointerEvents: 'none',
                zIndex: 3,
              }}
            >
              <span>SINGULARITY // EVENT HORIZON</span>
              <span>3D WEBGL</span>
            </div>

            {/* Interactive 3D Gargantua Black Hole (Monochrome Stark White + Era Accent) */}
            <div
              style={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                inset: 0,
                zIndex: 2,
              }}
            >
              <CosmicResonator3D accentColor={activeAccent} />
            </div>

            {/* Bottom Corner Crosshairs & Interaction Hint */}
            <div
              style={{
                position: 'absolute',
                bottom: 'clamp(0.85rem, 2vw, 1.35rem)',
                left: 'clamp(1rem, 2.2vw, 1.65rem)',
                right: 'clamp(1rem, 2.2vw, 1.65rem)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.6rem',
                letterSpacing: '0.18em',
                color: 'rgba(255, 255, 255, 0.35)',
                textTransform: 'uppercase',
                pointerEvents: 'none',
                zIndex: 3,
              }}
            >
              <span>+ ×</span>
              <span>{lang === 'ru' ? 'ИНТЕРАКТИВНАЯ ОРБИТА' : 'DRAG TO ORBIT'}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Anchored Bar */}
      <div
        className="container-wide"
        style={{
          position: 'relative',
          zIndex: 4,
          marginTop: 'clamp(1.5rem, 3vh, 2.25rem)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '1rem',
        }}
      >
        {/* Bottom-Left Quick Actions */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '0.6rem',
          }}
        >
          <button onClick={() => scrollTo('archive')} className="btn-editorial listen-pill">
            <Disc3 size={13} />
            <span>{t.hero.cta3D}</span>
          </button>

          <button onClick={() => scrollTo('popular')} className="btn-editorial listen-pill">
            <span>{t.hero.ctaPopular}</span>
          </button>

          <a
            href="https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-editorial listen-pill"
          >
            <span>{t.hero.ctaSpotify}</span>
            <ArrowUpRight size={13} />
          </a>
        </div>

        {/* Bottom-Right Martin Garrix Style Split Telemetry Box + Solid White CTA */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'stretch',
            gap: '0.6rem',
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.9rem',
              padding: '0 1.15rem',
              minHeight: '46px',
              background: 'rgba(6, 7, 16, 0.85)',
              border: '1px solid rgba(255, 255, 255, 0.22)',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.72rem',
              color: '#ffffff',
              letterSpacing: '0.08em',
            }}
          >
            <span>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem' }}>23</strong>{' '}
              <span style={{ color: 'var(--text-dim)', fontSize: '0.62rem' }}>REL</span>
            </span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <span>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: '#ffffff' }}>
                GOLD
              </strong>{' '}
              <span style={{ color: 'var(--text-dim)', fontSize: '0.62rem' }}>RIAA</span>
            </span>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>|</span>
            <span>
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--electric-blue)' }}>
                #13
              </strong>{' '}
              <span style={{ color: 'var(--text-dim)', fontSize: '0.62rem' }}>US</span>
            </span>
          </div>

          <button
            onClick={() => setSelectedRelease(activeRelease)}
            className="mg-split-btn"
          >
            <span className="mg-split-label">{t.hero.listen}</span>
            <span className="mg-split-arrow">
              <ArrowRight size={15} />
            </span>
          </button>
        </div>
      </div>

      {/* Release Modal */}
      <ReleaseModal
        release={selectedRelease}
        onClose={() => setSelectedRelease(null)}
      />
    </section>
  );
}
