
import React from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-artPath-lightBg">
      <header className="py-4 px-4 bg-white shadow-sm">
        <div className="container-custom flex justify-center">
          <Link to="/" className="text-artPath-text font-display font-bold text-xl">
            Le Chemin des Arts
          </Link>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="py-4 px-4 bg-white border-t border-gray-100 text-sm text-gray-500">
        <div className="container-custom text-center">
          <p>© 2025 Le Chemin des Arts - <Link to="/legal" className="hover:underline">Mentions légales</Link></p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
