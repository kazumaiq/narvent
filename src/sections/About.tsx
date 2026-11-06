import { motion } from 'framer-motion';
import { Sparkles, Award, Radio, Disc, Milestone, Globe, Cpu } from 'lucide-react';
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
        {/* Section Header */}
        <div style={{ marginBottom: '4rem' }}>
          <span className="section-badge">
            <Sparkles size={12} color="#7093ff" />
            EDITORIAL MONOGRAPH // IDENTITY & ARCHITECTURE
          </span>
          <h2 className="section-title">The Architect Behind The Sound</h2>
        </div>

        {/* Editorial Two-Column Feature */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(clamp(280px, 35vw, 500px), 1fr))',
            gap: 'clamp(2rem, 5vw, 4.5rem)',
            alignItems: 'start',
            marginBottom: '4.5rem',
          }}
        >
          {/* Left Column: Philosophical Overview & Quote */}
          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                fontWeight: 600,
                color: '#ffffff',
                lineHeight: 1.3,
                letterSpacing: '-0.02em',
                marginBottom: '1.75rem',
              }}
            >
              Shaping the atmospheric horizon where dark synthwave, wave phonk, and nocturnal nostalgia converge.
            </div>

            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '1rem',
                color: 'rgba(212, 200, 245, 0.85)',
                lineHeight: 1.8,
                marginBottom: '1.5rem',
                fontWeight: 300,
              }}
            >
              {artist.bio}
            </p>

            {/* Stylized Editorial Quote Callout */}
            <div
              style={{
                position: 'relative',
                background: 'linear-gradient(135deg, rgba(79, 117, 255, 0.08) 0%, rgba(107, 77, 150, 0.08) 100%)',
                borderLeft: '3px solid #7093ff',
                padding: '1.25rem 1.5rem',
                borderRadius: '0 16px 16px 0',
                margin: '2rem 0',
              }}
            >
              <div
                style={{
                  fontFamily: "'Cinzel', serif",
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
                  color: '#7093ff',
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
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  borderRadius: '12px',
                  padding: '1rem',
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.68rem',
                    color: 'rgba(184, 169, 212, 0.6)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '0.3rem',
                  }}
                >
                  DAW & Roots
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.95rem', fontWeight: 600 }}>
                  FL Studio (since ~2016)
                </div>
              </div>

              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 255, 255, 0.07)',
                  borderRadius: '12px',
                  padding: '1rem',
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.68rem',
                    color: 'rgba(184, 169, 212, 0.6)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '0.3rem',
                  }}
                >
                  Imprint & Alliance
                </div>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: '0.95rem', fontWeight: 600 }}>
                  volume100 / Utopia Universe
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Achievements & Metric Cards */}
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
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: idx * 0.08 }}
                  style={{
                    background: 'rgba(12, 12, 32, 0.65)',
                    backdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    borderRadius: '18px',
                    padding: '1.5rem',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(111, 147, 255, 0.4)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  <div
                    style={{
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 'clamp(1.6rem, 2.5vw, 2.2rem)',
                      fontWeight: 800,
                      color: idx === 0 ? '#ffd166' : idx === 1 ? '#7093ff' : '#ffffff',
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
                      color: '#7093ff',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      marginBottom: '0.6rem',
                    }}
                  >
                    {item.label}
                  </div>

                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.82rem',
                      color: 'rgba(184, 169, 212, 0.75)',
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

        {/* Chronological Timeline Section */}
        <div style={{ marginTop: '5rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span className="section-badge" style={{ margin: '0 auto 1rem' }}>
              <Milestone size={12} color="#7093ff" />
              EVOLUTIONARY TRAJECTORY
            </span>
            <h3 style={{ fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 700 }}>
              Milestones Across The Soundscape
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
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                style={{
                  background: 'rgba(12, 12, 32, 0.5)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '16px',
                  padding: '1.5rem',
                  position: 'relative',
                }}
              >
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '1.3rem',
                    fontWeight: 700,
                    color: '#7093ff',
                    marginBottom: '0.4rem',
                  }}
                >
                  {ms.year}
                </div>

                <h4
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.1rem',
                    fontWeight: 600,
                    color: '#ffffff',
                    marginBottom: '0.5rem',
                  }}
                >
                  {ms.title}
                </h4>

                <p
                  style={{
                    fontFamily: "'Inter', sans-serif",
                    fontSize: '0.85rem',
                    color: 'rgba(184, 169, 212, 0.75)',
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
