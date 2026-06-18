import { Fragment, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import SEO from './components/SEO'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import FeaturedListings from './components/FeaturedListings'
import Highlights from './components/Highlights'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ListingDetail from './pages/ListingDetail'
import ListingsPage from './pages/ListingsPage'
import HighlightsPage from './pages/HighlightsPage'
import TestimonialsPage from './pages/TestimonialsPage'
import MobilePortrait from './components/MobilePortrait'
import sections from '../data/sections.json'

const sectionMap = {
  hero: <Hero />,
  mobilePortrait: <MobilePortrait />,
  services: <Services />,
  featuredListings: <FeaturedListings />,
  highlights: <Highlights />,
  testimonials: <Testimonials />,
  faq: <FAQ />,
  contact: <Contact />
}

function HomePage() {
  const order = ['hero', 'mobilePortrait', 'services', 'featuredListings', 'highlights', 'testimonials', 'faq', 'contact']

  return (
    <>
      <SEO />
      {order.map((key) => sections.home[key]?.enabled ? <Fragment key={key}>{sectionMap[key]}</Fragment> : null)}
    </>
  )
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible')
        observer.unobserve(entry.target)
      }
    })
  },
  { threshold: 0.05 }
)

function observe() {
  document.querySelectorAll('.scroll-reveal:not(.visible)').forEach((el) => observer.observe(el))
}

export default function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    observe()
    const timer = setTimeout(observe, 300)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/highlights" element={<HighlightsPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
        </Routes>
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  )
}
