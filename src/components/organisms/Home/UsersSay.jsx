import { useNavigate } from "react-router-dom";
import Button from "../../atoms/Button";
import EventCard from "../../molecules/EventCard";

const UsersSay = () => {
  const navigate = useNavigate();
  return (
    <section className="py-10 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 dark:text-white mb-8 md:mb-16">
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
              "Eventora has transformed how we connect with our audience. The
              platform is intuitive and powerful."
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
    </section>
  );
};

export default UsersSay;
