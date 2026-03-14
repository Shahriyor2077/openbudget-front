import { motion } from 'framer-motion'
import { Send, ArrowRight } from 'lucide-react'
import logo from '../../assets/logo.png'
import pul from '../../assets/pul1.jpeg'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.12, ease: 'easeOut' },
  }),
}

export default function FrontApp() {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col px-4 overflow-hidden relative">

      {/* Background blurs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-white/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <motion.div
        variants={fadeUp} initial="hidden" animate="visible" custom={-1}
        className="flex items-center justify-center gap-3 pt-8 pb-4"
      >
        <img src={logo} alt="Logo" className="h-14 w-auto" />
        <span className="text-2xl font-bold text-white">Milliy Jamoasi</span>
      </motion.div>

      <div className="flex-1 flex items-start justify-center pt-2">
        <div className="relative w-full max-w-lg text-center">

          {/* Title */}
          <motion.h1
            variants={fadeUp} initial="hidden" animate="visible" custom={0}
            className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3"
          >
            Har bitta ovoz uchun<br />
            <span className="text-blue-400">100 000 so'm</span> gacha!
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={1}
            className="text-lg text-gray-400 mb-6"
          >
            Har bitta ovoz uchun 100.000 so'm gacha ishlash imkoni
          </motion.p>

          {/* Pul rasmi */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={2}
            className="mb-8"
          >
            <img src={pul} alt="pul" className="w-72 h-auto rounded-2xl object-contain mx-auto shadow-2xl shadow-black/30" />
          </motion.div>

          {/* Button */}
          <motion.div
            variants={fadeUp} initial="hidden" animate="visible" custom={3}
            className="flex justify-center"
          >
            <motion.a
              href="https://t.me/Openbudgetchibot"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-red-600 text-white font-bold text-3xl rounded-2xl px-14 py-7 shadow-2xl ring-4 ring-red-300/40"
              style={{ boxShadow: '0 0 40px rgba(220,38,38,0.7), 0 0 80px rgba(220,38,38,0.3)' }}
              animate={{ scale: [1, 1.04, 1], boxShadow: [
                '0 0 40px rgba(220,38,38,0.7), 0 0 80px rgba(220,38,38,0.3)',
                '0 0 60px rgba(220,38,38,0.9), 0 0 120px rgba(220,38,38,0.5)',
                '0 0 40px rgba(220,38,38,0.7), 0 0 80px rgba(220,38,38,0.3)',
              ]}}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              whileHover={{ scale: 1.07 }}
              whileTap={{ scale: 0.97 }}
            >
              <Send className="w-6 h-6" />
              Pul ishlash
              <ArrowRight className="w-6 h-6" />
            </motion.a>
          </motion.div>

          <motion.p
            variants={fadeUp} initial="hidden" animate="visible" custom={4}
            className="text-xs text-gray-600 mt-8"
          >
            To'lovlar Telegram bot orqali amalga oshiriladi
          </motion.p>
        </div>
      </div>
    </div>
  )
}
