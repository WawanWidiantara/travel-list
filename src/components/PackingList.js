import React, { useState } from "react";
import Items from "./Items";

export default function PackingList({
  items,
  onRemoveItem,
  onToggleItem,
  onClearList,
}) {
  const [sort, setSort] = useState("input");

  let sortedItems;

  if (sort === "input") sortedItems = items;
  if (sort === "description")
    sortedItems = items.slice().sort((a, b) => a.name.localeCompare(b.name));
  if (sort === "packed")
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Items
            item={item}
            key={item.id}
            onRemoveItem={onRemoveItem}
            onToggleItem={onToggleItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sort} onChange={(e) => setSort(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={() => onClearList()}>Clear List</button>
      </div>
    </div>
  );
}
