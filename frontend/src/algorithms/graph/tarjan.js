export const tarjanSteps = (graph) => {
  let index = 0;
  const stack = [];
  const indices = {};
  const lowLink = {};
  const onStack = {};
  const steps = [];

  const dfs = (u) => {
    indices[u] = index;
    lowLink[u] = index;
    index++;

    stack.push(u);
    onStack[u] = true;

    steps.push({
      type: "visit",
      node: u,
      index: indices[u],
      lowLink: lowLink[u],
      stack: [...stack],
    });

    for (const v of graph[u]) {
      if (indices[v] === undefined) {
        dfs(v);
        lowLink[u] = Math.min(lowLink[u], lowLink[v]);
      } else if (onStack[v]) {
        lowLink[u] = Math.min(lowLink[u], indices[v]);
      }
    }

    // Root of SCC
    if (lowLink[u] === indices[u]) {
      const component = [];
      let w = null;

      do {
        w = stack.pop();
        onStack[w] = false;
        component.push(w);
      } while (w !== u);

      steps.push({
        type: "scc",
        component,
      });
    }
  };

  Object.keys(graph).forEach((node) => {
    if (indices[node] === undefined) {
      dfs(node);
    }
  });

  steps.push({ type: "done" });
  return steps;
};
