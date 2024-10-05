import React from 'react';
import { Link } from 'react-router-dom';
import { FileText, PenTool, Globe, Settings as SettingsIcon } from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <Link to="/" className="text-xl font-bold">AI Content Generator</Link>
          <div className="flex space-x-4">
            <Link to="/" className="flex items-center"><PenTool className="mr-1" size={18} /> Outline</Link>
            <Link to="/article-generator" className="flex items-center"><FileText className="mr-1" size={18} /> Article</Link>
            <Link to="/article-translator" className="flex items-center"><Globe className="mr-1" size={18} /> Translate</Link>
            <Link to="/settings" className="flex items-center"><SettingsIcon className="mr-1" size={18} /> Settings</Link>
          </div>
        </div>
      </nav>
      <main className="container mx-auto p-4">
        {children}
      </main>
    </div>
  );
};

export default Layout;