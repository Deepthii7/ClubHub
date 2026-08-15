import { useState } from 'react'
import type { EventData } from '../data'

interface RegistrationModalProps {
  event: EventData
  onClose: () => void
}

interface FormState {
  fullName: string
  studentId: string
  email: string
  github: string
}

export default function RegistrationModal({ event, onClose }: RegistrationModalProps) {
  const [form, setForm] = useState<FormState>({ fullName: '', studentId: '', email: '', github: '' })
  const [submitted, setSubmitted] = useState(false)
  const [hovering, setHovering] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.fullName || !form.studentId || !form.email) return

    try {
      const response = await fetch(
        `http://localhost:5001/api/events/${event.id}/register`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            name: form.fullName,
            email: form.email,
            phone: '',
            rollNo: form.studentId,
          }),
        }
      )

      if (!response.ok) {
        throw new Error('Registration failed')
      }

      setSubmitted(true)
    } catch (error) {
      console.error('Registration error:', error)
      alert('Registration failed. Please try again.')
    } 
}

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '12px 14px',
    border: '3px solid #111',
    backgroundColor: '#fff',
    fontFamily: 'Inter, sans-serif',
    fontSize: 14,
    outline: 'none',
    boxShadow: '4px 4px 0px 0px #111',
    transition: 'box-shadow 0.15s, transform 0.15s',
    display: 'block',
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontFamily: 'Space Mono, monospace',
    fontSize: 10,
    fontWeight: 700,
    letterSpacing: '0.1em',
    color: '#111',
    marginBottom: 6,
  }

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'rgba(0,0,0,0.6)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: '20px',
      }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}
    >
      <div
        style={{
          backgroundColor: '#fff',
          border: '4px solid #111',
          boxShadow: '12px 12px 0px 0px #111',
          width: '100%',
          maxWidth: 520,
          maxHeight: '90vh',
          overflowY: 'auto',
          position: 'relative',
        }}
      >
        {/* Modal header — colored like the event */}
        <div
          style={{
            backgroundColor: event.color,
            padding: '20px 24px',
            borderBottom: '3px solid #111',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <p style={{
                fontFamily: 'Space Mono, monospace',
                fontSize: 9,
                color: event.color === '#111111' ? '#999' : 'rgba(0,0,0,0.55)',
                letterSpacing: '0.1em',
                margin: '0 0 4px',
              }}>
                REGISTERING FOR
              </p>
              <h2 style={{
                fontFamily: 'Anton, sans-serif',
                fontSize: 22,
                color: event.color === '#111111' ? '#fff' : '#111',
                margin: 0,
                lineHeight: 1.15,
                maxWidth: 380,
              }}>
                {event.title}
              </h2>
              <div style={{ display: 'flex', gap: 16, marginTop: 8 }}>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: event.color === '#111111' ? '#aaa' : '#333' }}>
                  📅 {event.date}
                </span>
                <span style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: event.color === '#111111' ? '#aaa' : '#333' }}>
                  📍 {event.venue.split(',')[0]}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              style={{
                background: '#fff',
                border: '2px solid #111',
                width: 32,
                height: 32,
                cursor: 'pointer',
                fontFamily: 'Anton, sans-serif',
                fontSize: 16,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                boxShadow: '2px 2px 0px 0px #111',
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Form body */}
        <div style={{ padding: '28px 24px' }}>
          {submitted ? (
            <div style={{ textAlign: 'center', padding: '32px 0' }}>
              <div style={{
                width: 60,
                height: 60,
                backgroundColor: '#2D6A4F',
                border: '3px solid #111',
                boxShadow: '4px 4px 0px 0px #111',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
                fontSize: 28,
              }}>
                ✓
              </div>
              <h3 style={{ fontFamily: 'Anton, sans-serif', fontSize: 30, margin: '0 0 12px' }}>You're registered!</h3>
              <p style={{ color: '#555', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>
                A confirmation has been sent to <strong>{form.email}</strong>.<br />
                Check your college email for event details and updates.
              </p>
              <button
                onClick={onClose}
                style={{
                  backgroundColor: '#111',
                  color: '#fff',
                  border: '3px solid #111',
                  padding: '12px 32px',
                  fontFamily: 'Space Mono, monospace',
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  cursor: 'pointer',
                  boxShadow: '4px 4px 0px 0px #E04F3D',
                }}
              >
                CLOSE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div>
                  <label style={labelStyle}>FULL NAME <span style={{ color: '#E04F3D' }}>*</span></label>
                  <input
                    type="text"
                    placeholder="Arjun Sharma"
                    required
                    value={form.fullName}
                    onChange={e => setForm(f => ({ ...f, fullName: e.target.value }))}
                    style={inputStyle}
                    className="brute-input"
                  />
                </div>

                <div>
                  <label style={labelStyle}>STUDENT ID <span style={{ color: '#E04F3D' }}>*</span></label>
                  <input
                    type="text"
                    placeholder="CS2024001"
                    required
                    value={form.studentId}
                    onChange={e => setForm(f => ({ ...f, studentId: e.target.value }))}
                    style={inputStyle}
                    className="brute-input"
                  />
                </div>

                <div>
                  <label style={labelStyle}>EMAIL ADDRESS <span style={{ color: '#E04F3D' }}>*</span></label>
                  <input
                    type="email"
                    placeholder="arjun@campus.edu"
                    required
                    value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                    style={inputStyle}
                    className="brute-input"
                  />
                </div>

                <div>
                  <label style={labelStyle}>
                    GITHUB URL
                    <span style={{ color: '#888', fontWeight: 400, marginLeft: 6 }}>(optional)</span>
                  </label>
                  <input
                    type="url"
                    placeholder="https://github.com/username"
                    value={form.github}
                    onChange={e => setForm(f => ({ ...f, github: e.target.value }))}
                    style={inputStyle}
                    className="brute-input"
                  />
                </div>

                {/* Tech tags reminder */}
                {event.tags.length > 0 && (
                  <div style={{ backgroundColor: '#F4EBD8', border: '2px solid #ddd', padding: '12px 14px' }}>
                    <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 9, color: '#888', letterSpacing: '0.1em', margin: '0 0 6px' }}>
                      THIS EVENT INVOLVES
                    </p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {event.tags.map(tag => (
                        <span key={tag} style={{
                          backgroundColor: '#fff',
                          border: '1.5px solid #bbb',
                          padding: '2px 8px',
                          fontSize: 11,
                          fontFamily: 'Space Mono, monospace',
                          color: '#555',
                        }}>
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Submit */}
                <button
                  type="submit"
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                  style={{
                    width: '100%',
                    backgroundColor: '#E04F3D',
                    color: '#fff',
                    border: '3px solid #111',
                    padding: '16px',
                    fontFamily: 'Anton, sans-serif',
                    fontSize: 22,
                    letterSpacing: '0.05em',
                    cursor: 'pointer',
                    boxShadow: hovering ? 'none' : '6px 6px 0px 0px #111',
                    transform: hovering ? 'translate(6px, 6px)' : 'none',
                    transition: 'transform 0.15s, box-shadow 0.15s',
                    marginTop: 4,
                  }}
                >
                  SECURE MY SPOT →
                </button>

                <p style={{ fontFamily: 'Space Mono, monospace', fontSize: 10, color: '#aaa', textAlign: 'center', letterSpacing: '0.05em' }}>
                  BY REGISTERING YOU AGREE TO RECEIVE EVENT COMMUNICATIONS
                </p>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  )
}
