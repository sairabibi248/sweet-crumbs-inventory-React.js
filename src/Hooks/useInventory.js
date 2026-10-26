import { useState, useMemo } from "react";

import strawberryCakeImg from "../assets/images/Cake1.png";
import cake2Img from "../assets/images/Cake2.png";
import cake3Img from "../assets/images/Cake3.png";
import cookie1Img from "../assets/images/Cookie1.png";
import cupcake1Img from "../assets/images/Cupcake1.png";
import cupcake2Img from "../assets/images/Cupcake2.png";
import donut2Img from "../assets/images/Donut2.png";
import dounutsImg from "../assets/images/Dounuts.png";
import macaron1Img from "../assets/images/Macaron1.png";
import macaron2Img from "../assets/images/Macaron2.png";

export const LOW_STOCK_LIMIT = 5;

const initialItems = [
  { id: 1, title: "Strawberry Truffle Delight", category: "Cakes", price: 2400, quantity: 8, image: strawberryCakeImg },
  { id: 2, title: "Choco Chip Cupcake", category: "Cupcakes", price: 250, quantity: 8, image: cupcake2Img },
  { id: 3, title: "Glazed Donut", category: "Donuts", price: 180, quantity: 12, image: donut2Img },
  { id: 4, title: "Pistachio Macaron", category: "Macarons", price: 350, quantity: 20, image: macaron1Img },
  { id: 5, title: "Cherry Vanilla Cake", category: "Cakes", price: 2800, quantity: 5, image: cake2Img },
  { id: 6, title: "Vanilla Bean Cupcake", category: "Cupcakes", price: 200, quantity: 10, image: cupcake1Img },
  { id: 7, title: "Chocolate Chip Cookie", category: "Cookies", price: 150, quantity: 15, image: cookie1Img },
  { id: 8, title: "Chocolate Frosted Donut", category: "Donuts", price: 220, quantity: 6, image: dounutsImg },
  { id: 9, title: "Pistachio Kiwi Macaron", category: "Macarons", price: 300, quantity: 18, image: macaron2Img },
  { id: 10, title: "Rainbow Sprinkle Cake", category: "Cakes", price: 3200, quantity: 3, image: cake3Img },
];

export const useInventory = () => {
  const [items, setItems] = useState(initialItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems = useMemo(() => {
    const term = searchTerm.toLowerCase();
    return items.filter((item) => {
      const matchesCategory =
        activeCategory === "All" ||
        item.category.toLowerCase() === activeCategory.toLowerCase();

      const matchesSearch =
        item.title.toLowerCase().includes(term) ||
        item.category.toLowerCase().includes(term);

      return matchesCategory && matchesSearch;
    });
  }, [items, searchTerm, activeCategory]);

  const stats = useMemo(() => {
    return {
      totalProducts: items.length,
      expired: 0,
      soldOut: items.filter((item) => item.quantity === 0).length,
      lowStock: items.filter(
        (item) => item.quantity > 0 && item.quantity < LOW_STOCK_LIMIT
      ).length,
    };
  }, [items]);

  const changeQuantity = (id, amount) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + amount) }
          : item
      )
    );
  };

  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return {
    items: filteredItems,
    stats,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    changeQuantity,
    deleteItem,
  };
};