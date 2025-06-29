import { useState } from 'react';
import { Search, Sparkles, Loader2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { aiService } from '../services/aiService';

interface AISearchBarProps {
  size?: 'large' | 'normal';
  placeholder?: string;
  className?: string;
}

export default function AISearchBar({ 
  size = 'normal', 
  placeholder = "Try 'iPhone 14', 'vintage furniture', or 'reliable family car under 10k'...",
  className = ""
}: AISearchBarProps) {
  const [query, setQuery] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const navigate = useNavigate();

  const handleSearch = async () => {
    if (!query.trim()) return;
    
    setIsProcessing(true);
    
    try {
      // Use the AI service to parse the natural language query
      const aiParsedQuery = await aiService.parseNaturalLanguageSearch(query);
      
      // Navigate to search results with AI-parsed parameters
      const searchParams = new URLSearchParams({
        q: query,
        category: aiParsedQuery.category || '',
        minPrice: aiParsedQuery.minPrice?.toString() || '',
        maxPrice: aiParsedQuery.maxPrice?.toString() || '',
        location: aiParsedQuery.location || '',
        condition: aiParsedQuery.condition || '',
        brand: aiParsedQuery.brand || ''
      });
      
      navigate(`/search?${searchParams}`);
      toast.success('🤖 AI understood your search perfectly!');
    } catch {
      toast.error('Search failed. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className={`relative ${className}`}>
      <div className="relative">
        <Search className={`absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 ${size === 'large' ? 'h-6 w-6' : 'h-5 w-5'}`} />
        <Sparkles className={`absolute left-12 top-1/2 transform -translate-y-1/2 text-[#08BDBA] animate-pulse ${size === 'large' ? 'h-4 w-4' : 'h-3 w-3'}`} />
        <Input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isProcessing}
          className={`${size === 'large' ? 'pl-20 pr-4 py-4 text-lg' : 'pl-16 pr-4 py-3'} w-full rounded-xl bg-white text-gray-900 border-0 focus:ring-2 focus:ring-[#08BDBA] shadow-lg`}
        />
        <Button 
          onClick={handleSearch}
          disabled={isProcessing || !query.trim()}
          className={`absolute right-2 top-1/2 transform -translate-y-1/2 bg-brand-secondary hover:bg-brand-secondary hover:opacity-90 text-white ${size === 'large' ? 'px-6 py-2' : 'px-4 py-1'} rounded-lg flex items-center space-x-2`}
        >
          {isProcessing ? (
            <>
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>AI Processing...</span>
            </>
          ) : (
            <>
              <Sparkles className="h-4 w-4" />
              <span>AI Search</span>
            </>
          )}
        </Button>
      </div>
      
      {size === 'large' && (
        <div className="mt-4 text-center">
          <p className="text-sm text-blue-100">
            🤖 <strong>AI-Powered:</strong> Type naturally - "I need a reliable car for my family under €15,000"
          </p>
        </div>
      )}
    </div>
  );
}