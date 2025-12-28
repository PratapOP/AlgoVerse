/**
 * HeapNode.jsx
 * ----------------
 * Represents a single node in a Heap (Min / Max).
 * Used by HeapVisualizer.jsx to visually render heap elements.
 *
 * Responsibilities:
 * - Display the node value
 * - Highlight active node during heapify
 * - Visually differentiate root vs children
 */

function HeapNode({ value, index, isActive }) {
  return (
    <div
      className={`heap-node ${isActive ? "active" : ""} ${
        index === 0 ? "root" : ""
      }`}
    >
      {value}
    </div>
  );
}

export default HeapNode;
