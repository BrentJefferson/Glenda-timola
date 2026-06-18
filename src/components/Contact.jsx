import { useState } from 'react'
import emailjs from '@emailjs/browser'
import contact from '../../data/contact.json'

const icons = {
  phone: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  email: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    </svg>
  ),
  location: (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  )
}

export default function Contact() {
  const [formData, setFormData] = useState({})
  const [status, setStatus] = useState('idle')

  emailjs.init('1MLGAM1TFJlk_J06L')

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('sending')
    try {
      await emailjs.send('service_fynz02e', 'template_pc8j04e', formData)
      setStatus('success')
      setFormData({})
    } catch {
      setStatus('error')
    }
  }

  const iconColor = (title) => {
    if (title === 'Phone') return { bg: '#ECFDF5', text: '#059669' }
    if (title === 'Email') return { bg: '#EEF2FF', text: '#4F46E5' }
    if (title === 'Service Area') return { bg: '#FFF7ED', text: '#F97316' }
    return { bg: '#F5F0EB', text: '#1B2A4A' }
  }

  const renderInfoText = (block) => {
    if (block.title === 'Phone') {
      return <a href={`tel:${block.text.replace(/[^0-9+]/g, '')}`} className="text-taupe text-sm hover:text-[#059669] transition-colors">{block.text}</a>
    }
    if (block.title === 'Email') {
      return <a href={`mailto:${block.text}`} className="text-taupe text-sm hover:text-[#4F46E5] transition-colors">{block.text}</a>
    }
    return <p className="text-taupe text-sm">{block.text}</p>
  }

  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6 scroll-reveal">
        <div className="text-center mb-16">
          <p className="text-gold font-display text-sm tracking-[0.3em] uppercase mb-3">{contact.label}</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy">{contact.title}</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          <p className="text-taupe mt-4 max-w-xl mx-auto">{contact.description}</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <form className="space-y-5" onSubmit={handleSubmit}>
            {contact.formFields.map((f) => (
              <div key={f.id}>
                <label className="block text-navy text-sm font-semibold mb-1.5" htmlFor={f.id}>{f.label}</label>
                {f.type === 'textarea' ? (
                  <textarea
                    id={f.id}
                    rows={f.rows ?? 4}
                    value={formData[f.id] || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-cream bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all text-sm resize-none"
                    placeholder={f.placeholder}
                    required
                  />
                ) : (
                  <input
                    id={f.id}
                    type={f.type}
                    value={formData[f.id] || ''}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-lg border border-cream bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all text-sm"
                    placeholder={f.placeholder}
                    required
                  />
                )}
              </div>
            ))}
            <button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-gold text-navy font-semibold py-3 rounded-lg hover:bg-gold/90 disabled:opacity-50 transition-all duration-300 text-sm tracking-wide uppercase"
            >
              {status === 'sending' ? 'Sending...' : status === 'success' ? 'Sent!' : contact.buttonText}
            </button>
            {status === 'success' && (
              <p className="text-emerald-600 text-sm text-center">Message sent! I'll get back to you soon.</p>
            )}
            {status === 'error' && (
              <p className="text-red-500 text-sm text-center">Something went wrong. Try again or email me directly.</p>
            )}
          </form>

          <div className="space-y-8">
            {contact.infoBlocks.map((block) => (
              <div key={block.title} className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center shrink-0 transition-colors"
                  style={{ backgroundColor: iconColor(block.title).bg, color: iconColor(block.title).text }}
                >
                  {icons[block.icon]}
                </div>
                <div>
                  <h4 className="font-display font-bold text-navy text-sm mb-1">{block.title}</h4>
                  {renderInfoText(block)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
