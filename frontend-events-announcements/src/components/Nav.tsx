import type { Page } from '../data'

interface NavProps {
  currentPage: Page
  onNavigate: (page: Page) => void
}

export default function Nav({ currentPage, onNavigate }: NavProps) {
  const links: { label: string; page: Page }[] = [
    { label: 'HOME', page: 'home' },
    { label: 'DIRECTORY', page: 'directory' },
    { label: 'EVENTS', page: 'events' },
    { label: 'BOARD', page: 'board' },
  ]

  return (
    <nav
      style={{
        backgroundColor: '#EDE8DC',
        borderBottom: '3px solid #111111',
        position: 'sticky',
        top: 0,
        zIndex: 100,
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: '0 auto',
          padding: '0 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 56,
        }}
      >
        {/* Logo */}
        <button
          onClick={() => onNavigate('home')}
          style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center', gap: 8 }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <circle cx="10" cy="8" r="5" fill="#E04F3D" stroke="#111" strokeWidth="2" />
            <rect x="9" y="12" width="2" height="7" rx="1" fill="#111" />
          </svg>
          <span
            style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 22,
              color: '#111111',
              letterSpacing: '0.01em',
            }}
          >
            Club<span style={{ color: '#E04F3D' }}>Hub</span>
          </span>
        </button>

        {/* Nav links */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {links.map(({ label, page }) => {
            const active = currentPage === page
            return (
              <button
                key={page}
                onClick={() => onNavigate(page)}
                style={{
                  background: 'none',
                  border: active ? '2px solid #111111' : '2px solid transparent',
                  cursor: 'pointer',
                  padding: '4px 12px',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 11,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: active ? '#111111' : '#555',
                  borderRadius: 0,
                  transition: 'color 0.15s',
                }}
                onMouseEnter={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = '#111' }}
                onMouseLeave={e => { if (!active) (e.currentTarget as HTMLButtonElement).style.color = '#555' }}
              >
                {label}
              </button>
            )
          })}
          <button
            onClick={() => onNavigate('events')}
            style={{
              marginLeft: 12,
              backgroundColor: '#111111',
              color: '#ffffff',
              border: '2px solid #111111',
              padding: '6px 16px',
              fontFamily: 'Space Mono, monospace',
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: '0.08em',
              cursor: 'pointer',
              boxShadow: '3px 3px 0px 0px #E04F3D',
              transition: 'transform 0.15s, box-shadow 0.15s',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.transform = 'translate(3px, 3px)'
              el.style.boxShadow = 'none'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.transform = 'none'
              el.style.boxShadow = '3px 3px 0px 0px #E04F3D'
            }}
          >
            FIND AN EVENT →
          </button>
        </div>
      </div>
    </nav>
  )
}
