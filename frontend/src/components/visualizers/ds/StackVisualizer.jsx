import { useEffect, useRef, useState } from "react";
import StackNode from "./StackNode";
import {
  getStackPushSteps,
  getStackPopSteps,
  getStackPeekSteps,
} from "../../../algorithms/ds/stack";

function StackVisualizer() {
  const [stack, setStack] = useState([]);
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

      if (step.type === "overflow") {
        setMessage("Stack Overflow!");
      } else if (step.type === "underflow") {
        setMessage("Stack Underflow!");
      } else if (step.type === "peek") {
        setMessage("Top element highlighted");
      } else if (step.stack) {
        setStack(step.stack);
        setActive(step.active || []);
        setMessage(step.type.toUpperCase());
      }

      setStepIndex((prev) => prev + 1);
    }, 600);

    return () => clearTimeout(timerRef.current);
  }, [stepIndex, steps]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Stack (LIFO)</h2>

      <p style={{ color: "#ff5722" }}>{message}</p>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="number"
          placeholder="Value"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => run(getStackPushSteps(stack, Number(input)))}>
          Push
        </button>
        <button onClick={() => run(getStackPopSteps(stack))}>
          Pop
        </button>
        <button onClick={() => run(getStackPeekSteps(stack))}>
          Peek
        </button>
      </div>

      <div
        style={{
          display: "flex",
          flexDirection: "column-reverse",
          alignItems: "center",
          gap: "6px",
          marginTop: "1rem",
        }}
      >
        {stack.map((value, index) => (
          <StackNode
            key={index}
            value={value}
            isActive={active.includes(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default StackVisualizer;
