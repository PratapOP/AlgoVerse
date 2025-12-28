// StackNode.jsx
import "./stack.css";

function StackNode({ value, isTop, isActive }) {
  return (
    <div
      className={`stack-node 
        ${isTop ? "top" : ""} 
        ${isActive ? "active" : ""}`}
    >
      {value}
    </div>
  );
}

export default StackNode;
