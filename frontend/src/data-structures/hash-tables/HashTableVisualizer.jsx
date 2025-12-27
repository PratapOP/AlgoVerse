import { useState } from "react";
import {
  HashTableChaining,
  HashTableLinearProbing,
  HashTableQuadraticProbing,
} from "./hashTableLogic";

function HashTableVisualizer() {
  const [type, setType] = useState("chaining");
  const [table, setTable] = useState(new HashTableChaining());
  const [, forceUpdate] = useState(0);
  const [key, setKey] = useState("");
  const [value, setValue] = useState("");

  const rebuildTable = (newType) => {
    let newTable;
    if (newType === "linear") newTable = new HashTableLinearProbing();
    else if (newType === "quadratic")
      newTable = new HashTableQuadraticProbing();
    else newTable = new HashTableChaining();

    setType(newType);
    setTable(newTable);
    forceUpdate((x) => x + 1);
  };

  const insert = () => {
    if (!key || !value) return;
    table.insert(key, value);
    setKey("");
    setValue("");
    forceUpdate((x) => x + 1);
  };

  const remove = () => {
    if (!key) return;
    table.delete(key);
    forceUpdate((x) => x + 1);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Hash Table ({type})</h2>

      <button onClick={() => rebuildTable("chaining")}>
        Separate Chaining
      </button>
      <button onClick={() => rebuildTable("linear")}>
        Linear Probing
      </button>
      <button onClick={() => rebuildTable("quadratic")}>
        Quadratic Probing
      </button>

      <div style={{ marginTop: "1rem" }}>
        <input
          placeholder="Key"
          value={key}
          onChange={(e) => setKey(e.target.value)}
        />
        <input
          placeholder="Value"
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
        <button onClick={insert}>Insert</button>
        <button onClick={remove}>Delete</button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        {Array.isArray(table.getTable()) &&
          table.getTable().map((bucket, i) => (
            <div key={i} style={{ marginBottom: "8px" }}>
              <strong>{i}:</strong>{" "}
              {Array.isArray(bucket)
                ? bucket.map((item, j) => (
                    <span key={j} style={{ marginRight: "6px" }}>
                      [{item.key}:{item.value}]
                    </span>
                  ))
                : bucket
                ? `[${bucket.key}:${bucket.value}]`
                : "—"}
            </div>
          ))}
      </div>
    </div>
  );
}

export default HashTableVisualizer;
