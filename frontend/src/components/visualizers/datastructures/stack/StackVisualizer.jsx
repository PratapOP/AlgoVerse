// StackVisualizer.jsx
import { useState } from "react";
import StackNode from "./StackNode";
import "./stack.css";

function StackVisualizer() {
  /* ---------------- STATE ---------------- */
  const [stack, setStack] = useState([10, 20, 30]);
  const [input, setInput] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [message, setMessage] = useState("");
  const [mode, setMode] = useState("array"); // array | linkedlist

  /* ---------------- OPERATIONS ---------------- */

  const push = () => {
    if (!input) return;
    setMessage(`Pushing ${input} onto stack`);
    setActiveIndex(stack.length);
    setStack([...stack, Number(input)]);
    setInput("");
  };

  const pop = () => {
    if (stack.length === 0) {
      setMessage("Stack Underflow");
      return;
    }
    setMessage(`Popping top element`);
    setActiveIndex(stack.length - 1);
    setTimeout(() => {
      setStack(stack.slice(0, -1));
      setActiveIndex(null);
    }, 400);
  };

  const peek = () => {
    if (stack.length === 0) {
      setMessage("Stack is empty");
      return;
    }
    setMessage(`Top element is ${stack[stack.length - 1]}`);
    setActiveIndex(stack.length - 1);
    setTimeout(() => setActiveIndex(null), 500);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="stack-container">
      <h2>Stack Visualizer</h2>

      <p className="stack-subtitle">
        Mode: <b>{mode === "array" ? "Array Stack" : "Linked List Stack"}</b>
      </p>

      <p className="stack-message">{message}</p>

      <div className="stack-controls">
        <input
          type="number"
          placeholder="Value"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={push}>Push</button>
        <button onClick={pop}>Pop</button>
        <button onClick={peek}>Peek</button>

        <button
          className="mode-toggle"
          onClick={() =>
            setMode(mode === "array" ? "linkedlist" : "array")
          }
        >
          Switch to {mode === "array" ? "Linked List" : "Array"}
        </button>
      </div>

      <div className={`stack-visual ${mode}`}>
        {stack.map((value, index) => (
          <StackNode
            key={index}
            value={value}
            isTop={index === stack.length - 1}
            isActive={index === activeIndex}
          />
        ))}
        <div className="stack-base">BOTTOM</div>
      </div>
    </div>
  );
}

export default StackVisualizer;
