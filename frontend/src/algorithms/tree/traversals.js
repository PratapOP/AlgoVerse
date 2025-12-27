export const inorderTraversalSteps = (root) => {
  const steps = [];

  const dfs = (node) => {
    if (!node) return;
    dfs(node.left);
    steps.push({ type: "visit", value: node.value });
    dfs(node.right);
  };

  dfs(root);
  return steps;
};

export const preorderTraversalSteps = (root) => {
  const steps = [];

  const dfs = (node) => {
    if (!node) return;
    steps.push({ type: "visit", value: node.value });
    dfs(node.left);
    dfs(node.right);
  };

  dfs(root);
  return steps;
};

export const postorderTraversalSteps = (root) => {
  const steps = [];

  const dfs = (node) => {
    if (!node) return;
    dfs(node.left);
    dfs(node.right);
    steps.push({ type: "visit", value: node.value });
  };

  dfs(root);
  return steps;
};
