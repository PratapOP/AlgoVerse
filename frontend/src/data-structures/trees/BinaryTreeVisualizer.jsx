import { useState } from "react";
import { BinarySearchTree } from "./treeLogic";

function TreeNodeView({ value }) {
  return (
    <div
      style={{
        padding: "8px 12px",
        borderRadius: "50%",
        background: "#6c5ce7",
        color: "#fff",
        textAlign: "center",
        minWidth: "30px",
      }}
    >
      {value}
    </div>
  );
}

function renderTree(node) {
  if (!node) return null;

  return (
    <div style={{ textAlign: "center" }}>
      <TreeNodeView value={node.value} />
      <div style={{ display: "flex", justifyContent: "center", gap: "2rem" }}>
        {renderTree(node.left)}
        {renderTree(node.right)}
      </div>
    </div>
  );
}

function BinaryTreeVisualizer() {
  const [bst] = useState(new BinarySearchTree());
  const [, forceUpdate] = useState(0);
  const [value, setValue] = useState("");

  const insertNode = () => {
    if (!value) return;
    bst.insert(Number(value));
    setValue("");
    forceUpdate((x) => x + 1);
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Binary Tree Structure</h2>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Value"
        type="number"
      />
      <button onClick={insertNode}>Insert</button>

      <div style={{ marginTop: "2rem" }}>{renderTree(bst.root)}</div>
    </div>
  );
}

export default BinaryTreeVisualizer;
