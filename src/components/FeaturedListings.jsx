import { Link } from 'react-router-dom'
import sections from '../../data/sections.json'
import listings from '../../data/listings.json'

export default function FeaturedListings() {
  return (
    <section id="listings" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 scroll-reveal">
        <div className="text-center mb-16">
          <p className="text-gold font-display text-sm tracking-[0.3em] uppercase mb-3">Properties</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy">Featured Listings</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
        </div>

        {listings.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-taupe text-lg">No listings yet. Check back soon!</p>
          </div>
        ) : (
          <>
            {/* 📱 Mobile: blog style */}
            <div className="lg:hidden max-w-4xl mx-auto space-y-14 md:space-y-16">
              {listings.slice(0, 3).map((listing) => (
                <article key={listing.id} className="border-b border-cream pb-10 md:pb-14 last:border-b-0 scroll-reveal">
                  <div className="md:flex md:gap-6 md:items-start">
                    {listing.thumbnail && (
                      <Link to={`/listing/${listing.id}`} className="block mb-4 md:mb-0 md:w-56 md:shrink-0 rounded-xl overflow-hidden bg-cream group/image">
                        <div className="relative aspect-[4/3]">
                          <img src={listing.thumbnail} alt={listing.title} className="w-full h-full object-cover group-hover/image:scale-[1.02] transition-transform duration-700" />
                          <div className="absolute inset-0 bg-black/0 group-hover/image:bg-black/10 transition-colors duration-300" />
                        </div>
                      </Link>
                    )}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-6 h-px bg-gold shrink-0 hidden sm:block" />
                        <span className="bg-gold/15 text-navy/70 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">{listing.status}</span>
                      </div>

                      <Link to={`/listing/${listing.id}`} className="group">
                        <h3 className="font-display font-bold text-2xl text-navy mb-1 leading-tight group-hover:text-gold transition-colors duration-200">{listing.title}</h3>
                        <p className="font-display text-xl font-bold text-gold mb-4">{listing.price}</p>
                      </Link>

                      <p className="text-taupe text-sm mb-3 flex items-center gap-1">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                          <circle cx="12" cy="10" r="3" />
                        </svg>
                        {listing.address}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-taupe">
                        {sections.listingSpecs.enabled && listing.beds > 0 && (
                          <span className="flex items-center gap-1">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                            {listing.beds} Beds
                          </span>
                        )}
                        {sections.listingSpecs.enabled && listing.baths > 0 && (
                          <span className="flex items-center gap-1">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v11a2 2 0 002 2h14a2 2 0 002-2V7M3 7a2 2 0 012-2h14a2 2 0 012 2M3 7h18" /></svg>
                            {listing.baths} Baths
                          </span>
                        )}
                        {sections.listingSpecs.enabled && listing.sqft > 0 && (
                          <span className="flex items-center gap-1">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                            {listing.sqft} m&#178;
                          </span>
                        )}
                      </div>

                      <div className="mt-5">
                        <Link to={`/listing/${listing.id}`} className="inline-flex items-center gap-1.5 text-navy/50 text-xs hover:text-gold transition-colors duration-200 font-semibold tracking-wide uppercase">
                          View Details
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </Link>
                      </div>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* 🖥️ Desktop: card grid */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-6">
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
                      <span className="bg-gold text-navy text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">{listing.status}</span>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-display font-bold text-lg text-navy mb-1">{listing.title}</h3>
                    <p className="font-display text-xl font-bold text-gold mb-2">{listing.price}</p>
                    <p className="text-taupe text-sm mb-3">{listing.address}</p>
                    <div className="flex items-center gap-4 text-sm text-taupe">
                      {sections.listingSpecs.enabled && listing.beds > 0 && (
                        <span className="flex items-center gap-1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /></svg>
                          {listing.beds} Beds
                        </span>
                      )}
                      {sections.listingSpecs.enabled && listing.baths > 0 && (
                        <span className="flex items-center gap-1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 7v11a2 2 0 002 2h14a2 2 0 002-2V7M3 7a2 2 0 012-2h14a2 2 0 012 2M3 7h18" /></svg>
                          {listing.baths} Baths
                        </span>
                      )}
                      {sections.listingSpecs.enabled && listing.sqft > 0 && (
                        <span className="flex items-center gap-1">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" /></svg>
                          {listing.sqft} m&#178;
                        </span>
                      )}
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {listings.length > 3 && (
              <div className="text-center mt-12 scroll-reveal">
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
