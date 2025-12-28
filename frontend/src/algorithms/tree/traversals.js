export const inorderSteps = (root) => {
  const steps = [];

  const dfs = (node) => {
    if (!node) return;
    steps.push({ type: "enter", value: node.value });
    dfs(node.left);
    steps.push({ type: "visit", value: node.value });
    dfs(node.right);
    steps.push({ type: "exit", value: node.value });
  };

  dfs(root);
  return steps;
};

export const preorderSteps = (root) => {
  const steps = [];

  const dfs = (node) => {
    if (!node) return;
    steps.push({ type: "enter", value: node.value });
    steps.push({ type: "visit", value: node.value });
    dfs(node.left);
    dfs(node.right);
    steps.push({ type: "exit", value: node.value });
  };

  dfs(root);
  return steps;
};

export const postorderSteps = (root) => {
  const steps = [];

  const dfs = (node) => {
    if (!node) return;
    steps.push({ type: "enter", value: node.value });
    dfs(node.left);
    dfs(node.right);
    steps.push({ type: "visit", value: node.value });
    steps.push({ type: "exit", value: node.value });
  };

  dfs(root);
  return steps;
};
