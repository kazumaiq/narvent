import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import { coverManifest } from '../data/coverManifest';
import { RevealText, RevealImage, ParallaxWatermark } from '../components/CinematicReveal';

export default function About() {
  const { t } = useLanguage();

  const achievements = [
    {
      index: '01',
      value: t.about.riaaValue,
      label: t.about.riaaLabel,
      detail: t.about.riaaDetail,
      accent: 'var(--neon-magenta)',
    },
    {
      index: '02',
      value: t.about.billboardValue,
      label: t.about.billboardLabel,
      detail: t.about.billboardDetail,
      accent: 'var(--electric-blue)',
    },
  ];

  return (
    <section
      id="about"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 11vh, 9.5rem) 0',
        zIndex: 2,
      }}
    >
      {/* Drifting Kinetic Background Watermark */}
      <ParallaxWatermark text="ARCHITECT // SOUND" top="8%" speed={90} opacity={0.03} />

      {/* Left Margin Rotated Vertical Label */}
      <div
        className="desktop-only mg-vertical-rail"
        style={{
          position: 'absolute',
          top: '8rem',
          left: 'clamp(0.6rem, 1.8vw, 1.5rem)',
          zIndex: 3,
        }}
      >
        <span>{t.about.badge} // NARVENT</span>
      </div>

      <div className="container">
        {/* Split Header */}
        <div className="mg-section-header">
          <div>
            <div className="editorial-kicker magenta">
              <span>05 // {t.about.badge}</span>
            </div>
            <h2 className="editorial-title">
              <RevealText text={t.about.title} />
            </h2>
          </div>
        </div>

        {/* Asymmetric Two-Column Editorial Spread */}
        <div className="about-editorial-grid">
          {/* Left Column: Concise Biography & Architectural Manifesto Block (No italic/serif) */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(1.15rem, 2vw, 1.65rem)',
                fontWeight: 800,
                color: '#ffffff',
                lineHeight: 1.25,
                letterSpacing: '-0.025em',
                textTransform: 'uppercase',
                marginBottom: '1.5rem',
              }}
            >
              {t.about.lead}
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.75, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'var(--font-main)',
                fontSize: 'clamp(0.95rem, 1.3vw, 1.06rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.75,
                marginBottom: '2.25rem',
              }}
            >
              {t.about.bio}
            </motion.p>

            {/* Architectural Manifesto Block (Pure Grotesque, Zero Cursive/Serif) */}
            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              style={{
                position: 'relative',
                borderLeft: '3px solid var(--neon-magenta)',
                background: 'rgba(10, 11, 24, 0.65)',
                padding: '1.35rem 1.5rem',
                margin: 0,
              }}
            >
              <div
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: 'clamp(1.05rem, 1.7vw, 1.35rem)',
                  fontWeight: 700,
                  color: '#ffffff',
                  lineHeight: 1.38,
                  letterSpacing: '-0.015em',
                  marginBottom: '0.65rem',
                }}
              >
                {t.about.quote}
              </div>
              <cite
                style={{
                  fontStyle: 'normal',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  color: 'var(--neon-magenta)',
                  letterSpacing: '0.16em',
                  textTransform: 'uppercase',
                }}
              >
                {t.about.quoteAuthor}
              </cite>
            </motion.blockquote>
          </div>

          {/* Right Column: Asymmetric Artwork Diptych + Architectural Milestones */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1.15fr 0.85fr',
                gap: '1rem',
                alignItems: 'end',
              }}
            >
              <RevealImage
                direction="left"
                parallax={16}
                style={{
                  aspectRatio: '1 / 1',
                  border: '1px solid var(--border-strong)',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.75)',
                }}
              >
                <img
                  src={coverManifest['memory-reboot']}
                  alt="Memory Reboot — Narvent & VØJ"
                  width={420}
                  height={420}
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </RevealImage>

              <RevealImage
                direction="right"
                delay={0.12}
                parallax={-18}
                style={{
                  aspectRatio: '1 / 1',
                  border: '1px solid var(--border-strong)',
                  boxShadow: '0 24px 60px rgba(0, 0, 0, 0.75)',
                  marginBottom: '1.25rem',
                }}
              >
                <img
                  src={coverManifest['genesis']}
                  alt="Genesis — Narvent"
                  width={340}
                  height={340}
                  decoding="async"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </RevealImage>
            </div>

            {/* Verified Achievements Architectural Grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                borderTop: '1px solid var(--border-strong)',
                borderBottom: '1px solid var(--border-strong)',
              }}
            >
              {achievements.map((item, idx) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  style={{
                    padding: '1.5rem 1.25rem',
                    borderRight: idx === 0 ? '1px solid var(--border-line)' : 'none',
                  }}
                >
                  <div
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.66rem',
                      color: item.accent,
                      letterSpacing: '0.16em',
                      textTransform: 'uppercase',
                      marginBottom: '0.5rem',
                      fontWeight: 600,
                    }}
                  >
                    {item.index} // {item.label}
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.85rem, 3.2vw, 2.75rem)',
                      fontWeight: 900,
                      color: '#ffffff',
                      letterSpacing: '-0.04em',
                      lineHeight: 1,
                      marginBottom: '0.5rem',
                    }}
                  >
                    {item.value}
                  </div>

                  <div
                    style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: '0.84rem',
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
