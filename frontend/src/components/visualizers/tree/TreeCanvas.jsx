import TreeNode from "./TreeNode";
import "./tree.css";

function TreeCanvas({ root, activeValue }) {
  if (!root) return null;

  const renderNode = (node) => {
    if (!node) return null;

    return (
      <div className="tree-branch">
        <TreeNode
          value={node.value}
          active={node.value === activeValue}
        />

        <div className="tree-children">
          {node.left && renderNode(node.left)}
          {node.right && renderNode(node.right)}
        </div>
      </div>
    );
  };

  return <div className="tree-container">{renderNode(root)}</div>;
}

export default TreeCanvas;
