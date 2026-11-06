import { motion } from 'framer-motion';

interface LoaderProps {
  progress: number;
}

export default function Loader({ progress }: LoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#020206',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* Ambient background glow */}
      <div
        style={{
          position: 'absolute',
          width: '450px',
          height: '450px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(217, 70, 239, 0.15) 0%, rgba(99, 102, 241, 0.08) 50%, transparent 70%)',
          filter: 'blur(50px)',
          pointerEvents: 'none',
        }}
      />

      {/* Monogram & Title */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'relative',
          marginBottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <div
          style={{
            width: '84px',
            height: '84px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.25) 0%, rgba(217, 70, 239, 0.25) 100%)',
            border: '1px solid rgba(217, 70, 239, 0.45)',
            boxShadow: '0 0 45px rgba(217, 70, 239, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
          }}
        >
          <span
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '2.6rem',
              fontWeight: 800,
              color: '#ffffff',
            }}
          >
            N
          </span>
        </div>

        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontSize: '1.5rem',
            fontWeight: 800,
            letterSpacing: '0.18em',
            color: '#ffffff',
            textTransform: 'uppercase',
          }}
        >
          NARVENT
        </div>

        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.68rem',
            letterSpacing: '0.15em',
            color: 'var(--text-dim)',
            marginTop: '0.4rem',
            textTransform: 'uppercase',
          }}
        >
          IMMERSIVE DIGITAL UNIVERSE V2
        </div>
      </motion.div>

      {/* Progress Bar Container */}
      <div
        style={{
          width: 'clamp(220px, 35vw, 300px)',
          height: '2px',
          background: 'rgba(255, 255, 255, 0.08)',
          borderRadius: '4px',
          overflow: 'hidden',
          position: 'relative',
          marginBottom: '1rem',
        }}
      >
        <motion.div
          style={{
            height: '100%',
            background: 'linear-gradient(90deg, var(--electric-blue) 0%, var(--electric-indigo) 50%, var(--neon-magenta) 100%)',
            boxShadow: '0 0 15px var(--neon-magenta)',
            width: `${progress}%`,
            transition: 'width 0.2s ease-out',
          }}
        />
      </div>

      {/* Status indicator */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.7rem',
          color: 'var(--text-dim)',
          letterSpacing: '0.12em',
        }}
      >
        SPATIAL SYNTH & SHADERS // {Math.round(progress)}%
      </div>
    </motion.div>
  );
}
