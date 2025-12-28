export const edmondsKarp = (capacity, source, sink) => {
  const n = capacity.length;
  const flow = Array.from({ length: n }, () =>
    Array(n).fill(0)
  );
  const steps = [];

  while (true) {
    const parent = Array(n).fill(-1);
    parent[source] = source;
    const q = [source];

    while (q.length && parent[sink] === -1) {
      const u = q.shift();
      for (let v = 0; v < n; v++) {
        if (parent[v] === -1 && capacity[u][v] - flow[u][v] > 0) {
          parent[v] = u;
          q.push(v);
        }
      }
    }

    if (parent[sink] === -1) break;

    let aug = Infinity;
    for (let v = sink; v !== source; v = parent[v]) {
      aug = Math.min(
        aug,
        capacity[parent[v]][v] - flow[parent[v]][v]
      );
    }

    for (let v = sink; v !== source; v = parent[v]) {
      flow[parent[v]][v] += aug;
    }

    steps.push({ flow: JSON.parse(JSON.stringify(flow)) });
  }

  return steps;
};
