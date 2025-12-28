import { useEffect, useRef, useState } from "react";
import QueueNode from "./QueueNode";
import {
  getEnqueueSteps,
  getDequeueSteps,
  getPeekSteps,
} from "../../../algorithms/ds/queue";

function QueueVisualizer() {
  const [queue, setQueue] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [active, setActive] = useState([]);
  const [message, setMessage] = useState("");
  const [input, setInput] = useState("");

  const timerRef = useRef(null);

  const run = (generatedSteps) => {
    setSteps(generatedSteps);
    setStepIndex(0);
  };

  useEffect(() => {
    if (stepIndex >= steps.length) return;

    timerRef.current = setTimeout(() => {
      const step = steps[stepIndex];

      if (step.type === "overflow") setMessage("Queue Full");
      else if (step.type === "underflow") setMessage("Queue Empty");
      else if (step.queue) {
        setQueue(step.queue);
        setActive(step.active || []);
        setMessage(step.type.toUpperCase());
      }

      setStepIndex((prev) => prev + 1);
    }, 600);

    return () => clearTimeout(timerRef.current);
  }, [stepIndex, steps]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Queue (FIFO)</h2>
      <p style={{ color: "#ff5722" }}>{message}</p>

      <div>
        <input
          type="number"
          placeholder="Value"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => run(getEnqueueSteps(queue, Number(input)))}>
          Enqueue
        </button>
        <button onClick={() => run(getDequeueSteps(queue))}>
          Dequeue
        </button>
        <button onClick={() => run(getPeekSteps(queue))}>
          Peek
        </button>
      </div>

      <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
        {queue.map((value, index) => (
          <QueueNode
            key={index}
            value={value}
            isActive={active.includes(index)}
            label={
              index === 0
                ? "Front"
                : index === queue.length - 1
                ? "Rear"
                : ""
            }
          />
        ))}
      </div>
    </div>
  );
}

export default QueueVisualizer;
