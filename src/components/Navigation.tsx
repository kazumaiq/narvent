import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Disc3, Globe } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { lang, setLang, t } = useLanguage();

  const navItems = [
    { label: t.nav.home, href: '#home' },
    { label: t.nav.latest, href: '#latest' },
    { label: t.nav.popular, href: '#popular' },
    { label: t.nav.archive, href: '#archive' },
    { label: t.nav.about, href: '#about' },
    { label: t.nav.socials, href: '#socials' },
  ];

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
      <header
        style={{
          position: 'fixed',
          top: 'calc(0.75rem + var(--safe-top, 0px))',
          left: '1rem',
          right: '1rem',
          margin: '0 auto',
          maxWidth: '920px',
          zIndex: 90,
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '0.42rem 0.65rem 0.42rem 1.15rem',
            borderRadius: '100px',
            background: scrolled
              ? 'rgba(6, 7, 18, 0.94)'
              : 'rgba(10, 11, 28, 0.82)',
            backdropFilter: 'blur(24px) saturate(160%)',
            WebkitBackdropFilter: 'blur(24px) saturate(160%)',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 12px 35px rgba(0, 0, 0, 0.75), 0 0 20px rgba(99, 102, 241, 0.1)',
            transition: 'all 0.3s ease',
          }}
        >
          {/* Logo */}
          <button
            onClick={() => scrollToSection('#home')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.45rem',
              cursor: 'pointer',
              background: 'none',
              border: 'none',
              padding: 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: '1.15rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#ffffff',
              }}
            >
              NARVENT
            </span>
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
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.74rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: 'var(--text-muted)',
                  padding: '0.42rem 0.75rem',
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

          {/* Controls: Language Switcher + 3D CTA (Desktop) */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            {/* Language Switcher [ RU | EN ] */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '2px',
                borderRadius: '100px',
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
              }}
            >
              <button
                onClick={() => setLang('ru')}
                style={{
                  padding: '0.28rem 0.6rem',
                  borderRadius: '100px',
                  border: 'none',
                  background: lang === 'ru' ? 'rgba(217, 70, 239, 0.32)' : 'transparent',
                  color: lang === 'ru' ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                  boxShadow: lang === 'ru' ? '0 0 12px rgba(217, 70, 239, 0.3)' : 'none',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                RU
              </button>
              <button
                onClick={() => setLang('en')}
                style={{
                  padding: '0.28rem 0.6rem',
                  borderRadius: '100px',
                  border: 'none',
                  background: lang === 'en' ? 'rgba(99, 102, 241, 0.32)' : 'transparent',
                  color: lang === 'en' ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                  boxShadow: lang === 'en' ? '0 0 12px rgba(99, 102, 241, 0.3)' : 'none',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.68rem',
                  fontWeight: 700,
                  letterSpacing: '0.05em',
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                }}
              >
                EN
              </button>
            </div>

            {/* 3D Archive CTA (Desktop) */}
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
              <span>{lang === 'ru' ? '3D ДИСКОГРАФИЯ' : '3D ARCHIVE'}</span>
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
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                color: '#ffffff',
                cursor: 'pointer',
              }}
              aria-label={t.nav.openMenu}
            >
              {mobileMenuOpen ? <X size={17} /> : <Menu size={17} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.98 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              top: 'calc(4.5rem + var(--safe-top, 0px))',
              left: '1rem',
              right: '1rem',
              margin: '0 auto',
              maxWidth: '450px',
              zIndex: 89,
              background: 'rgba(8, 9, 24, 0.97)',
              backdropFilter: 'blur(32px)',
              WebkitBackdropFilter: 'blur(32px)',
              border: '1px solid rgba(217, 70, 239, 0.35)',
              borderRadius: '24px',
              padding: '1.25rem',
              boxShadow: '0 25px 70px rgba(0, 0, 0, 0.95), 0 0 35px rgba(217, 70, 239, 0.15)',
              display: 'flex',
              flexDirection: 'column',
              gap: '0.5rem',
            }}
          >
            {/* Language Switcher inside Mobile Drawer */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '0.4rem 0.6rem',
                marginBottom: '0.4rem',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.04)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
            >
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.45rem',
                  fontSize: '0.8rem',
                  fontFamily: "'Space Grotesk', sans-serif",
                  color: 'var(--text-muted)',
                  fontWeight: 600,
                }}
              >
                <Globe size={14} />
                <span>{lang === 'ru' ? 'Язык сайта' : 'Language'}</span>
              </span>
              <div
                style={{
                  display: 'inline-flex',
                  gap: '4px',
                  background: 'rgba(0, 0, 0, 0.4)',
                  padding: '3px',
                  borderRadius: '100px',
                }}
              >
                <button
                  onClick={() => setLang('ru')}
                  style={{
                    padding: '0.3rem 0.85rem',
                    borderRadius: '100px',
                    border: 'none',
                    background: lang === 'ru' ? 'rgba(217, 70, 239, 0.4)' : 'transparent',
                    color: lang === 'ru' ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  RU
                </button>
                <button
                  onClick={() => setLang('en')}
                  style={{
                    padding: '0.3rem 0.85rem',
                    borderRadius: '100px',
                    border: 'none',
                    background: lang === 'en' ? 'rgba(99, 102, 241, 0.4)' : 'transparent',
                    color: lang === 'en' ? '#ffffff' : 'rgba(255, 255, 255, 0.5)',
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                  }}
                >
                  EN
                </button>
              </div>
            </div>

            {navItems.map((item) => (
              <button
                key={item.href}
                onClick={() => scrollToSection(item.href)}
                style={{
                  textAlign: 'left',
                  padding: '0.8rem 1.1rem',
                  borderRadius: '12px',
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: '0.92rem',
                  fontWeight: 600,
                  letterSpacing: '0.04em',
                  color: '#ffffff',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                }}
              >
                <span>{item.label}</span>
                <span style={{ fontSize: '0.75rem', color: 'var(--text-dim)' }}>→</span>
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
                padding: '0.85rem',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.55), rgba(217, 70, 239, 0.5))',
                border: '1px solid rgba(217, 70, 239, 0.6)',
                color: '#ffffff',
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '0.9rem',
                fontWeight: 700,
                letterSpacing: '0.04em',
                cursor: 'pointer',
                boxShadow: '0 8px 25px rgba(217, 70, 239, 0.3)',
              }}
            >
              <Disc3 size={16} />
              <span>{t.nav.open3D}</span>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
