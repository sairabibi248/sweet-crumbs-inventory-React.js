
import "./SearchBar.css";

/**
 * Search box and category filter buttons.
 * Lets the user find products by name or show only one category.
 *
 * @param {object} props
 * @param {string} props.searchTerm - Text currently typed in the search box
 * @param {function} props.setSearchTerm - Updates the search text
 * @param {string} props.activeCategory - Category that is currently selected
 * @param {function} props.setActiveCategory - Changes the selected category
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
 const categories = ["All", "Cakes", "Donuts", "Macarons", "Cupcakes", "Cookies"];


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