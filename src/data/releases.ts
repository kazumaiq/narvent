export type ReleaseType = 'album' | 'ep' | 'single' | 'collaboration';

export interface StreamingLinks {
  spotify?: string;
  appleMusic?: string;
}

export interface Release {
  id: string;
  title: string;
  artist: string;
  featuring?: string[];
  type: ReleaseType;
  releaseDate: string; // ISO date
  year: number;
  trackCount?: number;
  tracks?: string[];
  description?: string;
  links: StreamingLinks;
  coverGradient: [string, string, string];
  coverImage?: string;
  popular?: boolean;
  latest?: boolean;
}

export const releases: Release[] = [
  // === ALBUMS (Official Spotify) ===
  {
    id: 'genesis',
    coverImage: '/covers/genesis.jpg',
    title: 'Genesis',
    artist: 'Narvent',
    type: 'album',
    releaseDate: '2026-08-01',
    year: 2026,
    trackCount: 17,
    tracks: ['The Running Man', 'Override', 'Arcade', 'Supersonic', 'Genesis'],
    description: 'A massive 17-track project showcasing Narvent\'s evolution in cinematic synthwave production.',
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
      appleMusic: 'https://music.apple.com/artist/narvent/1489292108',
    },
    coverGradient: ['#0a0a2e', '#1a0a3e', '#3a1a6e'],
    latest: true,
  },
  {
    id: 'insomnia',
    coverImage: '/covers/insomnia.jpg',
    title: 'Insomnia',
    artist: 'Narvent',
    type: 'album',
    releaseDate: '2024-08-09',
    year: 2024,
    trackCount: 13,
    tracks: ['Insomnia (Intro)', 'Fainted', 'Her Eyes', 'Vintage Sadness', 'Interlude', 'Elegance', 'Flower With No Name', 'Serenity', 'Anxiety', 'Memory', 'Solitude (Outro)'],
    featuring: ['Adieu Aru', 'KoruSe', 'Nikkie'],
    description: 'A deeply atmospheric journey through sleepless nights, featuring collaborations with Adieu Aru, KoruSe, and Nikkie.',
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
      appleMusic: 'https://music.apple.com/artist/narvent/1489292108',
    },
    coverGradient: ['#0d0d2b', '#1a1a4e', '#2d1b69'],
    popular: true,
  },
  {
    id: 'memory-reboot-album',
    coverImage: '/covers/memory-reboot-album.jpg',
    title: 'Memory Reboot',
    artist: 'VØJ & Narvent',
    featuring: ['VØJ'],
    type: 'album',
    releaseDate: '2023-09-01',
    year: 2023,
    tracks: ['Memory Reboot', 'Lost Memory', 'Moonlit', 'Distant Echoes'],
    description: 'The collaborative album that spawned the global viral hit "Memory Reboot", reaching No. 13 on Billboard Hot Dance/Electronic Songs chart.',
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
      appleMusic: 'https://music.apple.com/artist/narvent/1489292108',
    },
    coverGradient: ['#0a0520', '#1a0a40', '#4a1a8a'],
    popular: true,
  },
  {
    id: 'forever-in-this-world',
    coverImage: '/covers/forever-in-this-world.jpg',
    title: 'Forever In This World',
    artist: 'Narvent',
    type: 'album',
    releaseDate: '2020-01-01',
    year: 2020,
    description: 'An early full-length exploration of Narvent\'s atmospheric electronic soundscapes.',
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
    },
    coverGradient: ['#0a1a2a', '#1a2a4a', '#2a3a6a'],
  },
  {
    id: 'endless-way',
    coverImage: '/covers/endless-way.jpg',
    title: 'Endless Way',
    artist: 'Narvent',
    type: 'album',
    releaseDate: '2019-01-01',
    year: 2019,
    description: 'Narvent\'s debut full-length album establishing his signature sound.',
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
    },
    coverGradient: ['#0d1b2a', '#1b2838', '#2a3f5f'],
  },

  // === EPs (Official Spotify) ===
  {
    id: 'recall-ep',
    coverImage: '/covers/recall-ep.jpg',
    title: 'Recall',
    artist: 'Narvent',
    type: 'ep',
    releaseDate: '2026-10-01',
    year: 2026,
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
      appleMusic: 'https://music.apple.com/artist/narvent/1489292108',
    },
    coverGradient: ['#0a0a1e', '#1e0a3e', '#3e1a5e'],
    latest: true,
  },
  {
    id: 'lights-flash-ep',
    coverImage: '/covers/lights-flash-ep.jpg',
    title: 'Lights Flash',
    artist: 'Narvent & Ogryzek',
    featuring: ['Ogryzek'],
    type: 'ep',
    releaseDate: '2026-01-01',
    year: 2026,
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
    },
    coverGradient: ['#1a0a2e', '#2e1a4e', '#4e2a7e'],
    latest: true,
  },
  {
    id: 'ascend-ep',
    coverImage: '/covers/ascend-ep.jpg',
    title: 'Ascend',
    artist: 'Narvent & MAXTERX',
    featuring: ['MAXTERX'],
    type: 'ep',
    releaseDate: '2026-01-01',
    year: 2026,
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
    },
    coverGradient: ['#0a0a2a', '#1a1a4a', '#2a2a6a'],
    latest: true,
  },
  {
    id: 'ocean-blue-ep',
    coverImage: '/covers/ocean-blue-ep.jpg',
    title: 'Ocean Blue',
    artist: 'Narvent',
    type: 'ep',
    releaseDate: '2026-01-01',
    year: 2026,
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
    },
    coverGradient: ['#0a1a3e', '#1a2a5e', '#2a4a8e'],
  },

  // === SINGLES (Official Spotify) ===
  {
    id: 'memory-reboot',
    coverImage: '/covers/memory-reboot.jpg',
    title: 'Memory Reboot',
    artist: 'VØJ & Narvent',
    featuring: ['VØJ'],
    type: 'single',
    releaseDate: '2023-01-13',
    year: 2023,
    description: 'RIAA Gold-certified viral hit. Peaked at No. 13 on Billboard Hot Dance/Electronic Songs.',
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
      appleMusic: 'https://music.apple.com/artist/narvent/1489292108',
    },
    coverGradient: ['#0a0520', '#1a0a40', '#4a1a8a'],
    popular: true,
  },
  {
    id: 'fainted',
    coverImage: '/covers/fainted.jpg',
    title: 'Fainted',
    artist: 'Narvent',
    type: 'single',
    releaseDate: '2023-01-01',
    year: 2023,
    description: 'One of Narvent\'s most popular solo tracks with dark, melancholic synth textures.',
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
      appleMusic: 'https://music.apple.com/artist/narvent/1489292108',
    },
    coverGradient: ['#0d0d2b', '#1a1a4e', '#2d1b69'],
    popular: true,
  },
  {
    id: 'distant-echoes',
    coverImage: '/covers/distant-echoes.jpg',
    title: 'Distant Echoes',
    artist: 'VXLLAIN, VØJ & Narvent',
    featuring: ['VXLLAIN', 'VØJ'],
    type: 'single',
    releaseDate: '2023-01-01',
    year: 2023,
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
    },
    coverGradient: ['#0a0a2e', '#1a1a4e', '#3a2a6e'],
    popular: true,
  },
  {
    id: 'her-eyes',
    coverImage: '/covers/her-eyes.jpg',
    title: 'Her Eyes',
    artist: 'Narvent',
    type: 'single',
    releaseDate: '2024-01-01',
    year: 2024,
    description: 'A melodic synthwave fan-favorite that paved the way into the Insomnia era.',
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
      appleMusic: 'https://music.apple.com/artist/narvent/1489292108',
    },
    coverGradient: ['#1a0a2a', '#2a1a4a', '#4a2a7a'],
    popular: true,
  },
  {
    id: 'fade-into-darkness',
    coverImage: '/covers/fade-into-darkness.jpg',
    title: 'Fade Into Darkness',
    artist: 'Narvent',
    type: 'single',
    releaseDate: '2025-01-01',
    year: 2025,
    description: 'A moody, atmospheric electronic piece blending cinematic synthwave and darkwave.',
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
    },
    coverGradient: ['#0a0a1a', '#1a0a2a', '#2a1a4a'],
    popular: true,
    latest: true,
  },
  {
    id: 'way-back-home',
    coverImage: '/covers/way-back-home.jpg',
    title: 'Way Back Home',
    artist: 'Narvent',
    type: 'single',
    releaseDate: '2025-01-01',
    year: 2025,
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
    },
    coverGradient: ['#0d1a2d', '#1a2a4d', '#2a4a7d'],
    latest: true,
  },
  {
    id: 'euphoria',
    coverImage: '/covers/euphoria.jpg',
    title: 'Euphoria',
    artist: 'VØJ, Narvent & KoruSe',
    featuring: ['VØJ', 'KoruSe'],
    type: 'single',
    releaseDate: '2023-01-01',
    year: 2023,
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
    },
    coverGradient: ['#1a0a3e', '#2a1a5e', '#4a2a8e'],
    popular: true,
  },
  {
    id: 'white-roses',
    coverImage: '/covers/white-roses.jpg',
    title: 'White Roses',
    artist: 'Narvent',
    type: 'single',
    releaseDate: '2025-01-01',
    year: 2025,
    description: 'Official single featuring iconic retro-aesthetic artwork and driving nocturnal electronic melodies.',
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
    },
    coverGradient: ['#1a1a2a', '#2a2a3a', '#4a4a5a'],
    latest: true,
  },
  {
    id: 'hypnosis',
    coverImage: '/covers/hypnosis.jpg',
    title: 'Hypnosis',
    artist: 'Narvent & REFLECT AFTER DARK',
    featuring: ['REFLECT AFTER DARK'],
    type: 'single',
    releaseDate: '2026-01-01',
    year: 2026,
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
    },
    coverGradient: ['#0a0a20', '#1a0a40', '#3a1a60'],
    latest: true,
  },
  {
    id: 'calm-night',
    coverImage: '/covers/calm-night.jpg',
    title: 'Calm Night',
    artist: 'Narvent & Luneex',
    featuring: ['Luneex'],
    type: 'single',
    releaseDate: '2024-01-01',
    year: 2024,
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
    },
    coverGradient: ['#0a1a2e', '#1a2a4e', '#2a3a6e'],
  },
  {
    id: 'avalanche',
    coverImage: '/covers/avalanche.jpg',
    title: 'Avalanche',
    artist: 'Narvent',
    type: 'single',
    releaseDate: '2024-01-01',
    year: 2024,
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
      appleMusic: 'https://music.apple.com/artist/narvent/1489292108',
    },
    coverGradient: ['#1a1a2e', '#2a2a4e', '#3a3a6e'],
  },
  {
    id: 'broken-halo',
    coverImage: '/covers/broken-halo.jpg',
    title: 'Broken Halo',
    artist: 'Narvent & fadevɇil',
    featuring: ['fadevɇil'],
    type: 'single',
    releaseDate: '2025-01-01',
    year: 2025,
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
    },
    coverGradient: ['#1a0a1a', '#2a1a2a', '#4a2a4a'],
    latest: true,
  },
  {
    id: 'to-the-moon',
    coverImage: '/covers/to-the-moon.jpg',
    title: 'To The Moon',
    artist: 'Narvent, MAINLY & CYREX',
    featuring: ['MAINLY', 'CYREX'],
    type: 'single',
    releaseDate: '2025-01-01',
    year: 2025,
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
    },
    coverGradient: ['#0a1a3a', '#1a2a5a', '#2a3a7a'],
    latest: true,
  },
  {
    id: 'strange-memory',
    coverImage: '/covers/strange-memory.jpg',
    title: 'Strange Memory',
    artist: 'Narvent',
    type: 'single',
    releaseDate: '2025-01-01',
    year: 2025,
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
    },
    coverGradient: ['#0a0a2e', '#1a1a3e', '#2a2a5e'],
    latest: true,
  },
  {
    id: 'no-dress',
    coverImage: '/covers/no-dress.jpg',
    title: 'No Dress',
    artist: 'Narvent',
    type: 'single',
    releaseDate: '2025-01-01',
    year: 2025,
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
    },
    coverGradient: ['#0d0a1a', '#1d1a2a', '#3d2a4a'],
    latest: true,
  },
  {
    id: 'take-me-there',
    coverImage: '/covers/take-me-there.jpg',
    title: 'Take Me There',
    artist: 'Narvent',
    type: 'single',
    releaseDate: '2025-01-01',
    year: 2025,
    links: {
      spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7',
    },
    coverGradient: ['#1a0a2e', '#2a1a3e', '#4a2a5e'],
    latest: true,
  },
];

// Helper functions
export const getPopularReleases = () => releases.filter(r => r.popular);
export const getLatestReleases = () => releases.filter(r => r.latest).sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
export const getAlbums = () => releases.filter(r => r.type === 'album');
export const getEPs = () => releases.filter(r => r.type === 'ep');
export const getSingles = () => releases.filter(r => r.type === 'single');
export const getCollaborations = () => releases.filter(r => r.featuring && r.featuring.length > 0);
export const getReleasesByYear = (year: number) => releases.filter(r => r.year === year);
export const getReleaseById = (id: string) => releases.find(r => r.id === id);
