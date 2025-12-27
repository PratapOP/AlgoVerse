import { HashRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Visualizer from "./pages/Visualizer";
import AlgorithmDetail from "./pages/AlgorithmDetail";
import Layout from "./components/common/Layout";

function App() {
  return (
    <HashRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/visualizer" element={<Visualizer />} />
          <Route path="/algorithm/:algoKey" element={<AlgorithmDetail />} />
        </Routes>
      </Layout>
    </HashRouter>
  );
}

export default App;
