import fs from 'fs';
import path from 'path';

const RELEASES_PATH = 'src/data/releases.ts';
const COVERS_DIR = 'public/covers';

if (!fs.existsSync(COVERS_DIR)) {
  fs.mkdirSync(COVERS_DIR, { recursive: true });
}

// Download image from URL and save to dest
async function downloadImage(url, destPath) {
  // Try 1000x1000, 600x600, or fallback to original
  const candidateUrls = [
    url.replace(/\/\d+x\d+bb\./, '/1000x1000bb.'),
    url.replace(/\/\d+x\d+bb\./, '/600x600bb.'),
    url
  ];

  for (const u of candidateUrls) {
    try {
      const res = await fetch(u);
      if (res.ok) {
        const buffer = await res.arrayBuffer();
        if (buffer.byteLength > 1000) {
          fs.writeFileSync(destPath, Buffer.from(buffer));
          return true;
        }
      }
    } catch (e) {}
  }
  return false;
}

// Search iTunes for specific query
async function searchItunes(term) {
  try {
    const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(term)}&limit=15`);
    if (!res.ok) return [];
    const data = await res.json();
    return data.results || [];
  } catch (e) {
    return [];
  }
}

// Generate aesthetic SVG cover for any self-released/unreleased tracks
function generateAestheticSvgCover(title, artist, year, type, c1, c2, c3, destPath) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 800" width="800" height="800">
  <defs>
    <radialGradient id="bg" cx="50%" cy="40%" r="65%">
      <stop offset="0%" stop-color="${c3}" stop-opacity="0.9" />
      <stop offset="45%" stop-color="${c2}" stop-opacity="0.95" />
      <stop offset="100%" stop-color="${c1}" stop-opacity="1" />
    </radialGradient>
    <radialGradient id="glow" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#d946ef" stop-opacity="0.35" />
      <stop offset="60%" stop-color="#38bdf8" stop-opacity="0.15" />
      <stop offset="100%" stop-color="#000000" stop-opacity="0" />
    </radialGradient>
    <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#38bdf8" stop-opacity="0.8" />
      <stop offset="50%" stop-color="#d946ef" stop-opacity="0.9" />
      <stop offset="100%" stop-color="#818cf8" stop-opacity="0.8" />
    </linearGradient>
    <filter id="blurFilter" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="35" />
    </filter>
  </defs>

  <rect width="800" height="800" fill="url(#bg)" />

  <circle cx="400" cy="380" r="280" fill="url(#glow)" filter="url(#blurFilter)" />
  <circle cx="250" cy="280" r="140" fill="#38bdf8" opacity="0.12" filter="url(#blurFilter)" />
  <circle cx="550" cy="480" r="160" fill="#d946ef" opacity="0.15" filter="url(#blurFilter)" />

  <g opacity="0.15" stroke="#ffffff" stroke-width="0.8">
    <line x1="100" y1="0" x2="100" y2="800" stroke-dasharray="4,8" />
    <line x1="700" y1="0" x2="700" y2="800" stroke-dasharray="4,8" />
    <line x1="0" y1="100" x2="800" y2="100" stroke-dasharray="4,8" />
    <line x1="0" y1="700" x2="800" y2="700" stroke-dasharray="4,8" />
  </g>

  <g transform="translate(400, 380)">
    <circle r="190" fill="none" stroke="url(#lineGrad)" stroke-width="2.5" opacity="0.65" stroke-dasharray="8 6 24 6" />
    <circle r="150" fill="none" stroke="#38bdf8" stroke-width="1.2" opacity="0.4" />
    <circle r="105" fill="none" stroke="#d946ef" stroke-width="1.8" opacity="0.5" stroke-dasharray="4 8" />
    <polygon points="0,-75 65,37 -65,37" fill="none" stroke="url(#lineGrad)" stroke-width="2" opacity="0.8" />
    <polygon points="0,75 -65,-37 65,-37" fill="none" stroke="#38bdf8" stroke-width="1.2" opacity="0.5" />
    <circle r="14" fill="#ffffff" opacity="0.9" />
  </g>

  <text x="60" y="85" font-family="'JetBrains Mono', monospace, sans-serif" font-size="14" fill="#94a3b8" letter-spacing="4" font-weight="600">NARVENT // OFFICIAL ARCHIVE</text>
  <text x="740" y="85" text-anchor="end" font-family="'JetBrains Mono', monospace, sans-serif" font-size="14" fill="#38bdf8" letter-spacing="2" font-weight="700">${(type || 'SINGLE').toUpperCase()} [${year}]</text>

  <text x="60" y="680" font-family="'Space Grotesk', sans-serif" font-size="44" font-weight="800" fill="#ffffff" letter-spacing="-1">${title.toUpperCase()}</text>
  <text x="60" y="725" font-family="'JetBrains Mono', monospace, sans-serif" font-size="16" font-weight="600" fill="#c084fc" letter-spacing="3">${artist.toUpperCase()}</text>
  <text x="740" y="725" text-anchor="end" font-family="'JetBrains Mono', monospace, sans-serif" font-size="12" fill="#64748b" letter-spacing="2">VOLUME100 // 48.1KHZ</text>
</svg>`;

  fs.writeFileSync(destPath, svg);
}

