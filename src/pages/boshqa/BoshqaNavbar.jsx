import { useState, useEffect } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { Send, Menu, X } from 'lucide-react'
import { useConfig } from '../../context/ConfigContext'

const navLinks = [
  { to: '/open/how-it-works', label: 'Qanday ishlaydi' },
  { to: '/open/rewards', label: 'Mukofotlar' },
  { to: '/open/stats', label: 'Statistika' },
  { to: '/open/faq', label: 'Savollar' },
]

export default function BoshqaNavbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { telegramLink } = useConfig()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-white/90 dark:bg-dark-950/90 backdrop-blur-md border-b border-gray-200 dark:border-white/5'
          : ''
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/open" className="flex items-center gap-2" onClick={() => setMenuOpen(false)}>
            <div className="w-8 h-8 rounded-lg bg-brand-green/20 border border-brand-green/30 flex items-center justify-center">
              <span className="text-brand-green font-black text-sm">V</span>
            </div>
            <span className="font-bold text-gray-900 dark:text-white">Open</span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm text-gray-500 dark:text-slate-400">
            {navLinks.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  isActive
                    ? 'text-brand-green font-semibold'
                    : 'hover:text-gray-900 dark:hover:text-white transition-colors'
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href={telegramLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-brand-green/10 border border-brand-green/30 text-brand-green text-sm font-semibold px-4 py-2 rounded-lg hover:bg-brand-green/20 transition-all"
            >
              <Send className="w-4 h-4" />
              <span className="hidden sm:inline">Boshlash</span>
            </a>

            <button
              className="md:hidden p-2 rounded-lg text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-white/10 transition-colors"
              onClick={() => setMenuOpen(prev => !prev)}
              aria-label="Menyu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden bg-white/95 dark:bg-dark-950/95 backdrop-blur-md border-t border-gray-200 dark:border-white/5 px-4 pb-4">
            <nav className="flex flex-col gap-1 pt-2">
              {navLinks.map(({ to, label }) => (
                <NavLink
                  key={to}
                  to={to}
                  onClick={() => setMenuOpen(false)}
                  className={({ isActive }) =>
                    `px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                      isActive
                        ? 'bg-brand-green/10 text-brand-green'
                        : 'text-gray-600 dark:text-slate-300 hover:bg-gray-100 dark:hover:bg-white/5'
                    }`
                  }
                >
                  {label}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </header>
    </>
  )
}
