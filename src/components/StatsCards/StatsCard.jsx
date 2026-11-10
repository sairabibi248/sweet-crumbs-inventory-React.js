import React from "react";

/**
 * One stats card: shows a title, a number and a small unit word.
 * Used 4 times by StatsCards.jsx, once for each stat.
 *
 * Data flow: useInventory to Dashboard.jsx to StatsCards.jsx to StatsCard.jsx
 * StatsCards.jsx sends each card's details here as props using {...stat}.
 *
 * @param {object} props
 * @param {string} props.title - Text at the top of the card
 * @param {number} props.value - The number to show, from the stats in useInventory
 * @param {string} props.unit - Small word next to the number
 * @param {string} props.cardType - Tailwind classes for the card's background and border color
 */
const StatsCard = ({ title, value, unit, cardType }) => {
  return (
    <div className={`flex-1 py-4 px-5 rounded-xl border ${cardType}`}>
      <div className="mb-3">
        <div className="text-[11px] font-bold text-[#7a5c43]">{title}</div>
      </div>

      <div className="flex items-baseline gap-2">
        <h2 className="text-2xl font-bold text-[#4a2c11]">{value}</h2>
        {unit && <div className="text-xs text-[#8c7361]">{unit}</div>}
      </div>
    </div>
  );
};

export default StatsCard;