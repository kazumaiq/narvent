import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { Play, ArrowRight, Disc3, ArrowUpRight } from 'lucide-react';
import CosmicResonator3D from '../scenes/CosmicResonator3D';
import ReleaseModal from '../components/ReleaseModal';
import { PlusCrossMatrix } from '../components/CinematicReveal';
import { releases, Release, formatReleaseDate } from '../data/releases';
import { useLanguage } from '../context/LanguageContext';

const HERO_SHOWCASE_IDS = ['recall-ep', 'memory-reboot', 'genesis', 'insomnia'];

export default function Hero() {
  const { t, lang } = useLanguage();

  const showcaseReleases = HERO_SHOWCASE_IDS.map(
    (id) => releases.find((r) => r.id === id) || releases[0]
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const activeRelease = showcaseReleases[activeIndex] || releases[0];
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

  // Auto-cycle hero art installation every 6.5s
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % showcaseReleases.length);
    }, 6500);
    return () => clearInterval(timer);
  }, [showcaseReleases.length]);

  // Smooth mouse parallax coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x: nx, y: ny });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  const { scrollY } = useScroll();
  const titleY = useTransform(scrollY, [0, 700], [0, -45]);
  const stageY = useTransform(scrollY, [0, 700], [0, 35]);

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
        paddingTop: 'clamp(4.75rem, 9vh, 6.75rem)',
        paddingBottom: 'clamp(4.5rem, 8vh, 5.5rem)',
        zIndex: 2,
      }}
    >
      {/* Subtle Cosmic Ambient Illumination (feathered well inside section bounds) */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: '50%',
          width: 'clamp(300px, 55vw, 760px)',
          height: 'clamp(300px, 55vw, 760px)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(139, 92, 246, 0.14) 0%, rgba(217, 70, 239, 0.07) 38%, rgba(2, 2, 6, 0) 70%)',
          transform: `translate3d(calc(-50% + ${mousePos.x * -22}px), ${mousePos.y * -22}px, 0)`,
          transition: 'transform 0.4s ease-out',
          pointerEvents: 'none',
        }}
      />

      {/* Decorative Bottom-Left "+ ×" Geometric Cross-Grid Matrix (like martingarrix.com) */}
      <div
        className="desktop-only"
        style={{
          position: 'absolute',
          bottom: '5.5rem',
          left: 'clamp(1rem, 3vw, 2.5rem)',
          zIndex: 1,
        }}
      >
        <PlusCrossMatrix rows={5} cols={7} />
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
          initial={{ opacity: 0, y: 12 }}
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
            marginBottom: '0.35rem',
          }}
        >
          <span style={{ color: 'var(--neon-magenta)' }}>+×</span>
          <span>{t.hero.badge}</span>
          <span style={{ color: 'var(--electric-blue)' }}>// 2026</span>
        </motion.div>

        {/* MONUMENTAL OVERLAPPING DISPLAY TITLE (Overlaps top edge of visual frame like MARTY on martingarrix.com) */}
        <motion.h1
          style={{
            y: titleY,
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.35rem, 9.6vw, 8.6rem)',
            fontWeight: 900,
            letterSpacing: '-0.045em',
            lineHeight: 0.86,
            color: '#ffffff',
            textTransform: 'uppercase',
            textAlign: 'center',
            margin: 0,
            position: 'relative',
            zIndex: 6,
            marginBottom: 'clamp(-0.9rem, -2.2vw, -2.1rem)',
            mixBlendMode: 'difference',
            userSelect: 'none',
            pointerEvents: 'none',
            maxWidth: '100%',
          }}
        >
          NARVENT
        </motion.h1>

        {/* OUTER STAGE WRAPPER (Unclipped so the 3D Black Hole Singularity never gets cut off by overflow:hidden) */}
        <motion.div
          style={{
            y: stageY,
            position: 'relative',
            width: '100%',
            maxWidth: '960px',
            height: 'clamp(340px, 52vh, 510px)',
            zIndex: 3,
          }}
        >
          {/* Clipped Artwork Backdrop Frame */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: '#060712',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 35px 90px rgba(0, 0, 0, 0.9)',
              overflow: 'hidden',
              zIndex: 1,
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeRelease.id}
                initial={{ clipPath: 'inset(100% 0% 0% 0%)', scale: 1.08 }}
                animate={{ clipPath: 'inset(0% 0% 0% 0%)', scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  width: '100%',
                  height: '100%',
                }}
              >
                <img
                  src={activeRelease.coverImage}
                  alt={activeRelease.title}
                  width={960}
                  height={510}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center 35%',
                    filter: 'saturate(1.15) contrast(1.08)',
                    transform: `scale(1.04) translate3d(${mousePos.x * -10}px, ${mousePos.y * -10}px, 0)`,
                    transition: 'transform 0.35s ease-out',
                  }}
                />
                {/* Deep vignette blending artwork into the 3D Black Hole Singularity */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'radial-gradient(circle at 72% 50%, rgba(2, 2, 6, 0.86) 0%, rgba(4, 5, 14, 0.42) 48%, rgba(4, 5, 14, 0.85) 100%), linear-gradient(180deg, rgba(2, 2, 6, 0.48) 0%, transparent 35%, rgba(2, 2, 6, 0.92) 100%)',
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* UNCLIPPED 3D RELATIVISTIC BLACK HOLE SINGULARITY LAYER */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              right: '0%',
              transform: 'translateY(-50%)',
              width: 'clamp(260px, 56%, 540px)',
              height: 'clamp(280px, 114%, 560px)',
              zIndex: 3,
              pointerEvents: 'auto',
            }}
          >
            <CosmicResonator3D />
          </div>

          {/* Stage Foreground UI: Coordinates, Play Trigger, Era Switcher */}
          <div
            style={{
              position: 'relative',
              zIndex: 4,
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(1.25rem, 3vw, 2.25rem)',
              pointerEvents: 'none',
            }}
          >
            {/* Top Corner Frame Coordinates */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.66rem',
                letterSpacing: '0.16em',
                color: 'rgba(255, 255, 255, 0.72)',
                textTransform: 'uppercase',
              }}
            >
              <span>
                0{activeIndex + 1} / 0{showcaseReleases.length} // {formatReleaseDate(activeRelease.releaseDate, lang)}
              </span>
              <span style={{ color: 'var(--neon-magenta)' }}>SINGULARITY // +×</span>
            </div>

            {/* Bottom-Left Stage Overlay: Play Circle + Monumental Release Title */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                maxWidth: '520px',
                pointerEvents: 'auto',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    fontWeight: 600,
                    letterSpacing: '0.18em',
                    color: 'var(--electric-blue)',
                    textTransform: 'uppercase',
                    marginBottom: '0.35rem',
                  }}
                >
                  {t.hero.subtitle}
                </div>

                <div
                  onClick={() => setSelectedRelease(activeRelease)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '1rem',
                    cursor: 'pointer',
                  }}
                >
                  <button
                    aria-label={t.hero.listen}
                    className="mg-artwork-play-circle"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRelease(activeRelease);
                    }}
                  >
                    <Play size={18} fill="currentColor" />
                  </button>

                  <div style={{ minWidth: 0 }}>
                    <div
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.25rem, 2.8vw, 2.2rem)',
                        fontWeight: 900,
                        color: '#ffffff',
                        letterSpacing: '-0.03em',
                        lineHeight: 1,
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {activeRelease.title}
                    </div>
                    <div
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.84rem',
                        color: 'rgba(255, 255, 255, 0.78)',
                        marginTop: '0.25rem',
                      }}
                    >
                      — {activeRelease.artist}
                      {activeRelease.featuring ? ` ft. ${activeRelease.featuring.join(', ')}` : ''}
                    </div>
                  </div>
                </div>
              </div>

              {/* Era Switcher Pills inside Stage */}
              <div
                style={{
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
                        padding: '0.32rem 0.65rem',
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        fontWeight: 600,
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        background: isCurrent ? '#ffffff' : 'rgba(2, 2, 6, 0.65)',
                        color: isCurrent ? '#020206' : 'rgba(255, 255, 255, 0.65)',
                        border: isCurrent
                          ? '1px solid #ffffff'
                          : '1px solid rgba(255, 255, 255, 0.18)',
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
          </div>
        </motion.div>
      </div>

      {/* Bottom Anchored Bar (Exact Martin Garrix Layout: Left Navigation/Stats + Right Boxed Telemetry & Split CTA) */}
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
              <strong style={{ fontFamily: 'var(--font-display)', fontSize: '0.85rem', color: 'var(--neon-magenta)' }}>
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
