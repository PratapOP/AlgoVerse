export function getLinearSearchSteps(array, target) {
  const steps = [];

  for (let i = 0; i < array.length; i++) {
    steps.push({
      type: "compare",
      indices: [i],
    });

    if (array[i] === target) {
      steps.push({
        type: "found",
        indices: [i],
      });
      return steps;
    }
  }

  steps.push({
    type: "not-found",
    indices: [],
  });

  return steps;
}
