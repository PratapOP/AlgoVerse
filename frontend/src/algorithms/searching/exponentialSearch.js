export function getExponentialSearchSteps(array, target) {
  const steps = [];
  const arr = [...array].sort((a, b) => a - b);
  const n = arr.length;

  // Init sorted array
  steps.push({
    type: "init",
    array: [...arr],
    indices: [],
  });

  if (arr[0] === target) {
    steps.push({ type: "found", indices: [0] });
    return steps;
  }

  let i = 1;
  while (i < n && arr[i] <= target) {
    steps.push({
      type: "compare",
      indices: [i],
    });
    i *= 2;
  }

  // Binary search in range [i/2, min(i, n-1)]
  let left = Math.floor(i / 2);
  let right = Math.min(i, n - 1);

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      type: "compare",
      indices: [mid],
    });

    if (arr[mid] === target) {
      steps.push({
        type: "found",
        indices: [mid],
      });
      return steps;
    }

    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  steps.push({ type: "not-found", indices: [] });
  return steps;
}
