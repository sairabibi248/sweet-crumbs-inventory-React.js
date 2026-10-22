import React from "react";

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
