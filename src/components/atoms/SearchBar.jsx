import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const SearchBar = ({ placeholder = "Search Events, Online events ..." }) => {
  const [searchValue, setSearchValue] = useState("");
  const navigate = useNavigate();

  const handleSearch = (value) => {
    navigate("/events", { state: { search: value } });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSearch(searchValue);
    }
  };

  return (
    <div className="flex items-center border border-gray-300 dark:border-gray-700 rounded-lg px-6 py-4 w-full max-w-[80%] md:max-w-2xl bg-white shadow-sm mt-8">
      <Search
        className="text-gray-500 mr-2 cursor-pointer"
        size={25}
        onClick={() => handleSearch(searchValue)}
      />
      <input
        type="text"
        placeholder={placeholder}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full bg-transparent outline-none text-gray-800 placeholder-gray-400 dark:placeholder-gray-500 text-md"
      />
    </div>
  );
};

export default SearchBar;
