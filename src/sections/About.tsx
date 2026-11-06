import { motion } from 'framer-motion';
import { Sparkles, Milestone, Disc, Radio, ExternalLink } from 'lucide-react';
import { artist } from '../data/artist';

export default function About() {
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
        {/* Header Block */}
        <div style={{ marginBottom: '4rem' }}>
          <span className="editorial-badge magenta">
            <Sparkles size={11} color="var(--neon-magenta)" />
            EDITORIAL MONOGRAPH // IDENTITY & GENESIS
          </span>
          <h2 className="editorial-title">The Architect of Nocturnal Sound</h2>
        </div>

        {/* Editorial Two-Column Feature */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 35vw, 520px), 1fr))',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            alignItems: 'start',
            marginBottom: '4.5rem',
          }}
        >
          {/* Left Column: Biography & Philosophy */}
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
              Farkhod Musulmonov, known globally as Narvent, defines the atmospheric vanguard of wave phonk and dark synthwave.
            </div>

            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '1rem',
                color: 'var(--text-muted)',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
                fontWeight: 400,
              }}
            >
              {artist.bio}
            </p>

            {/* Editorial Quote Callout */}
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
                {artist.quote}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.72rem',
                  color: 'var(--neon-magenta)',
                  letterSpacing: '0.12em',
                }}
              >
                — NARVENT (FARKHOD MUSULMONOV)
              </div>
            </div>

            {/* Core Blueprint Specs */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1rem',
                marginTop: '2rem',
              }}
            >
              <div
                style={{
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-line)',
                  borderRadius: '14px',
                  padding: '1.1rem',
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.68rem',
                    color: 'var(--text-dim)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '0.3rem',
                  }}
                >
                  DAW & Origins
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.95rem', fontWeight: 600 }}>
                  FL Studio (since ~2016)
                </div>
              </div>

              <div
                style={{
                  background: 'var(--bg-glass)',
                  border: '1px solid var(--border-line)',
                  borderRadius: '14px',
                  padding: '1.1rem',
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.68rem',
                    color: 'var(--text-dim)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '0.3rem',
                  }}
                >
                  Distribution & Label
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.95rem', fontWeight: 600 }}>
                  volume100 / Believe Digital
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Verified Achievements Matrix */}
          <div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.25rem',
              }}
            >
              {artist.achievements.map((item, idx) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  style={{
                    background: 'var(--bg-glass)',
                    backdropFilter: 'blur(20px)',
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
                      color: idx === 0 ? '#ffd166' : idx === 1 ? 'var(--electric-blue)' : '#ffffff',
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
                      letterSpacing: '0.1em',
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

        {/* Chronological Milestones Timeline */}
        <div style={{ marginTop: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="editorial-badge" style={{ margin: '0 auto 1rem' }}>
              <Milestone size={11} color="var(--electric-blue)" />
              CHRONOLOGY 2019–2026
            </span>
            <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700 }}>
              Evolutionary Milestones Across The Soundscape
            </h3>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {artist.milestones.map((ms, index) => (
              <motion.div
                key={ms.year}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
                style={{
                  background: 'var(--bg-glass)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid var(--border-line)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '1.35rem',
                    fontWeight: 700,
                    color: 'var(--electric-blue)',
                    marginBottom: '0.4rem',
                  }}
                >
                  {ms.year}
                </div>

                <h4
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.1rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    marginBottom: '0.5rem',
                  }}
                >
                  {ms.title}
                </h4>

                <p
                  style={{
                    fontFamily: "'Manrope', sans-serif",
                    fontSize: '0.85rem',
                    color: 'var(--text-muted)',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {ms.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
