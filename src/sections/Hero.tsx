import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Disc3, Play, ArrowUpRight } from 'lucide-react';
import CosmicResonator3D from '../scenes/CosmicResonator3D';
import ReleaseModal from '../components/ReleaseModal';
import { RevealText, RevealImage, ParallaxWatermark } from '../components/CinematicReveal';
import { getLatestReleases, Release, formatReleaseDate } from '../data/releases';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t, lang } = useLanguage();
  const latestRelease = getLatestReleases()[0];
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

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

  // Differential scroll parallax (no hard opacity cutoffs)
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 900], [0, 95]);
  const resonatorY = useTransform(scrollY, [0, 900], [0, -65]);

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
        alignItems: 'center',
        paddingTop: 'clamp(5.5rem, 11vh, 8rem)',
        paddingBottom: 'clamp(4rem, 8vh, 6.5rem)',
        zIndex: 2,
        /* No vertical overflow:hidden so radial atmospheric light never clips in a straight line */
      }}
    >
      {/* Large Drifting Kinetic Background Watermark */}
      <ParallaxWatermark text="NARVENT // SYNTHWAVE" top="14%" speed={-90} opacity={0.032} />

      {/* Feathered Cosmic Nebula Illumination — smoothly fades to 0% well before section edges */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          right: '6%',
          width: 'clamp(260px, 38vw, 520px)',
          height: 'clamp(260px, 38vw, 520px)',
          borderRadius: '50%',
          background:
            'radial-gradient(circle, rgba(217, 70, 239, 0.11) 0%, rgba(56, 189, 248, 0.05) 38%, rgba(2, 2, 6, 0) 70%)',
          transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, 0)`,
          transition: 'transform 0.45s ease-out',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        className="container-wide"
        style={{
          width: '100%',
          y: contentY,
        }}
      >
        <div className="hero-editorial-grid">
          {/* Left Column: Monumental Typography + Featured Release Spotlight + Editorial CTAs */}
          <div
            style={{
              position: 'relative',
              zIndex: 3,
              minWidth: 0,
              width: '100%',
              maxWidth: '100%',
            }}
          >
            {/* Architectural Index Kicker */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="editorial-kicker magenta"
            >
              <span>01 // {t.hero.badge}</span>
            </motion.div>

            {/* Monumental Display Heading */}
            <h1
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'var(--fs-display)',
                fontWeight: 900,
                letterSpacing: '-0.045em',
                lineHeight: 0.92,
                color: '#ffffff',
                textTransform: 'uppercase',
                margin: '0 0 1.15rem 0',
                wordBreak: 'keep-all',
              }}
            >
              <RevealText text="NARVENT" stagger={0.06} />
            </h1>

            {/* High-Contrast Editorial Subtitle with Cormorant Garamond Italic Accent */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.85, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-ui)',
                fontSize: 'clamp(1.15rem, 2.3vw, 1.85rem)',
                fontWeight: 500,
                color: '#e2e8f0',
                lineHeight: 1.32,
                letterSpacing: '-0.02em',
                marginBottom: '1.75rem',
                maxWidth: '620px',
              }}
            >
              {lang === 'ru' ? (
                <>
                  Кинематографичный{' '}
                  <span className="editorial-serif-accent" style={{ color: '#f0abfc' }}>
                    синтвейв
                  </span>{' '}
                  и ночная электронная музыка.
                </>
              ) : (
                <>
                  Cinematic{' '}
                  <span className="editorial-serif-accent" style={{ color: '#f0abfc' }}>
                    synthwave
                  </span>{' '}
                  &amp; nocturnal electronic music.
                </>
              )}
            </motion.div>

            {/* Mobile 3D Cosmic Resonator */}
            <div
              className="mobile-only"
              style={{
                width: '100%',
                height: 'clamp(210px, 30vh, 260px)',
                margin: '0.25rem 0 1.5rem 0',
                position: 'relative',
              }}
            >
              <CosmicResonator3D />
            </div>

            {/* Asymmetric Featured Release Editorial Spotlight */}
            {latestRelease && (
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.85, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedRelease(latestRelease)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'clamp(72px, 10vw, 92px) minmax(0, 1fr) auto',
                  alignItems: 'center',
                  gap: 'clamp(0.85rem, 2vw, 1.35rem)',
                  padding: 'clamp(0.85rem, 1.8vw, 1.15rem)',
                  background: 'rgba(8, 9, 22, 0.72)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  borderTop: '1px solid rgba(255, 255, 255, 0.16)',
                  borderBottom: '1px solid rgba(255, 255, 255, 0.16)',
                  borderLeft: '2px solid var(--neon-magenta)',
                  maxWidth: '560px',
                  marginBottom: '2.25rem',
                  cursor: 'pointer',
                  transition: 'background 0.35s ease, border-color 0.35s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(18, 20, 44, 0.85)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(8, 9, 22, 0.72)';
                }}
              >
                {/* Clip-Path Reveal Artwork */}
                <RevealImage
                  direction="left"
                  parallax={0}
                  style={{
                    width: '100%',
                    aspectRatio: '1 / 1',
                    position: 'relative',
                    background: '#090a18',
                  }}
                >
                  <img
                    src={latestRelease.coverImage}
                    alt={latestRelease.title}
                    width={92}
                    height={92}
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(2, 2, 6, 0.28)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Play size={18} color="#ffffff" fill="#ffffff" />
                  </div>
                </RevealImage>

                {/* Editorial Release Metadata */}
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.66rem',
                      fontWeight: 600,
                      color: 'var(--neon-magenta)',
                      letterSpacing: '0.14em',
                      textTransform: 'uppercase',
                      marginBottom: '0.25rem',
                    }}
                  >
                    {t.hero.latestReleaseTag} // {formatReleaseDate(latestRelease.releaseDate, lang)}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
                      fontWeight: 800,
                      color: '#ffffff',
                      letterSpacing: '-0.02em',
                      textTransform: 'uppercase',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {latestRelease.title}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--text-muted)',
                      marginTop: '0.15rem',
                    }}
                  >
                    {latestRelease.artist}
                    {latestRelease.trackCount ? ` • ${latestRelease.trackCount} ${t.hero.tracksCount}` : ''}
                  </div>
                </div>

                {/* Listen Button */}
                <span className="btn-editorial listen-pill" style={{ flexShrink: 0 }}>
                  {t.hero.listen}
                </span>
              </motion.div>
            )}

            {/* Architectural Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.38, ease: [0.16, 1, 0.3, 1] }}
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.75rem',
                alignItems: 'center',
                width: '100%',
              }}
            >
              <button onClick={() => scrollTo('archive')} className="btn-editorial primary">
                <Disc3 size={15} />
                <span>{t.hero.cta3D}</span>
              </button>

              <button onClick={() => scrollTo('popular')} className="btn-editorial">
                <Play size={13} />
                <span>{t.hero.ctaPopular}</span>
              </button>

              <a
                href="https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-editorial"
              >
                <span>{t.hero.ctaSpotify}</span>
                <ArrowUpRight size={14} />
              </a>
            </motion.div>
          </div>

          {/* Right Column: Interactive 3D Cosmic Resonator (Desktop) */}
          <motion.div
            className="desktop-only"
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(500px, 62vh, 720px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              y: resonatorY,
              transform: `translate3d(${mousePos.x * -16}px, ${mousePos.y * -16}px, 0)`,
              transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <CosmicResonator3D />
          </motion.div>
        </div>
      </motion.div>

      {/* Release Modal */}
      <ReleaseModal
        release={selectedRelease}
        onClose={() => setSelectedRelease(null)}
      />
    </section>
  );
}
