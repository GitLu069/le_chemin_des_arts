import { BrowserRouter, Routes, Route } from "react-router-dom"; // Utilisation de BrowserRouter

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

const App = () => (
  <BrowserRouter> {/* Utilisation de BrowserRouter */}
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
  </BrowserRouter>
);

export default App;
