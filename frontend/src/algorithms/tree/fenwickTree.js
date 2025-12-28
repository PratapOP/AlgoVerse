export const buildFenwickTree = (arr) => {
  const tree = new Array(arr.length + 1).fill(0);
  const steps = [];

  for (let i = 0; i < arr.length; i++) {
    let idx = i + 1;
    while (idx < tree.length) {
      tree[idx] += arr[i];
      steps.push({
        type: "update",
        index: idx,
        value: tree[idx],
      });
      idx += idx & -idx;
    }
  }

  steps.push({ type: "done" });
  return { tree, steps };
};

export const prefixSumSteps = (tree, index) => {
  const steps = [];
  let sum = 0;

  while (index > 0) {
    sum += tree[index];
    steps.push({
      type: "read",
      index,
      sum,
    });
    index -= index & -index;
  }

  steps.push({ type: "done", sum });
  return steps;
};
