import { motion } from 'framer-motion';
import { ArrowDown, Disc, Sparkles, Play } from 'lucide-react';
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
        {/* Desktop / Tablet Grid */}
        <div className="hero-editorial-grid">
          {/* Left Column: Asymmetrical Editorial Typography */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            style={{ position: 'relative', zIndex: 3 }}
          >
            {/* Minimal Editorial Badge */}
            <div className="editorial-badge magenta">
              <span>OFFICIAL DIGITAL UNIVERSE // V2</span>
            </div>

            {/* Contemporary Monogram Logo */}
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
                  fontSize: 'clamp(2.8rem, 7vw, 5.8rem)',
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

            {/* Mobile 3D preview insertion (visible only on mobile) */}
            <div className="mobile-only" style={{ width: '100%', height: '300px', margin: '1rem 0' }}>
              <LiquidSculpture3D />
            </div>

            {/* Editorial Statement */}
            <h2
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: 'clamp(1.2rem, 2.4vw, 1.85rem)',
                fontWeight: 500,
                color: '#e2e8f0',
                lineHeight: 1.35,
                letterSpacing: '-0.02em',
                marginBottom: '1.25rem',
                maxWidth: '560px',
              }}
            >
              Sculpting nocturnal frequencies where atmospheric synthwave and cinematic wave phonk converge.
            </h2>

            <p
              style={{
                fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
                color: 'var(--text-muted)',
                lineHeight: 1.7,
                maxWidth: '520px',
                marginBottom: '2.25rem',
                fontWeight: 400,
              }}
            >
              From the RIAA Gold-certified viral phenomenon of <em>"Memory Reboot"</em> (310M+ streams) to the deep sonic depths of <em>"Insomnia"</em> and <em>"Genesis"</em>.
            </p>

            {/* Action Buttons */}
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
                  padding: '0.85rem 1.85rem',
                  borderRadius: '100px',
                  background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4) 0%, rgba(217, 70, 239, 0.35) 100%)',
                  border: '1px solid rgba(217, 70, 239, 0.45)',
                  boxShadow: '0 8px 30px rgba(99, 102, 241, 0.25), 0 0 20px rgba(217, 70, 239, 0.2)',
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
                  e.currentTarget.style.boxShadow = '0 12px 35px rgba(217, 70, 239, 0.4), 0 0 25px rgba(99, 102, 241, 0.35)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 30px rgba(99, 102, 241, 0.25), 0 0 20px rgba(217, 70, 239, 0.2)';
                }}
              >
                <Disc size={16} />
                <span>ENTER 3D ARCHIVE</span>
              </button>

              <button
                onClick={() => scrollTo('popular')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.6rem',
                  padding: '0.85rem 1.65rem',
                  borderRadius: '100px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  backdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: 'var(--text-pure)',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.88rem',
                  fontWeight: 500,
                  cursor: 'pointer',
                  minHeight: '48px',
                  transition: 'all 0.25s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.04)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <Play size={14} />
                <span>TOP HITS</span>
              </button>
            </div>

            {/* Editorial Quick Specs Strip */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: '1.25rem',
                paddingTop: '1.75rem',
                borderTop: '1px solid var(--border-line)',
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    color: '#ffffff',
                  }}
                >
                  310M+
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.68rem',
                    color: 'var(--text-dim)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginTop: '2px',
                  }}
                >
                  "Memory Reboot"
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    color: '#ffd166',
                  }}
                >
                  GOLD
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.68rem',
                    color: 'var(--text-dim)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginTop: '2px',
                  }}
                >
                  RIAA Certified
                </div>
              </div>

              <div>
                <div
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '1.45rem',
                    fontWeight: 700,
                    color: 'var(--electric-blue)',
                  }}
                >
                  #13
                </div>
                <div
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: '0.68rem',
                    color: 'var(--text-dim)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginTop: '2px',
                  }}
                >
                  Billboard Dance
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive 3D Chromatic Liquid Sculpture (Desktop/Tablet) */}
          <motion.div
            className="desktop-only"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.3, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              width: '100%',
              height: 'clamp(380px, 55vh, 680px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <LiquidSculpture3D />

            {/* Interaction hint tag */}
            <div
              style={{
                position: 'absolute',
                bottom: '1rem',
                right: '1rem',
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.68rem',
                color: 'var(--text-dim)',
                letterSpacing: '0.15em',
                background: 'rgba(10, 11, 28, 0.65)',
                backdropFilter: 'blur(12px)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                padding: '0.35rem 0.75rem',
                borderRadius: '100px',
                pointerEvents: 'none',
              }}
            >
              INTERACTIVE 3D MATTER // DRAG & ROTATE
            </div>
          </motion.div>
        </div>
      </div>

      {/* Floating Scroll Indicator */}
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
        <span>SCROLL DOWN</span>
        <ArrowDown size={13} />
      </div>

      <style>{`
        .hero-editorial-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
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
