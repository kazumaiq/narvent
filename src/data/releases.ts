import { coverManifest } from './coverManifest';

export type ReleaseType = 'album' | 'ep' | 'single' | 'collaboration';

export interface StreamingLinks {
  spotify?: string;
  appleMusic?: string;
}

/** Spotify entity used by the embedded player (album/single page or a track). */
export interface SpotifyRef {
  kind: 'album' | 'track';
  id: string;
}

export interface Release {
  /** Stable unique ID — the ONLY key used to link a release to its artwork, React keys, etc. */
  id: string;
  title: string;
  artist: string;
  featuring?: string[];
  type: ReleaseType;
  /** Original release date (YYYY-MM-DD), verified against Spotify / Apple Music. */
  releaseDate: string;
  /** Derived from releaseDate — never set by hand. */
  year: number;
  trackCount?: number;
  tracks?: string[];
  description?: string;
  links: StreamingLinks;
  coverGradient: [string, string, string];
  /** Derived from coverManifest by release ID — never set by hand. */
  coverImage?: string;
  popular?: boolean;
  spotify?: SpotifyRef;
}

type ReleaseInput = Omit<Release, 'year' | 'coverImage'>;

const APPLE_ARTIST = 'https://music.apple.com/artist/narvent/1489292108';

/**
 * Source data. Order here does NOT matter — every list on the site is sorted by
 * `releaseDate` at runtime, so new releases can simply be appended.
 * Dates verified 2026-11-07 via Spotify embeds and the iTunes Search API.
 */
