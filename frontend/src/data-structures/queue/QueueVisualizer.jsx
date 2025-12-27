import { useState } from "react";
import { Queue } from "./queueLogic";

function QueueVisualizer() {
  const [queue] = useState(new Queue());
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");

  const enqueueItem = () => {
    if (!value) return;
    queue.enqueue(value);
    setItems(queue.getQueue());
    setValue("");
  };

  const dequeueItem = () => {
    queue.dequeue();
    setItems(queue.getQueue());
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Queue (FIFO)</h2>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Value"
      />
      <button onClick={enqueueItem}>Enqueue</button>
      <button onClick={dequeueItem}>Dequeue</button>

      <div style={{ display: "flex", marginTop: "1rem" }}>
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              margin: "4px",
              background: "#55efc4",
              color: "#000",
            }}
          >
            {item}
            {index === 0 && " (FRONT)"}
            {index === items.length - 1 && " (REAR)"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default QueueVisualizer;
