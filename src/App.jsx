import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Services from './components/Services'
import FeaturedListings from './components/FeaturedListings'
import Testimonials from './components/Testimonials'
import Contact from './components/Contact'
import Footer from './components/Footer'
import ListingDetail from './pages/ListingDetail'
import TestimonialsPage from './pages/TestimonialsPage'
import MobilePortrait from './components/MobilePortrait'

function HomePage() {
  return (
    <>
      <Hero />
      <MobilePortrait />
      <Services />
      <FeaturedListings />
      <Testimonials />
      <Contact />
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
          <Route path="/testimonials" element={<TestimonialsPage />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
