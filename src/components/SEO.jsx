import { Helmet } from 'react-helmet-async'
import profile from '../../data/profile.json'

const siteUrl = 'https://glenda-timola.vercel.app'

export default function SEO({ title, description, image, path, type = 'website', jsonLd }) {
  const fullTitle = title ? `${title} | ${profile.name}` : `${profile.name} — ${profile.title} in Cebu`
  const desc = description || profile.tagline
  const img = image || profile.photo
  const url = `${siteUrl}${path || ''}`

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
      <link rel="canonical" href={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={img} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={desc} />
      <meta name="twitter:image" content={img} />
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  )
}
