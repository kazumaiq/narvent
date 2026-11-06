import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Disc, Calendar, Music, Sparkles } from 'lucide-react';
import { Release } from '../data/releases';
import ReleaseCover from './ReleaseCover';

interface ReleaseModalProps {
  release: Release | null;
  onClose: () => void;
}

export default function ReleaseModal({ release, onClose }: ReleaseModalProps) {
  if (!release) return null;

  return (
    <AnimatePresence>
      <div
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 100,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '1.5rem',
        }}
      >
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(3, 3, 10, 0.85)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
          }}
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 25, stiffness: 280 }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '820px',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: 'linear-gradient(135deg, rgba(16, 16, 42, 0.94) 0%, rgba(9, 9, 24, 0.96) 100%)',
            border: '1px solid rgba(111, 147, 255, 0.3)',
            borderRadius: '24px',
            boxShadow: '0 25px 70px rgba(0,0,0,0.85), 0 0 40px rgba(79, 117, 255, 0.2)',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            zIndex: 101,
          }}
        >
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
              e.currentTarget.style.transform = 'scale(1.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            <X size={20} />
          </button>

          {/* Grid Layout: Artwork Left, Details Right */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '2.5rem',
              alignItems: 'center',
            }}
          >
            {/* Artwork presentation */}
            <div style={{ maxWidth: '340px', margin: '0 auto', width: '100%' }}>
              <ReleaseCover release={release} size="100%" />
            </div>

            {/* Info Column */}
            <div>
              {/* Type Badge & Year */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  marginBottom: '0.75rem',
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.75rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.15em',
                    color: '#7093ff',
                    background: 'rgba(79, 117, 255, 0.12)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '100px',
                    border: '1px solid rgba(79, 117, 255, 0.25)',
                  }}
                >
                  {release.type}
                </span>

                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.75rem',
                    color: 'rgba(195, 180, 224, 0.65)',
                  }}
                >
                  <Calendar size={13} />
                  {release.releaseDate}
                </span>

                {release.popular && (
                  <span
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.3rem',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.72rem',
                      color: '#ffd166',
                      background: 'rgba(255, 209, 102, 0.12)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '100px',
                      border: '1px solid rgba(255, 209, 102, 0.25)',
                    }}
                  >
                    <Sparkles size={12} />
                    TOP TRACK
                  </span>
                )}
              </div>

              {/* Title */}
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                  fontWeight: 700,
                  letterSpacing: '-0.02em',
                  color: '#ffffff',
                  lineHeight: 1.1,
                  marginBottom: '0.5rem',
                }}
              >
                {release.title}
              </h2>

              {/* Artists & Collaborators */}
              <div
                style={{
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '1.05rem',
                  color: 'rgba(212, 200, 245, 0.85)',
                  marginBottom: '1.25rem',
                }}
              >
                By <strong style={{ color: '#ffffff' }}>{release.artist}</strong>
                {release.featuring && release.featuring.length > 0 && (
                  <span style={{ color: '#7093ff' }}>
                    {' '}
                    (with {release.featuring.join(', ')})
                  </span>
                )}
              </div>

              {/* Description */}
              {release.description && (
                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.92rem',
                    color: 'rgba(180, 180, 210, 0.85)',
                    lineHeight: 1.65,
                    marginBottom: '1.5rem',
                  }}
                >
                  {release.description}
                </p>
              )}

              {/* Tracklist Preview if album/ep */}
              {release.tracks && release.tracks.length > 0 && (
                <div style={{ marginBottom: '1.75rem' }}>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.75rem',
                      letterSpacing: '0.12em',
                      textTransform: 'uppercase',
                      color: 'rgba(195, 180, 224, 0.7)',
                      marginBottom: '0.6rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <Music size={13} />
                    Key Tracklist ({release.tracks.length} tracks)
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '0.4rem',
                    }}
                  >
                    {release.tracks.map((track, i) => (
                      <span
                        key={track}
                        style={{
                          fontFamily: "'Inter', sans-serif",
                          fontSize: '0.8rem',
                          background: 'rgba(255, 255, 255, 0.05)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          padding: '0.3rem 0.7rem',
                          borderRadius: '8px',
                          color: '#e0d8f0',
                        }}
                      >
                        <span style={{ color: '#7093ff', marginRight: '6px' }}>
                          0{i + 1}
                        </span>
                        {track}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Streaming Buttons */}
              <div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.72rem',
                    letterSpacing: '0.12em',
                    textTransform: 'uppercase',
                    color: 'rgba(195, 180, 224, 0.65)',
                    marginBottom: '0.75rem',
                  }}
                >
                  Listen on Official Platforms
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.65rem' }}>
                  {release.links.spotify && (
                    <a
                      href={release.links.spotify}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.6rem 1.1rem',
                        borderRadius: '100px',
                        background: 'rgba(29, 185, 84, 0.15)',
                        border: '1px solid rgba(29, 185, 84, 0.4)',
                        color: '#1db954',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(29, 185, 84, 0.25)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(29, 185, 84, 0.15)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      <Disc size={15} />
                      Spotify
                      <ExternalLink size={13} />
                    </a>
                  )}

                  {release.links.youtube && (
                    <a
                      href={release.links.youtube}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.6rem 1.1rem',
                        borderRadius: '100px',
                        background: 'rgba(255, 0, 0, 0.12)',
                        border: '1px solid rgba(255, 0, 0, 0.35)',
                        color: '#ff4d4d',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 0, 0, 0.22)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(255, 0, 0, 0.12)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      YouTube Music
                      <ExternalLink size={13} />
                    </a>
                  )}

                  {release.links.appleMusic && (
                    <a
                      href={release.links.appleMusic}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.6rem 1.1rem',
                        borderRadius: '100px',
                        background: 'rgba(252, 60, 68, 0.12)',
                        border: '1px solid rgba(252, 60, 68, 0.35)',
                        color: '#fc5b63',
                        fontFamily: "'Inter', sans-serif",
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        transition: 'all 0.2s',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(252, 60, 68, 0.22)';
                        e.currentTarget.style.transform = 'translateY(-2px)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(252, 60, 68, 0.12)';
                        e.currentTarget.style.transform = 'translateY(0)';
                      }}
                    >
                      Apple Music
                      <ExternalLink size={13} />
                    </a>
                  )}

                  <a
                    href="https://soundcloud.com/musicofnarvent"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.6rem 1.1rem',
                      borderRadius: '100px',
                      background: 'rgba(255, 119, 0, 0.12)',
                      border: '1px solid rgba(255, 119, 0, 0.35)',
                      color: '#ff8833',
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      transition: 'all 0.2s',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 119, 0, 0.22)';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(255, 119, 0, 0.12)';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    SoundCloud
                    <ExternalLink size={13} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
