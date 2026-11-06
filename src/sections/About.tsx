import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();

  const achievements = [
    {
      value: t.about.riaaValue,
      label: t.about.riaaLabel,
      detail: t.about.riaaDetail,
    },
    {
      value: t.about.billboardValue,
      label: t.about.billboardLabel,
      detail: t.about.billboardDetail,
    },
  ];

  return (
    <section
      id="about"
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
          style={{ marginBottom: '4rem' }}
        >
          <span className="editorial-badge magenta">
            <Sparkles size={11} color="var(--neon-magenta)" />
            {t.about.badge}
          </span>
          <h2 className="editorial-title">{t.about.title}</h2>
        </motion.div>

        {/* Двухколоночная структура */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 35vw, 520px), 1fr))',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            alignItems: 'start',
            marginBottom: '4.5rem',
          }}
        >
          {/* Левая колонка: Биография и Философия */}
          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.35rem, 2.5vw, 1.95rem)',
                fontWeight: 600,
                color: '#ffffff',
                lineHeight: 1.35,
                letterSpacing: '-0.02em',
                marginBottom: '1.75rem',
              }}
            >
              {t.about.lead}
            </div>

            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '1rem',
                color: 'var(--text-muted)',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
                fontWeight: 400,
                whiteSpace: 'pre-line',
              }}
            >
              {t.about.bio}
            </p>

            {/* Цитата артиста */}
            <div
              style={{
                position: 'relative',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08) 0%, rgba(217, 70, 239, 0.08) 100%)',
                borderLeft: '3px solid var(--neon-magenta)',
                padding: '1.25rem 1.5rem',
                borderRadius: '0 16px 16px 0',
                margin: '2rem 0',
              }}
            >
              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1.15rem',
                  fontStyle: 'italic',
                  color: '#ffffff',
                  lineHeight: 1.5,
                  marginBottom: '0.5rem',
                }}
              >
                {t.about.quote}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.72rem',
                  color: 'var(--neon-magenta)',
                  letterSpacing: '0.12em',
                }}
              >
                {t.about.quoteAuthor}
              </div>
            </div>
          </div>

          {/* Правая колонка: Матрица верифицированных достижений */}
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(140px, 20vw, 220px), 1fr))',
                gap: 'clamp(0.85rem, 1.8vw, 1.25rem)',
              }}
            >
              {achievements.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  style={{
                    background: 'var(--bg-glass)',
                    backdropFilter: 'blur(20px)',
                    WebkitBackdropFilter: 'blur(20px)',
                    border: '1px solid var(--border-line)',
                    borderRadius: '18px',
                    padding: '1.5rem',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(217, 70, 239, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'var(--border-line)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                      fontWeight: 800,
                      color: idx === 0 ? '#ffd166' : 'var(--electric-blue)',
                      lineHeight: 1.1,
                      marginBottom: '0.35rem',
                    }}
                  >
                    {item.value}
                  </div>

                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.72rem',
                      color: 'var(--electric-blue)',
                      letterSpacing: '0.08em',
                      textTransform: 'uppercase',
                      marginBottom: '0.6rem',
                      fontWeight: 600,
                    }}
                  >
                    {item.label}
                  </div>

                  <div
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '0.82rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.5,
                    }}
                  >
                    {item.detail}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
