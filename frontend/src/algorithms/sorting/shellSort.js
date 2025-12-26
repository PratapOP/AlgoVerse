export function getShellSortSteps(array) {
  const steps = [];
  const arr = [...array];
  const n = arr.length;

  for (let gap = Math.floor(n / 2); gap > 0; gap = Math.floor(gap / 2)) {
    for (let i = gap; i < n; i++) {
      let temp = arr[i];
      let j = i;

      while (j >= gap && arr[j - gap] > temp) {
        steps.push({
          type: "compare",
          indices: [j - gap, j],
          array: [...arr],
        });

        arr[j] = arr[j - gap];
        steps.push({
          type: "swap",
          indices: [j - gap, j],
          array: [...arr],
        });

        j -= gap;
      }

      arr[j] = temp;
    }
  }

  steps.push({ type: "done", indices: [], array: [...arr] });
  return steps;
}
