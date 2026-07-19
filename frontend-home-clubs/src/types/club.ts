export type ClubCategory =
  | "Technology"
  | "Arts & Culture"
  | "Sports"
  | "Academic"
  | "Music"
  | "Social Impact"
  | "Gaming"
  | "Business";

export interface MeetingSchedule {
  day: string;
  time: string;
  location: string;
}

export interface ClubOfficer {
  name: string;
  role: string;
}

export interface Club {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: ClubCategory;
  coverColor: string;
  memberCount: number;
  founded: number;
  meeting: MeetingSchedule;
  officers: ClubOfficer[];
  tags: string[];
  contactEmail: string;
  instagram?: string;
  recruiting: boolean;
  gallery: string[];
}

export interface ClubListParams {
  search?: string;
  category?: ClubCategory | "All";
}
