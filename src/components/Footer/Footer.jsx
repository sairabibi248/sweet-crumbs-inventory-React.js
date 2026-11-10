import React from "react";
import cakeFooterImg from "../../assets/footer.png";

/**
 * Shown at the bottom of every page and takes no props.
 */

const Footer = () => {
  return (
    <footer className="bg-[#f7ebe8] border-t border-[#ecd5d0] py-3.75 px-7.5">
      <div className="flex justify-between items-center max-w-275 mx-auto">
        <div>
          <h3 className="text-lg font-medium text-[#4a2c11] mb-1">Sweet Crumbs</h3>
          <p className="text-[11px] text-[#7a5c43]">© 2026 Sweet Crumbs Inventory Management.</p>
        </div>

        <div className="w-25">
          <img src={cakeFooterImg} alt="Sweet Crumbs Cake" className="w-full" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;