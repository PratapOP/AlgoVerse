import { useEffect, useRef, useState } from "react";
import QueueNode from "./QueueNode";
import {
  getCQEnqueueSteps,
  getCQDequeueSteps,
} from "../../../algorithms/ds/circularQueue";

const CAPACITY = 6;

function CircularQueueVisualizer() {
  const [state, setState] = useState({
    queue: Array(CAPACITY).fill(null),
    front: -1,
    rear: -1,
    size: 0,
    capacity: CAPACITY,
  });

  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [active, setActive] = useState([]);
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");

  const timerRef = useRef(null);

  const run = (generatedSteps) => {
    setSteps(generatedSteps);
    setStepIndex(0);
  };

  useEffect(() => {
    if (stepIndex >= steps.length) return;

    timerRef.current = setTimeout(() => {
      const step = steps[stepIndex];

      if (step.type === "full") setMessage("Circular Queue Full");
      else if (step.type === "empty") setMessage("Circular Queue Empty");
      else if (step.state) {
        setState(step.state);
        setActive(step.active || []);
        setMessage(step.type.toUpperCase());
      }

      setStepIndex((prev) => prev + 1);
    }, 600);

    return () => clearTimeout(timerRef.current);
  }, [stepIndex, steps]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Circular Queue</h2>
      <p style={{ color: "#ff5722" }}>{message}</p>

      <input
        type="number"
        placeholder="Value"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button onClick={() => run(getCQEnqueueSteps(state, Number(input)))}>
        Enqueue
      </button>
      <button onClick={() => run(getCQDequeueSteps(state))}>
        Dequeue
      </button>

      <div style={{ display: "flex", gap: "10px", marginTop: "1rem" }}>
        {state.queue.map((value, index) => (
          <QueueNode
            key={index}
            value={value}
            isActive={active.includes(index)}
            label={
              index === state.front
                ? "Front"
                : index === state.rear
                ? "Rear"
                : ""
            }
          />
        ))}
      </div>
    </div>
  );
}

export default CircularQueueVisualizer;