async function main() {
  const fileContent = fs.readFileSync(RELEASES_PATH, 'utf8');
  
  // Extract all releases
  const releaseRegex = /id:\s*'([^']+)',\s*title:\s*'([^']+)',\s*artist:\s*'([^']+)'(?:[\s\S]*?)year:\s*(\d+)(?:[\s\S]*?)coverGradient:\s*\[([^\]]+)\]/g;
  
  let match;
  const releases = [];
  while ((match = releaseRegex.exec(fileContent)) !== null) {
    releases.push({
      id: match[1],
      title: match[2],
      artist: match[3],
      year: match[4],
      colors: match[5].split(',').map(s => s.trim().replace(/['"]/g, ''))
    });
  }

  console.log(`Processing ${releases.length} releases...`);

  let realDownloaded = 0;
  let customCreated = 0;

  for (const rel of releases) {
    const jpgPath = path.join(COVERS_DIR, `${rel.id}.jpg`);
    const svgPath = path.join(COVERS_DIR, `${rel.id}.svg`);

    // Build specific search queries for iTunes
    const searchQueries = [
      `Narvent ${rel.title}`,
      `${rel.artist} ${rel.title}`,
      `VØJ Narvent ${rel.title}`,
      rel.title
    ];

    let foundArtUrl = null;

    for (const q of searchQueries) {
      const results = await searchItunes(q);
      const matchItem = results.find(item => {
        const itemArtist = (item.artistName || '').toLowerCase();
        const itemName = (item.collectionName || item.trackName || '').toLowerCase();
        const targetTitle = rel.title.toLowerCase();

        const artistMatch = itemArtist.includes('narvent') || itemArtist.includes('vøj') || itemArtist.includes('voj');
        const titleMatch = itemName.includes(targetTitle) || targetTitle.includes(itemName.split(' - ')[0]);

        return artistMatch && titleMatch;
      });

      if (matchItem && (matchItem.artworkUrl100 || matchItem.artworkUrl60)) {
        foundArtUrl = matchItem.artworkUrl100 || matchItem.artworkUrl60;
        break;
      }
    }

    if (foundArtUrl) {
      const success = await downloadImage(foundArtUrl, jpgPath);
      if (success) {
        console.log(`[SUCCESS REAL COVER] ${rel.title} -> ${rel.id}.jpg`);
        realDownloaded++;
        continue;
      }
    }

    // Fallback: create bespoke vector artwork
    generateAestheticSvgCover(
      rel.title,
      rel.artist,
      rel.year,
      rel.id.includes('album') ? 'album' : rel.id.includes('ep') ? 'ep' : 'single',
      rel.colors[0] || '#050510',
      rel.colors[1] || '#110a26',
      rel.colors[2] || '#2c1254',
      svgPath
    );
    console.log(`[BESPOKE VECTOR COVER] ${rel.title} -> ${rel.id}.svg`);
    customCreated++;
  }

  console.log(`\n========================================`);
  console.log(`Complete! Real Covers: ${realDownloaded}, Bespoke Vector Covers: ${customCreated}`);
  console.log(`========================================`);
}

main();
