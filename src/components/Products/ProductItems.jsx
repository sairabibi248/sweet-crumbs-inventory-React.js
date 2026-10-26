import React from "react";
import ProductCards from "./ProductCards";
import "./ProductCards.css";

const ProductItems = ({ items, onChangeQuantity, onDelete }) => {
  if (items.length === 0) {
    return <p className="empty-message">No items found.</p>;
  }

  return (
    <div className="item-grid-container">
      {items.map((item) => (
        <ProductCards
          key={item.id}
          item={item}
          onIncrease={() => onChangeQuantity(item.id, 1)}
          onDecrease={() => onChangeQuantity(item.id, -1)}
          onDelete={() => onDelete(item.id)}
          onEdit={() => alert(`Edit clicked for ${item.title}`)}
        />
      ))}
    </div>
  );
};

export default ProductItems;