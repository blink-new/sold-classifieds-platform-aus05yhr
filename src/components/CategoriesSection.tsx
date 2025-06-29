import { 
  Car, 
  Home, 
  Smartphone, 
  Shirt, 
  Sofa, 
  Gamepad2, 
  Book, 
  Briefcase,
  Heart,
  Camera,
  Bike,
  Music
} from 'lucide-react';

const categories = [
  { name: 'Cars & Vehicles', icon: Car, count: '2,431', color: 'bg-blue-500' },
  { name: 'Real Estate', icon: Home, count: '1,892', color: 'bg-green-500' },
  { name: 'Electronics', icon: Smartphone, count: '5,674', color: 'bg-purple-500' },
  { name: 'Fashion', icon: Shirt, count: '3,210', color: 'bg-pink-500' },
  { name: 'Furniture', icon: Sofa, count: '1,567', color: 'bg-orange-500' },
  { name: 'Sports & Gaming', icon: Gamepad2, count: '2,890', color: 'bg-red-500' },
  { name: 'Books & Media', icon: Book, count: '1,234', color: 'bg-indigo-500' },
  { name: 'Jobs', icon: Briefcase, count: '892', color: 'bg-gray-500' },
  { name: 'Health & Beauty', icon: Heart, count: '1,445', color: 'bg-rose-500' },
  { name: 'Photography', icon: Camera, count: '678', color: 'bg-cyan-500' },
  { name: 'Bikes', icon: Bike, count: '543', color: 'bg-emerald-500' },
  { name: 'Music', icon: Music, count: '789', color: 'bg-violet-500' }
];

export default function CategoriesSection() {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-[#0052CC] mb-4">
            Browse by Category
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find exactly what you're looking for in our carefully organized categories
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {categories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div 
                key={index}
                className="group cursor-pointer p-6 rounded-xl bg-gray-50 hover:bg-white border border-gray-100 hover:border-[#08BDBA] transition-all duration-200 card-shadow-hover text-center"
              >
                <div className={`w-12 h-12 ${category.color} rounded-lg flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-200`}>
                  <IconComponent className="h-6 w-6 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-1 group-hover:text-[#0052CC] transition-colors">
                  {category.name}
                </h3>
                <p className="text-sm text-gray-500">
                  {category.count} ads
                </p>
              </div>
            );
          })}
        </div>
        
        <div className="text-center mt-12">
          <button className="text-[#0052CC] font-semibold hover:text-[#003d99] transition-colors">
            View All Categories →
          </button>
        </div>
      </div>
    </section>
  );
}