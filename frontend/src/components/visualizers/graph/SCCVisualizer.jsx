import { kosarajuSteps } from "../../../algorithms/graph/kosaraju";

function SCCVisualizer() {
  const graph = {
    A: ["B"],
    B: ["C"],
    C: ["A"],
    D: ["C"],
  };

  const run = () => {
    console.log(kosarajuSteps(graph));
  };

  return (
    <>
      <h2>Strongly Connected Components</h2>
      <button onClick={run}>Run Kosaraju</button>
      <p>Check console for SCC grouping</p>
    </>
  );
}

export default SCCVisualizer;
