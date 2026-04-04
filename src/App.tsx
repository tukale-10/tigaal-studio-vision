import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Services from "./pages/Services";
import Approach from "./pages/Approach";
import Projects from "./pages/Projects";
import Team from "./pages/Team";
import Partners from "./pages/Partners";
import Contact from "./pages/Contact";
import NewsUpdates from "./pages/NewsUpdates";
import Publications from "./pages/Publications";
import NotFound from "./pages/NotFound";

// Admin
import { AdminAuthProvider } from "./admin/AdminAuthProvider";
import AdminLogin from "./admin/AdminLogin";
import AdminLayout from "./admin/AdminLayout";
import AdminDashboard from "./admin/AdminDashboard";
import AdminServices from "./admin/AdminServices";
import AdminProjects from "./admin/AdminProjects";
import AdminTeam from "./admin/AdminTeam";
import AdminNews from "./admin/AdminNews";
import AdminPublications from "./admin/AdminPublications";
import AdminUsers from "./admin/AdminUsers";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
        <Routes>
          {/* Public site */}
          <Route element={<><Navbar /><main><Routes><Route path="/" element={<Index />} /><Route path="/about" element={<About />} /><Route path="/services" element={<Services />} /><Route path="/approach" element={<Approach />} /><Route path="/projects" element={<Projects />} /><Route path="/team" element={<Team />} /><Route path="/partners" element={<Partners />} /><Route path="/contact" element={<Contact />} /><Route path="/resources/news" element={<NewsUpdates />} /><Route path="/resources/publications" element={<Publications />} /><Route path="*" element={<NotFound />} /></Routes></main><Footer /></>} path="/*" />

          {/* Admin */}
          <Route path="/admin/*" element={
            <AdminAuthProvider>
              <Routes>
                <Route index element={<AdminLogin />} />
                <Route element={<AdminLayout />}>
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="services" element={<AdminServices />} />
                  <Route path="projects" element={<AdminProjects />} />
                  <Route path="team" element={<AdminTeam />} />
                  <Route path="news" element={<AdminNews />} />
                  <Route path="publications" element={<AdminPublications />} />
                  <Route path="users" element={<AdminUsers />} />
                </Route>
              </Routes>
            </AdminAuthProvider>
          } />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
