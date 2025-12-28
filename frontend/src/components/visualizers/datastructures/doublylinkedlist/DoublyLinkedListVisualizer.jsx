// DoublyLinkedListVisualizer.jsx
import { useState } from "react";
import DoublyListNode from "./DoublyListNode";
import "./doublylinkedlist.css";

function DoublyLinkedListVisualizer() {
  /* ---------------- STATE ---------------- */
  const [list, setList] = useState([10, 20, 30, 40]);
  const [input, setInput] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [message, setMessage] = useState("");

  /* ---------------- OPERATIONS ---------------- */

  const insertHead = () => {
    if (!input) return;
    setMessage("Inserting at head");
    setActiveIndex(0);
    setList([Number(input), ...list]);
    setInput("");
  };

  const insertTail = () => {
    if (!input) return;
    setMessage("Inserting at tail");
    setActiveIndex(list.length);
    setList([...list, Number(input)]);
    setInput("");
  };

  const deleteHead = () => {
    if (list.length === 0) return;
    setMessage("Deleting head");
    setActiveIndex(0);
    setList(list.slice(1));
  };

  const deleteTail = () => {
    if (list.length === 0) return;
    setMessage("Deleting tail");
    setActiveIndex(list.length - 1);
    setList(list.slice(0, -1));
  };

  // Traverse forward
  const traverseForward = () => {
    setMessage("Traversing forward (next pointers)");
    let i = 0;
    const interval = setInterval(() => {
      setActiveIndex(i);
      i++;
      if (i >= list.length) {
        clearInterval(interval);
        setActiveIndex(null);
      }
    }, 500);
  };

  // Traverse backward
  const traverseBackward = () => {
    setMessage("Traversing backward (prev pointers)");
    let i = list.length - 1;
    const interval = setInterval(() => {
      setActiveIndex(i);
      i--;
      if (i < 0) {
        clearInterval(interval);
        setActiveIndex(null);
      }
    }, 500);
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="dll-container">
      <h2>Doubly Linked List Visualizer</h2>

      <p className="dll-message">{message}</p>

      <div className="dll-controls">
        <input
          type="number"
          placeholder="Value"
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={insertHead}>Insert Head</button>
        <button onClick={insertTail}>Insert Tail</button>
        <button onClick={deleteHead}>Delete Head</button>
        <button onClick={deleteTail}>Delete Tail</button>
        <button onClick={traverseForward}>Traverse →</button>
        <button onClick={traverseBackward}>Traverse ←</button>
      </div>

      <div className="dll-visual">
        {list.map((value, index) => (
          <DoublyListNode
            key={index}
            value={value}
            isHead={index === 0}
            isTail={index === list.length - 1}
            isActive={index === activeIndex}
          />
        ))}
        <span className="dll-null">NULL</span>
      </div>
    </div>
  );
}

export default DoublyLinkedListVisualizer;
