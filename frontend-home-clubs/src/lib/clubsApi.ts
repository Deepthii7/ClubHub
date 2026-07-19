import { apiClient } from "./axiosClient";
import type { Club, ClubCategory, ClubListParams } from "@/types/club";

export const clubsApi = {
  async list(params: ClubListParams = {}): Promise<Club[]> {
    const { data } = await apiClient.get<Club[]>("/clubs", { params });
    return data;
  },

  async getBySlug(slug: string): Promise<Club> {
    const { data } = await apiClient.get<Club>(`/clubs/${slug}`);
    return data;
  },

  async categories(): Promise<ClubCategory[]> {
    const { data } = await apiClient.get<ClubCategory[]>("/categories");
    return data;
  },
};
