export function getBFSSteps(grid, start, end) {
  const steps = [];
  const queue = [];
  const visited = new Set();
  const parent = new Map();

  const key = (r, c) => `${r},${c}`;

  queue.push(start);
  visited.add(key(start.row, start.col));

  steps.push({
    type: "start",
    node: start,
  });

  const directions = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  while (queue.length > 0) {
    const current = queue.shift();

    steps.push({
      type: "visit",
      node: current,
    });

    if (
      current.row === end.row &&
      current.col === end.col
    ) {
      // Reconstruct path
      let curKey = key(end.row, end.col);
      while (parent.has(curKey)) {
        const p = parent.get(curKey);
        steps.push({
          type: "path",
          node: p,
        });
        curKey = key(p.row, p.col);
      }

      steps.push({ type: "done" });
      return steps;
    }

    for (const [dr, dc] of directions) {
      const nr = current.row + dr;
      const nc = current.col + dc;

      if (
        nr < 0 ||
        nc < 0 ||
        nr >= grid.length ||
        nc >= grid[0].length
      )
        continue;

      const cell = grid[nr][nc];
      const k = key(nr, nc);

      if (cell.isWall || visited.has(k)) continue;

      visited.add(k);
      parent.set(k, current);
      queue.push({ row: nr, col: nc });

      steps.push({
        type: "enqueue",
        node: { row: nr, col: nc },
      });
    }
  }

  steps.push({ type: "not-found" });
  return steps;
}
