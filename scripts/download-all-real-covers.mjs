import fs from 'fs';
import path from 'path';

const COVERS_DIR = 'public/covers';
const RELEASES_PATH = 'src/data/releases.ts';

// Download an image buffer and write to destination
async function downloadToFile(url, dest) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = await res.arrayBuffer();
    if (buffer.byteLength < 1000) throw new Error(`File too small: ${buffer.byteLength} bytes`);
    fs.writeFileSync(dest, Buffer.from(buffer));
    console.log(`[SUCCESS] Saved ${dest} (${Math.round(buffer.byteLength / 1024)} KB)`);
    return true;
  } catch (err) {
    console.error(`[ERROR] Failed to download ${url}:`, err.message);
    return false;
  }
}

async function main() {
  const specificUrls = {
    'recall-ep': 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b27349ec0a6615a0642a00453c79',
    'ocean-blue-ep': 'https://image-cdn-fa.spotifycdn.com/image/ab67616d0000b273f41147b7f62284bd9fa8ddca',
    'ascend-ep': 'https://i.ytimg.com/vi/_Mri6NX5uNs/maxresdefault.jpg',
    'in-our-minds-ep': 'https://i.ytimg.com/vi/UZnKyLcIfmQ/maxresdefault.jpg',
    'euphoria': 'https://i.ytimg.com/vi/LmcgmbRf5Ts/maxresdefault.jpg',
    'hear-me': 'https://i.ytimg.com/vi/GMaGokyeZ-A/maxresdefault.jpg',
    'obliterate': 'https://i.ytimg.com/vi/4kEQSaenhLE/maxresdefault.jpg',
    'no-dress': 'https://is1-ssl.mzstatic.com/image/thumb/Music221/v4/ec/ea/aa/eceaaa94-a565-f42b-2fe5-30bd98d23fc9/199538490145.jpg/1000x1000bb.jpg',
    'reboot-ep': 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273a4992aa37901b9fffb29afc5',
    'corsa-ep': 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b273a149595e7f2e13c8a91e6ff7',
    'lights-flash-ep': 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b2734707fdd80d026f7711d480c5',
    'genesis': 'https://image-cdn-ak.spotifycdn.com/image/ab67616d0000b2734a7ba6314f654d9f3c5b9f02',
  };

  for (const [id, url] of Object.entries(specificUrls)) {
    const dest = path.join(COVERS_DIR, `${id}.jpg`);
    await downloadToFile(url, dest);
  }

  // Delete all .svg fallback files from public/covers
  const allFiles = fs.readdirSync(COVERS_DIR);
  for (const f of allFiles) {
    if (f.endsWith('.svg')) {
      fs.unlinkSync(path.join(COVERS_DIR, f));
      console.log(`[REMOVED SVG] ${f}`);
    }
  }

  // Update src/data/releases.ts to strictly point to .jpg
  let content = fs.readFileSync(RELEASES_PATH, 'utf8');
  content = content.replace(/coverImage:\s*'\/covers\/([^']+)\.(?:svg|jpg)'/g, "coverImage: '/covers/$1.jpg'");
  fs.writeFileSync(RELEASES_PATH, content);
  console.log('Updated releases.ts strictly to .jpg covers!');

  // Verify all 31 releases have .jpg files
  const releaseIds = [...content.matchAll(/id:\s*'([^']+)'/g)].map(m => m[1]);
  let missing = 0;
  for (const id of releaseIds) {
    const p = path.join(COVERS_DIR, `${id}.jpg`);
    if (!fs.existsSync(p)) {
      console.warn(`[MISSING] No jpg found for ${id}!`);
      missing++;
    } else {
      const stats = fs.statSync(p);
      console.log(`[VERIFIED REAL JPG] ${id}.jpg -> ${Math.round(stats.size / 1024)} KB`);
    }
  }
  console.log(`\nVerification complete. Missing JPGs: ${missing} / ${releaseIds.length}`);
}

main();
