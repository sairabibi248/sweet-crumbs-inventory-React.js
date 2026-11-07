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
 * @param {string} props.cardType - CSS class that sets the card's color (total, instock, soldout, lowstock)
 */
const StatsCard = ({ title, value, unit, cardType }) => {
  return (
    <div className={`stats-card ${cardType}`}>
      <div className="stats-card-header">
        <div className="stats-title">{title}</div>
      </div>

      <div className="stats-card-body">
        <h2 className="stats-value">{value}</h2>
        {unit && <div className="stats-unit">{unit}</div>}
      </div>
    </div>
  );
};

export default StatsCard;
