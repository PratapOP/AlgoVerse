import { useParams } from "react-router-dom";
import { algorithms } from "../data/algorithms";

function AlgorithmDetail() {
  const { algoKey } = useParams();
  const algo = algorithms[algoKey];

  if (!algo) return <p>Algorithm not found</p>;

  return (
    <div style={{ padding: "2rem" }}>
      <h1>{algo.name}</h1>

      <h3>Overview</h3>
      <p>{algo.overview}</p>

      <h3>Complexity</h3>
      <ul>
        <li>Best: {algo.complexity.best}</li>
        <li>Average: {algo.complexity.average}</li>
        <li>Worst: {algo.complexity.worst}</li>
        <li>Space: {algo.complexity.space}</li>
      </ul>

      <h3>History</h3>
      <p>{algo.history}</p>

      <h3>Pseudocode</h3>
      <pre>{algo.pseudocode}</pre>

      <h3>JavaScript Code</h3>
      <pre>{algo.code.js}</pre>

      <h3>Python Code</h3>
      <pre>{algo.code.python}</pre>

      <h3>Real-world Usage</h3>
      <p>{algo.usage}</p>
    </div>
  );
}

export default AlgorithmDetail;
