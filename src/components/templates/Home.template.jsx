import React from "react";
import HeroSection from "../organisms/Home/HeroSection";
import ExploreCategories from "../organisms/Home/ExploreCategories";
import PopularEvents from "../organisms/Home/PopularEvents";
import PremiumLoginSection from "../molecules/PremiumLoginSection";

const HomeTemplate = () => {
  return (
    <div>
      <main className="">
        <HeroSection />
        <div className="px-6 md:px-10">
          <ExploreCategories />
          <PopularEvents />
          <PremiumLoginSection />
          <PopularEvents />
        </div>
      </main>
    </div>
  );
};

export default HomeTemplate;
