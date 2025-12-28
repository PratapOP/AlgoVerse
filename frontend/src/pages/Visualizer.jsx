import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

/* ================= UI COMPONENTS ================= */
import ArrayBars from "../components/visualizers/sorting/ArrayBars";
import ControlPanel from "../components/controls/ControlPanel";
import LegendPanel from "../components/common/LegendPanel";
import Grid from "../components/visualizers/searching/Grid";

/* ================= SORTING ================= */
import { getBubbleSortSteps } from "../algorithms/sorting/bubbleSort";
import { getSelectionSortSteps } from "../algorithms/sorting/selectionSort";
import { getInsertionSortSteps } from "../algorithms/sorting/insertionSort";
import { getMergeSortSteps } from "../algorithms/sorting/mergeSort";
import { getQuickSortSteps } from "../algorithms/sorting/quickSort";
import { getHeapSortSteps } from "../algorithms/sorting/heapSort";

/* ================= SEARCHING ================= */
import { getLinearSearchSteps } from "../algorithms/searching/linearSearch";
import { getBinarySearchSteps } from "../algorithms/searching/binarySearch";
import { getJumpSearchSteps } from "../algorithms/searching/jumpSearch";
import { getExponentialSearchSteps } from "../algorithms/searching/exponentialSearch";

/* ================= GRAPH ================= */
import { getBFSSteps } from "../algorithms/searching/bfs";
import { getDFSSteps } from "../algorithms/searching/dfs";
import { getDijkstraSteps } from "../algorithms/searching/dijkstra";
import { getAStarSteps } from "../algorithms/searching/astar";

/* ================= GRID ================= */
const ROWS = 15;
const COLS = 30;

const createGrid = () =>
  Array.from({ length: ROWS }, (_, r) =>
    Array.from({ length: COLS }, (_, c) => ({
      row: r,
      col: c,
      isStart: r === 7 && c === 5,
      isEnd: r === 7 && c === 24,
      isWall: false,
      isVisited: false,
      isPath: false,
      weight: Math.floor(Math.random() * 9) + 1,
    }))
  );

/* =================================================
   VISUALIZER
================================================= */
function Visualizer() {
  const navigate = useNavigate();
  const timerRef = useRef(null);

  /* ================= MODE ================= */
  const [algorithm, setAlgorithm] = useState("bubble");

  /* ================= ARRAY STATE ================= */
  const generateArray = (n) =>
    Array.from({ length: n }, () => Math.floor(Math.random() * 100) + 10);

  const [array, setArray] = useState(generateArray(20));
  const [size, setSize] = useState(20);
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

  /* ================= DATA STRUCTURES ================= */
  const [linkedList, setLinkedList] = useState([]);
  const [stack, setStack] = useState([]);
  const [queue, setQueue] = useState([]);
  const [dsValue, setDsValue] = useState("");

  /* ================= FLAGS ================= */
  const isSorting = [
    "bubble",
    "selection",
    "insertion",
    "merge",
    "quick",
    "heap",
  ].includes(algorithm);

  const isSearching = [
    "linear",
    "binary",
    "jump",
    "exponential",
  ].includes(algorithm);

  const isGraph = ["bfs", "dfs", "dijkstra", "astar"].includes(algorithm);

  const isDS = ["linkedlist", "stack", "queue"].includes(algorithm);

  /* ================= RESET ================= */
  useEffect(() => {
    pause();
    setArray(generateArray(size));
    setSteps([]);
    setActive([]);
    setSorted([]);
    setRange(null);
    setStepText("");
    setGrid(createGrid());
    setGridSteps([]);
    setGridIndex(0);
  }, [algorithm, size]);

  /* ================= SORT / SEARCH STEPS ================= */
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
        if (s.type === "done" && s.array)
          setSorted(s.array.map((_, idx) => idx));
        return i + 1;
      });
    }, speed);
  };

  /* ================= PLAY GRAPH ================= */
  const playGraph = () => {
    if (timerRef.current) return;

    const start = { row: 7, col: 5 };
    const end = { row: 7, col: 24 };

    let steps;
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

  /* ================= DS ACTIONS ================= */
  const addLinkedList = () => {
    if (!dsValue) return;
    setLinkedList([...linkedList, dsValue]);
    setDsValue("");
  };

  const pushStack = () => {
    if (!dsValue) return;
    setStack([...stack, dsValue]);
    setDsValue("");
  };

  const popStack = () => setStack(stack.slice(0, -1));

  const enqueue = () => {
    if (!dsValue) return;
    setQueue([...queue, dsValue]);
    setDsValue("");
  };

  const dequeue = () => setQueue(queue.slice(1));

  /* ================= CONTROLS ================= */
  const play = () => {
    if (isSorting || isSearching) playArray();
    if (isGraph) playGraph();
  };

  const pause = () => {
    clearInterval(timerRef.current);
    timerRef.current = null;
  };

  const reset = () => {
    pause();
    setArray(generateArray(size));
    setGrid(createGrid());
    setLinkedList([]);
    setStack([]);
    setQueue([]);
    setStepText("");
  };

  /* ================= RENDER ================= */
  return (
    <div style={{ padding: "1rem" }}>
      <h2>AlgoVerse Visualizer</h2>

      <select value={algorithm} onChange={(e) => setAlgorithm(e.target.value)}>
        <optgroup label="Sorting">
          <option value="bubble">Bubble</option>
          <option value="selection">Selection</option>
          <option value="insertion">Insertion</option>
          <option value="merge">Merge</option>
          <option value="quick">Quick</option>
          <option value="heap">Heap</option>
        </optgroup>

        <optgroup label="Searching">
          <option value="linear">Linear</option>
          <option value="binary">Binary</option>
          <option value="jump">Jump</option>
          <option value="exponential">Exponential</option>
        </optgroup>

        <optgroup label="Graph">
          <option value="bfs">BFS</option>
          <option value="dfs">DFS</option>
          <option value="dijkstra">Dijkstra</option>
          <option value="astar">A*</option>
        </optgroup>

        <optgroup label="Data Structures">
          <option value="linkedlist">Linked List</option>
          <option value="stack">Stack</option>
          <option value="queue">Queue</option>
        </optgroup>
      </select>

      <LegendPanel />

      {/* ARRAY */}
      {(isSorting || isSearching) && (
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

      {/* GRAPH */}
      {isGraph && (
        <>
          <Grid grid={grid} />
          <button onClick={play}>Start</button>
        </>
      )}

      {/* DATA STRUCTURES */}
      {isDS && (
        <div style={{ marginTop: "1rem" }}>
          <input
            value={dsValue}
            onChange={(e) => setDsValue(e.target.value)}
            placeholder="Value"
          />

          {algorithm === "linkedlist" && (
            <>
              <button onClick={addLinkedList}>Insert</button>
              <div style={{ display: "flex", marginTop: "1rem" }}>
                {linkedList.map((v, i) => (
                  <div key={i} style={{ marginRight: "10px" }}>
                    [{v}] →
                  </div>
                ))}
                null
              </div>
            </>
          )}

          {algorithm === "stack" && (
            <>
              <button onClick={pushStack}>Push</button>
              <button onClick={popStack}>Pop</button>
              <div>{stack.map((v, i) => <div key={i}>{v}</div>)}</div>
            </>
          )}

          {algorithm === "queue" && (
            <>
              <button onClick={enqueue}>Enqueue</button>
              <button onClick={dequeue}>Dequeue</button>
              <div>{queue.map((v, i) => <span key={i}>{v} </span>)}</div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default Visualizer;
