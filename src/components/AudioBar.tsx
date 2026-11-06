import { useState } from 'react';
import { Volume2, VolumeX, Disc3, X, Radio } from 'lucide-react';
import { ambientSound } from './AmbientSoundEngine';

export default function AudioBar() {
  const [isPlayingAmbient, setIsPlayingAmbient] = useState(false);
  const [showSpotifyEmbed, setShowSpotifyEmbed] = useState(false);

  const toggleSound = () => {
    const active = ambientSound.toggle();
    setIsPlayingAmbient(active);
  };

  return (
    <>
      {/* Floating Audio Controller */}
      <div
        className="audio-controller-bar"
        style={{
          position: 'fixed',
          bottom: 'calc(1.25rem + var(--safe-bottom, 0px))',
          right: '1.5rem',
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          background: 'rgba(6, 7, 18, 0.88)',
          backdropFilter: 'blur(24px)',
          WebkitBackdropFilter: 'blur(24px)',
          border: '1px solid var(--border-line)',
          padding: '0.45rem 0.75rem',
          borderRadius: '100px',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.7)',
        }}
      >
        {/* Ambient Soundscape Toggle */}
        <button
          onClick={toggleSound}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            padding: '0.35rem 0.75rem',
            borderRadius: '100px',
            background: isPlayingAmbient
              ? 'rgba(217, 70, 239, 0.22)'
              : 'rgba(255, 255, 255, 0.04)',
            border: isPlayingAmbient
              ? '1px solid rgba(217, 70, 239, 0.45)'
              : '1px solid transparent',
            color: isPlayingAmbient ? 'var(--neon-magenta)' : 'var(--text-muted)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
          title={isPlayingAmbient ? 'Выключить атмосферный звук' : 'Включить атмосферный звук'}
        >
          {isPlayingAmbient ? (
            <>
              <Volume2 size={14} />
              <span>ЗВУК ВКЛ</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '12px' }}>
                <span
                  style={{
                    width: '2px',
                    height: '8px',
                    background: 'var(--neon-magenta)',
                    animation: 'iridescentPulse 0.8s infinite alternate',
                  }}
                />
                <span
                  style={{
                    width: '2px',
                    height: '12px',
                    background: 'var(--neon-magenta)',
                    animation: 'iridescentPulse 1.2s infinite alternate',
                  }}
                />
                <span
                  style={{
                    width: '2px',
                    height: '6px',
                    background: 'var(--neon-magenta)',
                    animation: 'iridescentPulse 0.6s infinite alternate',
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <VolumeX size={14} />
              <span>ЭМБИЕНТ</span>
            </>
          )}
        </button>

        {/* Official Spotify Player Toggle */}
        <button
          onClick={() => setShowSpotifyEmbed(!showSpotifyEmbed)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.35rem 0.8rem',
            borderRadius: '100px',
            background: showSpotifyEmbed
              ? 'rgba(29, 185, 84, 0.22)'
              : 'rgba(255, 255, 255, 0.04)',
            border: showSpotifyEmbed
              ? '1px solid rgba(29, 185, 84, 0.45)'
              : '1px solid transparent',
            color: showSpotifyEmbed ? '#1db954' : 'var(--text-muted)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem',
            fontWeight: 600,
            letterSpacing: '0.06em',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
          title="Открыть официальный плеер Spotify"
        >
          <Radio size={13} />
          <span>ПЛЕЕР</span>
        </button>
      </div>

      {/* Embedded Spotify Official Drawer */}
      {showSpotifyEmbed && (
        <div
          style={{
            position: 'fixed',
            bottom: 'calc(4.75rem + var(--safe-bottom, 0px))',
            right: '1.5rem',
            zIndex: 45,
            width: 'clamp(290px, 90vw, 360px)',
            background: 'rgba(8, 9, 24, 0.95)',
            backdropFilter: 'blur(30px)',
            WebkitBackdropFilter: 'blur(30px)',
            border: '1px solid var(--border-line)',
            borderRadius: '20px',
            padding: '1rem',
            boxShadow: '0 25px 60px rgba(0,0,0,0.85)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.75rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid var(--border-line)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Disc3 size={15} color="#1db954" />
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  color: '#ffffff',
                }}
              >
                Официальный плеер Spotify
              </span>
            </div>
            <button
              onClick={() => setShowSpotifyEmbed(false)}
              style={{
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                background: 'none',
                border: 'none',
              }}
              aria-label="Закрыть плеер"
            >
              <X size={15} />
            </button>
          </div>

          <iframe
            style={{ borderRadius: '12px' }}
            src="https://open.spotify.com/embed/track/4oyDaL2r04O5s2zPevV03P?utm_source=generator&theme=0"
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Spotify Official Embed - Narvent"
          />
        </div>
      )}

      <style>{`
        @media (max-width: 900px) {
          .audio-controller-bar {
            right: auto !important;
            left: 50% !important;
            transform: translateX(-50%) !important;
            bottom: calc(0.85rem + var(--safe-bottom, 0px)) !important;
          }
        }
      `}</style>
    </>
  );
}
