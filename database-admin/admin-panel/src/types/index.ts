export type Category =
  | "Technical"
  | "Cultural"
  | "Sports"
  | "Literary"
  | "Arts"
  | "Social"
  | "Other";

export interface Club {
  _id: string;
  name: string;
  description: string;
  category: Category;
  logoUrl?: string;
  contactEmail?: string;
  isActive?: boolean;
  createdAt: string;
  updatedAt: string;
}

export type ClubInput = Omit<Club, "_id" | "createdAt" | "updatedAt">;

export interface ClubEvent {
  _id: string;
  title: string;
  description: string;
  date: string;
  venue: string;
  clubId: Club | string;
  bannerUrl?: string;
  capacity?: number;
  createdAt: string;
  updatedAt: string;
}

export type ClubEventInput = Omit<
  ClubEvent,
  "_id" | "createdAt" | "updatedAt" | "clubId"
> & { clubId: string };

export interface Announcement {
  _id: string;
  title: string;
  content: string;
  clubId?: Club | string;
  pinned?: boolean;
  date?: string;
  time?: string;
  venue?: string;
  createdAt: string;
  updatedAt: string;
}

export type AnnouncementInput = Omit<
  Announcement,
  "_id" | "createdAt" | "updatedAt" | "clubId"
> & { clubId?: string };

export interface Registration {
  _id: string;
  eventId: ClubEvent | string;
  name: string;
  email: string;
  phone?: string;
  rollNo?: string;
  createdAt: string;
}

export interface DashboardSummary {
  counts: {
    clubs: number;
    events: number;
    announcements: number;
    registrations: number;
  };
  upcomingEvents: ClubEvent[];
  recentRegistrations: Registration[];
}
