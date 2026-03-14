import { useState, useEffect } from 'react'
import { Send } from 'lucide-react'
import { useConfig } from '../context/ConfigContext'

export default function StickyBottomCTA() {
  const { telegramLink, voteAmount } = useConfig()
  const [visible, setVisible] = useState(true)
  const fmtAmount = Number(voteAmount).toLocaleString('ru-RU')

  useEffect(() => {
    let lastY = window.scrollY
    const onScroll = () => {
      setVisible(window.scrollY < 100 || window.scrollY < lastY)
      lastY = window.scrollY
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 sm:hidden transition-transform duration-300 ${visible ? 'translate-y-0' : 'translate-y-full'}`}
    >
      <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur border-t border-gray-200 dark:border-white/10 px-4 py-3 flex items-center gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-xs text-gray-500 dark:text-slate-400">Har 1 ovoz uchun</p>
          <p className="text-base font-black text-brand-green dark:text-brand-neon leading-tight">{fmtAmount} so'm</p>
        </div>
        <a
          href={telegramLink}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary px-10 py-5 text-2xl flex-shrink-0"
        >
          <Send className="w-6 h-6" />
          Pul ishlash
        </a>
      </div>
    </div>
  )
}
