export function getQuickSortSteps(array) {
  const steps = [];
  const arr = [...array];

  function partition(low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
      steps.push({
        type: "compare",
        indices: [j, high],
        array: [...arr],
      });

      if (arr[j] < pivot) {
        i++;
        [arr[i], arr[j]] = [arr[j], arr[i]];

        steps.push({
          type: "swap",
          indices: [i, j],
          array: [...arr],
        });
      }
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    steps.push({
      type: "swap",
      indices: [i + 1, high],
      array: [...arr],
    });

    return i + 1;
  }

  function quickSort(low, high) {
    if (low < high) {
      const pi = partition(low, high);
      quickSort(low, pi - 1);
      quickSort(pi + 1, high);
    }
  }

  quickSort(0, arr.length - 1);

  steps.push({
    type: "done",
    indices: [],
    array: [...arr],
  });

  return steps;
}
