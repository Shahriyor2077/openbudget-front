import { motion } from 'framer-motion'
import { Send, MousePointerClick, Banknote } from 'lucide-react'
import { TELEGRAM_LINK } from '../config/campaign'

const steps = [
  {
    number: '01',
    icon: Send,
    iconColor: 'text-brand-blue',
    iconBg: 'bg-brand-blue/10 border-brand-blue/20',
    title: "Telegram'ga kiring",
    description: "Pastdagi tugmani bosing — to'g'ri botga o'tasiz. Parol, email, hech narsa so'ralmaydi.",
  },
  {
    number: '02',
    icon: MousePointerClick,
    iconColor: 'text-brand-green',
    iconBg: 'bg-brand-green/10 border-brand-green/20',
    title: '/start bosing',
    description: "Botni ochib /start bosing. Keyin u o'zi yo'l-yo'riq beradi.",
  },
  {
    number: '03',
    icon: Banknote,
    iconColor: 'text-brand-gold',
    iconBg: 'bg-brand-gold/10 border-brand-gold/20',
    title: 'Ovoz bering, mukofot oling',
    description: "Ovoz bergach, to'lov bir necha daqiqada tushadi. Hisob ko'tarila boshlaydi.",
  },
]

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-24 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-100/50 to-transparent dark:from-dark-950 dark:via-dark-900/50 dark:to-dark-950" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="section-title">3 qadam, xolos</h2>
          <p className="section-subtitle">
            Ro'yxatdan o'tish yo'q. Hujjat yo'q. Faqat ovoz va to'lov.
          </p>
        </motion.div>

        <div className="relative">
<div className="grid md:grid-cols-3 gap-8 lg:gap-12 items-stretch">
            {steps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: i * 0.15 }}
                className="relative flex"
              >
                {i < steps.length - 1 && (
                  <div className="md:hidden absolute left-8 top-full h-8 w-px bg-gradient-to-b from-gray-300 dark:from-white/20 to-transparent" />
                )}

                <div className="glass-card p-8 hover:border-gray-300 dark:hover:border-white/20 transition-all duration-300 group w-full flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`relative w-16 h-16 rounded-2xl border flex items-center justify-center flex-shrink-0 ${step.iconBg} transition-transform group-hover:scale-105 duration-300`}>
                      <step.icon className={`w-7 h-7 ${step.iconColor}`} />
                    </div>
                    <span className="text-4xl font-black text-gray-200 dark:text-white/10 select-none">{step.number}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">{step.title}</h3>
                  <p className="text-gray-500 dark:text-slate-400 leading-relaxed">{step.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-14"
        >
          <a
            href={TELEGRAM_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary inline-flex"
          >
            <Send className="w-5 h-5" />
            Hoziroq boshlash
          </a>
        </motion.div>
      </div>
    </section>
  )
}
