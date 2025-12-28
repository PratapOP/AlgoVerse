import { useEffect, useRef, useState } from "react";
import HeapNode from "./HeapNode";
import { getHeapExtractSteps } from "../../../algorithms/tree/heapExtract";
import { getHeapInsertSteps } from "../../../algorithms/tree/heapInsert";

function HeapVisualizer() {
  const [heap, setHeap] = useState([10, 20, 30, 40, 50]);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [activeIndices, setActiveIndices] = useState([]);
  const [heapType, setHeapType] = useState("min");
  const [insertValue, setInsertValue] = useState("");

  const timerRef = useRef(null);

  /* ---------- Start Extract ---------- */
  const startExtract = () => {
    const s = getHeapExtractSteps(heap, heapType);
    setSteps(s);
    setStepIndex(0);
  };

  /* ---------- Start Insert ---------- */
  const startInsert = () => {
    if (insertValue === "") return;
    const value = Number(insertValue);
    const s = getHeapInsertSteps(heap, value, heapType);
    setSteps(s);
    setStepIndex(0);
    setInsertValue("");
  };

  /* ---------- Animation Engine ---------- */
  useEffect(() => {
    if (stepIndex >= steps.length) return;

    timerRef.current = setTimeout(() => {
      const step = steps[stepIndex];

      if (step.heap) setHeap(step.heap);
      setActiveIndices(step.indices || [step.index].filter(Boolean));

      setStepIndex((prev) => prev + 1);
    }, 700);

    return () => clearTimeout(timerRef.current);
  }, [stepIndex, steps]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>
        {heapType === "min" ? "Min Heap" : "Max Heap"} Visualization
      </h2>

      {/* Controls */}
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setHeapType("min")}>Min Heap</button>
        <button onClick={() => setHeapType("max")}>Max Heap</button>

        <button onClick={startExtract}>Extract</button>

        <input
          type="number"
          placeholder="Insert value"
          value={insertValue}
          onChange={(e) => setInsertValue(e.target.value)}
          style={{ marginLeft: "0.5rem" }}
        />
        <button onClick={startInsert}>Insert</button>
      </div>

      {/* Heap Array */}
      <div className="heap-array">
        {heap.map((value, index) => (
          <HeapNode
            key={index}
            value={value}
            index={index}
            isActive={activeIndices.includes(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default HeapVisualizer;
