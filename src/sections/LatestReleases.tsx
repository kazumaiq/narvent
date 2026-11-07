import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, Sparkles, Disc3, ChevronRight, ChevronLeft, Calendar, Music } from 'lucide-react';
import { getLatestReleases, Release, formatReleaseDate } from '../data/releases';
import { useLanguage } from '../context/LanguageContext';
import ReleaseCover from '../components/ReleaseCover';
import ReleaseModal from '../components/ReleaseModal';

export default function LatestReleases() {
  const { t, lang } = useLanguage();
  const latestReleases = getLatestReleases().slice(0, 7);
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);
  const featured = latestReleases[0];
  const rest = latestReleases.slice(1);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollList = (dir: 'left' | 'right') => {
    if (!scrollContainerRef.current) return;
    const amount = 320;
    scrollContainerRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section
      id="latest"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vh, 9rem) 0',
        zIndex: 2,
      }}
    >
      <div className="container">
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '3.5rem' }}
        >
          <span className="editorial-badge">
            <Sparkles size={11} color="var(--electric-blue)" />
            {t.latest.badge}
          </span>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
              gap: '1.5rem',
            }}
          >
            <div>
              <h2 className="editorial-title">{t.latest.title}</h2>
              <p className="editorial-subtitle">
                {t.latest.subtitle}
              </p>
            </div>

            <a
              href="#archive"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.45rem',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 600,
                color: 'var(--electric-blue)',
                letterSpacing: '0.04em',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#ffffff';
                e.currentTarget.style.transform = 'translateX(4px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = 'var(--electric-blue)';
                e.currentTarget.style.transform = 'translateX(0)';
              }}
            >
              <span>{t.latest.viewAll3D}</span>
              <ChevronRight size={15} />
            </a>
          </div>
        </motion.div>

        {/* Главный флагманский свежий релиз */}
        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            onClick={() => setSelectedRelease(featured)}
            className="latest-featured-grid"
            style={{
              background: 'var(--bg-glass)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              border: '1px solid var(--border-line)',
              borderRadius: '24px',
              padding: 'clamp(1.25rem, 2.5vw, 2.25rem)',
              cursor: 'pointer',
              transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              marginBottom: '3.5rem',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(217, 70, 239, 0.4)';
              e.currentTarget.style.boxShadow = '0 25px 60px rgba(0, 0, 0, 0.75), 0 0 35px rgba(217, 70, 239, 0.15)';
              e.currentTarget.style.transform = 'translateY(-4px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border-line)';
              e.currentTarget.style.boxShadow = 'none';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            {/* Обложка */}
            <div style={{ borderRadius: '18px', overflow: 'hidden', position: 'relative' }}>
              <ReleaseCover release={featured} size="100%" />
              <div
                style={{
                  position: 'absolute',
                  top: '1rem',
                  left: '1rem',
                  background: 'rgba(217, 70, 239, 0.9)',
                  padding: '0.35rem 0.9rem',
                  borderRadius: '100px',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.72rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '0.06em',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.35rem',
                  boxShadow: '0 4px 15px rgba(217, 70, 239, 0.4)',
                }}
              >
                <Sparkles size={11} />
                {t.latest.newReleaseBadge}
              </div>
            </div>

            {/* Описание и метаданные */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', gap: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.74rem',
                    color: 'var(--electric-blue)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.12em',
                    fontWeight: 600,
                  }}
                >
                  {featured.type === 'album' ? t.latest.album : featured.type === 'ep' ? t.latest.ep : t.latest.single}
                </span>
                <span style={{ color: 'var(--text-dim)', fontSize: '0.75rem' }}>•</span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.74rem',
                    color: 'var(--text-dim)',
                  }}
                >
                  {formatReleaseDate(featured.releaseDate, lang)}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(1.8rem, 3.8vw, 3rem)',
                  fontWeight: 800,
                  color: '#ffffff',
                  lineHeight: 1.05,
                  letterSpacing: '-0.03em',
                  margin: 0,
                }}
              >
                {featured.title}
              </h3>

              <p
                style={{
                  fontFamily: "'Manrope', sans-serif",
                  fontSize: 'clamp(0.92rem, 1.4vw, 1.05rem)',
                  color: 'var(--text-muted)',
                  lineHeight: 1.6,
                  maxWidth: '480px',
                  margin: 0,
                }}
              >
                {featured.artist}
                {featured.featuring && (
                  <span style={{ color: 'var(--electric-blue)' }}>
                    {' '}{t.latest.featWith} {featured.featuring.join(', ')}
                  </span>
                )}
              </p>

              {featured.description && (
                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '0.88rem',
                    color: 'var(--text-dim)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {featured.description}
                </p>
              )}

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '1rem',
                  alignItems: 'center',
                  marginTop: '0.5rem',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.74rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <Music size={13} color="var(--electric-blue)" />
                  {featured.trackCount ? `${featured.trackCount} ${t.latest.tracksSuffix}` : t.latest.officialMaster}
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.4rem',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.74rem',
                    color: 'var(--text-muted)',
                  }}
                >
                  <Calendar size={13} color="var(--neon-magenta)" />
                  {featured.year} {t.latest.yearSuffix}
                </div>
              </div>

              <div style={{ marginTop: '0.75rem' }}>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.55rem',
                    padding: '0.85rem 1.65rem',
                    borderRadius: '100px',
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(217, 70, 239, 0.35) 100%)',
                    border: '1px solid rgba(217, 70, 239, 0.45)',
                    color: '#ffffff',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.84rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    minHeight: '44px',
                  }}
                >
                  <Disc3 size={15} />
                  {t.latest.listenRelease}
                </span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Горизонтальная карусель свежих релизов */}
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '1.25rem',
            }}
          >
            <span
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem',
                color: 'var(--text-dim)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
              }}
            >
              {t.latest.otherReleases} // {rest.length}
            </span>

            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button
                onClick={() => scrollList('left')}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-line)',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }}
                aria-label={t.latest.prev}
              >
                <ChevronLeft size={16} />
              </button>
              <button
                onClick={() => scrollList('right')}
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid var(--border-line)',
                  color: 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.color = 'var(--text-muted)';
                }}
                aria-label={t.latest.next}
              >
                <ChevronRight size={16} />
              </button>
            </div>
          </div>

          <div
            ref={scrollContainerRef}
            style={{
              display: 'flex',
              gap: '1.25rem',
              overflowX: 'auto',
              scrollSnapType: 'x mandatory',
              scrollbarWidth: 'none',
              paddingBottom: '0.75rem',
            }}
          >
            {rest.map((release, index) => (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                onClick={() => setSelectedRelease(release)}
                style={{
                  flexShrink: 0,
                  width: 'clamp(230px, 28vw, 300px)',
                  scrollSnapAlign: 'start',
                  background: 'var(--bg-glass)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid var(--border-line)',
                  borderRadius: '20px',
                  padding: '1.1rem',
                  cursor: 'pointer',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px)';
                  e.currentTarget.style.borderColor = 'rgba(217, 70, 239, 0.4)';
                  e.currentTarget.style.boxShadow = '0 18px 40px rgba(0,0,0,0.65), 0 0 25px rgba(217,70,239,0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.borderColor = 'var(--border-line)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div style={{ borderRadius: '14px', overflow: 'hidden', marginBottom: '0.9rem' }}>
                  <ReleaseCover release={release} size="100%" />
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginBottom: '0.35rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.68rem',
                      color: 'var(--electric-blue)',
                      textTransform: 'uppercase',
                      letterSpacing: '0.1em',
                      fontWeight: 600,
                    }}
                  >
                    {release.type === 'album' ? t.latest.album : release.type === 'ep' ? t.latest.ep : t.latest.single}
                  </span>
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.68rem',
                      color: 'var(--text-dim)',
                    }}
                  >
                    {formatReleaseDate(release.releaseDate, lang)}
                  </span>
                </div>

                <h4
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    marginBottom: '0.25rem',
                  }}
                >
                  {release.title}
                </h4>

                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                    margin: 0,
                  }}
                >
                  {release.artist}
                  {release.featuring && (
                    <span style={{ color: 'var(--electric-blue)' }}>
                      {' '}ft. {release.featuring.join(', ')}
                    </span>
                  )}
                </p>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginTop: '0.85rem',
                    paddingTop: '0.65rem',
                    borderTop: '1px solid var(--border-line)',
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.68rem',
                    color: 'var(--text-dim)',
                  }}
                >
                  <span>{release.trackCount ? `${release.trackCount} ${t.latest.tracksSuffix}` : (lang === 'ru' ? 'Сингл' : 'Single')}</span>
                  <span style={{ color: 'var(--neon-magenta)', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    {lang === 'ru' ? 'Слушать' : 'Listen'} <ExternalLink size={10} />
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <ReleaseModal
        release={selectedRelease}
        onClose={() => setSelectedRelease(null)}
      />

      <style>{`
        @media (max-width: 900px) {
          .latest-featured-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
