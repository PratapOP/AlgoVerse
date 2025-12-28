/**
 * Heap Insert animation steps
 * Supports Min Heap and Max Heap
 */

export function getHeapInsertSteps(heap, value, type = "min") {
  const steps = [];
  const arr = [...heap];

  // Step 1: Insert at end
  arr.push(value);
  let index = arr.length - 1;

  steps.push({
    type: "insert",
    index,
    heap: [...arr],
  });

  // Step 2: Bubble up
  while (index > 0) {
    const parent = Math.floor((index - 1) / 2);

    const shouldSwap =
      type === "min"
        ? arr[index] < arr[parent]
        : arr[index] > arr[parent];

    if (!shouldSwap) break;

    [arr[index], arr[parent]] = [arr[parent], arr[index]];

    steps.push({
      type: "bubble-up",
      indices: [index, parent],
      heap: [...arr],
    });

    index = parent;
  }

  steps.push({
    type: "done",
    heap: [...arr],
  });

  return steps;
}
