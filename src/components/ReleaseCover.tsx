import React, { useState } from 'react';
import { Release } from '../data/releases';
import { Play } from 'lucide-react';

interface ReleaseCoverProps {
  release: Release;
  size?: number | string;
  className?: string;
  showDetails?: boolean;
}

export default function ReleaseCover({
  release,
  size = '100%',
  className = '',
  showDetails = true,
}: ReleaseCoverProps) {
  const [imgError, setImgError] = useState(false);
  const [g1, g2, g3] = release.coverGradient || ['#060714', '#180d36', '#4a044e'];
  const hasCoverImage = release.coverImage && !imgError;

  return (
    <div
      className={`release-cover-root ${className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        aspectRatio: '1 / 1',
        position: 'relative',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: `0 14px 40px rgba(0,0,0,0.7), 0 0 30px ${g2}44`,
        border: '1px solid rgba(255, 255, 255, 0.12)',
        background: `linear-gradient(135deg, ${g1} 0%, ${g2} 50%, ${g3} 100%)`,
        userSelect: 'none',
      }}
    >
      {hasCoverImage ? (
        <img
          src={release.coverImage}
          alt={`${release.title} by ${release.artist}`}
          loading="lazy"
          onError={() => setImgError(true)}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            transition: 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      ) : (
        /* Fallback Bespoke Art Layer */
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '8%',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 'clamp(8px, 2.2cqi, 11px)',
                letterSpacing: '0.2em',
                color: 'rgba(255, 255, 255, 0.7)',
                textTransform: 'uppercase',
                fontWeight: 600,
              }}
            >
              NRVNT // {release.year}
            </span>
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 'clamp(7px, 2cqi, 10px)',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: '4px',
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(8px)',
                color: '#ffffff',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                border: '1px solid rgba(255,255,255,0.15)',
              }}
            >
              {release.type}
            </span>
          </div>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              flexGrow: 1,
            }}
          >
            <div
              style={{
                width: '65px',
                height: '65px',
                borderRadius: '50%',
                border: '1.5px solid rgba(217, 70, 239, 0.6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'radial-gradient(circle, rgba(217,70,239,0.2) 0%, transparent 70%)',
                boxShadow: '0 0 25px rgba(217, 70, 239, 0.3)',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, #38bdf8 0%, #d946ef 100%)',
                }}
              />
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(13px, 3.8cqi, 20px)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                marginBottom: '2px',
                textShadow: '0 2px 10px rgba(0,0,0,0.8)',
              }}
            >
              {release.title}
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 'clamp(8px, 2.2cqi, 11px)',
                color: 'rgba(255, 255, 255, 0.65)',
                letterSpacing: '0.1em',
              }}
            >
              {release.artist}
            </div>
          </div>
        </div>
      )}

      {/* Subtle Vinyl Sheen & Light Reflection Overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 40%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      {/* Micro vinyl outer vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.6)',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
