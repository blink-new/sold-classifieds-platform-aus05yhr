import { Search, TrendingUp, Zap, Shield } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

export default function HeroSection() {
  return (
    <section className="bg-gradient-to-br from-[#0052CC] to-[#003d99] text-white">
      <div className="container-custom py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Main Headline */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
            Buy & Sell
            <span className="block text-[#08BDBA]">Anything, Anywhere</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-12 text-blue-100 max-w-2xl mx-auto leading-relaxed">
            The modern way to discover amazing deals and sell your items with AI-powered search
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-6 w-6" />
              <Input
                type="text"
                placeholder="Try 'iPhone 14', 'vintage furniture', or 'mountain bike'..."
                className="pl-12 pr-4 py-4 w-full rounded-xl text-lg bg-white text-gray-900 border-0 focus:ring-2 focus:ring-[#08BDBA] shadow-lg"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-brand-secondary hover:bg-brand-secondary hover:opacity-90 text-white px-6 py-2 rounded-lg">
                Search
              </Button>
            </div>
          </div>
          
          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
              <Zap className="h-4 w-4 text-[#08BDBA]" />
              <span className="text-sm font-medium">AI-Powered Search</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
              <Shield className="h-4 w-4 text-[#08BDBA]" />
              <span className="text-sm font-medium">Secure & Trusted</span>
            </div>
            <div className="flex items-center space-x-2 bg-white/10 backdrop-blur rounded-full px-4 py-2">
              <TrendingUp className="h-4 w-4 text-[#08BDBA]" />
              <span className="text-sm font-medium">Best Prices</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-[#08BDBA] hover:bg-[#069a97] text-white px-8 py-3 rounded-xl text-lg font-medium">
              Start Browsing
            </Button>
            <Button variant="outline" className="border-white text-white hover:bg-white hover:text-[#0052CC] px-8 py-3 rounded-xl text-lg font-medium">
              Post Your First Ad
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}