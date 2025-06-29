import { Plus, User, Menu, Heart } from 'lucide-react';
import { Button } from './ui/button';
import AISearchBar from './AISearchBar';
import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 card-shadow">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <Link to="/">
              <h1 className="text-3xl font-bold brand-primary tracking-tight cursor-pointer">
                SOLD
              </h1>
            </Link>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <Link to="/search" className="text-gray-600 hover:text-[#0052CC] font-medium transition-colors">
                Browse
              </Link>
              <a href="#" className="text-gray-600 hover:text-[#0052CC] font-medium transition-colors">
                Categories
              </a>
              <a href="#" className="text-gray-600 hover:text-[#0052CC] font-medium transition-colors">
                How it works
              </a>
            </nav>
          </div>
          
          {/* Search Bar - Desktop */}
          <div className="hidden lg:flex flex-1 max-w-2xl mx-8">
            <AISearchBar 
              placeholder="Search for anything..."
              className="w-full"
            />
          </div>
          
          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* Mobile Search */}
            <Button variant="ghost" size="icon" className="lg:hidden">
              <div className="h-5 w-5 flex items-center justify-center">🔍</div>
            </Button>
            
            {/* Favorites */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            
            {/* Post Ad Button */}
            <Link to="/create">
              <Button className="bg-brand-secondary hover:bg-brand-secondary hover:opacity-90 text-white font-medium px-4 py-2 rounded-lg hidden md:flex items-center space-x-2">
                <Plus className="h-4 w-4" />
                <span>Post Ad</span>
              </Button>
            </Link>
            
            {/* User Account */}
            <Link to="/dashboard">
              <Button variant="outline" className="hidden md:flex items-center space-x-2 border-gray-300">
                <User className="h-4 w-4" />
                <span>Dashboard</span>
              </Button>
            </Link>
            
            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="lg:hidden mt-4">
          <AISearchBar 
            placeholder="Search for anything..."
            className="w-full"
          />
        </div>
      </div>
    </header>
  );
}