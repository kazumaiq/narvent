import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Disc3, ArrowUpRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const navItems = [
    { index: '01', label: t.nav.home, href: '#home' },
    { index: '02', label: t.nav.latest, href: '#latest' },
    { index: '03', label: t.nav.popular, href: '#popular' },
    { index: '04', label: t.nav.archive, href: '#archive' },
    { index: '05', label: t.nav.about, href: '#about' },
    { index: '06', label: t.nav.socials, href: '#socials' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (href: string) => {
    setMenuOpen(false);
    const id = href.replace('#', '');
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Martin Garrix Inspired Edge-to-Edge Architectural Header */}
      <header
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 90,
          paddingTop: 'calc(0.9rem + var(--safe-top, 0px))',
          paddingBottom: '0.9rem',
          background: scrolled ? 'rgba(2, 2, 6, 0.86)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid transparent',
          transition: 'background 0.3s ease, border-color 0.3s ease',
        }}
      >
        <div
          className="container-wide"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem',
          }}
        >
          {/* Left Brand Wordmark: Standalone NARVENT Logo */}
          <button
            onClick={() => scrollToSection('#home')}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: '0.2rem 0',
              lineHeight: 1,
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.98rem, 1.5vw, 1.2rem)',
                fontWeight: 900,
                letterSpacing: '-0.03em',
                lineHeight: 1,
                color: '#ffffff',
                display: 'block',
              }}
            >
              NARVENT
            </span>
          </button>

          {/* Center Desktop Navigation Links */}
          <nav
            className="desktop-only"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(1rem, 2vw, 1.85rem)',
            }}
          >
            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.74rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'rgba(255, 255, 255, 0.72)',
                  padding: '0.35rem 0',
                  transition: 'color 0.2s ease',
                  cursor: 'pointer',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'rgba(255, 255, 255, 0.72)';
                }}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Right Corner: Language Switcher + Martin Garrix Style "= MENU" Trigger */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(0.65rem, 1.5vw, 1.25rem)',
            }}
          >
            {/* Sharp Architectural Language Switcher [ RU / EN ] */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                background: 'rgba(2, 2, 6, 0.65)',
              }}
            >
              <button
                onClick={() => setLang('ru')}
                style={{
                  padding: '0.32rem 0.55rem',
                  background: lang === 'ru' ? '#ffffff' : 'transparent',
                  color: lang === 'ru' ? '#020206' : 'rgba(255, 255, 255, 0.6)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                RU
              </button>
              <button
                onClick={() => setLang('en')}
                style={{
                  padding: '0.32rem 0.55rem',
                  background: lang === 'en' ? '#ffffff' : 'transparent',
                  color: lang === 'en' ? '#020206' : 'rgba(255, 255, 255, 0.6)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                EN
              </button>
            </div>

            {/* Martin Garrix Style "= MENU" Trigger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={t.nav.openMenu}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.6rem',
                cursor: 'pointer',
                padding: '0.35rem 0',
                color: '#ffffff',
              }}
            >
              <span
                aria-hidden="true"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '5px',
                  width: '22px',
                }}
              >
                <span
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '3px',
                    background: '#ffffff',
                    transition: 'transform 0.25s ease',
                    transform: menuOpen ? 'translateY(4px) rotate(45deg)' : 'none',
                  }}
                />
                <span
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '3px',
                    background: '#ffffff',
                    transition: 'transform 0.25s ease',
                    transform: menuOpen ? 'translateY(-4px) rotate(-45deg)' : 'none',
                  }}
                />
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 'clamp(0.8rem, 1.3vw, 1rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  textTransform: 'uppercase',
                }}
              >
                {lang === 'ru' ? 'МЕНЮ' : 'MENU'}
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Architectural Overlay Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            animate={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
            exit={{ opacity: 0, clipPath: 'inset(0% 0% 100% 0%)' }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 89,
              background: 'rgba(2, 2, 6, 0.97)',
              backdropFilter: 'blur(24px)',
              WebkitBackdropFilter: 'blur(24px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              padding: 'clamp(5.5rem, 12vh, 8rem) clamp(1.25rem, 5vw, 4rem) clamp(2.5rem, 6vh, 4rem)',
            }}
          >
            <div
              className="container-wide"
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '2.5rem',
                alignItems: 'center',
                width: '100%',
                margin: 'auto 0',
              }}
            >
              {/* Monumental Navigation List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {navItems.map((item, idx) => (
                  <motion.button
                    key={item.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    onClick={() => scrollToSection(item.href)}
                    style={{
                      display: 'flex',
                      alignItems: 'baseline',
                      gap: '1.25rem',
                      textAlign: 'left',
                      padding: '0.6rem 0',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                      cursor: 'pointer',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--neon-magenta)',
                        fontWeight: 600,
                        letterSpacing: '0.14em',
                      }}
                    >
                      {item.index} //
                    </span>
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: 'clamp(1.5rem, 3.8vw, 3rem)',
                        fontWeight: 900,
                        color: '#ffffff',
                        letterSpacing: '-0.03em',
                        textTransform: 'uppercase',
                        lineHeight: 1.05,
                      }}
                    >
                      {item.label}
                    </span>
                  </motion.button>
                ))}
              </div>

              {/* Right Column: Quick 3D Portal & Streaming Links */}
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '1.5rem',
                  padding: '2rem',
                  border: '1px solid rgba(255, 255, 255, 0.14)',
                  background: 'rgba(10, 11, 24, 0.65)',
                }}
              >
                <div
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.7rem',
                    letterSpacing: '0.18em',
                    color: 'var(--electric-blue)',
                    textTransform: 'uppercase',
                  }}
                >
                  04 // INTERACTIVE EXPERIENCE
                </div>

                <div
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: 'clamp(1.25rem, 2.2vw, 1.85rem)',
                    fontWeight: 900,
                    color: '#ffffff',
                    lineHeight: 1.1,
                    textTransform: 'uppercase',
                  }}
                >
                  {t.nav.open3D}
                </div>

                <button
                  onClick={() => scrollToSection('#archive')}
                  className="mg-split-btn"
                  style={{ alignSelf: 'flex-start' }}
                >
                  <span className="mg-split-label">
                    <Disc3 size={15} />
                    <span>{t.nav.archive}</span>
                  </span>
                  <span className="mg-split-arrow">
                    <ArrowUpRight size={16} />
                  </span>
                </button>
              </div>
            </div>

            {/* Bottom Menu Bar */}
            <div
              className="container-wide"
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                paddingTop: '1.5rem',
                borderTop: '1px solid rgba(255, 255, 255, 0.1)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.7rem',
                color: 'var(--text-dim)',
                letterSpacing: '0.12em',
              }}
            >
              <span>NARVENT // OFFICIAL PLATFORM</span>
              <button
                onClick={() => setMenuOpen(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.4rem',
                  color: '#ffffff',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.72rem',
                }}
              >
                <X size={15} />
                <span>{t.modal.close}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
