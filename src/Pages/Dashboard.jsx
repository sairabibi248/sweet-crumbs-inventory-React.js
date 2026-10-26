import React from "react";
import { useInventory } from "../Hooks/useInventory";
import SearchBar from "../components/SearchBar/SearchBar";
import StatsCards from "../components/StatsCards/StatsCards";
import ProductItems from "../components/Products/ProductItems";

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
  } = useInventory();

  return (
    <div className="dashboard-page">
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
        onDelete={deleteItem}
      />
    </div>
  );
};

export default Dashboard;