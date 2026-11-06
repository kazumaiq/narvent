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
        style={{
          position: 'fixed',
          bottom: '1.5rem',
          right: '1.5rem',
          zIndex: 40,
          display: 'flex',
          alignItems: 'center',
          gap: '0.65rem',
          background: 'rgba(9, 9, 25, 0.75)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(111, 147, 255, 0.25)',
          padding: '0.45rem 0.75rem',
          borderRadius: '100px',
          boxShadow: '0 8px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(79, 117, 255, 0.15)',
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
              ? 'rgba(79, 117, 255, 0.25)'
              : 'rgba(255, 255, 255, 0.05)',
            border: isPlayingAmbient
              ? '1px solid rgba(111, 147, 255, 0.5)'
              : '1px solid transparent',
            color: isPlayingAmbient ? '#7093ff' : 'rgba(184, 169, 212, 0.75)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem',
            fontWeight: 500,
            letterSpacing: '0.08em',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
          title={isPlayingAmbient ? 'Mute ambient soundscape' : 'Play ambient soundscape'}
        >
          {isPlayingAmbient ? (
            <>
              <Volume2 size={15} />
              <span>SOUND ON</span>
              {/* Mini visualizer bars */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '2px', height: '12px' }}>
                <span
                  style={{
                    width: '2px',
                    height: '8px',
                    background: '#7093ff',
                    animation: 'pulseGlow 0.8s infinite alternate',
                  }}
                />
                <span
                  style={{
                    width: '2px',
                    height: '12px',
                    background: '#7093ff',
                    animation: 'pulseGlow 1.2s infinite alternate',
                  }}
                />
                <span
                  style={{
                    width: '2px',
                    height: '6px',
                    background: '#7093ff',
                    animation: 'pulseGlow 0.6s infinite alternate',
                  }}
                />
              </div>
            </>
          ) : (
            <>
              <VolumeX size={15} />
              <span>AMBIENCE</span>
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
              ? 'rgba(29, 185, 84, 0.25)'
              : 'rgba(255, 255, 255, 0.05)',
            border: showSpotifyEmbed
              ? '1px solid rgba(29, 185, 84, 0.5)'
              : '1px solid transparent',
            color: showSpotifyEmbed ? '#1db954' : 'rgba(184, 169, 212, 0.75)',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem',
            fontWeight: 500,
            letterSpacing: '0.08em',
            transition: 'all 0.3s ease',
            cursor: 'pointer',
          }}
          title="Open Official Spotify Player"
        >
          <Radio size={14} />
          <span>PLAYER</span>
        </button>
      </div>

      {/* Embedded Spotify Official Drawer */}
      {showSpotifyEmbed && (
        <div
          style={{
            position: 'fixed',
            bottom: '4.75rem',
            right: '1.5rem',
            zIndex: 45,
            width: 'clamp(290px, 90vw, 360px)',
            background: 'rgba(10, 10, 26, 0.94)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(111, 147, 255, 0.3)',
            borderRadius: '18px',
            padding: '1rem',
            boxShadow: '0 20px 50px rgba(0,0,0,0.8), 0 0 30px rgba(79, 117, 255, 0.2)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '0.75rem',
              paddingBottom: '0.5rem',
              borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Disc3 size={16} color="#1db954" className="floating-anim" />
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#ffffff',
                }}
              >
                Official Spotify Player
              </span>
            </div>
            <button
              onClick={() => setShowSpotifyEmbed(false)}
              style={{
                color: 'rgba(255,255,255,0.6)',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <X size={16} />
            </button>
          </div>

          {/* Official Spotify Artist/Track Embed iframe */}
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
    </>
  );
}
