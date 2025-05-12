import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { HashRouter, Routes, Route } from 'react-router-dom';

import Index from './pages/Index';
import Explore from './pages/Explore';
import Artwork from './pages/Artwork';
import ThankYou from './pages/ThankYou';
import Admin from './pages/Admin';
import Legal from './pages/Legal';
import NotFound from './pages/NotFound';
import Concours from './pages/Concours';
import Infos from './pages/Infos';
import About from './pages/About';
import Location from './pages/Location';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <HashRouter>
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
        <Route path="*" element={<NotFound />} />
      </Routes>
    </HashRouter>
  </QueryClientProvider>
);

export default App;
