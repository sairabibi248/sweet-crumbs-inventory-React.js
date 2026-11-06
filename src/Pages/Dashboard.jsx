import React, { useState } from "react";
import { useInventory } from "../Hooks/useInventory";
import Header from "../components/Header/Header";
import SearchBar from "../components/SearchBar/SearchBar";
import StatsCards from "../components/StatsCards/StatsCards";
import ProductItems from "../components/Products/ProductItems";
import AddItem from "../components/AddItem/AddItem";

/**
 * Main page of the app.
 * Gets all data and actions from useInventory and passes them to each section.
 * Also controls when the "Add item" popup is open.
 */
const Dashboard = () => {
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

  const [isAdding, setIsAdding] = useState(false);

  /**
   * Adds the new product and closes the popup.
   *
   * @param {object} newData - Product details from the AddItem form
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