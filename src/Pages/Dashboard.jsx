import React, { useState } from "react";
import { useInventory } from "../Hooks/useInventory";
import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import StatsCards from "../components/StatsCards/StatsCards";
import ProductItems from "../components/Products/ProductItems";
import AddItem from "../components/AddItem/AddItem";

/**
 * Main page of the app.
 * Gets all product data and actions from the useInventory hook
 * and passes each section only the data it needs.
 * Also opens and closes the "Add item" popup.
 */
const Dashboard = () => {
  /**
   * All values below came  from the useInventory hook (Hooks/useInventory.js).
   *
   * items - Products that match the search and category. Sent to ProductItems to show as cards.
   * stats - Counts for total, in stock, sold out and low stock. Sent to StatsCards.
   * searchTerm - Text typed in the search box. Sent to SearchBar.
   * setSearchTerm - Updates the search text. Sent to SearchBar.
   * activeCategory - Category button that is selected. Sent to SearchBar.
   * setActiveCategory - Changes the selected category. Sent to SearchBar.
   * changeQuantity - Adds or removes 1 from a product. Sent to ProductItems for the + and - buttons.
   * setQuantity - Sets a product's quantity to an exact number. Sent to ProductItems for the slider and the typed input.
   * deleteItem - Removes a product. Sent to ProductItems for the Delete button.
   * updateItem - Saves changes from the Edit popup. Sent to ProductItems.
   * addItem - Adds a new product. Used below in handleAdd.
   */
  const {
    items,
    stats,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    changeQuantity,
    deleteItem,
    updateItem,
    setQuantity,
    addItem,
  } = useInventory();

  /**
   * Created here in Dashboard with useState.
   * True when the "Add item" popup is open, false when it is closed.
   * Set to true by the "+ Add Item" button in Header,
   * and back to false when the popup is closed or the item is added.
   */
  const [isAdding, setIsAdding] = useState(false);

  /**
   * Runs when the user clicks "Add item" inside the AddItem popup.
   * Adds the new product to the list and closes the popup.
   * Sent to AddItem as the onSave prop.
   *
   * @param {object} newData - Title, category, price, quantity and image that the user
   * filled in the AddItem form (AddItem.jsx sends it through onSave)
   */
  const handleAdd = (newData) => {
    addItem(newData);
    setIsAdding(false);
  };

  return (
    <div className="dashboard-page">
      <Header onAdd={() => setIsAdding(true)} />

      <StatsCards stats={stats} />

      <SearchBar
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        activeCategory={activeCategory}
        setActiveCategory={setActiveCategory}
      />

      <ProductItems
        items={items}
        onChangeQuantity={changeQuantity}
        onSetQuantity={setQuantity}
        onDelete={deleteItem}
        onUpdate={updateItem}
      />

      {isAdding && (
        <AddItem onClose={() => setIsAdding(false)} onSave={handleAdd} />
      )}
    </div>
  );
};

export default Dashboard;
