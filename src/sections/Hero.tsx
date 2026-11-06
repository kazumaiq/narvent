import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Disc3, Play, ExternalLink, ArrowDown, Sparkles, Radio } from 'lucide-react';
import CosmicResonator3D from '../scenes/CosmicResonator3D';
import ReleaseModal from '../components/ReleaseModal';
import { getLatestReleases, Release } from '../data/releases';

export default function Hero() {
  const latestRelease = getLatestReleases()[0];
  const [selectedRelease, setSelectedRelease] = useState<Release | null>(null);

  // Smooth mouse parallax coordinates
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const nx = (e.clientX / window.innerWidth - 0.5) * 2;
      const ny = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x: nx, y: ny });
    };
    window.addEventListener('mousemove', onMove, { passive: true });
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Parallax on scroll
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 800], [0, 150]);
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0.2]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'clamp(5rem, 10vh, 7.5rem)',
        paddingBottom: 'clamp(3.5rem, 7vh, 5rem)',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      {/* Dynamic Background Parallax Nebula Glare */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '5%',
          width: 'clamp(300px, 45vw, 650px)',
          height: 'clamp(300px, 45vw, 650px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217, 70, 239, 0.16) 0%, rgba(56, 189, 248, 0.1) 40%, transparent 70%)',
          filter: 'blur(70px)',
          transform: `translate3d(${mousePos.x * -25}px, ${mousePos.y * -25}px, 0)`,
          transition: 'transform 0.4s ease-out',
          pointerEvents: 'none',
        }}
      />

      <motion.div
        className="container-wide"
        style={{
          width: '100%',
          y: heroY,
          opacity: heroOpacity,
        }}
      >
        <div className="hero-editorial-grid">
          {/* Left Column: Личность артиста, Релизы, Достижения */}
          <motion.div
            initial={{ opacity: 0, x: -35 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              zIndex: 3,
              transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`,
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            {/* Микро-бейдж */}
            <div className="editorial-badge magenta" style={{ marginBottom: '1.25rem' }}>
              <Radio size={12} color="var(--neon-magenta)" className="pulse-dot" />
              <span>ОФИЦИАЛЬНЫЙ САЙТ АРТИСТА // VOLUME100</span>
            </div>

            {/* Заголовок NARVENT */}
            <h1
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(3.2rem, 8vw, 6.4rem)',
                fontWeight: 800,
                letterSpacing: '-0.04em',
                lineHeight: 0.92,
                background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 55%, #94a3b8 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                margin: '0 0 1rem 0',
              }}
            >
              NARVENT
            </h1>

            {/* Mobile 3D Artifact Display */}
            <div className="mobile-only" style={{ width: '100%', height: '300px', margin: '1rem 0 1.5rem 0' }}>
              <CosmicResonator3D />
            </div>

            {/* Лаконичный подзаголовок БЕЗ ВОДЫ */}
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.15rem, 2.2vw, 1.7rem)',
                fontWeight: 600,
                color: '#e2e8f0',
                lineHeight: 1.3,
                letterSpacing: '-0.02em',
                marginBottom: '0.85rem',
                maxWidth: '580px',
              }}
            >
              Атмосферный вейв-фонк и кинематографичный синтвейв.
            </h2>

            <p
              style={{
                fontSize: 'clamp(0.9rem, 1.3vw, 1.02rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                maxWidth: '540px',
                marginBottom: '1.75rem',
                fontWeight: 400,
              }}
            >
              Фарход Мусульмонов (Самарканд) — создатель мирового феномена <em>«Memory Reboot»</em>. Звуковые полотна ночных автострад, пульсирующего суб-баса и космического тумана.
            </p>

            {/* Интерактивный виджет ПОСЛЕДНЕГО РЕЛИЗА прямо в Hero */}
            {latestRelease && (
              <motion.div
                whileHover={{ scale: 1.02 }}
                onClick={() => setSelectedRelease(latestRelease)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.1rem',
                  padding: '0.85rem 1.25rem',
                  borderRadius: '16px',
                  background: 'rgba(15, 17, 30, 0.75)',
                  border: '1px solid rgba(217, 70, 239, 0.35)',
                  backdropFilter: 'blur(16px)',
                  boxShadow: '0 10px 30px rgba(0,0,0,0.5), 0 0 25px rgba(217, 70, 239, 0.15)',
                  maxWidth: '520px',
                  marginBottom: '2rem',
                  cursor: 'pointer',
                  transition: 'border-color 0.3s ease',
                }}
              >
                {/* Обложка последнего релиза */}
                <div
                  style={{
                    position: 'relative',
                    width: '56px',
                    height: '56px',
                    borderRadius: '10px',
                    overflow: 'hidden',
                    flexShrink: 0,
                    boxShadow: '0 4px 15px rgba(0,0,0,0.6)',
                  }}
                >
                  <img
                    src={latestRelease.coverImage || '/covers/genesis.jpg'}
                    alt={latestRelease.title}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'rgba(0,0,0,0.25)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Play size={18} color="#ffffff" fill="#ffffff" />
                  </div>
                </div>

                {/* Метаданные релиза */}
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '2px' }}>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.68rem',
                        fontWeight: 700,
                        color: 'var(--neon-magenta)',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                      }}
                    >
                      НОВЫЙ РЕЛИЗ 2026
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem' }}>•</span>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.68rem',
                        color: 'var(--text-dim)',
                      }}
                    >
                      {latestRelease.trackCount || 17} ТРЕКОВ
                    </span>
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: '1.05rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      letterSpacing: '-0.01em',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {latestRelease.title}
                  </div>
                </div>

                {/* Кнопка Слушать */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.35rem',
                    padding: '0.45rem 0.85rem',
                    borderRadius: '8px',
                    background: 'rgba(217, 70, 239, 0.2)',
                    border: '1px solid rgba(217, 70, 239, 0.4)',
                    color: '#ffffff',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 600,
                    letterSpacing: '0.04em',
                    flexShrink: 0,
                  }}
                >
                  <span>СЛУШАТЬ</span>
                </div>
              </motion.div>
            )}

            {/* Кнопки действий */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.9rem',
                alignItems: 'center',
                marginBottom: '2.5rem',
              }}
            >
              <button
                onClick={() => scrollTo('archive')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.85rem 1.85rem',
                  borderRadius: '100px',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.5) 0%, rgba(217, 70, 239, 0.45) 100%)',
                  border: '1px solid rgba(217, 70, 239, 0.55)',
                  boxShadow: '0 8px 30px rgba(99, 102, 241, 0.3), 0 0 25px rgba(217, 70, 239, 0.25)',
                  color: '#ffffff',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  minHeight: '46px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(217, 70, 239, 0.45)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(99, 102, 241, 0.3), 0 0 25px rgba(217, 70, 239, 0.25)';
                }}
              >
                <Disc3 size={17} />
                <span>3D ДИСКОГРАФИЯ</span>
              </button>

              <button
                onClick={() => scrollTo('popular')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.85rem 1.65rem',
                  borderRadius: '100px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.86rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  minHeight: '46px',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                }}
              >
                <Play size={15} />
                <span>ТОП ТРЕКИ</span>
              </button>

              <a
                href="https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.85rem 1.4rem',
                  borderRadius: '100px',
                  background: 'rgba(29, 185, 84, 0.12)',
                  border: '1px solid rgba(29, 185, 84, 0.35)',
                  color: '#1ed760',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  minHeight: '46px',
                  transition: 'all 0.25s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(29, 185, 84, 0.22)';
                  e.currentTarget.style.boxShadow = '0 0 20px rgba(29, 185, 84, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(29, 185, 84, 0.12)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span>SPOTIFY</span>
                <ExternalLink size={14} />
              </a>
            </div>

            {/* Достижения артиста — параллакс карточки */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '0.85rem',
                maxWidth: '600px',
              }}
            >
              {[
                { label: '310M+', sub: '«Memory Reboot»', badge: 'Мировой хит' },
                { label: 'ЗОЛОТО RIAA', sub: 'Сертификация США', badge: 'Официально' },
                { label: '#13 BILLBOARD', sub: 'Hot Dance / Elec', badge: 'Чарт США' },
                { label: '3.2M+', sub: 'Слушателей / мес', badge: 'Spotify' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: '12px',
                    background: 'rgba(10, 12, 22, 0.65)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    backdropFilter: 'blur(12px)',
                    transform: `translate3d(${mousePos.x * (idx + 1) * 3}px, ${mousePos.y * (idx + 1) * 3}px, 0)`,
                    transition: 'transform 0.3s ease-out, border-color 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(217, 70, 239, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 'clamp(1rem, 1.6vw, 1.3rem)',
                      fontWeight: 800,
                      color: '#ffffff',
                      letterSpacing: '-0.02em',
                      lineHeight: 1.1,
                      marginBottom: '2px',
                    }}
                  >
                    {stat.label}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.68rem',
                      color: 'var(--text-dim)',
                      lineHeight: 1.2,
                    }}
                  >
                    {stat.sub}
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Right Column: 3D Квантовый Резонатор (Desktop) */}
          <div
            className="desktop-only"
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(520px, 60vh, 700px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transform: `translate3d(${mousePos.x * -18}px, ${mousePos.y * -18}px, 0)`,
              transition: 'transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          >
            <CosmicResonator3D />

            {/* Плавающие телеметрические маркеры */}
            <div
              style={{
                position: 'absolute',
                top: '12%',
                right: '4%',
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                background: 'rgba(5, 7, 16, 0.75)',
                border: '1px solid rgba(56, 189, 248, 0.3)',
                backdropFilter: 'blur(10px)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.68rem',
                color: 'var(--electric-blue)',
                pointerEvents: 'none',
              }}
            >
              FREQ // 432.0 HZ
            </div>

            <div
              style={{
                position: 'absolute',
                bottom: '12%',
                left: '6%',
                padding: '0.45rem 0.85rem',
                borderRadius: '8px',
                background: 'rgba(5, 7, 16, 0.75)',
                border: '1px solid rgba(217, 70, 239, 0.3)',
                backdropFilter: 'blur(10px)',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.68rem',
                color: 'var(--neon-magenta)',
                pointerEvents: 'none',
              }}
            >
              LOC // 39.65° N SAMARKAND
            </div>
          </div>
        </div>
      </motion.div>

      {/* Модальное окно релиза при клике */}
      {selectedRelease && (
        <ReleaseModal
          release={selectedRelease}
          onClose={() => setSelectedRelease(null)}
        />
      )}
    </section>
  );
}
