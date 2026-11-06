import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, Music, Sparkles } from 'lucide-react';
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
          padding: '1.25rem',
        }}
      >
        {/* Затемнение фона */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{
            position: 'absolute',
            inset: 0,
            background: 'rgba(2, 2, 6, 0.9)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
          }}
        />

        {/* Окно модалки */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 25 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.94, y: 20 }}
          transition={{ type: 'spring', damping: 26, stiffness: 290 }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '840px',
            maxHeight: '90vh',
            overflowY: 'auto',
            background: 'linear-gradient(135deg, rgba(12, 13, 34, 0.96) 0%, rgba(6, 7, 20, 0.98) 100%)',
            border: '1px solid rgba(217, 70, 239, 0.35)',
            borderRadius: '24px',
            boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 50px rgba(217, 70, 239, 0.15)',
            padding: 'clamp(1.5rem, 4vw, 3rem)',
            zIndex: 101,
          }}
        >
          {/* Кнопка закрытия */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '1.25rem',
              right: '1.25rem',
              width: '42px',
              height: '42px',
              borderRadius: '50%',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-line)',
              color: 'var(--text-muted)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(217, 70, 239, 0.2)';
              e.currentTarget.style.color = '#ffffff';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.color = 'var(--text-muted)';
            }}
            aria-label="Закрыть окно"
          >
            <X size={18} />
          </button>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: 'clamp(1.5rem, 3vw, 2.5rem)',
              alignItems: 'start',
            }}
          >
            {/* Обложка релиза */}
            <div>
              <div
                style={{
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 20px 45px rgba(0,0,0,0.7)',
                }}
              >
                <ReleaseCover release={release} size="100%" showDetails={false} />
              </div>
            </div>

            {/* Метаданные и ссылки */}
            <div>
              {/* Бейджи */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  flexWrap: 'wrap',
                  marginBottom: '1rem',
                }}
              >
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.72rem',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    color: 'var(--neon-magenta)',
                    background: 'rgba(217, 70, 239, 0.1)',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '100px',
                    border: '1px solid rgba(217, 70, 239, 0.25)',
                    fontWeight: 600,
                  }}
                >
                  {release.type === 'album' ? 'АЛЬБОМ' : release.type === 'ep' ? 'EP' : 'СИНГЛ'}
                </span>

                <span
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.75rem',
                    color: 'var(--text-dim)',
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
                      background: 'rgba(255, 209, 102, 0.1)',
                      padding: '0.2rem 0.6rem',
                      borderRadius: '100px',
                      border: '1px solid rgba(255, 209, 102, 0.25)',
                      fontWeight: 600,
                    }}
                  >
                    <Sparkles size={11} />
                    ТОП РЕЛИЗ
                  </span>
                )}
              </div>

              {/* Название */}
              <h2
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.03em',
                  color: '#ffffff',
                  lineHeight: 1.1,
                  marginBottom: '0.45rem',
                }}
              >
                {release.title}
              </h2>

              {/* Артисты */}
              <div
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '1.05rem',
                  color: 'var(--text-muted)',
                  marginBottom: '1.25rem',
                }}
              >
                Исполнитель: <strong style={{ color: '#ffffff' }}>{release.artist}</strong>
                {release.featuring && release.featuring.length > 0 && (
                  <span style={{ color: 'var(--electric-blue)' }}>
                    {' '}
                    (совместно с {release.featuring.join(', ')})
                  </span>
                )}
              </div>

              {/* Описание */}
              {release.description && (
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '0.92rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.65,
                    marginBottom: '1.5rem',
                  }}
                >
                  {release.description}
                </p>
              )}

              {/* Треклист */}
              {release.tracks && release.tracks.length > 0 && (
                <div style={{ marginBottom: '1.75rem' }}>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.72rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: 'var(--text-dim)',
                      marginBottom: '0.6rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.4rem',
                    }}
                  >
                    <Music size={12} />
                    Избранные композиции ({release.tracks.length} треков)
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {release.tracks.map((track, i) => (
                      <span
                        key={track}
                        style={{
                          fontFamily: "'Manrope', sans-serif",
                          fontSize: '0.8rem',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--border-line)',
                          padding: '0.3rem 0.7rem',
                          borderRadius: '8px',
                          color: '#e2e8f0',
                        }}
                      >
                        <span style={{ color: 'var(--neon-magenta)', marginRight: '6px' }}>
                          0{i + 1}
                        </span>
                        {track}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Кнопки стриминга */}
              <div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.7rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    color: 'var(--text-dim)',
                    marginBottom: '0.75rem',
                  }}
                >
                  Слушать на официальных площадках
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
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        transition: 'all 0.2s',
                        textDecoration: 'none',
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
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        transition: 'all 0.2s',
                        textDecoration: 'none',
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
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '0.82rem',
                        fontWeight: 600,
                        transition: 'all 0.2s',
                        textDecoration: 'none',
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
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      transition: 'all 0.2s',
                      textDecoration: 'none',
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
