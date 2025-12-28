export const kosarajuSteps = (graph) => {
  const visited = new Set();
  const stack = [];
  const steps = [];

  const dfs1 = (u) => {
    visited.add(u);
    graph[u].forEach((v) => !visited.has(v) && dfs1(v));
    stack.push(u);
  };

  Object.keys(graph).forEach((u) => !visited.has(u) && dfs1(u));

  const reversed = {};
  Object.keys(graph).forEach((u) => {
    reversed[u] = [];
  });
  Object.keys(graph).forEach((u) =>
    graph[u].forEach((v) => reversed[v].push(u))
  );

  visited.clear();

  const dfs2 = (u, comp) => {
    visited.add(u);
    steps.push({ node: u, component: comp });
    reversed[u].forEach((v) => !visited.has(v) && dfs2(v, comp));
  };

  let comp = 0;
  while (stack.length) {
    const u = stack.pop();
    if (!visited.has(u)) dfs2(u, comp++);
  }

  return steps;
};
