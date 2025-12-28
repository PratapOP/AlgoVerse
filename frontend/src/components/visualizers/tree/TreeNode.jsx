import "./tree.css";

function TreeNode({ value, active }) {
  return (
    <div className={`tree-node ${active ? "active" : ""}`}>
      {value}
    </div>
  );
}

export default TreeNode;
