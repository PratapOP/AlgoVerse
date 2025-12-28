import { useEffect, useRef, useState } from "react";

import TreeCanvas from "./TreeCanvas";
import CallStack from "./CallStack";

import { buildSampleTree } from "../../../algorithms/tree/binaryTree";
import {
  inorderSteps,
  preorderSteps,
  postorderSteps,
} from "../../../algorithms/tree/traversals";

function TreeVisualizer() {
  const root = buildSampleTree();

  const [traversal, setTraversal] = useState("inorder");
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [activeValue, setActiveValue] = useState(null);
  const [callStack, setCallStack] = useState([]);
  const [speed, setSpeed] = useState(700);

  const timerRef = useRef(null);

  /* ---------- Load traversal steps ---------- */
  useEffect(() => {
    pause();

    let generatedSteps = [];
    if (traversal === "preorder") generatedSteps = preorderSteps(root);
    else if (traversal === "postorder") generatedSteps = postorderSteps(root);
    else generatedSteps = inorderSteps(root);

    setSteps(generatedSteps);
    setStepIndex(0);
    setActiveValue(null);
    setCallStack([]);
  }, [traversal]);

  /* ---------- Controls ---------- */
  const play = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setStepIndex((i) => {
        if (i >= steps.length) {
          pause();
          return i;
        }

        const step = steps[i];

        if (step.type === "enter") {
          setCallStack((prev) => [...prev, step.value]);
          setActiveValue(step.value);
        }

        if (step.type === "visit") {
          setActiveValue(step.value);
        }

        if (step.type === "exit") {
          setCallStack((prev) => prev.slice(0, -1));
          setActiveValue(null);
        }

        return i + 1;
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
    setStepIndex(0);
    setActiveValue(null);
    setCallStack([]);
  };

  return (
    <div style={{ padding: "1.5rem", display: "flex", gap: "2rem" }}>
      {/* LEFT: TREE */}
      <div style={{ flex: 3 }}>
        <h2>Binary Tree Traversal</h2>

        <select
          value={traversal}
          onChange={(e) => setTraversal(e.target.value)}
        >
          <option value="inorder">Inorder (L → Root → R)</option>
          <option value="preorder">Preorder (Root → L → R)</option>
          <option value="postorder">Postorder (L → R → Root)</option>
        </select>

        <div style={{ marginTop: "1rem" }}>
          <button onClick={play}>Play</button>
          <button onClick={pause} style={{ marginLeft: "0.5rem" }}>
            Pause
          </button>
          <button onClick={reset} style={{ marginLeft: "0.5rem" }}>
            Reset
          </button>
        </div>

        <div style={{ marginTop: "1rem" }}>
          <label>Speed</label>
          <input
            type="range"
            min="300"
            max="1200"
            step="100"
            value={speed}
            onChange={(e) => setSpeed(Number(e.target.value))}
          />
        </div>

        <TreeCanvas root={root} activeValue={activeValue} />
      </div>

      {/* RIGHT: CALL STACK */}
      <CallStack stack={callStack} />
    </div>
  );
}

export default TreeVisualizer;
