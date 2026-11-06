const titles = ['Ascend', 'In Our Minds', 'Euphoria', 'HEAR ME', 'Obliterate', 'No Dress'];

async function searchWeb() {
  for (const t of titles) {
    try {
      const q = `site:open.spotify.com/album "Narvent" ${t}`;
      const res = await fetch('https://html.duckduckgo.com/html/?q=' + encodeURIComponent(q), {
        headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
      });
      const html = await res.text();
      const match = html.match(/open\.spotify\.com\/album\/([a-zA-Z0-9]+)/);
      if (match) {
        console.log(t, '-> Spotify Album ID:', match[1]);
        const oembed = await fetch('https://open.spotify.com/oembed?url=https://open.spotify.com/album/' + match[1]);
        const odata = await oembed.json();
        console.log('   Title:', odata.title, '| Thumbnail:', odata.thumbnail_url);
      } else {
        console.log(t, '-> Not found');
      }
    } catch(e) {
      console.log(t, 'Error:', e.message);
    }
  }
}

searchWeb();
