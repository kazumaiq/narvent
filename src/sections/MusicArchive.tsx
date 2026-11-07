import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Box, Grid3X3, Sparkles } from 'lucide-react';
import { releases, Release } from '../data/releases';
import { useLanguage } from '../context/LanguageContext';
import Archive3DScene from '../scenes/Archive3DScene';
import ReleaseCover from '../components/ReleaseCover';
import ReleaseModal from '../components/ReleaseModal';

export default function MusicArchive() {
  const { t } = useLanguage();
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
        padding: 'clamp(5rem, 10vh, 8rem) 0 clamp(4rem, 8vh, 6rem)',
        zIndex: 3,
      }}
    >
      <div className="container-wide">
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '2.5rem' }}
        >
          <span className="editorial-badge magenta" style={{ margin: '0 auto 1.25rem' }}>
            <Sparkles size={11} color="var(--neon-magenta)" />
            <span>{t.archive.badge}</span>
          </span>
          <h2 className="editorial-title">{t.archive.title}</h2>
          <p className="editorial-subtitle" style={{ margin: '0.75rem auto 0' }}>
            {t.archive.subtitle}
          </p>
        </motion.div>

        {/* Панель управления: Фильтры, Поиск и Переключатель вида */}
        <div
          style={{
            maxWidth: '1240px',
            margin: '0 auto 2.5rem',
            background: 'var(--bg-glass)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid var(--border-line)',
            borderRadius: '24px',
            padding: '0.65rem 0.85rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.85rem',
          }}
        >
          {/* Фильтры по категориям (горизонтальный скролл на мобильных) */}
          <div
            className="scroll-touch-x"
            style={{
              display: 'flex',
              gap: '0.35rem',
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
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.74rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    padding: '0.42rem 0.9rem',
                    borderRadius: '100px',
                    transition: 'all 0.25s ease',
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(217, 70, 239, 0.35))'
                      : 'transparent',
                    border: isActive
                      ? '1px solid rgba(217, 70, 239, 0.45)'
                      : '1px solid transparent',
                    color: isActive ? '#ffffff' : 'var(--text-muted)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    whiteSpace: 'nowrap',
                    flexShrink: 0,
                  }}
                >
                  <span>{f.label}</span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.65rem',
                      opacity: isActive ? 1 : 0.6,
                      color: isActive ? 'var(--electric-blue)' : 'inherit',
                    }}
                  >
                    {f.count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Поиск и переключатель 3D / Список */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', flexWrap: 'wrap', width: 'auto' }}>
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', flexGrow: 1 }}>
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
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-line)',
                  borderRadius: '100px',
                  padding: '0.42rem 0.85rem 0.42rem 2.2rem',
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: '0.8rem',
                  color: '#ffffff',
                  outline: 'none',
                  width: 'clamp(120px, 18vw, 200px)',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(217, 70, 239, 0.5)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-line)')}
              />
            </div>

            {/* Переключатель вида */}
            <div
              style={{
                display: 'flex',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid var(--border-line)',
                borderRadius: '100px',
                padding: '2px',
                flexShrink: 0,
              }}
            >
              <button
                onClick={() => setViewMode('3d')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '100px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  background: viewMode === '3d' ? 'rgba(99, 102, 241, 0.4)' : 'transparent',
                  color: viewMode === '3d' ? '#ffffff' : 'var(--text-dim)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <Box size={13} />
                <span>{t.archive.view3D}</span>
              </button>

              <button
                onClick={() => setViewMode('grid')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '100px',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.7rem',
                  fontWeight: 600,
                  background: viewMode === 'grid' ? 'rgba(99, 102, 241, 0.4)' : 'transparent',
                  color: viewMode === 'grid' ? '#ffffff' : 'var(--text-dim)',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                <Grid3X3 size={13} />
                <span>{t.archive.viewGrid}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Интерактивное 3D-пространство или Каталог */}
        {viewMode === '3d' ? (
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(480px, 72vh, 840px)',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(18, 16, 45, 0.45) 0%, rgba(4, 5, 14, 0.9) 100%)',
              border: '1px solid var(--border-line)',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 30px 80px rgba(0, 0, 0, 0.8), inset 0 0 60px rgba(99, 102, 241, 0.08)',
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
              gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(145px, 20vw, 240px), 1fr))',
              gap: 'clamp(0.85rem, 2vw, 1.75rem)',
              maxWidth: '1280px',
              margin: '0 auto',
            }}
          >
            {filteredReleases.map((release) => (
              <div
                key={release.id}
                onClick={() => setSelectedRelease(release)}
                style={{
                  background: 'var(--bg-glass)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid var(--border-line)',
                  borderRadius: '16px',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'rgba(217, 70, 239, 0.4)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.6), 0 0 20px rgba(217, 70, 239, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-line)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <ReleaseCover release={release} size="100%" />

                <div style={{ marginTop: '0.9rem' }}>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      fontSize: '0.68rem',
                      fontFamily: "'JetBrains Mono', monospace",
                      color: 'var(--electric-blue)',
                      marginBottom: '0.25rem',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>
                      {release.type === 'album'
                        ? t.latest.album
                        : release.type === 'ep'
                        ? t.latest.ep
                        : t.latest.single}
                    </span>
                    <span style={{ color: 'var(--text-dim)' }}>{release.year}</span>
                  </div>

                  <h4
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: '#ffffff',
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
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '0.8rem',
                      color: 'var(--text-muted)',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {release.artist}
                    {release.featuring && ` ft. ${release.featuring.join(', ')}`}
                  </p>
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
