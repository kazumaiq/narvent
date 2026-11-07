import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Calendar, Music, Sparkles } from 'lucide-react';
import { Release } from '../data/releases';
import ReleaseCover from './ReleaseCover';
import { useLanguage } from '../context/LanguageContext';

interface ReleaseModalProps {
  release: Release | null;
  onClose: () => void;
}

export default function ReleaseModal({ release, onClose }: ReleaseModalProps) {
  const { t, lang } = useLanguage();

  // Lock body scroll when modal is open, restore on close
  useEffect(() => {
    if (release) {
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = '0';
      document.body.style.right = '0';
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.position = '';
        document.body.style.top = '';
        document.body.style.left = '';
        document.body.style.right = '';
        document.body.style.overflow = '';
        window.scrollTo(0, scrollY);
      };
    }
  }, [release]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  if (!release) return null;

  return (
    <AnimatePresence>
      {/* Full-screen scroll wrapper — highest z-index above everything */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: 99999,
          overflowY: 'auto',
          WebkitOverflowScrolling: 'touch',
          overscrollBehavior: 'contain',
        }}
      >
        {/* Backdrop — click to close */}
        <div
          onClick={onClose}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(2, 2, 6, 0.94)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            zIndex: 0,
          }}
        />

        {/* Floating close button — always visible, fixed to viewport top-right */}
        <button
          onClick={onClose}
          aria-label={t.modal.close}
          style={{
            position: 'fixed',
            top: 'max(14px, env(safe-area-inset-top, 14px))',
            right: 'max(14px, env(safe-area-inset-right, 14px))',
            width: '46px',
            height: '46px',
            borderRadius: '50%',
            background: 'rgba(12, 14, 30, 0.95)',
            border: '1.5px solid rgba(217, 70, 239, 0.5)',
            color: '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s cubic-bezier(0.16, 1, 0.3, 1)',
            zIndex: 100002,
            boxShadow: '0 6px 25px rgba(0,0,0,0.8), 0 0 15px rgba(217, 70, 239, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = 'rgba(217, 70, 239, 0.4)';
            e.currentTarget.style.transform = 'scale(1.08)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'rgba(12, 14, 30, 0.95)';
            e.currentTarget.style.transform = 'scale(1)';
          }}
        >
          <X size={20} />
        </button>

        {/* Centering wrapper — provides generous padding so top/bottom are never cut off */}
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            minHeight: '100%',
            padding: 'max(60px, calc(env(safe-area-inset-top, 0px) + 55px)) clamp(0.75rem, 3vw, 1.75rem) max(40px, calc(env(safe-area-inset-bottom, 0px) + 40px))',
          }}
        >
          {/* Modal card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.94, y: 20 }}
            transition={{ type: 'spring', damping: 26, stiffness: 290 }}
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '840px',
              background: 'linear-gradient(135deg, rgba(12, 13, 34, 0.96) 0%, rgba(6, 7, 20, 0.98) 100%)',
              border: '1px solid rgba(217, 70, 239, 0.35)',
              borderRadius: '24px',
              boxShadow: '0 30px 80px rgba(0,0,0,0.9), 0 0 50px rgba(217, 70, 239, 0.15)',
              padding: 'clamp(1.5rem, 4vw, 3rem)',
            }}
          >
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(220px, 30vw, 320px), 1fr))',
                gap: 'clamp(1.5rem, 3.5vw, 2.75rem)',
                alignItems: 'start',
              }}
            >
              {/* Обложка релиза */}
              <div style={{ position: 'relative' }}>
                <ReleaseCover release={release} size="100%" showDetails={false} />
              </div>

              {/* Детали релиза */}
              <div>
                {/* Бейдж типа */}
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    padding: '0.35rem 0.85rem',
                    borderRadius: '100px',
                    background: 'rgba(217, 70, 239, 0.15)',
                    border: '1px solid rgba(217, 70, 239, 0.4)',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: 'var(--neon-magenta)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                  }}
                >
                  <Sparkles size={11} />
                  <span>
                    {release.type === 'album'
                      ? t.modal.album
                      : release.type === 'ep'
                      ? t.modal.ep
                      : t.modal.single}
                  </span>
                </div>

                {/* Название релиза */}
                <h2
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.75rem)',
                    fontWeight: 800,
                    color: '#ffffff',
                    lineHeight: 1.1,
                    letterSpacing: '-0.03em',
                    marginBottom: '0.5rem',
                  }}
                >
                  {release.title}
                </h2>

                {/* Дата и год */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.78rem',
                    color: 'var(--text-dim)',
                    marginBottom: '1.25rem',
                  }}
                >
                  <Calendar size={13} color="var(--electric-blue)" />
                  <span>
                    {t.modal.released}: {release.releaseDate} ({release.year})
                  </span>
                </div>

                {/* Артист и коллаборации */}
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.05rem',
                    color: 'var(--text-muted)',
                    marginBottom: '1.25rem',
                  }}
                >
                  {lang === 'ru' ? 'Исполнитель:' : 'Artist:'}{' '}
                  <strong style={{ color: '#ffffff' }}>{release.artist}</strong>
                  {release.featuring && release.featuring.length > 0 && (
                    <span style={{ color: 'var(--electric-blue)' }}>
                      {' '}
                      ({lang === 'ru' ? 'совместно с' : 'feat.'} {release.featuring.join(', ')})
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
                      {t.modal.tracklist} ({release.tracks.length})
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

                {/* Интерактивный плеер Spotify API */}
                <div style={{ marginTop: '1.25rem', marginBottom: '1.25rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.45rem',
                      marginBottom: '0.65rem',
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.68rem',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      color: '#1ed760',
                      fontWeight: 700,
                    }}
                  >
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        background: '#1ed760',
                        boxShadow: '0 0 8px #1ed760',
                      }}
                    />
                    <span>SPOTIFY API // {lang === 'ru' ? 'ПЛЕЕР РЕЛИЗА' : 'RELEASE PLAYER'}</span>
                  </div>

                  <iframe
                    style={{ borderRadius: '12px' }}
                    src={`https://open.spotify.com/embed/track/${release.spotifyId || '1Q68oodivzKjIDnPTXFy83'}?utm_source=generator&theme=0`}
                    width="100%"
                    height="152"
                    frameBorder="0"
                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                    loading="lazy"
                    title={`Spotify Player - ${release.title}`}
                  />
                </div>

                {/* Кнопки стриминга: Официальный Spotify */}
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
                    {t.modal.listenOn}
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
                  </div>
                </div>

                {/* Mobile Extra Friendly Close Button */}
                <button
                  onClick={onClose}
                  style={{
                    width: '100%',
                    padding: '0.85rem 1.25rem',
                    borderRadius: '14px',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.12)',
                    color: '#ffffff',
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    marginTop: '2rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(217, 70, 239, 0.2)';
                    e.currentTarget.style.borderColor = 'rgba(217, 70, 239, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                  }}
                >
                  <X size={15} />
                  <span>{lang === 'ru' ? 'ЗАКРЫТЬ ОКНО' : 'CLOSE WINDOW'}</span>
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
