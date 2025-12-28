// ListNode.jsx
import "./linkedlist.css";

function ListNode({ value, isHead, isActive }) {
  return (
    <div className="ll-node-wrapper">
      <div
        className={`ll-node 
          ${isHead ? "head" : ""} 
          ${isActive ? "active" : ""}`}
      >
        {value}
      </div>
      <div className="ll-arrow">→</div>
    </div>
  );
}

export default ListNode;
