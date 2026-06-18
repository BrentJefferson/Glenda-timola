import { useState } from 'react'
import { Link } from 'react-router-dom'
import highlights from '../../data/highlights.json'

export default function Highlights() {
  const [expanded, setExpanded] = useState({})
  const featured = highlights.filter((h) => h.featured)

  if (featured.length === 0) return null

  return (
    <section id="highlights" className="py-24 bg-navy relative overflow-hidden">
      <div className="absolute inset-0 opacity-[0.03]">
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-gold blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 rounded-full bg-gold blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto px-6 relative scroll-reveal">
        <div className="text-center mb-16">
          <p className="text-gold font-display text-sm tracking-[0.3em] uppercase mb-3">Milestones</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-white">Highlights & Achievements</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featured.map((item, i) => {
            const isExpanded = expanded[item.id]
            const isLong = item.description.length > 100

            return (
              <div
                key={item.id}
                className="group rounded-xl overflow-hidden bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 scroll-reveal cursor-pointer"
                style={{ transitionDelay: `${i * 100}ms` }}
                onClick={() => { if (isLong) setExpanded((prev) => ({ ...prev, [item.id]: !isExpanded })) }}
              >
                <div className="aspect-[4/3] relative overflow-hidden">
                  {item.images.length > 0 ? (
                    <img
                      src={item.images[0]}
                      alt={item.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-white/20">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <circle cx="8.5" cy="8.5" r="1.5" />
                        <path d="M21 15l-5-5L5 21" />
                      </svg>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <span className="inline-block bg-gold/20 text-gold text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider mb-3 font-display">{item.date}</span>
                  <h3 className="font-display font-bold text-lg text-white mb-2 leading-snug">{item.title}</h3>
                  <p className={`text-white/60 text-sm leading-relaxed mb-2 ${isExpanded ? '' : 'line-clamp-2'}`}>{item.description}</p>
                  {isLong && (
                    <button
                      onClick={(e) => { e.stopPropagation(); setExpanded((prev) => ({ ...prev, [item.id]: !isExpanded })) }}
                      className="text-gold/70 text-xs hover:text-gold transition-colors mb-4 font-semibold tracking-wide uppercase"
                    >
                      {isExpanded ? 'See Less' : 'See More'}
                    </button>
                  )}

                  {item.references.length > 0 && (
                    <div className="flex flex-wrap gap-3">
                      {item.references.map((ref, idx) => (
                        <a
                          key={idx}
                          href={ref.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-gold text-xs hover:text-white transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M10 13a5 5 0 007.54.54l3-3a5 5 0 00-7.07-7.07l-1.72 1.71" />
                            <path d="M14 11a5 5 0 00-7.54-.54l-3 3a5 5 0 007.07 7.07l1.71-1.71" />
                          </svg>
                          {ref.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div className="text-center mt-12 scroll-reveal">
          <Link
            to="/highlights"
            className="inline-flex items-center gap-2 border-2 border-gold text-gold font-semibold px-8 py-3 rounded-lg hover:bg-gold hover:text-navy transition-all duration-300 text-sm tracking-wide uppercase"
          >
            See All Achievements
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  )
}
