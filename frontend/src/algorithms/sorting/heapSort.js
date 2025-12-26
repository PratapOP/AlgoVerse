export function getHeapSortSteps(array) {
  const steps = [];
  const arr = [...array];
  const n = arr.length;

  function heapify(size, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < size) {
      steps.push({
        type: "compare",
        indices: [left, largest],
        array: [...arr],
      });

      if (arr[left] > arr[largest]) largest = left;
    }

    if (right < size) {
      steps.push({
        type: "compare",
        indices: [right, largest],
        array: [...arr],
      });

      if (arr[right] > arr[largest]) largest = right;
    }

    if (largest !== i) {
      [arr[i], arr[largest]] = [arr[largest], arr[i]];

      steps.push({
        type: "swap",
        indices: [i, largest],
        array: [...arr],
      });

      heapify(size, largest);
    }
  }

  // Build heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    heapify(n, i);
  }

  // Extract elements
  for (let i = n - 1; i > 0; i--) {
    [arr[0], arr[i]] = [arr[i], arr[0]];

    steps.push({
      type: "swap",
      indices: [0, i],
      array: [...arr],
    });

    heapify(i, 0);
  }

  steps.push({
    type: "done",
    indices: [],
    array: [...arr],
  });

  return steps;
}
