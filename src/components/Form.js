import React, { useState } from "react";

export default function Form({ onAddItem }) {
  const [names, setNames] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(event) {
    event.preventDefault();
    const newItem = {
      id: Date.now(),
      name: names,
      quantity: quantity,
      packed: false,
    };

    onAddItem(newItem);

    console.log(newItem);

    if (!names) return;
    setNames("");
    setQuantity(1);
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip?</h3>
      <select
        value={quantity}
        onChange={(e) => {
          Number(setQuantity(e.target.value));
        }}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((item) => (
          <option value={item} key={item}>
            {item}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item ..."
        value={names}
        onChange={(e) => setNames(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
}
