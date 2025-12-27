import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Visualizer from "./pages/Visualizer";
import AlgorithmDetail from "./pages/AlgorithmDetail";

function Home() {
  return (
    <div style={{ padding: "40px", color: "white" }}>
      <h1>🏠 Home Page Loaded</h1>
      <p>React Router is working correctly.</p>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
