import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const SearchBox = ({ onSearch, placeholder = "Tìm kiếm..." }) => {
  const [value, setValue] = useState("");

  const handleSearch = () => {
    if (value.trim()) {
      onSearch(value.trim());
      setValue(""); // reset input
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="relative w-full">
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder={placeholder}
        className="w-full h-[48px] px-4 border border-gray-400 rounded-lg text-base focus:outline-none focus:ring-2 focus:ring-orange-400 bg-white"
      />
      <button
        onClick={handleSearch}
        className="absolute right-0 top-0 h-[48px] w-[60px] bg-[#febd69] text-black rounded-r-md hover:bg-orange-400 active:bg-orange-500 transition-colors flex items-center justify-center"
      >
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </div>
  );
};

export default SearchBox;
