import { Link } from 'react-router-dom'
import sections from '../../data/sections.json'
import listings from '../../data/listings.json'

export default function FeaturedListings() {
  return (
    <section id="listings" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 scroll-reveal">
        <div className="flex items-end justify-between mb-12">
          <div>
            <p className="text-gold font-display text-sm tracking-[0.3em] uppercase mb-3">Properties</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy">Featured Listings</h2>
            <div className="w-16 h-0.5 bg-gold mt-4" />
          </div>  </div>

        {listings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-taupe text-lg">No listings yet. Check back soon!</p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings.slice(0, 3).map((listing) => (
                <Link
                  key={listing.id}
                  to={`/listing/${listing.id}`}
                  className="group rounded-xl overflow-hidden bg-white border border-cream hover:shadow-[0_8px_24px_rgba(27,42,74,0.12)] transition-all duration-300 scroll-reveal"
                >
                  <div className="aspect-[4/3] bg-cream relative overflow-hidden">
                    {listing.thumbnail ? (
                      <img
                        src={listing.thumbnail}
                        alt={listing.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-taupe/30">
                          <rect x="3" y="3" width="18" height="18" rx="2" />
                          <circle cx="8.5" cy="8.5" r="1.5" />
                          <path d="M21 15l-5-5L5 21" />
                        </svg>
                      </div>
                    )}
                    <div className="absolute top-3 left-3">
                      <span className="bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                        {listing.status}
                      </span>
                    </div>
                  </div>
                    <div className="p-5">
                      <h3 className="font-display font-bold text-lg text-navy mb-1">{listing.title}</h3>
                      <p className="font-display text-xl font-bold text-gold mb-2">{listing.price}</p>
                      <p className="text-taupe text-sm mb-3">{listing.address}</p>
                      <div className="flex items-center gap-4 text-sm text-taupe">
                      {sections.listingSpecs.enabled && listing.beds > 0 && (
                        <span className="flex items-center gap-1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" />
                          </svg>
                          {listing.beds} Beds
                        </span>
                      )}
                      {sections.listingSpecs.enabled && listing.baths > 0 && (
                        <span className="flex items-center gap-1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 7v11a2 2 0 002 2h14a2 2 0 002-2V7M3 7a2 2 0 012-2h14a2 2 0 012 2M3 7h18" />
                          </svg>
                          {listing.baths} Baths
                        </span>
                      )}
                      {sections.listingSpecs.enabled && listing.sqft > 0 && (
                        <span className="flex items-center gap-1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                          </svg>
                          {listing.sqft} m&#178;
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {listings.length > 3 && (
              <div className="text-center mt-10 scroll-reveal">
                <Link
                  to="/listings"
                  className="inline-flex items-center gap-2 border-2 border-navy text-navy font-semibold px-8 py-3 rounded-lg hover:bg-navy hover:text-white transition-all duration-300 text-sm tracking-wide uppercase"
                >
                  See All Properties
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}
