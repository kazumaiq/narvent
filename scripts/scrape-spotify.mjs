import fs from 'fs';

async function parseSpotify() {
  const res = await fetch('https://open.spotify.com/artist/3QZtwiUoyaXbl1JssMPIQ7', {
    headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
  });
  const html = await res.text();
  fs.writeFileSync('spotify-artist.html', html);
  console.log('Saved spotify-artist.html, size:', html.length);

  // Match all json structures
  const jsonMatches = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  for (const jm of jsonMatches) {
    try {
      const data = JSON.parse(jm[1]);
      console.log('LD+JSON:', JSON.stringify(data, null, 2).slice(0, 500));
    } catch (e) {}
  }

  // Find any album links and names
  const regex = /href="\/album\/([a-zA-Z0-9]+)"[^>]*>[\s\S]*?<img[^>]*src="([^"]+)"[\s\S]*?alt="([^"]*)"/g;
  let m;
  while ((m = regex.exec(html)) !== null) {
    console.log('Album:', m[3], '| ID:', m[1], '| Img:', m[2]);
  }
}

parseSpotify();
