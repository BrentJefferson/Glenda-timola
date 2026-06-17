import profile from '../../data/profile.json'

export default function Hero() {
  const hasPhoto = Boolean(profile.photo)

  return (
    <section className="relative min-h-screen flex flex-col overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="/images/hero-city.jpg"
          alt=""
          className="w-full h-full object-cover"
          loading="eager"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/85 to-navy/70" />
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23C9A84C' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
      }} />

      <div className="relative z-20 w-full max-w-6xl mx-auto px-6 flex-1 flex items-center gap-10">
        {hasPhoto && (
          <div className="hidden xl:block shrink-0 self-end">
            <img
              src={profile.photo}
              alt={profile.name}
              className="h-[85vh] w-auto"
            />
          </div>
        )}

        {!hasPhoto && (
          <div className="hidden xl:block shrink-0 self-end">
            <div className="w-80 h-[600px] rounded-2xl border-2 border-dashed border-gold/40 bg-white/5 flex flex-col items-center justify-center gap-4">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="text-gold/50">
                <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="text-gold/50 text-xs uppercase tracking-widest font-display text-center leading-relaxed">
                Aunt's Photo<br/>Placeholder
              </span>
            </div>
          </div>
        )}

        <div className="flex-1 text-left py-20 min-w-0">
          <p className="text-gold font-display text-sm tracking-[0.3em] uppercase mb-6">
            {profile.title}
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight mb-6">
            {profile.name.split(' ')[0]}
            <span className="block text-gold">{profile.name.split(' ').slice(1).join(' ')}</span>
          </h1>
          <p className="text-cream/80 text-lg md:text-xl font-body max-w-2xl mb-10 leading-relaxed">
            {profile.tagline}
          </p>
          <div className="flex flex-col sm:flex-row items-start gap-4">
            <a
              href="#listings"
              className="inline-flex items-center gap-2 bg-gold text-navy font-semibold px-8 py-3 rounded-lg hover:bg-gold/90 transition-all duration-300 text-sm tracking-wide uppercase"
            >
              View Listings
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 border border-white/30 text-white px-8 py-3 rounded-lg hover:bg-white/10 transition-all duration-300 text-sm tracking-wide uppercase"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="2">
          <path d="M7 13l5 5 5-5M7 6l5 5 5-5" />
        </svg>
      </div>
    </section>
  )
}
