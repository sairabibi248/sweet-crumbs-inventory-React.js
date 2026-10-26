import React from "react";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import StatsCards from "./components/StatsCards/StatsCards";
import SearchBar from "./components/SearchBar/SearchBar";
import ProductCards from "./components/Products/ProductCards";
import ProductItems from "./components/Products/ProductItems";

function App() {
  return (
    <div>
      <Header />
      <StatsCards />
      <SearchBar />
      <ProductItems />

      
      <Footer />
    </div>
  );
}

export default App;