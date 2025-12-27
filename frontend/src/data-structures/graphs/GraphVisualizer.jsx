import { useState } from "react";
import { GraphAdjList, GraphAdjMatrix } from "./graphLogic";

function GraphVisualizer() {
  const [type, setType] = useState("list");
  const [graphList] = useState(new GraphAdjList());
  const [graphMatrix] = useState(new GraphAdjMatrix(6));
  const [, forceUpdate] = useState(0);
  const [v1, setV1] = useState("");
  const [v2, setV2] = useState("");
  const [start, setStart] = useState("");
  const [order, setOrder] = useState([]);

  const addEdge = () => {
    if (type === "list") {
      graphList.addEdge(v1, v2);
    } else {
      graphMatrix.addEdge(Number(v1), Number(v2));
    }
    forceUpdate((x) => x + 1);
  };

  const runTraversal = (algo) => {
    if (type === "list") {
      setOrder(
        algo === "bfs"
          ? graphList.bfs(start)
          : graphList.dfs(start)
      );
    } else {
      setOrder(
        algo === "bfs"
          ? graphMatrix.bfs(Number(start))
          : graphMatrix.dfs(Number(start))
      );
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Graph ({type === "list" ? "Adjacency List" : "Adjacency Matrix"})</h2>

      <button onClick={() => setType("list")}>Adj List</button>
      <button onClick={() => setType("matrix")}>Adj Matrix</button>

      <div style={{ marginTop: "1rem" }}>
        <input
          placeholder="V1"
          value={v1}
          onChange={(e) => setV1(e.target.value)}
        />
        <input
          placeholder="V2"
          value={v2}
          onChange={(e) => setV2(e.target.value)}
        />
        <button onClick={addEdge}>Add Edge</button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <input
          placeholder="Start"
          value={start}
          onChange={(e) => setStart(e.target.value)}
        />
        <button onClick={() => runTraversal("bfs")}>BFS</button>
        <button onClick={() => runTraversal("dfs")}>DFS</button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <strong>Traversal Order:</strong>{" "}
        {order.map((v, i) => (
          <span key={i} style={{ marginRight: "6px" }}>
            {v}
          </span>
        ))}
      </div>

      <div style={{ marginTop: "1rem" }}>
        {type === "list" ? (
          Object.entries(graphList.getGraph()).map(([v, edges]) => (
            <div key={v}>
              {v} → {edges.join(", ")}
            </div>
          ))
        ) : (
          graphMatrix.getMatrix().map((row, i) => (
            <div key={i}>{row.join(" ")}</div>
          ))
        )}
      </div>
    </div>
  );
}

export default GraphVisualizer;
