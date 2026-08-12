export type Page = 'home' | 'directory' | 'board' | 'events'

export type CardColor = '#E04F3D' | '#E8A020' | '#2D6A4F' | '#111111'

export interface Club {
  id: number
  name: string
  category: string
  description: string
  members: number
  meetDay: string
  color: CardColor
  rotation: number
  status: 'RECRUITING' | 'CLOSED'
}

export interface EventData {
  id: number
  title: string
  category: string
  org: string
  description: string
  date: string
  time: string
  venue: string
  tags: string[]
  color: CardColor
  rotation: number
}

export interface Announcement {
  id: number
  title: string
  org: string
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  description: string
  date: string
  time: string
  location: string
  color: CardColor
  rotation: number
}

export const CLUBS: Club[] = [
  { id: 1, name: 'Checkpoint', category: 'GAMING', description: 'Ranked by day, board games by night.', members: 211, meetDay: 'Saturdays', color: '#E04F3D', rotation: -1.5, status: 'RECRUITING' },
  { id: 2, name: 'Code Collective', category: 'TECHNOLOGY', description: 'Build things that break, then fix them together.', members: 184, meetDay: 'Tuesdays', color: '#E8A020', rotation: 1, status: 'RECRUITING' },
  { id: 3, name: 'Debate Union', category: 'ACADEMIC', description: 'Argue better. Lose gracefully. Win often.', members: 41, meetDay: 'Thursdays', color: '#111111', rotation: -0.5, status: 'CLOSED' },
  { id: 4, name: 'Founders Society', category: 'BUSINESS', description: 'Pitch decks over pizza.', members: 129, meetDay: 'Tuesdays', color: '#E8A020', rotation: 2, status: 'RECRUITING' },
  { id: 5, name: 'Low-Fi Collective', category: 'MUSIC', description: 'Bedroom producers, open mic, one shared drum machine.', members: 58, meetDay: 'Fridays', color: '#E8A020', rotation: -2, status: 'RECRUITING' },
  { id: 6, name: 'Midnight Players', category: 'ARTS & CULTURE', description: 'Late rehearsals, louder curtain calls.', members: 62, meetDay: 'Mon & Wed', color: '#E04F3D', rotation: 0.5, status: 'RECRUITING' },
  { id: 7, name: 'Print Guild', category: 'ARTS & CULTURE', description: 'Risograph, screen print, and hand-lettering in the studio.', members: 34, meetDay: 'Saturdays', color: '#E04F3D', rotation: -1, status: 'RECRUITING' },
  { id: 8, name: 'Quiz League', category: 'ACADEMIC', description: 'Intercollegiate trivia. No subject is off limits.', members: 78, meetDay: 'Wednesdays', color: '#E8A020', rotation: 1.5, status: 'RECRUITING' },
  { id: 9, name: 'Riverside Rowing', category: 'SPORTS', description: 'Early mornings, strong arms, stronger coffee.', members: 45, meetDay: 'Mon–Fri', color: '#2D6A4F', rotation: -1.5, status: 'CLOSED' },
  { id: 10, name: 'Wildline Outdoors', category: 'SPORTS', description: 'Trailheads, tents, and terrible camp coffee.', members: 96, meetDay: 'Sundays', color: '#2D6A4F', rotation: 1, status: 'RECRUITING' },
  { id: 11, name: 'Roots Mutual Aid', category: 'SOCIAL IMPACT', description: 'Small actions, organized well.', members: 73, meetDay: 'Wednesdays', color: '#2D6A4F', rotation: -0.5, status: 'RECRUITING' },
  { id: 12, name: 'CyberCell', category: 'TECHNOLOGY', description: 'Hack for defence. Defend against hacks.', members: 52, meetDay: 'Thursdays', color: '#111111', rotation: 2, status: 'RECRUITING' },
]

