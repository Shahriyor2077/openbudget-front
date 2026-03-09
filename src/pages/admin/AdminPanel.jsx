import { useState, useEffect } from 'react'

const API = import.meta.env.VITE_API_URL || ''

function apiFetch(path, token, options = {}) {
  return fetch(`${API}${path}`, {
    ...options,
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', ...options.headers },
  })
}

const inputCls = 'w-full px-3 py-2.5 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-green-400'
const labelCls = 'block text-xs font-semibold text-gray-600 mb-1.5'

export default function AdminPanel({ token, onLogout }) {
  const [page, setPage] = useState('settings')
  const [menuOpen, setMenuOpen] = useState(false)
  const [settings, setSettings] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')
  const [oldPw, setOldPw] = useState('')
  const [newPw, setNewPw] = useState('')
  const [pwMsg, setPwMsg] = useState('')

  useEffect(() => {
    apiFetch('/api/admin/settings', token).then(r => r.json()).then(setSettings)
  }, [])

  async function saveSettings() {
    setSaving(true); setSaveMsg('')
    const res = await apiFetch('/api/admin/settings', token, {
      method: 'PATCH',
      body: JSON.stringify({
        voteAmount: Number(settings.voteAmount),
        bonusAmount: Number(settings.bonusAmount),
        bonusMinVotes: Number(settings.bonusMinVotes),
        grandPrize: settings.grandPrize,
        telegramLink: settings.telegramLink,
        heroVariant: Number(settings.heroVariant),
      }),
    })
    setSaving(false)
    setSaveMsg(res.ok ? 'Saqlandi!' : 'Xato yuz berdi')
    setTimeout(() => setSaveMsg(''), 2000)
  }

  async function changePassword() {
    setPwMsg('')
    const res = await apiFetch('/api/admin/password', token, {
      method: 'PATCH',
      body: JSON.stringify({ oldPassword: oldPw, newPassword: newPw }),
    })
    if (res.ok) { setPwMsg("Parol o'zgartirildi"); setOldPw(''); setNewPw('') }
    else setPwMsg('Xato: eski parol noto\'g\'ri')
  }

  const nav = [
    { id: 'settings', label: 'Sozlamalar' },
    { id: 'password', label: 'Parol' },
  ]

  function navigate(id) { setPage(id); setMenuOpen(false) }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Top navbar (mobile) */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between md:hidden">
        <span className="font-bold text-gray-900">Admin Panel</span>
        <button onClick={() => setMenuOpen(o => !o)} className="p-2 rounded-lg hover:bg-gray-100">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            {menuOpen ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/> : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>}
          </svg>
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-b border-gray-200 px-4 pb-3">
          {nav.map(n => (
            <button key={n.id} onClick={() => navigate(n.id)}
              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium mb-1 ${page === n.id ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}>
              {n.label}
            </button>
          ))}
          <button onClick={onLogout} className="block w-full text-left px-3 py-2.5 rounded-lg text-sm text-gray-500 hover:bg-gray-50">
            Chiqish
          </button>
        </div>
      )}

      <div className="flex flex-1">
        {/* Sidebar (desktop) */}
        <div className="hidden md:flex w-56 bg-white border-r border-gray-200 flex-col">
          <div className="px-5 py-5 border-b border-gray-100">
            <div className="font-bold text-gray-900">Admin Panel</div>
            <div className="text-xs text-gray-400 mt-0.5">OpenBudget</div>
          </div>
          <nav className="flex-1 p-3">
            {nav.map(n => (
              <button key={n.id} onClick={() => navigate(n.id)}
                className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium mb-1 ${page === n.id ? 'bg-green-50 text-green-700' : 'text-gray-700 hover:bg-gray-50'}`}>
                {n.label}
              </button>
            ))}
          </nav>
          <div className="p-3">
            <button onClick={onLogout} className="w-full px-3 py-2 border border-gray-200 rounded-lg text-sm text-gray-500 hover:bg-gray-50">
              Chiqish
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 md:p-8 max-w-2xl">
          {page === 'settings' && settings && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-5">Sozlamalar</h2>
              <div className="bg-white rounded-xl p-5 shadow-sm">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { label: "Ovoz narxi (so'm)", key: 'voteAmount', type: 'number' },
                    { label: "Bonus miqdori (so'm)", key: 'bonusAmount', type: 'number' },
                    { label: 'Bonus uchun min. ovoz', key: 'bonusMinVotes', type: 'number' },
                    { label: 'Grand sovrin', key: 'grandPrize', type: 'text' },
                    { label: 'Hero variant (1 yoki 2)', key: 'heroVariant', type: 'number' },
                  ].map(f => (
                    <div key={f.key}>
                      <label className={labelCls}>{f.label}</label>
                      <input type={f.type} value={settings[f.key] ?? ''} onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))} className={inputCls} />
                    </div>
                  ))}
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Telegram link</label>
                    <input type="url" value={settings.telegramLink ?? ''} onChange={e => setSettings(s => ({ ...s, telegramLink: e.target.value }))} className={inputCls} />
                  </div>
                </div>
                <div className="flex items-center gap-3 mt-5">
                  <button onClick={saveSettings} disabled={saving}
                    className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-sm transition-colors">
                    {saving ? 'Saqlanmoqda...' : 'Saqlash'}
                  </button>
                  {saveMsg && <span className="text-green-600 text-sm">{saveMsg}</span>}
                </div>
              </div>
            </div>
          )}

          {page === 'password' && (
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-5">Parol o'zgartirish</h2>
              <div className="bg-white rounded-xl p-5 shadow-sm max-w-sm">
                <div className="mb-4">
                  <label className={labelCls}>Eski parol</label>
                  <input type="password" value={oldPw} onChange={e => setOldPw(e.target.value)} className={inputCls} />
                </div>
                <div className="mb-5">
                  <label className={labelCls}>Yangi parol</label>
                  <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)} className={inputCls} />
                </div>
                {pwMsg && <p className={`text-sm mb-3 ${pwMsg.includes('Xato') ? 'text-red-500' : 'text-green-600'}`}>{pwMsg}</p>}
                <button onClick={changePassword}
                  className="px-6 py-2.5 bg-green-500 hover:bg-green-600 text-white rounded-lg font-semibold text-sm transition-colors">
                  O'zgartirish
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
