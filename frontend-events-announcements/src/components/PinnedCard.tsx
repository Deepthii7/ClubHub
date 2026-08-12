import { useState } from 'react'

interface PinnedCardProps {
  color: string
  rotation: number
  headerContent: React.ReactNode
  bodyContent: React.ReactNode
  footerContent: React.ReactNode
  onClick?: () => void
}

export function PushPin() {
  return (
    <div
      style={{
        width: 16,
        height: 16,
        borderRadius: '50%',
        backgroundColor: '#DC2626',
        border: '2.5px solid #111111',
        boxShadow: '2px 2px 0px 0px #000',
        position: 'absolute',
        top: -8,
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 10,
        flexShrink: 0,
      }}
    />
  )
}

export default function PinnedCard({ color, rotation, headerContent, bodyContent, footerContent, onClick }: PinnedCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{ position: 'relative', paddingTop: 12 }}>
      <PushPin />
      <div
        className="pinned-card"
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          transform: hovered ? 'rotate(0deg) translateY(-4px)' : `rotate(${rotation}deg)`,
          boxShadow: hovered ? '10px 10px 0px 0px #111111' : '6px 6px 0px 0px #111111',
          border: '3px solid #111111',
          overflow: 'hidden',
          backgroundColor: '#ffffff',
          cursor: onClick ? 'pointer' : 'default',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
        }}
      >
        {/* Colored header */}
        <div
          style={{
            backgroundColor: color,
            padding: '12px 14px',
            minHeight: 52,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          {headerContent}
        </div>

        {/* White body */}
        <div style={{ backgroundColor: '#ffffff', padding: '16px 14px 0' }}>
          {bodyContent}
        </div>

        {/* Dashed divider + footer */}
        <div style={{ backgroundColor: '#ffffff', padding: '0 14px 14px' }}>
          <div
            style={{
              borderTop: '2px dashed #bbb',
              marginTop: 14,
              paddingTop: 10,
            }}
          >
            {footerContent}
          </div>
        </div>
      </div>
    </div>
  )
}
