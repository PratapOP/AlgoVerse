/* =========================================================
   AlgoVerse — Master Visualizer
   Covers:
   - Sorting Algorithms
   - Array Searching
   - Graph Algorithms (BFS, DFS, Dijkstra, A*)
   - Binary Tree Traversals
   ========================================================= */

import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ================= UI COMPONENTS ================= */
import ArrayBars from "../components/visualizers/sorting/ArrayBars";
import ControlPanel from "../components/controls/ControlPanel";
import LegendPanel from "../components/common/LegendPanel";
import Grid from "../components/visualizers/searching/Grid";

/* ================= TREE ================= */
import TreeVisualizer from "../components/visualizers/tree/TreeVisualizer";

/* ================= SORTING ================= */
import { getBubbleSortSteps } from "../algorithms/sorting/bubbleSort";
import { getSelectionSortSteps } from "../algorithms/sorting/selectionSort";
import { getInsertionSortSteps } from "../algorithms/sorting/insertionSort";
import { getMergeSortSteps } from "../algorithms/sorting/mergeSort";
import { getQuickSortSteps } from "../algorithms/sorting/quickSort";
import { getHeapSortSteps } from "../algorithms/sorting/heapSort";

/* ================= ARRAY SEARCH ================= */
import { getLinearSearchSteps } from "../algorithms/searching/linearSearch";
import { getBinarySearchSteps } from "../algorithms/searching/binarySearch";
import { getJumpSearchSteps } from "../algorithms/searching/jumpSearch";
import { getExponentialSearchSteps } from "../algorithms/searching/exponentialSearch";

/* ================= GRAPH SEARCH ================= */
import { getBFSSteps } from "../algorithms/searching/bfs";
import { getDFSSteps } from "../algorithms/searching/dfs";
import { getDijkstraSteps } from "../algorithms/searching/dijkstra";
import { getAStarSteps } from "../algorithms/searching/astar";

/* ================= GRID CONFIG ================= */
const ROWS = 15;
const COLS = 30;

const createGrid = () => {
  const grid = [];
  for (let r = 0; r < ROWS; r++) {
    const row = [];
    for (let c = 0; c < COLS; c++) {
      row.push({
        row: r,
        col: c,
        isStart: r === 7 && c === 5,
        isEnd: r === 7 && c === 24,
        isWall: false,
        isVisited: false,
        isPath: false,
        weight: Math.floor(Math.random() * 9) + 1,
      });
    }
    grid.push(row);
  }
  return grid;
};

