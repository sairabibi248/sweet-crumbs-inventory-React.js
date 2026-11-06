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

/**
 * Structure of a single product in the inventory.
 *
 * @typedef {object} Item
 * @property {number} id - Unique id of the product
 * @property {string} title - Product name
 * @property {string} category - One of: Cakes, Donuts, Macarons, Cupcakes, Cookies
 * @property {number} price - Price in rupees
 * @property {number} quantity - Units currently in stock
 * @property {string} image - Path of the product image
 */

/**
 * Quantity below which a product is marked as "Low Stock".
 * Used by the stats cards and the product cards.
 */
export const LowStockLimit = 5;

/**
 * Products shown when the site first loads.
 *
 * @type {Item[]}
 */
const initialItems = [
  { id: 1, title: "Strawberry Truffle Delight", category: "Cakes", price: 2400, quantity: 8, image: strawberryCakeImg },
  { id: 2, title: "Choco Chip Cupcake", category: "Cupcakes", price: 250, quantity: 8, image: cupcake2Img },
  { id: 3, title: "Glazed Donut", category: "Donuts", price: 180, quantity: 0, image: donut2Img },
  { id: 4, title: "Strawberry Vanilla Macaron", category: "Macarons", price: 350, quantity: 20, image: macaron1Img },
  { id: 5, title: "Cherry Vanilla Cake", category: "Cakes", price: 2800, quantity: 5, image: cake2Img },
  { id: 6, title: "Vanilla Cupcake", category: "Cupcakes", price: 200, quantity: 10, image: cupcake1Img },
  { id: 7, title: "Chocolate Chip Cookie", category: "Cookies", price: 150, quantity: 15, image: cookie1Img },
  { id: 8, title: "Chocolate Frosted Donut", category: "Donuts", price: 220, quantity: 6, image: dounutsImg },
  { id: 9, title: "Pistachio Kiwi Macaron", category: "Macarons", price: 300, quantity: 18, image: macaron2Img },
  { id: 10, title: "Rainbow Sprinkle Cake", category: "Cakes", price: 3200, quantity: 3, image: cake3Img },
];

/**
 * Custom hook that holds all inventory data and logic.
 * Stores the product list, search text and selected category,
 * and provides functions to add,editd,delete and change quantity.
 *
 * @returns {object} Filtered items, stats, search and category state, and all inventory actions
 */
export const useInventory = () => {
  const [items, setItems] = useState(initialItems);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  /**
   * Products that match both the search text and the selected category.
   * Recalculated only when items, search text or category change.
   *
   * @type {Item[]}
   */
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

  /**
   * Counts shown in the stats cards.
   * Calculated from all products, not only the filtered ones.
   */
  const stats = useMemo(() => {
    return {
      totalProducts: items.length,
      inStock: items.filter((item) => item.quantity >= LowStockLimit).length,
      soldOut: items.filter((item) => item.quantity === 0).length,
      lowStock: items.filter(
        (item) => item.quantity > 0 && item.quantity < LowStockLimit
      ).length,
    };
  }, [items]);

  /**
   * Increases or decreases the quantity of a product.
   * Quantity never goes below 0.
   *
   * @param {number} id - Id of the product to change
   * @param {number} amount - +1 to increase, -1 to decrease
   */
  const changeQuantity = (id, amount) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(0, item.quantity + amount) }
          : item
      )
    );
  };

    /**
   * Sets the quantity of a product to an exact number.
   * Used by the slider, which gives a full value instead of +1 or -1.
   *
   * @param {number} id - Id of the product to change
   * @param {number} newQuantity - New quantity chosen on the slider
   */
  const setQuantity = (id, newQuantity) => {
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  /**
   * Removes a product from the list.
   *
   * @param {number} id - Id of the product to delete
   */
  const deleteItem = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  /**
   * Replaces the details of an existing product with new values.
   * Called when the user clicks "Save changes" in the edit popup.
   *
   * @param {number} id - Id of the product to update
   * @param {object} newData - New title, category, price, quantity and image
   */
  const updateItem = (id, newData) => {
    const updatedItems = [];

    for (let i = 0; i < items.length; i++) {
      const item = items[i];

      if (item.id === id) {
        updatedItems.push({
          id: item.id,
          image: newData.image,
          title: newData.title,
          category: newData.category,
          price: newData.price,
          quantity: newData.quantity,
        });
      } else {
        updatedItems.push(item);
      }
    }

    setItems(updatedItems);
  };

  /**
   * Adds a new product to the end of the list.
   * A unique id is created from the current time.
   *
   * @param {object} newData - Title, category, price, quantity and image of the new product
   */
  const addItem = (newData) => {
    const newItem = {
      id: Date.now(),
      title: newData.title,
      category: newData.category,
      price: newData.price,
      quantity: newData.quantity,
      image: newData.image,
    };

    setItems([...items, newItem]);
  };

  return {
    items: filteredItems,
    stats,
    searchTerm,
    setSearchTerm,
    activeCategory,
    setActiveCategory,
    changeQuantity,
    setQuantity,
    deleteItem,
    updateItem,
    addItem,
  };
};
 