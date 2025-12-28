import { useState } from "react";
import TreeNode from "./TreeNode";
import "./tree.css";

const treeData = {
  value: 1,
  left: {
    value: 2,
    left: { value: 4 },
    right: { value: 5 },
  },
  right: {
    value: 3,
    left: { value: 6 },
    right: { value: 7 },
  },
};

function BinaryTreeVisualizer() {
  const [active, setActive] = useState(null);

  const traverse = (type) => {
    const order = [];

    const dfs = (node) => {
      if (!node) return;
      if (type === "pre") order.push(node.value);
      dfs(node.left);
      if (type === "in") order.push(node.value);
      dfs(node.right);
      if (type === "post") order.push(node.value);
    };

    dfs(treeData);
    animate(order);
  };

  const animate = (order) => {
    order.forEach((val, i) => {
      setTimeout(() => setActive(val), i * 700);
    });
  };

  return (
    <div className="tree-container">
      <h2>Binary Tree Traversals</h2>

      <div className="tree-controls">
        <button onClick={() => traverse("pre")}>Preorder</button>
        <button onClick={() => traverse("in")}>Inorder</button>
        <button onClick={() => traverse("post")}>Postorder</button>
      </div>

      <TreeNode node={treeData} active={active} />
    </div>
  );
}

export default BinaryTreeVisualizer;
