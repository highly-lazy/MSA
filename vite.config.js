import { mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join } from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import { SITE_URL } from './src/data/company.js'
import { PAGES } from './src/data/pages.js'

const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')

// Writes dist/<page>/index.html with that page's title, description and canonical,
// so search engines and link previews do not depend on JavaScript.
function pageHtml() {
  let outDir = 'dist'
  return {
    name: 'page-html',
    apply: 'build',
    configResolved(config) {
      outDir = config.build.outDir
    },
    closeBundle() {
      const base = readFileSync(join(outDir, 'index.html'), 'utf8')
      for (const [path, { title, description }] of Object.entries(PAGES)) {
        if (path === '/') continue
        const t = esc(title)
        const d = esc(description)
        const url = SITE_URL + path
        const html = base
          .replace(/<title>.*?<\/title>/, () => `<title>${t}</title>`)
          .replace(/(<meta (?:name|property)="(?:og|twitter):title" content=")[^"]*/g, (_, a) => a + t)
          .replace(/(<meta (?:name|property)="(?:description|og:description|twitter:description)" content=")[^"]*/g, (_, a) => a + d)
          .replace(/(<link rel="canonical" href=")[^"]*/, (_, a) => a + url)
          .replace(/(<meta property="og:url" content=")[^"]*/, (_, a) => a + url)
          .replace(/\s*<link rel="preload" as="image"[^>]*>/, '')
        mkdirSync(join(outDir, path), { recursive: true })
        writeFileSync(join(outDir, path, 'index.html'), html)
      }
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), pageHtml()],
})
