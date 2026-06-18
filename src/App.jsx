import { Fragment, useEffect, useRef } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import FeaturedListings from './components/FeaturedListings'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'
import ListingDetail from './pages/ListingDetail'
import ListingsPage from './pages/ListingsPage'
import TestimonialsPage from './pages/TestimonialsPage'
import MobilePortrait from './components/MobilePortrait'
import sections from '../data/sections.json'

const sectionMap = {
  hero: <Hero />,
  mobilePortrait: <MobilePortrait />,
  services: <Services />,
  featuredListings: <FeaturedListings />,
  testimonials: <Testimonials />,
  contact: <Contact />
}

function HomePage() {
  const order = ['hero', 'mobilePortrait', 'services', 'featuredListings', 'testimonials', 'contact']

  return (
    <>
      {order.map((key) => sections.home[key]?.enabled ? <Fragment key={key}>{sectionMap[key]}</Fragment> : null)}
    </>
  )
}

export default function App() {
  const { pathname } = useLocation()
  const observerRef = useRef(null)

  useEffect(() => {
    if (!observerRef.current) {
      observerRef.current = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setTimeout(() => entry.target.classList.add('visible'), 0)
              observerRef.current.unobserve(entry.target)
            }
          })
        },
        { threshold: 0.05 }
      )
    }

    const observer = observerRef.current
    const observe = () => {
      document.querySelectorAll('.scroll-reveal:not(.visible)').forEach((el) => observer.observe(el))
    }

    requestAnimationFrame(observe)
    const timer = setTimeout(observe, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [pathname])

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/listing/:id" element={<ListingDetail />} />
          <Route path="/listings" element={<ListingsPage />} />
          <Route path="/testimonials" element={<TestimonialsPage />} />
        </Routes>
      </main>
      <ScrollToTop />
      <Footer />
    </div>
  )
}
