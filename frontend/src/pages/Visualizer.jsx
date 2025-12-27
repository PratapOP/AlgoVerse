import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

import ArrayBars from "../components/visualizers/sorting/ArrayBars";
import ControlPanel from "../components/controls/ControlPanel";
import LegendPanel from "../components/common/LegendPanel";

// Sorting algorithms
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

// Searching algorithms
import { getLinearSearchSteps } from "../algorithms/searching/linearSearch";
import { getBinarySearchSteps } from "../algorithms/searching/binarySearch";
import { getJumpSearchSteps } from "../algorithms/searching/jumpSearch";
import { getExponentialSearchSteps } from "../algorithms/searching/exponentialSearch";

function Visualizer() {
  /* ---------- Utilities ---------- */
  const generateArray = (size) =>
    Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100) + 10
    );

  const navigate = useNavigate();
  const timerRef = useRef(null);

  const getSteps = (arr, algo) => {
    switch (algo) {
      case "selection":
        return getSelectionSortSteps(arr);
      case "insertion":
        return getInsertionSortSteps(arr);
      case "merge":
        return getMergeSortSteps(arr);
      case "quick":
        return getQuickSortSteps(arr);
      case "heap":
        return getHeapSortSteps(arr);
      case "shell":
        return getShellSortSteps(arr);
      case "counting":
        return getCountingSortSteps(arr);
      case "radix":
        return getRadixSortSteps(arr);
      case "bucket":
        return getBucketSortSteps(arr);

      case "linear":
        return getLinearSearchSteps(arr, target);
      case "binary":
        return getBinarySearchSteps(arr, target);
      case "jump":
        return getJumpSearchSteps(arr, target);
      case "exponential":
        return getExponentialSearchSteps(arr, target);

      default:
        return getBubbleSortSteps(arr);
    }
  };

  /* ---------- State ---------- */
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

  const isSearching = [
    "linear",
    "binary",
    "jump",
    "exponential",
  ].includes(algorithm);

  /* ---------- Re-generate on size / algorithm change ---------- */
  useEffect(() => {
    pause();
    const newArray = generateArray(size);
    setArray(newArray);
    setSteps(getSteps(newArray, algorithm));
    setStepIndex(0);
    setActive([]);
    setSorted([]);
    setRange(null);
    setStepText("");
  }, [size, algorithm]);

  /* ---------- Controls ---------- */
  const play = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= steps.length) {
          pause();
          return prev;
        }

        const step = steps[prev];

        if (step.array) setArray(step.array);
        setActive(step.indices || []);
        setRange(step.range || null);

        // Educational narration
        switch (step.type) {
          case "compare":
            setStepText("Comparing elements");
            break;
          case "swap":
            setStepText("Swapping elements");
            break;
          case "split":
            setStepText("Dividing array into subarrays");
            break;
          case "merge":
            setStepText("Merging sorted subarrays");
            break;
          case "found":
            setStepText(`Target ${target} found`);
            break;
          case "not-found":
            setStepText(`Target ${target} not found`);
            break;
          case "done":
            setStepText("Algorithm completed");
            if (!isSearching && step.array) {
              setSorted(
                Array.from({ length: step.array.length }, (_, i) => i)
              );
            }
            break;
          default:
            setStepText("");
        }

        return prev + 1;
      });
    }, speed);
  };

  const pause = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const reset = () => {
    pause();
    const newArray = generateArray(size);
    setArray(newArray);
    setSteps(getSteps(newArray, algorithm));
    setStepIndex(0);
    setActive([]);
    setSorted([]);
    setRange(null);
    setStepText("");
  };

  /* ---------- Render ---------- */
  return (
    <div style={{ padding: "1rem" }}>
      <h2>
        {algorithm.charAt(0).toUpperCase() + algorithm.slice(1)}{" "}
        {isSearching ? "Search" : "Visualization"}
      </h2>

      <p style={{ color: "var(--text-secondary)", marginBottom: "1rem" }}>
        {stepText}
      </p>

      <select
        value={algorithm}
        onChange={(e) => setAlgorithm(e.target.value)}
      >
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
      </select>

      {isSearching && (
        <input
          type="number"
          value={target}
          onChange={(e) => setTarget(Number(e.target.value))}
          placeholder="Target"
          style={{ marginLeft: "1rem" }}
        />
      )}

      <button
        style={{ display: "block", margin: "1rem 0" }}
        onClick={() => navigate(`/algorithm/${algorithm}`)}
      >
        View Theory
      </button>

      <LegendPanel />

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
    </div>
  );
}

export default Visualizer;
