import { useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import BoshqaNavbar from './BoshqaNavbar'
import Footer from '../../components/Footer'
import StickyBottomCTA from '../../components/StickyBottomCTA'
import HomePage from './HomePage'
import StatsPage from './StatsPage'
import HowItWorksPage from './HowItWorksPage'
import RewardsPage from './RewardsPage'
import FaqPage from './FaqPage'

export default function BoshqaApp() {
  const { pathname } = useLocation()
  const isHome = pathname === '/open' || pathname === '/open/'

  useEffect(() => {
    document.documentElement.classList.add('dark')
    document.body.style.background = '#060810'
    return () => {
      document.documentElement.classList.remove('dark')
      document.body.style.background = ''
    }
  }, [])

  return (
    <div className={`min-h-screen bg-dark-950 text-white overflow-hidden ${isHome ? 'pb-[72px] sm:pb-0' : ''}`}>
      <BoshqaNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/stats" element={<StatsPage />} />
        <Route path="/how-it-works" element={<HowItWorksPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
        <Route path="/faq" element={<FaqPage />} />
      </Routes>
      {isHome && <Footer />}
      {isHome && <StickyBottomCTA />}
    </div>
  )
}
