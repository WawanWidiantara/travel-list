import React from "react";

export default function Stats({ items }) {
  const numItem = items.length;
  const numPacked = items.filter((item) => item.packed).length;
  const precentage = Math.round((numPacked / numItem) * 100);

  if (!numItem)
    return (
      <footer className="stats">
        <em>You have no items in your list, what are you waiting for?!</em>
      </footer>
    );

  return (
    <footer className="stats">
      <em>
        {numPacked === numItem
          ? "You are ready to go!"
          : `💼 You have ${numItem} names on your list, and you already packed
        ${numPacked} (${precentage}%)`}
      </em>
    </footer>
  );
}
