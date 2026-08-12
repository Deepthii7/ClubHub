import { useState } from 'react'
import PinnedCard from '../components/PinnedCard'
import { CLUBS, EVENTS, type Page, type EventData } from '../data'

interface HomePageProps {
  onNavigate: (page: Page) => void
  onSelectEvent: (event: EventData) => void
}

export default function HomePage({ onNavigate, onSelectEvent }: HomePageProps) {
  const featured = CLUBS.slice(0, 3)
  const featuredEvents = EVENTS.slice(0, 3)
  const [hoveredCta, setHoveredCta] = useState<string | null>(null)

  return (
    <div>
      {/* Cork Hero */}
      <div
        style={{
          backgroundColor: '#B8935A',
          backgroundImage: `radial-gradient(circle at 20% 30%, rgba(255,255,255,0.04) 0%, transparent 60%), radial-gradient(circle at 80% 70%, rgba(0,0,0,0.08) 0%, transparent 50%)`,
          padding: '72px 24px 80px',
          borderBottom: '3px solid #111',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Subtle dot texture */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.12) 1px, transparent 1px)',
            backgroundSize: '22px 22px',
            pointerEvents: 'none',
          }}
        />
        <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              backgroundColor: '#E8A020',
              border: '2px solid #111',
              padding: '4px 12px',
              marginBottom: 20,
              boxShadow: '3px 3px 0px 0px #111',
            }}
          >
            <svg width="13" height="13" viewBox="0 0 20 20" fill="none">
              <circle cx="10" cy="8" r="5" fill="#111" stroke="#111" strokeWidth="1.5" />
              <rect x="9" y="12" width="2" height="7" rx="1" fill="#111" />
            </svg>
            <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', color: '#111' }}>
              12 CLUBS PINNED UP
            </span>
          </div>
          <h1
            style={{
              fontFamily: 'Anton, sans-serif',
              fontSize: 'clamp(48px, 8vw, 86px)',
              color: '#ffffff',
              margin: '0 0 20px',
              lineHeight: 1.0,
              maxWidth: 600,
            }}
          >
            Find your people on campus.
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: 16, lineHeight: 1.7, maxWidth: 440, marginBottom: 36 }}>
            Every student club, event, and announcement — printed to a flyer and pinned in one place. Browse by interest, see exactly when they meet, and show up to the next one.
          </p>
          <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <button
              onClick={() => onNavigate('directory')}
              onMouseEnter={() => setHoveredCta('dir')}
              onMouseLeave={() => setHoveredCta(null)}
              style={{
                backgroundColor: '#E04F3D',
                color: '#fff',
                border: '3px solid #111',
                padding: '12px 24px',
                fontFamily: 'Space Mono, monospace',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.08em',
                cursor: 'pointer',
                boxShadow: hoveredCta === 'dir' ? 'none' : '5px 5px 0px 0px #111',
                transform: hoveredCta === 'dir' ? 'translate(5px, 5px)' : 'none',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
            >
              BROWSE THE DIRECTORY →
            </button>
            <button
              onClick={() => onNavigate('board')}
              onMouseEnter={() => setHoveredCta('board')}
              onMouseLeave={() => setHoveredCta(null)}
              style={{
                backgroundColor: 'transparent',
                color: '#fff',
                border: '3px solid #fff',
                padding: '12px 24px',
                fontFamily: 'Space Mono, monospace',
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.08em',
                cursor: 'pointer',
                boxShadow: hoveredCta === 'board' ? 'none' : '5px 5px 0px 0px rgba(255,255,255,0.4)',
                transform: hoveredCta === 'board' ? 'translate(5px, 5px)' : 'none',
                transition: 'transform 0.15s, box-shadow 0.15s',
              }}
            >
              SEE WHAT'S FEATURED
            </button>
          </div>
        </div>
      </div>

      {/* Category strip */}
      <div
        style={{
          borderBottom: '3px solid #111',
          padding: '16px 24px',
          overflowX: 'auto',
        }}
      >
        <div style={{ display: 'flex', gap: 10, maxWidth: 1200, margin: '0 auto', flexWrap: 'wrap' }}>
          {['TECHNOLOGY', 'ARTS & CULTURE', 'SPORTS', 'ACADEMIC', 'MUSIC', 'SOCIAL IMPACT', 'GAMING', 'BUSINESS'].map(cat => (
            <button
              key={cat}
              onClick={() => onNavigate('directory')}
              className="filter-pill"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Clubs */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px 0' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#E04F3D', letterSpacing: '0.1em', marginBottom: 6 }}>
              THIS WEEK ON THE BOARD
            </p>
            <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 40, margin: 0 }}>Featured clubs</h2>
          </div>
          <button
            onClick={() => onNavigate('directory')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Space Mono, monospace', fontSize: 12, color: '#111', fontWeight: 700, letterSpacing: '0.05em' }}
          >
            VIEW ALL →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 32 }}>
          {featured.map(club => (
            <PinnedCard
              key={club.id}
              color={club.color}
              rotation={club.rotation}
              headerContent={
                <>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: club.color === '#111111' ? '#fff' : '#111' }}>
                    {club.category}
                  </span>
                  {club.status === 'RECRUITING' && (
                    <span style={{ backgroundColor: '#fff', border: '1.5px solid #111', padding: '2px 8px', fontSize: 9, fontFamily: 'Space Mono, monospace', fontWeight: 700, letterSpacing: '0.06em', color: '#111' }}>
                      RECRUITING
                    </span>
                  )}
                </>
              }
              bodyContent={
                <div>
                  <h3 style={{ fontFamily: 'Anton, sans-serif', fontSize: 26, margin: '0 0 8px', lineHeight: 1.1 }}>{club.name}</h3>
                  <p style={{ fontSize: 13, color: '#444', lineHeight: 1.6, margin: 0 }}>{club.description}</p>
                </div>
              }
              footerContent={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#666' }}>👥 {club.members}</span>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#666' }}>📍 {club.meetDay}</span>
                </div>
              }
              onClick={() => onNavigate('directory')}
            />
          ))}
        </div>
      </div>

      {/* Featured Events */}
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 32 }}>
          <div>
            <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#E04F3D', letterSpacing: '0.1em', marginBottom: 6 }}>
              UPCOMING THIS MONTH
            </p>
            <h2 style={{ fontFamily: 'Anton, sans-serif', fontSize: 40, margin: 0 }}>Featured events</h2>
          </div>
          <button
            onClick={() => onNavigate('events')}
            style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Space Mono, monospace', fontSize: 12, color: '#111', fontWeight: 700, letterSpacing: '0.05em' }}
          >
            VIEW ALL →
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 32 }}>
          {featuredEvents.map(ev => (
            <PinnedCard
              key={ev.id}
              color={ev.color}
              rotation={ev.rotation}
              onClick={() => onSelectEvent(ev)}
              headerContent={
                <>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, fontWeight: 700, letterSpacing: '0.1em', color: ev.color === '#111111' ? '#fff' : '#111' }}>
                    {ev.category}
                  </span>
                  <span style={{ backgroundColor: '#fff', border: '1.5px solid #111', padding: '2px 8px', fontSize: 9, fontFamily: 'Space Mono, monospace', fontWeight: 700, letterSpacing: '0.06em', color: '#111' }}>
                    RSVP OPEN
                  </span>
                </>
              }
              bodyContent={
                <div>
                  <h3 style={{ fontFamily: 'Anton, sans-serif', fontSize: 22, margin: '0 0 8px', lineHeight: 1.15 }}>{ev.title}</h3>
                  <p style={{ fontSize: 13, color: '#444', lineHeight: 1.6, margin: '0 0 10px' }}>{ev.description.slice(0, 80)}…</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {ev.tags.map(tag => (
                      <span key={tag} style={{ backgroundColor: '#F4EBD8', border: '1.5px solid #bbb', padding: '2px 7px', fontSize: 10, fontFamily: 'Space Mono, monospace', color: '#555' }}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              }
              footerContent={
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#666' }}>📅 {ev.date}</span>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#666' }}>📍 {ev.venue.split(',')[0]}</span>
                </div>
              }
            />
          ))}
        </div>
      </div>
    </div>
  )
}
