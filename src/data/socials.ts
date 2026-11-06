export interface SocialLink {
  platform: string;
  url: string;
  icon: string; // icon name for later
  label: string;
}

export const socials: SocialLink[] = [
  { platform: 'spotify', url: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7', icon: 'spotify', label: 'Spotify' },
  { platform: 'youtube', url: 'https://www.youtube.com/@NarventMusic', icon: 'youtube', label: 'YouTube' },
  { platform: 'soundcloud', url: 'https://soundcloud.com/musicofnarvent', icon: 'soundcloud', label: 'SoundCloud' },
  { platform: 'instagram', url: 'https://instagram.com/narventof', icon: 'instagram', label: 'Instagram' },
  { platform: 'tiktok', url: 'https://www.tiktok.com/@narvent.music', icon: 'tiktok', label: 'TikTok' },
  { platform: 'telegram', url: 'https://t.me/narventof', icon: 'telegram', label: 'Telegram' },
  { platform: 'vk', url: 'https://vk.com/narventmusic', icon: 'vk', label: 'VKontakte' },
  { platform: 'apple-music', url: 'https://music.apple.com/artist/narvent/1489292108', icon: 'apple', label: 'Apple Music' },
  { platform: 'linktree', url: 'https://linktr.ee/narvent', icon: 'linktree', label: 'Linktree' },
];
