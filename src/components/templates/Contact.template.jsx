import React from "react";

const ContactTemplate = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 px-6 py-16 pt-36">
      <div className="max-w-3xl mx-auto text-center">
        <h1 className="text-4xl font-bold mb-6 text-gray-800 dark:text-white">
          Contact Us
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mb-10 text-lg">
          Have questions, feedback, or partnership inquiries? Reach out and
          we’ll get back to you as soon as possible!
        </p>

        <form className="space-y-6 text-left">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
          />
          <textarea
            rows="5"
            placeholder="Your Message"
            className="w-full border border-gray-300 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
          ></textarea>
          <button
            type="submit"
            className="bg-[#2c253a] text-white py-3 px-6 rounded-xl font-medium hover:bg-[#1f1a2d] transition"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactTemplate;
