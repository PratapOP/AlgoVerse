// LinkedListVisualizer.jsx
import { useState } from "react";
import ListNode from "./ListNode";
import "./linkedlist.css";

function LinkedListVisualizer() {
  /* ---------------- STATE ---------------- */
  const [list, setList] = useState([10, 20, 30]);
  const [input, setInput] = useState("");
  const [activeIndex, setActiveIndex] = useState(null);
  const [message, setMessage] = useState("");

  /* ---------------- OPERATIONS ---------------- */

  // Insert at Head
  const insertHead = () => {
    if (!input) return;
    setMessage("Inserting at head");
    setActiveIndex(0);
    setList([Number(input), ...list]);
    setInput("");
  };

  // Insert at Tail
  const insertTail = () => {
    if (!input) return;
    setMessage("Inserting at tail");
    setActiveIndex(list.length);
    setList([...list, Number(input)]);
    setInput("");
  };

  // Delete Head
  const deleteHead = () => {
    if (list.length === 0) return;
    setMessage("Deleting head");
    setActiveIndex(0);
    setList(list.slice(1));
  };

  // Delete Tail
  const deleteTail = () => {
    if (list.length === 0) return;
    setMessage("Deleting tail");
    setActiveIndex(list.length - 1);
    setList(list.slice(0, -1));
  };

  // Reverse List (animated conceptually)
  const reverseList = () => {
    setMessage("Reversing linked list");
    setActiveIndex(null);
    setList([...list].reverse());
  };

  /* ---------------- UI ---------------- */
  return (
    <div className="ll-container">
      <h2>Singly Linked List Visualizer</h2>

      <p className="ll-message">{message}</p>

      <div className="ll-controls">
        <input
          type="number"
          value={input}
          placeholder="Value"
          onChange={(e) => setInput(e.target.value)}
        />

        <button onClick={insertHead}>Insert Head</button>
        <button onClick={insertTail}>Insert Tail</button>
        <button onClick={deleteHead}>Delete Head</button>
        <button onClick={deleteTail}>Delete Tail</button>
        <button onClick={reverseList}>Reverse</button>
      </div>

      <div className="ll-visual">
        {list.map((value, index) => (
          <ListNode
            key={index}
            value={value}
            isHead={index === 0}
            isActive={index === activeIndex}
          />
        ))}
        <span className="ll-null">NULL</span>
      </div>
    </div>
  );
}

export default LinkedListVisualizer;
