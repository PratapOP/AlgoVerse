function TreeNode({ node, active }) {
  if (!node) return null;

  return (
    <div className="tree-node">
      <div className={`circle ${active === node.value ? "active" : ""}`}>
        {node.value}
      </div>
      <div className="children">
        <TreeNode node={node.left} active={active} />
        <TreeNode node={node.right} active={active} />
      </div>
    </div>
  );
}

export default TreeNode;
