import { useState } from "react";
import HashBucket from "./HashBucket";
import "./hash.css";

const SIZE = 7;

function HashTableVisualizer() {
  const [table, setTable] = useState(Array(SIZE).fill([]));

  const insert = () => {
    const value = Math.floor(Math.random() * 100);
    const index = value % SIZE;

    setTable((prev) => {
      const copy = [...prev];
      copy[index] = [...copy[index], value];
      return copy;
    });
  };

  return (
    <div className="hash-container">
      <h2>Hash Table (Chaining)</h2>
      <button onClick={insert}>Insert</button>

      <div className="hash-table">
        {table.map((bucket, i) => (
          <HashBucket key={i} index={i} values={bucket} />
        ))}
      </div>
    </div>
  );
}

export default HashTableVisualizer;
