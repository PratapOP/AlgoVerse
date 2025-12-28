function DoublyLinkedListNode({ value, isActive }) {
  return (
    <div
      style={{
        padding: "10px 16px",
        borderRadius: "8px",
        border: "2px solid",
        borderColor: isActive ? "#ff5722" : "#3f51b5",
        background: isActive ? "#ffe0b2" : "#e8eaf6",
        fontWeight: "bold",
        minWidth: "50px",
        textAlign: "center",
      }}
    >
      {value}
    </div>
  );
}

export default DoublyLinkedListNode;
