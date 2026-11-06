import React, { useState } from "react";
import ProductCards from "./ProductCards";
import Edit from "../Edit/Edit";
import "./ProductCards.css";

const ProductItems = ({ items, onChangeQuantity, onSetQuantity, onDelete, onUpdate }) => {
  const [editingItem, setEditingItem] = useState(null);

  const handleSave = (newData) => {
    onUpdate(editingItem.id, newData);
    setEditingItem(null);
  };

  if (items.length === 0) {
    return <p className="empty-message">No items found.</p>;
  }

  return (
    <>
      <div className="item-grid-container">
        {items.map((item) => (
          <ProductCards
            key={item.id}
            item={item}
            onIncrease={() => onChangeQuantity(item.id, 1)}
            onDecrease={() => onChangeQuantity(item.id, -1)}
            onDelete={() => {onDelete(item.id); 
            }}
            onEdit={() => setEditingItem(item)}
            showSlider={item.id === 2}
            onSlide={(value) => onSetQuantity(item.id, value)}
            showInput={item.id === 3}
            onType={(value) => onSetQuantity(item.id, value)}
          />
        ))}
      </div>

      {editingItem && (
        <Edit
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleSave}
        />
      )}
    </>
  );
};

export default ProductItems;