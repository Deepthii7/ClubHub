import PinnedCard from '../components/PinnedCard'
import { ANNOUNCEMENTS } from '../data'

const PRIORITY_LABELS: Record<string, string> = {
  HIGH: 'HIGH PRIORITY',
  MEDIUM: 'MEDIUM PRIORITY',
  LOW: 'LOW PRIORITY',
}

export default function BoardPage() {
  const highPriority = ANNOUNCEMENTS.filter(a => a.priority === 'HIGH')
  const rest = ANNOUNCEMENTS.filter(a => a.priority !== 'HIGH')

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: '56px 24px' }}>
      {/* Hero header */}
      <div style={{ marginBottom: 48 }}>
        <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 11, color: '#E04F3D', letterSpacing: '0.1em', marginBottom: 8 }}>
          FRESH OFF THE BOARD
        </p>
        <h1 style={{ fontFamily: 'Anton, sans-serif', fontSize: 'clamp(36px, 6vw, 60px)', margin: '0 0 12px', lineHeight: 1.0, maxWidth: 700 }}>
          This Week on the Board: Featured Announcements
        </h1>
        <p style={{ color: '#555', fontSize: 15, lineHeight: 1.7, maxWidth: 520 }}>
          Official notices, recruitment posts, and club updates — pinned fresh every week. Click any flyer to read more.
        </p>
      </div>

      {/* High priority section */}
      {highPriority.length > 0 && (
        <div style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
            <span
              style={{
                backgroundColor: '#E04F3D',
                color: '#fff',
                padding: '4px 12px',
                fontFamily: 'Space Mono, monospace',
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.1em',
                border: '2px solid #111',
                boxShadow: '3px 3px 0px 0px #111',
              }}
            >
              🔴 HIGH PRIORITY
            </span>
            <div style={{ flex: 1, height: 2, backgroundColor: '#E04F3D' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 36 }}>
            {highPriority.map(ann => (
              <PinnedCard
                key={ann.id}
                color={ann.color}
                rotation={ann.rotation}
                headerContent={
                  <>
                    <div>
                      <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: ann.color === '#111111' ? '#999' : 'rgba(0,0,0,0.5)', letterSpacing: '0.08em', margin: '0 0 2px' }}>
                        POSTED BY
                      </p>
                      <span style={{ fontFamily: 'Anton, sans-serif', fontSize: 18, color: ann.color === '#111111' ? '#fff' : '#111', letterSpacing: '0.01em' }}>
                        {ann.org}
                      </span>
                    </div>
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
                      {PRIORITY_LABELS[ann.priority]}
                    </span>
                  </>
                }
                bodyContent={
                  <div>
                    <h3 style={{ fontFamily: 'Anton, sans-serif', fontSize: 22, margin: '0 0 10px', lineHeight: 1.15 }}>{ann.title}</h3>
                    <p style={{ fontSize: 13, color: '#444', lineHeight: 1.7, margin: 0 }}>{ann.description}</p>
                  </div>
                }
                footerContent={
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#666' }}>📅 {ann.date}</span>
                      <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#666' }}>🕐 {ann.time}</span>
                    </div>
                    <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#666' }}>📍 {ann.location}</span>
                  </div>
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Divider */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 16,
          marginBottom: 36,
        }}
      >
        <div style={{ flex: 1, height: 2, backgroundColor: '#ddd' }} />
        <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#888', letterSpacing: '0.1em', whiteSpace: 'nowrap' }}>
          MORE ON THE BOARD
        </span>
        <div style={{ flex: 1, height: 2, backgroundColor: '#ddd' }} />
      </div>

      {/* Rest of announcements */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: 36 }}>
        {rest.map(ann => (
          <PinnedCard
            key={ann.id}
            color={ann.color}
            rotation={ann.rotation}
            headerContent={
              <>
                <div>
                  <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: ann.color === '#111111' ? '#999' : 'rgba(0,0,0,0.5)', letterSpacing: '0.08em', margin: '0 0 2px' }}>
                    POSTED BY
                  </p>
                  <span style={{ fontFamily: 'Anton, sans-serif', fontSize: 18, color: ann.color === '#111111' ? '#fff' : '#111', letterSpacing: '0.01em' }}>
                    {ann.org}
                  </span>
                </div>
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
                  {PRIORITY_LABELS[ann.priority]}
                </span>
              </>
            }
            bodyContent={
              <div>
                <h3 style={{ fontFamily: 'Anton, sans-serif', fontSize: 22, margin: '0 0 10px', lineHeight: 1.15 }}>{ann.title}</h3>
                <p style={{ fontSize: 13, color: '#444', lineHeight: 1.7, margin: 0 }}>{ann.description}</p>
              </div>
            }
            footerContent={
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#666' }}>📅 {ann.date}</span>
                  <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#666' }}>🕐 {ann.time}</span>
                </div>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#666' }}>📍 {ann.location}</span>
              </div>
            }
          />
        ))}
      </div>
    </div>
  )
}
