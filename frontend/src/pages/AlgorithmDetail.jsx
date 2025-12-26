function AlgorithmDetail({ algorithm }) {
  return (
    <div style={{ marginTop: "2rem" }}>
      <h1>{algorithm.name}</h1>

      <section>
        <h3>Overview</h3>
        <p>{algorithm.description}</p>
      </section>

      <section>
        <h3>Time & Space Complexity</h3>
        <ul>
          <li>Best: {algorithm.complexity.best}</li>
          <li>Average: {algorithm.complexity.average}</li>
          <li>Worst: {algorithm.complexity.worst}</li>
          <li>Space: {algorithm.complexity.space}</li>
        </ul>
      </section>

      <section>
        <h3>History</h3>
        <p>{algorithm.history}</p>
      </section>

      <section>
        <h3>Pseudocode</h3>
        <pre>{algorithm.pseudocode}</pre>
      </section>

      <section>
        <h3>Code (JavaScript)</h3>
        <pre>{algorithm.code.js}</pre>
      </section>

      <section>
        <h3>Code (Python)</h3>
        <pre>{algorithm.code.python}</pre>
      </section>
    </div>
  );
}

export default AlgorithmDetail;
