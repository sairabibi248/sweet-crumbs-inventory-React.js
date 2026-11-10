import React from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { LowStockLimit as Limit } from "../../Hooks/useInventory";

/**
 * Decides which stock label and color a card should show.
 * Uses LowStockLimit (5) from useInventory, imported here as Limit.
 *
 * @param {number} currentQuantity - Quantity of the product
 * @returns {{label: string, className: string}} Text to show and the Tailwind classes for its color
 */
const checkStockStatus = (currentQuantity) => {
  if (currentQuantity === 0) {
    return { label: "Out of Stock", className: "bg-[#fee2e2] text-[#991b1b]" };
  }
  if (currentQuantity < Limit) {
    return { label: "Low Stock", className: "bg-[#fef3c7] text-[#92400e]" };
  }
  return { label: "In Stock", className: "bg-[#d1fae5] text-[#065f46]" };
};

/**
 * One product card: category tag, image, name, price, quantity control,
 * stock label, Edit and Delete buttons.
 *
 * Data flow: useInventory to Dashboard.jsx to ProductItems.jsx to ProductCards.jsx
 *
 * showSlider → rc-slider (npm package), showInput → typed number box, otherwise + and - buttons.
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
   * Stock label and Tailwind color classes for this card, based on its quantity.
   */
  const stockDetails = checkStockStatus(item.quantity);

  /**
   * Runs when the user types a quantity in the number box.
   * Ignores anything that is not a valid number
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
    <div className="group flex flex-col items-center text-center bg-[#fcf8f2] pt-[15px] px-[15px] pb-[22px] rounded-lg border border-[#f3ebd8] w-full max-w-[220px] mx-auto">
      <p className="self-start bg-white text-[#db2777] py-[3px] px-2.5 rounded-xl text-[11px] font-bold border border-[#fbcfe8] mb-2">
        {item.category}
      </p>

      <div className="w-full mb-2 overflow-hidden rounded-lg">
        <img
          src={item.image}
          alt={item.title}
          className="w-full max-h-[100px] object-contain transition-transform duration-300 group-hover:scale-[1.09]"
        />
      </div>

      <h3 className="text-sm font-bold text-[#1f2937] my-[5px]">{item.title}</h3>
      <p className="text-[13px] font-bold text-[#db2777] mb-2">
        Rs {item.price.toLocaleString()}
      </p>

      {showSlider ? (
        <div className="quantity-slider w-full h-10 mb-2.5 flex items-center gap-3 px-1.5">
          <Slider min={0} max={100} value={item.quantity} onChange={onSlide} />
          <p className="font-bold text-sm">{item.quantity}</p>
        </div>
      ) : showInput ? (
        <div className="h-10 mb-2.5 flex items-center justify-center gap-2.5">
          <label className="text-xs font-bold text-[#7a5c43]" htmlFor={`qty-${item.id}`}>
            Qty
          </label>
          <input
            id={`qty-${item.id}`}
            type="number"
            min="0"
            step="1"
            className="w-20 py-[5px] px-2 text-sm font-bold text-center border border-[#fbcfe8] rounded-md bg-white text-[#1f2937] outline-none focus:border-[#b85e83]"
            placeholder="0"
            value={item.quantity === 0 ? "" : item.quantity}
            onChange={handleTyped}
          />
        </div>
      ) : (
        <div className="h-10 mb-2.5 flex items-center justify-center gap-2.5">
          <button
            type="button"
            className="bg-white border border-[#d1d5db] py-0.5 px-2 rounded cursor-pointer font-bold"
            onClick={onDecrease}
          >
            -
          </button>
          <p className="font-bold text-sm">{item.quantity}</p>
          <button
            type="button"
            className="bg-white border border-[#d1d5db] py-0.5 px-2 rounded cursor-pointer font-bold"
            onClick={onIncrease}
          >
            +
          </button>
        </div>
      )}

      <div className={`w-full text-center p-[5px] rounded font-bold text-xs mt-2 mb-3 ${stockDetails.className}`}>
        {stockDetails.label}
      </div>

      <div className="flex justify-between w-full gap-1.5 mt-1.5">
        <button
          type="button"
          className="w-[47%] p-1.5 rounded font-bold cursor-pointer text-xs bg-[#efeafa] text-[#5b4691] border border-[#d4c9ef] hover:bg-[#6f58a8] hover:text-white hover:border-[#6f58a8]"
          onClick={onEdit}
        >
          Edit
        </button>
        <button
          type="button"
          className="w-[47%] p-1.5 rounded font-bold cursor-pointer text-xs bg-white text-[#b4233f] border border-[#f0c2cc] hover:bg-[#ce4661] hover:text-white hover:border-[#ac4b5e]"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ProductCards;