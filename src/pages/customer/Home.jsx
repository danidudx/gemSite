import Header from "../../components/common/Header";
import Footer from "../../components/common/Footer";
import HeroSection from "../../components/customer/HeroSection";
import FeaturedProducts from "../../components/customer/FeaturedProducts";
import CreativeStudio from "../../components/customer/CreativeStudio";
import DiamondShapes from "../../components/customer/DiamondShapes";
import PersonalizedCollection from "../../components/customer/PersonalizedCollection";
import PearlsSection from "../../components/customer/PearlsSection";
import ShowroomSection from "../../components/customer/ShowroomSection";
import WhyJwellco from "../../components/customer/WhyJwellco";
import ReviewsSection from "../../components/customer/ReviewsSection";

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
      <ShowroomSection />
      <WhyJwellco />
      <ReviewsSection />
      <Footer />
    </div>
  );
}
