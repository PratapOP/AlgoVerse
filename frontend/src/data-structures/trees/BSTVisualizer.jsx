import { useState } from "react";
import { BinarySearchTree } from "./treeLogic";

function BSTVisualizer() {
  const [bst] = useState(new BinarySearchTree());
  const [, forceUpdate] = useState(0);
  const [value, setValue] = useState("");
  const [traversal, setTraversal] = useState([]);

  const insertNode = () => {
    if (!value) return;
    bst.insert(Number(value));
    setValue("");
    forceUpdate((x) => x + 1);
  };

  const runTraversal = (type) => {
    switch (type) {
      case "inorder":
        setTraversal(bst.inorder());
        break;
      case "preorder":
        setTraversal(bst.preorder());
        break;
      case "postorder":
        setTraversal(bst.postorder());
        break;
      case "level":
        setTraversal(bst.levelOrder());
        break;
      default:
        setTraversal([]);
    }
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Binary Search Tree (BST)</h2>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Value"
        type="number"
      />
      <button onClick={insertNode}>Insert</button>

      <div style={{ marginTop: "1rem" }}>
        <button onClick={() => runTraversal("inorder")}>Inorder</button>
        <button onClick={() => runTraversal("preorder")}>Preorder</button>
        <button onClick={() => runTraversal("postorder")}>Postorder</button>
        <button onClick={() => runTraversal("level")}>Level Order</button>
      </div>

      <div style={{ marginTop: "1rem" }}>
        <strong>Traversal Output:</strong>
        <div style={{ marginTop: "0.5rem" }}>
          {traversal.map((v, i) => (
            <span key={i} style={{ marginRight: "8px" }}>
              {v}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

export default BSTVisualizer;
