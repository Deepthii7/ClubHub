import { Route, Routes } from "react-router-dom";
import AdminLayout from "@/components/layout/AdminLayout";
import Dashboard from "@/pages/Dashboard";
import ClubsPage from "@/pages/ClubsPage";
import EventsPage from "@/pages/EventsPage";
import AnnouncementsPage from "@/pages/AnnouncementsPage";
import RegistrationsPage from "@/pages/RegistrationsPage";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/clubs" element={<ClubsPage />} />
        <Route path="/events" element={<EventsPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/registrations" element={<RegistrationsPage />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
