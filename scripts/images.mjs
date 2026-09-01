// One-off asset pipeline: convert project screenshots to WebP, render the
// generated AI-chatbot cover, and render the Open Graph image.
// Run with: node scripts/images.mjs
import sharp from 'sharp'
import { readdir, unlink } from 'node:fs/promises'
import path from 'node:path'

const projectsDir = path.resolve('public/projects')

// 1. JPG / JPEG / PNG -> WebP (then remove the source). Capped to 1000px wide
//    so the cover stays crisp on retina cards without bloating the bundle.
for (const file of await readdir(projectsDir)) {
  const m = file.match(/\.(jpg|jpeg|png)$/i)
  if (!m) continue
  const src = path.join(projectsDir, file)
  const out = path.join(projectsDir, file.replace(/\.(jpg|jpeg|png)$/i, '.webp'))
  await sharp(src)
    .resize({ width: 1000, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(out)
  await unlink(src)
  console.log(`webp: ${file} -> ${path.basename(out)}`)
}

// 2. Generated cover for the AI Customer-Support Chatbot (no live URL to shoot).
//    Matches the card's emerald -> teal -> cyan gradient.
const chatbot = `<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="400">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="#10b981"/>
      <stop offset="0.5" stop-color="#14b8a6"/>
      <stop offset="1" stop-color="#22d3ee"/>
    </linearGradient>
  </defs>
  <rect width="1000" height="400" fill="url(#g)"/>
  <circle cx="850" cy="70" r="180" fill="#ffffff" opacity="0.10"/>
  <circle cx="120" cy="360" r="150" fill="#ffffff" opacity="0.08"/>
  <!-- robot head -->
  <g transform="translate(500 200)">
    <rect x="-90" y="-70" width="180" height="150" rx="34" fill="#ffffff"/>
    <rect x="-4" y="-108" width="8" height="38" rx="4" fill="#ffffff"/>
    <circle cx="0" cy="-112" r="12" fill="#ffffff"/>
    <circle cx="-40" cy="-6" r="18" fill="#0f766e"/>
    <circle cx="40" cy="-6" r="18" fill="#0f766e"/>
    <circle cx="-34" cy="-11" r="6" fill="#ffffff"/>
    <circle cx="46" cy="-11" r="6" fill="#ffffff"/>
    <rect x="-46" y="34" width="92" height="14" rx="7" fill="#0f766e"/>
    <rect x="-118" y="-30" width="20" height="60" rx="10" fill="#ffffff"/>
    <rect x="98" y="-30" width="20" height="60" rx="10" fill="#ffffff"/>
  </g>
  <!-- chat bubbles -->
  <rect x="150" y="150" width="120" height="46" rx="23" fill="#ffffff" opacity="0.85"/>
  <rect x="730" y="210" width="120" height="46" rx="23" fill="#ffffff" opacity="0.7"/>
</svg>`
await sharp(Buffer.from(chatbot)).webp({ quality: 90 }).toFile(path.join(projectsDir, 'chatbot.webp'))
console.log('webp: chatbot.webp (generated)')

// 3. Open Graph image (1200x630)
const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#fafaf9"/>
  <circle cx="1080" cy="90" r="220" fill="#4f46e5" opacity="0.12"/>
  <circle cx="120" cy="560" r="260" fill="#f59e0b" opacity="0.12"/>
  <rect x="80" y="150" width="72" height="72" rx="18" fill="#111113"/>
  <text x="116" y="198" font-family="Arial, Helvetica, sans-serif" font-size="30" font-weight="700" fill="#ffffff" text-anchor="middle">KG</text>
  <text x="80" y="300" font-family="Arial, Helvetica, sans-serif" font-size="64" font-weight="700" fill="#111113">Kajalben Gondaliya</text>
  <text x="80" y="370" font-family="Arial, Helvetica, sans-serif" font-size="36" font-weight="600" fill="#4f46e5">Full-Stack Developer</text>
  <text x="80" y="440" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#6b6f76">Web &amp; mobile apps, APIs &amp; AI-powered solutions</text>
  <text x="80" y="484" font-family="Arial, Helvetica, sans-serif" font-size="26" fill="#6b6f76">7+ years - market-ready MVPs - Ilford, UK</text>
</svg>`
await sharp(Buffer.from(og)).png().toFile('public/og.png')
console.log('og: public/og.png')
