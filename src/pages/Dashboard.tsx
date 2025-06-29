import { useState } from 'react';
import { Plus, Settings, Eye, Edit, Trash2, TrendingUp, DollarSign, Heart, Sparkles, BarChart3 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Separator } from '../components/ui/separator';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';

interface UserListing {
  id: string;
  title: string;
  price: number;
  views: number;
  favorites: number;
  status: 'active' | 'sold' | 'draft';
  postedDate: string;
  image: string;
  aiRecommendation?: string;
}

// Mock user data
const mockUser = {
  name: 'John Doe',
  email: 'john@example.com',
  memberSince: '2022-03-15',
  totalListings: 12,
  totalSales: 8,
  totalRevenue: 4750,
  averageRating: 4.8
};

const mockListings: UserListing[] = [
  {
    id: '1',
    title: 'iPhone 14 Pro Max 256GB Space Black',
    price: 899,
    views: 234,
    favorites: 18,
    status: 'active',
    postedDate: '2024-01-15',
    image: 'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=200',
    aiRecommendation: 'This listing has 30% fewer views than similar items. Consider adding more photos or updating the description.'
  },
  {
    id: '2',
    title: 'BMW X3 2019 - Perfect Family Car',
    price: 28500,
    views: 567,
    favorites: 45,
    status: 'active',
    postedDate: '2024-01-14',
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=200'
  },
  {
    id: '3',
    title: 'MacBook Pro 13" M1 Chip',
    price: 1200,
    views: 89,
    favorites: 7,
    status: 'sold',
    postedDate: '2024-01-10',
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=200'
  }
];

