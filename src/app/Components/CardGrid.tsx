import { Card, CardProps } from "./Card";
import { useState } from "react";
interface CardGridProps {
  cards: CardProps[];
}

export function CardGrid({ cards }: CardGridProps) {
  function handleClick() {
    alert(`click works`);
  }

  const cardGridItems = cards.map(({ name, image }) => {
    return (
      <div className="cell" key={name} onClick={() => handleClick(name)}>
        <Card name={name} image={image} />
      </div>
    );
  });

  return (
    <div className="fixed-grid has-5-cols">
      <div className="grid">{cardGridItems}</div>
    </div>
  );
}
