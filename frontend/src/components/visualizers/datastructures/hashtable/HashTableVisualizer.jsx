// HashTableVisualizer.jsx
import { useState } from "react";
import HashBucket from "./HashBucket";
import "./hashtable.css";

const SIZE = 7;

function HashTableVisualizer() {
  /* ---------------- STATE ---------------- */
  const [table, setTable] = useState(
    Array.from({ length: SIZE }, () => [])
  );
  const [input, setInput] = useState("");
  const [method, setMethod] = useState("chaining"); // chaining | probing
  const [activeIndex, setActiveIndex] = useState(null);
  const [message, setMessage] = useState("");

  /* ---------------- HASH FUNCTION ---------------- */
  const hash = (key) => key % SIZE;

  /* ---------------- INSERT ---------------- */
  const insert = () => {
    if (!input) return;

    const value = Number(input);
    const index = hash(value);
    setActiveIndex(index);

    if (method === "chaining") {
      setMessage(`Collision handled by chaining at index ${index}`);
      const newTable = [...table];
      newTable[index] = [...newTable[index], value];
      setTable(newTable);
    } else {
      // Linear Probing
      let i = index;
      const newTable = [...table];

      while (newTable[i].length !== 0) {
        i = (i + 1) % SIZE;
      }

      setMessage(`Collision handled by probing → placed at ${i}`);
      newTable[i] = [value];
      setTable(newTable);
    }

    setInput("");
    setTimeout(() => setActiveIndex(null), 500);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="hash-container">
      <h2>Hash Table Visualizer</h2>

      <p className="hash-subtitle">
        Collision Strategy: <b>{method}</b>
      </p>

      <p className="hash-message">{message}</p>

      <div className="hash-controls">
        <input
          type="number"
          placeholder="Key"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={insert}>Insert</button>

        <button
          className="mode-toggle"
          onClick={() =>
            setMethod(method === "chaining" ? "probing" : "chaining")
          }
        >
          Switch to {method === "chaining" ? "Probing" : "Chaining"}
        </button>
      </div>

      <div className="hash-table">
        {table.map((bucket, index) => (
          <HashBucket
            key={index}
            index={index}
            values={bucket}
            highlight={index === activeIndex}
          />
        ))}
      </div>
    </div>
  );
}

export default HashTableVisualizer;
