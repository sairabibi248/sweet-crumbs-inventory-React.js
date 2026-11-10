import React, { useState } from "react";

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
    <div
      className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.4)] z-50 py-7.5 px-5"
      onClick={onClose}
    >
      <div
        className="bg-[#fffafc] w-100 max-w-[90%] rounded-xl p-6 flex flex-col gap-3.5"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold text-[#4a2c11]">Edit product</h2>

        <div className="flex items-center gap-4">
          <img
            src={image}
            alt={title}
            className="h-20 bg-[#f9ecf3] rounded-lg border border-[#fbcfe8]"
          />
          <label className="bg-white border border-[#fbcfe8] text-[#9d174d] py-2 px-3.5 rounded-md text-[13px] font-bold cursor-pointer hover:bg-[#fce7f3]">
            Change image
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              hidden
            />
          </label>
        </div>

        <label className="w-full flex flex-col gap-1 text-xs font-bold text-[#7a5c43]">
          Name
          <input
            className="w-full py-2 px-2.5 text-sm font-normal border border-[#fbcfe8] rounded-md bg-white text-[#1f2937] outline-none focus:border-[#db2777]"
            value={title}
            onChange={(e) => {
              setTitle(e.target.value);
              setError("");
            }}
          />
        </label>

        <label className="w-full flex flex-col gap-1 text-xs font-bold text-[#7a5c43]">
          Category
          <select
            className="w-full py-2 px-2.5 text-sm font-normal border border-[#fbcfe8] rounded-md bg-white text-[#1f2937] outline-none focus:border-[#db2777]"
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

        <div className="flex gap-3">
          <label className="w-full flex flex-col gap-1 text-xs font-bold text-[#7a5c43]">
            Price (Rs)
            <input
              className="w-full py-2 px-2.5 text-sm font-normal border border-[#fbcfe8] rounded-md bg-white text-[#1f2937] outline-none focus:border-[#db2777]"
              type="number"
              min="1"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setError("");
              }}
            />
          </label>

          <label className="w-full flex flex-col gap-1 text-xs font-bold text-[#7a5c43]">
            Quantity
            <input
              className="w-full py-2 px-2.5 text-sm font-normal border border-[#fbcfe8] rounded-md bg-white text-[#1f2937] outline-none focus:border-[#db2777]"
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

        {error && <p className="text-[13px] text-[#b91c1c]">{error}</p>}

        <div className="flex justify-end gap-2.5">
          <button
            type="button"
            className="bg-white text-[#4b5563] border border-[#d1d5db] py-2 px-4.5 rounded-md font-bold text-[13px] cursor-pointer hover:bg-[#f3f4f6]"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="button"
            className="bg-[#b85e83] text-white border border-[#b85e83] py-2 px-4.5 rounded-md font-bold text-[13px] cursor-pointer hover:bg-[#a04a6f]"
            onClick={handleSave}
          >
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default Edit;