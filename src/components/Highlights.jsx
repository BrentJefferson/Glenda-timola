import { Link } from 'react-router-dom'
import highlights from '../../data/highlights.json'

const trophy = (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <path d="M6 9H4.5a2.5 2.5 0 010-5H6m12 5h1.5a2.5 2.5 0 000-5H18M6 9v2a6 6 0 0011.42 2.82M6 9h12m0 0v2a6 6 0 01-11.42 2.82" />
    <path d="M9 21h6m-3-5v5" />
  </svg>
)

const medal = (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
    <circle cx="12" cy="8" r="4" />
    <path d="M8.5 12.5L7 21l5-3 5 3-1.5-8.5" />
  </svg>
)

export default function Highlights() {
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

        <div className="grid md:grid-cols-3 gap-6">
          {featured.map((item, i) => (
            <div
              key={item.id}
              className="group relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden hover:bg-white/10 transition-all duration-500 scroll-reveal"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              {item.images.length > 0 && (
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={item.images[0]}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
              )}

              <div className="p-6">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-gold">{trophy}</span>
                  <span className="text-gold/80 text-xs tracking-[0.15em] uppercase font-display">{item.date}</span>
                </div>

                <h3 className="font-display font-bold text-lg text-white mb-2 leading-snug">{item.title}</h3>
                <p className="text-white/60 text-sm leading-relaxed">{item.description}</p>

                {item.references.length > 0 && (
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <a
                      href={item.references[0].url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-gold text-xs font-semibold tracking-wide uppercase hover:text-white transition-colors"
                    >
                      {medal}
                      View Post
                    </a>
                  </div>
                )}
              </div>
            </div>
          ))}
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
