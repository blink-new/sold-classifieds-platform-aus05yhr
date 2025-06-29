import Header from './components/Header';
import HeroSection from './components/HeroSection';
import CategoriesSection from './components/CategoriesSection';
import FeaturedListings from './components/FeaturedListings';
import TrustFeatures from './components/TrustFeatures';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <CategoriesSection />
        <FeaturedListings />
        <TrustFeatures />
      </main>
      <Footer />
    </div>
  );
}

export default App;