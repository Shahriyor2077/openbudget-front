import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ConfigProvider } from './context/ConfigContext'
import Navbar from './components/Navbar'
import HeroSection from './components/HeroSection'
import StatsSection from './components/StatsSection'
import HowItWorks from './components/HowItWorks'
import RewardsSection from './components/RewardsSection'
import FaqSection from './components/FaqSection'
import FinalCTA from './components/FinalCTA'
import Footer from './components/Footer'
import StickyBottomCTA from './components/StickyBottomCTA'
import Admin from './pages/admin'

function Landing() {
  return (
    <ConfigProvider>
      <div className="min-h-screen bg-gray-50 text-gray-900 overflow-x-hidden pb-[72px] sm:pb-0">
        <Navbar />
        <HeroSection />
        <StatsSection />
        <HowItWorks />
        <RewardsSection />
        <FaqSection />
        <FinalCTA />
        <Footer />
        <StickyBottomCTA />
      </div>
    </ConfigProvider>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/admin/*" element={<Admin />} />
        <Route path="/*" element={<Landing />} />
      </Routes>
    </BrowserRouter>
  )
}
