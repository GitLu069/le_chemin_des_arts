import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter, Routes, Route } from "react-router-dom"; // Utilisation de HashRouter

import Index from "./pages/Index";
import Explore from "./pages/Explore";
import Artwork from "./pages/Artwork";
import ThankYou from "./pages/ThankYou";
import Admin from "./pages/Admin";
import Legal from "./pages/Legal";
import NotFound from "./pages/NotFound";
import Concours from "./pages/Concours";
import Infos from "./pages/Infos";
import About from "./pages/About";
import Location from "./pages/Location";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <HashRouter> {/* Remplacement de BrowserRouter par HashRouter */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/merci" element={<ThankYou />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/legal" element={<Legal />} />
          <Route path="/concours" element={<Concours />} />
          <Route path="/infos" element={<Infos />} />
          <Route path="/about" element={<About />} />
          <Route path="/location/:slug" element={<Location />} />
          <Route path="/oeuvre-:id" element={<Artwork />} />
          <Route path="/:slug" element={<Artwork />} />
          <Route path="*" element={<NotFound />} /> {/* Remplacement de Index par NotFound pour les 404 */}
        </Routes>
      </HashRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
