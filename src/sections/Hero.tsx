import { motion } from 'framer-motion';
import { Disc3, Play, ExternalLink, ArrowDown, Sparkles } from 'lucide-react';
import LiquidSculpture3D from '../scenes/LiquidSculpture3D';
import { artist } from '../data/artist';

export default function Hero() {
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
        paddingTop: 'clamp(5.5rem, 12vh, 8.5rem)',
        paddingBottom: 'clamp(3.5rem, 8vh, 5.5rem)',
        zIndex: 2,
        overflow: 'hidden',
      }}
    >
      <div className="container-wide" style={{ width: '100%' }}>
        <div className="hero-editorial-grid">
          {/* Left Column: Личность артиста */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', zIndex: 3 }}
          >
            {/* Минималистичный бейдж */}
            <div className="editorial-badge magenta">
              <Sparkles size={11} color="var(--neon-magenta)" />
              <span>ОФИЦИАЛЬНАЯ ЦИФРОВАЯ ПЛАТФОРМА</span>
            </div>

            {/* Имя артиста и монограмма */}
            <div
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: '1rem',
                marginBottom: '1rem',
              }}
            >
              <h1
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 'clamp(3rem, 7.5vw, 6rem)',
                  fontWeight: 800,
                  letterSpacing: '-0.04em',
                  lineHeight: 0.95,
                  background: 'linear-gradient(135deg, #ffffff 0%, #cbd5e1 50%, #94a3b8 100%)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  margin: 0,
                }}
              >
                NARVENT
              </h1>
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.8rem',
                  color: 'var(--electric-blue)',
                  letterSpacing: '0.15em',
                  fontWeight: 600,
                }}
              >
                [01]
              </span>
            </div>

            {/* Mobile 3D preview insertion */}
            <div className="mobile-only" style={{ width: '100%', height: '320px', margin: '1rem 0' }}>
              <LiquidSculpture3D />
            </div>

            {/* Кто такой Narvent и какую музыку создаёт */}
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.2rem, 2.3vw, 1.85rem)',
                fontWeight: 600,
                color: '#e2e8f0',
                lineHeight: 1.35,
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
                maxWidth: '600px',
              }}
            >
              Архитектор ноктюрнального вейв-фонка и атмосферного космического синтвейва.
            </h2>

            <p
              style={{
                fontSize: 'clamp(0.92rem, 1.4vw, 1.05rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                maxWidth: '560px',
                marginBottom: '2.25rem',
                fontWeight: 400,
              }}
            >
              Фарход Мусульмонов (Narvent) — создатель мирового феномена <em>«Memory Reboot»</em> (310М+ стримов, Золото RIAA, #13 Billboard Dance) и концептуальных альбомов <em>«Insomnia»</em> и <em>«Genesis»</em>. Звуковые полотна ночных автострад, вибрирующего баса и неонового тумана.
            </p>

            {/* Кнопки действий */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '1rem',
                alignItems: 'center',
                marginBottom: '3rem',
              }}
            >
              <button
                onClick={() => scrollTo('archive')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.65rem',
                  padding: '0.9rem 1.95rem',
                  borderRadius: '100px',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.45) 0%, rgba(217, 70, 239, 0.4) 100%)',
                  border: '1px solid rgba(217, 70, 239, 0.5)',
                  boxShadow: '0 8px 30px rgba(99, 102, 241, 0.25), 0 0 25px rgba(217, 70, 239, 0.25)',
                  color: '#ffffff',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.88rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  cursor: 'pointer',
                  minHeight: '48px',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(217, 70, 239, 0.45), 0 0 30px rgba(99, 102, 241, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(99, 102, 241, 0.25), 0 0 25px rgba(217, 70, 239, 0.25)';
                }}
              >
                <Disc3 size={16} />
                <span>3D ДИСКОГРАФИЯ</span>
              </button>

              <button
                onClick={() => scrollTo('popular')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.9rem 1.75rem',
                  borderRadius: '100px',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  color: 'var(--text-pure)',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  minHeight: '48px',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.09)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Play size={14} />
                <span>ТОП ТРЕКИ</span>
              </button>

              <a
                href="https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  color: '#1db954',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  padding: '0.5rem 0.75rem',
                  transition: 'color 0.2s',
                }}
              >
                <span>SPOTIFY</span>
                <ExternalLink size={12} />
              </a>
            </div>

            {/* Подтверждённые факты и метрики */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                gap: '1.25rem',
                paddingTop: '1.75rem',
                borderTop: '1px solid var(--border-line)',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#ffffff',
                  }}
                >
                  310M+
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.7rem',
                    color: 'var(--text-dim)',
                    letterSpacing: '0.08em',
                    marginTop: '2px',
                  }}
                >
                  «Memory Reboot»
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: '#ffd166',
                  }}
                >
                  ЗОЛОТО
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.7rem',
                    color: 'var(--text-dim)',
                    letterSpacing: '0.08em',
                    marginTop: '2px',
                  }}
                >
                  Сертификат RIAA
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.5rem',
                    fontWeight: 700,
                    color: 'var(--electric-blue)',
                  }}
                >
                  #13
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.7rem',
                    color: 'var(--text-dim)',
                    letterSpacing: '0.08em',
                    marginTop: '2px',
                  }}
                >
                  Billboard Hot Dance
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: 3D Жидкая материя */}
          <motion.div
            className="desktop-only"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(420px, 60vh, 720px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LiquidSculpture3D />

            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.68rem',
                color: 'var(--text-dim)',
                letterSpacing: '0.12em',
                background: 'rgba(10, 11, 28, 0.7)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '0.35rem 0.85rem',
                borderRadius: '100px',
                pointerEvents: 'none',
              }}
            >
              ИНТЕРАКТИВНАЯ МАТЕРИЯ // УПРАВЛЕНИЕ МЫШЬЮ
            </div>
          </motion.div>
        </div>
      </div>

      {/* Индикатор скролла */}
      <div
        style={{
          position: 'absolute',
          bottom: '1.25rem',
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.35rem',
          color: 'var(--text-dim)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          pointerEvents: 'none',
        }}
      >
        <span>ЛИСТАЙТЕ ВНИЗ</span>
        <ArrowDown size={13} />
      </div>

      <style>{`
        .hero-editorial-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          align-items: center;
          gap: clamp(2rem, 5vw, 4rem);
        }
        @media (max-width: 900px) {
          .hero-editorial-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </section>
  );
}
