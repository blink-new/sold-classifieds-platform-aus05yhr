import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Grid, List, MapPin, Calendar, Eye } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { Slider } from '../components/ui/slider';
import toast from 'react-hot-toast';

interface SearchFilters {
  category: string;
  minPrice: number;
  maxPrice: number;
  location: string;
  condition: string;
  brand: string;
}

interface Listing {
  id: string;
  title: string;
  price: number;
  location: string;
  images: string[];
  condition: string;
  postedDate: string;
  views: number;
  seller: string;
  description: string;
  aiTags?: string[];
}

// Mock data - would come from API
const mockListings: Listing[] = [
  {
    id: '1',
    title: 'iPhone 14 Pro Max 256GB Space Black',
    price: 899,
    location: 'Riga, Latvia',
    images: ['https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400'],
    condition: 'excellent',
    postedDate: '2024-01-15',
    views: 234,
    seller: 'TechSeller',
    description: 'Like new iPhone 14 Pro Max with original box and accessories.',
    aiTags: ['smartphone', 'apple', 'premium', 'high-end']
  },
  {
    id: '2',
    title: 'Reliable BMW X3 2019 - Perfect Family Car',
    price: 28500,
    location: 'Vilnius, Lithuania',
    images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400'],
    condition: 'good',
    postedDate: '2024-01-14',
    views: 567,
    seller: 'AutoDealer',
    description: 'Well-maintained BMW X3 with full service history. Perfect for families.',
    aiTags: ['suv', 'family-car', 'reliable', 'bmw']
  },
  {
    id: '3',
    title: 'Vintage Oak Dining Table Set',
    price: 450,
    location: 'Tallinn, Estonia',
    images: ['https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400'],
    condition: 'good',
    postedDate: '2024-01-13',
    views: 89,
    seller: 'FurnitureLover',
    description: 'Beautiful vintage oak dining table with 6 chairs.',
    aiTags: ['furniture', 'vintage', 'dining', 'oak']
  }
];

