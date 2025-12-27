export function getMergeSortSteps(array) {
  const steps = [];
  const arr = array.slice();

  function mergeSort(l, r, depth) {
    if (l >= r) return;

    steps.push({
      type: "split",
      array: arr.slice(),
      range: [l, r],
      depth,
    });

    const mid = Math.floor((l + r) / 2);

    mergeSort(l, mid, depth + 1);
    mergeSort(mid + 1, r, depth + 1);

    merge(l, mid, r, depth);
  }

  function merge(l, mid, r, depth) {
    const left = arr.slice(l, mid + 1);
    const right = arr.slice(mid + 1, r + 1);

    let i = 0,
      j = 0,
      k = l;

    while (i < left.length && j < right.length) {
      steps.push({
        type: "compare",
        indices: [k],
        range: [l, r],
        depth,
      });

      if (left[i] <= right[j]) {
        arr[k++] = left[i++];
      } else {
        arr[k++] = right[j++];
      }

      steps.push({
        type: "overwrite",
        array: arr.slice(),
        indices: [k - 1],
        range: [l, r],
        depth,
      });
    }

    while (i < left.length) {
      arr[k++] = left[i++];
      steps.push({
        type: "overwrite",
        array: arr.slice(),
        indices: [k - 1],
        range: [l, r],
        depth,
      });
    }

    while (j < right.length) {
      arr[k++] = right[j++];
      steps.push({
        type: "overwrite",
        array: arr.slice(),
        indices: [k - 1],
        range: [l, r],
        depth,
      });
    }

    steps.push({
      type: "merge",
      array: arr.slice(),
      range: [l, r],
      depth,
    });
  }

  mergeSort(0, arr.length - 1, 0);

  steps.push({
    type: "done",
    array: arr.slice(),
  });

  return steps;
}
