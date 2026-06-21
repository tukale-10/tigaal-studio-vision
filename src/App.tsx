import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Outlet, useLocation } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import InfoBar from "@/components/InfoBar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import CapabilityDetail from "./pages/CapabilityDetail";
import Approach from "./pages/Approach";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import NewsUpdates from "./pages/NewsUpdates";
import Publications from "./pages/Publications";
import AnalyticalDispatch from "./pages/AnalyticalDispatch";
import Unsubscribe from "./pages/Unsubscribe";
import NotFound from "./pages/NotFound";

import { AdminAuthProvider } from "./admin/AdminAuthProvider";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminServices from "./admin/AdminServices";
import AdminProjects from "./admin/AdminProjects";
import AdminTeam from "./admin/AdminTeam";
import AdminNews from "./admin/AdminNews";
import AdminPublications from "./admin/AdminPublications";
import AdminContacts from "./admin/AdminContacts";
import AdminUsers from "./admin/AdminUsers";
import AdminPipeline from "./admin/AdminPipeline";

const queryClient = new QueryClient();

const PublicLayout = () => (
  <>
    <div className="fixed top-0 left-0 right-0 z-50">
      <InfoBar />
      <Navbar />
    </div>
    <div className="md:pt-9">
      <Outlet />
    </div>
    <Footer />
  </>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public */}
          <Route element={<PublicLayout />}>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<CapabilityDetail />} />
            <Route path="/approach" element={<Approach />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/team" element={<Team />} />
            <Route path="/partners" element={<Partners />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/resources/news" element={<NewsUpdates />} />
            <Route path="/resources/publications" element={<Publications />} />
            <Route path="/resources/analytical-dispatch" element={<AnalyticalDispatch />} />
            <Route path="/unsubscribe" element={<Unsubscribe />} />
          </Route>

          {/* Admin */}
          <Route path="/admin" element={<AdminAuthProvider><Outlet /></AdminAuthProvider>}>
            <Route index element={<AdminLogin />} />
            <Route element={<AdminLayout />}>
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="services" element={<AdminServices />} />
              <Route path="pipeline" element={<AdminPipeline />} />
              <Route path="projects" element={<AdminProjects />} />
              <Route path="team" element={<AdminTeam />} />
              <Route path="news" element={<AdminNews />} />
              <Route path="publications" element={<AdminPublications />} />
              <Route path="contacts" element={<AdminContacts />} />
              <Route path="users" element={<AdminUsers />} />
            </Route>
          </Route>

          <Route path="*" element={<><InfoBar /><Navbar /><NotFound /><Footer /></>} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
