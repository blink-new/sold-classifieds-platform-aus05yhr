import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Calendar, Eye, Heart, Share2, MessageCircle, Phone, Mail, Sparkles } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Card, CardContent } from '../components/ui/card';
import { Separator } from '../components/ui/separator';
import toast from 'react-hot-toast';

// Mock data
const mockListing = {
  id: '1',
  title: 'iPhone 14 Pro Max 256GB Space Black',
  price: 899,
  location: 'Riga, Latvia',
  images: [
    'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=800',
    'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800',
    'https://images.unsplash.com/photo-1565849904461-04a58ad377e0?w=800'
  ],
  condition: 'excellent',
  postedDate: '2024-01-15',
  views: 234,
  seller: {
    name: 'TechSeller',
    rating: 4.8,
    totalSales: 47,
    memberSince: '2022-03-15'
  },
  description: `Like new iPhone 14 Pro Max with original box and accessories. This device has been well cared for and is in excellent condition.

Features:
• 256GB Storage
• 6.7" Super Retina XDR Display
• Pro Camera System with 48MP Main Camera
• A16 Bionic Chip
• All-Day Battery Life
• 5G Connectivity

Includes:
- Original box and documentation
- Lightning to USB-C cable
- Original earphones (unused)
- Screen protector (already applied)
- Clear case

Battery health: 95%
No scratches, dents, or functional issues. Perfect working condition.`,
  aiTags: ['smartphone', 'apple', 'premium', 'high-end', 'photography', 'flagship'],
  specifications: {
    brand: 'Apple',
    model: 'iPhone 14 Pro Max',
    storage: '256GB',
    color: 'Space Black',
    screenSize: '6.7"',
    connectivity: '5G'
  }
};

export default function ListingDetail() {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);
  
  // In real app, fetch listing by ID
  const listing = mockListing;
  
  // Use id for future API calls
  console.log('Listing ID:', id);

  const handleFavorite = () => {
    setIsFavorited(!isFavorited);
    toast.success(isFavorited ? 'Removed from favorites' : 'Added to favorites');
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success('Link copied to clipboard!');
  };

  const handleContact = (method: string) => {
    toast.success(`Opening ${method} to contact seller...`);
  };

  return (
    <div className="container-custom py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Gallery */}
          <Card>
            <CardContent className="p-0">
              <div className="relative">
                <img
                  src={listing.images[currentImage]}
                  alt={listing.title}
                  className="w-full h-96 object-cover rounded-t-lg"
                />
                <div className="absolute top-4 right-4 flex space-x-2">
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleFavorite}
                    className={`${isFavorited ? 'text-red-500' : 'text-gray-600'} bg-white/90 hover:bg-white`}
                  >
                    <Heart className={`h-4 w-4 ${isFavorited ? 'fill-current' : ''}`} />
                  </Button>
                  <Button
                    variant="secondary"
                    size="icon"
                    onClick={handleShare}
                    className="bg-white/90 hover:bg-white"
                  >
                    <Share2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {/* Thumbnail Gallery */}
              <div className="p-4">
                <div className="flex space-x-2 overflow-x-auto">
                  {listing.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImage(index)}
                      className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${
                        currentImage === index ? 'border-[#0052CC]' : 'border-gray-200'
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${listing.title} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Title and Price */}
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">{listing.title}</h1>
            <div className="flex items-center justify-between mb-4">
              <span className="text-3xl font-bold text-[#0052CC]">
                €{listing.price.toLocaleString()}
              </span>
              <div className="flex items-center space-x-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  <span>{new Date(listing.postedDate).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center">
                  <Eye className="h-4 w-4 mr-1" />
                  <span>{listing.views} views</span>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-2 mb-4">
              <MapPin className="h-4 w-4 text-gray-500" />
              <span className="text-gray-600">{listing.location}</span>
              <Separator orientation="vertical" className="h-4" />
              <span className="text-sm text-gray-500 capitalize">
                Condition: {listing.condition}
              </span>
            </div>
          </div>

          {/* AI Tags */}
          <div className="flex flex-wrap gap-2">
            <div className="flex items-center space-x-1 mr-2">
              <Sparkles className="h-4 w-4 text-[#08BDBA]" />
              <span className="text-sm font-medium text-[#08BDBA]">AI Tags:</span>
            </div>
            {listing.aiTags.map(tag => (
              <Badge key={tag} variant="secondary" className="bg-[#08BDBA]/10 text-[#08BDBA]">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Description */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Description</h3>
              <div className="prose max-w-none">
                <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                  {listing.description}
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Specifications */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Specifications</h3>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(listing.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-2 border-b border-gray-100 last:border-0">
                    <span className="text-gray-600 capitalize">{key.replace(/([A-Z])/g, ' $1')}</span>
                    <span className="font-medium text-gray-900">{value}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Contact Seller */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Contact Seller</h3>
              
              {/* Seller Info */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-[#0052CC] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold">
                    {listing.seller.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-medium">{listing.seller.name}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <span>⭐ {listing.seller.rating}</span>
                    <span>•</span>
                    <span>{listing.seller.totalSales} sales</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Button 
                  className="w-full bg-[#08BDBA] hover:bg-[#069a97] text-white"
                  onClick={() => handleContact('message')}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Send Message
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleContact('phone')}
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Seller
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={() => handleContact('email')}
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Email Seller
                </Button>
              </div>

              <Separator className="my-4" />
              
              <div className="text-xs text-gray-500">
                <p>Member since {new Date(listing.seller.memberSince).toLocaleDateString()}</p>
                <p className="mt-1">Usually responds within 2 hours</p>
              </div>
            </CardContent>
          </Card>

          {/* Safety Tips */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Safety Tips</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <p>• Meet in a public place</p>
                <p>• Inspect the item before payment</p>
                <p>• Use secure payment methods</p>
                <p>• Trust your instincts</p>
                <p>• Report suspicious activity</p>
              </div>
            </CardContent>
          </Card>

          {/* Similar Items */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-semibold mb-4">Similar Items</h3>
              <div className="space-y-3">
                {[1, 2, 3].map(item => (
                  <div key={item} className="flex space-x-3 p-2 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <img
                      src={`https://images.unsplash.com/photo-${1592899677977 + item}?w=60&h=60&fit=crop`}
                      alt="Similar item"
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        iPhone 13 Pro {item === 1 ? '128GB' : item === 2 ? '256GB' : '512GB'}
                      </p>
                      <p className="text-sm text-[#0052CC] font-medium">
                        €{(750 + item * 100).toLocaleString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}