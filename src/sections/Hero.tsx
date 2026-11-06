import { motion } from 'framer-motion';
import { ArrowDown, Disc, Sparkles, Play } from 'lucide-react';
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
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '2rem 1.5rem',
        overflow: 'hidden',
        zIndex: 2,
      }}
    >
      {/* Central Hero Glow Halo */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -55%)',
          width: 'clamp(280px, 50vw, 750px)',
          height: 'clamp(280px, 50vw, 750px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(111, 147, 255, 0.12) 0%, rgba(107, 77, 150, 0.08) 45%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* Main Content Presentation */}
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          textAlign: 'center',
          position: 'relative',
          zIndex: 3,
        }}
      >
        {/* Genre & Origin Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '1.25rem' }}
        >
          <span className="section-badge">
            <Sparkles size={12} color="#7093ff" />
            SYNTHWAVE // WAVE PHONK // DARK ELECTRONIC
          </span>
        </motion.div>

        {/* Cinematographic Logo / Monogram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: '0.75rem', position: 'relative' }}
        >
          <h1
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: 'clamp(3.5rem, 12vw, 9.5rem)',
              fontWeight: 900,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              lineHeight: 0.95,
              background: 'linear-gradient(180deg, #ffffff 0%, #e2d9f7 45%, #7093ff 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 60px rgba(111, 147, 255, 0.35)',
              margin: 0,
            }}
          >
            NARVENT
          </h1>
        </motion.div>

        {/* Subtitle / Philosophy */}
        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: 'clamp(1rem, 2vw, 1.4rem)',
            fontWeight: 300,
            color: 'rgba(212, 200, 245, 0.85)',
            letterSpacing: '0.04em',
            maxWidth: '680px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.6,
          }}
        >
          {artist.shortBio}
        </motion.p>

        {/* CTA Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '1rem',
          }}
        >
          <button
            onClick={() => scrollTo('archive')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.75rem',
              padding: '0.9rem 2.2rem',
              borderRadius: '100px',
              background: 'linear-gradient(135deg, rgba(79, 117, 255, 0.35) 0%, rgba(107, 77, 150, 0.35) 100%)',
              border: '1px solid rgba(111, 147, 255, 0.5)',
              boxShadow: '0 10px 30px rgba(79, 117, 255, 0.25), 0 0 20px rgba(111, 147, 255, 0.2)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-3px)';
              e.currentTarget.style.boxShadow = '0 15px 40px rgba(79, 117, 255, 0.4), 0 0 30px rgba(111, 147, 255, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 10px 30px rgba(79, 117, 255, 0.25), 0 0 20px rgba(111, 147, 255, 0.2)';
            }}
          >
            <Disc size={18} className="floating-anim" />
            <span>EXPLORE 3D ARCHIVE</span>
          </button>

          <button
            onClick={() => scrollTo('music')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.65rem',
              padding: '0.9rem 2rem',
              borderRadius: '100px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(16px)',
              border: '1px solid rgba(255, 255, 255, 0.12)',
              color: 'rgba(240, 237, 248, 0.9)',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.95rem',
              fontWeight: 500,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <Play size={16} />
            <span>LATEST RELEASES</span>
          </button>
        </motion.div>

        {/* Streaming Quick Stats Row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 'clamp(1.5rem, 4vw, 3.5rem)',
            marginTop: '4rem',
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.07)',
          }}
        >
          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#ffffff',
                lineHeight: 1.1,
              }}
            >
              310M+
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem',
                color: 'rgba(184, 169, 212, 0.65)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: '4px',
              }}
            >
              Streams on "Memory Reboot"
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#ffd166',
                lineHeight: 1.1,
              }}
            >
              RIAA GOLD
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem',
                color: 'rgba(184, 169, 212, 0.65)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: '4px',
              }}
            >
              Certified Hit Record
            </div>
          </div>

          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#7093ff',
                lineHeight: 1.1,
              }}
            >
              #13
            </div>
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '0.72rem',
                color: 'rgba(184, 169, 212, 0.65)',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                marginTop: '4px',
              }}
            >
              Billboard Hot Dance
            </div>
          </div>
        </motion.div>
      </div>

      {/* Floating Scroll Down Arrow */}
      <motion.button
        onClick={() => scrollTo('music')}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          repeat: Infinity,
          repeatType: 'reverse',
          duration: 1.8,
          delay: 1.5,
        }}
        style={{
          position: 'absolute',
          bottom: '2rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.4rem',
          color: 'rgba(184, 169, 212, 0.5)',
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.65rem',
          letterSpacing: '0.2em',
          cursor: 'pointer',
        }}
      >
        <span>SCROLL DOWN</span>
        <ArrowDown size={14} />
      </motion.button>
    </section>
  );
}
