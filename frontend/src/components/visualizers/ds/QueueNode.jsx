function QueueNode({ value, isActive, label }) {
  return (
    <div style={{ textAlign: "center" }}>
      <div
        style={{
          width: "70px",
          height: "40px",
          border: "2px solid",
          borderColor: isActive ? "#ff5722" : "#2196f3",
          background: isActive ? "#ffe0b2" : "#e3f2fd",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "6px",
          fontWeight: "bold",
        }}
      >
        {value ?? ""}
      </div>
      {label && <small>{label}</small>}
    </div>
  );
}

export default QueueNode;
