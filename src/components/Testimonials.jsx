import { useState } from 'react'
import { Link } from 'react-router-dom'
import testimonials from '../../data/testimonials.json'

function getYouTubeId(url) {
  if (!url) return null
  const m = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/)
  return m ? m[1] : null
}

function isDirectVideo(url) {
  return url && url.match(/\.(mp4|webm|ogg)(\?|$)/i)
}

function TestimonialMedia({ t, onImageClick }) {
  const hasImage = Boolean(t.image)
  const hasVideo = Boolean(t.video)
  const youtubeId = getYouTubeId(t.video)
  const directVideo = isDirectVideo(t.video)

  if (!hasImage && !hasVideo) {
    return (
      <div className="mb-4 w-full rounded-lg overflow-hidden border border-dashed border-gold/30 bg-cream/50 h-48 flex flex-col items-center justify-center gap-2 text-taupe/50">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
        </svg>
        <span className="text-xs uppercase tracking-wider font-display">Screenshot / Video placeholder</span>
      </div>
    )
  }

  return (
    <div className="mb-4 space-y-3">
      {hasVideo && youtubeId && (
        <div className="w-full rounded-lg overflow-hidden border border-cream aspect-video bg-black">
          <iframe
            src={`https://www.youtube.com/embed/${youtubeId}`}
            title="Video testimonial"
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
      {hasVideo && directVideo && (
        <div className="w-full rounded-lg overflow-hidden border border-cream">
          <video controls className="w-full aspect-video bg-black">
            <source src={t.video} type={`video/${t.video.split('.').pop().split('?')[0] === 'webm' ? 'webm' : 'mp4'}`} />
          </video>
        </div>
      )}
      {hasVideo && !youtubeId && !directVideo && (
        <div className="w-full rounded-lg overflow-hidden border border-cream aspect-video bg-black flex items-center justify-center text-white/50 text-sm">
          {t.video}
        </div>
      )}
      {hasImage && (
        <button onClick={() => onImageClick(t.image)} className="block w-full rounded-lg overflow-hidden border border-cream hover:opacity-90 transition-opacity">
          <img src={t.image} alt="Screenshot proof" className="w-full h-48 object-contain bg-cream/50" />
        </button>
      )}
    </div>
  )
}

export default function Testimonials() {
  const [preview, setPreview] = useState(null)
  const sliced = testimonials.slice(0, 3)

  return (
    <section id="testimonials" className="py-24 bg-cream">
      <div className="max-w-6xl mx-auto px-6 scroll-reveal">
        <div className="text-center mb-16">
          <p className="text-gold font-display text-sm tracking-[0.3em] uppercase mb-3">Client Feedback</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy">Testimonials</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
        </div>

        {sliced.length === 0 ? (
          <p className="text-center text-taupe">Testimonials coming soon.</p>
        ) : (
          <>
            <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
              {sliced.map((t) => (
                <div key={t.id} className="w-full md:w-[calc(50%-0.75rem)] bg-white rounded-xl p-8 border border-cream scroll-reveal">
                  <div className="text-gold mb-4 flex gap-1">
                    {Array.from({ length: t.rating }).map((_, i) => (
                      <svg key={i} width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-charcoal/80 text-sm leading-relaxed mb-4 italic">"{t.text}"</p>
                  <TestimonialMedia t={t} onImageClick={setPreview} />
                  <div>
                    <p className="font-display font-bold text-navy text-sm">{t.name}</p>
                    <p className="text-taupe text-xs">{t.location}</p>
                  </div>
                </div>
              ))}
            </div>

            {testimonials.length > 4 && (
              <div className="text-center mt-10 scroll-reveal">
                <Link
                  to="/testimonials"
                  className="inline-flex items-center gap-2 border-2 border-navy text-navy font-semibold px-8 py-3 rounded-lg hover:bg-navy hover:text-white transition-all duration-300 text-sm tracking-wide uppercase"
                >
                  See All Testimonials
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>
            )}
          </>
        )}
      </div>

      {preview && (
        <div
          className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 cursor-pointer"
          onClick={() => setPreview(null)}
        >
          <img src={preview} alt="Screenshot" className="max-w-full max-h-[90vh] rounded-lg" />
        </div>
      )}
    </section>
  )
}
