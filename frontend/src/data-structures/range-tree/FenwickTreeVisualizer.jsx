import { useState } from "react";
import { FenwickTree } from "./rangeTreeLogic";

function FenwickTreeVisualizer() {
  const size = 8;
  const [fenwick] = useState(new FenwickTree(size));
  const [, forceUpdate] = useState(0);
  const [index, setIndex] = useState("");
  const [value, setValue] = useState("");
  const [queryRange, setQueryRange] = useState({ l: 0, r: 0 });
  const [result, setResult] = useState(null);

  const updateValue = () => {
    if (index === "" || value === "") return;
    fenwick.update(Number(index), Number(value));
    forceUpdate((x) => x + 1);
  };

  const runQuery = () => {
    setResult(
      fenwick.rangeQuery(
        Number(queryRange.l),
        Number(queryRange.r)
      )
    );
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Fenwick Tree (Binary Indexed Tree)</h2>

      <div>
        <input
          placeholder="Index"
          value={index}
          onChange={(e) => setIndex(e.target.value)}
          type="number"
        />
        <input
          placeholder="Delta"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          type="number"
        />
        <button onClick={updateValue}>Update</button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <input
          placeholder="L"
          value={queryRange.l}
          onChange={(e) =>
            setQueryRange({ ...queryRange, l: e.target.value })
          }
          type="number"
        />
        <input
          placeholder="R"
          value={queryRange.r}
          onChange={(e) =>
            setQueryRange({ ...queryRange, r: e.target.value })
          }
          type="number"
        />
        <button onClick={runQuery}>Range Sum</button>
      </div>

      {result !== null && <p>Result: {result}</p>}

      <div style={{ marginTop: "1rem" }}>
        {fenwick.getTree().map((v, i) => (
          <span key={i} style={{ marginRight: "8px" }}>
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}

export default FenwickTreeVisualizer;
