import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import sections from '../../data/sections.json'

const linkConfig = [
  { label: 'Services', href: '#services', key: 'services' },
  { label: 'Listings', href: '#listings', key: 'featuredListings' },
  { label: 'Testimonials', href: '#testimonials', key: 'testimonials' },
  { label: 'Contact', href: '#contact', key: 'contact' },
]

const links = linkConfig.filter((l) => sections.home[l.key]?.enabled !== false)

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 400)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || !isHome
          ? 'bg-white/95 backdrop-blur-md shadow-[0_1px_4px_rgba(0,0,0,0.06)]'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link to="/" className={`font-display font-bold text-lg tracking-tight transition-all duration-500 ${
          scrolled || !isHome ? 'opacity-100 text-navy' : 'opacity-0 text-white'
        }`}>
          Glenda Timola
        </Link>

        <button
          className="md:hidden text-navy"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            {menuOpen ? (
              <path d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {links.map(link => (
            <a
              key={link.href}
              href={isHome ? link.href : `/${link.href}`}
              className="text-sm font-medium text-taupe hover:text-navy transition-colors tracking-wide uppercase"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>

      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="absolute inset-0 bg-navy/60 backdrop-blur-sm" onClick={() => setMenuOpen(false)} />
          <div className="absolute top-0 right-0 h-full w-72 bg-white/70 backdrop-blur-xl shadow-2xl animate-slide-in">
            <div className="flex items-center justify-between px-6 h-16 border-b border-navy/5">
              <span className="font-display font-bold text-navy text-lg">Menu</span>
              <button onClick={() => setMenuOpen(false)} className="text-taupe hover:text-navy transition-colors" aria-label="Close menu">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="px-6 pt-6 space-y-1">
              {links.map(link => (
                <a
                  key={link.href}
                  href={isHome ? link.href : `/${link.href}`}
                  onClick={() => setMenuOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-navy/70 hover:text-navy hover:bg-navy/5 rounded-lg transition-all duration-200 tracking-wide uppercase"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="absolute bottom-8 left-0 right-0 px-6">
              <div className="h-px bg-gradient-to-r from-transparent via-gold/30 to-transparent mb-4" />
              <p className="text-center text-[10px] text-taupe/60 tracking-[0.2em] uppercase">Glenda Timola</p>
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
