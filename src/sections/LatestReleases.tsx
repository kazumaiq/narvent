import { useState } from 'react';
import { Play, ArrowRight } from 'lucide-react';
import { getLatestReleases, Release, formatReleaseDate } from '../data/releases';
import { useLanguage } from '../context/LanguageContext';
import ReleaseCover from '../components/ReleaseCover';
import ReleaseModal from '../components/ReleaseModal';
import { RevealText, RevealImage, ParallaxWatermark } from '../components/CinematicReveal';

export default function LatestReleases() {
  const { t, lang } = useLanguage();
  // Top 6 newest releases arranged in Martin Garrix's 2-column staggered gallery
  const latestReleases = getLatestReleases().slice(0, 6);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

  const leftColReleases = latestReleases.filter((_, idx) => idx % 2 === 0);
  const rightColReleases = latestReleases.filter((_, idx) => idx % 2 === 1);

  const getTypeLabel = (type: Release['type']) => {
    if (type === 'album') return t.latest.album;
    if (type === 'ep') return t.latest.ep;
    return t.latest.single;
  };

  const renderGalleryCard = (release: Release, absoluteIndex: number, isRightCol: boolean) => (
    <article
      key={release.id}
      onClick={() => setSelectedRelease(release)}
      className="mg-artwork-card"
    >
      <RevealImage
        direction={isRightCol ? 'right' : 'left'}
        parallax={isRightCol ? -16 : 16}
      >
        <div style={{ position: 'relative', width: '100%' }}>
          <ReleaseCover release={release} size="100%" priority={absoluteIndex < 2} />

          {/* Top Architectural Telemetry Bar Over Artwork */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              padding: 'clamp(0.85rem, 2vw, 1.35rem)',
              background: 'linear-gradient(180deg, rgba(2, 2, 6, 0.78) 0%, transparent 100%)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontFamily: 'var(--font-mono)',
              fontSize: '0.68rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              zIndex: 2,
            }}
          >
            <span style={{ color: '#ffffff' }}>
              0{absoluteIndex + 1} // {getTypeLabel(release.type)}
            </span>
            <span style={{ color: 'var(--electric-blue)' }}>
              {formatReleaseDate(release.releaseDate, lang)}
            </span>
          </div>

          {/* Bottom Martin Garrix Overlay: Play Circle + Bold Uppercase Title + Artist + Listen */}
          <div
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              padding: 'clamp(2.5rem, 5vw, 4rem) clamp(1rem, 2.4vw, 1.75rem) clamp(1.1rem, 2.4vw, 1.75rem)',
              background:
                'linear-gradient(180deg, transparent 0%, rgba(2, 2, 6, 0.82) 55%, rgba(2, 2, 6, 0.96) 100%)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              gap: '1rem',
              zIndex: 2,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', minWidth: 0 }}>
              <div className="mg-artwork-play-circle">
                <Play size={18} fill="currentColor" />
              </div>

              <div style={{ minWidth: 0 }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.15rem, 2.2vw, 1.75rem)',
                    fontWeight: 900,
                    color: '#ffffff',
                    letterSpacing: '-0.03em',
                    lineHeight: 1.02,
                    textTransform: 'uppercase',
                    margin: '0 0 0.3rem 0',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {release.title}
                </h3>
                <div
                  style={{
                    fontFamily: 'var(--font-main)',
                    fontSize: '0.84rem',
                    color: 'rgba(255, 255, 255, 0.78)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}
                >
                  — {release.artist}
                  {release.featuring ? ` & ${release.featuring.join(', ')}` : ''}
                </div>
              </div>
            </div>

            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.66rem',
                fontWeight: 700,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#ffffff',
                border: '1px solid rgba(255, 255, 255, 0.32)',
                background: 'rgba(2, 2, 6, 0.65)',
                padding: '0.42rem 0.75rem',
                flexShrink: 0,
              }}
            >
              {t.latest.listenRelease}
            </span>
          </div>
        </div>
      </RevealImage>
    </article>
  );

  return (
    <section
      id="latest"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 11vh, 9.5rem) 0',
        zIndex: 2,
      }}
    >
      {/* Drifting Kinetic Background Watermark */}
      <ParallaxWatermark text="LATEST RELEASES // 2026" top="4%" speed={-110} opacity={0.032} />

      {/* Left Margin Rotated Vertical Label (Exact Martin Garrix Layout) */}
      <div
        className="desktop-only mg-vertical-rail"
        style={{
          position: 'absolute',
          top: '8rem',
          left: 'clamp(0.6rem, 1.8vw, 1.5rem)',
          zIndex: 3,
        }}
      >
        <span>{t.latest.badge} // 2025—2026</span>
      </div>

      <div className="container">
        {/* Split Header: Giant Pure Grotesque Title Left + Subtitle Right */}
        <div className="mg-section-header">
          <div>
            <div className="editorial-kicker">
              <span>02 // {t.latest.badge}</span>
            </div>
            <h2 className="editorial-title">
              <RevealText text={t.latest.title} />
            </h2>
          </div>

          <p className="editorial-subtitle" style={{ margin: 0 }}>
            {t.latest.subtitle}
          </p>
        </div>

        {/* 2-Column Asymmetric Staggered Gallery with Central Vertical Line */}
        <div className="mg-gallery-wrapper">
          {/* Left Column (01, 03, 05) */}
          <div className="mg-gallery-col-left">
            {leftColReleases.map((rel, i) => renderGalleryCard(rel, i * 2, false))}
          </div>

          {/* Center Vertical Hairline */}
          <div className="mg-gallery-divider" aria-hidden="true">
            <div className="mg-gallery-divider-line" />
          </div>

          {/* Right Column Staggered Down (02, 04, 06) */}
          <div className="mg-gallery-col-right">
            {rightColReleases.map((rel, i) => renderGalleryCard(rel, i * 2 + 1, true))}
          </div>
        </div>

        {/* Bottom Centered CTA Bar */}
        <div
          style={{
            marginTop: 'clamp(3.5rem, 7vh, 5.5rem)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '2rem',
          }}
        >
          <a href="#archive" className="mg-split-btn">
            <span className="mg-split-label">{t.latest.viewAll3D}</span>
            <span className="mg-split-arrow">
              <ArrowRight size={15} />
            </span>
          </a>
        </div>
      </div>

      <ReleaseModal
        release={selectedRelease}
        onClose={() => setSelectedRelease(null)}
      />
    </section>
  );
}
