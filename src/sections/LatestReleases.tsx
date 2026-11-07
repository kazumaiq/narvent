import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight, Play } from 'lucide-react';
import { getLatestReleases, Release, formatReleaseDate } from '../data/releases';
import { useLanguage } from '../context/LanguageContext';
import ReleaseCover from '../components/ReleaseCover';
import ReleaseModal from '../components/ReleaseModal';
import { RevealText, RevealImage, ParallaxWatermark } from '../components/CinematicReveal';

export default function LatestReleases() {
  const { t, lang } = useLanguage();
  const latestReleases = getLatestReleases().slice(0, 7);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const featured = latestReleases[0];
  const rest = latestReleases.slice(1);

  const getTypeLabel = (type: Release['type']) => {
    if (type === 'album') return t.latest.album;
    if (type === 'ep') return t.latest.ep;
    return t.latest.single;
  };

  return (
    <section
      id="latest"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 11vh, 9.5rem) 0',
        zIndex: 2,
      }}
    >
      {/* Drifting Kinetic Background Watermark */}
      <ParallaxWatermark text="RELEASES // 2026" top="6%" speed={-110} opacity={0.032} />

      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.5rem',
            marginBottom: 'clamp(3rem, 6vh, 4.5rem)',
          }}
        >
          <div>
            <div className="editorial-kicker">
              <span>02 // {t.latest.badge}</span>
            </div>
            <h2 className="editorial-title">
              <RevealText
                text={t.latest.title}
                serifWord={lang === 'ru' ? 'релизы' : 'Releases'}
              />
            </h2>
            <p className="editorial-subtitle">{t.latest.subtitle}</p>
          </div>

          <a href="#archive" className="btn-editorial">
            <span>{t.latest.viewAll3D}</span>
            <ArrowUpRight size={15} />
          </a>
        </div>

        {/* Flagship Newest Release — Asymmetric Editorial Spread */}
        {featured && (
          <div
            onClick={() => setSelectedRelease(featured)}
            className="latest-featured-spread"
            style={{ marginBottom: 'clamp(4rem, 8vh, 6.5rem)' }}
          >
            {/* Left Column: Large Artwork with Clip-Path Reveal & Scroll Parallax */}
            <div style={{ position: 'relative' }}>
              <RevealImage direction="left" parallax={18}>
                <ReleaseCover release={featured} size="100%" priority />
              </RevealImage>

              {/* Editorial Index Stamp */}
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'rgba(2, 2, 6, 0.85)',
                  backdropFilter: 'blur(12px)',
                  border: '1px solid rgba(217, 70, 239, 0.5)',
                  padding: '0.35rem 0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.66rem',
                  fontWeight: 600,
                  color: '#ffffff',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  zIndex: 2,
                }}
              >
                01 // {t.latest.newReleaseBadge}
              </div>
            </div>

            {/* Right Column: Monumental Typography & Metadata */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                gap: '1.1rem',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  gap: '0.75rem',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ color: 'var(--neon-magenta)', fontWeight: 600 }}>
                  {getTypeLabel(featured.type)}
                </span>
                <span style={{ color: 'rgba(255,255,255,0.22)' }}>//</span>
                <span style={{ color: 'var(--electric-blue)', fontWeight: 600 }}>
                  {formatReleaseDate(featured.releaseDate, lang)}
                </span>
                {featured.trackCount ? (
                  <>
                    <span style={{ color: 'rgba(255,255,255,0.22)' }}>//</span>
                    <span style={{ color: 'var(--text-muted)' }}>
                      {featured.trackCount} {t.latest.tracksSuffix}
                    </span>
                  </>
                ) : null}
              </div>

              <h3
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(2.1rem, 4.6vw, 4rem)',
                  fontWeight: 900,
                  color: '#ffffff',
                  lineHeight: 0.96,
                  letterSpacing: '-0.04em',
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                <RevealText text={featured.title} />
              </h3>

              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 'clamp(1rem, 1.5vw, 1.2rem)',
                  fontWeight: 600,
                  color: '#e2e8f0',
                }}
              >
                {featured.artist}
                {featured.featuring && (
                  <span style={{ color: 'var(--electric-blue)' }}>
                    {' '}
                    {t.latest.featWith} {featured.featuring.join(', ')}
                  </span>
                )}
              </div>

              {featured.description && (
                <p
                  style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: 'clamp(0.9rem, 1.25vw, 1.02rem)',
                    color: 'var(--text-muted)',
                    lineHeight: 1.65,
                    maxWidth: '520px',
                    margin: 0,
                  }}
                >
                  {featured.description}
                </p>
              )}

              <div style={{ marginTop: '0.65rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span className="btn-editorial primary">
                  <Play size={14} fill="currentColor" />
                  <span>{t.latest.listenRelease}</span>
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Staggered Asymmetric Editorial Release Grid (Chronological Newest-First) */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              paddingBottom: '0.85rem',
              borderBottom: '1px solid var(--border-line)',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-muted)',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
              }}
            >
              {t.latest.otherReleases} // 02—0{rest.length + 1}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.68rem',
                color: 'var(--electric-blue)',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
              }}
            >
              2025—2026
            </span>
          </div>

          <div className="editorial-releases-grid">
            {rest.map((release, index) => (
              <motion.article
                key={release.id}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: (index % 3) * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedRelease(release)}
                className="editorial-release-card"
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                {/* Top Index & Date Bar */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.68rem',
                    letterSpacing: '0.14em',
                    textTransform: 'uppercase',
                    paddingBottom: '0.6rem',
                    marginBottom: '0.75rem',
                    borderBottom: '1px solid var(--border-line)',
                  }}
                >
                  <span style={{ color: 'var(--text-dim)', fontWeight: 600 }}>
                    0{index + 2} // {getTypeLabel(release.type)}
                  </span>
                  <span style={{ color: 'var(--electric-blue)', fontWeight: 500 }}>
                    {formatReleaseDate(release.releaseDate, lang)}
                  </span>
                </div>

                {/* Large Cover with Clip-Path Reveal */}
                <RevealImage
                  direction="up"
                  delay={(index % 3) * 0.06}
                  parallax={index % 2 === 0 ? 10 : -10}
                  style={{ marginBottom: '1.1rem' }}
                >
                  <ReleaseCover release={release} size="100%" />
                </RevealImage>

                {/* Title & Artist + Listen Button */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '0.85rem',
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.15rem, 1.9vw, 1.5rem)',
                        fontWeight: 800,
                        color: '#ffffff',
                        letterSpacing: '-0.025em',
                        lineHeight: 1.1,
                        textTransform: 'uppercase',
                        margin: '0 0 0.3rem 0',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {release.title}
                    </h4>
                    <p
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.84rem',
                        color: 'var(--text-muted)',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {release.artist}
                      {release.featuring && (
                        <span style={{ color: 'var(--electric-blue)' }}>
                          {' '}
                          ft. {release.featuring.join(', ')}
                        </span>
                      )}
                    </p>
                  </div>

                  <span className="btn-editorial listen-pill" style={{ flexShrink: 0 }}>
                    {t.latest.listenRelease}
                  </span>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <ReleaseModal
        release={selectedRelease}
        onClose={() => setSelectedRelease(null)}
      />
    </section>
  );
}
