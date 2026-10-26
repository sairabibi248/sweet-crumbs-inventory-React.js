import React, { useState } from "react";
import ProductCards from "./ProductCards";
import "./ProductCards.css";

import strawberryCakeImg from "../../assets/images/strawberry-truffle-delight.png";

const initialItems = [
  { id: 1, title: "Strawberry Truffle Delight", category: "Cakes", price: 2400, quantity: 8, image: strawberryCakeImg },
  { id: 2, title: "Chocolate Fudge Cake", category: "Cakes", price: 2800, quantity: 3, image: strawberryCakeImg },
  { id: 3, title: "Red Velvet Cupcake", category: "Desserts", price: 250, quantity: 0, image: strawberryCakeImg },
  { id: 4, title: "Butter Croissant", category: "Pastries", price: 180, quantity: 6, image: strawberryCakeImg },
  { id: 5, title: "Blueberry Cheesecake", category: "Cakes", price: 3000, quantity: 5, image: strawberryCakeImg },
  { id: 6, title: "Vanilla Bean Macaron", category: "Desserts", price: 200, quantity: 12, image: strawberryCakeImg },
  { id: 7, title: "Almond Danish Pastry", category: "Pastries", price: 220, quantity: 4, image: strawberryCakeImg },
  { id: 8, title: "Caramel Brownie", category: "Desserts", price: 350, quantity: 7, image: strawberryCakeImg },
  { id: 9, title: "Lemon Tart", category: "Desserts", price: 290, quantity: 9, image: strawberryCakeImg },
  { id: 10, title: "Classic Cinnamon Roll", category: "Pastries", price: 260, quantity: 2, image: strawberryCakeImg },
];

const ProductItems = () => {
  const [items, setItems] = useState(initialItems);

  const changeQuantity = (id, amount) => {
    let updatedItems = [];

    for (let i = 0; i < items.length; i++) {
      let item = items[i];
      if (item.id === id) {
        let newQuantity = item.quantity + amount;

        if (newQuantity < 0) {
          newQuantity = 0;
        }
        updatedItems.push({
          id: item.id,
          title: item.title,
          category: item.category,
          price: item.price,
          quantity: newQuantity,
          image: item.image,
        });
      } else {
        updatedItems.push(item);
      }
    }

    setItems(updatedItems);
  };

  const deleteItem = (id) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  if (items.length === 0) {
    return <p className="empty-message">No items found.</p>;
  }

  return (
    <div className="item-grid-container">
      {items.map((item) => (
        <ProductCards
          key={item.id}
          item={item}
          onIncrease={() => changeQuantity(item.id, 1)}
          onDecrease={() => changeQuantity(item.id, -1)}
          onDelete={() => deleteItem(item.id)}
          onEdit={() => alert(`Edit clicked for ${item.title}`)}
        />
      ))}
    </div>
  );
};

export default ProductItems;