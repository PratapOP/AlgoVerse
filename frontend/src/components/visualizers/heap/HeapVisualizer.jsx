function HeapArray({ heap, active }) {
  return (
    <div className="heap-array">
      {heap.map((v, i) => (
        <div
          key={i}
          className={`heap-cell ${active.includes(i) ? "active" : ""}`}
        >
          {v}
        </div>
      ))}
    </div>
  );
}

export default HeapArray;
