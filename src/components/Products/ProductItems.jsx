import React, { useState } from "react";
import ProductCards from "./ProductCards";
import Edit from "../Edit/Edit";

/**
 * Shows all product cards in a grid and opens the Edit popup when needed.
 *
 * Data flow: useInventory (Hooks/useInventory.js) to Dashboard.jsx to ProductItems.jsx to ProductCards.jsx
 * Dashboard takes the products and functions from useInventory and passes them here as props.
 * This component gives each card its own product and its own versions of the functions,
 * already filled with that card's id.
 *
 * @param {object} props
 * @param {object[]} props.items - Products to show, already filtered by search and category (from useInventory)
 * @param {function} props.onChangeQuantity - changeQuantity from useInventory, adds or removes 1
 * @param {function} props.onSetQuantity - setQuantity from useInventory, sets an exact number
 * @param {function} props.onDelete - deleteItem from useInventory, removes a product
 * @param {function} props.onUpdate - updateItem from useInventory, saves changes from the Edit popup
 */
const ProductItems = ({
  items,
  onChangeQuantity,
  onSetQuantity,
  onDelete,
  onUpdate,
}) => {
  /**
   * The product being edited right now or null when the Edit popup is closed.
   * Set when the user clicks Edit on a card.
   */
  const [editingItem, setEditingItem] = useState(null);

  /**
   * Runs when the user clicks Save changes in the Edit popup.
   * Sends the new details to updateItem in useInventory then closes the popup.
   *
   * @param {object} newData - New title, category, price, quantity and image from the Edit form
   */
  const handleSave = (newData) => {
    onUpdate(editingItem.id, newData);
    setEditingItem(null);
  };

  if (items.length === 0) {
    return <p className="text-center text-base text-[#666] mt-[30px]">No items found.</p>;
  }

  return (
    <>
      <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-[25px] px-5 pt-5 pb-10">
        {items.map((item) => (
          <ProductCards
            key={item.id}
            item={item}
            onIncrease={() => onChangeQuantity(item.id, 1)}
            onDecrease={() => onChangeQuantity(item.id, -1)}
            onDelete={() => onDelete(item.id)}
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