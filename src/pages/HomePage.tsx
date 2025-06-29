import HeroSection from '../components/HeroSection';
import CategoriesSection from '../components/CategoriesSection';
import FeaturedListings from '../components/FeaturedListings';
import TrustFeatures from '../components/TrustFeatures';

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoriesSection />
      <FeaturedListings />
      <TrustFeatures />
    </>
  );
}