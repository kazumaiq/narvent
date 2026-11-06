import { ArrowUp, Sparkles, Disc } from 'lucide-react';
import { artist } from '../data/artist';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        padding: '5rem 0 3.5rem',
        borderTop: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'linear-gradient(180deg, transparent 0%, rgba(3, 3, 10, 0.95) 100%)',
        zIndex: 2,
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '2rem',
            marginBottom: '3rem',
          }}
        >
          {/* Logo & Philosophy */}
          <div>
            <div
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '2rem',
                fontWeight: 900,
                letterSpacing: '0.15em',
                color: '#ffffff',
                marginBottom: '0.5rem',
              }}
            >
              NARVENT
            </div>
            <p
              style={{
                fontFamily: "'Inter', sans-serif",
                fontSize: '0.88rem',
                color: 'rgba(184, 169, 212, 0.7)',
                maxWidth: '420px',
                lineHeight: 1.6,
              }}
            >
              Digital soundscapes sculpting late-night journeys across the synthwave and wave phonk cosmos.
            </p>
          </div>

          {/* Back to top button */}
          <button
            onClick={scrollToTop}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.75rem 1.4rem',
              borderRadius: '100px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(79, 117, 255, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(111, 147, 255, 0.4)';
              e.currentTarget.style.transform = 'translateY(-3px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <ArrowUp size={15} />
            <span>RETURN TO SUMMIT</span>
          </button>
        </div>

        {/* Bottom Credits & Legal Notice */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem',
            color: 'rgba(184, 169, 212, 0.55)',
          }}
        >
          <div>
            © {new Date().getFullYear()} NARVENT (Farkhod Musulmonov). All rights reserved.
          </div>

          <div>
            Distributed via volume100 / Believe Digital • Utopia Universe
          </div>
        </div>
      </div>
    </footer>
  );
}
