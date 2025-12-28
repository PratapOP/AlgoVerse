function SegmentTreeNode({ value, active }) {
  return (
    <div className={`segment-node ${active ? "active" : ""}`}>
      {value ?? ""}
    </div>
  );
}

export default SegmentTreeNode;
