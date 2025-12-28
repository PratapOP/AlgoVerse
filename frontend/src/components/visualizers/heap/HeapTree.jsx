function HeapTree({ heap, active }) {
  return (
    <div className="heap-tree">
      {heap.map((value, index) => (
        <div
          key={index}
          className={`heap-node ${
            active.includes(index) ? "active" : ""
          }`}
        >
          {value}
        </div>
      ))}
    </div>
  );
}

export default HeapTree;
