export function getCountingSortSteps(array) {
  const steps = [];
  const arr = [...array];
  const max = Math.max(...arr);
  const count = new Array(max + 1).fill(0);

  for (let num of arr) {
    count[num]++;
  }

  let index = 0;
  for (let i = 0; i < count.length; i++) {
    while (count[i] > 0) {
      arr[index] = i;

      steps.push({
        type: "overwrite",
        indices: [index],
        array: [...arr],
      });

      index++;
      count[i]--;
    }
  }

  steps.push({ type: "done", indices: [], array: [...arr] });
  return steps;
}
