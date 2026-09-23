# ClubHub

ClubHub is a centralized college club management platform that brings student clubs, events, announcements, and registrations into one place.

Instead of students having to search through different groups and messages for club activities, ClubHub provides a single platform to discover and participate in campus events.

## Features

### Club Directory
- Browse and discover college clubs
- View club information and categories

### Events
- View upcoming college events
- Search and filter events by category
- View event details such as date, venue, and description

### Event Registration
- Students can register for events directly through the platform
- Registration details are stored in the backend
- Prevents duplicate registrations for the same event

### Announcements
- Centralized space for important club announcements

### Admin Panel
- Manage clubs and events
- View registered participants
- Delete registrations when required

## Tech Stack

### Frontend
- React
- TypeScript
- Vite
- CSS

### Backend
- Node.js
- Express.js

### Database
- MongoDB

### Development Tools
- Git & GitHub
- Postman
- VS Code

## Project Structure

ClubHub/
│
├── frontend-homeclubs/
│   └── React frontend
│
├── frontend-events-announcements/
│   └── Events and announcements frontend
│
├── backend-api/
│   └── Node.js + Express backend
│
├── database-admin/
│   └── Admin panel and database-related modules
│
└── README.md

## Event Registration Flow
Student
   ↓
Browse Events
   ↓
Select Event
   ↓
Register
   ↓
Node.js / Express API
   ↓
MongoDB
   ↓
Registration Stored
   ↓
Admin Panel
   ↓
View Registrations

## Running the Project Locally
1. Clone the Repository
git clone https://github.com/Deepthii7/ClubHub.git
cd ClubHub
2. Start the Backend
cd backend-api
npm install
npm run dev
3. Start the Events Frontend
Open another terminal:
cd frontend-events-announcements
npm install
npm run dev
Start the other frontend and admin modules similarly when required.

## Current Status
ClubHub currently supports the core club and event management workflow, including event discovery, event registration, backend API integration, MongoDB storage, and registration management through the admin panel.

## Developed as a TechVayuna AI Domain project.
