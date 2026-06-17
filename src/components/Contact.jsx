export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-16">
          <p className="text-gold font-display text-sm tracking-[0.3em] uppercase mb-3">Get in Touch</p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-navy">Contact Me</h2>
          <div className="w-16 h-0.5 bg-gold mx-auto mt-4" />
          <p className="text-taupe mt-4 max-w-xl mx-auto">
            Ready to find your dream home or sell your property? Let's talk.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
          <form className="space-y-5">
            <div>
              <label className="block text-navy text-sm font-semibold mb-1.5" htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-cream bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all text-sm"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-navy text-sm font-semibold mb-1.5" htmlFor="email">Email</label>
              <input
                id="email"
                type="email"
                className="w-full px-4 py-3 rounded-lg border border-cream bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all text-sm"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-navy text-sm font-semibold mb-1.5" htmlFor="message">Message</label>
              <textarea
                id="message"
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-cream bg-white focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-all text-sm resize-none"
                placeholder="How can I help you?"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-gold text-navy font-semibold py-3 rounded-lg hover:bg-gold/90 transition-all duration-300 text-sm tracking-wide uppercase"
            >
              Send Message
            </button>
          </form>

          <div className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center text-navy shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <div>
                <h4 className="font-display font-bold text-navy text-sm mb-1">Phone</h4>
                <p className="text-taupe text-sm">Contact me for listings</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center text-navy shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h4 className="font-display font-bold text-navy text-sm mb-1">Email</h4>
                <p className="text-taupe text-sm">Reach out via the form</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-cream flex items-center justify-center text-navy shrink-0">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <div>
                <h4 className="font-display font-bold text-navy text-sm mb-1">Service Area</h4>
                <p className="text-taupe text-sm">Leyte and Samar, Philippines</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
