import { Send } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'
import logo from '../assets/logo.png'

export default function Footer() {
  const { telegramLink } = useConfig()
  return (
    <footer className="border-t border-gray-200 dark:border-white/5 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <img src={logo} alt="Logo" className="h-10 w-auto" />
          <span className="font-bold text-gray-900 dark:text-white text-sm">Milliy jamoasi</span>
        </div>

        <p className="text-xs text-gray-400 dark:text-slate-600 text-center">
          To'lovlar Telegram bot orqali amalga oshiriladi. Barcha huquqlar himoyalangan.
        </p>

        <a
          href={telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-brand-green text-sm font-medium hover:opacity-80 transition-opacity"
        >
          <Send className="w-4 h-4" />
          @Openbudgetchibot
        </a>
      </div>
    </footer>
  )
}
