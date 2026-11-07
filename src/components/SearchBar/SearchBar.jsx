import "./SearchBar.css";

/**
 * Search box and category filter buttons.
 * Lets the user find products by name or show only one category.
 *
 * Data flow: useInventory (Hooks/useInventory.js) to Dashboard.jsx to SearchBar.jsx
 * The search and category values and their setters are created in useInventory hook
 * Dashboard takes them from the hook and passes them here as props.
 * This component does not filter products itself - filtering happens in useInventory.
 * *
 * @param {object} props
 * @param {string} props.searchTerm - Text currently typed in the search box (from useInventory)
 * @param {function} props.setSearchTerm - Updates the search text in useInventory
 * @param {string} props.activeCategory - Category that is currently selected (from useInventory)
 * @param {function} props.setActiveCategory - Changes the selected category in useInventory
 */
const SearchBar = ({
  searchTerm,
  setSearchTerm,
  activeCategory,
  setActiveCategory,
}) => {
  /**
   * Category names shown as filter buttons.
   * "All" shows every product.
   */
  const categories = [
    "All",
    "Cakes",
    "Donuts",
    "Macarons",
    "Cupcakes",
    "Cookies",
  ];

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
