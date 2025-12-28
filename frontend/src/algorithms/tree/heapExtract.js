/**
 * Generates animation steps for heap extract operation
 * Works for both Min Heap and Max Heap
 */

export function getHeapExtractSteps(heap, type = "min") {
  const steps = [];
  const arr = [...heap];

  if (arr.length === 0) return steps;

  // Step 1: Highlight root
  steps.push({
    type: "highlight-root",
    index: 0,
    heap: [...arr],
  });

  // Step 2: Swap root with last
  const lastIndex = arr.length - 1;
  [arr[0], arr[lastIndex]] = [arr[lastIndex], arr[0]];

  steps.push({
    type: "swap-root-last",
    indices: [0, lastIndex],
    heap: [...arr],
  });

  // Step 3: Remove last (extracted element)
  arr.pop();

  steps.push({
    type: "remove",
    heap: [...arr],
  });

  // Step 4: Heapify down
  let i = 0;

  while (true) {
    let target = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (
      left < arr.length &&
      (type === "min" ? arr[left] < arr[target] : arr[left] > arr[target])
    ) {
      target = left;
    }

    if (
      right < arr.length &&
      (type === "min" ? arr[right] < arr[target] : arr[right] > arr[target])
    ) {
      target = right;
    }

    if (target === i) break;

    [arr[i], arr[target]] = [arr[target], arr[i]];

    steps.push({
      type: "heapify",
      indices: [i, target],
      heap: [...arr],
    });

    i = target;
  }

  steps.push({
    type: "done",
    heap: [...arr],
  });

  return steps;
}
