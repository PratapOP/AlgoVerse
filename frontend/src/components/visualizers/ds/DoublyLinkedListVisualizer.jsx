import { useEffect, useRef, useState } from "react";
import DoublyLinkedListNode from "./DoublyLinkedListNode";
import {
  insertHead,
  insertTail,
  deleteValue,
  forwardTraversal,
  backwardTraversal,
} from "../../../algorithms/ds/doublyLinkedList";

function DoublyLinkedListVisualizer() {
  const [list, setList] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [active, setActive] = useState([]);
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
      if (step.list) setList(step.list);
      if (step.active) setActive(step.active);
      setStepIndex((prev) => prev + 1);
    }, 600);

    return () => clearTimeout(timerRef.current);
  }, [stepIndex, steps]);

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Doubly Linked List</h2>

      <div style={{ marginBottom: "1rem" }}>
        <input
          type="number"
          placeholder="Value"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button onClick={() => run(insertHead(list, Number(input)))}>
          Insert Head
        </button>
        <button onClick={() => run(insertTail(list, Number(input)))}>
          Insert Tail
        </button>
        <button onClick={() => run(deleteValue(list, Number(input)))}>
          Delete
        </button>
        <button onClick={() => run(forwardTraversal(list))}>
          Traverse →
        </button>
        <button onClick={() => run(backwardTraversal(list))}>
          Traverse ←
        </button>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
        {list.map((node, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <span style={{ marginRight: "6px" }}>
              {node.prev !== null ? "←" : ""}
            </span>
            <DoublyLinkedListNode
              value={node.value}
              isActive={active.includes(index)}
            />
            <span style={{ marginLeft: "6px" }}>
              {node.next !== null ? "→" : ""}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DoublyLinkedListVisualizer;
