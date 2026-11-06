import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./ProductCards.css";
import { LowStockLimit as Limit } from "../../Hooks/useInventory";

const checkStockStatus = (currentQuantity) => {
  if (currentQuantity === 0) {
    return { label: "Out of Stock", className: "Out-Of-Stock" };
  }
  if (currentQuantity < Limit) {
    return { label: "Low Stock", className: "Low-Stock" };
  }
  return { label: "In Stock", className: "In-Stock" };
};

const ProductCards = ({
  item,
  onIncrease,
  onDecrease,
  onDelete,
  onEdit,
  showSlider,
  onSlide,
  showInput,
  onType,
}) => {
  const stockDetails = checkStockStatus(item.quantity);

  /**
   * Runs when the user types a quantity.
   * Ignores anything that is not a valid whole number of 0 or more.
   *
   * @param {Event} e - Input change event
   */
  const handleTyped = (e) => {
    const value = Number(e.target.value);

    if (Number.isNaN(value) || value < 0) {
      return;
    }

    onType(Math.floor(value));
  };

  return (
    <div className="item-card">
      <p className="category-tag">{item.category}</p>

      <div className="card-image-container">
        <img src={item.image} alt={item.title} className="card-image" />
      </div>

      <h3 className="item-title">{item.title}</h3>
      <p className="item-price">Rs {item.price.toLocaleString()}</p>

      {showSlider ? (
        <div className="quantity-slider">
          <Slider min={0} max={100} value={item.quantity} onChange={onSlide} />
          <p className="qty-count">{item.quantity}</p>
        </div>
      ) : showInput ? (
        <div className="quantity-input-row">
          <label className="qty-input-label" htmlFor={`qty-${item.id}`}>
            Qty
          </label>
          <input
            id={`qty-${item.id}`}
            type="number"
            min="0"
            step="1"
            className="qty-input"
            placeholder="0"
            value={item.quantity === 0 ? "" : item.quantity}
            onChange={handleTyped}
          />
        </div>
      ) : (
        <div className="quantity-control">
          <button type="button" className="qty-btn" onClick={onDecrease}>-</button>
          <p className="qty-count">{item.quantity}</p>
          <button type="button" className="qty-btn" onClick={onIncrease}>+</button>
        </div>
      )}

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