import { Shield, Zap, Users, ThumbsUp, MessageCircle, Star } from 'lucide-react';

const features = [
  {
    icon: Shield,
    title: "Secure & Safe",
    description: "Advanced verification system and fraud protection keep you safe",
    color: "bg-green-500"
  },
  {
    icon: Zap,
    title: "AI-Powered Search",
    description: "Find exactly what you need with natural language search",
    color: "bg-blue-500"
  },
  {
    icon: Users,
    title: "Trusted Community",
    description: "Join millions of verified buyers and sellers worldwide",
    color: "bg-purple-500"
  },
  {
    icon: ThumbsUp,
    title: "Quality Guaranteed",
    description: "Every listing is reviewed and verified by our team",
    color: "bg-orange-500"
  },
  {
    icon: MessageCircle,
    title: "24/7 Support",
    description: "Get help whenever you need it from our expert team",
    color: "bg-pink-500"
  },
  {
    icon: Star,
    title: "Top Rated",
    description: "Rated #1 classified platform by users for 3 years running",
    color: "bg-yellow-500"
  }
];

const stats = [
  { number: "2.5M+", label: "Active Users" },
  { number: "50K+", label: "Daily Listings" },
  { number: "98%", label: "Success Rate" },
  { number: "4.9★", label: "User Rating" }
];

export default function TrustFeatures() {
  return (
    <section className="py-20 bg-white">
      <div className="container-custom">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl font-bold text-[#0052CC] mb-2">
                {stat.number}
              </div>
              <div className="text-gray-600 font-medium">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Features Grid */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-[#0052CC] mb-4">
            Why Choose SOLD?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've built the most trusted and advanced classified ads platform to make buying and selling effortless
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                className="p-8 rounded-xl bg-gray-50 hover:bg-white border border-gray-100 hover:border-[#08BDBA] transition-all duration-200 card-shadow-hover text-center group"
              >
                <div className={`w-16 h-16 ${feature.color} rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-200`}>
                  <IconComponent className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4 group-hover:text-[#0052CC] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
        
        {/* CTA Section */}
        <div className="text-center mt-16 p-12 bg-gradient-to-r from-[#0052CC] to-[#08BDBA] rounded-2xl text-white">
          <h3 className="text-3xl font-bold mb-4">Ready to Get Started?</h3>
          <p className="text-xl mb-8 text-blue-100">
            Join our community of millions and start buying or selling today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-[#0052CC] px-8 py-3 rounded-xl font-semibold hover:bg-gray-100 transition-colors">
              Create Account
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-xl font-semibold hover:bg-white hover:text-[#0052CC] transition-colors">
              Browse Listings
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}