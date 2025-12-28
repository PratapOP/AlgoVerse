import { useState } from "react";
import GraphCanvas from "./GraphCanvas";
import { kruskalSteps } from "../../../algorithms/graph/kruskal";

function MSTVisualizer() {
  const nodes = [
    { id: "A", x: 100, y: 100 },
    { id: "B", x: 300, y: 100 },
    { id: "C", x: 200, y: 250 },
  ];

  const edges = [
    { from: nodes[0], to: nodes[1], weight: 2 },
    { from: nodes[1], to: nodes[2], weight: 1 },
    { from: nodes[0], to: nodes[2], weight: 3 },
  ];

  const [activeEdges, setActiveEdges] = useState([]);

  const runKruskal = () => {
    const steps = kruskalSteps(nodes, edges);
    setActiveEdges(steps.map((s) => s.edge));
  };

  return (
    <>
      <h2>Minimum Spanning Tree (Kruskal)</h2>
      <button onClick={runKruskal}>Run</button>
      <GraphCanvas nodes={nodes} edges={edges} activeEdges={activeEdges} />
    </>
  );
}

export default MSTVisualizer;
