import { Routes, Route, Navigate } from "react-router-dom";
import Visualizer from "./pages/Visualizer";
import AlgorithmDetail from "./pages/AlgorithmDetail";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/visualize" />} />
      <Route path="/visualize" element={<Visualizer />} />
      <Route
        path="/algorithm/:algoKey"
        element={<AlgorithmDetail />}
      />
    </Routes>
  );
}

export default App;
