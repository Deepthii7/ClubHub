import { Routes, Route } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import Home from "@/pages/Home";
import ClubDirectory from "@/pages/ClubDirectory";
import ClubDetails from "@/pages/ClubDetails";
import NotFound from "@/pages/NotFound";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/clubs" element={<ClubDirectory />} />
        <Route path="/clubs/:slug" element={<ClubDetails />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
