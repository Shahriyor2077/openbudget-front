import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaTelegramPlane } from 'react-icons/fa'
import pul from '../../assets/pul1.jpeg'

const INITIAL_SECONDS = 24 * 60 * 60

function getTimeParts(secs) {
  return {
    h: String(Math.floor(secs / 3600)).padStart(2, '0'),
    m: String(Math.floor((secs % 3600) / 60)).padStart(2, '0'),
    s: String(secs % 60).padStart(2, '0'),
  }
}

function Colon() {
  return (
    <span className="font-black text-3xl" style={{ color: '#f5a623', lineHeight: 1 }}>
      :
    </span>
  )
}

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.13, ease: 'easeOut' },
  }),
}

export default function PromoPage() {
  const [timeLeft, setTimeLeft] = useState(INITIAL_SECONDS)

  useEffect(() => {
    const id = setInterval(() => setTimeLeft(t => (t > 0 ? t - 1 : 0)), 1000)
    return () => clearInterval(id)
  }, [])

  const parts = getTimeParts(timeLeft)

  return (
    <div
      className="min-h-screen flex flex-col items-center px-4 py-8 overflow-hidden"
      style={{
        background: 'radial-gradient(ellipse at center, #3a0a0a 0%, #1a0303 50%, #0a0000 100%)',
      }}
    >
      {/* DIQQAT badge */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={0} className="mb-6">
        <div
          className="px-10 py-2 rounded-lg font-black text-2xl"
          style={{
            background: '#c8960a',
            color: '#b8000a',
            border: '3px solid #f0c020',
            letterSpacing: '0.15em',
          }}
        >
          DIQQAT!
        </div>
      </motion.div>

      {/* Heading */}
      <motion.h1
        variants={fadeUp} initial="hidden" animate="visible" custom={1}
        className="text-center font-black leading-tight mb-6"
        style={{ fontSize: 'clamp(2rem, 8vw, 3rem)' }}
      >
        <span style={{ color: '#ffffff' }}>OVOZ BERING VA</span>
        <br />
        <span style={{ color: '#f5c518' }}>PUL OLING!</span>
      </motion.h1>

      {/* Banknote */}
      <motion.div
        variants={fadeUp} initial="hidden" animate="visible" custom={2}
        className="mb-6 w-full max-w-sm"
        style={{
          border: '3px solid #00e5ff',
          borderRadius: '14px',
          boxShadow: '0 0 24px 4px #00e5ff55, 0 0 60px 8px #00bcd433',
          overflow: 'hidden',
        }}
      >
        <img src={pul} alt="200 000 so'm" className="w-full h-auto block" />
      </motion.div>

      {/* Guarantee card */}
      <motion.div
        variants={fadeUp} initial="hidden" animate="visible" custom={3}
        className="w-full max-w-sm mb-6 rounded-2xl text-center py-6 px-6"
        style={{
          background: '#ffffff',
          border: '3px solid #e00010',
          boxShadow: '0 4px 24px #e0001022',
        }}
      >
        <div className="font-black text-2xl mb-3" style={{ color: '#e00010', letterSpacing: '0.04em' }}>
          100% KAFOLAT
        </div>
        <p className="font-bold text-gray-900 text-base leading-snug">
          Ovoz berib, darhol pul ishlang!<br />
          Telegram Botga kiring va &apos;START&apos; bosing.
        </p>
      </motion.div>

      {/* CTA Button */}
      <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={4} className="w-full max-w-sm mb-6">
        <motion.a
          href="https://t.me/Openbudgetchibot"
          target="_blank"
          rel="noreferrer"
          className="flex items-center justify-center gap-3 w-full rounded-2xl font-black text-white text-2xl py-5"
          style={{
            background: 'linear-gradient(135deg, #e00010, #a80008)',
            boxShadow: '0 4px 32px #e0001066',
            letterSpacing: '0.05em',
          }}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          animate={{
            boxShadow: [
              '0 4px 32px #e0001066',
              '0 4px 48px #e00010aa',
              '0 4px 32px #e0001066',
            ],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        >
          <FaTelegramPlane className="text-3xl" />
          OVOZ BERISH
        </motion.a>
      </motion.div>

      {/* Countdown */}
      <motion.div
        variants={fadeUp} initial="hidden" animate="visible" custom={5}
        className="flex flex-wrap items-center justify-center gap-2"
      >
        <span className="font-bold text-base" style={{ color: '#cccccc' }}>OVOZ BERISH TUGALLANISHIGA:</span>
        <div className="flex items-center gap-1">
          <span className="font-black text-3xl" style={{ color: '#f5a623', fontVariantNumeric: 'tabular-nums' }}>{parts.h}</span>
          <Colon />
          <span className="font-black text-3xl" style={{ color: '#f5a623', fontVariantNumeric: 'tabular-nums' }}>{parts.m}</span>
          <Colon />
          <span className="font-black text-3xl" style={{ color: '#f5a623', fontVariantNumeric: 'tabular-nums' }}>{parts.s}</span>
        </div>
      </motion.div>
    </div>
  )
}
