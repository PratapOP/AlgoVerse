import { useEffect, useRef, useState } from "react";
import LinkedListNode from "./LinkedListNode";
import {
  getInsertHeadSteps,
  getInsertTailSteps,
  getDeleteSteps,
  getReverseSteps,
} from "../../../algorithms/ds/linkedList";

function LinkedListVisualizer() {
  const [list, setList] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [active, setActive] = useState([]);
  const [input, setInput] = useState("");

  const timerRef = useRef(null);

  const runSteps = (generatedSteps) => {
    setSteps(generatedSteps);
    setStepIndex(0);
  };

  useEffect(() => {
    if (stepIndex >= steps.length) return;

    timerRef.current = setTimeout(() => {
      const step = steps[stepIndex];
      if (step.list) setList(step.list);
      if (step.active) setActive(step.active);

      setStepIndex((prev) => prev + 1);
    }, 600);

    return () => clearTimeout(timerRef.current);
  }, [stepIndex, steps]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Singly Linked List</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="number"
          placeholder="Value"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => runSteps(getInsertHeadSteps(list, Number(input)))}>
          Insert Head
        </button>
        <button onClick={() => runSteps(getInsertTailSteps(list, Number(input)))}>
          Insert Tail
        </button>
        <button onClick={() => runSteps(getDeleteSteps(list, Number(input)))}>
          Delete
        </button>
        <button onClick={() => runSteps(getReverseSteps(list))}>
          Reverse
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {list.map((node, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <LinkedListNode
              value={node.value}
              isActive={active.includes(index)}
            />
            {node.next !== null && <span style={{ margin: "0 8px" }}>→</span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LinkedListVisualizer;
