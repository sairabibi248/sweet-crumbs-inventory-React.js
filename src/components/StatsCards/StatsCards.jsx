import React from "react";
import StatsCard from "./StatsCard";
import "./StatsCard.css";

const StatsCards = ({ stats }) => {
  const statsList = [
    { title: "TOTAL PRODUCTS", value: stats.totalProducts, unit: "items", cardType: "total" },
    { title: "EXPIRED", value: stats.expired, unit: "items", cardType: "expired" },
    { title: "SOLD OUT", value: stats.soldOut, unit: "items", cardType: "soldout" },
    { title: "LOW STOCK ALERT", value: stats.lowStock, unit: "items ", cardType: "lowstock" },
  ];

  return (
    <div className="stats-cards-grid">
      {statsList.map((stat) => (
        <StatsCard key={stat.cardType} {...stat} />
      ))}
    </div>
  );
};

export default StatsCards;