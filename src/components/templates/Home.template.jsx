import React from "react";
import HeroSection from "../organisms/Home/HeroSection";
import ExploreCategories from "../organisms/Home/ExploreCategories";
import PopularEvents from "../organisms/Home/PopularEvents";
import PremiumLoginSection from "../molecules/PremiumLoginSection";
import EventJourneySection from "../molecules/EventJourney";
import UsersSay from "../organisms/Home/UsersSay";

const HomeTemplate = ({ techEvents, sportsEvents, businessEvents }) => {
  return (
    <div>
      <main className="">
        <HeroSection />
        <div className="px-6 md:px-10">
          <ExploreCategories />
          {techEvents?.length > 0 && (
            <PopularEvents events={techEvents} title="Top Technology Events" />
          )}
          {!localStorage.getItem("user") && <PremiumLoginSection />}
          {sportsEvents?.length > 0 && (
            <PopularEvents events={sportsEvents} title="Top Sports Events" />
          )}
          <EventJourneySection />
          {businessEvents?.length > 0 && (
            <PopularEvents
              events={businessEvents}
              title="Top Business Events"
            />
          )}
          <UsersSay />
        </div>
      </main>
    </div>
  );
};

export default HomeTemplate;
