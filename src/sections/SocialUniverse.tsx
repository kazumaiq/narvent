import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
import { socials } from '../data/socials';
import { useLanguage } from '../context/LanguageContext';
import { RevealText, ParallaxWatermark } from '../components/CinematicReveal';

export default function SocialUniverse() {
  const { t, lang } = useLanguage();

  const platformMeta: Record<string, { color: string; descRu: string; descEn: string; handle: string }> = {
    spotify: {
      color: '#1db954',
      descRu: '1.9M+ слушателей в месяц • Главный каталог',
      descEn: '1.9M+ monthly listeners • Master catalog',
      handle: 'SPOTIFY // VERIFIED',
    },
    youtube: {
      color: '#ff2a4b',
      descRu: '579K+ подписчиков • Официальные 4K релизы',
      descEn: '579K+ subscribers • Official 4K visualizers',
      handle: '@NarventMusic',
    },
    soundcloud: {
      color: '#ff6b35',
      descRu: 'Официальные треки, эдиты и эксклюзивы',
      descEn: 'Official tracks, edits & exclusives',
      handle: 'musicofnarvent',
    },
    instagram: {
      color: '#d946ef',
      descRu: 'Атмосферные кадры, анонсы и студия',
      descEn: 'Atmospheric visuals, announcements & studio',
      handle: '@narventof',
    },
    tiktok: {
      color: '#38bdf8',
      descRu: 'Миллионы видео под звуки артиста',
      descEn: 'Millions of creations powered by Narvent sound',
      handle: '@narvent.music',
    },
    telegram: {
      color: '#38bdf8',
      descRu: 'Официальный канал и прямое общение',
      descEn: 'Official channel & direct updates',
      handle: 't.me/narventof',
    },
    vk: {
      color: '#6366f1',
      descRu: 'Полная дискография и сообщество',
      descEn: 'Full discography & community',
      handle: 'vk.com/narventmusic',
    },
    'apple-music': {
      color: '#ec4899',
      descRu: 'Lossless & Spatial Audio мастер-качество',
      descEn: 'Lossless & Spatial Audio masters',
      handle: 'APPLE MUSIC',
    },
    linktree: {
      color: '#43e660',
      descRu: 'Единый хаб всех стриминговых площадок',
      descEn: 'Unified hub of all streaming platforms',
      handle: 'linktr.ee/narvent',
    },
  };

  return (
    <section
      id="socials"
      style={{
        position: 'relative',
        padding: 'clamp(5rem, 11vh, 9rem) 0',
        zIndex: 2,
      }}
    >
      {/* Drifting Kinetic Background Watermark */}
      <ParallaxWatermark text="PLATFORMS // STREAMING" top="12%" speed={-85} opacity={0.028} />

      <div className="container">
        {/* Section Header */}
        <div style={{ marginBottom: 'clamp(3rem, 6vh, 4.5rem)' }}>
          <div className="editorial-kicker">
            <span>06 // {t.socials.badge}</span>
          </div>
          <h2 className="editorial-title">
            <RevealText
              text={t.socials.title}
              serifWord={lang === 'ru' ? 'стриминг' : 'Streaming'}
            />
          </h2>
          <p className="editorial-subtitle">{t.socials.subtitle}</p>
        </div>

        {/* Architectural Platform Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(250px, 28vw, 370px), 1fr))',
            borderTop: '1px solid var(--border-strong)',
            borderLeft: '1px solid var(--border-line)',
          }}
        >
          {socials.map((social, index) => {
            const meta = platformMeta[social.platform] || {
              color: 'var(--electric-blue)',
              descRu: 'Официальный профиль',
              descEn: 'Official profile',
              handle: social.label,
            };

            return (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 3) * 0.05 }}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.1rem',
                  padding: 'clamp(1.25rem, 2.2vw, 1.75rem)',
                  background: 'rgba(6, 7, 18, 0.55)',
                  borderRight: '1px solid var(--border-line)',
                  borderBottom: '1px solid var(--border-line)',
                  textDecoration: 'none',
                  color: 'inherit',
                  transition: 'background 0.3s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(18, 20, 44, 0.85)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(6, 7, 18, 0.55)';
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '0.75rem',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.66rem',
                      fontWeight: 600,
                      letterSpacing: '0.14em',
                      color: meta.color,
                      textTransform: 'uppercase',
                    }}
                  >
                    0{index + 1} // {meta.handle}
                  </span>
                  <ArrowUpRight size={15} color="var(--text-muted)" />
                </div>

                <div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
                      fontWeight: 800,
                      color: '#ffffff',
                      letterSpacing: '-0.025em',
                      textTransform: 'uppercase',
                      margin: '0 0 0.35rem 0',
                    }}
                  >
                    {social.label}
                  </h3>
                  <p
                    style={{
                      fontFamily: 'var(--font-main)',
                      fontSize: '0.84rem',
                      color: 'var(--text-muted)',
                      lineHeight: 1.45,
                      margin: 0,
                    }}
                  >
                    {lang === 'ru' ? meta.descRu : meta.descEn}
                  </p>
                </div>
              </motion.a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
