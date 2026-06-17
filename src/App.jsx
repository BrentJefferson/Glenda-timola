import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import FeaturedListings from './components/FeaturedListings'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
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
      {order.map((key) => sections.home[key]?.enabled ? sectionMap[key] : null)}
    </>
  )
}

export default function App() {
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
      <Footer />
    </div>
  )
}
