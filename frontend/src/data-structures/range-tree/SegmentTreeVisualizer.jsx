import { useState } from "react";
import { SegmentTree } from "./rangeTreeLogic";

function SegmentTreeVisualizer() {
  const initialArray = [2, 1, 5, 3, 4, 7, 6, 8];
  const [tree] = useState(new SegmentTree(initialArray));
  const [, forceUpdate] = useState(0);
  const [query, setQuery] = useState({ l: 0, r: 0 });
  const [update, setUpdate] = useState({ i: 0, v: 0 });
  const [result, setResult] = useState(null);

  const runQuery = () => {
    setResult(tree.query(Number(query.l), Number(query.r)));
  };

  const runUpdate = () => {
    tree.update(Number(update.i), Number(update.v));
    forceUpdate((x) => x + 1);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Segment Tree</h2>

      <div>
        <input
          placeholder="L"
          value={query.l}
          onChange={(e) => setQuery({ ...query, l: e.target.value })}
          type="number"
        />
        <input
          placeholder="R"
          value={query.r}
          onChange={(e) => setQuery({ ...query, r: e.target.value })}
          type="number"
        />
        <button onClick={runQuery}>Query</button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <input
          placeholder="Index"
          value={update.i}
          onChange={(e) => setUpdate({ ...update, i: e.target.value })}
          type="number"
        />
        <input
          placeholder="Value"
          value={update.v}
          onChange={(e) => setUpdate({ ...update, v: e.target.value })}
          type="number"
        />
        <button onClick={runUpdate}>Update</button>
      </div>

      {result !== null && <p>Query Result: {result}</p>}

      <div style={{ marginTop: "1rem" }}>
        {tree.getTree().map((v, i) => (
          <span key={i} style={{ marginRight: "8px" }}>
            {v}
          </span>
        ))}
      </div>
    </div>
  );
}

export default SegmentTreeVisualizer;
