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
        {/* Header Block */}
        <div style={{ marginBottom: '3.5rem' }}>
          <span className="editorial-badge">
            <Sparkles size={11} color="var(--electric-blue)" />
            FRESH TRANSMISSIONS // 2025–2026
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
              <h2 className="editorial-title">Latest Releases</h2>
              <p className="editorial-subtitle">
                The newest sonic chapters from the digital realm, expanding Narvent's atmospheric universe across multi-track albums, conceptual EPs, and collaborations.
              </p>
            </div>

            <a
              href="#archive"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--electric-blue)',
                letterSpacing: '0.04em',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--electric-blue)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <span>EXPLORE ALL IN 3D</span>
              <ChevronRight size={15} />
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
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.6, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
              onClick={() => setSelectedRelease(release)}
              style={{
                position: 'relative',
                background: 'var(--bg-glass)',
                backdropFilter: 'blur(20px)',
                border: '1px solid var(--border-line)',
                borderRadius: '20px',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-6px)';
                e.currentTarget.style.borderColor = 'rgba(217, 70, 239, 0.4)';
                e.currentTarget.style.boxShadow = '0 20px 45px rgba(0, 0, 0, 0.7), 0 0 30px rgba(217, 70, 239, 0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'var(--border-line)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Cover Art */}
              <div style={{ position: 'relative', borderRadius: '14px', overflow: 'hidden' }}>
                <ReleaseCover release={release} size="100%" />

                {/* Subtle Hover Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(2, 2, 6, 0.55)',
                    opacity: 0,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'opacity 0.25s ease',
                    borderRadius: '14px',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                >
                  <span
                    style={{
                      background: 'rgba(217, 70, 239, 0.85)',
                      padding: '0.45rem 1.1rem',
                      borderRadius: '100px',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.78rem',
                      fontWeight: 600,
                      color: '#ffffff',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                    }}
                  >
                    <Disc size={14} />
                    VIEW RELEASE
                  </span>
                </div>
              </div>

              {/* Release Card Meta */}
              <div style={{ marginTop: '1.25rem' }}>
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
                      color: 'var(--electric-blue)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.12em',
                      fontWeight: 600,
                    }}
                  >
                    {release.type}
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.72rem',
                      color: 'var(--text-dim)',
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
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '0.88rem',
                    color: 'var(--text-muted)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginBottom: '1rem',
                  }}
                >
                  {release.artist}
                  {release.featuring && (
                    <span style={{ color: 'var(--electric-blue)' }}>
                      {' '}ft. {release.featuring.join(', ')}
                    </span>
                  )}
                </p>

                {/* Card Footer */}
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingTop: '0.75rem',
                    borderTop: '1px solid var(--border-line)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.7rem',
                      color: 'var(--text-dim)',
                    }}
                  >
                    {release.trackCount ? `${release.trackCount} Tracks` : 'Official Master'}
                  </span>

                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      color: 'var(--electric-blue)',
                      fontSize: '0.75rem',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                    }}
                  >
                    Details
                    <ExternalLink size={12} />
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <ReleaseModal
        release={selectedRelease}
        onClose={() => setSelectedRelease(null)}
      />
    </section>
  );
}
