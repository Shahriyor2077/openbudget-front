import { createContext, useContext, useState, useEffect } from 'react'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// Fallback — backend ishlamasa ham sahifa ko'rinadi
const DEFAULT = {
  voteAmount: 35000,
  bonusAmount: 25000,
  bonusMinVotes: 10,
  grandPrize: 'iPhone 17',
  telegramLink: 'https://t.me/Openbudgetchibot',
  heroVariant: 1,
  stats: {
    votesCount: 0,
    totalPaid: '0',
    participantsCount: 0,
    successRate: 0,
  },
}

const ConfigContext = createContext(DEFAULT)

export function ConfigProvider({ children }) {
  const [config, setConfig] = useState(DEFAULT)

  useEffect(() => {
    fetch(`${API_URL}/api/settings`)
      .then(r => r.json())
      .then(data => setConfig(data))
      .catch(() => {}) // fallback qoladi
  }, [])

  return <ConfigContext.Provider value={config}>{children}</ConfigContext.Provider>
}

export function useConfig() {
  return useContext(ConfigContext)
}
