import React from "react";
import logoImg from "../../assets/logo.png";

/**
 * Top bar of the site with the Sweet Crumbs logo, name, subtitle and the Add Item button.
 *
 * @param {object} props
 * @param {function} props.onAdd - Comes from Dashboard. Opens the popup to add a new product
 */

const Header = ({ onAdd }) => {
  return (
    <header className="sticky top-0 z-10 flex justify-between items-center bg-[#f4ddf4] py-3 px-6 border-b-2 border-[#ebcfeb]">
      <div className="flex items-center gap-3.5">
        <div className="w-22.5 h-15">
          <img
            src={logoImg}
            alt="Sweet Crumbs Logo"
            className="w-full h-full rounded-full"
          />
        </div>

        <div>
          <h1 className="text-[28px] font-bold text-[#4a2c11]">Sweet Crumbs</h1>
          <h2 className="mt-0.5 text-sm font-normal text-[#7a5c43]">
            Inventory Management System
          </h2>
        </div>
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="bg-[#9e507d] hover:bg-[#82526e] text-white py-3 px-5.5 rounded-xl text-base font-bold cursor-pointer"
      >
        + Add Item
      </button>
    </header>
  );
};

export default Header;