export default function SearchResults() {
  const [searchParams] = useSearchParams();
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [listings, setListings] = useState<Listing[]>([]);
  const [filters, setFilters] = useState<SearchFilters>({
    category: searchParams.get('category') || '',
    minPrice: parseInt(searchParams.get('minPrice') || '0'),
    maxPrice: parseInt(searchParams.get('maxPrice') || '50000'),
    location: searchParams.get('location') || '',
    condition: searchParams.get('condition') || '',
    brand: searchParams.get('brand') || ''
  });

  const query = searchParams.get('q') || '';

  useEffect(() => {
    // Simulate API call with AI-filtered results
    const filteredListings = mockListings.filter(listing => {
      const matchesCategory = !filters.category || 
        (filters.category === 'electronics' && listing.title.toLowerCase().includes('iphone')) ||
        (filters.category === 'vehicles' && listing.title.toLowerCase().includes('bmw')) ||
        (filters.category === 'home-garden' && listing.title.toLowerCase().includes('table'));
      
      const matchesPrice = listing.price >= filters.minPrice && listing.price <= filters.maxPrice;
      const matchesCondition = !filters.condition || listing.condition === filters.condition;
      const matchesQuery = !query || listing.title.toLowerCase().includes(query.toLowerCase());
      
      return matchesCategory && matchesPrice && matchesCondition && matchesQuery;
    });
    
    setListings(filteredListings);
    
    if (query) {
      toast.success(`🤖 AI found ${filteredListings.length} results for "${query}"`);
    }
  }, [searchParams, filters, query]);

  const updateFilter = (key: keyof SearchFilters, value: string | number) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="container-custom py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {query ? `Search Results for "${query}"` : 'Browse All Listings'}
        </h1>
        {query && (
          <div className="flex flex-wrap gap-2 mb-4">
            <Badge variant="secondary" className="bg-[#08BDBA]/10 text-[#08BDBA]">
              🤖 AI Interpreted: {query}
            </Badge>
            {filters.category && (
              <Badge variant="outline">Category: {filters.category}</Badge>
            )}
            {filters.maxPrice < 50000 && (
              <Badge variant="outline">Max Price: €{filters.maxPrice.toLocaleString()}</Badge>
            )}
          </div>
        )}
        <p className="text-gray-600">
          Showing {listings.length} results
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="lg:w-80 flex-shrink-0">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center space-x-2 mb-6">
                <Filter className="h-5 w-5 text-[#0052CC]" />
                <h3 className="text-lg font-semibold">Filters</h3>
              </div>
              
              {/* Category */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Category</label>
                <Select value={filters.category} onValueChange={(value) => updateFilter('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">All Categories</SelectItem>
                    <SelectItem value="electronics">Electronics</SelectItem>
                    <SelectItem value="vehicles">Vehicles</SelectItem>
                    <SelectItem value="home-garden">Home & Garden</SelectItem>
                    <SelectItem value="fashion-beauty">Fashion & Beauty</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Price Range: €{filters.minPrice} - €{filters.maxPrice}
                </label>
                <Slider
                  min={0}
                  max={50000}
                  step={100}
                  value={[filters.minPrice, filters.maxPrice]}
                  onValueChange={([min, max]) => {
                    updateFilter('minPrice', min);
                    updateFilter('maxPrice', max);
                  }}
                  className="mt-2"
                />
              </div>

              {/* Condition */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Condition</label>
                <Select value={filters.condition} onValueChange={(value) => updateFilter('condition', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Condition</SelectItem>
                    <SelectItem value="new">New</SelectItem>
                    <SelectItem value="excellent">Excellent</SelectItem>
                    <SelectItem value="good">Good</SelectItem>
                    <SelectItem value="fair">Fair</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Location */}
              <div className="mb-6">
                <label className="text-sm font-medium text-gray-700 mb-2 block">Location</label>
                <Select value={filters.location} onValueChange={(value) => updateFilter('location', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Any Location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">Any Location</SelectItem>
                    <SelectItem value="riga">Riga, Latvia</SelectItem>
                    <SelectItem value="vilnius">Vilnius, Lithuania</SelectItem>
                    <SelectItem value="tallinn">Tallinn, Estonia</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="flex-1">
          {/* View Controls */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
            
            <Select defaultValue="newest">
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="popular">Most Popular</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Listings Grid/List */}
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
            {listings.map(listing => (
              <Card key={listing.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                <div className={viewMode === 'list' ? 'flex' : ''}>
                  <div className={viewMode === 'list' ? 'w-48 flex-shrink-0' : ''}>
                    <img
                      src={listing.images[0]}
                      alt={listing.title}
                      className={`w-full object-cover ${viewMode === 'list' ? 'h-32' : 'h-48'}`}
                    />
                  </div>
                  
                  <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-gray-900 line-clamp-2">{listing.title}</h3>
                      <span className="text-lg font-bold text-[#0052CC] ml-2">
                        €{listing.price.toLocaleString()}
                      </span>
                    </div>
                    
                    <div className="flex items-center text-sm text-gray-500 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span>{listing.location}</span>
                      <Separator orientation="vertical" className="mx-2 h-4" />
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>{new Date(listing.postedDate).toLocaleDateString()}</span>
                    </div>
                    
                    {listing.aiTags && (
                      <div className="flex flex-wrap gap-1 mb-3">
                        {listing.aiTags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-[#08BDBA]/10 text-[#08BDBA]">
                            🤖 {tag}
                          </Badge>
                        ))}
                      </div>
                    )}
                    
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <span className="capitalize">Condition: {listing.condition}</span>
                      <div className="flex items-center">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>{listing.views} views</span>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>

          {listings.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-4">
                <Grid className="h-12 w-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500">Try adjusting your search filters or search terms.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}