function Visualizer() {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  /* ================= COMMON ================= */
  const generateArray = (size) =>
    Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 10);

  /* ================= MODE ================= */
  const [algorithm, setAlgorithm] = useState("bubble");

  /* ================= ARRAY STATE ================= */
  const [size, setSize] = useState(20);
  const [array, setArray] = useState(() => generateArray(20));
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [active, setActive] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [range, setRange] = useState(null);
  const [speed, setSpeed] = useState(300);
  const [target, setTarget] = useState(50);
  const [stepText, setStepText] = useState("");

  /* ================= GRID STATE ================= */
  const [grid, setGrid] = useState(createGrid);
  const [gridSteps, setGridSteps] = useState([]);
  const [gridIndex, setGridIndex] = useState(0);

  /* ================= MODE FLAGS ================= */
  const isArraySearch = ["linear", "binary", "jump", "exponential"].includes(
    algorithm
  );
  const isGridAlgo = ["bfs", "dfs", "dijkstra", "astar"].includes(algorithm);
  const isTreeAlgo = algorithm === "tree";

  /* ================= RESET ON CHANGE ================= */
  useEffect(() => {
    pause();
    setArray(generateArray(size));
    setSteps([]);
    setStepIndex(0);
    setActive([]);
    setSorted([]);
    setRange(null);
    setStepText("");
    setGrid(createGrid());
    setGridSteps([]);
    setGridIndex(0);
  }, [algorithm, size]);

  /* ================= STEP GENERATOR ================= */
  const getArraySteps = () => {
    switch (algorithm) {
      case "selection":
        return getSelectionSortSteps(array);
      case "insertion":
        return getInsertionSortSteps(array);
      case "merge":
        return getMergeSortSteps(array);
      case "quick":
        return getQuickSortSteps(array);
      case "heap":
        return getHeapSortSteps(array);
      case "linear":
        return getLinearSearchSteps(array, target);
      case "binary":
        return getBinarySearchSteps(array, target);
      case "jump":
        return getJumpSearchSteps(array, target);
      case "exponential":
        return getExponentialSearchSteps(array, target);
      default:
        return getBubbleSortSteps(array);
    }
  };

  /* ================= PLAY ARRAY ================= */
  const playArray = () => {
    if (timerRef.current) return;

    const localSteps = getArraySteps();
    setSteps(localSteps);

    timerRef.current = setInterval(() => {
      setStepIndex((i) => {
        if (i >= localSteps.length) {
          pause();
          return i;
        }

        const s = localSteps[i];
        if (s.array) setArray(s.array);
        setActive(s.indices || []);
        setRange(s.range || null);
        setStepText(s.type || "");

        if (s.type === "done" && s.array) {
          setSorted(s.array.map((_, idx) => idx));
        }
        return i + 1;
      });
    }, speed);
  };

  /* ================= PLAY GRID ================= */
  const playGrid = () => {
    if (timerRef.current) return;

    let steps;
    const start = { row: 7, col: 5 };
    const end = { row: 7, col: 24 };

    if (algorithm === "bfs") steps = getBFSSteps(grid, start, end);
    else if (algorithm === "dfs") steps = getDFSSteps(grid, start, end);
    else if (algorithm === "dijkstra")
      steps = getDijkstraSteps(grid, start, end);
    else steps = getAStarSteps(grid, start, end);

    setGridSteps(steps);

    timerRef.current = setInterval(() => {
      setGridIndex((i) => {
        if (i >= steps.length) {
          pause();
          return i;
        }

        const step = steps[i];
        setGrid((g) =>
          g.map((row) =>
            row.map((cell) =>
              cell.row === step.node.row && cell.col === step.node.col
                ? step.type === "path"
                  ? { ...cell, isPath: true }
                  : { ...cell, isVisited: true }
                : cell
            )
          )
        );
        return i + 1;
      });
    }, speed);
  };

  /* ================= CONTROLS ================= */
  const play = () => {
    if (isTreeAlgo) return; // TreeVisualizer handles itself
    isGridAlgo ? playGrid() : playArray();
  };

  const pause = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const reset = () => {
    pause();
    setArray(generateArray(size));
    setGrid(createGrid());
    setSteps([]);
    setGridSteps([]);
    setStepIndex(0);
    setGridIndex(0);
    setActive([]);
    setSorted([]);
    setStepText("");
  };

  const toggleWall = (r, c) =>
    setGrid((g) =>
      g.map((row) =>
        row.map((cell) =>
          cell.row === r && cell.col === c && !cell.isStart && !cell.isEnd
            ? { ...cell, isWall: !cell.isWall }
            : cell
        )
      )
    );

  /* ================= RENDER ================= */
  return (
    <div style={{ padding: "1rem" }}>
      <h2>{algorithm.toUpperCase()} VISUALIZATION</h2>
      <p>{stepText}</p>

      <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
        <optgroup label="Sorting">
          <option value="bubble">Bubble Sort</option>
          <option value="selection">Selection Sort</option>
          <option value="insertion">Insertion Sort</option>
          <option value="merge">Merge Sort</option>
          <option value="quick">Quick Sort</option>
          <option value="heap">Heap Sort</option>
        </optgroup>

        <optgroup label="Searching (Array)">
          <option value="linear">Linear Search</option>
          <option value="binary">Binary Search</option>
          <option value="jump">Jump Search</option>
          <option value="exponential">Exponential Search</option>
        </optgroup>

        <optgroup label="Graph">
          <option value="bfs">BFS</option>
          <option value="dfs">DFS</option>
          <option value="dijkstra">Dijkstra</option>
          <option value="astar">A*</option>
        </optgroup>

        <optgroup label="Trees">
          <option value="tree">Binary Tree Traversals</option>
        </optgroup>
      </select>

      <LegendPanel />

      {/* ================= TREE MODE ================= */}
      {isTreeAlgo && <TreeVisualizer />}

      {/* ================= GRAPH MODE ================= */}
      {isGridAlgo && !isTreeAlgo && (
        <>
          <Grid grid={grid} onToggleWall={toggleWall} />
          <button onClick={play}>Start</button>
        </>
      )}

      {/* ================= ARRAY MODE ================= */}
      {!isGridAlgo && !isTreeAlgo && (
        <>
          <ArrayBars
            array={array}
            activeIndices={active}
            sortedIndices={sorted}
            range={range}
          />
          <ControlPanel
            onPlay={play}
            onPause={pause}
            onReset={reset}
            speed={speed}
            setSpeed={setSpeed}
            size={size}
            setSize={setSize}
          />
        </>
      )}
    </div>
  );
}

export default Visualizer;
