export function getLinearSearchSteps(array, target) {
  const steps = [];

  for (let i = 0; i < array.length; i++) {
    steps.push({
      type: "compare",
      indices: [i],
      array: [...array],
    });

    if (array[i] === target) {
      steps.push({
        type: "found",
        indices: [i],
        array: [...array],
      });
      return steps;
    }
  }

  steps.push({
    type: "not-found",
    indices: [],
    array: [...array],
  });

  return steps;
}
