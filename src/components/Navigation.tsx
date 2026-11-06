import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Disc } from 'lucide-react';

const navItems = [
  { label: 'HOME', href: '#home' },
  { label: 'LATEST', href: '#music' },
  { label: 'TOP HITS', href: '#popular' },
  { label: '3D ARCHIVE', href: '#archive' },
  { label: 'SANCTUARY', href: '#sanctuary' },
  { label: 'ABOUT', href: '#about' },
  { label: 'SOCIALS', href: '#socials' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMobileMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Desktop Floating Pill Navigation */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: '1.25rem',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          width: 'calc(100% - 2.5rem)',
          maxWidth: '820px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.45rem 0.65rem 0.45rem 1.25rem',
            borderRadius: '100px',
            background: scrolled
              ? 'rgba(6, 7, 18, 0.88)'
              : 'rgba(10, 11, 28, 0.65)',
            backdropFilter: 'blur(24px) saturate(160%)',
            border: '1px solid var(--border-line)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.6)',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollToSection('#home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.15rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#ffffff',
              }}
            >
              NARVENT
            </span>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                background: 'var(--neon-magenta)',
                boxShadow: '0 0 8px var(--neon-magenta)',
              }}
            />
          </button>

          {/* Desktop Links */}
          <nav
            className="desktop-only"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.15rem',
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.75rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: 'var(--text-muted)',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '100px',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.06)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* 3D Archive Fast Entry */}
          <button
            onClick={() => scrollToSection('#archive')}
            className="desktop-only"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.95rem',
              borderRadius: '100px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.4), rgba(217, 70, 239, 0.35))',
              border: '1px solid rgba(217, 70, 239, 0.4)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Disc size={13} />
            <span>3D ARCHIVE</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.06)',
              color: '#ffffff',
              cursor: 'pointer',
            }}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            style={{
              position: 'fixed',
              top: '4.75rem',
              left: '1.25rem',
              right: '1.25rem',
              zIndex: 49,
              background: 'rgba(8, 9, 24, 0.96)',
              backdropFilter: 'blur(30px)',
              border: '1px solid rgba(217, 70, 239, 0.3)',
              borderRadius: '24px',
              padding: '1.5rem',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.9)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.65rem',
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                style={{
                  textAlign: 'left',
                  padding: '0.85rem 1.15rem',
                  borderRadius: '12px',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '1rem',
                  fontWeight: 600,
                  letterSpacing: '0.06em',
                  color: '#ffffff',
                  background: 'rgba(255, 255, 255, 0.04)',
                  cursor: 'pointer',
                }}
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
