function LinkedListNode({ value, isActive }) {
  return (
    <div
      style={{
        padding: "10px 16px",
        borderRadius: "8px",
        border: "2px solid",
        borderColor: isActive ? "#ff9800" : "#4caf50",
        background: isActive ? "#fff3e0" : "#e8f5e9",
        fontWeight: "bold",
        minWidth: "50px",
        textAlign: "center",
      }}
    >
      {value}
    </div>
  );
}

export default LinkedListNode;
