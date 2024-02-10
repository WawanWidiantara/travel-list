import React from "react";

export default function Items({ item, onRemoveItem, onToggleItem }) {
  return (
    <li>
      <input type="checkbox" onChange={() => onToggleItem(item.id)}></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.name}
      </span>
      <button onClick={() => onRemoveItem(item.id)}>❌</button>
    </li>
  );
}
