import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'fs'

const profile = JSON.parse(fs.readFileSync('./data/profile.json', 'utf-8'))
const listings = JSON.parse(fs.readFileSync('./data/listings.json', 'utf-8'))

const ogImage = profile.photo || ''
const siteTitle = `${profile.name} — ${profile.title} in Cebu`
const siteDesc = profile.tagline
const siteUrl = 'https://glenda-timola.vercel.app'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    {
      name: 'html-transform',
      transformIndexHtml(html) {
        return html
          .replace(
            '</head>',
            `
  <link rel="canonical" href="${siteUrl}" />
  <meta name="description" content="${siteDesc}" />
  <meta name="keywords" content="real estate, Cebu, condo, property, Glenda Timola, Philippines, buy condo Cebu" />
  <meta property="og:title" content="${siteTitle}" />
  <meta property="og:description" content="${siteDesc}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="1200" />
  <meta property="og:url" content="${siteUrl}" />
  <meta property="og:type" content="website" />
  <meta property="og:locale" content="en_PH" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="${siteTitle}" />
  <meta name="twitter:description" content="${siteDesc}" />
  <meta name="twitter:image" content="${ogImage}" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "${profile.name}",
    "description": "${siteDesc}",
    "url": "${siteUrl}",
    "image": "${ogImage}",
    "areaServed": "Cebu, Philippines",
    "priceRange": "$$"
  }
  </script>
</head>`
          )
      },
    },
    {
      name: 'sitemap',
      closeBundle() {
        const listingUrls = listings
          .map((l) => `  <url><loc>${siteUrl}/listing/${l.id}</loc><priority>0.8</priority></url>`)
          .join('\n')

        const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>${siteUrl}/</loc><priority>1.0</priority></url>
  <url><loc>${siteUrl}/listings</loc><priority>0.9</priority></url>
${listingUrls}
</urlset>`

        fs.mkdirSync('dist', { recursive: true })
        fs.writeFileSync('dist/sitemap.xml', sitemap)
      },
    },
  ],
})
