export const primSteps = (nodes, edges, startId) => {
  const visited = new Set();
  const steps = [];

  visited.add(startId);
  steps.push({
    type: "start",
    node: startId,
  });

  while (visited.size < nodes.length) {
    let minEdge = null;
    let minWeight = Infinity;

    for (const edge of edges) {
      const u = edge.from.id;
      const v = edge.to.id;

      const oneVisited =
        (visited.has(u) && !visited.has(v)) ||
        (visited.has(v) && !visited.has(u));

      if (oneVisited && edge.weight < minWeight) {
        minWeight = edge.weight;
        minEdge = edge;
      }
    }

    if (!minEdge) break;

    const newNode = visited.has(minEdge.from.id)
      ? minEdge.to.id
      : minEdge.from.id;

    visited.add(newNode);

    steps.push({
      type: "edge",
      from: minEdge.from.id,
      to: minEdge.to.id,
      weight: minEdge.weight,
    });

    steps.push({
      type: "visit",
      node: newNode,
    });
  }

  steps.push({ type: "done" });
  return steps;
};
