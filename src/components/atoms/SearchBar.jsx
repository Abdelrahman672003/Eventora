import { Search } from "lucide-react";

const SearchBar = ({ placeholder = "Search Events, Online events ...", onChange }) => {
  return (
    <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg px-6 py-4 w-full max-w-[80%] md:max-w-2xl bg-white shadow-sm mt-8">
      <Search className="text-gray-500 mr-2" size={25} />
      <input
        type="text"
        placeholder={placeholder}
        onChange={onChange}
        className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 dark:placeholder-gray-500 text-md"
      />
    </div>
  );
};

export default SearchBar;