export const EVENTS: EventData[] = [
  {
    id: 1,
    title: 'SmartCampus-AI Hackathon: Build the Future',
    category: 'AI/ML',
    org: 'TechVayuna',
    description: '48-hour hackathon to build AI-powered solutions for real campus problems. Teams of 2–4. Cash prizes + internship referrals for top 3 teams.',
    date: 'Aug 23, 2026',
    time: '9:00 AM — 48 hrs',
    venue: 'Innovation Hub, Block C',
    tags: ['Python', 'Supabase', 'OpenAI API'],
    color: '#E04F3D',
    rotation: -1.5,
  },
  {
    id: 2,
    title: 'Semiconductor & Hardware Mini-Makeathon',
    category: 'HARDWARE',
    org: 'CircuitCrew',
    description: 'Build real circuits, prototype hardware, and demo on breadboards. Component kits provided. MOSFETs and oscilloscopes in the lab.',
    date: 'Sep 5, 2026',
    time: '10:00 AM — 6:00 PM',
    venue: 'ECE Lab, Room 204',
    tags: ['MOSFETs', 'Circuits', 'Arduino'],
    color: '#2D6A4F',
    rotation: 1.5,
  },
  {
    id: 3,
    title: 'Cybersecurity Capture The Flag — 48 Hours',
    category: 'CYBERSECURITY',
    org: 'CyberCell',
    description: 'Jeopardy-style CTF spanning web exploitation, reverse engineering, cryptography, and forensics. Solo or team. Beginner bracket available.',
    date: 'Sep 12, 2026',
    time: '8:00 PM — 48 hrs',
    venue: 'Online + Server Room',
    tags: ['Kali Linux', 'Burp Suite', 'Wireshark'],
    color: '#111111',
    rotation: -0.5,
  },
  {
    id: 4,
    title: 'Open Source Sprint: Contribute & Ship',
    category: 'SOFTWARE',
    org: 'Code Collective',
    description: 'Pick an open-source project, make a meaningful PR, and ship it before sunset. Mentors available for first-time contributors.',
    date: 'Sep 19, 2026',
    time: '11:00 AM — 5:00 PM',
    venue: 'CS Block, Collab Room 3',
    tags: ['Git', 'Node.js', 'Python'],
    color: '#E8A020',
    rotation: 2,
  },
  {
    id: 5,
    title: 'Intro to Embedded Systems Workshop',
    category: 'HARDWARE',
    org: 'CircuitCrew',
    description: 'Hands-on intro to microcontrollers. Program your first LED matrix, ultrasonic sensor, and motor driver. Kits included in the ₹100 registration fee.',
    date: 'Aug 30, 2026',
    time: '2:00 PM — 5:00 PM',
    venue: 'Robotics Lab, Block D',
    tags: ['ESP32', 'C++', 'MicroPython'],
    color: '#E04F3D',
    rotation: -2,
  },
  {
    id: 6,
    title: 'ML Model Deployment Bootcamp',
    category: 'AI/ML',
    org: 'DataBridge',
    description: 'Take a trained model from Jupyter to a live API endpoint. Cover FastAPI, Docker basics, and cloud deploy on Render. Bring a laptop.',
    date: 'Sep 3, 2026',
    time: '10:00 AM — 1:00 PM',
    venue: 'Seminar Hall A',
    tags: ['FastAPI', 'Docker', 'Render'],
    color: '#2D6A4F',
    rotation: 1,
  },
]

export const ANNOUNCEMENTS: Announcement[] = [
  {
    id: 1,
    title: 'Core Team Recruitment: C++ & Python Devs Wanted',
    org: 'TechVayuna',
    priority: 'HIGH',
    description: "Building our core dev team for this semester. We need developers with strong C++ and Python skills to work on embedded systems and data pipelines. Apply before Aug 20.",
    date: 'Aug 10, 2026',
    time: 'Open until Aug 20',
    location: 'Main Lab, Room 101',
    color: '#E04F3D',
    rotation: -1.5,
  },
  {
    id: 2,
    title: 'Looking for 2 Devs with STL Experience',
    org: 'AlgoClub',
    priority: 'MEDIUM',
    description: 'Joint project with TechVayuna needs 2 developers familiar with the C++ Standard Template Library. Competitive programming background a plus.',
    date: 'Aug 11, 2026',
    time: 'Flexible schedule',
    location: 'Remote / Discord',
    color: '#E8A020',
    rotation: 1,
  },
  {
    id: 3,
    title: 'GitHub & Data Science Workshop for Beginners',
    org: 'DataBridge',
    priority: 'LOW',
    description: 'No experience needed. Learn Git workflows, Jupyter notebooks, and Pandas basics. Bring a laptop. Free snacks provided. Seats limited to 30.',
    date: 'Aug 15, 2026',
    time: '3:00 PM – 5:00 PM',
    location: 'Seminar Hall B',
    color: '#2D6A4F',
    rotation: -0.5,
  },
  {
    id: 4,
    title: 'IBM SkillsBuild Study Group — Tonight',
    org: 'TechVayuna',
    priority: 'HIGH',
    description: 'Certification prep session for IBM SkillsBuild AI & Cloud tracks. Bring your login credentials. Study materials and practice exams shared on Discord.',
    date: 'Aug 10, 2026',
    time: '7:00 PM',
    location: 'Main Lab, Room 101',
    color: '#E04F3D',
    rotation: 2,
  },
  {
    id: 5,
    title: 'Campus Wi-Fi Maintenance — Dev Lab Offline',
    org: 'IT Services',
    priority: 'MEDIUM',
    description: 'The Development Lab (Block C, Room 110) network will be down for maintenance. Use the library or Collab Room 3 as alternatives.',
    date: 'Aug 12, 2026',
    time: '6:00 AM – 12:00 PM',
    location: 'Dev Lab, Block C',
    color: '#E8A020',
    rotation: -2,
  },
  {
    id: 6,
    title: 'Semester Project Showcase — Signups Open',
    org: 'Student Council',
    priority: 'LOW',
    description: 'Reserve your booth for the end-of-semester project showcase. All departments welcome. Setup begins at 9 AM. Judging panel includes industry guests.',
    date: 'Oct 1, 2026',
    time: '10:00 AM – 4:00 PM',
    location: 'Main Auditorium Foyer',
    color: '#2D6A4F',
    rotation: 0.5,
  },
]

export const CATEGORY_COLORS: Record<string, CardColor> = {
  'AI/ML': '#E04F3D',
  'SOFTWARE': '#E8A020',
  'HARDWARE': '#2D6A4F',
  'CYBERSECURITY': '#111111',
}
