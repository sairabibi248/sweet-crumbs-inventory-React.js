import React, { useMemo } from "react";
import "./SearchBar.css";

const SearchBar = ({
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
}) => {
  const categories = useMemo(() => {
    return ["All", "Cakes", "Donuts", "Macarons", "Cupcakes", "Cookies"];
  }, []);

  return (
    <div className="search-section">
      <input
        type="text"
        className="search-input"
        placeholder="Search item or category..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <div className="category-list">
        {categories.map((category) => (
          <button
            key={category}
            className={`category-button ${
              activeCategory === category ? "active" : ""
            }`}
            onClick={() => setActiveCategory(category)}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SearchBar;