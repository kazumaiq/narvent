import React from 'react';
import { Release } from '../data/releases';

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
  const [g1, g2, g3] = release.coverGradient || ['#0a0520', '#140a32', '#2a1a52'];

  return (
    <div
      className={`release-cover-root ${className}`}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        aspectRatio: '1 / 1',
        position: 'relative',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: `0 14px 40px rgba(0,0,0,0.65), 0 0 30px ${g2}44`,
        border: '1px solid rgba(255, 255, 255, 0.12)',
        background: `linear-gradient(135deg, ${g1} 0%, ${g2} 50%, ${g3} 100%)`,
        userSelect: 'none',
      }}
    >
      {/* Vinyl record light sheen reflection */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background: 'radial-gradient(circle at 80% 20%, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0.03) 30%, transparent 60%)',
          pointerEvents: 'none',
        }}
      />

      {/* Cyberpunk grid lines / atmospheric horizon */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.25,
          backgroundImage: `
            linear-gradient(to right, rgba(255,255,255,0.08) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255,255,255,0.08) 1px, transparent 1px)
          `,
          backgroundSize: '24px 24px',
          maskImage: 'radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse at 50% 50%, black 20%, transparent 80%)',
          pointerEvents: 'none',
        }}
      />

      {/* Glowing neon halo */}
      <div
        style={{
          position: 'absolute',
          width: '75%',
          height: '75%',
          top: '12%',
          left: '12%',
          borderRadius: '50%',
          background: `radial-gradient(circle, ${g3}88 0%, transparent 70%)`,
          filter: 'blur(16px)',
          pointerEvents: 'none',
        }}
      />

      {/* Cover content layout */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          padding: '8%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          zIndex: 2,
        }}
      >
        {/* Top bar: Catalog & Format Badge */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 'clamp(8px, 2.2cqi, 11px)',
              letterSpacing: '0.2em',
              color: 'rgba(255, 255, 255, 0.65)',
              textTransform: 'uppercase',
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
              background: 'rgba(255,255,255,0.12)',
              backdropFilter: 'blur(8px)',
              color: '#ffffff',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              border: '1px solid rgba(255,255,255,0.15)',
            }}
          >
            {release.type}
          </span>
        </div>

        {/* Center: Abstract Geometric Glyph */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexGrow: 1,
            margin: '4% 0',
          }}
        >
          <div
            style={{
              width: '42%',
              aspectRatio: '1 / 1',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transform: 'rotate(45deg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: `0 0 25px ${g3}99`,
              background: 'rgba(0,0,0,0.25)',
              backdropFilter: 'blur(4px)',
            }}
          >
            <div
              style={{
                width: '60%',
                aspectRatio: '1 / 1',
                border: '1px solid rgba(111, 147, 255, 0.5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <div
                style={{
                  width: '35%',
                  aspectRatio: '1 / 1',
                  background: '#ffffff',
                  boxShadow: '0 0 14px #ffffff',
                  borderRadius: '50%',
                }}
              />
            </div>
          </div>
        </div>

        {/* Bottom Details */}
        {showDetails && (
          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(13px, 4.2cqi, 22px)',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.15,
                letterSpacing: '-0.02em',
                textShadow: '0 2px 12px rgba(0,0,0,0.8)',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {release.title}
            </div>
            <div
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: 'clamp(9px, 2.6cqi, 13px)',
                color: 'rgba(235, 230, 250, 0.75)',
                marginTop: '4px',
                letterSpacing: '0.04em',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {release.artist}
              {release.featuring && release.featuring.length > 0 && (
                <span style={{ color: 'rgba(170, 190, 255, 0.85)' }}>
                  {' '}ft. {release.featuring.join(', ')}
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Subtle bottom edge stripe */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: `linear-gradient(90deg, transparent, ${g2}, #ffffff, ${g3}, transparent)`,
          opacity: 0.8,
        }}
      />
    </div>
  );
}
