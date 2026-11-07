import { ArrowUp } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { t } = useLanguage();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        padding: '3.5rem 0 3rem',
        borderTop: '1px solid var(--border-strong)',
        background: 'linear-gradient(180deg, rgba(2, 2, 6, 0.5) 0%, #010104 100%)',
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
            gap: '1.5rem',
            marginBottom: '2.25rem',
          }}
        >
          {/* Compact Navigation Links — Zero redundant artist bio/NARVENT blocks */}
          <nav
            aria-label="Footer Navigation"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'clamp(1rem, 2.2vw, 2rem)',
              alignItems: 'center',
            }}
          >
            {[
              { label: t.nav.home, href: '#home' },
              { label: t.nav.latest, href: '#latest' },
              { label: t.nav.popular, href: '#popular' },
              { label: t.nav.archive, href: '#archive' },
              { label: t.nav.about, href: '#about' },
              { label: t.nav.socials, href: '#socials' },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                style={{
                  fontFamily: 'var(--font-ui)',
                  fontSize: '0.76rem',
                  fontWeight: 700,
                  letterSpacing: '0.12em',
                  textTransform: 'uppercase',
                  color: 'var(--text-muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Back to Top */}
          <button onClick={scrollToTop} className="btn-editorial listen-pill">
            <ArrowUp size={13} />
            <span>{t.footer.backToTop}</span>
          </button>
        </div>

        {/* Copyright & Distribution */}
        <div
          style={{
            paddingTop: '1.5rem',
            borderTop: '1px solid var(--border-line)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '0.75rem',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            letterSpacing: '0.08em',
            color: 'var(--text-dim)',
          }}
        >
          <div>{t.footer.copyright}</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', alignItems: 'center' }}>
            <span>{t.footer.distribution}</span>
            <span style={{ opacity: 0.35 }}>•</span>
            <a href="/about" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
              ABOUT
            </a>
            <a href="/contact" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
              CONTACT
            </a>
            <a href="/privacy" style={{ color: 'var(--text-dim)', textDecoration: 'none' }}>
              PRIVACY
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
