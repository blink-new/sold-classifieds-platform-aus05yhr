import { GoogleGenerativeAI } from '@google/generative-ai';

// Note: In production, this would be handled by a backend API for security
// For demo purposes, we'll use mock responses that simulate Gemini AI

interface AISearchResult {
  category: string;
  minPrice?: number;
  maxPrice?: number;
  condition?: string;
  brand?: string;
  location?: string;
}

interface AIListingGeneration {
  title: string;
  description: string;
  category: string;
  suggestedPrice: number;
  tags: string[];
}

interface AIRecommendation {
  type: 'performance' | 'optimization' | 'pricing';
  message: string;
  action?: string;
}

class AIService {
  private genAI: GoogleGenerativeAI | null = null;

  constructor() {
    // In a real app, this would be handled by the backend
    // const apiKey = process.env.VITE_GEMINI_API_KEY;
    // if (apiKey) {
    //   this.genAI = new GoogleGenerativeAI(apiKey);
    // }
  }

  async parseNaturalLanguageSearch(query: string): Promise<AISearchResult> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Mock AI parsing logic (in production, this would use Gemini AI)
    return this.mockParseSearch(query);
  }

  async generateListingContent(keywords: string): Promise<AIListingGeneration> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Mock AI generation logic (in production, this would use Gemini AI)
    return this.mockGenerateListing(keywords);
  }

  async generateListingRecommendations(listingData: {
    title: string;
    views: number;
    age: number;
  }): Promise<AIRecommendation[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Mock recommendations based on listing performance
    const recommendations: AIRecommendation[] = [];
    
    if (listingData.views < 50 && listingData.age > 7) {
      recommendations.push({
        type: 'optimization',
        message: 'This listing has low visibility. Consider improving the title and adding more photos.',
        action: 'Optimize Listing'
      });
    }
    
    if (listingData.views > 200 && listingData.age < 3) {
      recommendations.push({
        type: 'pricing',
        message: 'High interest detected! You might be able to increase the price by 10-15%.',
        action: 'Adjust Price'
      });
    }

    return recommendations;
  }

  async generateProductTags(title: string, description: string): Promise<string[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 600));

    const lowerTitle = title.toLowerCase();
    const lowerDesc = description.toLowerCase();
    const tags: string[] = [];

    // Mock tag generation logic
    if (lowerTitle.includes('iphone') || lowerDesc.includes('iphone')) {
      tags.push('smartphone', 'apple', 'mobile', 'technology', 'premium');
    } else if (lowerTitle.includes('car') || lowerTitle.includes('bmw') || lowerTitle.includes('auto')) {
      tags.push('vehicle', 'transportation', 'automotive', 'luxury', 'reliable');
    } else if (lowerTitle.includes('furniture') || lowerDesc.includes('table') || lowerDesc.includes('chair')) {
      tags.push('furniture', 'home', 'interior', 'wooden', 'decor');
    } else {
      tags.push('quality', 'excellent-condition', 'popular', 'trending');
    }

    return tags;
  }

  private mockParseSearch(query: string): AISearchResult {
    const lowerQuery = query.toLowerCase();
    const result: AISearchResult = {
      category: '',
      location: ''
    };

    // Extract price ranges
    const priceMatches = lowerQuery.match(/(\d+(?:,\d{3})*(?:\.\d{2})?)\s*(?:€|euro|eur|dollars?|\$)/gi);
    if (priceMatches) {
      const prices = priceMatches.map(match => 
        parseFloat(match.replace(/[€$,]/g, '').replace(/euro|eur|dollars?/gi, ''))
      );
      
      if (lowerQuery.includes('under') || lowerQuery.includes('below') || lowerQuery.includes('max')) {
        result.maxPrice = Math.max(...prices);
      } else if (lowerQuery.includes('over') || lowerQuery.includes('above') || lowerQuery.includes('min')) {
        result.minPrice = Math.min(...prices);
      } else if (prices.length === 2) {
        result.minPrice = Math.min(...prices);
        result.maxPrice = Math.max(...prices);
      } else if (prices.length === 1) {
        result.maxPrice = prices[0];
      }
    }

    // Extract categories
    if (lowerQuery.includes('car') || lowerQuery.includes('vehicle') || lowerQuery.includes('auto') || lowerQuery.includes('bmw') || lowerQuery.includes('mercedes')) {
      result.category = 'vehicles';
    } else if (lowerQuery.includes('phone') || lowerQuery.includes('iphone') || lowerQuery.includes('smartphone') || lowerQuery.includes('mobile')) {
      result.category = 'electronics';
    } else if (lowerQuery.includes('furniture') || lowerQuery.includes('chair') || lowerQuery.includes('table') || lowerQuery.includes('sofa')) {
      result.category = 'home-garden';
    } else if (lowerQuery.includes('clothing') || lowerQuery.includes('shirt') || lowerQuery.includes('dress') || lowerQuery.includes('shoes')) {
      result.category = 'fashion-beauty';
    }

    // Extract condition
    if (lowerQuery.includes('new') || lowerQuery.includes('brand new')) {
      result.condition = 'new';
    } else if (lowerQuery.includes('used') || lowerQuery.includes('second hand')) {
      result.condition = 'used';
    } else if (lowerQuery.includes('excellent')) {
      result.condition = 'excellent';
    }

    // Extract brand
    const brands = ['apple', 'samsung', 'bmw', 'mercedes', 'audi', 'volkswagen', 'ikea', 'nike', 'adidas'];
    for (const brand of brands) {
      if (lowerQuery.includes(brand)) {
        result.brand = brand;
        break;
      }
    }

    // Extract location hints
    if (lowerQuery.includes('riga') || lowerQuery.includes('latvia')) {
      result.location = 'riga';
    } else if (lowerQuery.includes('vilnius') || lowerQuery.includes('lithuania')) {
      result.location = 'vilnius';
    } else if (lowerQuery.includes('tallinn') || lowerQuery.includes('estonia')) {
      result.location = 'tallinn';
    }

    return result;
  }

  private mockGenerateListing(keywords: string): AIListingGeneration {
    const lowerKeywords = keywords.toLowerCase();

    if (lowerKeywords.includes('iphone') || lowerKeywords.includes('phone')) {
      return {
        title: 'iPhone 14 Pro Max 256GB Space Black - Excellent Condition',
        description: `iPhone 14 Pro Max in excellent condition with 256GB storage in Space Black. This device has been carefully maintained and shows minimal signs of use.

Key Features:
• 6.7" Super Retina XDR Display with ProMotion
• A16 Bionic chip for lightning-fast performance  
• Pro Camera System with 48MP main camera
• All-day battery life with fast charging
• 5G connectivity for ultra-fast internet

What's Included:
- Original retail box with all documentation
- Lightning to USB-C cable (unused)
- Clear protective case (applied since day one)
- Screen protector (already installed)

Condition Details:
- Battery health: 95%
- No scratches, dents, or functional issues
- Always kept in protective case
- Non-smoking environment
- Regular iOS updates maintained

Perfect for photography enthusiasts, professionals, or anyone wanting a premium smartphone experience. Ready for immediate use with your carrier.`,
        category: 'electronics',
        suggestedPrice: 899,
        tags: ['smartphone', 'apple', 'premium', 'photography', 'high-performance', 'excellent-condition']
      };
    } else if (lowerKeywords.includes('car') || lowerKeywords.includes('bmw') || lowerKeywords.includes('vehicle')) {
      return {
        title: 'BMW X3 2019 xDrive30i - Reliable Premium SUV',
        description: `Well-maintained BMW X3 from 2019 with comprehensive service history. Perfect family vehicle combining luxury, reliability, and performance.

Vehicle Specifications:
• Engine: 2.0L TwinPower Turbo 4-cylinder
• Drivetrain: xDrive all-wheel drive system
• Transmission: 8-speed automatic
• Mileage: 68,500 km (highway driven)
• Fuel Economy: 8.2L/100km combined

Premium Features:
- BMW iDrive infotainment system
- Panoramic sunroof
- Heated leather seats (front and rear)
- Advanced driver assistance systems
- Premium Harman Kardon sound system
- Adaptive LED headlights

Maintenance Record:
- Full BMW dealer service history
- Recent inspection completed
- New tires installed 6 months ago
- Oil changes every 10,000km
- No accidents or damage history

Ideal for families seeking a reliable, luxurious, and safe vehicle. Excellent condition both mechanically and cosmetically.`,
        category: 'vehicles',
        suggestedPrice: 28500,
        tags: ['suv', 'family-car', 'reliable', 'premium', 'well-maintained', 'luxury']
      };
    } else if (lowerKeywords.includes('laptop') || lowerKeywords.includes('macbook') || lowerKeywords.includes('computer')) {
      return {
        title: 'MacBook Pro 13" M1 Chip 512GB - Perfect for Professionals',
        description: `MacBook Pro 13" with Apple's revolutionary M1 chip. Perfect for professionals, students, and creatives who need powerful performance in a portable package.

Technical Specifications:
• Apple M1 chip with 8-core CPU and 8-core GPU
• 16GB unified memory for seamless multitasking
• 512GB SSD storage with lightning-fast access
• 13.3" Retina display with True Tone technology
• Up to 17 hours of wireless web browsing

Professional Features:
- Final Cut Pro and Logic Pro ready
- Exceptional performance for video editing
- Silent operation (fanless design)
- Touch Bar and Touch ID for security
- Two Thunderbolt/USB 4 ports

What's Included:
- Original Apple packaging and documentation
- 61W USB-C Power Adapter
- USB-C charging cable
- Never-removed keyboard covers
- Laptop sleeve included

Condition: Like new, barely used for light office work. No scratches, dents, or functional issues. Battery cycle count under 50. Perfect for professionals transitioning to Apple ecosystem.`,
        category: 'electronics',
        suggestedPrice: 1200,
        tags: ['laptop', 'apple', 'professional', 'powerful', 'portable', 'like-new']
      };
    } else {
      return {
        title: 'High-Quality Item in Excellent Condition',
        description: `Well-maintained item in excellent condition, perfect for daily use. This product offers great value and functionality for its price range.

Key Features:
• Excellent build quality and durability
• Well cared for with minimal wear
• All original components included
• Fully functional with no known issues
• Ready for immediate use

Condition Details:
- Carefully stored in clean environment
- Regular maintenance performed as needed
- No damage or functional problems
- Original packaging available
- Non-smoking household

Perfect for someone looking for a reliable, quality item at a great price. Ideal for both personal and professional use.`,
        category: 'home-garden',
        suggestedPrice: 150,
        tags: ['quality', 'well-maintained', 'excellent-condition', 'reliable', 'value']
      };
    }
  }
}

export const aiService = new AIService();
export default aiService;