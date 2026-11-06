import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

interface LoaderProps {
  progress: number;
}

export default function Loader({ progress }: LoaderProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1] } }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: '#04040c',
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
          background: 'radial-gradient(circle, rgba(111, 147, 255, 0.18) 0%, rgba(107, 77, 150, 0.1) 45%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }}
      />

      {/* Monogram emblem */}
      <motion.div
        initial={{ scale: 0.85, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
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
            width: '90px',
            height: '90px',
            borderRadius: '24px',
            background: 'linear-gradient(135deg, rgba(79, 117, 255, 0.25) 0%, rgba(107, 77, 150, 0.25) 100%)',
            border: '1px solid rgba(111, 147, 255, 0.5)',
            boxShadow: '0 0 45px rgba(79, 117, 255, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: '1.25rem',
          }}
        >
          <span
            style={{
              fontFamily: "'Cinzel', serif",
              fontSize: '2.8rem',
              fontWeight: 900,
              color: '#ffffff',
              textShadow: '0 0 20px #7093ff',
            }}
          >
            N
          </span>
        </div>

        <div
          style={{
            fontFamily: "'Cinzel', serif",
            fontSize: '1.35rem',
            fontWeight: 800,
            letterSpacing: '0.3em',
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
            letterSpacing: '0.2em',
            color: 'rgba(184, 169, 212, 0.65)',
            marginTop: '0.4rem',
            textTransform: 'uppercase',
          }}
        >
          IMMERSIVE DIGITAL UNIVERSE
        </div>
      </motion.div>

      {/* Progress Bar Container */}
      <div
        style={{
          width: 'clamp(220px, 40vw, 320px)',
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
            background: 'linear-gradient(90deg, #4f75ff 0%, #b8a9d4 50%, #7093ff 100%)',
            boxShadow: '0 0 15px #7093ff',
            width: `${progress}%`,
            transition: 'width 0.2s ease-out',
          }}
        />
      </div>

      {/* Status indicator */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: '0.72rem',
          color: 'rgba(184, 169, 212, 0.6)',
          letterSpacing: '0.15em',
        }}
      >
        INITIALIZING SPATIAL AUDIO & 3D ARCHIVE // {Math.round(progress)}%
      </div>
    </motion.div>
  );
}
