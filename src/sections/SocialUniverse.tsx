import { motion } from 'framer-motion';
import { Sparkles, ExternalLink, Globe } from 'lucide-react';
import { socials } from '../data/socials';
import { useLanguage } from '../context/LanguageContext';

export default function SocialUniverse() {
  const { t } = useLanguage();
  const platformMeta: Record<string, { color: string; desc: string; handle: string }> = {
    spotify: { color: '#1db954', desc: '1.9M+ слушателей в месяц • Главный каталог', handle: 'Narvent на Spotify' },
    youtube: { color: '#ff0000', desc: '579K+ подписчиков • 4K клипы и визуалайзеры', handle: '@NarventMusic' },
    soundcloud: { color: '#ff5500', desc: 'Официальные треки, эдиты и эксклюзивы', handle: 'musicofnarvent' },
    instagram: { color: '#e1306c', desc: 'Атмосферные кадры, анонсы и студия', handle: '@narventof' },
    tiktok: { color: '#00f2fe', desc: 'Миллионы видео под звуки артиста', handle: '@narvent.music' },
    telegram: { color: '#229ed9', desc: 'Официальный канал и прямое общение', handle: 't.me/narventof' },
    vk: { color: '#0077ff', desc: 'Полная дискография и сообщество', handle: 'vk.com/narventmusic' },
    'apple-music': { color: '#fc3c44', desc: 'Lossless & Spatial Audio качество', handle: 'Narvent на Apple Music' },
    linktree: { color: '#43e660', desc: 'Официальный хаб всех релизов', handle: 'linktr.ee/narvent' },
  };

  return (
    <section
      id="socials"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 10vh, 9rem) 0',
        zIndex: 2,
      }}
    >
      <div className="container">
        {/* Заголовок секции */}
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: '4rem' }}
        >
          <span className="editorial-badge">
            <Sparkles size={11} color="var(--electric-blue)" />
            {t.socials.badge}
          </span>
          <h2 className="editorial-title">{t.socials.title}</h2>
          <p className="editorial-subtitle" style={{ margin: '0.75rem auto 0' }}>
            {t.socials.subtitle}
          </p>
        </motion.div>

        {/* Сетка порталов */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(260px, 28vw, 360px), 1fr))',
            gap: '1.25rem',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {socials.map((social, index) => {
            const meta = platformMeta[social.platform] || {
              color: 'var(--electric-blue)',
              desc: 'Официальный профиль',
              handle: social.label,
            };

            return (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.05 }}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  background: 'var(--bg-glass)',
                  backdropFilter: 'blur(20px)',
                  WebkitBackdropFilter: 'blur(20px)',
                  border: '1px solid var(--border-line)',
                  borderRadius: '18px',
                  padding: '1.25rem 1.4rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                  e.currentTarget.style.borderColor = `${meta.color}66`;
                  e.currentTarget.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.65), 0 0 25px ${meta.color}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = 'var(--border-line)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Иконка */}
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: `${meta.color}15`,
                    border: `1px solid ${meta.color}44`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: meta.color,
                    flexShrink: 0,
                  }}
                >
                  <Globe size={20} />
                </div>

                {/* Информация */}
                <div style={{ flexGrow: 1, minWidth: 0 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '0.2rem',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: '1.05rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        margin: 0,
                      }}
                    >
                      {social.label}
                    </h3>
                    <ExternalLink size={13} color="var(--text-dim)" />
                  </div>

                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.72rem',
                      color: meta.color,
                      marginBottom: '0.2rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {meta.handle}
                  </div>

                  <div
                    style={{
                      fontFamily: "'Manrope', sans-serif",
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.4,
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {meta.desc}
                  </div>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
