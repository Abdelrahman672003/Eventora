import React from "react";
import { EventCardSmall, Button } from "../index";
import { ChevronDown, Search } from "lucide-react";

const EventsTemplate = ({
  events = [],
  loading,
  error,
  filters,
  onFilterChange,
  onSearch,
  onApplyFilters,
  removeAllFilters,
}) => {
  const categories = [
    "Entertainment",
    "Educational & Business",
    "Cultural & Arts",
    "Sports & Fitness",
    "Technology & Innovation",
    "Travel & Adventure",
  ];

  return (
    <div>
      <main>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 pt-30">
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
            <aside className="md:col-span-1">
              <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
                <h2 className="text-lg font-semibold mb-4 dark:text-white">
                  Filters
                </h2>

                <div className="mb-6">
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Search events..."
                      value={filters.search}
                      onChange={(e) => onSearch(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                    />
                    <Search
                      size={18}
                      className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    />
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Price Range
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    <div>
                      <input
                        type="number"
                        placeholder="Min"
                        value={filters.minPrice}
                        onChange={(e) =>
                          onFilterChange("minPrice", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        placeholder="Max"
                        value={filters.maxPrice}
                        onChange={(e) =>
                          onFilterChange("maxPrice", e.target.value)
                        }
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                      />
                    </div>
                  </div>
                </div>

                <div className="mb-6">
                  <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                    Category
                  </h3>
                  <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                    {categories.map((label) => (
                      <label
                        key={label}
                        className="flex items-center gap-3 cursor-pointer text-sm text-gray-600 dark:text-gray-300"
                      >
                        <input
                          name="category"
                          type="radio"
                          checked={filters.category.includes(label)}
                          onChange={() => {
                            onFilterChange("category", label);
                          }}
                          className="appearance-none w-5 h-5 border border-gray-300 dark:border-gray-600 rounded-md checked:bg-primary checked:border-transparent dark:checked:bg-white transition"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={onApplyFilters}
                  className="w-full bg-primary text-white hover:bg-primary/90 dark:bg-secondary dark:text-primary dark:hover:bg-secondary/90"
                >
                  Apply Filters
                </Button>
                <Button
                  onClick={removeAllFilters}
                  className="mt-2 w-full bg-gray-900 text-white hover:bg-gray-800 dark:bg-secondary dark:text-primary dark:hover:bg-secondary/90"
                >
                  Remove All Filters
                </Button>
              </div>
            </aside>

            <section className="md:col-span-3 mb-4">
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
                  No events found matching your filters.
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
