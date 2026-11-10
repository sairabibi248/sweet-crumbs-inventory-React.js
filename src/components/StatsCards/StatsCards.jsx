import React from "react";
import StatsCard from "./StatsCard";

/**
 * Shows the 4 stats cards at the top of the page:
 * total products, in stock, sold out and low stock.
 *
 * Data flow: useInventory (Hooks/useInventory.js) to Dashboard.jsx to StatsCards.jsx to StatsCard.jsx
 * The numbers are calculated in useInventory, Dashboard passes them here as the stats prop
 * and this component sends each number to one StatsCard to show it.
 *
 * @param {object} props
 * @param {object} props.stats - Counts from useInventory
 * @param {number} props.stats.totalProducts - Number of all products
 * @param {number} props.stats.inStock - Products with quantity 5 or more
 * @param {number} props.stats.soldOut - Products with quantity 0
 * @param {number} props.stats.lowStock - Products with quantity from 1 to 4
 */
const StatsCards = ({ stats }) => {
  /**
   * Details of the 4 cards in the order they appear on the page.
   * title - Text shown at the top of the card
   * value - Number shown on the card, taken from stats
   * unit - Small word shown next to the number
   * cardType - Tailwind classes that give the card its background and border color
   */
  const statsList = [
    {
      title: "TOTAL PRODUCTS",
      value: stats.totalProducts,
      unit: "items",
      cardType: "bg-[#fcf4ec] border-[#e8d5c4]",
    },
    {
      title: "IN STOCK",
      value: stats.inStock,
      unit: "items",
      cardType: "bg-[#fff0f0] border-[#f7cfcf]",
    },
    {
      title: "SOLD OUT",
      value: stats.soldOut,
      unit: "items",
      cardType: "bg-[#f3f4f6] border-[#d1d5db]",
    },
    {
      title: "LOW STOCK",
      value: stats.lowStock,
      unit: "items",
      cardType: "bg-[#fffbeb] border-[#fce7f3]",
    },
  ];

  return (
    <div className="flex gap-5 py-5 px-10 max-w-300 mx-auto">
      {statsList.map((stat) => (
        <StatsCard key={stat.title} {...stat} />
      ))}
    </div>
  );
};

export default StatsCards;