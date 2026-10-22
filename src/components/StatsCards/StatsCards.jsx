import React from "react";
import StatsCard from "./StatsCard";
import "./StatsCard.css";

const StatsCards = () => {
  const statsList = [
    {
      title: "TOTAL PRODUCTS",
      value: "8",
      unit: "items",
      cardType: "total",
    },
    {
      title: "EXPIRED",
      value: "2",
      unit: "items",
      cardType: "expired",
    },
    {
      title: "SOLD OUT",
      value: "0",
      unit: "items",
      cardType: "soldout",
    },
    {
      title: "LOW STOCK ALERT",
      value: "3",
      unit: "items left",
      cardType: "lowstock",
    },
  ];

  return (
    <div className="stats-cards-grid">
      {statsList.map((stat, index) => (
        <StatsCard
          key={index}
          title={stat.title}
          value={stat.value}
          unit={stat.unit}
          cardType={stat.cardType}
        />
      ))}
    </div>
  );
};

export default StatsCards;
