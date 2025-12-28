import { edmondsKarp } from "../../../algorithms/graph/edmondsKarp";

function FlowVisualizer() {
  const capacity = [
    [0, 10, 10, 0],
    [0, 0, 2, 8],
    [0, 0, 0, 10],
    [0, 0, 0, 0],
  ];

  const run = () => {
    console.log(edmondsKarp(capacity, 0, 3));
  };

  return (
    <>
      <h2>Max Flow (Edmonds–Karp)</h2>
      <button onClick={run}>Run</button>
      <p>Check console for flow updates</p>
    </>
  );
}

export default FlowVisualizer;