export default function Dashboard() {
  const [listings, setListings] = useState<UserListing[]>(mockListings);
  const [activeTab, setActiveTab] = useState('overview');

  const handleDeleteListing = (id: string) => {
    setListings(prev => prev.filter(listing => listing.id !== id));
    toast.success('Listing deleted successfully');
  };

  const handleMarkAsSold = (id: string) => {
    setListings(prev => prev.map(listing => 
      listing.id === id ? { ...listing, status: 'sold' as const } : listing
    ));
    toast.success('Listing marked as sold!');
  };

  const activeListings = listings.filter(l => l.status === 'active');
  const soldListings = listings.filter(l => l.status === 'sold');

  return (
    <div className="container-custom py-8">
      <div className="max-w-6xl mx-auto">
        {/* Welcome Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Welcome back, {mockUser.name}!</h1>
            <p className="text-gray-600">Manage your listings and track your performance</p>
          </div>
          <Link to="/create">
            <Button className="bg-[#08BDBA] hover:bg-[#069a97] text-white">
              <Plus className="h-4 w-4 mr-2" />
              New Listing
            </Button>
          </Link>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="listings">My Listings</TabsTrigger>
            <TabsTrigger value="favorites">Favorites</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Listings</p>
                      <p className="text-2xl font-bold text-gray-900">{mockUser.totalListings}</p>
                    </div>
                    <BarChart3 className="h-8 w-8 text-[#0052CC]" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Total Sales</p>
                      <p className="text-2xl font-bold text-gray-900">{mockUser.totalSales}</p>
                    </div>
                    <TrendingUp className="h-8 w-8 text-green-500" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Revenue</p>
                      <p className="text-2xl font-bold text-gray-900">€{mockUser.totalRevenue.toLocaleString()}</p>
                    </div>
                    <DollarSign className="h-8 w-8 text-[#08BDBA]" />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600">Rating</p>
                      <p className="text-2xl font-bold text-gray-900">{mockUser.averageRating} ⭐</p>
                    </div>
                    <Heart className="h-8 w-8 text-red-500" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Recommendations */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Sparkles className="h-5 w-5 text-[#08BDBA]" />
                  <span>AI Recommendations</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {listings
                  .filter(listing => listing.aiRecommendation)
                  .map(listing => (
                    <div key={listing.id} className="p-4 bg-[#08BDBA]/5 rounded-lg border border-[#08BDBA]/20">
                      <div className="flex items-start space-x-3">
                        <img
                          src={listing.image}
                          alt={listing.title}
                          className="w-12 h-12 object-cover rounded"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900 mb-1">{listing.title}</h4>
                          <p className="text-sm text-gray-600 mb-2">{listing.aiRecommendation}</p>
                          <Button size="sm" variant="outline" className="text-[#08BDBA] border-[#08BDBA]">
                            <Edit className="h-3 w-3 mr-1" />
                            Improve Listing
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">MacBook Pro listing sold for €1,200</span>
                    <span className="text-xs text-gray-400">2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">BMW X3 listing received 12 new views</span>
                    <span className="text-xs text-gray-400">5 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                    <span className="text-sm text-gray-600">iPhone listing was favorited by 3 users</span>
                    <span className="text-xs text-gray-400">1 day ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* My Listings Tab */}
          <TabsContent value="listings" className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">My Listings</h2>
              <div className="flex space-x-2">
                <Badge variant="outline">{activeListings.length} Active</Badge>
                <Badge variant="outline">{soldListings.length} Sold</Badge>
              </div>
            </div>

            <div className="space-y-4">
              {listings.map(listing => (
                <Card key={listing.id}>
                  <CardContent className="p-6">
                    <div className="flex items-center space-x-4">
                      <img
                        src={listing.image}
                        alt={listing.title}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{listing.title}</h3>
                          <Badge 
                            variant={listing.status === 'active' ? 'default' : listing.status === 'sold' ? 'secondary' : 'outline'}
                            className={
                              listing.status === 'active' ? 'bg-green-100 text-green-800' :
                              listing.status === 'sold' ? 'bg-gray-100 text-gray-800' :
                              'bg-yellow-100 text-yellow-800'
                            }
                          >
                            {listing.status}
                          </Badge>
                        </div>
                        
                        <div className="flex items-center space-x-4 text-sm text-gray-600 mb-3">
                          <span className="font-medium text-[#0052CC]">€{listing.price.toLocaleString()}</span>
                          <Separator orientation="vertical" className="h-4" />
                          <span className="flex items-center">
                            <Eye className="h-3 w-3 mr-1" />
                            {listing.views} views
                          </span>
                          <span className="flex items-center">
                            <Heart className="h-3 w-3 mr-1" />
                            {listing.favorites} favorites
                          </span>
                          <span>Posted {new Date(listing.postedDate).toLocaleDateString()}</span>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Button size="sm" variant="outline">
                            <Edit className="h-3 w-3 mr-1" />
                            Edit
                          </Button>
                          {listing.status === 'active' && (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleMarkAsSold(listing.id)}
                            >
                              Mark as Sold
                            </Button>
                          )}
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="text-red-600 hover:text-red-700"
                            onClick={() => handleDeleteListing(listing.id)}
                          >
                            <Trash2 className="h-3 w-3 mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Favorites Tab */}
          <TabsContent value="favorites">
            <Card>
              <CardContent className="p-12 text-center">
                <Heart className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">No favorites yet</h3>
                <p className="text-gray-500 mb-4">Save interesting listings to keep track of them</p>
                <Link to="/search">
                  <Button variant="outline">Browse Listings</Button>
                </Link>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Settings className="h-5 w-5" />
                  <span>Account Settings</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Profile Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Full Name</label>
                      <input 
                        type="text" 
                        defaultValue={mockUser.name}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0052CC]"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-gray-700 mb-2 block">Email</label>
                      <input 
                        type="email" 
                        defaultValue={mockUser.email}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#0052CC]"
                      />
                    </div>
                  </div>
                </div>

                <Separator />

                <div>
                  <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700">Email notifications for new messages</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700">Push notifications for listing activity</span>
                    </label>
                    <label className="flex items-center space-x-3">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700">Weekly performance reports</span>
                    </label>
                  </div>
                </div>

                <Separator />

                <div className="flex justify-end space-x-4">
                  <Button variant="outline">Cancel</Button>
                  <Button className="bg-[#0052CC] hover:bg-[#003d99]">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}