const releaseData: ReleaseInput[] = [
  // === ALBUMS ===
  {
    id: 'genesis',
    title: 'Genesis',
    artist: 'Narvent',
    type: 'album',
    releaseDate: '2026-08-14',
    trackCount: 17,
    tracks: ['Genesis - Intro', 'Supersonic', 'Ocean Blue', 'Arcade', 'Lights Flash', 'Override', 'The Running Man'],
    description: 'A massive 17-track project showcasing Narvent\'s evolution in cinematic synthwave production.',
    links: { spotify: 'https://open.spotify.com/album/5cjILeRU7eHuZ5bhmkGSpe', appleMusic: APPLE_ARTIST },
    coverGradient: ['#0a0a2e', '#1a0a3e', '#3a1a6e'],
    spotify: { kind: 'album', id: '5cjILeRU7eHuZ5bhmkGSpe' },
  },
  {
    id: 'insomnia',
    title: 'Insomnia',
    artist: 'Narvent',
    type: 'album',
    releaseDate: '2024-08-09',
    trackCount: 15,
    tracks: ['Insomnia (Intro)', 'Fainted', 'Her Eyes', 'Vintage Sadness', 'Interlude', 'Elegance', 'Flower With No Name'],
    featuring: ['Adieu Aru', 'KoruSe', 'Nikkie'],
    description: 'A deeply atmospheric journey through sleepless nights, featuring collaborations with Adieu Aru, KoruSe, and Nikkie.',
    links: { spotify: 'https://open.spotify.com/album/5vuvOiVlPukt9VFgOQdMuR', appleMusic: APPLE_ARTIST },
    coverGradient: ['#0d0d2b', '#1a1a4e', '#2d1b69'],
    popular: true,
    spotify: { kind: 'album', id: '5vuvOiVlPukt9VFgOQdMuR' },
  },
  {
    id: 'memory-reboot-album',
    title: 'Memory Reboot',
    artist: 'VØJ & Narvent',
    featuring: ['VØJ'],
    type: 'album',
    releaseDate: '2023-09-01',
    trackCount: 9,
    tracks: ['Memory Reboot', 'Moonlit', 'Last Memory', 'Euphoria', 'Lost Memory', 'Before You Fade'],
    description: 'The collaborative album built around the global viral hit "Memory Reboot".',
    links: { spotify: 'https://open.spotify.com/album/38leU2pvDRxNx2u59BENZb', appleMusic: 'https://music.apple.com/album/1702223001' },
    coverGradient: ['#0a0520', '#1a0a40', '#4a1a8a'],
    popular: true,
    spotify: { kind: 'album', id: '38leU2pvDRxNx2u59BENZb' },
  },
  {
    id: 'forever-in-this-world',
    title: 'Forever In This World',
    artist: 'Narvent',
    type: 'album',
    releaseDate: '2020-01-01',
    trackCount: 11,
    description: 'An early full-length exploration of Narvent\'s atmospheric electronic soundscapes.',
    links: { spotify: 'https://open.spotify.com/album/620bFbgbiliAIe1pO5bD0p' },
    coverGradient: ['#0a1a2a', '#1a2a4a', '#2a3a6a'],
    spotify: { kind: 'album', id: '620bFbgbiliAIe1pO5bD0p' },
  },
  {
    id: 'endless-way',
    title: 'Endless Way',
    artist: 'Narvent',
    featuring: ['FireWing'],
    type: 'album',
    releaseDate: '2019-04-18',
    trackCount: 8,
    description: 'Narvent\'s debut full-length album establishing his signature sound.',
    links: { spotify: 'https://open.spotify.com/album/5VntVRRMeoIACBZhwmTJAZ' },
    coverGradient: ['#0d1b2a', '#1b2838', '#2a3f5f'],
    spotify: { kind: 'album', id: '5VntVRRMeoIACBZhwmTJAZ' },
  },

  // === EPs ===
  {
    id: 'recall-ep',
    title: 'Recall',
    artist: 'Narvent',
    type: 'ep',
    releaseDate: '2026-10-16',
    trackCount: 4,
    links: { spotify: 'https://open.spotify.com/album/12wOn3nOlQoc9zBvODvJk2', appleMusic: APPLE_ARTIST },
    coverGradient: ['#0a0a1e', '#1e0a3e', '#3e1a5e'],
    spotify: { kind: 'album', id: '12wOn3nOlQoc9zBvODvJk2' },
  },
  {
    id: 'lights-flash-ep',
    title: 'Lights Flash',
    artist: 'Narvent & Ogryzek',
    featuring: ['Ogryzek'],
    type: 'ep',
    releaseDate: '2026-07-10',
    trackCount: 4,
    links: { spotify: 'https://open.spotify.com/album/1gYNabmFPme6zJAom0aOoR' },
    coverGradient: ['#1a0a2e', '#2e1a4e', '#4e2a7e'],
    spotify: { kind: 'album', id: '1gYNabmFPme6zJAom0aOoR' },
  },
  {
    id: 'ocean-blue-ep',
    title: 'Ocean Blue',
    artist: 'Narvent',
    type: 'ep',
    releaseDate: '2026-05-22',
    trackCount: 4,
    links: { spotify: 'https://open.spotify.com/album/6DliB6HpsWVBtuliIJxAXR' },
    coverGradient: ['#0a1a3e', '#1a2a5e', '#2a4a8e'],
    spotify: { kind: 'album', id: '6DliB6HpsWVBtuliIJxAXR' },
  },

  // === SINGLES ===
  {
    id: 'memory-reboot',
    title: 'Memory Reboot',
    artist: 'VØJ & Narvent',
    featuring: ['VØJ'],
    type: 'single',
    releaseDate: '2023-01-13',
    description: 'RIAA Gold-certified viral hit. Peaked at No. 13 on Billboard Hot Dance/Electronic Songs.',
    links: { spotify: 'https://open.spotify.com/track/1Q68oodivzKjIDnPTXFy83', appleMusic: 'https://music.apple.com/album/1663316684' },
    coverGradient: ['#0a0520', '#1a0a40', '#4a1a8a'],
    popular: true,
    spotify: { kind: 'track', id: '1Q68oodivzKjIDnPTXFy83' },
  },
  {
    id: 'fainted',
    title: 'Fainted',
    artist: 'Narvent',
    type: 'single',
    releaseDate: '2023-10-27',
    description: 'One of Narvent\'s most popular solo tracks with dark, melancholic synth textures.',
    links: { spotify: 'https://open.spotify.com/track/0EzcI4IlhBezIzSiTrkr0e', appleMusic: 'https://music.apple.com/album/1709555756' },
    coverGradient: ['#0d0d2b', '#1a1a4e', '#2d1b69'],
    popular: true,
    spotify: { kind: 'track', id: '0EzcI4IlhBezIzSiTrkr0e' },
  },
  {
    id: 'distant-echoes',
    title: 'Distant Echoes',
    artist: 'VXLLAIN, VØJ & Narvent',
    featuring: ['VXLLAIN', 'VØJ'],
    type: 'single',
    releaseDate: '2023-10-13',
    links: { spotify: 'https://open.spotify.com/track/2DgL722jfzULRS4tGo5OEq' },
    coverGradient: ['#0a0a2e', '#1a1a4e', '#3a2a6e'],
    popular: true,
    spotify: { kind: 'track', id: '2DgL722jfzULRS4tGo5OEq' },
  },
  {
    id: 'her-eyes',
    title: 'Her Eyes',
    artist: 'Narvent',
    type: 'single',
    releaseDate: '2024-04-26',
    description: 'A melodic synthwave fan-favorite that paved the way into the Insomnia era.',
    links: { spotify: 'https://open.spotify.com/track/5PPLVeBftSqxLCCqlwW5wN', appleMusic: APPLE_ARTIST },
    coverGradient: ['#1a0a2a', '#2a1a4a', '#4a2a7a'],
    popular: true,
    spotify: { kind: 'track', id: '5PPLVeBftSqxLCCqlwW5wN' },
  },
  {
    id: 'fade-into-darkness',
    title: 'Fade Into Darkness',
    artist: 'Narvent',
    type: 'single',
    releaseDate: '2025-04-04',
    description: 'A moody, atmospheric electronic piece blending cinematic synthwave and darkwave.',
    links: { spotify: 'https://open.spotify.com/album/6C49vKdNBSjYrk0ATRhKGB' },
    coverGradient: ['#0a0a1a', '#1a0a2a', '#2a1a4a'],
    popular: true,
    spotify: { kind: 'track', id: '00xxo87K2FkUZBvENyRNgN' },
  },
  {
    id: 'way-back-home',
    title: 'Way Back Home',
    artist: 'Narvent',
    type: 'single',
    releaseDate: '2025-09-26',
    links: { spotify: 'https://open.spotify.com/album/7ge38c7frs9KDfHOIZ6sfP' },
    coverGradient: ['#0d1a2d', '#1a2a4d', '#2a4a7d'],
    spotify: { kind: 'album', id: '7ge38c7frs9KDfHOIZ6sfP' },
  },
  {
    id: 'white-roses',
    title: 'White Roses',
    artist: 'Narvent',
    type: 'single',
    releaseDate: '2025-02-21',
    description: 'Official single featuring iconic retro-aesthetic artwork and driving nocturnal electronic melodies.',
    links: { spotify: 'https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7', appleMusic: APPLE_ARTIST },
    coverGradient: ['#1a1a2a', '#2a2a3a', '#4a4a5a'],
  },
  {
    id: 'hypnosis',
    title: 'Hypnosis',
    artist: 'REFLECT AFTER DARK & Narvent',
    featuring: ['REFLECT AFTER DARK'],
    type: 'single',
    releaseDate: '2026-06-05',
    links: { spotify: 'https://open.spotify.com/album/63RPB5EA18fWnNWaTVwQks' },
    coverGradient: ['#0a0a20', '#1a0a40', '#3a1a60'],
    spotify: { kind: 'album', id: '63RPB5EA18fWnNWaTVwQks' },
  },
  {
    id: 'calm-night',
    title: 'Calm Night',
    artist: 'Narvent & Luneex',
    featuring: ['Luneex'],
    type: 'single',
    releaseDate: '2024-01-19',
    links: { spotify: 'https://open.spotify.com/album/37Gc376ZWd8p8CFICbVldw' },
    coverGradient: ['#0a1a2e', '#1a2a4e', '#2a3a6e'],
    spotify: { kind: 'album', id: '37Gc376ZWd8p8CFICbVldw' },
  },
  {
    id: 'avalanche',
    title: 'Avalanche',
    artist: 'Narvent & PHUNK$',
    featuring: ['PHUNK$'],
    type: 'single',
    releaseDate: '2024-12-13',
    links: { spotify: 'https://open.spotify.com/album/2dHwCyRsuqQbrKkBC39Xxb', appleMusic: APPLE_ARTIST },
    coverGradient: ['#1a1a2e', '#2a2a4e', '#3a3a6e'],
    spotify: { kind: 'album', id: '2dHwCyRsuqQbrKkBC39Xxb' },
  },
  {
    id: 'broken-halo',
    title: 'Broken Halo',
    artist: 'Narvent & fadevɇil',
    featuring: ['fadevɇil'],
    type: 'single',
    releaseDate: '2025-08-01',
    links: { spotify: 'https://open.spotify.com/album/2autig9HMFHISEzt9k5jsB' },
    coverGradient: ['#1a0a1a', '#2a1a2a', '#4a2a4a'],
    spotify: { kind: 'album', id: '2autig9HMFHISEzt9k5jsB' },
  },
  {
    id: 'to-the-moon',
    title: 'To The Moon',
    artist: 'Mainly, Narvent & CYREX',
    featuring: ['Mainly', 'CYREX'],
    type: 'single',
    releaseDate: '2025-06-06',
    links: { spotify: 'https://open.spotify.com/album/30QrUFnaHKtSQKRSZVjks3' },
    coverGradient: ['#0a1a3a', '#1a2a5a', '#2a3a7a'],
    spotify: { kind: 'album', id: '30QrUFnaHKtSQKRSZVjks3' },
  },
  {
    id: 'strange-memory',
    title: 'Strange Memory',
    artist: 'Narvent',
    type: 'single',
    releaseDate: '2025-01-10',
    links: { spotify: 'https://open.spotify.com/album/6pjBRH3ddp5UpgILOmstEr' },
    coverGradient: ['#0a0a2e', '#1a1a3e', '#2a2a5e'],
    spotify: { kind: 'album', id: '6pjBRH3ddp5UpgILOmstEr' },
  },
  {
    id: 'no-dress',
    title: 'No Dress',
    artist: 'Narvent',
    type: 'single',
    releaseDate: '2025-08-29',
    links: { spotify: 'https://open.spotify.com/album/0NOusyee4TSX71hyM8XpkW' },
    coverGradient: ['#0d0a1a', '#1d1a2a', '#3d2a4a'],
    spotify: { kind: 'album', id: '0NOusyee4TSX71hyM8XpkW' },
  },
  {
    id: 'take-me-there',
    title: 'Take Me There',
    artist: 'Narvent',
    type: 'single',
    releaseDate: '2025-11-14',
    links: { spotify: 'https://open.spotify.com/album/2Ve6wUN0jtCUXv9PiDtdCE' },
    coverGradient: ['#1a0a2e', '#2a1a3e', '#4a2a5e'],
    spotify: { kind: 'album', id: '2Ve6wUN0jtCUXv9PiDtdCE' },
  },
];

