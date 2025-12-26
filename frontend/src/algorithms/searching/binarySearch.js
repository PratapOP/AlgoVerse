export function getBinarySearchSteps(array, target) {
  const steps = [];
  const arr = [...array].sort((a, b) => a - b);

  let left = 0;
  let right = arr.length - 1;

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    steps.push({
      type: "compare",
      indices: [mid],
      array: [...arr],
    });

    if (arr[mid] === target) {
      steps.push({
        type: "found",
        indices: [mid],
        array: [...arr],
      });
      return steps;
    }

    if (arr[mid] < target) left = mid + 1;
    else right = mid - 1;
  }

  steps.push({
    type: "not-found",
    indices: [],
    array: [...arr],
  });

  return steps;
}
