import { useNavigate } from "react-router-dom";
import {
  category1,
  category2,
  category3,
  category4,
  category5,
  category6,
} from "../../../assets";

const categories = [
  {
    title: "Entertainment",
    image: category1,
  },
  {
    title: "Educational & Business",
    image: category2,
  },
  {
    title: "Cultural & Arts",
    image: category3,
  },
  {
    title: "Sports & Fitness",
    image: category4,
  },
  {
    title: "Technology & Innovation",
    image: category5,
  },
  {
    title: "Travel & Adventure",
    image: category6,
  },
];

const ExploreCategories = () => {
  const navigate = useNavigate();
  return (
    <section className="py-10 px-4 md:px-10 bg-white dark:bg-gray-900">
      <h2 className="text-2xl md:text-3xl font-bold mb-8 text-center text-primary dark:text-white">
        Explore Categories
      </h2>
      <div className="max-w-[1100px] mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6 mt-4">
        {categories.map((category, index) => (
          <div
            key={index}
            className="flex flex-col items-center text-center cursor-pointer hover:scale-105 transition-transform duration-200"
            onClick={() =>
              navigate(`/events`, { state: { category: category?.title } })
            }
          >
            <div className="w-28 h-28 sm:w-28 sm:h-28 md:w-30 md:h-30 rounded-full overflow-hidden shadow-md hover:shadow-2xl">
              <img
                src={category?.image}
                alt={category?.title}
                className="w-full h-full object-cover"
              />
            </div>
            <span className="mt-2 text-sm md:text-base font-medium text-primary dark:text-white">
              {category?.title}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExploreCategories;
