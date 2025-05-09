import React from "react";
import HeroSection from "../organisms/Home/HeroSection";
import ExploreCategories from "../organisms/Home/ExploreCategories";
import PopularEvents from "../organisms/Home/PopularEvents";
import EventCardSmall from "../molecules/EventCardSmall";
import { ChevronDown } from "lucide-react";

const EventsTemplate = ({ events = [], loading, error }) => {
  return (
    <div>
      <main>
        <HeroSection title={"Search For A Specific Event"} eventsPage />
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <aside className="md:col-span-1">
              <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-4 dark:text-white">
                  Filters
                </h2>
                <div>
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Price
                  </h3>
                  <div className="space-y-3">
                    {["Free", "Paid"].map((label) => (
                      <label
                        key={label}
                        className="flex items-center gap-3 cursor-pointer text-sm text-gray-600 dark:text-gray-300"
                      >
                        <input
                          type="checkbox"
                          className="appearance-none w-5 h-5 border border-gray-300 dark:border-gray-600 rounded-md checked:bg-primary checked:border-transparent dark:checked:bg-white transition"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Date
                  </h3>
                  <div className="space-y-3">
                    {["Today", "Tomorrow", "This Week", "This Weekend"].map(
                      (label) => (
                        <label
                          key={label}
                          className="flex items-center gap-3 cursor-pointer text-sm text-gray-600 dark:text-gray-300"
                        >
                          <input
                            type="checkbox"
                            className="appearance-none w-5 h-5 border border-gray-300 dark:border-gray-600 rounded-md checked:bg-primary checked:border-transparent dark:checked:bg-white transition"
                          />
                          {label}
                        </label>
                      )
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                    {[
                      "Adventure Travel",
                      "Art Exhibitions",
                      "Auctions & Fundraisers",
                      "Beer Festivals",
                      "Benefit Concerts",
                      "Business & Networking",
                    ].map((label) => (
                      <label
                        key={label}
                        className="flex items-center gap-3 cursor-pointer text-sm text-gray-600 dark:text-gray-300"
                      >
                        <input
                          type="checkbox"
                          className="appearance-none w-5 h-5 border border-gray-300 dark:border-gray-600 rounded-md checked:bg-primary checked:border-transparent dark:checked:bg-white transition"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </aside>

            <section className="md:col-span-3 mb-4">
              <div className="flex justify-end items-center mb-6">
                <div className="relative text-left flex items-center">
                  <label
                    htmlFor="sort"
                    className="mr-3 text-md font-medium text-gray-700 dark:text-gray-300"
                  >
                    Sort by:
                  </label>
                  <div className="relative">
                    <select
                      id="sort"
                      className="appearance-none w-40 border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 px-4 py-2 pr-8 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition"
                    >
                      <option>Relevance</option>
                      <option>Date</option>
                      <option>Price</option>
                    </select>
                    <ChevronDown
                      size={16}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none text-gray-500 dark:text-gray-400"
                    />
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="flex justify-center items-center h-64">
                  <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
                </div>
              ) : error ? (
                <div className="text-center text-red-500 p-4">
                  Error loading events. Please try again later.
                </div>
              ) : events?.length === 0 ? (
                <div className="text-center text-gray-500 p-4">
                  No events found.
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {events?.map((event, idx) => (
                    <EventCardSmall key={event.id || idx} event={event} />
                  ))}
                </div>
              )}
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default EventsTemplate;
