import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Play } from 'lucide-react';
import { releases, Release, formatReleaseDate } from '../data/releases';
import { useLanguage } from '../context/LanguageContext';
import ReleaseCover from '../components/ReleaseCover';
import ReleaseModal from '../components/ReleaseModal';
import { RevealText, RevealImage, ParallaxWatermark } from '../components/CinematicReveal';

export default function PopularReleases() {
  const { t, lang } = useLanguage();
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

  // Confirmed order of essential Narvent singles
  const rankingMeta: Record<string, { streamOrder: number }> = {
    'memory-reboot': { streamOrder: 310 },
    'fainted': { streamOrder: 85 },
    'her-eyes': { streamOrder: 65 },
    'distant-echoes': { streamOrder: 45 },
    'fade-into-darkness': { streamOrder: 25 },
  };

  const rankedTracks = useMemo(() => {
    const popularKeys = Object.keys(rankingMeta);
    return releases
      .filter((r) => popularKeys.includes(r.id) && r.type === 'single')
      .sort((a, b) => (rankingMeta[b.id]?.streamOrder || 0) - (rankingMeta[a.id]?.streamOrder || 0));
  }, []);

  return (
    <section
      id="popular"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 11vh, 9.5rem) 0',
        zIndex: 2,
      }}
    >
      {/* Drifting Kinetic Background Watermark */}
      <ParallaxWatermark text="ESSENTIAL HITS // RIAA GOLD" top="10%" speed={95} opacity={0.03} />

      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: 'clamp(3rem, 6vh, 4.5rem)' }}>
          <div className="editorial-kicker magenta">
            <span>03 // {t.popular.badge}</span>
          </div>
          <h2 className="editorial-title">
            <RevealText
              text={t.popular.title}
              serifWord={lang === 'ru' ? 'хиты' : 'Hits'}
            />
          </h2>
          <p className="editorial-subtitle">{t.popular.subtitle}</p>
        </div>

        {/* Architectural Editorial Tracklist */}
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {rankedTracks.map((release, index) => {
            const isTop = index === 0;
            return (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedRelease(release)}
                className="popular-track-row"
              >
                {/* Monumental Rank Index */}
                <div
                  className="track-rank"
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.35rem, 2.8vw, 2.35rem)',
                    fontWeight: 900,
                    color: isTop ? '#ffffff' : 'transparent',
                    WebkitTextStroke: isTop ? '0px' : '1.25px rgba(255, 255, 255, 0.42)',
                    letterSpacing: '-0.04em',
                    lineHeight: 1,
                  }}
                >
                  0{index + 1}
                </div>

                {/* Clip-Path Reveal Artwork */}
                <div className="track-cover" style={{ width: '100%', maxWidth: '104px' }}>
                  <RevealImage direction="left" delay={index * 0.05} parallax={0}>
                    <ReleaseCover release={release} size="100%" showDetails={false} />
                  </RevealImage>
                </div>

                {/* Track Title, Artist & Cultural Highlight */}
                <div className="track-info" style={{ minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      marginBottom: '0.25rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.1rem, 2.2vw, 1.65rem)',
                        fontWeight: 800,
                        color: '#ffffff',
                        letterSpacing: '-0.03em',
                        textTransform: 'uppercase',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {release.title}
                    </h3>

                    {isTop && (
                      <span
                        style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.62rem',
                          fontWeight: 600,
                          letterSpacing: '0.14em',
                          textTransform: 'uppercase',
                          color: 'var(--neon-magenta)',
                          border: '1px solid rgba(217, 70, 239, 0.45)',
                          padding: '0.18rem 0.55rem',
                        }}
                      >
                        RIAA GOLD // #13 BILLBOARD
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-ui)',
                      fontSize: 'clamp(0.84rem, 1.25vw, 0.96rem)',
                      color: '#cbd5e1',
                      fontWeight: 500,
                    }}
                  >
                    {release.artist}
                    {release.featuring && (
                      <span style={{ color: 'var(--electric-blue)' }}>
                        {' '}
                        ({t.popular.featWith} {release.featuring.join(', ')})
                      </span>
                    )}
                  </div>

                  {t.popular.highlights[release.id] && (
                    <div
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--text-dim)',
                        marginTop: '0.35rem',
                        letterSpacing: '0.03em',
                        lineHeight: 1.45,
                      }}
                    >
                      {t.popular.highlights[release.id]}
                    </div>
                  )}
                </div>

                {/* Right Column: Exact Date & Listen Action */}
                <div
                  className="track-action"
                  style={{
                    textAlign: 'right',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '0.5rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.68rem',
                      color: 'var(--text-muted)',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {t.popular.singleTag} // {formatReleaseDate(release.releaseDate, lang)}
                  </span>

                  <span className="btn-editorial listen-pill">
                    <Play size={11} fill="currentColor" />
                    <span>{t.popular.listen}</span>
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ReleaseModal
        release={selectedRelease}
        onClose={() => setSelectedRelease(null)}
      />
    </section>
  );
}
