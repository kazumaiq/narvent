import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Maximize2, Minimize2, Compass, Moon, Shield, Eye } from 'lucide-react';
import { KageLandingPage } from '../threeui/KageLandingPage';

export default function KageSanctuary() {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [activeChapter, setActiveChapter] = useState(0);

  const chapters = [
    { num: '01', title: 'The Approach', desc: 'Nocturnal stone pathway & lanterns' },
    { num: '02', title: 'Torii Gate', desc: 'Charred cypress threshold' },
    { num: '03', title: 'Pathways', desc: 'Deep mountain mist & rain' },
    { num: '04', title: 'Lessons', desc: 'Luminous pavilion of reflections' },
    { num: '05', title: 'Eternity', desc: 'The summit beneath the violet moon' },
  ];

  return (
    <section
      id="sanctuary"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vh, 9rem) 0',
        zIndex: 3,
        overflow: 'hidden',
      }}
    >
      {/* Ambient atmospheric transitional background glow */}
      <div
        style={{
          position: 'absolute',
          top: '20%',
          left: '50%',
          transform: 'translateX(-50%)',
          width: 'clamp(320px, 70vw, 900px)',
          height: 'clamp(320px, 70vw, 700px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, rgba(217, 70, 239, 0.06) 50%, transparent 75%)',
          filter: 'blur(80px)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />

      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span className="editorial-badge magenta" style={{ margin: '0 auto 1.25rem' }}>
            <Sparkles size={11} color="var(--neon-magenta)" />
            SPATIAL REALM // THREEUI × NARVENT KAGE
          </span>

          <h2 className="editorial-title">
            The Nocturnal Sanctuary
          </h2>

          <p className="editorial-subtitle" style={{ margin: '0.85rem auto 0' }}>
            An interactive five-chapter night walk through charred cypress, lantern light, and floating mist.
            Where Narvent's nocturnal soundscapes converge with ThreeUI's living 3D world.
          </p>

          {/* Chapter Milestones Strip */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: 'center',
              gap: '0.65rem',
              marginTop: '1.75rem',
            }}
          >
            {chapters.map((ch, idx) => (
              <div
                key={ch.num}
                onClick={() => setActiveChapter(idx)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.4rem 0.85rem',
                  borderRadius: '100px',
                  background: activeChapter === idx ? 'rgba(168, 85, 247, 0.2)' : 'rgba(255, 255, 255, 0.03)',
                  border: activeChapter === idx ? '1px solid rgba(217, 70, 239, 0.45)' : '1px solid var(--border-line)',
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.72rem',
                  color: activeChapter === idx ? '#ffffff' : 'var(--text-muted)',
                  cursor: 'pointer',
                  transition: 'all 0.25s ease',
                }}
              >
                <span style={{ color: 'var(--neon-magenta)', fontWeight: 700 }}>{ch.num}</span>
                <span>{ch.title}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Embedded 3D Kage Stage Portal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '1440px',
            margin: '0 auto',
            height: 'clamp(560px, 78vh, 880px)',
            background: 'radial-gradient(ellipse at 50% 30%, #080918 0%, #03040a 100%)',
            borderRadius: 'clamp(18px, 3vw, 32px)',
            border: '1px solid rgba(168, 85, 247, 0.3)',
            boxShadow: '0 30px 100px rgba(0, 0, 0, 0.85), 0 0 50px rgba(139, 92, 246, 0.12)',
            overflow: 'hidden',
          }}
        >
          {/* Top Stage Control Bar */}
          <div
            style={{
              position: 'absolute',
              top: '1rem',
              left: '1rem',
              right: '1rem',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.5rem 1rem',
              borderRadius: '100px',
              background: 'rgba(5, 6, 17, 0.75)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              pointerEvents: 'auto',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
              <div
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--neon-magenta)',
                  boxShadow: '0 0 10px var(--neon-magenta)',
                }}
              />
              <span
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.8rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  letterSpacing: '0.04em',
                }}
              >
                KAGE // LIVE WEBGL JOURNEY
              </span>
              <span
                className="desktop-only"
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: '0.68rem',
                  color: 'var(--text-dim)',
                  letterSpacing: '0.06em',
                }}
              >
                • SCROLL INSIDE TO ADVANCE CAMERA
              </span>
            </div>

            <button
              onClick={() => setIsFullscreen(true)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                padding: '0.35rem 0.85rem',
                borderRadius: '100px',
                background: 'rgba(217, 70, 239, 0.18)',
                border: '1px solid rgba(217, 70, 239, 0.4)',
                color: '#ffffff',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.72rem',
                fontWeight: 600,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                transition: 'all 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(217, 70, 239, 0.35)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(217, 70, 239, 0.18)')}
            >
              <Maximize2 size={12} />
              <span>FULLSCREEN</span>
            </button>
          </div>

          {/* Embedded Exact ThreeUI Kage Component with Narvent Harmonic Customization */}
          <div style={{ width: '100%', height: '100%', position: 'relative' }}>
            <KageLandingPage
              primaryColor="#a855f7"
              headingFont="onest"
              bodyFont="onest"
              headingWeight="500"
              bodyWeight="400"
              headingLetterSpacing={-0.02}
              style={{ width: '100%', height: '100%' }}
            />
          </div>

          {/* Bottom Interaction Footer Tag */}
          <div
            style={{
              position: 'absolute',
              bottom: '1rem',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 10,
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.35rem 0.95rem',
              borderRadius: '100px',
              background: 'rgba(5, 6, 17, 0.72)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '0.68rem',
              color: 'var(--text-muted)',
              pointerEvents: 'none',
              whiteSpace: 'nowrap',
            }}
          >
            <Compass size={12} color="var(--neon-magenta)" />
            <span>ORIGINAL AUTHORED SHADERS & 3D CAMERA PATH // VERIFIED HASH</span>
          </div>
        </motion.div>
      </div>

      {/* Fullscreen Immersion Overlay Modal */}
      <AnimatePresence>
        {isFullscreen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99999,
              background: '#020206',
              display: 'flex',
              flexDirection: 'column',
              paddingTop: 'var(--safe-top, 0px)',
              paddingBottom: 'var(--safe-bottom, 0px)',
              paddingLeft: 'var(--safe-left, 0px)',
              paddingRight: 'var(--safe-right, 0px)',
            }}
          >
            {/* Fullscreen Header Bar */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.75rem 1.5rem',
                background: 'rgba(6, 7, 20, 0.92)',
                backdropFilter: 'blur(20px)',
                borderBottom: '1px solid var(--border-line)',
                zIndex: 10,
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1rem',
                    fontWeight: 800,
                    letterSpacing: '-0.02em',
                    color: '#ffffff',
                  }}
                >
                  NARVENT × KAGE SANCTUARY
                </span>
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.7rem',
                    color: 'var(--neon-magenta)',
                    letterSpacing: '0.1em',
                  }}
                >
                  [IMMERSIVE VIEWPORT]
                </span>
              </div>

              <button
                onClick={() => setIsFullscreen(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  padding: '0.5rem 1.15rem',
                  borderRadius: '100px',
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#ffffff',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.78rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  minHeight: '40px',
                }}
              >
                <Minimize2 size={14} />
                <span>EXIT FULLSCREEN</span>
              </button>
            </div>

            {/* Fullscreen Kage Frame */}
            <div style={{ flexGrow: 1, width: '100%', height: '100%', position: 'relative' }}>
              <KageLandingPage
                primaryColor="#a855f7"
                headingFont="onest"
                bodyFont="onest"
                headingWeight="500"
                bodyWeight="400"
                headingLetterSpacing={-0.02}
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
