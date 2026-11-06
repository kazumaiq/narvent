import { chromium } from 'playwright';
import path from 'path';

const outDir = 'C:/Users/user/.gemini/antigravity/brain/3d8a7f1e-f016-4b09-ae3d-49c479a7c6e3/screenshots';

async function main() {
  const browser = await chromium.launch({
    executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });
  await page.waitForTimeout(2000);

  // Scroll to #latest
  await page.evaluate(() => document.getElementById('latest')?.scrollIntoView({ behavior: 'instant' }));
  await page.waitForTimeout(1000);

  // Take screenshot of #latest
  const latestEl = await page.$('#latest');
  if (latestEl) {
    await latestEl.screenshot({ path: path.join(outDir, 'latest_release_real_cover_proof.png') });
    console.log('Saved latest_release_real_cover_proof.png');
  }

  // Also full page screenshot at #latest
  await page.screenshot({ path: path.join(outDir, '02_desktop_latest_v3.png') });
  console.log('Updated 02_desktop_latest_v3.png');

  await browser.close();
  console.log('Capture finished!');
}

main();
