function Home() {
  return (
    <div style={{ padding: "4rem", textAlign: "center" }}>
      <h1 style={{ fontSize: "3rem", marginBottom: "1rem" }}>
        AlgoVerse
      </h1>

      <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)" }}>
        Visualize algorithms. Understand how they think.
      </p>

      <div style={{ marginTop: "3rem", display: "flex", gap: "2rem", justifyContent: "center" }}>
        <div>
          <h3>Sorting</h3>
          <p>Watch elements compare, swap, and organize</p>
        </div>
        <div>
          <h3>Searching</h3>
          <p>See how algorithms narrow down targets</p>
        </div>
        <div>
          <h3>Theory</h3>
          <p>Learn complexity, history, and applications</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
