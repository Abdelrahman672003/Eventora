import React from "react";
import HeroSection from "../organisms/Home/HeroSection";
import ExploreCategories from "../organisms/Home/ExploreCategories";
import PopularEvents from "../organisms/Home/PopularEvents";
import PremiumLoginSection from "../molecules/PremiumLoginSection";
import EventJourneySection from "../molecules/EventJourney";

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

          <div className="py-10 bg-gray-50 dark:bg-gray-900">
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-16">
                What Our Users Say
              </h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center text-purple-600 dark:text-purple-400 font-bold">
                      MF
                    </div>
                    <div className="ml-4">
                      <div className="font-bold text-gray-800 dark:text-white">
                        Mohamed Farouk
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        Founder of Mobica
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    "Eventora has transformed how we connect with our audience.
                    The platform is intuitive and powerful."
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center text-blue-600 dark:text-blue-400 font-bold">
                      MI
                    </div>
                    <div className="ml-4">
                      <div className="font-bold text-gray-800 dark:text-white">
                        Mohamed Ibrahim
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        CEO of Skill Code
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    "I've discovered so many amazing events I would have missed
                    otherwise. The recommendations are spot on!"
                  </p>
                </div>
                <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center text-green-600 dark:text-green-400 font-bold">
                      AD
                    </div>
                    <div className="ml-4">
                      <div className="font-bold text-gray-800 dark:text-white">
                        Ahmed Dwidar
                      </div>
                      <div className="text-gray-500 dark:text-gray-400">
                        CEO of Mawaheb Academy
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-600 dark:text-gray-400">
                    "The community features are fantastic. I've met so many
                    like-minded people through Eventora events."
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HomeTemplate;
