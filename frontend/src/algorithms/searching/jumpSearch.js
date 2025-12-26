export function getJumpSearchSteps(array, target) {
  const steps = [];
  const arr = [...array].sort((a, b) => a - b);
  const n = arr.length;
  const stepSize = Math.floor(Math.sqrt(n));

  // Init step to render sorted array
  steps.push({
    type: "init",
    array: [...arr],
    indices: [],
  });

  let prev = 0;
  let step = stepSize;

  while (arr[Math.min(step, n) - 1] < target) {
    steps.push({
      type: "compare",
      indices: [Math.min(step, n) - 1],
    });

    prev = step;
    step += stepSize;

    if (prev >= n) {
      steps.push({ type: "not-found", indices: [] });
      return steps;
    }
  }

  // Linear search in block
  for (let i = prev; i < Math.min(step, n); i++) {
    steps.push({
      type: "compare",
      indices: [i],
    });

    if (arr[i] === target) {
      steps.push({
        type: "found",
        indices: [i],
      });
      return steps;
    }
  }

  steps.push({ type: "not-found", indices: [] });
  return steps;
}
