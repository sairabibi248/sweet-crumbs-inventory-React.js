import React, { useState, useMemo } from "react";
import "./SearchBar.css";

const SearchBar = ({ onSearch, onCategorySelect }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = useMemo(() => {
    return ["All", "Cakes", "Donuts", "Macarons", "Cupcakes", "Cookies"];
  }, []);

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value);
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    if (onCategorySelect) {
      onCategorySelect(category);
    }
  };

  return (
    <div className="search-section">
 
      <input
        type="text"
        className="search-input"
        placeholder="Search item or category..."
        value={searchTerm}
        onChange={handleSearchChange}
      />

   
      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;
