function StackNode({ value, isActive }) {
  return (
    <div
      style={{
        width: "80px",
        height: "40px",
        border: "2px solid",
        borderColor: isActive ? "#ff5722" : "#009688",
        background: isActive ? "#ffebee" : "#e0f2f1",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontWeight: "bold",
        borderRadius: "6px",
      }}
    >
      {value}
    </div>
  );
}

export default StackNode;
