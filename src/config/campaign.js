// ============================================================
// CAMPAIGN CONFIGURATION
// Edit these values to customize the landing page
// ============================================================

// Hero variant: 1 = "Ovoz bering — pul ishlab oling!"
//               2 = "Har bitta ovoz uchun [VOTE_AMOUNT] so'm!"
export const HERO_VARIANT = 1

// Telegram links — replace with your actual bot/channel
export const TELEGRAM_LINK = 'https://t.me/Openbudgetchibot'
export const TELEGRAM_CHANNEL = 'https://t.me/Openbudgetchibot'

// Reward amounts displayed on the page
export const VOTE_AMOUNT = '5 000'       // per-vote reward in so'm
export const BONUS_AMOUNT = '25 000'     // active participant bonus in so'm

// Bonus prize text
export const BONUS_TEXT = "Bonus: iPhone 17 yutib olish imkoniyati sizni kutmoqda!"

// Stats shown in StatsSection (these are display values, not live data)
export const STATS = [
  { value: 24817, suffix: '', label: "Ovoz berildi" },
  { value: 117350000, suffix: '', label: "So'm to'landi" },
  { value: 9243, suffix: '', label: "Qatnashuvchi" },
  { value: 97, suffix: '%', label: "To'lovni oldi" },
]

// Hero copy variants
export const HERO_VARIANTS = {
  1: {
    headline: "Ovoz bering —\npul ishlab oling!",
    subheadline: "Aldanib qolmang to'lovlarni faqat bizni bot qilmoqda",
    extra: "Telegram'da hoziroq ovoz bering.",
    cta: "Ovoz berish",
    secondaryCta: null,
    bonus: null,
  },
  2: {
    headline: `Har bitta ovoz\nuchun ${VOTE_AMOUNT} so'm!`,
    subheadline: "Aldanib qolmang to'lovlarni faqat bizni bot qilmoqda",
    extra: "Start bosing va ovoz berishni boshlang!",
    cta: "Pul ishlash",
    secondaryCta: null,
    bonus: BONUS_TEXT,
  },
}
