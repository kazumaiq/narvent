import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, SlidersHorizontal, Box, Grid3X3, Disc, Sparkles } from 'lucide-react';
import { releases, Release } from '../data/releases';
import Archive3DScene from '../scenes/Archive3DScene';
import ReleaseCover from '../components/ReleaseCover';
import ReleaseModal from '../components/ReleaseModal';

export default function MusicArchive() {
  const [activeFilter, setActiveFilter] = useState<'all' | 'albums' | 'eps' | 'singles' | 'collaborations'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'3d' | 'grid'>('3d');
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

  const filters = [
    { id: 'all', label: 'ALL' },
    { id: 'albums', label: 'ALBUMS' },
    { id: 'eps', label: 'EPS' },
    { id: 'singles', label: 'SINGLES' },
    { id: 'collaborations', label: 'COLLABORATIONS' },
  ] as const;

  // Filtered releases for 2D Grid & search
  const filteredReleases = useMemo(() => {
    return releases.filter((r) => {
      // Type match
      let matchesFilter = true;
      if (activeFilter === 'albums') matchesFilter = r.type === 'album';
      if (activeFilter === 'eps') matchesFilter = r.type === 'ep';
      if (activeFilter === 'singles') matchesFilter = r.type === 'single';
      if (activeFilter === 'collaborations') matchesFilter = Boolean(r.featuring && r.featuring.length > 0);

      // Search match
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
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
          <span className="section-badge" style={{ margin: '0 auto 1.25rem' }}>
            <Sparkles size={12} color="#7093ff" />
            INTERACTIVE DISCOGRAPHY // 3D SPATIAL ARCHIVE
          </span>
          <h2 className="section-title">The Complete Archive</h2>
          <p className="section-desc" style={{ margin: '0.75rem auto 0' }}>
            Explore Narvent's full universe of releases floating in interactive 3D space. Hover, drag, and select any release to open official links and track data.
          </p>
        </div>

        {/* Toolbar: Filters, Search, and 3D/Grid Mode Switch */}
        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto 2.5rem',
            background: 'rgba(12, 12, 32, 0.7)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '100px',
            padding: '0.5rem 0.75rem',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '0.75rem',
          }}
        >
          {/* Filters pills */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '0.35rem',
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
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.08em',
                    padding: '0.45rem 1rem',
                    borderRadius: '100px',
                    transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                    background: isActive
                      ? 'linear-gradient(135deg, rgba(79, 117, 255, 0.35), rgba(107, 77, 150, 0.35))'
                      : 'transparent',
                    border: isActive
                      ? '1px solid rgba(111, 147, 255, 0.5)'
                      : '1px solid transparent',
                    color: isActive ? '#ffffff' : 'rgba(184, 169, 212, 0.7)',
                    boxShadow: isActive ? '0 0 15px rgba(79, 117, 255, 0.3)' : 'none',
                    cursor: 'pointer',
                  }}
                >
                  {f.label}
                </button>
              );
            })}
          </div>

          {/* Search Input & View Mode Switcher */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}
          >
            {/* Live Search */}
            <div
              style={{
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Search
                size={14}
                style={{
                  position: 'absolute',
                  left: '0.85rem',
                  color: 'rgba(184, 169, 212, 0.5)',
                  pointerEvents: 'none',
                }}
              />
              <input
                type="text"
                placeholder="Search catalog..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '100px',
                  padding: '0.45rem 1rem 0.45rem 2.2rem',
                  fontFamily: "'Inter', sans-serif",
                  fontSize: '0.8rem',
                  color: '#ffffff',
                  outline: 'none',
                  width: 'clamp(140px, 20vw, 200px)',
                  transition: 'all 0.2s',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'rgba(111, 147, 255, 0.5)')}
                onBlur={(e) => (e.target.style.borderColor = 'rgba(255, 255, 255, 0.08)')}
              />
            </div>

            {/* View Mode Toggle: 3D Universe / 2D Grid */}
            <div
              style={{
                display: 'flex',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '100px',
                padding: '2px',
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
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  background: viewMode === '3d' ? 'rgba(79, 117, 255, 0.4)' : 'transparent',
                  color: viewMode === '3d' ? '#ffffff' : 'rgba(184, 169, 212, 0.65)',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                title="3D Spatial Archive"
              >
                <Box size={13} />
                <span className="hide-on-mobile">3D SPACE</span>
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
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  background: viewMode === 'grid' ? 'rgba(79, 117, 255, 0.4)' : 'transparent',
                  color: viewMode === 'grid' ? '#ffffff' : 'rgba(184, 169, 212, 0.65)',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                title="2D Grid Catalog"
              >
                <Grid3X3 size={13} />
                <span className="hide-on-mobile">CATALOG</span>
              </button>
            </div>
          </div>
        </div>

        {/* Dynamic Display Area */}
        {viewMode === '3d' ? (
          /* 3D Spatial Interactive Universe */
          <div
            style={{
              position: 'relative',
              width: '100%',
              height: '75vh',
              minHeight: '620px',
              maxHeight: '850px',
              background: 'radial-gradient(ellipse at 50% 50%, rgba(14, 14, 40, 0.4) 0%, rgba(6, 6, 19, 0.85) 100%)',
              border: '1px solid rgba(111, 147, 255, 0.2)',
              borderRadius: '28px',
              overflow: 'hidden',
              boxShadow: '0 25px 60px rgba(0, 0, 0, 0.7), inset 0 0 50px rgba(79, 117, 255, 0.1)',
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
          /* 2D Mosaic Catalog Grid */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(200px, 20vw, 260px), 1fr))',
              gap: 'clamp(1rem, 2vw, 2rem)',
              maxWidth: '1280px',
              margin: '0 auto',
            }}
          >
            {filteredReleases.map((release) => (
              <div
                key={release.id}
                onClick={() => setSelectedRelease(release)}
                style={{
                  background: 'rgba(12, 12, 32, 0.6)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '1rem',
                  cursor: 'pointer',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'rgba(111, 147, 255, 0.4)';
                  e.currentTarget.style.boxShadow = '0 15px 35px rgba(0,0,0,0.5), 0 0 20px rgba(79, 117, 255, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
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
                      color: '#7093ff',
                      marginBottom: '0.25rem',
                      textTransform: 'uppercase',
                    }}
                  >
                    <span>{release.type}</span>
                    <span style={{ color: 'rgba(184, 169, 212, 0.6)' }}>{release.year}</span>
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
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.8rem',
                      color: 'rgba(212, 200, 245, 0.7)',
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

      {/* Selected Release Inspector Modal */}
      <ReleaseModal
        release={selectedRelease}
        onClose={() => setSelectedRelease(null)}
      />
    </section>
  );
}
