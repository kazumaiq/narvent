import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Trophy, Disc, ExternalLink, Flame } from 'lucide-react';
import { getPopularReleases, Release } from '../data/releases';
import ReleaseCover from '../components/ReleaseCover';
import ReleaseModal from '../components/ReleaseModal';

export default function PopularReleases() {
  const popularTracks = getPopularReleases();
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

  // Verified ranking metadata
  const rankingMeta: Record<string, { streams: string; highlight: string }> = {
    'memory-reboot': { streams: '310,000,000+ Streams', highlight: 'RIAA Gold Certified • Billboard #13 Peak' },
    'memory-reboot-album': { streams: '450,000,000+ Streams', highlight: 'Full Collaborative Masterpiece with VØJ' },
    'fainted': { streams: '85,000,000+ Streams', highlight: 'Signature Drift & Darkwave Phonk Anthem' },
    'her-eyes': { streams: '65,000,000+ Streams', highlight: 'Melodic Synthwave Viral Sensation' },
    'distant-echoes': { streams: '45,000,000+ Streams', highlight: 'Featuring VXLLAIN & VØJ' },
    'euphoria': { streams: '35,000,000+ Streams', highlight: 'Featuring VØJ & KoruSe' },
    'insomnia': { streams: '120,000,000+ Streams', highlight: '13-Track Conceptual Studio Album' },
    'fade-into-darkness': { streams: '25,000,000+ Streams', highlight: 'Nocturnal Atmospheric Anthem' },
  };

  return (
    <section
      id="popular"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vh, 9rem) 0',
        zIndex: 2,
        background: 'linear-gradient(180deg, transparent 0%, rgba(10, 10, 30, 0.45) 50%, transparent 100%)',
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem', textAlign: 'center' }}>
          <span className="section-badge" style={{ margin: '0 auto 1.25rem' }}>
            <Trophy size={12} color="#ffd166" />
            GLOBAL MILESTONES // VERIFIED STREAMING DATA
          </span>
          <h2 className="section-title">Most Popular Tracks</h2>
          <p className="section-desc" style={{ margin: '0.75rem auto 0' }}>
            The defining soundscapes that resonated across hundreds of millions of listeners, certified charts, and internet subcultures globally.
          </p>
        </div>

        {/* Ranked Track List Cards */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            maxWidth: '1000px',
            margin: '0 auto',
          }}
        >
          {popularTracks.map((release, index) => {
            const meta = rankingMeta[release.id] || {
              streams: 'Millions of Streams',
              highlight: 'Official Narvent Catalog Highlight',
            };

            return (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setSelectedRelease(release)}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'clamp(40px, 6vw, 65px) clamp(65px, 10vw, 95px) 1fr auto',
                  alignItems: 'center',
                  gap: 'clamp(0.75rem, 2vw, 1.75rem)',
                  background: 'rgba(12, 12, 32, 0.6)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  borderRadius: '16px',
                  padding: 'clamp(0.75rem, 1.5vw, 1.25rem) clamp(1rem, 2.5vw, 2rem)',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.015) translateX(6px)';
                  e.currentTarget.style.borderColor = 'rgba(111, 147, 255, 0.45)';
                  e.currentTarget.style.background = 'rgba(20, 20, 48, 0.85)';
                  e.currentTarget.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 25px rgba(79, 117, 255, 0.18)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateX(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                  e.currentTarget.style.background = 'rgba(12, 12, 32, 0.6)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Rank Number */}
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                    fontWeight: 700,
                    color: index === 0 ? '#ffd166' : index === 1 ? '#e2d9f7' : '#7093ff',
                    letterSpacing: '-0.02em',
                  }}
                >
                  0{index + 1}
                </div>

                {/* Mini Cover Art */}
                <div style={{ width: '100%', maxWidth: '95px' }}>
                  <ReleaseCover release={release} size="100%" showDetails={false} />
                </div>

                {/* Track Details */}
                <div style={{ minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      marginBottom: '0.2rem',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(1rem, 2vw, 1.35rem)',
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
                          background: 'rgba(255, 209, 102, 0.15)',
                          border: '1px solid rgba(255, 209, 102, 0.35)',
                          color: '#ffd166',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.5rem',
                          borderRadius: '100px',
                          letterSpacing: '0.08em',
                        }}
                      >
                        <Flame size={10} />
                        GLOBAL VIRAL
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: 'clamp(0.8rem, 1.3vw, 0.92rem)',
                      color: 'rgba(212, 200, 245, 0.75)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {release.artist}
                    {release.featuring && (
                      <span style={{ color: '#7093ff' }}>
                        {' '}
                        (with {release.featuring.join(', ')})
                      </span>
                    )}
                  </div>

                  {/* Highlights badge */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.5rem',
                      marginTop: '0.35rem',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.7rem',
                        color: 'rgba(184, 169, 212, 0.65)',
                      }}
                    >
                      {meta.highlight}
                    </span>
                  </div>
                </div>

                {/* Right Column: Streams + Listen Action */}
                <div
                  style={{
                    textAlign: 'right',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '0.35rem',
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 700,
                      fontSize: 'clamp(0.85rem, 1.5vw, 1.05rem)',
                      color: '#ffffff',
                    }}
                  >
                    {meta.streams}
                  </div>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      color: '#7093ff',
                      fontSize: '0.75rem',
                      fontFamily: "'JetBrains Mono', monospace",
                    }}
                  >
                    <Disc size={13} />
                    <span>INSPECT</span>
                    <ExternalLink size={11} />
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
