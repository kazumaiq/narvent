import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Menu, X, Disc } from 'lucide-react';

const navItems = [
  { label: 'HOME', href: '#home' },
  { label: 'LATEST', href: '#music' },
  { label: 'TOP TRACKS', href: '#popular' },
  { label: '3D ARCHIVE', href: '#archive' },
  { label: 'ABOUT', href: '#about' },
  { label: 'SOCIALS', href: '#socials' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
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
      {/* Desktop Floating Navigation Pill */}
      <motion.header
        initial={{ y: -60, opacity: 0 }}
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
              ? 'rgba(8, 8, 22, 0.85)'
              : 'rgba(12, 12, 32, 0.6)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(111, 147, 255, 0.22)',
            boxShadow: '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(79, 117, 255, 0.1)',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Logo Monogram */}
          <button
            onClick={() => scrollToSection('#home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.6rem',
              cursor: 'pointer',
            }}
          >
            <span
              style={{
                fontFamily: "'Cinzel', serif",
                fontSize: '1.15rem',
                fontWeight: 900,
                letterSpacing: '0.15em',
                color: '#ffffff',
              }}
            >
              NARVENT
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav
            className="hide-on-mobile"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.2rem',
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
                  letterSpacing: '0.08em',
                  color: 'rgba(212, 200, 245, 0.75)',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '100px',
                  transition: 'all 0.25s',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                  e.currentTarget.style.background = 'rgba(79, 117, 255, 0.15)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(212, 200, 245, 0.75)';
                  e.currentTarget.style.background = 'transparent';
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Quick CTA to 3D Archive */}
          <button
            onClick={() => scrollToSection('#archive')}
            className="hide-on-mobile"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.45rem 0.95rem',
              borderRadius: '100px',
              background: 'linear-gradient(135deg, rgba(79, 117, 255, 0.35), rgba(107, 77, 150, 0.35))',
              border: '1px solid rgba(111, 147, 255, 0.45)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.06em',
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.04)')}
            onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
          >
            <Disc size={13} className="floating-anim" />
            <span>3D ARCHIVE</span>
          </button>

          {/* Mobile Menu Hamburger Button */}
          <button
            className="hide-on-desktop"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.08)',
              color: '#ffffff',
              cursor: 'pointer',
            }}
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
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              top: '4.5rem',
              left: '1.25rem',
              right: '1.25rem',
              zIndex: 49,
              background: 'rgba(10, 10, 28, 0.96)',
              backdropFilter: 'blur(28px)',
              WebkitBackdropFilter: 'blur(28px)',
              border: '1px solid rgba(111, 147, 255, 0.3)',
              borderRadius: '24px',
              padding: '1.5rem',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.85)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.75rem',
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.label}
                onClick={() => scrollToSection(item.href)}
                style={{
                  textAlign: 'left',
                  padding: '0.85rem 1rem',
                  borderRadius: '12px',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  letterSpacing: '0.08em',
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
