import { Facebook, Instagram, Youtube, ArrowUp, X } from "lucide-react";
import { logo5 } from "../../assets";

const Footer = () => {
  return (
    <footer className="relative bg-gray-900 text-white px-8 py-12 rounded-t-3xl mt-16 overflow-hidden dark:bg-primary">
      <div className="max-w-7xl mx-auto grid md:grid-cols-5 gap-8">
        <div className="md:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-6">
          <div>
            <ul className="space-y-2 text-sm">
              <li>Home</li>
              <li>Events</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 text-sm mt-10 sm:mt-0">
              <li>Entertainment Events</li>
              <li>Educational & Business Events</li>
              <li>Cultural & Arts Events</li>
            </ul>
          </div>
          <div>
            <ul className="space-y-2 text-sm mt-10 sm:mt-0">
              <li>Sports & Fitness Events</li>
              <li>Technology & Innovation Events</li>
              <li>Travel & Adventure Events</li>
            </ul>
          </div>
        </div>

        <div className="md:col-span-2 flex flex-col justify-between items-start text-right md:text-left">
          <p className="text-xs mb-1 text-gray-200 uppercase tracking-wider">
            Want to attend a new event?
          </p>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">
            Book Your Ticket!
          </h2>
        </div>
      </div>

      <hr className="mb-2 mt-8 border-gray-400 border-dotted" />

      {/* Bottom Bar */}
      <div className="flex flex-row justify-between items-center text-sm text-gray-200 space-y-4 sm:space-y-0">
        <div className="flex items-center">
          <div className="text-white text-xl font-bold flex items-center gap-2">
            <img src={logo5} alt="" className="h-16" />
          </div>
        </div>
        <div className="flex gap-4 text-white items-center">
          <Facebook size={24} />
          <Instagram size={24} />
          <Youtube size={24} />
          <button className="bg-white text-primary p-2 rounded-md cursor-pointer">
            <ArrowUp size={18} />
          </button>
        </div>
      </div>

      {/* Glow border underneath */}
      <div className="absolute -bottom-2 left-4 right-4 h-2 bg-secondary rounded-b-3xl blur-lg" />

      {/* Bottom Bar */}
      <div className="mt-0 pt-0 text-center text-sm text-gray-400">
        ©2025 Eventora. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
