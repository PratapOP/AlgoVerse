export function getBucketSortSteps(array) {
  const steps = [];
  const arr = [...array];
  const n = arr.length;
  const max = Math.max(...arr);

  const buckets = Array.from({ length: n }, () => []);

  for (let i = 0; i < n; i++) {
    const idx = Math.floor((arr[i] / max) * (n - 1));
    buckets[idx].push(arr[i]);
  }

  let index = 0;
  for (let bucket of buckets) {
    bucket.sort((a, b) => a - b); // using built-in for simplicity
    for (let val of bucket) {
      arr[index] = val;
      steps.push({
        type: "overwrite",
        indices: [index],
        array: [...arr],
      });
      index++;
    }
  }

  steps.push({ type: "done", indices: [], array: [...arr] });
  return steps;
}
