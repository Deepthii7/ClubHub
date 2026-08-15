import { useEffect, useState } from 'react'
import PinnedCard from '../components/PinnedCard'
import api from '../api'
import type { Page } from '../data'
const ALL_CATEGORIES = ['ALL', 'TECHNOLOGY', 'ARTS & CULTURE', 'SPORTS', 'ACADEMIC', 'MUSIC', 'SOCIAL IMPACT', 'GAMING', 'BUSINESS']

interface DirectoryPageProps {
  onNavigate?: (page: Page) => void
}

export default function DirectoryPage({ onNavigate: _onNavigate }: DirectoryPageProps) {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState('ALL')
  const [clubs, setClubs] = useState<any[]>([])
  const [selectedClub, setSelectedClub] = useState<any | null>(null)
  useEffect(() => {
    api.get('/clubs')
      .then(response => {
        console.log('Backend clubs:', response.data)
        setClubs(response.data)
      })
      .catch(error => {
        console.error('Failed to fetch clubs:', error)
      })
  }, [])
  const filtered = clubs.filter(club => {
    const matchCat = activeCategory === 'ALL' || club.category === activeCategory
    const matchSearch = club.name.toLowerCase().includes(search.toLowerCase()) ||
      club.category.toLowerCase().includes(search.toLowerCase()) ||
      club.description.toLowerCase().includes(search.toLowerCase())
    return matchCat && matchSearch
  })

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px' }}>
      {/* Page header */}
      <div style={{ marginBottom: 40 }}>
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#E04F3D', letterSpacing: '0.1em', marginBottom: 8 }}>
          THE FULL BOARD
        </p>
        <h1 style={{ fontFamily: 'Anton, sans-serif', fontSize: 52, margin: '0 0 12px' }}>Club Directory</h1>
        <p style={{ color: '#555', fontSize: 15, lineHeight: 1.7, maxWidth: 520 }}>
          Search by name or interest, filter by category, and click any flyer to see meeting times, officers, and how to join.
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
          placeholder="Search clubs, tags, vibes..."
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
        {ALL_CATEGORIES.map(cat => (
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
        {filtered.length} {filtered.length === 1 ? 'CLUB' : 'CLUBS'} FOUND
      </p>

      {/* Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 36 }}>
        {filtered.map(club => (
          <PinnedCard
            key={club.id}
            color={club.color}
            rotation={club.rotation}
            onClick={() => setSelectedClub(club)}
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
          />
        ))}
      </div>

      {filtered.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 0', color: '#888' }}>
          <p style={{ fontFamily: 'Anton, sans-serif', fontSize: 32, marginBottom: 12 }}>Nothing pinned here.</p>
          <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 12 }}>Try a different search or category.</p>
        </div>
      )}
          {selectedClub && (
        <div
          onClick={() => setSelectedClub(null)}
          style={{
            position: 'fixed',
            inset: 0,
            backgroundColor: 'rgba(0,0,0,0.65)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: 24,
          }}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: 560,
              backgroundColor: '#fff',
              border: '3px solid #111',
              boxShadow: '10px 10px 0 #111',
            }}
          >
            <div
              style={{
                backgroundColor: selectedClub.color,
                padding: '24px 28px',
                borderBottom: '3px solid #111',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                gap: 20,
              }}
            >
              <div>
                <p
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.1em',
                    margin: '0 0 8px',
                    color: selectedClub.color === '#111111' ? '#fff' : '#111',
                  }}
                >
                  {selectedClub.category}
                </p>

                <h2
                  style={{
                    fontFamily: 'Anton, sans-serif',
                    fontSize: 34,
                    lineHeight: 1.05,
                    margin: 0,
                    color: selectedClub.color === '#111111' ? '#fff' : '#111',
                  }}
                >
                  {selectedClub.name}
                </h2>
              </div>

              <button
                onClick={() => setSelectedClub(null)}
                style={{
                  width: 38,
                  height: 38,
                  backgroundColor: '#fff',
                  border: '2px solid #111',
                  fontFamily: 'Space Mono, monospace',
                  fontWeight: 700,
                  cursor: 'pointer',
                  flexShrink: 0,
                }}
              >
                ×
              </button>
            </div>

            <div style={{ padding: 28 }}>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: '#444',
                  margin: '0 0 24px',
                }}
              >
                {selectedClub.description}
              </p>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 14,
                  marginBottom: 24,
                }}
              >
                <div
                  style={{
                    border: '2px solid #111',
                    padding: 16,
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: 9,
                      color: '#888',
                      margin: '0 0 6px',
                      letterSpacing: '0.08em',
                    }}
                  >
                    MEMBERS
                  </p>

                  <strong
                    style={{
                      fontFamily: 'Anton, sans-serif',
                      fontSize: 24,
                    }}
                  >
                    {selectedClub.members}
                  </strong>
                </div>

                <div
                  style={{
                    border: '2px solid #111',
                    padding: 16,
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: 9,
                      color: '#888',
                      margin: '0 0 6px',
                      letterSpacing: '0.08em',
                    }}
                  >
                    MEETS
                  </p>

                  <strong
                    style={{
                      fontFamily: 'Space Mono, monospace',
                      fontSize: 13,
                    }}
                  >
                    {selectedClub.meetDay}
                  </strong>
                </div>
              </div>

              <div
                style={{
                  borderTop: '2px dashed #bbb',
                  paddingTop: 20,
                }}
              >
                <p
                  style={{
                    fontFamily: 'Space Mono, monospace',
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: '0.08em',
                    margin: '0 0 10px',
                  }}
                >
                  HOW TO JOIN
                </p>

                <p
                  style={{
                    fontSize: 13,
                    color: '#555',
                    lineHeight: 1.6,
                    margin: 0,
                  }}
                >
                  {selectedClub.status === 'RECRUITING'
                    ? 'This club is currently recruiting. Contact the club representatives or attend their next meeting to join.'
                    : 'This club is currently closed for recruitment. Check back later for new openings.'}
                </p>
              </div>

              <button
                onClick={() => setSelectedClub(null)}
                style={{
                  width: '100%',
                  marginTop: 24,
                  padding: '14px 20px',
                  backgroundColor: '#111',
                  color: '#fff',
                  border: 'none',
                  boxShadow: '5px 5px 0 #E04F3D',
                  fontFamily: 'Space Mono, monospace',
                  fontWeight: 700,
                  fontSize: 12,
                  cursor: 'pointer',
                  letterSpacing: '0.06em',
                }}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
