import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
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
  const hasImages = listing.images && listing.images.length > 0

  return (
    <div className="min-h-screen pt-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <Link to="/#listings" className="inline-flex items-center gap-2 text-taupe hover:text-navy transition-colors mb-8 text-sm uppercase tracking-wide">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M19 12H5M12 19l-7-7 7-7" />
          </svg>
          Back to Listings
        </Link>

        {hasImages ? (
          <div className="relative rounded-2xl overflow-hidden bg-cream mb-10 aspect-[16/9]">
            <img
              src={listing.images[currentImage]}
              alt={listing.title}
              className="w-full h-full object-cover"
            />
            {listing.images.length > 1 && (
              <>
                <button
                  onClick={() => setCurrentImage((prev) => (prev - 1 + listing.images.length) % listing.images.length)}
                  className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-navy p-2 rounded-full transition-all"
                  aria-label="Previous image"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </button>
                <button
                  onClick={() => setCurrentImage((prev) => (prev + 1) % listing.images.length)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-navy p-2 rounded-full transition-all"
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

            <div className="flex items-center gap-6 py-6 border-y border-cream mb-8">
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-navy">{listing.beds}</p>
                <p className="text-taupe text-xs uppercase tracking-wide">Beds</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-navy">{listing.baths}</p>
                <p className="text-taupe text-xs uppercase tracking-wide">Baths</p>
              </div>
              <div className="text-center">
                <p className="font-display text-2xl font-bold text-navy">{listing.sqft}</p>
                <p className="text-taupe text-xs uppercase tracking-wide">Sq m</p>
              </div>
            </div>

            <div className="prose prose-sm max-w-none text-taupe leading-relaxed">
              <p>{listing.caption}</p>
            </div>
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
    </div>
  )
}
