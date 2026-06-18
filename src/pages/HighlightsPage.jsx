import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import SEO from '../components/SEO'
import highlights from '../../data/highlights.json'

const star = (
  <svg className="w-3.5 h-3.5 md:w-[18px] md:h-[18px]" viewBox="0 0 24 24" fill="currentColor" stroke="none">
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
)

export default function HighlightsPage() {
  const [carouselIdx, setCarouselIdx] = useState({})
  const [carouselLoading, setCarouselLoading] = useState({})
  const [fullscreen, setFullscreen] = useState(null)
  const [fsItem, setFsItem] = useState(null)
  const [fsLoading, setFsLoading] = useState(true)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  const setCurrent = (id, idx) => {
    setCarouselLoading((prev) => ({ ...prev, [id]: true }))
    setCarouselIdx((prev) => ({ ...prev, [id]: idx }))
  }
  const prev = (item) => setCurrent(item.id, ((carouselIdx[item.id] || 0) - 1 + item.images.length) % item.images.length)
  const next = (item) => setCurrent(item.id, ((carouselIdx[item.id] || 0) + 1) % item.images.length)

  const onCarouselImgLoad = (id) => setCarouselLoading((prev) => ({ ...prev, [id]: false }))

  const openFullscreen = (item, index) => {
    setFsItem(item)
    setFullscreen(index)
  }
  const closeFullscreen = () => { setFullscreen(null); setFsItem(null) }
  const prevFs = () => setFullscreen((fullscreen - 1 + fsItem.images.length) % fsItem.images.length)
  const nextFs = () => setFullscreen((fullscreen + 1) % fsItem.images.length)

  useEffect(() => {
    if (fullscreen === null || !fsItem) return
    let cancelled = false
    setFsLoading(true)
    const img = new Image()
    img.onload = () => { if (!cancelled) setFsLoading(false) }
    img.onerror = () => { if (!cancelled) setFsLoading(false) }
    img.src = fsItem.images[fullscreen]
    if (img.complete) setFsLoading(false)
    return () => { cancelled = true }
  }, [fullscreen, fsItem])

  useEffect(() => {
    if (fullscreen === null) return
    const handler = (e) => {
      if (e.key === 'Escape') closeFullscreen()
      if (e.key === 'ArrowLeft' && fsItem.images.length > 1) prevFs()
      if (e.key === 'ArrowRight' && fsItem.images.length > 1) nextFs()
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [fullscreen, fsItem])

  const sorted = [...highlights].sort((a, b) => {
    const months = ['January','February','March','April','May','June','July','August','September','October','November','December']
    const extractDate = (str) => {
      const m = months.findIndex((m) => str.includes(m))
      const y = parseInt(str.match(/\d{4}/)?.[0] || '2026')
      const d = parseInt(str.match(/(\d+),/)?.[1] || '1')
      return new Date(y, m >= 0 ? m : 0, d)
    }
    return extractDate(b.date) - extractDate(a.date)
  })

  return (
    <>
      <SEO title="Highlights & Achievements" description="Milestones and achievements of Glenda Timola — top-performing real estate sales agent in Cebu." />

      <section className="pt-32 pb-24 bg-navy relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03]">
          <div className="absolute top-20 left-1/4 w-80 h-80 rounded-full bg-gold blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-64 h-64 rounded-full bg-gold blur-3xl" />
        </div>

        <div className="max-w-6xl mx-auto px-6 relative">
          <Link to="/" className="inline-flex items-center gap-2 text-taupe hover:text-gold transition-colors mb-8 text-sm uppercase tracking-wide">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
          <div className="text-center mb-6">
            <p className="text-gold font-display text-sm tracking-[0.3em] uppercase mb-3">Milestones</p>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-white">Highlights & Achievements</h1>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
            <p className="text-white/50 text-sm mt-4 max-w-xl mx-auto leading-relaxed">
              A timeline of key milestones in Glenda&rsquo;s real estate career.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6">
          <div className="relative">
            <div className="hidden md:block absolute left-[19px] top-0 bottom-0 w-0.5 bg-gradient-to-b from-gold via-gold/40 to-transparent" />

            <div className="space-y-12 md:space-y-16">
              {sorted.map((item, i) => {
                const currentIdx = carouselIdx[item.id] || 0
                const loading = carouselLoading[item.id] !== false && item.images.length > 0

                return (
                  <div key={item.id} className="relative pl-0 md:pl-14 scroll-reveal" style={{ transitionDelay: `${i * 100}ms` }}>
                    <div className="hidden md:flex absolute left-0 top-1 w-10 h-10 rounded-full bg-navy border-2 border-gold items-center justify-center text-gold shadow-[0_0_12px_rgba(201,168,76,0.2)]">
                      {star}
                    </div>

                    <article className="pb-10 md:pb-14 border-b border-cream last:border-b-0">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="w-6 h-px bg-gold shrink-0 hidden sm:block" />
                        <time className="text-gold text-xs font-display font-semibold tracking-[0.15em] uppercase">{item.date}</time>
                      </div>

                      <h2 className="font-display font-bold text-2xl md:text-3xl text-navy mb-5 leading-tight">{item.title}</h2>

                      {item.images.length > 0 && (
                        <div className="relative rounded-xl overflow-hidden bg-[#1a1a1a] mb-5 aspect-[16/9] flex items-center justify-center">
                          {loading && (
                            <div className="absolute inset-0 flex items-center justify-center z-10">
                              <div className="w-8 h-8 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
                            </div>
                          )}
                          <img
                            src={item.images[currentIdx]}
                            alt={`${item.title} — photo ${currentIdx + 1} of ${item.images.length}`}
                            className={`w-full h-full object-contain cursor-pointer transition-opacity duration-300 ${loading ? 'opacity-0' : 'opacity-100'}`}
                            onClick={() => openFullscreen(item, currentIdx)}
                            onLoad={() => onCarouselImgLoad(item.id)}
                          />
                          {item.images.length > 1 && (
                            <>
                              <button
                                onClick={() => prev(item)}
                                className="absolute left-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-navy p-2 rounded-full transition-all"
                                aria-label="Previous image"
                              >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
                              </button>
                              <button
                                onClick={() => next(item)}
                                className="absolute right-3 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-navy p-2 rounded-full transition-all"
                                aria-label="Next image"
                              >
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
                              </button>
                              <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-2">
                                {item.images.map((_, i) => (
                                  <button
                                    key={i}
                                    onClick={() => setCurrent(item.id, i)}
                                    className={`w-2 h-2 rounded-full transition-all ${i === currentIdx ? 'bg-gold w-5' : 'bg-white/60'}`}
                                  />
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      )}

                      <p className="text-taupe text-base leading-relaxed mb-5">{item.description}</p>

                      {item.references.length > 0 && (
                        <div className="flex flex-wrap gap-x-6 gap-y-1">
                          {item.references.map((ref, idx) => (
                            <a
                              key={idx}
                              href={ref.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-navy/50 text-xs hover:text-gold transition-colors duration-200"
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
                    </article>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {fullscreen !== null && fsItem && (
        <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" onClick={closeFullscreen}>
          <button onClick={(e) => { e.stopPropagation(); closeFullscreen() }} className="absolute top-4 right-4 text-white/80 hover:text-white p-2 z-10" aria-label="Close">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
          </button>

          {fsItem.images.length > 1 && (
            <>
              <button onClick={(e) => { e.stopPropagation(); prevFs() }} disabled={fsLoading} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 z-10 disabled:opacity-40 disabled:cursor-not-allowed" aria-label="Previous">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M15 18l-6-6 6-6" /></svg>
              </button>
              <button onClick={(e) => { e.stopPropagation(); nextFs() }} disabled={fsLoading} className="absolute right-4 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-3 z-10 disabled:opacity-40 disabled:cursor-not-allowed" aria-label="Next">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 18l6-6-6-6" /></svg>
              </button>
              <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/60 text-sm font-medium z-10">{fullscreen + 1} / {fsItem.images.length}</div>
            </>
          )}

          {fsLoading && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-10 h-10 border-2 border-white/20 border-t-white/80 rounded-full animate-spin" />
            </div>
          )}
          <img src={fsItem.images[fullscreen]} alt={`${fsItem.title} — fullscreen photo ${fullscreen + 1} of ${fsItem.images.length}`} className={`max-w-full max-h-full object-contain p-4 transition-opacity duration-300 ${fsLoading ? 'opacity-0' : 'opacity-100'}`} onClick={(e) => e.stopPropagation()} onLoad={() => setFsLoading(false)} />
        </div>
      )}
    </>
  )
}
