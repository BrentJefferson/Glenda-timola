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
    const onScroll = () => setScrolled(window.scrollY > 40)
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
        <div className="md:hidden bg-white border-t border-cream px-6 pb-4">
          {links.map(link => (
            <a
              key={link.href}
              href={isHome ? link.href : `/${link.href}`}
              className="block py-2 text-sm font-medium text-taupe hover:text-navy transition-colors tracking-wide uppercase"
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  )
}
