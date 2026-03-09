import { useState, useEffect } from 'react'

const API = import.meta.env.VITE_API_URL || ''

function apiFetch(path, token, options = {}) {
  return fetch(`${API}${path}`, {
    ...options,
    headers: { 'Authorization': `Bearer ${token}`, 'Content-Type': 'application/json', ...options.headers },
  })
}

export default function AdminPanel({ token, onLogout }) {
  const [page, setPage] = useState('settings')
  const [settings, setSettings] = useState(null)
  const [saving, setSaving] = useState(false)
  const [saveMsg, setSaveMsg] = useState('')

  // Password change
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
    if (res.ok) { setPwMsg('Parol o\'zgartirildi'); setOldPw(''); setNewPw('') }
    else setPwMsg('Xato: eski parol noto\'g\'ri')
  }

  const nav = [
    { id: 'settings', label: 'Sozlamalar' },
    { id: 'password', label: 'Parol' },
  ]

  return (
    <div style={{ minHeight: '100vh', background: '#f1f5f9', display: 'flex' }}>
      {/* Sidebar */}
      <div style={{ width: 220, background: '#fff', borderRight: '1px solid #e5e7eb', padding: '24px 0', display: 'flex', flexDirection: 'column' }}>
        <div style={{ padding: '0 20px 24px', borderBottom: '1px solid #f1f5f9' }}>
          <div style={{ fontWeight: 700, fontSize: 17, color: '#0f172a' }}>Admin Panel</div>
          <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 2 }}>OpenBudget</div>
        </div>
        <nav style={{ flex: 1, padding: '16px 12px' }}>
          {nav.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)} style={{
              display: 'block', width: '100%', textAlign: 'left', padding: '10px 12px',
              borderRadius: 8, border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500,
              background: page === n.id ? '#f0fdf4' : 'transparent',
              color: page === n.id ? '#16a34a' : '#374151',
              marginBottom: 4,
            }}>{n.label}</button>
          ))}
        </nav>
        <div style={{ padding: '16px 12px' }}>
          <button onClick={onLogout} style={{ width: '100%', padding: '9px', border: '1px solid #e5e7eb', borderRadius: 8, background: '#fff', color: '#64748b', fontSize: 13, cursor: 'pointer' }}>
            Chiqish
          </button>
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, padding: '32px 36px', maxWidth: 700 }}>
        {page === 'settings' && settings && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: '#0f172a' }}>Sozlamalar</h2>
            <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.06)' }}>
              {[
                { label: 'Ovoz narxi (so\'m)', key: 'voteAmount', type: 'number' },
                { label: 'Bonus miqdori (so\'m)', key: 'bonusAmount', type: 'number' },
                { label: 'Bonus uchun min. ovoz', key: 'bonusMinVotes', type: 'number' },
                { label: 'Grand sovrin', key: 'grandPrize', type: 'text' },
                { label: 'Telegram link', key: 'telegramLink', type: 'url' },
                { label: 'Hero variant (1 yoki 2)', key: 'heroVariant', type: 'number' },
              ].map(f => (
                <div key={f.key} style={{ marginBottom: 18 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#374151' }}>{f.label}</label>
                  <input
                    type={f.type}
                    value={settings[f.key] ?? ''}
                    onChange={e => setSettings(s => ({ ...s, [f.key]: e.target.value }))}
                    style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' }}
                  />
                </div>
              ))}
              <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 8 }}>
                <button onClick={saveSettings} disabled={saving} style={{ padding: '10px 28px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                  {saving ? 'Saqlanmoqda...' : 'Saqlash'}
                </button>
                {saveMsg && <span style={{ color: '#16a34a', fontSize: 14 }}>{saveMsg}</span>}
              </div>
            </div>
          </div>
        )}

        {page === 'password' && (
          <div>
            <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 24, color: '#0f172a' }}>Parol o'zgartirish</h2>
            <div style={{ background: '#fff', borderRadius: 12, padding: 28, boxShadow: '0 1px 4px rgba(0,0,0,0.06)', maxWidth: 400 }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#374151' }}>Eski parol</label>
                <input type="password" value={oldPw} onChange={e => setOldPw(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' }} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, marginBottom: 6, color: '#374151' }}>Yangi parol</label>
                <input type="password" value={newPw} onChange={e => setNewPw(e.target.value)}
                  style={{ width: '100%', padding: '10px 12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 14, boxSizing: 'border-box' }} />
              </div>
              {pwMsg && <p style={{ color: pwMsg.includes('Xato') ? '#ef4444' : '#16a34a', fontSize: 13, marginBottom: 12 }}>{pwMsg}</p>}
              <button onClick={changePassword} style={{ padding: '10px 24px', background: '#22c55e', color: '#fff', border: 'none', borderRadius: 8, fontWeight: 600, fontSize: 14, cursor: 'pointer' }}>
                O'zgartirish
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
