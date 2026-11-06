export interface Achievement {
  title: string;
  value: string;
  label: string;
  detail: string;
}

export const artist = {
  name: 'NARVENT',
  realName: 'Farkhod Musulmonov',
  genres: ['Synthwave', 'Wave Phonk', 'Dark Electronic', 'Retrowave', 'Cosmic Phonk'],
  origin: 'Russia',
  birthDate: 'July 19, 2005',
  label: 'volume100 / Believe Digital',
  network: 'Utopia Universe / Arcadia Alliance',
  spotifyId: '3QZtwiUoyaXbl1JssMPIQ7',
  appleMusicId: '1460309999',
  youtubeChannel: '@NarventMusic',
  bio: `Narvent (Farkhod Musulmonov) is an electronic music visionary at the vanguard of the modern dark synthwave and wave phonk movement. 
Born in 2005, he began crafting music inside FL Studio at an early age, sculpting a sonic signature marked by cavernous 80s reverb, deep sub-bass pulses, and haunting nocturnal melodies.

His collaborative masterstroke "Memory Reboot" alongside Ukrainian artist VØJ ignited a worldwide cultural phenomenon in 2023, gathering more than 310 million streams on Spotify alone, reaching #13 on the Billboard Hot Dance/Electronic Songs chart, and earning official RIAA Gold certification in the United States.

Maintaining an enigmatic persona that lets soundscapes speak louder than words, Narvent has built a dedicated global audience across Spotify, YouTube, and the wider underground electronic universe.`,
  shortBio: 'Pioneering producer shaping the atmospheric dark synthwave and cinematic wave phonk universe.',
  quote: '"Creating sounds that echo in late night drives and distant memories."',
  achievements: [
    {
      title: 'RIAA Gold',
      value: 'GOLD',
      label: 'RIAA Certified',
      detail: 'Certified Gold for "Memory Reboot" in the United States',
    },
    {
      title: 'Billboard Peak',
      value: '#13',
      label: 'Billboard Hot Dance',
      detail: 'Peaked at #13 on Billboard Hot Dance/Electronic Songs',
    },
    {
      title: 'Spotify Streams',
      value: '310M+',
      label: 'Memory Reboot Streams',
      detail: 'Over 310,000,000 streams on the lead single alone',
    },
    {
      title: 'YouTube Views',
      value: '650M+',
      label: 'Total Views',
      detail: 'Across official releases, 4K music videos & visualizers',
    },
    {
      title: 'Monthly Reach',
      value: '1.9M+',
      label: 'Monthly Listeners',
      detail: 'Consistent monthly listeners across global streaming platforms',
    },
    {
      title: 'Catalog Breadth',
      value: '50+',
      label: 'Releases',
      detail: 'Spanning 5 studio albums, numerous EPs, and iconic singles',
    },
  ] as Achievement[],
  milestones: [
    { year: 2019, title: 'Debut Album "Endless Way"', desc: 'Launched debut LP with FireWing, establishing his melancholic electronic identity.' },
    { year: 2020, title: 'Forever In This World & In Our Minds', desc: 'Released sophomore album and cult EP collaboration with DVRST and Telicity.' },
    { year: 2023, title: 'Memory Reboot Breakthrough', desc: 'Global phenomenon with VØJ. Billboard #13, RIAA Gold, viral across 100M+ TikTok edits.' },
    { year: 2024, title: 'Insomnia Era', desc: '13-track conceptual masterpiece featuring "Fainted", "Her Eyes", and collaborations with Adieu Aru & KoruSe.' },
    { year: 2025, title: 'Darkwave Evolution', desc: 'Singles "Fade Into Darkness", "Way Back Home", and expansive atmospheric soundscapes.' },
    { year: 2026, title: 'Genesis & New Frontiers', desc: '17-track magnum opus "Genesis" alongside EPs "Recall", "Lights Flash", and "Ascend".' },
  ],
};
