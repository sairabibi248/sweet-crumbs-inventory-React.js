import "./ItemCard.css";

const Limit = 5;

const checkStockStatus = (currentQuantity) => {
  if (currentQuantity === 0) {
    return { label: "Out of Stock", className: "status-out" };
  }
  if (currentQuantity < Limit) {
    return { label: "Low Stock", className: "status-low" };
  }
  return { label: "In Stock", className: "status-in" };
};

const ItemCard = ({ item, onIncrease, onDecrease, onDelete, onEdit }) => {
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
        <button
          type="button"
          className="qty-btn"
          onClick={onDecrease}
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="qty-count">{item.quantity}</span>
        <button
          type="button"
          className="qty-btn"
          onClick={onIncrease}
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      <div className={`stock-status ${stockDetails.className}`}>
        {stockDetails.label}
      </div>

      <button type="button" className="delete-btn" onClick={onEdit}>
        Edit
      </button>

      <button type="button" className="delete-btn" onClick={onDelete}>
        Delete
      </button>
    </div>
  );
};

export default ItemCard;
