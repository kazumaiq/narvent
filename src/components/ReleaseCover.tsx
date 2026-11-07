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
        borderRadius: '4px',
        overflow: 'hidden',
        boxShadow: '0 20px 50px rgba(0, 0, 0, 0.75)',
        background: '#080916',
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
          loading="eager"
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
            transition: 'opacity 0.45s ease, transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)',
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
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(13px, 1.4rem, 20px)',
              fontWeight: 800,
              color: 'rgba(255,255,255,0.85)',
              lineHeight: 1.15,
            }}
          >
            {release.title}
          </div>
          <div style={{ fontSize: '11px', color: 'rgba(255,255,255,0.45)', marginTop: 4 }}>{release.artist}</div>
        </div>
      )}

      {/* Architectural hairline inner frame */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          boxShadow: 'inset 0 0 0 1px rgba(255, 255, 255, 0.1)',
          borderRadius: 'inherit',
          pointerEvents: 'none',
        }}
      />
    </div>
  );
}
