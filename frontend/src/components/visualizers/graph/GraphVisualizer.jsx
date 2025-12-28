import { useEffect, useRef, useState } from "react";
import GraphCanvas from "./GraphCanvas";

import { primSteps } from "../../../algorithms/graph/prim";
import { kruskalSteps } from "../../../algorithms/graph/kruskal";
import { tarjanSteps } from "../../../algorithms/graph/tarjan";
import { kosarajuSteps } from "../../../algorithms/graph/kosaraju";

function GraphVisualizer() {
  /* ================= GRAPH DATA ================= */
  const nodes = [
    { id: "A", x: 120, y: 120 },
    { id: "B", x: 320, y: 120 },
    { id: "C", x: 220, y: 260 },
    { id: "D", x: 420, y: 260 },
  ];

  const edges = [
    { from: nodes[0], to: nodes[1], weight: 2 },
    { from: nodes[1], to: nodes[2], weight: 1 },
    { from: nodes[0], to: nodes[2], weight: 3 },
    { from: nodes[2], to: nodes[3], weight: 4 },
  ];

  const directedGraph = {
    A: ["B"],
    B: ["C"],
    C: ["A", "D"],
    D: [],
  };

  /* ================= STATE ================= */
  const [mode, setMode] = useState("prim"); // prim | kruskal | tarjan | kosaraju
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [activeEdges, setActiveEdges] = useState([]);
  const [activeNodes, setActiveNodes] = useState([]);
  const [components, setComponents] = useState([]);

  const timerRef = useRef(null);

  /* ================= STEP GENERATION ================= */
  const generateSteps = () => {
    let s = [];

    if (mode === "prim") {
      s = primSteps(nodes, edges, "A");
    } else if (mode === "kruskal") {
      s = kruskalSteps(nodes, edges);
    } else if (mode === "tarjan") {
      s = tarjanSteps(directedGraph);
    } else if (mode === "kosaraju") {
      s = kosarajuSteps(directedGraph);
    }

    setSteps(s);
    setStepIndex(0);
    setActiveEdges([]);
    setActiveNodes([]);
    setComponents([]);
  };

  /* ================= PLAY ================= */
  const play = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setStepIndex((i) => {
        if (i >= steps.length) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          return i;
        }

        const step = steps[i];

        /* ---------- MST ---------- */
        if (step.type === "edge") {
          setActiveEdges((prev) => [...prev, step.edge]);
        }

        if (step.type === "visit") {
          setActiveNodes([step.node]);
        }

        /* ---------- SCC ---------- */
        if (step.type === "scc") {
          setComponents((prev) => [...prev, step.component]);
        }

        return i + 1;
      });
    }, 900);
  };

  /* ================= RENDER ================= */
  return (
    <div style={{ padding: "1.5rem" }}>
      <h2>Graph Algorithms Visualizer</h2>

      {/* ---------- CONTROLS ---------- */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
        <select value={mode} onChange={(e) => setMode(e.target.value)}>
          <optgroup label="MST">
            <option value="prim">Prim's Algorithm</option>
            <option value="kruskal">Kruskal's Algorithm</option>
          </optgroup>

          <optgroup label="SCC">
            <option value="tarjan">Tarjan's Algorithm</option>
            <option value="kosaraju">Kosaraju's Algorithm</option>
          </optgroup>
        </select>

        <button onClick={generateSteps}>Generate</button>
        <button onClick={play}>Play</button>
      </div>

      {/* ---------- GRAPH ---------- */}
      <GraphCanvas
        nodes={nodes}
        edges={edges}
        activeEdges={activeEdges}
        activeNodes={activeNodes}
      />

      {/* ---------- SCC OUTPUT ---------- */}
      {components.length > 0 && (
        <div style={{ marginTop: "1rem" }}>
          <h4>Strongly Connected Components</h4>
          {components.map((c, i) => (
            <p key={i}>
              Component {i + 1}: {c.join(", ")}
            </p>
          ))}
        </div>
      )}
    </div>
  );
}

export default GraphVisualizer;
