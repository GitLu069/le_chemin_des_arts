
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Leaf } from 'lucide-react';
import { 
  NavigationMenu, 
  NavigationMenuList, 
  NavigationMenuItem, 
  NavigationMenuTrigger, 
  NavigationMenuContent,
  NavigationMenuLink
} from '@/components/ui/navigation-menu';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const isActive = (path: string) => {
    return location.pathname === path ? "font-semibold text-artPath-accent" : "hover:text-artPath-accent transition-colors";
  };

  return (
    <div className="min-h-screen flex flex-col bg-artPath-lightBg">
      <header className="py-4 px-4 bg-white shadow-sm sticky top-0 z-30">
        <div className="container-custom flex justify-between items-center">
          <Link to="/" className="text-artPath-text font-display font-bold text-xl flex items-center">
            <Leaf className="h-5 w-5 text-artPath-accent mr-2" />
            les chemins d'art
          </Link>
          
          {/* Desktop Navigation */}
          <nav className="hidden md:block">
            <ul className="flex items-center space-x-6">
              <li><Link to="/" className={`${isActive('/')}`}>Accueil</Link></li>
              <li><Link to="/explore" className={`${isActive('/explore')}`}>Parcours</Link></li>
              <li className="relative group">
                <NavigationMenu>
                  <NavigationMenuList>
                    <NavigationMenuItem>
                      <NavigationMenuTrigger className="bg-transparent hover:bg-transparent">
                        Plus
                      </NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[200px] gap-1 p-2">
                          <li className="p-1">
                            <Link to="/concours" className="block p-2 hover:bg-gray-50 rounded-md">
                              Concours Photo
                            </Link>
                          </li>
                          <li className="p-1">
                            <Link to="/infos" className="block p-2 hover:bg-gray-50 rounded-md">
                              Infos pratiques
                            </Link>
                          </li>
                          <li className="p-1">
                            <Link to="/about" className="block p-2 hover:bg-gray-50 rounded-md">
                              À propos
                            </Link>
                          </li>
                        </ul>
                      </NavigationMenuContent>
                    </NavigationMenuItem>
                  </NavigationMenuList>
                </NavigationMenu>
              </li>
            </ul>
          </nav>
          
          {/* Mobile Navigation Button */}
          <button 
            onClick={toggleMenu}
            className="md:hidden text-artPath-text p-1"
            aria-label={isMenuOpen ? "Fermer le menu" : "Ouvrir le menu"}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Navigation Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-md z-50 animate-fade-in">
            <nav className="container-custom py-4">
              <ul className="flex flex-col space-y-4">
                <li><Link to="/" className="block py-2" onClick={toggleMenu}>Accueil</Link></li>
                <li><Link to="/explore" className="block py-2" onClick={toggleMenu}>Parcours</Link></li>
                <li><Link to="/concours" className="block py-2" onClick={toggleMenu}>Concours Photo</Link></li>
                <li><Link to="/infos" className="block py-2" onClick={toggleMenu}>Infos pratiques</Link></li>
                <li><Link to="/about" className="block py-2" onClick={toggleMenu}>À propos</Link></li>
              </ul>
            </nav>
          </div>
        )}
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="py-6 px-4 bg-white border-t border-gray-100 text-sm text-gray-500">
        <div className="container-custom text-center">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p>© 2025 les chemins d'art - Poleymieux-au-Mont-d'Or</p>
            <div className="flex gap-4">
              <Link to="/legal" className="hover:underline">Mentions légales</Link>
              <Link to="/admin" className="hover:underline text-gray-400">Administration</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
