import React from "react";
import EventJourneySection from "../molecules/EventJourney";

const AboutTemplate = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="relative bg-primary dark:bg-gray-800 overflow-hidden">
        <div className="absolute inset-0 bg-grid-white/[0.05] bg-[size:20px_20px]" />
        <div className="relative max-w-7xl mx-auto px-6 py-20 pt-40 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-6">
            About Eventora
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto leading-relaxed">
            Your ultimate destination for discovering and experiencing the best
            events in all the world. We're revolutionizing how people connect
            with events.
          </p>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-primary dark:text-white mb-2">
                10K+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Active Events
              </div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary dark:text-white mb-2">
                50K+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Happy Users
              </div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary dark:text-white mb-2">
                100+
              </div>
              <div className="text-gray-600 dark:text-gray-400">
                Cities Covered
              </div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-primary dark:text-white mb-2">
                24/7
              </div>
              <div className="text-gray-600 dark:text-gray-400">Support</div>
            </div>
          </div>
        </div>
      </div>

      <div className="pb-20 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-4 md:gap-16 items-center">
            <div className="relative h-full w-full">
              <div className="h-full w-full rounded-2xl overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3"
                  alt="Event celebration"
                  className="object-cover w-full h-full"
                />
              </div>
            </div>
            <div className="flex flex-col justify-between h-full gap-4 md:gap-8">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Our Mission
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  To create meaningful connections through events, bringing
                  people together and fostering community growth through shared
                  experiences.
                </p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg">
                <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                  Our Vision
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  To be the world's most trusted platform for event discovery,
                  making every event accessible and memorable for everyone.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8">
        <EventJourneySection />
      </div>
    </div>
  );
};

export default AboutTemplate;
