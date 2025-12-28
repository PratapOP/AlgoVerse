export const buildSegmentTreeSteps = (arr) => {
  const steps = [];
  const tree = [];

  const build = (node, start, end) => {
    if (start === end) {
      tree[node] = arr[start];
      steps.push({
        type: "leaf",
        node,
        range: [start, end],
        value: tree[node],
      });
      return tree[node];
    }

    const mid = Math.floor((start + end) / 2);
    const left = build(2 * node + 1, start, mid);
    const right = build(2 * node + 2, mid + 1, end);

    tree[node] = left + right;
    steps.push({
      type: "merge",
      node,
      range: [start, end],
      value: tree[node],
    });

    return tree[node];
  };

  build(0, 0, arr.length - 1);
  steps.push({ type: "done", tree: [...tree] });

  return steps;
};

export const rangeQuerySteps = (tree, n, l, r) => {
  const steps = [];

  const query = (node, start, end) => {
    steps.push({ type: "visit", node, range: [start, end] });

    if (r < start || end < l) {
      return 0;
    }

    if (l <= start && end <= r) {
      steps.push({ type: "use", node, value: tree[node] });
      return tree[node];
    }

    const mid = Math.floor((start + end) / 2);
    return (
      query(2 * node + 1, start, mid) +
      query(2 * node + 2, mid + 1, end)
    );
  };

  query(0, 0, n - 1);
  steps.push({ type: "done" });

  return steps;
};
