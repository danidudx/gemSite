import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import HeroSection from "../../components/customer/HeroSection";
import FeaturedProducts from "../../components/customer/FeaturedProducts";
import CreativeStudio from "../../components/customer/CreativeStudio";
import DiamondShapes from "../../components/customer/DiamondShapes";
import PersonalizedCollection from "../../components/customer/PersonalizedCollection";
import PearlsSection from "../../components/customer/PearlsSection";

import WhyJwellco from "../../components/customer/WhyJwellco";


export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      <HeroSection />
      <FeaturedProducts />
      <CreativeStudio />
      <DiamondShapes />
      <PersonalizedCollection />
      <PearlsSection />
     
      <WhyJwellco />
      
      <Footer />
    </div>
  );
}
