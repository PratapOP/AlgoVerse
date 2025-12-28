export const getMaxHeapInsertSteps = (heap, value) => {
  const steps = [];
  const arr = [...heap, value];
  let i = arr.length - 1;

  steps.push({ type: "insert", array: [...arr] });

  while (i > 0) {
    const parent = Math.floor((i - 1) / 2);
    steps.push({ type: "compare", indices: [i, parent] });

    if (arr[parent] >= arr[i]) break;

    [arr[parent], arr[i]] = [arr[i], arr[parent]];
    steps.push({ type: "swap", array: [...arr], indices: [i, parent] });
    i = parent;
  }

  steps.push({ type: "done", array: [...arr] });
  return steps;
};
