import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Disc3, Play, ExternalLink, ArrowDown, Sparkles, Radio } from 'lucide-react';
import CosmicResonator3D from '../scenes/CosmicResonator3D';
import ReleaseModal from '../components/ReleaseModal';
import { getLatestReleases, Release } from '../data/releases';
import { useLanguage } from '../context/LanguageContext';

export default function Hero() {
  const { t, lang } = useLanguage();
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
          top: '15%',
          right: '10%',
          width: 'clamp(280px, 40vw, 550px)',
          height: 'clamp(280px, 40vw, 550px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217, 70, 239, 0.12) 0%, rgba(56, 189, 248, 0.08) 40%, transparent 70%)',
          filter: 'blur(80px)',
          transform: `translate3d(${mousePos.x * -20}px, ${mousePos.y * -20}px, 0)`,
          transition: 'transform 0.4s ease-out',
          pointerEvents: 'none',
        }}
      />

      {/* Subtle Central Ambient Glow — Soft and fully contained, no hard edges or cutoffs */}
      <div
        style={{
          position: 'absolute',
          top: '35%',
          left: '20%',
          width: 'clamp(260px, 35vw, 500px)',
          height: 'clamp(260px, 35vw, 500px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(99, 102, 241, 0.08) 0%, transparent 70%)',
          filter: 'blur(70px)',
          transform: `translate3d(${mousePos.x * 12}px, ${mousePos.y * 12}px, 0)`,
          transition: 'transform 0.5s ease-out',
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
              minWidth: 0,
              width: '100%',
              maxWidth: '100%',
            }}
          >
            {/* Микро-бейдж */}
            <div className="editorial-badge magenta" style={{ marginBottom: '1.25rem' }}>
              <Radio size={12} color="var(--neon-magenta)" className="pulse-dot" />
              <span>{t.hero.badge}</span>
            </div>

            {/* Заголовок NARVENT */}
            <h1
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 'clamp(3rem, 8.5vw, 6.6rem)',
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

            {/* Лаконичный подзаголовок */}
            <h2
              style={{
                fontFamily: "var(--font-ui)",
                fontSize: 'clamp(1.15rem, 2.2vw, 1.7rem)',
                fontWeight: 600,
                color: '#e2e8f0',
                lineHeight: 1.3,
                letterSpacing: '-0.02em',
                marginBottom: '0.85rem',
                maxWidth: '580px',
              }}
            >
              {t.hero.subtitle}
            </h2>

            <p
              style={{
                fontFamily: "var(--font-main)",
                fontSize: 'clamp(0.88rem, 1.3vw, 1.02rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.6,
                maxWidth: '540px',
                marginBottom: '1.25rem',
                fontWeight: 400,
              }}
            >
              {t.hero.bio}
            </p>

            {/* Mobile 3D Artifact Centerpiece */}
            <div
              className="mobile-only"
              style={{
                width: '100%',
                height: 'clamp(190px, 28vh, 240px)',
                margin: '0.5rem 0 1.25rem 0',
                position: 'relative',
              }}
            >
              <CosmicResonator3D />
            </div>

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
                      {t.hero.latestReleaseTag}
                    </span>
                    <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.7rem' }}>•</span>
                    <span
                      style={{
                        fontFamily: "'JetBrains Mono', monospace",
                        fontSize: '0.68rem',
                        color: 'var(--text-dim)',
                      }}
                    >
                      {latestRelease.trackCount || 17} {t.hero.tracksCount}
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
                  <span>{t.hero.listen}</span>
                </div>
              </motion.div>
            )}

            {/* Кнопки действий */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '0.65rem',
                alignItems: 'center',
                marginBottom: '2rem',
                width: '100%',
              }}
            >
              <button
                onClick={() => scrollTo('archive')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.75rem 1.4rem',
                  borderRadius: '100px',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.5) 0%, rgba(217, 70, 239, 0.45) 100%)',
                  border: '1px solid rgba(217, 70, 239, 0.55)',
                  boxShadow: '0 8px 30px rgba(99, 102, 241, 0.3), 0 0 25px rgba(217, 70, 239, 0.25)',
                  color: '#ffffff',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  minHeight: '44px',
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
                <Disc3 size={16} />
                <span>{t.hero.cta3D}</span>
              </button>

              <button
                onClick={() => scrollTo('popular')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.55rem',
                  padding: '0.75rem 1.35rem',
                  borderRadius: '100px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: '#ffffff',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.84rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  minHeight: '44px',
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
                <Play size={14} />
                <span>{t.hero.ctaPopular}</span>
              </button>

              <a
                href="https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.75rem 1.25rem',
                  borderRadius: '100px',
                  background: 'rgba(29, 185, 84, 0.12)',
                  border: '1px solid rgba(29, 185, 84, 0.35)',
                  color: '#1ed760',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  minHeight: '44px',
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
                <span>{t.hero.ctaSpotify}</span>
                <ExternalLink size={13} />
              </a>
            </div>

            {/* Достижения артиста — Золото RIAA и #13 Billboard */}
            <div className="hero-stats-grid">
              {[
                { label: t.hero.riaaLabel, sub: t.hero.riaaSub, badge: lang === 'ru' ? 'Официально' : 'Official' },
                { label: t.hero.billboardLabel, sub: t.hero.billboardSub, badge: lang === 'ru' ? 'Чарт США' : 'US Chart' },
              ].map((stat, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '0.85rem 1.15rem',
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
                      fontSize: 'clamp(1rem, 1.6vw, 1.25rem)',
                      fontWeight: 800,
                      color: idx === 0 ? '#ffd166' : 'var(--electric-blue)',
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
              {t.hero.telemetryFreq}
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
              {t.hero.telemetryLoc}
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
