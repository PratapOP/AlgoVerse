import Navbar from "./components/common/Navbar";
import Visualizer from "./pages/Visualizer";

function App() {
  return (
    <>
      <Navbar />
      <main style={{ padding: "2rem" }}>
        <Visualizer />
      </main>
    </>
  );
}

export default App;
