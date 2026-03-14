import React, { useState } from "react";
import "./App.css";
import NewsBanner from "./components/NewsBanner";
import Navbar from "./components/Navbar";
import HeroSection from "./components/HeroSection";
import MissionSection from "./components/MissionSection";
import ApproachSection from "./components/ApproachSection";
import InfrastructureSection from "./components/InfrastructureSection";
import ScalingSection from "./components/ScalingSection";
import NewsSection from "./components/NewsSection";
import Footer from "./components/Footer";
import {
  newsBanner,
  navLinks,
  heroData,
  missionData,
  approachData,
  infrastructureData,
  scalingData,
  newsData,
  footerData,
} from "./data/mockData";

function App() {
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <div className="App">
      <NewsBanner data={newsBanner} onClose={() => setBannerVisible(false)} />
      <Navbar links={navLinks} bannerVisible={bannerVisible} />
      <HeroSection data={heroData} bannerVisible={bannerVisible} />
      <MissionSection data={missionData} />
      <ApproachSection data={approachData} />
      <InfrastructureSection data={infrastructureData} />
      <ScalingSection data={scalingData} />
      <NewsSection data={newsData} />
      <Footer data={footerData} />
    </div>
  );
}

export default App;
