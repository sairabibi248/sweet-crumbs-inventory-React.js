import { useState } from "react";
import ItemCard from "./ItemCard";
import "./ItemList.css";

import strawberryCakeImg from "../../assets/images/strawberry-truffle-delight.png";

const initialItems = [
  { id: 1, title: "Strawberry Truffle Delight", category: "Cakes", price: 2400, quantity: 8, image: strawberryCakeImg },
  { id: 2, title: "Chocolate Fudge Cake", category: "Cakes", price: 2800, quantity: 3, image: strawberryCakeImg },
  { id: 3, title: "Red Velvet Cupcake", category: "Desserts", price: 250, quantity: 0, image: strawberryCakeImg },
  { id: 4, title: "Butter Croissant", category: "Pastries", price: 180, quantity: 6, image: strawberryCakeImg },
];

const ItemList = () => {
  const [items, setItems] = useState(initialItems);
  const [editingItem, setEditingItem] = useState(null);

  const changeQuantity = (id, amount) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          let updatedQuantity = item.quantity + amount;
          if (updatedQuantity < 0) {
            updatedQuantity = 0;
          }
          return { ...item, quantity: updatedQuantity };
        }
        return item;
      })
    );
  };

  const deleteItem = (id) => {
    setItems(items.filter((item) => item.id !== id));
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setItems(
      items.map((item) => {
        if (item.id === editingItem.id) {
          return editingItem;
        }
        return item;
      })
    );
    setEditingItem(null);
  };


  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setEditingItem({ ...editingItem, image: imageUrl });
    }
  };

  if (items.length === 0) {
    return <p className="empty-message">No items found.</p>;
  }

  return (
    <div>
      <div className="item-grid-container">
        {items.map((item) => (
          <ItemCard
            key={item.id}
            item={item}
            onIncrease={() => changeQuantity(item.id, 1)}
            onDecrease={() => changeQuantity(item.id, -1)}
            onDelete={() => deleteItem(item.id)}
            onEdit={() => setEditingItem({ ...item, bgColorClass: item.bgColorClass || "card-bg-1" })}
          />
        ))}
      </div>

      {editingItem && (
        <div className="edit-modal-overlay">
         
          <div className={`edit-modal-content item-card ${editingItem.bgColorClass || ""}`}>
            <h3>Edit Item Card</h3>
            <form onSubmit={handleSaveEdit}>
              
            
              <div className="card-image-container">
                <img src={editingItem.image} alt={editingItem.title} className="card-image" />
              </div>
              <div className="form-group">
                <label>Change Image:</label>
                <input type="file" accept="image/*" onChange={handleImageChange} />
              </div>

              <div className="form-group">
                <label>Title:</label>
                <input 
                  type="text" 
                  value={editingItem.title} 
                  onChange={(e) => setEditingItem({ ...editingItem, title: e.target.value })}
                />
              </div>

            
              <div className="form-group">
                <label>Price:</label>
                <input 
                  type="number" 
                  value={editingItem.price} 
                  onChange={(e) => setEditingItem({ ...editingItem, price: Number(e.target.value) })}
                />
              </div>

              <div className="form-group">
                <label>Select Card Background Color:</label>
                <div className="color-options" style={{ display: "flex", gap: "10px", marginTop: "5px" }}>
                  <button type="button" className="color-btn pink" onClick={() => setEditingItem({ ...editingItem, bgColorClass: "card-bg-1" })}></button>
                  <button type="button" className="color-btn cream" onClick={() => setEditingItem({ ...editingItem, bgColorClass: "card-bg-2" })}></button>
                  <button type="button" className="color-btn peach" onClick={() => setEditingItem({ ...editingItem, bgColorClass: "card-bg-3" })}></button>
                  <button type="button" className="color-btn grey" onClick={() => setEditingItem({ ...editingItem, bgColorClass: "card-bg-4" })}></button>
                </div>
              </div>

            
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setEditingItem(null)}>
                  Cancel
                </button>
                <button type="submit" className="save-btn">
                  Save
                </button>
              </div>

            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ItemList;