import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Send, X, Check } from 'lucide-react'
import {
  FaCoins,
  FaCircleCheck,
  FaArrowDown,
  FaLock,
  FaBolt,
} from 'react-icons/fa6'
import { MdOutlinePayments } from 'react-icons/md'
import { useConfig } from '../context/ConfigContext'
import { HERO_VARIANTS } from '../config/campaign'

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, delay: i * 0.11, ease: 'easeOut' },
  }),
}

const NAMES = [
  ['Shahriyor','Sh'],['Jasur','Ja'],['Dilnoza','Di'],['Bobur','Bo'],['Malika','Ma'],
  ['Sardor','Sa'],['Zulfiya','Zu'],['Ulugbek','Ul'],['Nilufar','Ni'],['Behruz','Be'],
  ['Kamola','Ka'],['Mirzo','Mi'],['Ozoda','Oz'],['Sherzod','Sh'],['Gulnora','Gu'],
  ['Doniyor','Do'],['Feruza','Fe'],['Sanjar','Sa'],['Barno','Ba'],['Otabek','Ot'],
  ['Mohira','Mo'],['Eldor','El'],['Ziyoda','Zi'],['Firdavs','Fi'],['Shahnoza','Sh'],
  ['Akbar','Ak'],['Lobar','Lo'],['Nodir','No'],['Yulduz','Yu'],['Muzaffar','Mu'],
  ['Sabohat','Sa'],['Temur','Te'],['Maftuna','Mf'],['Alisher','Al'],['Xurshid','Xh'],
  ['Nargiza','Na'],['Ravshan','Ra'],['Dilfuza','Dl'],['Jamshid','Jm'],['Umida','Um'],
  ['Sarvarbek','Sv'],['Munira','Mn'],['Ilhom','Il'],['Shoira','Sh'],['Anvar','An'],
  ['Nafisa','Nf'],['Mansur','Ms'],['Hilola','Hi'],['Erkin','Er'],['Zuhra','Zh'],
  ['Bekzod','Bk'],['Oydin','Oy'],['Husan','Hs'],['Gavhar','Gv'],['Ulmas','Ul'],
  ['Shirin','Sh'],['Komiljon','Ko'],['Manzura','Mz'],['Davron','Dv'],['Hulkar','Hk'],
  ['Laziz','Lz'],['Sevinch','Se'],['Murod','Mr'],['Iroda','Ir'],['Nurbek','Nu'],
  ['Mahliyo','Mh'],['Zafar','Zf'],['Sitora','St'],['Bahodir','Bh'],['Farzona','Fr'],
  ['Hamid','Hm'],['Dildora','Dd'],['Sarvar','Sr'],['Muxlisa','Mx'],['Abror','Ab'],
  ['Xilola','Xl'],['Nuriddin','Nd'],['Charos','Ch'],['Shamsiddin','Sm'],['Aziza','Az'],
  ['Ulugbek','Ub'],['Nasiba','Ns'],['Tohir','Th'],['Lola','Ll'],['Vohid','Vo'],
  ['Sanam','Sn'],['Mirkomil','Mk'],['Barcha','Bc'],['Shodmon','Sd'],['Muazzam','Mw'],
  ['Ismoil','Is'],['Tabassum','Tb'],['Behzod','Bz'],['Robiya','Rb'],['Qodir','Qd'],
  ['Mohlaroyim','Ml'],['Asliddin','As'],['Nozima','Nz'],['Hamza','Hz'],['Sarvinoz','Sv'],
]
const COLORS = ['bg-emerald-600','bg-violet-600','bg-sky-600','bg-rose-600','bg-amber-600','bg-fuchsia-600','bg-indigo-600','bg-teal-600','bg-orange-600','bg-cyan-600','bg-green-600','bg-blue-600','bg-red-600','bg-yellow-600','bg-pink-600']
const AMOUNTS = ['5 000','10 000','15 000','20 000','25 000','30 000']

const PAYMENT_FEED = NAMES.map(([name, initials], i) => ({
  id: i + 1,
  name,
  initials,
  amount: AMOUNTS[i % AMOUNTS.length],
  color: COLORS[i % COLORS.length],
}))

const INTERVALS = [2600, 3100, 2400, 3400, 2900, 2700, 3200]
let intervalIdx = 0

