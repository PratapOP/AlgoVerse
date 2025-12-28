// QueueVisualizer.jsx
import { useState } from "react";
import QueueNode from "./QueueNode";
import "./queue.css";

const MAX_SIZE = 6;

function QueueVisualizer() {
  /* ---------------- STATE ---------------- */
  const [queue, setQueue] = useState([]);
  const [input, setInput] = useState("");
  const [front, setFront] = useState(0);
  const [rear, setRear] = useState(-1);
  const [activeIndex, setActiveIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("normal"); // normal | circular

  /* ---------------- OPERATIONS ---------------- */

  const enqueue = () => {
    if (queue.length === MAX_SIZE) {
      setMessage("Queue Overflow");
      return;
    }

    setMessage(`Enqueue ${input}`);
    const newRear =
      mode === "circular"
        ? (rear + 1) % MAX_SIZE
        : rear + 1;

    setActiveIndex(newRear);
    setQueue([...queue, Number(input)]);
    setRear(newRear);
    setInput("");
  };

  const dequeue = () => {
    if (queue.length === 0) {
      setMessage("Queue Underflow");
      return;
    }

    setMessage("Dequeue front element");
    setActiveIndex(front);

    setTimeout(() => {
      const newQueue = queue.slice(1);
      setQueue(newQueue);

      if (newQueue.length === 0) {
        setFront(0);
        setRear(-1);
      } else {
        setFront(mode === "circular" ? (front + 1) % MAX_SIZE : front + 1);
      }

      setActiveIndex(null);
    }, 400);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="queue-container">
      <h2>Queue Visualizer</h2>

      <p className="queue-subtitle">
        Mode: <b>{mode === "normal" ? "Normal Queue" : "Circular Queue"}</b>
      </p>

      <p className="queue-message">{message}</p>

      <div className="queue-controls">
        <input
          type="number"
          placeholder="Value"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={enqueue}>Enqueue</button>
        <button onClick={dequeue}>Dequeue</button>

        <button
          className="mode-toggle"
          onClick={() =>
            setMode(mode === "normal" ? "circular" : "normal")
          }
        >
          Switch to {mode === "normal" ? "Circular" : "Normal"}
        </button>
      </div>

      <div className="queue-visual">
        {Array.from({ length: MAX_SIZE }).map((_, index) => (
          <QueueNode
            key={index}
            value={queue[index] ?? ""}
            isFront={index === front && queue.length > 0}
            isRear={index === rear}
            isActive={index === activeIndex}
          />
        ))}
      </div>

      <div className="queue-labels">
        <span>FRONT →</span>
        <span>← REAR</span>
      </div>
    </div>
  );
}

export default QueueVisualizer;
