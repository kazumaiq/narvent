import { motion } from 'framer-motion';
import { Sparkles, ExternalLink, Globe, Send, Music2, Disc } from 'lucide-react';
import { socials } from '../data/socials';

export default function SocialUniverse() {
  // Brand colors & descriptions for rich cards
  const platformMeta: Record<string, { color: string; desc: string; handle: string }> = {
    spotify: { color: '#1db954', desc: '1.9M+ Monthly Listeners', handle: 'Narvent' },
    youtube: { color: '#ff0000', desc: '579K+ Subscribers • 4K Music Videos', handle: '@NarventMusic' },
    soundcloud: { color: '#ff5500', desc: 'Exclusive Cuts, Slowed & Remixes', handle: 'musicofnarvent' },
    instagram: { color: '#e1306c', desc: 'Aesthetics & Official Visuals', handle: '@narventof' },
    tiktok: { color: '#00f2fe', desc: 'Viral Edits & Sound Transmissions', handle: '@narvent.music' },
    telegram: { color: '#229ed9', desc: 'Direct Fan Community & News', handle: 't.me/narventof' },
    vk: { color: '#0077ff', desc: 'Official Discography & Russian Fanbase', handle: 'vk.com/narventmusic' },
    'apple-music': { color: '#fc3c44', desc: 'Lossless & Spatial Audio Catalog', handle: 'Narvent on Apple Music' },
    linktree: { color: '#43e660', desc: 'All Official Hub Links & Releases', handle: 'linktr.ee/narvent' },
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
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span className="section-badge" style={{ margin: '0 auto 1.25rem' }}>
            <Sparkles size={12} color="#7093ff" />
            CONNECT ACROSS THE DIGITAL VOID
          </span>
          <h2 className="section-title">The Social Universe</h2>
          <p className="section-desc" style={{ margin: '0.75rem auto 0' }}>
            Follow Narvent across all official networks and streaming platforms. Every portal below leads directly to verified official channels.
          </p>
        </div>

        {/* Social Portals Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(clamp(260px, 28vw, 360px), 1fr))',
            gap: '1.5rem',
            maxWidth: '1200px',
            margin: '0 auto',
          }}
        >
          {socials.map((social, index) => {
            const meta = platformMeta[social.platform] || {
              color: '#7093ff',
              desc: 'Official Profile',
              handle: social.label,
            };

            return (
              <motion.a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.06 }}
                style={{
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1.25rem',
                  background: 'rgba(12, 12, 32, 0.65)',
                  backdropFilter: 'blur(16px)',
                  WebkitBackdropFilter: 'blur(16px)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '18px',
                  padding: '1.25rem 1.5rem',
                  textDecoration: 'none',
                  color: 'inherit',
                  overflow: 'hidden',
                  transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-6px) scale(1.02)';
                  e.currentTarget.style.borderColor = `${meta.color}66`;
                  e.currentTarget.style.boxShadow = `0 15px 35px rgba(0, 0, 0, 0.6), 0 0 25px ${meta.color}33`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                {/* Brand Glyph Orb */}
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '14px',
                    background: `${meta.color}18`,
                    border: `1px solid ${meta.color}44`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: meta.color,
                    flexShrink: 0,
                  }}
                >
                  <Globe size={22} />
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
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: '#ffffff',
                        margin: 0,
                      }}
                    >
                      {social.label}
                    </h3>
                    <ExternalLink size={14} color="rgba(184, 169, 212, 0.6)" />
                  </div>

                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: '0.72rem',
                      color: meta.color,
                      marginBottom: '0.25rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {meta.handle}
                  </div>

                  <div
                    style={{
                      fontFamily: "'Inter', sans-serif",
                      fontSize: '0.78rem',
                      color: 'rgba(184, 169, 212, 0.7)',
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
