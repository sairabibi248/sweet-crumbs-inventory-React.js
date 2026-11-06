import React from "react";
import "./Header.css";
import logoImg from "../../assets/logo.png";

/**
 * Top bar of the site with the Sweet Crumbs logo, name, subtitle and the "Add Item" button.
 *
 * @param {object} props
 * @param {function} props.onAdd - Opens the popup to add a new product
 */
const Header = ({ onAdd }) => {
  return (
    <header className="header-container">
      <div className="sweetcrumbs">
        <div className="sweetcrumbs-logo">
          <img src={logoImg} alt="Sweet Crumbs Logo" className="logo-img" />
          <link rel="icon" type="image/png" href="/favicon.png" />
        </div>

        <div className="sweetcrumbs-info">
          <h1 className="title">Sweet Crumbs</h1>
          <h2 className="subtitle">Inventory Management System</h2>
        </div>
      </div>

      <button type="button" className="add-item-btn" onClick={onAdd}>
        + Add Item
      </button>
    </header>
  );
};

export default Header;