export function getAStarSteps(grid, start, end) {
  const steps = [];

  const gridCopy = grid.map(row =>
    row.map(cell => ({
      ...cell,
      g: Infinity,
      h: 0,
      f: Infinity,
      previous: null,
      isVisited: false,
    }))
  );

  const startNode = gridCopy[start.row][start.col];
  const endNode = gridCopy[end.row][end.col];

  startNode.g = 0;
  startNode.h = heuristic(startNode, endNode);
  startNode.f = startNode.h;

  const openSet = [startNode];

  while (openSet.length) {
    openSet.sort((a, b) => a.f - b.f);
    const current = openSet.shift();

    if (current.isWall) continue;

    current.isVisited = true;
    steps.push({ type: "visit", node: current });

    if (current.row === endNode.row && current.col === endNode.col) {
      break;
    }

    const neighbors = getNeighbors(gridCopy, current);
    for (const neighbor of neighbors) {
      const tentativeG = current.g + neighbor.weight;

      if (tentativeG < neighbor.g) {
        neighbor.previous = current;
        neighbor.g = tentativeG;
        neighbor.h = heuristic(neighbor, endNode);
        neighbor.f = neighbor.g + neighbor.h;

        if (!openSet.includes(neighbor)) {
          openSet.push(neighbor);
        }

        steps.push({
          type: "relax",
          node: neighbor,
          from: current,
        });
      }
    }
  }

  // Build final path
  let curr = endNode;
  while (curr) {
    steps.push({ type: "path", node: curr });
    curr = curr.previous;
  }

  return steps;
}

function heuristic(a, b) {
  return Math.abs(a.row - b.row) + Math.abs(a.col - b.col);
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
