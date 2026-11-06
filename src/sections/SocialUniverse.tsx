import { motion } from 'framer-motion';
import { Sparkles, ExternalLink, Globe } from 'lucide-react';
import { socials } from '../data/socials';

export default function SocialUniverse() {
  const platformMeta: Record<string, { color: string; desc: string; handle: string }> = {
    spotify: { color: '#1db954', desc: '1.9M+ Monthly Listeners', handle: 'Narvent' },
    youtube: { color: '#ff0000', desc: '579K+ Subscribers • 4K Visuals', handle: '@NarventMusic' },
    soundcloud: { color: '#ff5500', desc: 'Official Cuts & Atmospheric Edits', handle: 'musicofnarvent' },
    instagram: { color: '#e1306c', desc: 'Aesthetic Imagery & Studio Drops', handle: '@narventof' },
    tiktok: { color: '#00f2fe', desc: 'Viral Edits & Sound Transmissions', handle: '@narvent.music' },
    telegram: { color: '#229ed9', desc: 'Direct Fan Community & News', handle: 't.me/narventof' },
    vk: { color: '#0077ff', desc: 'Discography & Russian Fan Community', handle: 'vk.com/narventmusic' },
    'apple-music': { color: '#fc3c44', desc: 'Lossless & Spatial Audio Discography', handle: 'Narvent on Apple Music' },
    linktree: { color: '#43e660', desc: 'All Official Release Links Hub', handle: 'linktr.ee/narvent' },
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
        {/* Header Block */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="editorial-badge">
            <Sparkles size={11} color="var(--electric-blue)" />
            VERIFIED NETWORK CHANNELS
          </span>
          <h2 className="editorial-title">The Social Universe</h2>
          <p className="editorial-subtitle" style={{ margin: '0.75rem auto 0' }}>
            Direct portals to all verified Narvent channels and streaming profiles across the web.
          </p>
        </div>

        {/* Portals Grid */}
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
              desc: 'Official Profile',
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
                  border: '1px solid var(--border-line)',
                  borderRadius: '16px',
                  padding: '1.25rem 1.4rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  overflow: 'hidden',
                  transition: 'all 0.3s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px) scale(1.02)';
                  e.currentTarget.style.borderColor = `${meta.color}66`;
                  e.currentTarget.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.6), 0 0 25px ${meta.color}25`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = 'var(--border-line)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Brand Glyph Orb */}
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

                {/* Details */}
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
