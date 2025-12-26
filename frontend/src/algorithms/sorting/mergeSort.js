export function getMergeSortSteps(array) {
  const steps = [];
  const arr = [...array];

  function mergeSort(start, end) {
    if (end - start <= 1) return;

    const mid = Math.floor((start + end) / 2);
    mergeSort(start, mid);
    mergeSort(mid, end);
    merge(start, mid, end);
  }

  function merge(start, mid, end) {
    const left = arr.slice(start, mid);
    const right = arr.slice(mid, end);

    let i = 0,
      j = 0,
      k = start;

    while (i < left.length && j < right.length) {
      steps.push({
        type: "compare",
        indices: [k],
        array: [...arr],
      });

      if (left[i] <= right[j]) {
        arr[k] = left[i++];
      } else {
        arr[k] = right[j++];
      }

      steps.push({
        type: "overwrite",
        indices: [k],
        array: [...arr],
      });

      k++;
    }

    while (i < left.length) {
      arr[k] = left[i++];

      steps.push({
        type: "overwrite",
        indices: [k],
        array: [...arr],
      });

      k++;
    }

    while (j < right.length) {
      arr[k] = right[j++];

      steps.push({
        type: "overwrite",
        indices: [k],
        array: [...arr],
      });

      k++;
    }
  }

  mergeSort(0, arr.length);

  steps.push({
    type: "done",
    indices: [],
    array: [...arr],
  });

  return steps;
}
