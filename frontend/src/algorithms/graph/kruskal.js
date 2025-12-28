export const kruskalSteps = (nodes, edges) => {
  const parent = {};
  const steps = [];

  const find = (x) =>
    parent[x] === x ? x : (parent[x] = find(parent[x]));

  const union = (a, b) => {
    parent[find(a)] = find(b);
  };

  nodes.forEach((n) => (parent[n.id] = n.id));

  edges
    .map((e, i) => ({ ...e, index: i }))
    .sort((a, b) => a.weight - b.weight)
    .forEach((e) => {
      if (find(e.from.id) !== find(e.to.id)) {
        union(e.from.id, e.to.id);
        steps.push({ edge: e.index });
      }
    });

  return steps;
};
