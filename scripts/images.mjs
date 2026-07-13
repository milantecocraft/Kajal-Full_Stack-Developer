// One-off asset pipeline: convert project screenshots to WebP and render
// the Open Graph image. Run with: node scripts/images.mjs
import sharp from 'sharp'
import { readdir, unlink } from 'node:fs/promises'
import path from 'node:path'

const projectsDir = path.resolve('public/projects')

// 1. JPG -> WebP (then remove the JPG)
for (const file of await readdir(projectsDir)) {
  if (!file.endsWith('.jpg')) continue
  const src = path.join(projectsDir, file)
  const out = path.join(projectsDir, file.replace(/\.jpg$/, '.webp'))
  await sharp(src).webp({ quality: 78 }).toFile(out)
  await unlink(src)
  console.log(`webp: ${file}`)
}

// 2. Open Graph image (1200x630)
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
