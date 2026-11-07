import { useState } from 'react';
import { Volume2, VolumeX, Disc3, X, Radio } from 'lucide-react';
import { ambientSound } from './AmbientSoundEngine';
import { useLanguage } from '../context/LanguageContext';

export default function AudioBar() {
  const [isPlayingAmbient, setIsPlayingAmbient] = useState(false);
  const [showSpotifyEmbed, setShowSpotifyEmbed] = useState(false);
  const { t } = useLanguage();

  const toggleSound = () => {
    const active = ambientSound.toggle();
    setIsPlayingAmbient(active);
  };

  return (
    <>
      {/* Architectural Audio Controller Bar */}
      <div
        className="audio-controller-bar"
        style={{
          position: 'fixed',
          bottom: 'calc(0.9rem + var(--safe-bottom, 0px))',
          right: 'clamp(1rem, 4vw, 3.5rem)',
          zIndex: 40,
          display: 'inline-flex',
          alignItems: 'stretch',
          background: 'rgba(4, 5, 14, 0.92)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.22)',
          boxShadow: '0 12px 35px rgba(0, 0, 0, 0.85)',
        }}
      >
        {/* Ambient Soundscape Toggle */}
        <button
          onClick={toggleSound}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.42rem 0.85rem',
            background: isPlayingAmbient ? '#ffffff' : 'transparent',
            color: isPlayingAmbient ? '#020206' : 'rgba(255, 255, 255, 0.78)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.66rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
          }}
          title={isPlayingAmbient ? 'Выключить атмосферный звук' : 'Включить атмосферный звук'}
        >
          {isPlayingAmbient ? <Volume2 size={13} /> : <VolumeX size={13} />}
          <span>{isPlayingAmbient ? t.audioBar.soundOn : t.audioBar.ambient}</span>
        </button>

        {/* Official Spotify Player Toggle */}
        <button
          onClick={() => setShowSpotifyEmbed(!showSpotifyEmbed)}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.45rem',
            padding: '0.42rem 0.85rem',
            borderLeft: '1px solid rgba(255, 255, 255, 0.18)',
            background: showSpotifyEmbed ? 'var(--neon-magenta)' : 'transparent',
            color: showSpotifyEmbed ? '#ffffff' : 'rgba(255, 255, 255, 0.78)',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.66rem',
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            transition: 'all 0.2s ease',
            cursor: 'pointer',
          }}
          title={t.audioBar.spotifyTitle}
        >
          <Radio size={12} />
          <span>{t.audioBar.player}</span>
        </button>
      </div>

      {/* Embedded Spotify Official Drawer — Memory Reboot */}
      {showSpotifyEmbed && (
        <div
          className="spotify-embed-drawer"
          style={{
            position: 'fixed',
            bottom: 'calc(3.75rem + var(--safe-bottom, 0px))',
            right: 'clamp(1rem, 4vw, 3.5rem)',
            zIndex: 45,
            width: 'clamp(290px, 90vw, 360px)',
            background: 'rgba(6, 7, 18, 0.96)',
            backdropFilter: 'blur(28px)',
            WebkitBackdropFilter: 'blur(28px)',
            border: '1px solid rgba(255, 255, 255, 0.24)',
            padding: '1rem',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9)',
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
                  fontFamily: 'var(--font-display)',
                  fontSize: '0.74rem',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  color: '#ffffff',
                }}
              >
                {t.audioBar.spotifyTitle}
              </span>
            </div>
            <button
              onClick={() => setShowSpotifyEmbed(false)}
              style={{
                color: 'var(--text-muted)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
              aria-label={t.audioBar.close}
            >
              <X size={15} />
            </button>
          </div>

          <iframe
            style={{ borderRadius: '8px' }}
            src="https://open.spotify.com/embed/track/5aN2OGGpaNjyYShsHHMPdj?utm_source=generator&theme=0"
            width="100%"
            height="152"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            title="Memory Reboot — VØJ & Narvent"
          />
        </div>
      )}
    </>
  );
}
