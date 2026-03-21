import NavBar from "@/components/NavBar";
import HeroSection from "@/components/HeroSection";
import StatsBar from "@/components/StatsBar";
import FeaturedVideos from "@/components/FeaturedVideos";
import MerchSection from "@/components/MerchSection";
import DesktopFooter from "@/components/DesktopFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0e0e0e]">
      <NavBar />
      <HeroSection />
      <StatsBar />
      <FeaturedVideos />
      <MerchSection />
      <DesktopFooter />
    </div>
  );
}
