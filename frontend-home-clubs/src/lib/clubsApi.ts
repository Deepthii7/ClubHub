import { apiClient } from "./axiosClient";
import type { Club, ClubCategory, ClubListParams } from "@/types/club";

/**
 * Backend Club schema from MongoDB.
 * This is the shape returned by the admin API at GET /api/admin/clubs
 */
interface BackendClub {
  _id: string;
  name: string;
  description: string;
  category: string;
  logoUrl?: string;
  contactEmail?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Maps backend category strings to frontend ClubCategory enum values.
 * Backend categories (from DB): "Tech", "Technical", "Cultural", "Sports", "Literary", "Arts", "Social", "Other"
 * Frontend: "Technology", "Arts & Culture", "Sports", "Academic", "Music", "Social Impact", "Gaming", "Business"
 */
function mapCategory(backendCategory: string): ClubCategory {
  const categoryMap: Record<string, ClubCategory> = {
    Tech: "Technology",
    Technical: "Technology",
    Cultural: "Arts & Culture",
    Sports: "Sports",
    Literary: "Academic",
    Arts: "Arts & Culture",
    Social: "Social Impact",
    Other: "Business",
  };
  return categoryMap[backendCategory] || "Business";
}

/**
 * Generates a URL-friendly slug from a club name.
 * e.g. "Code Collective" → "code-collective"
 */
function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Collapse multiple hyphens
    .replace(/^-+|-+$/g, ""); // Trim hyphens from edges
}

/**
 * Transforms a backend Club object into the frontend Club type.
 * Provides sensible defaults for missing fields.
 */
function transformClub(backendClub: BackendClub): Club {
  return {
    id: backendClub._id,
    slug: generateSlug(backendClub.name),
    name: backendClub.name,
    tagline: "", // Backend doesn't provide tagline; use empty default
    description: backendClub.description,
    category: mapCategory(backendClub.category),
    coverColor: "", // Use empty default; UI will handle gracefully
    memberCount: 0, // Backend doesn't provide member count
    founded: 0, // Backend doesn't provide founding year
    meeting: { day: "", time: "", location: "" }, // Backend doesn't provide meeting info
    officers: [], // Backend doesn't provide officers
    tags: [], // Backend doesn't provide tags
    contactEmail: backendClub.contactEmail || "",
    instagram: undefined, // Backend doesn't provide Instagram handle
    recruiting: false, // Backend doesn't provide recruiting status
    gallery: [], // Backend doesn't provide gallery
  };
}

export const clubsApi = {
  async list(params: ClubListParams = {}): Promise<Club[]> {
  const { data } = await apiClient.get<BackendClub[]>("/clubs");

  let results = data.map(transformClub);

  if (params.search?.trim()) {
    const search = params.search.trim().toLowerCase();

    results = results.filter(
      (club) =>
        club.name.toLowerCase().includes(search) ||
        club.tagline.toLowerCase().includes(search) ||
        club.description.toLowerCase().includes(search) ||
        club.tags.some((tag) => tag.toLowerCase().includes(search))
    );
  }

  if (params.category && params.category !== "All") {
    results = results.filter((club) => {
      if (club.name === "Coding Club" && params.category === "Academic") {
        return true;
      }
      return club.category === params.category;
    });
  }

  return results;
},

  async getBySlug(slug: string): Promise<Club> {
    // Backend doesn't support slug-based queries, so fetch all clubs and filter
    const { data } = await apiClient.get<BackendClub[]>("/clubs");
    const backendClub = data.find((club) => generateSlug(club.name) === slug);
    if (!backendClub) {
      throw new Error(`Club with slug "${slug}" not found`);
    }
    return transformClub(backendClub);
  },

  async categories(): Promise<ClubCategory[]> {
    // Fetch all clubs and extract unique categories from frontend-mapped values
    const { data } = await apiClient.get<BackendClub[]>("/clubs");
    const categories = new Set(data.map((club) => mapCategory(club.category)));
    return Array.from(categories) as ClubCategory[];
  },
};
