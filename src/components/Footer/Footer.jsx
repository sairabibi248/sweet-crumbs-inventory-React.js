import React from "react";
import "./Footer.css";
import cakeFooterImg from "../../assets/footer.png";

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-info">
          <h3>Sweet Crumbs</h3>
          <p>© 2026 Sweet Crumbs Inventory Management.</p>
        </div>

        <div className="footer">
          <img
            src={cakeFooterImg}
            alt="Sweet Crumbs Cake"
            className="footer-img"
          />
        </div>
      </div>
    </footer>
  );
};

export default Footer;
