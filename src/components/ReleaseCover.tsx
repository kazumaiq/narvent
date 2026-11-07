import { useState } from 'react';
import { Release } from '../data/releases';

interface ReleaseCoverProps {
  release: Release;
  size?: number | string;
  className?: string;
  showDetails?: boolean;
  /** Load eagerly (above-the-fold covers). */
  priority?: boolean;
}

/**
 * Square release artwork. The image URL comes exclusively from the release's
 * stable ID (see coverManifest), so a card can never show another release's cover.
 * If the file is genuinely unavailable, a neutral placeholder with the title is
 * shown — no fake artwork is generated.
 */
export default function ReleaseCover({
  release,
  size = '100%',
  className = '',
  priority = false,
}: ReleaseCoverProps) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const [loadedSrc, setLoadedSrc] = useState<string | null>(null);
  const src = release.coverImage;

  // State is compared against the *current* src, so when this instance is reused
  // for another release, stale "failed"/"loaded" flags never carry over.
  const showImage = Boolean(src) && failedSrc !== src;
  const isLoaded = loadedSrc === src;

  return (
    <div
      className={`release-cover-root ${className}`}
      data-release-id={release.id}
      style={{
        width: typeof size === 'number' ? `${size}px` : size,
        aspectRatio: '1 / 1',
        position: 'relative',
        borderRadius: '14px',
        overflow: 'hidden',
        boxShadow: '0 14px 40px rgba(0,0,0,0.6)',
        background: '#0b0c1a',
        userSelect: 'none',
      }}
    >
      {showImage ? (
        <img
          key={`${release.id}:${src}`}
          src={src}
          alt={`${release.title} — ${release.artist}`}
          width={640}
          height={640}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          onLoad={() => setLoadedSrc(src!)}
          onError={() => setFailedSrc(src!)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            opacity: isLoaded ? 1 : 0,
            transition: 'opacity 0.4s ease, transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)',
          }}
        />
      ) : (
        <div
          role="img"
          aria-label={`${release.title} — ${release.artist}`}
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '10%',
            background: 'linear-gradient(160deg, #11132a 0%, #07080f 100%)',
          }}
        >
          <div
            style={{
              fontFamily: 'var(--font-display, "Space Grotesk", sans-serif)',
              fontSize: 'clamp(13px, 1.4rem, 20px)',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.15,
            }}
          >
            {release.title}
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{release.artist}</div>
        </div>
      )}

      {/* Subtle inner vignette */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
          borderRadius: 'inherit',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
