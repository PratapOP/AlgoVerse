import { useParams } from "react-router-dom";
import { sortingAlgorithms } from "../data/sortingAlgorithms";
import { searchingAlgorithms } from "../data/searchingAlgorithms";

function AlgorithmDetail() {
  const { algoKey } = useParams();

  // Lookup in sorting first, then searching
  const algo =
    sortingAlgorithms[algoKey] || searchingAlgorithms[algoKey];

  if (!algo) {
    return (
      <div style={{ padding: "2rem" }}>
        <h2>Algorithm not found</h2>
        <p>
          The algorithm you are looking for does not exist or has not been
          implemented yet.
        </p>
      </div>
    );
  }

  return (
    <div style={{ padding: "2rem", maxWidth: "900px", margin: "0 auto" }}>
      <h1>{algo.name}</h1>

      <h3>Overview</h3>
      <p>{algo.overview}</p>

      <h3>Time & Space Complexity</h3>
      <ul>
        <li>Best Case: {algo.complexity.best}</li>
        <li>Average Case: {algo.complexity.average}</li>
        <li>Worst Case: {algo.complexity.worst}</li>
        <li>Space Complexity: {algo.complexity.space}</li>
      </ul>

      <h3>History</h3>
      <p>{algo.history}</p>

      <h3>Pseudocode</h3>
      <pre>{algo.pseudocode}</pre>

      <h3>JavaScript Implementation</h3>
      <pre>{algo.code.js}</pre>

      <h3>Python Implementation</h3>
      <pre>{algo.code.python}</pre>

      <h3>Real-World Usage</h3>
      <p>{algo.usage}</p>
    </div>
  );
}

export default AlgorithmDetail;