/**
 * Records excluded from the site until their data can be confirmed.
 * Never shown — kept here so the information is not lost.
 */
export const releasesPendingReview = [
  {
    id: 'ascend-ep',
    title: 'Ascend',
    artist: 'Narvent & MAXTERX',
    reason: 'Stored Spotify ID pointed to a different track ("Ghosted"); release date and official artwork could not be verified.',
  },
  {
    id: 'euphoria',
    title: 'Euphoria',
    artist: 'VØJ, Narvent & KoruSe',
    reason: 'Not a standalone release — it is track 4 of the "Memory Reboot" album (same artwork). Listed in that album\'s tracklist instead.',
  },
];

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

/** Newest first; ties resolved deterministically by ID so order never "jumps". */
export const byReleaseDateDesc = (a: Release, b: Release) =>
  b.releaseDate.localeCompare(a.releaseDate) || a.id.localeCompare(b.id);

function buildReleases(input: ReleaseInput[]): Release[] {
  const ids = new Set<string>();
  const out: Release[] = [];
  for (const r of input) {
    if (ids.has(r.id)) {
      console.error(`[releases] duplicate release id "${r.id}" — skipped`);
      continue;
    }
    if (!ISO_DATE.test(r.releaseDate)) {
      console.error(`[releases] invalid releaseDate for "${r.id}" — skipped`);
      continue;
    }
    ids.add(r.id);
    out.push({
      ...r,
      year: Number(r.releaseDate.slice(0, 4)),
      coverImage: coverManifest[r.id],
    });
  }
  return out.sort(byReleaseDateDesc);
}

