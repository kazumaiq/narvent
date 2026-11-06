import { useState } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, Disc, ChevronRight } from 'lucide-react';
import { getLatestReleases, Release } from '../data/releases';
import ReleaseCover from '../components/ReleaseCover';
import ReleaseModal from '../components/ReleaseModal';

export default function LatestReleases() {
  const latestReleases = getLatestReleases().slice(0, 6);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

  return (
    <section
      id="music"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vh, 9rem) 0',
        zIndex: 2,
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: '3.5rem' }}>
          <span className="section-badge">
            <Sparkles size={12} color="#7093ff" />
            FRESH SONIC DROPS // 2025–2026
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
              <h2 className="section-title">Latest Releases</h2>
              <p className="section-desc" style={{ marginTop: '0.75rem' }}>
                Recent sonic transmissions from the digital realm, spanning full-length albums, conceptual EPs, and atmospheric collaborations.
              </p>
            </div>

            <a
              href="#archive"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.88rem',
                fontWeight: 600,
                color: '#7093ff',
                letterSpacing: '0.05em',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#7093ff';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <span>VIEW FULL ARCHIVE</span>
              <ChevronRight size={16} />
            </a>
          </div>
        </div>

        {/* Releases Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(280px, 30vw, 360px), 1fr))',
            gap: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        >
          {latestReleases.map((release, index) => (
            <motion.div
              key={release.id}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedRelease(release)}
              style={{
                position: 'relative',
                background: 'rgba(12, 12, 32, 0.55)',
                backdropFilter: 'blur(16px)',
                WebkitBackdropFilter: 'blur(16px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '20px',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.borderColor = 'rgba(111, 147, 255, 0.45)';
                e.currentTarget.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.6), 0 0 30px rgba(79, 117, 255, 0.2)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Cover Art */}
              <div style={{ position: 'relative', borderRadius: '12px', overflow: 'hidden' }}>
                <ReleaseCover release={release} size="100%" />

                {/* Hover overlay hint */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(5, 5, 20, 0.5)',
                    opacity: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'opacity 0.3s',
                    borderRadius: '12px',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                >
                  <span
                    style={{
                      background: 'rgba(79, 117, 255, 0.85)',
                      padding: '0.45rem 1rem',
                      borderRadius: '100px',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <Disc size={14} />
                    INSPECT DETAILS
                  </span>
                </div>
              </div>

              {/* Release Card Meta */}
              <div style={{ marginTop: '1.2rem' }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '0.4rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.72rem',
                      color: '#7093ff',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                    }}
                  >
                    {release.type}
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.72rem',
                      color: 'rgba(184, 169, 212, 0.65)',
                    }}
                  >
                    {release.releaseDate}
                  </span>
                </div>

                <h3
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    lineHeight: 1.2,
                    marginBottom: '0.25rem',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {release.title}
                </h3>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.88rem',
                    color: 'rgba(212, 200, 245, 0.75)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginBottom: '1rem',
                  }}
                >
                  {release.artist}
                  {release.featuring && (
                    <span style={{ color: 'rgba(170, 190, 255, 0.75)' }}>
                      {' '}ft. {release.featuring.join(', ')}
                    </span>
                  )}
                </p>

                {/* Quick Listen Button */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.7rem',
                      color: 'rgba(184, 169, 212, 0.55)',
                    }}
                  >
                    {release.trackCount ? `${release.trackCount} Tracks` : 'Official Single'}
                  </span>

                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      color: '#7093ff',
                      fontSize: '0.75rem',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Listen
                    <ExternalLink size={12} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Selected Release Inspector Modal */}
      <ReleaseModal
        release={selectedRelease}
        onClose={() => setSelectedRelease(null)}
      />
    </section>
  );
}
