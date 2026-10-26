import React from "react";
import "./ProductCards.css";
import { LOW_STOCK_LIMIT as Limit } from "../../Hooks/useInventory";



const checkStockStatus = (currentQuantity) => {
  if (currentQuantity === 0) {
    return { label: "Out of Stock", className: " Out-Of-Stock" };
  }
  if (currentQuantity < Limit) {
    return { label: "Low Stock", className: "Low-Stock" };
  }
  return { label: "In Stock", className: "In-Stock" };
};

const ProductCards = ({ item, onIncrease, onDecrease, onDelete, onEdit }) => {
  const stockDetails = checkStockStatus(item.quantity);

  return (
    <div className="item-card">
     
      <p className="category-tag">{item.category}</p>

    
      <div className="card-image-container">
        <img src={item.image} alt={item.title} className="card-image" />
      </div>

      <h3 className="item-title">{item.title}</h3>
      <p className="item-price">Rs {item.price.toLocaleString()}</p>

   
      <div className="quantity-control">
        <button type="button" className="qty-btn" onClick={onDecrease} aria-label="Decrease quantity">
          -
        </button>
        <p className="qty-count">{item.quantity}</p>
        <button type="button" className="qty-btn" onClick={onIncrease} aria-label="Increase quantity">
          +
        </button>
      </div>

     
      <div className={`stock-status ${stockDetails.className}`}>
        {stockDetails.label}
      </div>

     
      <div className="card-actions">
  <button type="button" className="edit-btn" onClick={onEdit}>
    Edit
  </button>
  <button type="button" className="delete-btn" onClick={onDelete}>
    Delete
  </button>
</div>
    </div>
  );
};

export default ProductCards;