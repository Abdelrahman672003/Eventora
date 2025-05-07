import React from "react";

const AboutTemplate = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 px-6 py-16 pt-36">
      <div className="max-w-5xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
          About Eventify
        </h1>
        <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed">
          Eventify is your personalized event discovery platform designed to
          help you explore, book, and enjoy the best events in your city.
          Whether it's concerts, business expos, festivals, or workshops — we
          curate events to suit your interests and make your experiences
          unforgettable.
        </p>

        <div className="mt-12 grid gap-8 md:grid-cols-3 text-left">
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              🎯 Our Mission
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              To bring people closer to the events they love and connect
              communities through shared experiences.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              🌍 Our Vision
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              A world where discovering local and global events is seamless,
              accessible, and tailored to everyone.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
              💡 Why Eventify
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Smart suggestions, instant bookings, event tracking, and a vibrant
              community — all in one place.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTemplate;
