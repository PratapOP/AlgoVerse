// DoublyListNode.jsx
import "./doublylinkedlist.css";

function DoublyListNode({ value, isHead, isTail, isActive }) {
  return (
    <div className="dll-node-wrapper">
      <div className="dll-arrow left">←</div>

      <div
        className={`dll-node 
          ${isHead ? "head" : ""} 
          ${isTail ? "tail" : ""} 
          ${isActive ? "active" : ""}`}
      >
        {value}
      </div>

      <div className="dll-arrow right">→</div>
    </div>
  );
}

export default DoublyListNode;
