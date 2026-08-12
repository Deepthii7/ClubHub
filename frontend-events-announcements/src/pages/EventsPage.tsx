import { useState } from 'react'
import PinnedCard from '../components/PinnedCard'
import { EVENTS, type EventData } from '../data'

const CATEGORIES = ['ALL', 'SOFTWARE', 'HARDWARE', 'AI/ML', 'CYBERSECURITY']

interface EventsPageProps {
  onSelectEvent: (event: EventData) => void
}

export default function EventsPage({ onSelectEvent }: EventsPageProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('ALL')

  const filtered = EVENTS.filter(ev => {
    const matchCat = activeCategory === 'ALL' || ev.category === activeCategory
    const matchSearch =
      ev.title.toLowerCase().includes(search.toLowerCase()) ||
      ev.category.toLowerCase().includes(search.toLowerCase()) ||
      ev.org.toLowerCase().includes(search.toLowerCase()) ||
      ev.tags.some(t => t.toLowerCase().includes(search.toLowerCase()))
    return matchCat && matchSearch
  })

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px' }}>
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#E04F3D', letterSpacing: '0.1em', marginBottom: 8 }}>
          UPCOMING EVENTS
        </p>
        <h1 style={{ fontFamily: 'Anton, sans-serif', fontSize: 52, margin: '0 0 12px' }}>Events Directory</h1>
        <p style={{ color: '#555', fontSize: 15, lineHeight: 1.7, maxWidth: 520 }}>
          Hackathons, workshops, makeathons, and CTFs — all in one place. Click any flyer to register.
        </p>
      </div>

      {/* Search */}
      <div style={{ position: 'relative', marginBottom: 20, maxWidth: 540 }}>
        <svg
          style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2.5" strokeLinecap="round"
        >
          <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <input
          type="text"
          placeholder="Search events, tags, tech stacks..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="brute-input"
          style={{
            width: '100%',
            padding: '12px 16px 12px 42px',
            border: '3px solid #111',
            backgroundColor: '#fff',
            fontFamily: 'Inter, sans-serif',
            fontSize: 14,
            boxShadow: '5px 5px 0px 0px #111',
            outline: 'none',
          }}
        />
      </div>

      {/* Category filters */}
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 32 }}>
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`filter-pill ${activeCategory === cat ? 'active' : ''}`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Count */}
      <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#888', letterSpacing: '0.08em', marginBottom: 28 }}>
        {filtered.length} {filtered.length === 1 ? 'EVENT' : 'EVENTS'} FOUND
      </p>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 36 }}>
        {filtered.map(ev => (
          <PinnedCard
            key={ev.id}
            color={ev.color}
            rotation={ev.rotation}
            onClick={() => onSelectEvent(ev)}
            headerContent={
              <>
                <div>
                  <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: ev.color === '#111111' ? '#999' : 'rgba(0,0,0,0.5)', letterSpacing: '0.08em', margin: '0 0 2px' }}>
                    HOSTED BY
                  </p>
                  <span style={{ fontFamily: 'Anton, sans-serif', fontSize: 16, color: ev.color === '#111111' ? '#fff' : '#111', letterSpacing: '0.01em' }}>
                    {ev.org}
                  </span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                  <span
                    style={{
                      backgroundColor: '#fff',
                      border: '1.5px solid #111',
                      padding: '3px 8px',
                      fontSize: 8,
                      fontFamily: 'Space Mono, monospace',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      color: '#111',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    RSVP OPEN
                  </span>
                  <span
                    style={{
                      backgroundColor: 'transparent',
                      border: '1.5px solid rgba(255,255,255,0.5)',
                      padding: '2px 7px',
                      fontSize: 8,
                      fontFamily: 'Space Mono, monospace',
                      fontWeight: 700,
                      letterSpacing: '0.06em',
                      color: ev.color === '#111111' ? '#fff' : '#111',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {ev.category}
                  </span>
                </div>
              </>
            }
            bodyContent={
              <div>
                <h3 style={{ fontFamily: 'Anton, sans-serif', fontSize: 22, margin: '0 0 10px', lineHeight: 1.15 }}>{ev.title}</h3>
                <p style={{ fontSize: 13, color: '#444', lineHeight: 1.7, margin: '0 0 12px' }}>{ev.description}</p>
                {/* Tech stack tags */}
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {ev.tags.map(tag => (
                    <span
                      key={tag}
                      style={{
                        backgroundColor: '#F4EBD8',
                        border: '1.5px solid #bbb',
                        padding: '2px 8px',
                        fontSize: 10,
                        fontFamily: 'Space Mono, monospace',
                        color: '#555',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            }
            footerContent={
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#666' }}>📅 {ev.date}</span>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#666' }}>🕐 {ev.time.split('—')[0].trim()}</span>
                </div>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#666' }}>📍 {ev.venue}</span>
              </div>
            }
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#888' }}>
          <p style={{ fontFamily: 'Anton, sans-serif', fontSize: 32, marginBottom: 12 }}>Nothing pinned here.</p>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 12 }}>Try a different search or category.</p>
        </div>
      )}
    </div>
  )
}
