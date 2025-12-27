/* =========================================================
   📦 IMPORTS — React & Router
   ========================================================= */
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* =========================================================
   📦 IMPORTS — UI Components
   ========================================================= */
import ArrayBars from "../components/visualizers/sorting/ArrayBars";
import ControlPanel from "../components/controls/ControlPanel";
import LegendPanel from "../components/common/LegendPanel";
import Grid from "../components/visualizers/searching/Grid";

/* =========================================================
   📦 IMPORTS — SORTING ALGORITHMS
   ========================================================= */
import { getBubbleSortSteps } from "../algorithms/sorting/bubbleSort";
import { getSelectionSortSteps } from "../algorithms/sorting/selectionSort";
import { getInsertionSortSteps } from "../algorithms/sorting/insertionSort";
import { getMergeSortSteps } from "../algorithms/sorting/mergeSort";
import { getQuickSortSteps } from "../algorithms/sorting/quickSort";
import { getHeapSortSteps } from "../algorithms/sorting/heapSort";
import { getShellSortSteps } from "../algorithms/sorting/shellSort";
import { getCountingSortSteps } from "../algorithms/sorting/countingSort";
import { getRadixSortSteps } from "../algorithms/sorting/radixSort";
import { getBucketSortSteps } from "../algorithms/sorting/bucketSort";

/* =========================================================
   📦 IMPORTS — ARRAY SEARCHING
   ========================================================= */
import { getLinearSearchSteps } from "../algorithms/searching/linearSearch";
import { getBinarySearchSteps } from "../algorithms/searching/binarySearch";
import { getJumpSearchSteps } from "../algorithms/searching/jumpSearch";
import { getExponentialSearchSteps } from "../algorithms/searching/exponentialSearch";

/* =========================================================
   📦 IMPORTS — GRID / GRAPH SEARCHING
   ========================================================= */
import { getBFSSteps } from "../algorithms/searching/bfs";
import { getDFSSteps } from "../algorithms/searching/dfs";

/* =========================================================
   🧱 GRID CONFIGURATION
   ========================================================= */
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
      });
    }
    grid.push(row);
  }
  return grid;
};

/* =========================================================
   🎛️ MAIN VISUALIZER
   ========================================================= */
