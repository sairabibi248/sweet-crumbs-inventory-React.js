import React, { useState } from "react";
import "./Edit.css";

const categories = ["Cakes", "Donuts", "Macarons", "Cupcakes", "Cookies"];

const Edit = ({ item, onClose, onSave }) => {
  const [title, setTitle] = useState(item.title);
  const [category, setCategory] = useState(item.category);
  const [price, setPrice] = useState(item.price);
  const [quantity, setQuantity] = useState(item.quantity);
  const [image, setImage] = useState(item.image);
  const [error, setError] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSave = () => {
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
        <h2 className="modal-title">Edit product</h2>

        <div className="modal-image-section">
          <img src={image} alt={title} className="modal-image" />
          <label className="upload-btn">
            Change image
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
          <button type="button" className="modal-save" onClick={handleSave}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;
