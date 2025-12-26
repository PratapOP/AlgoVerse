// Each step represents one comparison or swap
export function getBubbleSortSteps(array) {
  const steps = [];
  const arr = [...array];
  const n = arr.length;

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      // Comparison step
      steps.push({
        type: "compare",
        indices: [j, j + 1],
        array: [...arr],
      });

      if (arr[j] > arr[j + 1]) {
        // Swap
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        steps.push({
          type: "swap",
          indices: [j, j + 1],
          array: [...arr],
        });
      }
    }
  }

  // Final sorted state
  steps.push({
    type: "done",
    indices: [],
    array: [...arr],
  });

  return steps;
}
