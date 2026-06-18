import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import faqs from '../../data/faq.json'

export default function FAQ() {
  const [open, setOpen] = useState(null)

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
      </Helmet>
      <section id="faq" className="py-24 bg-white">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <p className="text-gold font-display text-sm tracking-[0.3em] uppercase mb-3">Know Before You Buy</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-navy">Frequently Asked Questions</h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
            <p className="text-taupe mt-4 max-w-xl mx-auto">
              Common questions about buying condos in Cebu
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="border border-cream rounded-xl overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-cream/50 transition-colors"
                  aria-expanded={open === i}
                >
                  <span className="font-display font-semibold text-navy pr-4">{faq.question}</span>
                  <svg
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    className={`shrink-0 text-gold transition-transform duration-300 ${open === i ? 'rotate-180' : ''}`}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </button>
                <div
                  className={`transition-all duration-300 overflow-hidden ${
                    open === i ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <p className="px-6 pb-5 text-taupe text-sm leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
