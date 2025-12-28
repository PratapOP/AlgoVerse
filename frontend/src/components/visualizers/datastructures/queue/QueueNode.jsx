// QueueNode.jsx
import "./queue.css";

function QueueNode({ value, isFront, isRear, isActive }) {
  return (
    <div
      className={`queue-node
        ${isFront ? "front" : ""}
        ${isRear ? "rear" : ""}
        ${isActive ? "active" : ""}
      `}
    >
      {value}
    </div>
  );
}

export default QueueNode;
