import React, { useState } from "react";

export default function App() {
  const [items, setItems] = useState([]);

  function handleAddItem(item) {
    setItems((items) => [...items, item]);
  }

  function handleRemoveItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <Form onAddItem={handleAddItem} />
      <PackingList
        items={items}
        onRemoveItem={handleRemoveItem}
        onToggleItem={handleToggleItem}
      />
      <Stats items={items} />
    </div>
  );
}

function Logo() {
  return <h1>🌴 Far Away 💼</h1>;
}

function Form({ onAddItem }) {
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

function PackingList({ items, onRemoveItem, onToggleItem }) {
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
      </div>
    </div>
  );
}

function Items({ item, onRemoveItem, onToggleItem }) {
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

function Stats({ items }) {
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
