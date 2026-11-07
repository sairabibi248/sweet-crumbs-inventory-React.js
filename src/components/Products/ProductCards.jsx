import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import "./ProductCards.css";
import { LowStockLimit as Limit } from "../../Hooks/useInventory";

/**
 * Decides which stock label and color a card should show.
 * Uses LowStockLimit (5) from useInventory, imported here as Limit.

 *
 * @param {number} currentQuantity - Quantity of the product
 * @returns {{label: string, className: string}} Text to show and the CSS class for its color
 */

const checkStockStatus = (currentQuantity) => {
  if (currentQuantity === 0) {
    return { label: "Out of Stock", className: "Out-Of-Stock" };
  }
  if (currentQuantity < Limit) {
    return { label: "Low Stock", className: "Low-Stock" };
  }
  return { label: "In Stock", className: "In-Stock" };
};

/**
 * One product card: category tag, image, name, price, quantity control,
 * stock label,Edit and Delete buttons.
 *
 * Data flow: useInventory to Dashboard.jsx to ProductItems.jsx to  ProductCards.jsx
 *

 * showSlider to rc-slider (npm package) showInput to typed number box, otherwise + and - buttons.
 *
 * @param {object} props
 * @param {object} props.item - The product to show (id, title, category, price, quantity, image)
 * @param {function} props.onIncrease - Adds 1 to the quantity (changeQuantity in useInventory)
 * @param {function} props.onDecrease - Removes 1 from the quantity (changeQuantity in useInventory)
 * @param {function} props.onDelete - Deletes this product (deleteItem in useInventory)
 * @param {function} props.onEdit - Opens the Edit popup for this product (in ProductItems)
 * @param {boolean} props.showSlider - True if this card should use the slider
 * @param {function} props.onSlide - Sets the quantity from the slider (setQuantity in useInventory)
 * @param {boolean} props.showInput - True if this card should use the typed number box
 * @param {function} props.onType - Sets the quantity from the number box (setQuantity in useInventory)
 */
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
  /**
   * Stock label and CSS class for this card, based on its quantity.
   */
  const stockDetails = checkStockStatus(item.quantity);

  /**
   * Runs when the user types a quantity in the number box.
   * Ignores anything that is not a valid
   * and removes decimals with Math.floor (1.4 becomes 1).
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
          <button type="button" className="qty-btn" onClick={onDecrease}>
            -
          </button>
          <p className="qty-count">{item.quantity}</p>
          <button type="button" className="qty-btn" onClick={onIncrease}>
            +
          </button>
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
