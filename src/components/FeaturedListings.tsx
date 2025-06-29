import { Heart, MapPin, Clock, Star } from 'lucide-react';
import { Button } from './ui/button';
import { Badge } from './ui/badge';

const featuredAds = [
  {
    id: 1,
    title: "iPhone 14 Pro Max - Excellent Condition",
    price: "$899",
    originalPrice: "$1,199",
    location: "San Francisco, CA",
    timeAgo: "2 hours ago",
    image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=400&q=80",
    seller: "TechDeals Pro",
    rating: 4.9,
    badge: "FEATURED",
    category: "Electronics"
  },
  {
    id: 2,
    title: "Modern Scandinavian Sofa - Like New",
    price: "$650",
    originalPrice: "$1,200",
    location: "Los Angeles, CA",
    timeAgo: "4 hours ago",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80",
    seller: "HomeStyle",
    rating: 4.8,
    badge: "HOT",
    category: "Furniture"
  },
  {
    id: 3,
    title: "MacBook Pro 16\" M2 - Perfect for Work",
    price: "$2,299",
    originalPrice: "$2,499",
    location: "New York, NY",
    timeAgo: "1 day ago",
    image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?auto=format&fit=crop&w=400&q=80",
    seller: "AppleExpert",
    rating: 5.0,
    badge: "VERIFIED",
    category: "Electronics"
  },
  {
    id: 4,
    title: "Vintage Leather Jacket - Authentic",
    price: "$180",
    originalPrice: "$350",
    location: "Chicago, IL",
    timeAgo: "3 hours ago",
    image: "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=400&q=80",
    seller: "VintageStyle",
    rating: 4.7,
    badge: "TRENDING",
    category: "Fashion"
  },
  {
    id: 5,
    title: "Road Bike - Carbon Frame",
    price: "$1,200",
    originalPrice: "$2,000",
    location: "Portland, OR",
    timeAgo: "5 hours ago",
    image: "https://images.unsplash.com/photo-1558618666-fbd445c55cd6?auto=format&fit=crop&w=400&q=80",
    seller: "BikeExpert",
    rating: 4.9,
    badge: "DEAL",
    category: "Sports"
  },
  {
    id: 6,
    title: "Gaming Setup - Complete Build",
    price: "$1,899",
    originalPrice: "$2,500",
    location: "Austin, TX",
    timeAgo: "1 hour ago",
    image: "https://images.unsplash.com/photo-1593640408182-31c70c8268f5?auto=format&fit=crop&w=400&q=80",
    seller: "GameMaster",
    rating: 4.8,
    badge: "POPULAR",
    category: "Gaming"
  }
];

export default function FeaturedListings() {
  const getBadgeColor = (badge: string) => {
    switch (badge) {
      case 'FEATURED': return 'bg-[#08BDBA] text-white';
      case 'HOT': return 'bg-red-500 text-white';
      case 'VERIFIED': return 'bg-green-500 text-white';
      case 'TRENDING': return 'bg-purple-500 text-white';
      case 'DEAL': return 'bg-orange-500 text-white';
      case 'POPULAR': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-12">
          <div>
            <h2 className="text-4xl font-bold text-[#0052CC] mb-4">
              Featured Listings
            </h2>
            <p className="text-xl text-gray-600">
              Hand-picked deals from trusted sellers
            </p>
          </div>
          <Button variant="outline" className="hidden md:block border-[#0052CC] text-[#0052CC] hover:bg-[#0052CC] hover:text-white">
            View All
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredAds.map((ad) => (
            <div 
              key={ad.id}
              className="bg-white rounded-xl overflow-hidden card-shadow card-shadow-hover transition-all duration-200 cursor-pointer group"
            >
              <div className="relative">
                <img 
                  src={ad.image} 
                  alt={ad.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
                />
                <Badge className={`absolute top-3 left-3 ${getBadgeColor(ad.badge)} font-medium`}>
                  {ad.badge}
                </Badge>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="absolute top-3 right-3 bg-white/80 hover:bg-white hover:text-red-500 backdrop-blur"
                >
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              
              <div className="p-6">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-2xl font-bold text-[#0052CC]">{ad.price}</span>
                      <span className="text-sm text-gray-500 line-through">{ad.originalPrice}</span>
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {ad.category}
                    </Badge>
                  </div>
                </div>
                
                <h3 className="font-semibold text-lg text-gray-900 mb-3 line-clamp-2 group-hover:text-[#0052CC] transition-colors">
                  {ad.title}
                </h3>
                
                <div className="space-y-2 mb-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin className="h-4 w-4 mr-1" />
                    {ad.location}
                  </div>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="h-4 w-4 mr-1" />
                    {ad.timeAgo}
                  </div>
                </div>
                
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-[#0052CC] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-semibold">
                        {ad.seller[0]}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-gray-900">{ad.seller}</p>
                      <div className="flex items-center">
                        <Star className="h-3 w-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-gray-600 ml-1">{ad.rating}</span>
                      </div>
                    </div>
                  </div>
                  <Button size="sm" className="bg-[#08BDBA] hover:bg-[#069a97] text-white">
                    Contact
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12 md:hidden">
          <Button variant="outline" className="border-[#0052CC] text-[#0052CC] hover:bg-[#0052CC] hover:text-white">
            View All Listings
          </Button>
        </div>
      </div>
    </section>
  );
}