/** All releases, newest first. */
export const releases: Release[] = buildReleases(releaseData);

/** Spotify embed URL that matches the entity type (album vs track). */
export const getSpotifyEmbedUrl = (r: Release) =>
  r.spotify ? `https://open.spotify.com/embed/${r.spotify.kind}/${r.spotify.id}?utm_source=generator&theme=0` : null;

/** "14 авг. 2026" / "Aug 14, 2026" — parsed as a calendar date (no timezone shift). */
export const formatReleaseDate = (iso: string, lang: 'ru' | 'en') => {
  const [y, m, d] = iso.split('-').map(Number);
  return new Intl.DateTimeFormat(lang === 'ru' ? 'ru-RU' : 'en-US', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    timeZone: 'UTC',
  }).format(new Date(Date.UTC(y, m - 1, d)));
};

// Helper functions — every list inherits the global newest-first order.
export const getPopularReleases = () => releases.filter((r) => r.popular);
export const getLatestReleases = (limit = 8) => releases.slice(0, limit);
export const getAlbums = () => releases.filter((r) => r.type === 'album');
export const getEPs = () => releases.filter((r) => r.type === 'ep');
export const getSingles = () => releases.filter((r) => r.type === 'single');
export const getCollaborations = () => releases.filter((r) => r.featuring && r.featuring.length > 0);
export const getReleasesByYear = (year: number) => releases.filter((r) => r.year === year);
export const getReleaseById = (id: string) => releases.find((r) => r.id === id);
