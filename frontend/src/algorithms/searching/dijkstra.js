export function getDijkstraSteps(grid, start, end) {
  const steps = [];
  const nodes = [];

  // Clone grid
  const gridCopy = grid.map(row =>
    row.map(cell => ({
      ...cell,
      distance: Infinity,
      previous: null,
      isVisited: false,
    }))
  );

  const startNode = gridCopy[start.row][start.col];
  startNode.distance = 0;

  // Flatten nodes
  gridCopy.forEach(row => row.forEach(cell => nodes.push(cell)));

  while (nodes.length) {
    // Pick node with smallest distance
    nodes.sort((a, b) => a.distance - b.distance);
    const closest = nodes.shift();

    if (closest.isWall) continue;
    if (closest.distance === Infinity) break;

    closest.isVisited = true;
    steps.push({ type: "visit", node: closest });

    if (closest.isEnd) break;

    const neighbors = getNeighbors(gridCopy, closest);
    for (const neighbor of neighbors) {
      const alt = closest.distance + neighbor.weight;
      if (alt < neighbor.distance) {
        neighbor.distance = alt;
        neighbor.previous = closest;
        steps.push({
          type: "relax",
          node: neighbor,
          from: closest,
        });
      }
    }
  }

  // Build shortest path
  let current = gridCopy[end.row][end.col];
  while (current) {
    steps.push({ type: "path", node: current });
    current = current.previous;
  }

  return steps;
}

function getNeighbors(grid, node) {
  const dirs = [
    [0, 1],
    [1, 0],
    [0, -1],
    [-1, 0],
  ];

  const neighbors = [];
  for (const [dr, dc] of dirs) {
    const r = node.row + dr;
    const c = node.col + dc;
    if (
      r >= 0 &&
      r < grid.length &&
      c >= 0 &&
      c < grid[0].length
    ) {
      const cell = grid[r][c];
      if (!cell.isVisited && !cell.isWall) {
        neighbors.push(cell);
      }
    }
  }
  return neighbors;
}