function LivePaymentFeed() {
  const [displayed, setDisplayed] = useState(PAYMENT_FEED.slice(0, 3).map((p, i) => ({ ...p, uid: i })))
  const [totalPaid, setTotalPaid] = useState(117350000)

  useEffect(() => {
    let timeoutId
    let feedIdx = 3
    let uid = 100

    const scheduleNext = () => {
      const delay = INTERVALS[intervalIdx % INTERVALS.length]
      intervalIdx++
      timeoutId = setTimeout(() => {
        const next = PAYMENT_FEED[feedIdx % PAYMENT_FEED.length]
        feedIdx++
        uid++
        const newItem = { ...next, uid }
        setDisplayed(prev => [newItem, ...prev].slice(0, 5))
        setTotalPaid(prev => prev + 5000)
        scheduleNext()
      }, delay)
    }

    scheduleNext()
    return () => clearTimeout(timeoutId)
  }, [])

  return (
    <div className="glass-card p-5 w-full max-w-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <MdOutlinePayments className="w-4 h-4 text-brand-green" />
          <span className="text-sm font-semibold text-gray-900 dark:text-white">Jonli to'lovlar</span>
        </div>
        <span className="flex items-center gap-1.5 text-xs text-brand-green">
          <span className="w-1.5 h-1.5 rounded-full bg-brand-green animate-pulse" />
          Jonli
        </span>
      </div>

      <div className="space-y-2 overflow-hidden" style={{ minHeight: '200px' }}>
        <AnimatePresence initial={false}>
          {displayed.map((item, i) => (
            <motion.div
              key={item.uid}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: i === 0 ? 1 : 0.6 - i * 0.1, y: 0 }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.35, ease: 'easeOut' }}
              className={`flex items-center gap-3 p-2.5 rounded-lg transition-all ${i === 0 ? 'bg-brand-green/10 border border-brand-green/20' : ''}`}
            >
              <div className={`w-8 h-8 rounded-full ${item.color} flex items-center justify-center text-white text-xs font-bold flex-shrink-0`}>
                {item.initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{item.name}</p>
                <p className="text-xs text-gray-400 dark:text-slate-500">ovoz berdi</p>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-brand-green dark:text-brand-neon">+{item.amount}</p>
                <p className="text-xs text-gray-400 dark:text-slate-500">so'm</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="mt-4 pt-4 border-t border-gray-200 dark:border-white/10">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400 dark:text-slate-500">Jami to'langan</span>
          <motion.span
            key={totalPaid}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="text-sm font-bold text-gray-900 dark:text-white"
          >
            {totalPaid.toLocaleString('ru-RU')} so'm
          </motion.span>
        </div>
      </div>
    </div>
  )
}

function TrustComparison() {
  const others = ["To'lov va'da qilinadi", "Hisob bloklanadi", "Javob yo'q"]
  const us = ["To'lov kafolatlangan", "Hisob himoyalangan", "24/7 qo'llab-quvvatlash"]

  return (
    <div className="glass-card p-5 w-full max-w-sm">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs font-semibold text-gray-400 dark:text-slate-500 mb-3 uppercase tracking-wide">Boshqalar</p>
          <div className="space-y-2">
            {others.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <X className="w-2.5 h-2.5 text-red-400" />
                </div>
                <p className="text-xs text-gray-400 dark:text-slate-500 line-through">{item}</p>
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold text-brand-green mb-3 uppercase tracking-wide">Biz</p>
          <div className="space-y-2">
            {us.map((item, i) => (
              <div key={i} className="flex items-start gap-2">
                <div className="w-4 h-4 rounded-full bg-brand-green/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Check className="w-2.5 h-2.5 text-brand-green" />
                </div>
                <p className="text-xs text-gray-900 dark:text-white">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default function HeroSection() {
  const { telegramLink, heroVariant, voteAmount } = useConfig()
  const fmtAmount = Number(voteAmount).toLocaleString('ru-RU')
  const baseVariant = HERO_VARIANTS[heroVariant] || HERO_VARIANTS[1]
  const variant = {
    ...baseVariant,
    headline: heroVariant === 2
      ? `Har bitta ovoz\nuchun ${fmtAmount} so'm!`
      : baseVariant.headline,
  }

  return (
    <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-brand-green/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-brand-blue/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-green/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div>

            {/* ── REWARD BADGE ── */}
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={-1}
              className="inline-flex items-center gap-4 mb-8 bg-brand-green/8 dark:bg-brand-green/10 border border-brand-green/30 rounded-2xl px-5 py-4"
              style={{ boxShadow: '0 0 32px rgba(34,197,94,0.15)' }}
            >
              <div className="flex flex-col items-center justify-center bg-brand-green/20 rounded-xl w-14 h-14 flex-shrink-0">
                <FaCoins className="w-6 h-6 text-brand-green dark:text-brand-neon mb-0.5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-gray-500 dark:text-slate-400 uppercase tracking-widest mb-0.5">Har 1 ovoz uchun</p>
                <p className="text-4xl sm:text-5xl font-black text-brand-green dark:text-brand-neon leading-none">
                  {fmtAmount}
                  <span className="text-xl font-bold ml-1.5 text-brand-green/70 dark:text-brand-neon/70">so'm</span>
                </p>
              </div>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={0}
              className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 dark:text-white leading-[1.05] mb-6 whitespace-pre-line"
            >
              {variant.headline.split('—').map((part, i, arr) =>
                i < arr.length - 1
                  ? <span key={i}>{part}<span className="gradient-text">—</span></span>
                  : <span key={i}>{part}</span>
              )}
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={1}
              className="text-xl text-gray-500 dark:text-slate-400 mb-6 leading-relaxed"
            >
              {variant.subheadline}
            </motion.p>

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={2}
              className="flex flex-col sm:flex-row gap-3 mb-8"
            >
              <a
                href={telegramLink}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary text-lg px-8 py-4"
              >
                <Send className="w-5 h-5" />
                {variant.cta}
                <ArrowRight className="w-5 h-5" />
              </a>
              {variant.secondaryCta && (
                <a href="#how-it-works" className="inline-flex items-center justify-center gap-2 border border-gray-300 dark:border-white/20 text-gray-700 dark:text-white font-semibold px-6 py-4 rounded-xl hover:bg-gray-100 dark:hover:bg-white/5 transition-all text-base">
                  {variant.secondaryCta}
                </a>
              )}
            </motion.div>

            <motion.div variants={fadeUp} initial="hidden" animate="visible" custom={3} className="mb-6">
              <TrustComparison />
            </motion.div>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={4}
              className="text-gray-500 dark:text-slate-400 mb-4 flex items-center gap-2"
            >
              <FaArrowDown className="w-4 h-4 text-brand-green animate-bounce" />
              {variant.extra}
            </motion.p>

            {variant.bonus && (
              <motion.div
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                custom={4.5}
                className="inline-flex items-center gap-2 bg-brand-gold/10 border border-brand-gold/30 text-brand-gold text-sm font-medium px-4 py-2 rounded-full mb-4"
              >
                <FaCoins className="w-4 h-4" />
                {variant.bonus}
              </motion.div>
            )}

            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              custom={5}
              className="mt-6 flex items-center gap-3 text-sm text-gray-400 dark:text-slate-500"
            >
              <FaCircleCheck className="w-4 h-4 text-brand-green flex-shrink-0" />
              <span>9 000+ odam allaqachon to'lov oldi</span>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex flex-col gap-4 items-center lg:items-end"
          >
            <LivePaymentFeed />

            <div className="flex gap-3 flex-wrap justify-center lg:justify-end">
              <div className="flex items-center gap-2 glass-card px-3 py-2">
                <FaLock className="w-3.5 h-3.5 text-brand-green" />
                <span className="text-xs text-gray-500 dark:text-slate-400">Xavfsiz</span>
              </div>
              <div className="flex items-center gap-2 glass-card px-3 py-2">
                <FaBolt className="w-3.5 h-3.5 text-brand-gold" />
                <span className="text-xs text-gray-500 dark:text-slate-400">Tezkor to'lov</span>
              </div>
              <div className="flex items-center gap-2 glass-card px-3 py-2">
                <FaCircleCheck className="w-3.5 h-3.5 text-brand-blue" />
                <span className="text-xs text-gray-500 dark:text-slate-400">Kafolatlangan</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
