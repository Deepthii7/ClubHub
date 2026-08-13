import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { announcementsApi, clubsApi, dashboardApi, eventsApi, registrationsApi } from "./api";
import type { AnnouncementInput, ClubEventInput, ClubInput } from "@/types";

// ---- Dashboard ----
export function useDashboard() {
  return useQuery({ queryKey: ["dashboard"], queryFn: dashboardApi.summary });
}

// ---- Clubs ----
export function useClubs() {
  return useQuery({ queryKey: ["clubs"], queryFn: clubsApi.list });
}

export function useCreateClub() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ClubInput) => clubsApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["clubs"] }),
  });
}

export function useUpdateClub() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ClubInput> }) =>
      clubsApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["clubs"] }),
  });
}

export function useDeleteClub() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => clubsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["clubs"] }),
  });
}

// ---- Events ----
export function useEvents() {
  return useQuery({ queryKey: ["events"], queryFn: eventsApi.list });
}

export function useCreateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: ClubEventInput) => eventsApi.create(data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useUpdateEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<ClubEventInput> }) =>
      eventsApi.update(id, data),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

export function useDeleteEvent() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => eventsApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["events"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}

// ---- Announcements ----
export function useAnnouncements() {
  return useQuery({ queryKey: ["announcements"], queryFn: announcementsApi.list });
}

export function useCreateAnnouncement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (data: AnnouncementInput) => announcementsApi.create(data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
}

export function useUpdateAnnouncement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<AnnouncementInput> }) =>
      announcementsApi.update(id, data),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
}

export function useDeleteAnnouncement() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => announcementsApi.remove(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["announcements"] }),
  });
}

// ---- Registrations ----
export function useRegistrations() {
  return useQuery({ queryKey: ["registrations"], queryFn: registrationsApi.list });
}

export function useDeleteRegistration() {
  const qc = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => registrationsApi.remove(id),
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["registrations"] });
      qc.invalidateQueries({ queryKey: ["dashboard"] });
    },
  });
}
