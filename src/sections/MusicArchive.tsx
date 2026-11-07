import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Box, Grid3X3 } from 'lucide-react';
import { releases, Release, formatReleaseDate } from '../data/releases';
import { useLanguage } from '../context/LanguageContext';
import Archive3DScene from '../scenes/Archive3DScene';
import ReleaseCover from '../components/ReleaseCover';
import ReleaseModal from '../components/ReleaseModal';
import { RevealText, RevealImage, ParallaxWatermark } from '../components/CinematicReveal';

export default function MusicArchive() {
  const { t, lang } = useLanguage();
  const [activeFilter, setActiveFilter] = useState<'all' | 'albums' | 'eps' | 'singles' | 'collaborations'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

  const filters = [
    { id: 'all', label: t.archive.filterAll, count: releases.length },
    { id: 'albums', label: t.archive.filterAlbums, count: releases.filter((r) => r.type === 'album').length },
    { id: 'eps', label: t.archive.filterEPs, count: releases.filter((r) => r.type === 'ep').length },
    { id: 'singles', label: t.archive.filterSingles, count: releases.filter((r) => r.type === 'single').length },
    { id: 'collaborations', label: t.archive.filterCollabs, count: releases.filter((r) => r.featuring && r.featuring.length > 0).length },
  ] as const;

  const filteredReleases = useMemo(() => {
    return releases.filter((r) => {
      let matchesFilter = true;
      if (activeFilter === 'albums') matchesFilter = r.type === 'album';
      if (activeFilter === 'eps') matchesFilter = r.type === 'ep';
      if (activeFilter === 'singles') matchesFilter = r.type === 'single';
      if (activeFilter === 'collaborations') matchesFilter = Boolean(r.featuring && r.featuring.length > 0);

      let matchesSearch = true;
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        matchesSearch =
          r.title.toLowerCase().includes(query) ||
          r.artist.toLowerCase().includes(query) ||
          (r.featuring && r.featuring.some((f) => f.toLowerCase().includes(query))) ||
          r.year.toString().includes(query);
      }

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, searchQuery]);

  return (
    <section
      id="archive"
      style={{
        position: 'relative',
        minHeight: '100vh',
        padding: 'clamp(5rem, 11vh, 9rem) 0 clamp(4rem, 8vh, 6rem)',
        zIndex: 3,
      }}
    >
      {/* Drifting Kinetic Background Watermark */}
      <ParallaxWatermark text="DISCOGRAPHY // 2019—2026" top="5%" speed={-100} opacity={0.03} />

      <div className="container-wide">
        {/* Section Header */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            gap: '1.5rem',
            marginBottom: '2.5rem',
          }}
        >
          <div>
            <div className="editorial-kicker">
              <span>04 // {t.archive.badge}</span>
            </div>
            <h2 className="editorial-title">
              <RevealText
                text={t.archive.title}
                serifWord={lang === 'ru' ? 'Дискография' : 'Discography'}
              />
            </h2>
            <p className="editorial-subtitle">{t.archive.subtitle}</p>
          </div>

          {/* View Mode Toggle (3D / Grid) */}
          <div
            style={{
              display: 'inline-flex',
              border: '1px solid var(--border-strong)',
              background: 'rgba(8, 9, 22, 0.8)',
              flexShrink: 0,
            }}
          >
            <button
              onClick={() => setViewMode('3d')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.65rem 1.15rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                background: viewMode === '3d' ? '#ffffff' : 'transparent',
                color: viewMode === '3d' ? '#020206' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              <Box size={14} />
              <span>{t.archive.view3D}</span>
            </button>

            <button
              onClick={() => setViewMode('grid')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.45rem',
                padding: '0.65rem 1.15rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                background: viewMode === 'grid' ? '#ffffff' : 'transparent',
                color: viewMode === 'grid' ? '#020206' : 'var(--text-muted)',
                cursor: 'pointer',
                transition: 'all 0.25s ease',
              }}
            >
              <Grid3X3 size={14} />
              <span>{t.archive.viewGrid}</span>
            </button>
          </div>
        </div>

        {/* Architectural Filter & Search Toolbar */}
        <div
          style={{
            marginBottom: '2.25rem',
            padding: '0.85rem 0',
            borderTop: '1px solid var(--border-strong)',
            borderBottom: '1px solid var(--border-line)',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {/* Category Filters (Horizontal touch scroll on narrow screens) */}
          <div
            className="scroll-touch-x"
            style={{
              display: 'flex',
              gap: '0.4rem',
              maxWidth: '100%',
              paddingBottom: '2px',
            }}
          >
            {filters.map((f) => {
              const isActive = activeFilter === f.id;
              return (
                <button
                  key={f.id}
                  onClick={() => setActiveFilter(f.id)}
                  style={{
                    fontFamily: 'var(--font-ui)',
                    fontSize: '0.74rem',
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    padding: '0.5rem 0.95rem',
                    transition: 'all 0.25s ease',
                    background: isActive ? 'rgba(217, 70, 239, 0.2)' : 'transparent',
                    border: isActive
                      ? '1px solid var(--neon-magenta)'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.45rem',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  <span>{f.label}</span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.64rem',
                      color: isActive ? 'var(--electric-blue)' : 'var(--text-dim)',
                    }}
                  >
                    [{f.count}]
                  </span>
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flexGrow: 1, maxWidth: '280px' }}>
            <Search
              size={14}
              style={{
                position: 'absolute',
                left: '0.85rem',
                color: 'var(--text-dim)',
                pointerEvents: 'none',
              }}
            />
            <input
              type="text"
              placeholder={t.archive.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid var(--border-strong)',
                padding: '0.5rem 0.85rem 0.5rem 2.25rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.76rem',
                color: '#ffffff',
                outline: 'none',
                width: '100%',
                transition: 'border-color 0.2s',
              }}
              onFocus={(e) => (e.target.style.borderColor = 'var(--neon-magenta)')}
              onBlur={(e) => (e.target.style.borderColor = 'var(--border-strong)')}
            />
          </div>
        </div>

        {/* Interactive 3D Chrono-Helix OR Editorial Grid */}
        {viewMode === '3d' ? (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(480px, 72vh, 840px)',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(18, 16, 45, 0.45) 0%, rgba(4, 5, 14, 0.92) 100%)',
              border: '1px solid var(--border-strong)',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.85)',
            }}
          >
            <Archive3DScene
              releases={filteredReleases}
              selectedRelease={selectedRelease}
              onSelectRelease={(rel) => setSelectedRelease(rel)}
              activeFilter={activeFilter}
            />
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(155px, 22vw, 270px), 1fr))',
              gap: 'clamp(1.25rem, 2.5vw, 2.25rem)',
            }}
          >
            {filteredReleases.map((release, idx) => (
              <div
                key={release.id}
                onClick={() => setSelectedRelease(release)}
                className="editorial-release-card"
                style={{
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    fontSize: '0.66rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-dim)',
                    paddingBottom: '0.45rem',
                    marginBottom: '0.6rem',
                    borderBottom: '1px solid var(--border-line)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                  }}
                >
                  <span style={{ color: 'var(--electric-blue)' }}>
                    {release.type === 'album'
                      ? t.latest.album
                      : release.type === 'ep'
                      ? t.latest.ep
                      : t.latest.single}
                  </span>
                  <span>{formatReleaseDate(release.releaseDate, lang)}</span>
                </div>

                <RevealImage direction="up" delay={(idx % 4) * 0.04} parallax={0}>
                  <ReleaseCover release={release} size="100%" />
                </RevealImage>

                <div
                  style={{
                    marginTop: '0.85rem',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    gap: '0.5rem',
                  }}
                >
                  <div style={{ minWidth: 0 }}>
                    <h4
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(0.95rem, 1.4vw, 1.2rem)',
                        fontWeight: 800,
                        color: '#ffffff',
                        letterSpacing: '-0.02em',
                        textTransform: 'uppercase',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        marginBottom: '0.2rem',
                      }}
                    >
                      {release.title}
                    </h4>

                    <p
                      style={{
                        fontFamily: 'var(--font-main)',
                        fontSize: '0.78rem',
                        color: 'var(--text-muted)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        margin: 0,
                      }}
                    >
                      {release.artist}
                      {release.featuring && ` ft. ${release.featuring.join(', ')}`}
                    </p>
                  </div>

                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.64rem',
                      fontWeight: 600,
                      letterSpacing: '0.12em',
                      color: 'var(--neon-magenta)',
                      textTransform: 'uppercase',
                      flexShrink: 0,
                      paddingTop: '0.15rem',
                    }}
                  >
                    {t.hero.listen} →
                  </span>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      <ReleaseModal
        release={selectedRelease}
        onClose={() => setSelectedRelease(null)}
      />
    </section>
  );
}
