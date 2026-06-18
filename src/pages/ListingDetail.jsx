import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { marked } from 'marked'
import SEO from '../components/SEO'
import listings from '../../data/listings.json'

export default function ListingDetail() {
  const { id } = useParams()
  const listing = listings.find(l => l.id === Number(id))

  if (!listing) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <h2 className="font-display text-3xl font-bold text-navy mb-4">Listing Not Found</h2>
          <Link to="/" className="text-gold hover:text-gold/80 transition-colors">Back to Home</Link>
        </div>
      </div>
    )
  }

  const [currentImage, setCurrentImage] = useState(0)
  const [fullscreen, setFullscreen] = useState(null)
  const [imageLoading, setImageLoading] = useState(true)
  const [fsLoading, setFsLoading] = useState(true)
  const hasImages = listing.images && listing.images.length > 0

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Apartment',
    name: listing.title,
    description: `${listing.beds > 0 ? listing.beds + ' bedroom ' : ''}${listing.baths > 0 ? listing.baths + ' bathroom ' : ''}condo in ${listing.address} — ${listing.price}`,
    image: listing.thumbnail || (listing.images ? listing.images[0] : ''),
    offers: {
      '@type': 'Offer',
      price: listing.price.replace(/[^0-9,]/g, '').trim(),
      priceCurrency: 'PHP',
      availability: 'https://schema.org/InStock',
    },
    address: { '@type': 'PostalAddress', addressLocality: listing.address },
    floorSize: listing.sqft > 0 ? { '@type': 'QuantitativeValue', value: listing.sqft, unitCode: 'MTK' } : undefined,
    numberOfBedrooms: listing.beds || undefined,
    numberOfBathroomsTotal: listing.baths || undefined,
  }

  const specs = [listing.beds > 0 ? `${listing.beds} Bed` : '', listing.baths > 0 ? `${listing.baths} Bath` : ''].filter(Boolean).join(', ')
  const listingTitle = `${listing.title} — ${listing.address}${specs ? ' | ' + specs : ''}`
  const listingDesc = `${listing.beds > 0 ? listing.beds + '-bedroom ' : ''}${listing.baths > 0 ? listing.baths + '-bathroom ' : ''}condo for ${listing.status.toLowerCase()} in ${listing.address}. ${listing.price}. Contact Glenda Timola.`

  useEffect(() => {
    let cancelled = false
    setImageLoading(true)
    const img = new Image()
    img.onload = () => { if (!cancelled) setImageLoading(false) }
    img.onerror = () => { if (!cancelled) setImageLoading(false) }
    img.src = listing.images[currentImage]
    if (img.complete) setImageLoading(false)
    return () => { cancelled = true }
  }, [currentImage])

  useEffect(() => {
    if (fullscreen === null) return
    let cancelled = false
    setFsLoading(true)
    const img = new Image()
    img.onload = () => { if (!cancelled) setFsLoading(false) }
    img.onerror = () => { if (!cancelled) setFsLoading(false) }
    img.src = listing.images[fullscreen]
    if (img.complete) setFsLoading(false)
    return () => { cancelled = true }
  }, [fullscreen])

  const openFullscreen = (i) => setFullscreen(i ?? currentImage)
  const closeFullscreen = () => setFullscreen(null)
  const prevFullscreen = () => setFullscreen((fullscreen - 1 + listing.images.length) % listing.images.length)
  const nextFullscreen = () => setFullscreen((fullscreen + 1) % listing.images.length)

  useEffect(() => {
    if (fullscreen === null) return
    const handler = (e) => {
      if (e.key === 'Escape') closeFullscreen()
      if (e.key === 'ArrowLeft') prevFullscreen()
      if (e.key === 'ArrowRight') nextFullscreen()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [fullscreen])

  return (
    <div className="min-h-screen pt-16 bg-white">
      <SEO
        title={listingTitle}
        description={listingDesc}
        image={listing.thumbnail || (listing.images ? listing.images[0] : '')}
        path={`/listing/${listing.id}`}
        type="website"
        jsonLd={jsonLd}
      />

      {/* 🖥️ DESKTOP — original layout */}
      <div className="hidden lg:block max-w-6xl mx-auto px-6 py-12">
        <nav className="flex items-center gap-2 text-sm text-taupe mb-4">
          <Link to="/" className="hover:text-navy transition-colors">Home</Link>
          <span>/</span>
          <Link to="/listings" className="hover:text-navy transition-colors">Listings</Link>
          <span>/</span>
          <span className="text-navy font-medium truncate max-w-[300px]">{listing.title}</span>
        </nav>
        <Link to="/#listings" className="inline-flex items-center gap-2 text-taupe hover:text-navy transition-colors mb-8 text-sm uppercase tracking-wide">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Listings
        </Link>

        {hasImages ? (
          <div className="relative rounded-2xl overflow-hidden bg-[#1a1a1a] mb-10 aspect-[16/9] flex items-center justify-center">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
              </div>
            )}
            <img
              src={listing.images[currentImage]}
              alt={`${listing.title} — photo ${currentImage + 1} of ${listing.images.length}`}
              className={`w-full h-full object-contain cursor-pointer transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
              onClick={() => openFullscreen(currentImage)}
              onLoad={() => setImageLoading(false)}
            />
            {listing.images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImage((prev) => (prev - 1 + listing.images.length) % listing.images.length)}
                  disabled={imageLoading}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-navy p-2 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Previous image"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentImage((prev) => (prev + 1) % listing.images.length)}
                  disabled={imageLoading}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-navy p-2 rounded-full transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Next image"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {listing.images.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setCurrentImage(i)}
                      className={`w-2 h-2 rounded-full transition-all ${i === currentImage ? 'bg-gold w-6' : 'bg-white/70'}`}
                    />
                  ))}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="aspect-[16/9] bg-cream rounded-2xl flex items-center justify-center mb-10">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-taupe/30">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-10">
          <div className="lg:col-span-2">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h1 className="font-display text-3xl md:text-4xl font-bold text-navy mb-2">{listing.title}</h1>
                <p className="text-taupe">{listing.address}</p>
              </div>
              <span className="bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide whitespace-nowrap">
                {listing.status}
              </span>
            </div>

            {(listing.beds > 0 || listing.baths > 0 || listing.sqft > 0) && (
              <div className="flex items-center gap-6 py-6 border-y border-cream mb-8">
                {listing.beds > 0 && (
                  <div className="text-center">
                    <p className="font-display text-2xl font-bold text-navy">{listing.beds}</p>
                    <p className="text-taupe text-xs uppercase tracking-wide">Beds</p>
                  </div>
                )}
                {listing.baths > 0 && (
                  <div className="text-center">
                    <p className="font-display text-2xl font-bold text-navy">{listing.baths}</p>
                    <p className="text-taupe text-xs uppercase tracking-wide">Baths</p>
                  </div>
                )}
                {listing.sqft > 0 && (
                  <div className="text-center">
                    <p className="font-display text-2xl font-bold text-navy">{listing.sqft}</p>
                    <p className="text-taupe text-xs uppercase tracking-wide">Sq m</p>
                  </div>
                )}
              </div>
            )}

            <div
              className="text-taupe text-sm leading-relaxed [&_strong]:text-charcoal [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_p]:mb-3"
              dangerouslySetInnerHTML={{ __html: marked(listing.caption) }}
            />
          </div>

          <div className="lg:col-span-1">
            <div className="bg-cream rounded-xl p-6 sticky top-24">
              <p className="text-taupe text-xs uppercase tracking-wide mb-1">Price</p>
              <p className="font-display text-3xl font-bold text-gold mb-6">{listing.price}</p>
              <a
                href={`tel:${listing.contactPhone || ''}`}
                className="block w-full bg-navy text-white text-center py-3 rounded-lg hover:bg-navy/90 transition-all duration-300 text-sm font-semibold uppercase tracking-wide mb-3"
              >
                Inquire Now
              </a>
              <a
                href={`mailto:${listing.contactEmail || ''}`}
                className="block w-full border border-navy/20 text-navy text-center py-3 rounded-lg hover:bg-navy/5 transition-all duration-300 text-sm font-semibold uppercase tracking-wide"
              >
                Send Email
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* 📱 MOBILE */}
      <div className="lg:hidden px-4 pt-4 space-y-5">

        <nav className="flex items-center gap-1.5 text-[11px] text-taupe mb-1">
          <Link to="/" className="hover:text-navy transition-colors">Home</Link>
          <span>/</span>
          <span className="text-navy truncate max-w-[200px]">{listing.title}</span>
        </nav>
        <Link to="/#listings" className="inline-flex items-center gap-1.5 text-taupe hover:text-navy transition-colors text-xs uppercase tracking-wide">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back
        </Link>

        {hasImages ? (
          <div className="relative rounded-xl overflow-hidden bg-[#1a1a1a] flex items-center justify-center aspect-[4/3]">
            {imageLoading && (
              <div className="absolute inset-0 flex items-center justify-center z-10">
                <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
              </div>
            )}
            <img
              src={listing.images[currentImage]}
              alt={`${listing.title} — photo ${currentImage + 1} of ${listing.images.length}`}
              className={`w-full h-full object-contain cursor-pointer transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
              onClick={() => openFullscreen(currentImage)}
              onLoad={() => setImageLoading(false)}
            />
            {listing.images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImage((prev) => (prev - 1 + listing.images.length) % listing.images.length)}
                  disabled={imageLoading}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/85 text-navy p-2 rounded-full shadow disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Previous image"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentImage((prev) => (prev + 1) % listing.images.length)}
                  disabled={imageLoading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/85 text-navy p-2 rounded-full shadow disabled:opacity-40 disabled:cursor-not-allowed"
                  aria-label="Next image"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </button>
                <div className="absolute bottom-2 right-2 bg-black/50 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  {currentImage + 1}/{listing.images.length}
                </div>
              </>
            )}
          </div>
        ) : (
          <div className="aspect-[4/3] bg-cream rounded-xl flex items-center justify-center">
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-taupe/30">
              <rect x="3" y="3" width="18" height="18" rx="2" />
              <circle cx="8.5" cy="8.5" r="1.5" />
              <path d="M21 15l-5-5L5 21" />
            </svg>
          </div>
        )}

        <span className="inline-block bg-gold/15 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider text-navy/70">
          {listing.status}
        </span>

        <div>
          <h1 className="font-display text-xl font-bold text-navy mb-1">{listing.title}</h1>
          <p className="font-display text-lg font-bold text-gold">{listing.price}</p>
          <p className="text-taupe text-xs mt-1.5 flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            {listing.address}
          </p>
        </div>

        {(listing.beds > 0 || listing.baths > 0 || listing.sqft > 0) && (
          <div className="flex items-center gap-6 py-3 border-t border-b border-cream">
            {listing.beds > 0 && (
              <div className="text-center">
                <p className="font-display text-xl font-bold text-navy">{listing.beds}</p>
                <p className="text-taupe text-[10px] uppercase tracking-wider">Beds</p>
              </div>
            )}
            {listing.baths > 0 && (
              <div className="text-center">
                <p className="font-display text-xl font-bold text-navy">{listing.baths}</p>
                <p className="text-taupe text-[10px] uppercase tracking-wider">Baths</p>
              </div>
            )}
            {listing.sqft > 0 && (
              <div className="text-center">
                <p className="font-display text-xl font-bold text-navy">{listing.sqft}</p>
                <p className="text-taupe text-[10px] uppercase tracking-wider">Sq m</p>
              </div>
            )}
          </div>
        )}

        <div
          className="text-taupe text-sm leading-relaxed [&_strong]:text-charcoal [&_ul]:list-disc [&_ul]:pl-5 [&_li]:mb-1 [&_p]:mb-3"
          dangerouslySetInnerHTML={{ __html: marked(listing.caption) }}
        />

        <div className="flex gap-3 pb-6">
          <a
            href={`tel:${listing.contactPhone || ''}`}
            className="flex-1 bg-navy text-white text-center py-3 rounded-xl hover:bg-navy/90 transition-all text-sm font-semibold uppercase tracking-wide"
          >
            Inquire Now
          </a>
          <a
            href={`mailto:${listing.contactEmail || ''}`}
            className="flex-1 border border-navy/20 text-navy text-center py-3 rounded-xl hover:bg-navy/5 transition-all text-sm font-semibold uppercase tracking-wide"
          >
            Email
          </a>
        </div>
      </div>

      {fullscreen !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
          onClick={closeFullscreen}
        >
          <button
            onClick={(e) => { e.stopPropagation(); closeFullscreen() }}
            className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10"
            aria-label="Close"
          >
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M18 6L6 18M6 6l12 12" />
            </svg>
          </button>

          {listing.images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevFullscreen() }}
                disabled={fsLoading}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 z-10 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Previous"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextFullscreen() }}
                disabled={fsLoading}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 z-10 disabled:opacity-40 disabled:cursor-not-allowed"
                aria-label="Next"
              >
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium z-10">
                {fullscreen + 1} / {listing.images.length}
              </div>
            </>
          )}

          {fsLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
            </div>
          )}
          <img
            src={listing.images[fullscreen]}
            alt={`${listing.title} — fullscreen photo ${fullscreen + 1} of ${listing.images.length}`}
            className={`max-w-full max-h-full object-contain p-4 transition-opacity duration-300 ${fsLoading ? 'opacity-0' : 'opacity-100'}`}
            onClick={(e) => e.stopPropagation()}
            onLoad={() => setFsLoading(false)}
          />
        </div>
      )}
    </div>
  )
}
