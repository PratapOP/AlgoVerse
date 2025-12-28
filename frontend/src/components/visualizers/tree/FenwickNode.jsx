function FenwickNode({ index, value, active }) {
  return (
    <div className={`fenwick-node ${active ? "active" : ""}`}>
      <div>i = {index}</div>
      <strong>{value}</strong>
    </div>
  );
}

export default FenwickNode;
