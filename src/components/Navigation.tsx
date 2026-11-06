import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Disc3 } from 'lucide-react';

const navItems = [
  { label: 'ГЛАВНАЯ', href: '#home' },
  { label: 'НОВЫЕ РЕЛИЗЫ', href: '#latest' },
  { label: 'ПОПУЛЯРНОЕ', href: '#popular' },
  { label: '3D АРХИВ', href: '#archive' },
  { label: 'ОБ АРТИСТЕ', href: '#about' },
  { label: 'СОЦСЕТИ', href: '#socials' },
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
      {/* Floating Pill Navigation */}
      <motion.header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 'calc(1rem + var(--safe-top, 0px))',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 50,
          width: 'calc(100% - 2rem)',
          maxWidth: '860px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.45rem 0.75rem 0.45rem 1.25rem',
            borderRadius: '100px',
            background: scrolled
              ? 'rgba(6, 7, 18, 0.92)'
              : 'rgba(10, 11, 28, 0.75)',
            backdropFilter: 'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            border: '1px solid var(--border-line)',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.65)',
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
              background: 'none',
              border: 'none',
              padding: 0,
            }}
          >
            <span
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.2rem',
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
                boxShadow: '0 0 10px var(--neon-magenta)',
              }}
            />
          </button>

          {/* Desktop Links */}
          <nav
            className="desktop-only"
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
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: 'var(--text-muted)',
                  padding: '0.45rem 0.85rem',
                  borderRadius: '100px',
                  transition: 'all 0.2s',
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
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

          {/* 3D Archive CTA */}
          <button
            onClick={() => scrollToSection('#archive')}
            className="desktop-only"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.45rem',
              padding: '0.45rem 1.05rem',
              borderRadius: '100px',
              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.35), rgba(217, 70, 239, 0.3))',
              border: '1px solid rgba(217, 70, 239, 0.45)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.75rem',
              fontWeight: 700,
              letterSpacing: '0.04em',
              cursor: 'pointer',
              transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.03)';
              e.currentTarget.style.boxShadow = '0 0 20px rgba(217, 70, 239, 0.35)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Disc3 size={13} />
            <span>3D ДИСКОГРАФИЯ</span>
          </button>

          {/* Mobile Hamburger Button */}
          <button
            className="mobile-only"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{
              width: '40px',
              height: '40px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(255, 255, 255, 0.06)',
              border: '1px solid var(--border-line)',
              color: '#ffffff',
              cursor: 'pointer',
            }}
            aria-label="Открыть меню"
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
              top: 'calc(4.75rem + var(--safe-top, 0px))',
              left: '1rem',
              right: '1rem',
              zIndex: 49,
              background: 'rgba(8, 9, 24, 0.96)',
              backdropFilter: 'blur(30px)',
              WebkitBackdropFilter: 'blur(30px)',
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
                  borderRadius: '14px',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.95rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: '#ffffff',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-line)',
                  cursor: 'pointer',
                }}
              >
                {item.label}
              </button>
            ))}

            <button
              onClick={() => scrollToSection('#archive')}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                marginTop: '0.5rem',
                padding: '0.9rem',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.5), rgba(217, 70, 239, 0.45))',
                border: '1px solid rgba(217, 70, 239, 0.5)',
                color: '#ffffff',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.92rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                cursor: 'pointer',
              }}
            >
              <Disc3 size={15} />
              <span>ОТКРЫТЬ 3D ДИСКОГРАФИЮ</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
