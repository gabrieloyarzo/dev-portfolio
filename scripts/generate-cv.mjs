// Generates public/Gabriel_Oyarzo_CV.pdf from the /cv page.
// Usage:  npm run cv
// Full:   npm run build:full

import { chromium } from 'playwright';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(__dirname, '..');
const PORT = 4322;
const CV_URL = `http://localhost:${PORT}/cv`;
const PDF_PATH = resolve(ROOT, 'public/Gabriel_Oyarzo_CV.pdf');

async function waitForServer(url, timeoutMs = 25_000) {
  const deadline = Date.now() + timeoutMs;
  while (Date.now() < deadline) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await new Promise((r) => setTimeout(r, 400));
  }
  throw new Error(`El servidor en ${url} no respondió a tiempo`);
}

const server = spawn('npx', ['astro', 'dev', '--port', String(PORT)], {
  cwd: ROOT,
  stdio: 'pipe',
  shell: true,
});

server.stderr.on('data', (d) => process.stderr.write(d));

try {
  console.log('⏳  Iniciando servidor...');
  await waitForServer(CV_URL);

  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto(CV_URL, { waitUntil: 'networkidle' });

  await page.pdf({
    path: PDF_PATH,
    format: 'A4',
    margin: { top: '14mm', bottom: '14mm', left: '15mm', right: '15mm' },
    printBackground: false,
  });

  await browser.close();
  console.log('✅  CV generado:', PDF_PATH);
} finally {
  server.kill('SIGTERM');
}
