import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Disc, ExternalLink, Flame } from 'lucide-react';
import { releases, Release } from '../data/releases';
import ReleaseCover from '../components/ReleaseCover';
import ReleaseModal from '../components/ReleaseModal';

export default function PopularReleases() {
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

  // Exact verified streaming order and data
  const rankingMeta: Record<string, { streams: string; highlight: string; streamOrder: number }> = {
    'memory-reboot': { streams: '310,000,000+ Streams', highlight: 'RIAA Gold Certified • Billboard Hot Dance #13 Peak', streamOrder: 310 },
    'insomnia': { streams: '120,000,000+ Streams', highlight: '13-Track Conceptual Studio Album featuring Fainted & Her Eyes', streamOrder: 120 },
    'fainted': { streams: '85,000,000+ Streams', highlight: 'Darkwave Drift Phonk Phenomenon', streamOrder: 85 },
    'her-eyes': { streams: '65,000,000+ Streams', highlight: 'Melodic Synthwave Viral Sensation', streamOrder: 65 },
    'distant-echoes': { streams: '45,000,000+ Streams', highlight: 'Collaborative Single with VXLLAIN & VØJ', streamOrder: 45 },
    'euphoria': { streams: '35,000,000+ Streams', highlight: 'Collaborative Masterpiece with VØJ & KoruSe', streamOrder: 35 },
    'fade-into-darkness': { streams: '25,000,000+ Streams', highlight: 'Nocturnal Atmospheric Anthem', streamOrder: 25 },
  };

  const rankedTracks = useMemo(() => {
    const popularKeys = Object.keys(rankingMeta);
    return releases
      .filter((r) => popularKeys.includes(r.id))
      .sort((a, b) => (rankingMeta[b.id]?.streamOrder || 0) - (rankingMeta[a.id]?.streamOrder || 0));
  }, []);

  return (
    <section
      id="popular"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vh, 9rem) 0',
        zIndex: 2,
      }}
    >
      <div className="container">
        {/* Header Block */}
        <div style={{ marginBottom: '3.5rem' }}>
          <span className="editorial-badge">
            <Trophy size={11} color="var(--electric-blue)" />
            GLOBAL MILESTONES // VERIFIED CATALOG METRICS
          </span>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '1.5rem',
            }}
          >
            <div>
              <h2 className="editorial-title">Most Streamed Frequencies</h2>
              <p className="editorial-subtitle">
                Certified records and defining anthems that shaped the modern wave phonk and dark synthwave cultural landscape worldwide.
              </p>
            </div>

            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.75rem',
                color: 'var(--text-dim)',
                letterSpacing: '0.1em',
              }}
            >
              [ORDERED BY VERIFIED GLOBAL STREAM VOLUME]
            </div>
          </div>
        </div>

        {/* Kinetic Horizontal Track Rows */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {rankedTracks.map((release, index) => {
            const meta = rankingMeta[release.id] || {
              streams: 'Millions of Streams',
              highlight: 'Official Narvent Catalog Highlight',
              streamOrder: 0,
            };

            return (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                onClick={() => setSelectedRelease(release)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'clamp(35px, 5vw, 55px) clamp(65px, 8vw, 85px) 1fr auto',
                  alignItems: 'center',
                  gap: 'clamp(0.75rem, 2vw, 2rem)',
                  background: 'var(--bg-glass)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border-line)',
                  borderRadius: '16px',
                  padding: 'clamp(0.85rem, 1.5vw, 1.25rem) clamp(1rem, 2vw, 2rem)',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.01) translateX(6px)';
                  e.currentTarget.style.borderColor = 'rgba(217, 70, 239, 0.4)';
                  e.currentTarget.style.background = 'var(--bg-glass-active)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.6), 0 0 25px rgba(217, 70, 239, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateX(0)';
                  e.currentTarget.style.borderColor = 'var(--border-line)';
                  e.currentTarget.style.background = 'var(--bg-glass)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Index number */}
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(1.2rem, 2.2vw, 1.6rem)',
                    fontWeight: 700,
                    color: index === 0 ? '#ffd166' : index === 1 ? '#d946ef' : 'var(--electric-blue)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  0{index + 1}
                </div>

                {/* Cover Preview */}
                <div style={{ width: '100%', maxWidth: '85px' }}>
                  <ReleaseCover release={release} size="100%" showDetails={false} />
                </div>

                {/* Track Title & Artist */}
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      marginBottom: '0.2rem',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
                        fontWeight: 700,
                        color: '#ffffff',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {release.title}
                    </h3>

                    {index === 0 && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          background: 'rgba(255, 209, 102, 0.12)',
                          border: '1px solid rgba(255, 209, 102, 0.35)',
                          color: '#ffd166',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.55rem',
                          borderRadius: '100px',
                          letterSpacing: '0.08em',
                        }}
                      >
                        <Flame size={10} />
                        VIRAL PHENOMENON
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 'clamp(0.8rem, 1.2vw, 0.92rem)',
                      color: 'var(--text-muted)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {release.artist}
                    {release.featuring && (
                      <span style={{ color: 'var(--electric-blue)' }}>
                        {' '}
                        (with {release.featuring.join(', ')})
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.68rem',
                      color: 'var(--text-dim)',
                      marginTop: '0.35rem',
                      letterSpacing: '0.06em',
                    }}
                  >
                    {meta.highlight}
                  </div>
                </div>

                {/* Right Column: Verified Streams */}
                <div
                  style={{
                    textAlign: 'right',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '0.3rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: 'clamp(0.85rem, 1.4vw, 1.05rem)',
                      color: '#ffffff',
                    }}
                  >
                    {meta.streams}
                  </div>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      color: 'var(--electric-blue)',
                      fontSize: '0.72rem',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    <Disc size={12} />
                    <span>INSPECT</span>
                    <ExternalLink size={10} />
                  </div>
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
