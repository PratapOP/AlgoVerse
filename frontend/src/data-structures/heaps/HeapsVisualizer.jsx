import { useState } from "react";
import { MinHeap, MaxHeap } from "./heapLogic";

function HeapNode({ value }) {
  return (
    <div
      style={{
        padding: "8px 12px",
        borderRadius: "50%",
        background: "#00b894",
        color: "#fff",
        minWidth: "30px",
        textAlign: "center",
      }}
    >
      {value}
    </div>
  );
}

function renderHeapTree(heap, index = 0) {
  if (index >= heap.length) return null;

  return (
    <div style={{ textAlign: "center" }}>
      <HeapNode value={heap[index]} />
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        {renderHeapTree(heap, index * 2 + 1)}
        {renderHeapTree(heap, index * 2 + 2)}
      </div>
    </div>
  );
}

function HeapVisualizer() {
  const [type, setType] = useState("min");
  const [heap, setHeap] = useState(new MinHeap());
  const [, forceUpdate] = useState(0);
  const [value, setValue] = useState("");

  const rebuildHeap = (newType) => {
    const newHeap = newType === "min" ? new MinHeap() : new MaxHeap();
    heap.getHeap().forEach((v) => newHeap.insert(v));
    setHeap(newHeap);
    setType(newType);
    forceUpdate((x) => x + 1);
  };

  const insertValue = () => {
    if (!value) return;
    heap.insert(Number(value));
    setValue("");
    forceUpdate((x) => x + 1);
  };

  const removeRoot = () => {
    heap.remove();
    forceUpdate((x) => x + 1);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>{type === "min" ? "Min Heap" : "Max Heap"}</h2>

      <button onClick={() => rebuildHeap("min")}>Min Heap</button>
      <button onClick={() => rebuildHeap("max")}>Max Heap</button>

      <div style={{ marginTop: "1rem" }}>
        <input
          type="number"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value"
        />
        <button onClick={insertValue}>Insert</button>
        <button onClick={removeRoot}>Remove Root</button>
      </div>

      <div style={{ marginTop: "2rem" }}>
        {renderHeapTree(heap.getHeap())}
      </div>
    </div>
  );
}

export default HeapVisualizer;
