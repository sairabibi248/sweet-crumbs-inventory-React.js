import React, { useState } from "react";
import "../Edit/Edit.css";
import "./AddItem.css";

const categories = ["Cakes", "Donuts", "Macarons", "Cupcakes", "Cookies"];

/**
 * Popup form to add a new product.
 * Opens with empty fields. The user must upload an image and fill all fields.
 * Reuses the popup styles from Edit.css.
 *
 * @param {object} props
 * @param {function} props.onClose - Closes the popup without adding anything
 * @param {function} props.onSave - Receives the new product data when "Add item" is clicked
 */
const AddItem = ({ onClose, onSave }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Cakes");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [image, setImage] = useState("");
  const [error, setError] = useState("");

  /**
   * Shows a preview of the image the user picked from their computer.
   *
   * @param {Event} e - File input change event
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setError("");
    }
  };

  /**
   * Checks that every field is filled correctly, then sends the new product to the parent.
   */
  const handleAdd = () => {
    if (image === "") {
      setError("Upload a product image");
      return;
    }
    if (title.trim() === "") {
      setError("Enter a product name");
      return;
    }
    if (price === "" || Number(price) <= 0) {
      setError("Enter a valid price");
      return;
    }
    if (quantity === "" || Number(quantity) < 0) {
      setError("Enter a valid quantity");
      return;
    }

    onSave({
      title: title.trim(),
      category: category,
      price: Number(price),
      quantity: Number(quantity),
      image: image,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Add new item</h2>

        <div className="modal-image-section">
          {image ? (
            <img src={image} alt="New product" className="modal-image" />
          ) : (
            <div className="modal-image add-no-image">No image</div>
          )}
          <label className="upload-btn">
            Upload image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>
        </div>

        <label className="modal-label">
          Name
          <input
            className="modal-input"
            placeholder="e.g. Blueberry Muffin"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
          />
        </label>

        <label className="modal-label">
          Category
          <select
            className="modal-input"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </label>

        <div className="modal-row">
          <label className="modal-label">
            Price (Rs)
            <input
              className="modal-input"
              type="number"
              min="1"
              placeholder="0"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setError("");
              }}
            />
          </label>

          <label className="modal-label">
            Quantity
            <input
              className="modal-input"
              type="number"
              min="0"
              placeholder="0"
              value={quantity}
              onChange={(e) => {
                setQuantity(e.target.value);
                setError("");
              }}
            />
          </label>
        </div>

        {error && <p className="modal-error">{error}</p>}

        <div className="modal-actions">
          <button type="button" className="modal-cancel" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="modal-save" onClick={handleAdd}>
            Add item
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddItem;
