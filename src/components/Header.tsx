import { Search, Plus, User, Menu, Heart } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function Header() {
  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50 card-shadow">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-8">
            <h1 className="text-3xl font-bold brand-primary tracking-tight">
              SOLD
            </h1>
            
            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-6">
              <a href="#" className="text-gray-600 hover:text-[#0052CC] font-medium transition-colors">
                Browse
              </a>
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
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for anything..."
                className="pl-10 pr-4 py-3 w-full rounded-lg border-gray-300 focus:border-[#0052CC] focus:ring-[#0052CC] text-lg"
              />
            </div>
          </div>
          
          {/* Right Actions */}
          <div className="flex items-center space-x-3">
            {/* Mobile Search */}
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Search className="h-5 w-5" />
            </Button>
            
            {/* Favorites */}
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            
            {/* Post Ad Button */}
            <Button className="bg-brand-secondary hover:bg-brand-secondary hover:opacity-90 text-white font-medium px-4 py-2 rounded-lg hidden md:flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Post Ad</span>
            </Button>
            
            {/* User Account */}
            <Button variant="outline" className="hidden md:flex items-center space-x-2 border-gray-300">
              <User className="h-4 w-4" />
              <span>Sign In</span>
            </Button>
            
            {/* Mobile Menu */}
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
        
        {/* Mobile Search Bar */}
        <div className="lg:hidden mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for anything..."
              className="pl-10 pr-4 py-3 w-full rounded-lg border-gray-300 focus:border-[#0052CC] focus:ring-[#0052CC]"
            />
          </div>
        </div>
      </div>
    </header>
  );
}