function Visualizer() {
  /* ------------------ Utilities ------------------ */
  const generateArray = (size) =>
    Array.from({ length: size }, () => Math.floor(Math.random() * 100) + 10);

  const navigate = useNavigate();
  const timerRef = useRef(null);

  /* ------------------ State ------------------ */
  const [algorithm, setAlgorithm] = useState("bubble");
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

  /* -------- GRID STATE (BFS / DFS) -------- */
  const [grid, setGrid] = useState(createGrid);
  const [pathSteps, setPathSteps] = useState([]);
  const [pathIndex, setPathIndex] = useState(0);

  const isArraySearch = ["linear", "binary", "jump", "exponential"].includes(
    algorithm
  );
  const isGridSearch = ["bfs", "dfs"].includes(algorithm);

  /* =========================================================
     🔁 RESET ON ALGORITHM CHANGE
     ========================================================= */
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
    setPathSteps([]);
    setPathIndex(0);
  }, [algorithm, size]);

  /* =========================================================
     🧠 ARRAY STEP GENERATOR
     ========================================================= */
  const getSteps = (arr, algo) => {
    switch (algo) {
      case "selection": return getSelectionSortSteps(arr);
      case "insertion": return getInsertionSortSteps(arr);
      case "merge": return getMergeSortSteps(arr);
      case "quick": return getQuickSortSteps(arr);
      case "heap": return getHeapSortSteps(arr);
      case "shell": return getShellSortSteps(arr);
      case "counting": return getCountingSortSteps(arr);
      case "radix": return getRadixSortSteps(arr);
      case "bucket": return getBucketSortSteps(arr);
      case "linear": return getLinearSearchSteps(arr, target);
      case "binary": return getBinarySearchSteps(arr, target);
      case "jump": return getJumpSearchSteps(arr, target);
      case "exponential": return getExponentialSearchSteps(arr, target);
      default: return getBubbleSortSteps(arr);
    }
  };

  /* =========================================================
     ▶️ ARRAY PLAY
     ========================================================= */
  const play = () => {
    if (timerRef.current) return;

    if (isGridSearch) return;

    setSteps(getSteps(array, algorithm));
    timerRef.current = setInterval(() => {
      setStepIndex((i) => {
        if (i >= steps.length) return pause(), i;
        const step = steps[i];
        if (step.array) setArray(step.array);
        setActive(step.indices || []);
        setRange(step.range || null);
        setStepText(step.type || "");
        if (step.type === "done") setSorted(step.array.map((_, i) => i));
        return i + 1;
      });
    }, speed);
  };

  /* ---------------------------------------------------------
   🔁 RESET (ARRAY + GRID SAFE)
   --------------------------------------------------------- */
  const reset = () => {
    pause();

    // Reset array-based visualizations
    setArray(generateArray(size));
    setSteps([]);
    setStepIndex(0);
    setActive([]);
    setSorted([]);
    setRange(null);

    // Reset grid-based visualizations
    setGrid(createGrid());
    setPathSteps([]);
    setPathIndex(0);

    setStepText("");
  };

  /* =========================================================
     ▶️ BFS / DFS START
     ========================================================= */
  const startPathfinding = () => {
    pause();
    const start = { row: 7, col: 5 };
    const end = { row: 7, col: 24 };

    const steps =
      algorithm === "bfs"
        ? getBFSSteps(grid, start, end)
        : getDFSSteps(grid, start, end);

    setPathSteps(steps);
    setPathIndex(0);
  };

  /* =========================================================
     ▶️ BFS / DFS PLAYER
     ========================================================= */
  useEffect(() => {
    if (!pathSteps.length) return;

    timerRef.current = setInterval(() => {
      setPathIndex((i) => {
        if (i >= pathSteps.length) return pause(), i;

        const step = pathSteps[i];
        setGrid((prev) =>
          prev.map((row) =>
            row.map((cell) => {
              if (
                step.node &&
                cell.row === step.node.row &&
                cell.col === step.node.col
              ) {
                if (step.type === "visit") return { ...cell, isVisited: true };
                if (step.type === "path") return { ...cell, isPath: true };
              }
              return cell;
            })
          )
        );

        setStepText(step.type);
        return i + 1;
      });
    }, speed);

    return pause;
  }, [pathSteps]);

  /* ------------------ Helpers ------------------ */
  const pause = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const toggleWall = (r, c) => {
    setGrid((g) =>
      g.map((row) =>
        row.map((cell) =>
          cell.row === r && cell.col === c && !cell.isStart && !cell.isEnd
            ? { ...cell, isWall: !cell.isWall }
            : cell
        )
      )
    );
  };

  /* =========================================================
     🖼️ RENDER
     ========================================================= */
  return (
    <div style={{ padding: "1rem" }}>
      <h2>{algorithm.toUpperCase()} VISUALIZATION</h2>
      <p>{stepText}</p>

      <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
        <option value="bubble">Bubble Sort</option>
        <option value="selection">Selection Sort</option>
        <option value="insertion">Insertion Sort</option>
        <option value="merge">Merge Sort</option>
        <option value="quick">Quick Sort</option>
        <option value="heap">Heap Sort</option>
        <option value="shell">Shell Sort</option>
        <option value="counting">Counting Sort</option>
        <option value="radix">Radix Sort</option>
        <option value="bucket">Bucket Sort</option>

        <option value="linear">Linear Search</option>
        <option value="binary">Binary Search</option>
        <option value="jump">Jump Search</option>
        <option value="exponential">Exponential Search</option>

        <option value="bfs">Breadth First Search (BFS)</option>
        <option value="dfs">Depth First Search (DFS)</option>
      </select>

      {isArraySearch && (
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          placeholder="Target"
          style={{ marginLeft: "1rem" }}
        />
      )}

      <button onClick={() => navigate(`/algorithm/${algorithm}`)}>
        View Theory
      </button>

      <LegendPanel />

      {isGridSearch ? (
        <>
          <Grid grid={grid} onToggleWall={toggleWall} />
          <button onClick={startPathfinding}>
            Start {algorithm.toUpperCase()}
          </button>
        </>
      ) : (
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
