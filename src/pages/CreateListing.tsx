import { useState } from 'react';
import { Sparkles, Upload, MapPin, Tag, DollarSign, Wand2, Loader2, Camera } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import toast from 'react-hot-toast';
import { aiService } from '../services/aiService';

interface AIAssistantResult {
  title: string;
  description: string;
  category: string;
  suggestedPrice: number;
  tags: string[];
}

export default function CreateListing() {
  const [keywords, setKeywords] = useState('');
  const [isAIProcessing, setIsAIProcessing] = useState(false);
  const [aiResult, setAIResult] = useState<AIAssistantResult | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: '',
    price: '',
    condition: '',
    location: '',
    images: [] as string[]
  });

  const handleAIGenerate = async () => {
    if (!keywords.trim()) {
      toast.error('Please enter some keywords about your item');
      return;
    }

    setIsAIProcessing(true);
    
    try {
      // Use the AI service to generate listing content
      const aiResult = await aiService.generateListingContent(keywords);
      
      setAIResult(aiResult);
      setFormData(prev => ({
        ...prev,
        title: aiResult.title,
        description: aiResult.description,
        category: aiResult.category,
        price: aiResult.suggestedPrice.toString()
      }));
      
      toast.success('🤖 AI has generated your listing!');
    } catch {
      toast.error('AI generation failed. Please try again.');
    } finally {
      setIsAIProcessing(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title || !formData.description || !formData.category || !formData.price) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    // Simulate posting
    toast.success('🎉 Your listing has been posted successfully!');
    
    // Reset form
    setFormData({
      title: '',
      description: '',
      category: '',
      price: '',
      condition: '',
      location: '',
      images: []
    });
    setAIResult(null);
    setKeywords('');
  };

  return (
    <div className="container-custom py-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Listing</h1>
          <p className="text-gray-600">Use our AI assistant to create the perfect listing in seconds</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AI Assistant */}
          <Card className="h-fit">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-[#08BDBA]" />
                <span>AI Listing Assistant</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-2 block">
                  Tell AI about your item
                </label>
                <Textarea
                  placeholder="e.g., iPhone 14 Pro Max, 256GB, space black, excellent condition, with original box and charger"
                  value={keywords}
                  onChange={(e) => setKeywords(e.target.value)}
                  className="min-h-[100px]"
                />
              </div>
              
              <Button 
                onClick={handleAIGenerate}
                disabled={isAIProcessing || !keywords.trim()}
                className="w-full bg-[#08BDBA] hover:bg-[#069a97] text-white"
              >
                {isAIProcessing ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    AI is working...
                  </>
                ) : (
                  <>
                    <Wand2 className="h-4 w-4 mr-2" />
                    Generate with AI
                  </>
                )}
              </Button>

              {aiResult && (
                <div className="mt-6 p-4 bg-[#08BDBA]/5 rounded-lg border border-[#08BDBA]/20">
                  <div className="flex items-center space-x-2 mb-3">
                    <Sparkles className="h-4 w-4 text-[#08BDBA]" />
                    <span className="text-sm font-medium text-[#08BDBA]">AI Generated Content</span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <span className="text-xs font-medium text-gray-600">Suggested Title:</span>
                      <p className="text-sm text-gray-900">{aiResult.title}</p>
                    </div>
                    
                    <div>
                      <span className="text-xs font-medium text-gray-600">Category:</span>
                      <p className="text-sm text-gray-900 capitalize">{aiResult.category}</p>
                    </div>
                    
                    <div>
                      <span className="text-xs font-medium text-gray-600">Price Range:</span>
                      <p className="text-sm text-gray-900">€{aiResult.suggestedPrice.toLocaleString()}</p>
                    </div>
                    
                    <div>
                      <span className="text-xs font-medium text-gray-600">AI Tags:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {aiResult.tags.map(tag => (
                          <Badge key={tag} variant="secondary" className="text-xs bg-[#08BDBA]/10 text-[#08BDBA]">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Listing Form */}
          <Card>
            <CardHeader>
              <CardTitle>Listing Details</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Title */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Title *
                  </label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    placeholder="What are you selling?"
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Description *
                  </label>
                  <Textarea
                    value={formData.description}
                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                    placeholder="Describe your item in detail..."
                    className="min-h-[120px]"
                    required
                  />
                </div>

                {/* Category & Price */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Category *
                    </label>
                    <Select 
                      value={formData.category} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="electronics">Electronics</SelectItem>
                        <SelectItem value="vehicles">Vehicles</SelectItem>
                        <SelectItem value="home-garden">Home & Garden</SelectItem>
                        <SelectItem value="fashion-beauty">Fashion & Beauty</SelectItem>
                        <SelectItem value="sports-hobbies">Sports & Hobbies</SelectItem>
                        <SelectItem value="books-media">Books & Media</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Price (€) *
                    </label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        type="number"
                        value={formData.price}
                        onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
                        placeholder="0"
                        className="pl-10"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Condition & Location */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Condition
                    </label>
                    <Select 
                      value={formData.condition} 
                      onValueChange={(value) => setFormData(prev => ({ ...prev, condition: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="new">New</SelectItem>
                        <SelectItem value="excellent">Excellent</SelectItem>
                        <SelectItem value="good">Good</SelectItem>
                        <SelectItem value="fair">Fair</SelectItem>
                        <SelectItem value="poor">Poor</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <label className="text-sm font-medium text-gray-700 mb-2 block">
                      Location
                    </label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        value={formData.location}
                        onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                        placeholder="City, Country"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Images */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Photos
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-[#08BDBA] transition-colors">
                    <Camera className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Drag photos here or click to upload
                    </p>
                    <Button type="button" variant="outline" size="sm">
                      <Upload className="h-4 w-4 mr-2" />
                      Choose Files
                    </Button>
                  </div>
                </div>

                <Separator />

                {/* Submit */}
                <div className="flex space-x-4">
                  <Button type="submit" className="flex-1 bg-[#0052CC] hover:bg-[#003d99] text-white">
                    <Tag className="h-4 w-4 mr-2" />
                    Post Listing
                  </Button>
                  <Button type="button" variant="outline" className="px-8">
                    Save Draft
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}