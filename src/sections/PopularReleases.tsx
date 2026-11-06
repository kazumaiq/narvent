import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Trophy, Disc3, ExternalLink, Flame } from 'lucide-react';
import { releases, Release } from '../data/releases';
import { useLanguage } from '../context/LanguageContext';
import ReleaseCover from '../components/ReleaseCover';
import ReleaseModal from '../components/ReleaseModal';

export default function PopularReleases() {
  const { t } = useLanguage();
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

  // Подтверждённый порядок ключевых синглов
  const rankingMeta: Record<string, { streamOrder: number }> = {
    'memory-reboot': { streamOrder: 310 },
    'fainted': { streamOrder: 85 },
    'her-eyes': { streamOrder: 65 },
    'distant-echoes': { streamOrder: 45 },
    'euphoria': { streamOrder: 35 },
    'fade-into-darkness': { streamOrder: 25 },
  };

  const rankedTracks = useMemo(() => {
    const popularKeys = Object.keys(rankingMeta);
    return releases
      .filter((r) => popularKeys.includes(r.id) && r.type === 'single')
      .sort((a, b) => (rankingMeta[b.id]?.streamOrder || 0) - (rankingMeta[a.id]?.streamOrder || 0));
  }, []);

  return (
    <section
      id="popular"
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
            <Trophy size={11} color="var(--electric-blue)" />
            {t.popular.badge}
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
              <h2 className="editorial-title">{t.popular.title}</h2>
              <p className="editorial-subtitle">
                {t.popular.subtitle}
              </p>
            </div>

            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.75rem',
                color: 'var(--text-dim)',
                letterSpacing: '0.08em',
              }}
            >
              {t.popular.sortBadge}
            </div>
          </div>
        </motion.div>

        {/* Кинематографичный список треков */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {rankedTracks.map((release, index) => {
            const meta = rankingMeta[release.id] || {
              streams: 'Миллионы прослушиваний',
              highlight: 'Официальный релиз каталога Narvent',
              streamOrder: 0,
            };

            return (
              <motion.div
                key={release.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                onClick={() => setSelectedRelease(release)}
                className="popular-track-card"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.01) translateX(6px)';
                  e.currentTarget.style.borderColor = 'rgba(217, 70, 239, 0.45)';
                  e.currentTarget.style.background = 'var(--bg-glass-active)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(0, 0, 0, 0.65), 0 0 25px rgba(217, 70, 239, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1) translateX(0)';
                  e.currentTarget.style.borderColor = 'var(--border-line)';
                  e.currentTarget.style.background = 'var(--bg-glass)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Номер трека */}
                <div
                  className="track-rank"
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 'clamp(1.15rem, 2.2vw, 1.6rem)',
                    fontWeight: 700,
                    color: index === 0 ? '#ffd166' : index === 1 ? '#d946ef' : 'var(--electric-blue)',
                    letterSpacing: '-0.03em',
                  }}
                >
                  0{index + 1}
                </div>

                {/* Обложка */}
                <div className="track-cover" style={{ width: '100%', maxWidth: '85px' }}>
                  <ReleaseCover release={release} size="100%" showDetails={false} />
                </div>

                {/* Название и мета */}
                <div className="track-info" style={{ minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.6rem',
                      marginBottom: '0.2rem',
                      flexWrap: 'wrap',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 'clamp(1.05rem, 2vw, 1.35rem)',
                        fontWeight: 700,
                        color: '#ffffff',
                        margin: 0,
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {release.title}
                    </h3>

                    {index === 0 && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.25rem',
                          background: 'rgba(255, 209, 102, 0.12)',
                          border: '1px solid rgba(255, 209, 102, 0.35)',
                          color: '#ffd166',
                          fontSize: '0.65rem',
                          fontWeight: 700,
                          padding: '0.15rem 0.55rem',
                          borderRadius: '100px',
                          letterSpacing: '0.08em',
                        }}
                      >
                        <Flame size={10} />
                        {t.popular.viralBadge}
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: 'clamp(0.8rem, 1.2vw, 0.92rem)',
                      color: 'var(--text-muted)',
                      lineHeight: 1.4,
                    }}
                  >
                    {release.artist}
                    {release.featuring && (
                      <span style={{ color: 'var(--electric-blue)' }}>
                        {' '}
                        ({t.popular.featWith} {release.featuring.join(', ')})
                      </span>
                    )}
                  </div>

                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.68rem',
                      color: 'var(--text-dim)',
                      marginTop: '0.35rem',
                      letterSpacing: '0.04em',
                      lineHeight: 1.4,
                    }}
                  >
                    {t.popular.highlights[release.id] || ''}
                  </div>
                </div>

                {/* Правая колонка: Лейбл релиза и кнопка */}
                <div
                  className="track-action"
                  style={{
                    textAlign: 'right',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-end',
                    gap: '0.35rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.7rem',
                      color: 'var(--text-dim)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                    }}
                  >
                    {t.popular.singleTag} // {release.year}
                  </span>

                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.35rem',
                      padding: '0.35rem 0.8rem',
                      borderRadius: '100px',
                      background: 'rgba(56, 189, 248, 0.08)',
                      border: '1px solid rgba(56, 189, 248, 0.25)',
                      color: 'var(--electric-blue)',
                      fontSize: '0.72rem',
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontWeight: 600,
                      letterSpacing: '0.04em',
                    }}
                  >
                    <Disc3 size={12} />
                    <span>{t.popular.listen}</span>
                    <ExternalLink size={10} />
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <ReleaseModal
        release={selectedRelease}
        onClose={() => setSelectedRelease(null)}
      />
    </section>
  );
}
