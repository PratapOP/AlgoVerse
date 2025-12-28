import { useState } from "react";
import "./heap.css";
import HeapNode from "./HeapNode";

function HeapVisualizer() {
  const [heap, setHeap] = useState([]);
  const [mode, setMode] = useState("min");
  const [active, setActive] = useState(null);

  const insert = () => {
    const value = Math.floor(Math.random() * 100);
    const arr = [...heap, value];
    let i = arr.length - 1;

    while (i > 0) {
      const p = Math.floor((i - 1) / 2);
      if (
        (mode === "min" && arr[p] <= arr[i]) ||
        (mode === "max" && arr[p] >= arr[i])
      )
        break;
      [arr[p], arr[i]] = [arr[i], arr[p]];
      i = p;
    }

    setHeap(arr);
    setActive(value);
  };

  return (
    <div className="heap-container">
      <h2>{mode === "min" ? "Min Heap" : "Max Heap"}</h2>

      <select onChange={(e) => setMode(e.target.value)}>
        <option value="min">Min Heap</option>
        <option value="max">Max Heap</option>
      </select>

      <button onClick={insert}>Insert</button>

      <div className="heap-array">
        {heap.map((value, index) => (
          <HeapNode
            key={index}
            value={value}
            index={index}
            isActive={value === active}
          />
        ))}
      </div>

    </div>
  );
}

export default HeapVisualizer;
