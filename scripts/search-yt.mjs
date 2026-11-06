async function searchYT(query) {
  try {
    const url = 'https://www.youtube.com/results?search_query=' + encodeURIComponent(query);
    const res = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
    });
    const html = await res.text();
    const match = html.match(/\/watch\?v=([a-zA-Z0-9_-]{11})/);
    if (match) {
      return match[1];
    }
  } catch (e) {}
  return null;
}

async function main() {
  const list = [
    'Narvent Ascend',
    'Narvent In Our Minds',
    'Narvent HEAR ME',
    'Narvent Obliterate',
    'Narvent Euphoria',
    'Narvent Recall',
    'Narvent Ocean Blue'
  ];

  for (const item of list) {
    const vid = await searchYT(item);
    console.log(item, '-> Video ID:', vid, vid ? `https://i.ytimg.com/vi/${vid}/maxresdefault.jpg` : '');
  }
}

main();
