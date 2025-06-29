import { Facebook, Twitter, Instagram, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0052CC] text-white">
      <div className="container-custom py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <h3 className="text-3xl font-bold mb-4">SOLD</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              The modern classified ads platform that connects buyers and sellers with AI-powered search and trusted transactions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#08BDBA] transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#08BDBA] transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#08BDBA] transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-[#08BDBA] transition-colors">
                <Youtube className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Browse Listings</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Post an Ad</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Categories</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Advanced Search</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Featured Ads</a></li>
            </ul>
          </div>
          
          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Support</h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Help Center</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Safety Tips</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Community Guidelines</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Contact Support</a></li>
              <li><a href="#" className="text-blue-100 hover:text-white transition-colors">Report Issue</a></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Get in Touch</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-[#08BDBA]" />
                <span className="text-blue-100">hello@sold.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-[#08BDBA]" />
                <span className="text-blue-100">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-[#08BDBA]" />
                <span className="text-blue-100">San Francisco, CA</span>
              </div>
            </div>
            
            <div className="mt-6">
              <h5 className="font-medium mb-3">Newsletter</h5>
              <div className="flex">
                <input 
                  type="email" 
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-l-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-[#08BDBA]"
                />
                <button className="bg-[#08BDBA] hover:bg-[#069a97] px-4 py-2 rounded-r-lg transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-blue-600 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-blue-100 text-sm">
              © 2024 SOLD. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-blue-100 hover:text-white text-sm transition-colors">Privacy Policy</a>
              <a href="#" className="text-blue-100 hover:text-white text-sm transition-colors">Terms of Service</a>
              <a href="#" className="text-blue-100 hover:text-white text-sm transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}