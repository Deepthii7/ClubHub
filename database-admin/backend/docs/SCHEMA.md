# ClubHub — Database Schema (Module 4)

Database: **MongoDB** (Atlas), accessed via **Mongoose**.

## ER overview

```
 Club (1) ──────< (many) Event ──────< (many) Registration
   │
   └────< (many) Announcement
```

- A **Club** has many **Events** and many **Announcements**.
- An **Event** belongs to one **Club** and has many **Registrations**.
- A **Registration** belongs to one **Event**.
- An **Announcement** optionally belongs to one **Club** (allows platform-wide announcements with no `clubId`).

---

## `clubs`

| Field         | Type     | Required | Notes                                                        |
|---------------|----------|----------|---------------------------------------------------------------|
| `_id`         | ObjectId | auto     | Primary key                                                   |
| `name`        | String   | ✅        | Club display name                                              |
| `description` | String   | ✅        | Shown on club directory / detail page                         |
| `category`    | String   | ✅        | Enum: Technical, Cultural, Sports, Literary, Arts, Social, Other |
| `logoUrl`     | String   | –        | Club logo image URL                                            |
| `contactEmail`| String   | –        | Club contact email                                              |
| `isActive`    | Boolean  | –        | Soft-disable a club without deleting it (default `true`)       |
| `createdAt`   | Date     | auto     | Timestamp                                                       |
| `updatedAt`   | Date     | auto     | Timestamp                                                       |

## `events`

| Field         | Type     | Required | Notes                                              |
|---------------|----------|----------|------------------------------------------------------|
| `_id`         | ObjectId | auto     | Primary key                                          |
| `title`       | String   | ✅        | Event name                                            |
| `description` | String   | ✅        | Event details                                          |
| `date`        | Date     | ✅        | Event date/time. Indexed for upcoming-event queries   |
| `venue`       | String   | ✅        | Location                                              |
| `clubId`      | ObjectId | ✅        | References `clubs._id`                                |
| `bannerUrl`   | String   | –        | Event banner image URL                                |
| `capacity`    | Number   | –        | Max registrations, `0` = unlimited (default `0`)      |
| `createdAt`   | Date     | auto     | Timestamp                                              |
| `updatedAt`   | Date     | auto     | Timestamp                                              |

## `registrations`

| Field       | Type     | Required | Notes                                                          |
|-------------|----------|----------|-------------------------------------------------------------------|
| `_id`       | ObjectId | auto     | Primary key                                                       |
| `eventId`   | ObjectId | ✅        | References `events._id`                                           |
| `name`      | String   | ✅        | Registrant name                                                    |
| `email`     | String   | ✅        | Registrant email                                                    |
| `phone`     | String   | –        | Registrant phone                                                    |
| `rollNo`    | String   | –        | Student roll number                                                  |
| `createdAt` | Date     | auto     | Timestamp                                                             |
| `updatedAt` | Date     | auto     | Timestamp                                                             |

Compound unique index on `(eventId, email)` — stops the same person
registering twice for the same event.

## `announcements`

| Field       | Type     | Required | Notes                                              |
|-------------|----------|----------|--------------------------------------------------------|
| `_id`       | ObjectId | auto     | Primary key                                              |
| `title`     | String   | ✅        | Announcement headline                                     |
| `content`   | String   | ✅        | Body text                                                  |
| `clubId`    | ObjectId | –        | References `clubs._id`. Omit for platform-wide posts       |
| `pinned`    | Boolean  | –        | Pins to top of the Announcement Board (default `false`)    |
| `createdAt` | Date     | auto     | Timestamp                                                    |
| `updatedAt` | Date     | auto     | Timestamp                                                    |

---

## Admin API (this module)

Base URL: `http://localhost:5050/api/admin`

| Method | Endpoint                          | Description                          |
|--------|-------------------------------------|-----------------------------------------|
| GET    | `/clubs`                            | List all clubs                          |
| GET    | `/clubs/:id`                        | Get one club                            |
| POST   | `/clubs`                            | Create a club                           |
| PUT    | `/clubs/:id`                        | Update a club                           |
| DELETE | `/clubs/:id`                        | Delete a club                           |
| GET    | `/events`                           | List all events (club populated)        |
| GET    | `/events/:id`                       | Get one event                           |
| POST   | `/events`                           | Create an event                         |
| PUT    | `/events/:id`                       | Update an event                         |
| DELETE | `/events/:id`                       | Delete an event                         |
| GET    | `/events/:eventId/registrations`    | Registrations for one event             |
| GET    | `/announcements`                    | List all announcements (club populated) |
| POST   | `/announcements`                    | Create an announcement                  |
| PUT    | `/announcements/:id`                | Update an announcement                  |
| DELETE | `/announcements/:id`                | Delete an announcement                  |
| GET    | `/registrations`                    | List all registrations, every event     |
| DELETE | `/registrations/:id`                | Remove a registration                   |
| GET    | `/dashboard`                        | Counts + upcoming events + recent regs  |
