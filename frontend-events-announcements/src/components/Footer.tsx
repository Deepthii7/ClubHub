import type { Page } from '../data'

interface FooterProps {
  onNavigate: (page: Page) => void
}

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer style={{ backgroundColor: '#111111', color: '#ffffff', padding: '64px 24px 32px' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* CTA row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 24,
            paddingBottom: 48,
            borderBottom: '2px solid #333',
          }}
        >
          <div>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#888', letterSpacing: '0.1em', marginBottom: 8 }}>
              THIS WEEK ON THE BOARD
            </p>
            <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 36, margin: 0, lineHeight: 1.1 }}>
              Can't find your event yet?
            </h2>
            <p style={{ color: '#aaa', marginTop: 8, fontSize: 14, lineHeight: 1.6 }}>
              New events get pinned every week. Check the full board<br />or reach out to Student Life to post one.
            </p>
          </div>
          <button
            onClick={() => onNavigate('events')}
            style={{
              backgroundColor: '#E8A020',
              color: '#111',
              border: '3px solid #E8A020',
              padding: '12px 28px',
              fontFamily: 'Space Mono, monospace',
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.08em',
              cursor: 'pointer',
              boxShadow: '5px 5px 0px 0px #E04F3D',
              transition: 'transform 0.15s, box-shadow 0.15s',
              whiteSpace: 'nowrap',
            }}
            onMouseEnter={e => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.transform = 'translate(5px, 5px)'
              el.style.boxShadow = 'none'
            }}
            onMouseLeave={e => {
              const el = e.currentTarget as HTMLButtonElement
              el.style.transform = 'none'
              el.style.boxShadow = '5px 5px 0px 0px #E04F3D'
            }}
          >
            OPEN EVENTS BOARD →
          </button>
        </div>

        {/* Footer columns */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
            gap: 40,
            paddingTop: 40,
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="8" r="5" fill="#E04F3D" stroke="#E04F3D" strokeWidth="1.5" />
                <rect x="9" y="12" width="2" height="7" rx="1" fill="#E04F3D" />
              </svg>
              <span style={{ fontFamily: 'Anton, sans-serif', fontSize: 18, color: '#fff' }}>
                Club<span style={{ color: '#E04F3D' }}>Hub</span>
              </span>
            </div>
            <p style={{ color: '#888', fontSize: 13, lineHeight: 1.7 }}>
              Every student club and event on campus, pinned in one place.
              Find your people, see when they meet, and show up.
            </p>
          </div>
          <div>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#555', letterSpacing: '0.1em', marginBottom: 16 }}>BROWSE</p>
            {(['Home', 'Club Directory', 'Events Board', 'Announcements'] as const).map(label => (
              <button
                key={label}
                onClick={() => {
                  const map: Record<string, Page> = { 'Home': 'home', 'Club Directory': 'directory', 'Events Board': 'events', 'Announcements': 'board' }
                  onNavigate(map[label])
                }}
                style={{ display: 'block', background: 'none', border: 'none', color: '#aaa', fontSize: 14, cursor: 'pointer', padding: '4px 0', textAlign: 'left' }}
              >
                {label}
              </button>
            ))}
          </div>
          <div>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#555', letterSpacing: '0.1em', marginBottom: 16 }}>GET IN TOUCH</p>
            <p style={{ color: '#aaa', fontSize: 13, lineHeight: 2 }}>
              ✉ studentlife@campus.edu<br />
              ⚙ @campusstudentlife<br />
              📍 Student Services, Block A
            </p>
          </div>
        </div>

        <div style={{ borderTop: '1px solid #222', marginTop: 40, paddingTop: 24, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
          <p style={{ color: '#444', fontSize: 12, fontFamily: 'Space Mono, monospace' }}>
            © 2026 ClubHub · Office of Student Life
          </p>
          <p style={{ color: '#444', fontSize: 12, fontFamily: 'Space Mono, monospace' }}>
            Built for students, by students.
          </p>
        </div>
      </div>
    </footer>
  )
}
