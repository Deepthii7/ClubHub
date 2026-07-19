import { useQuery } from "@tanstack/react-query";
import { clubsApi } from "./clubsApi";
import type { ClubListParams } from "@/types/club";

export function useClubs(params: ClubListParams = {}) {
  return useQuery({
    queryKey: ["clubs", params],
    queryFn: () => clubsApi.list(params),
    staleTime: 60_000,
  });
}

export function useClub(slug: string | undefined) {
  return useQuery({
    queryKey: ["club", slug],
    queryFn: () => clubsApi.getBySlug(slug as string),
    enabled: Boolean(slug),
    staleTime: 60_000,
  });
}

export function useCategories() {
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => clubsApi.categories(),
    staleTime: 5 * 60_000,
  });
}
