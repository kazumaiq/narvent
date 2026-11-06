import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        padding: '5rem 0 3.5rem',
        borderTop: '1px solid var(--border-line)',
        background: 'linear-gradient(180deg, transparent 0%, #010104 100%)',
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
          {/* Логотип и описание */}
          <div>
            <div
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontSize: '1.9rem',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                color: '#ffffff',
                marginBottom: '0.4rem',
              }}
            >
              NARVENT
            </div>
            <p
              style={{
                fontFamily: "'Manrope', sans-serif",
                fontSize: '0.88rem',
                color: 'var(--text-muted)',
                maxWidth: '460px',
                lineHeight: 1.6,
              }}
            >
              Атмосферные звуковые ландшафты, погружающие в эстетику ночных дорог, бесконечной скорости и кинематографичного синтвейва.
            </p>
          </div>

          {/* Кнопка наверх */}
          <button
            onClick={scrollToTop}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.8rem 1.5rem',
              borderRadius: '100px',
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid var(--border-line)',
              color: '#ffffff',
              fontFamily: "'Space Grotesk', sans-serif",
              fontSize: '0.82rem',
              fontWeight: 600,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              cursor: 'pointer',
              transition: 'all 0.25s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(217, 70, 239, 0.2)';
              e.currentTarget.style.borderColor = 'rgba(217, 70, 239, 0.4)';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
              e.currentTarget.style.borderColor = 'var(--border-line)';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <ArrowUp size={14} />
            <span>В НАЧАЛО</span>
          </button>
        </div>

        {/* Копирайт и юридическая информация */}
        <div
          style={{
            paddingTop: '2rem',
            borderTop: '1px solid var(--border-line)',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '1rem',
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '0.72rem',
            color: 'var(--text-dim)',
          }}
        >
          <div>
            © {new Date().getFullYear()} NARVENT (Фарход Мусулмонов). Официальная цифровая платформа.
          </div>

          <div>
            Дистрибуция через volume100 / Believe Digital • Utopia Universe
          </div>
        </div>
      </div>
    </footer>
  );
}
