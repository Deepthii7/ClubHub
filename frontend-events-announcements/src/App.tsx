import { useState } from 'react'
import Nav from './components/Nav'
import Footer from './components/Footer'
import HomePage from './pages/HomePage'
import DirectoryPage from './pages/DirectoryPage'
import BoardPage from './pages/BoardPage'
import EventsPage from './pages/EventsPage'
import RegistrationModal from './components/RegistrationModal'
import type { Page, EventData } from './data'

export default function App() {
  const [page, setPage] = useState<Page>(() => {
    const path = window.location.pathname

    if (path === '/events') return 'events'
    if (path === '/directory') return 'directory'
    if (path === '/board') return 'board'

    return 'home'
  })
  const [selectedEvent, setSelectedEvent] = useState<EventData | null>(null)

  const navigate = (p: Page) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div style={{ backgroundColor: '#EDE8DC', minHeight: '100vh' }}>
      <Nav currentPage={page} onNavigate={navigate} />

      {page === 'home' && (
        <HomePage onNavigate={navigate} onSelectEvent={setSelectedEvent} />
      )}
      {page === 'directory' && (
        <DirectoryPage onNavigate={navigate} />
      )}
      {page === 'board' && (
        <BoardPage />
      )}
      {page === 'events' && (
        <EventsPage onSelectEvent={setSelectedEvent} />
      )}

      <Footer onNavigate={navigate} />

      {selectedEvent && (
        <RegistrationModal
          event={selectedEvent}
          onClose={() => setSelectedEvent(null)}
        />
      )}
    </div>
  )
}
