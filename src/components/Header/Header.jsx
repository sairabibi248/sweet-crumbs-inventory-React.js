import React from "react";
import "./Header.css";
import logoImg from "../../assets/logo.png";

const Header = () => {
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
    </header>
  );
};

export default Header;
