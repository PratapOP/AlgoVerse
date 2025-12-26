export const searchingAlgorithms = {
  linear: {
    name: "Linear Search",
    overview:
      "Linear Search sequentially checks each element in the list until the target element is found or the list ends.",
    complexity: {
      best: "O(1)",
      average: "O(n)",
      worst: "O(n)",
      space: "O(1)",
    },
    history:
      "Linear Search is one of the simplest and earliest searching techniques used in computer science.",
    pseudocode: `
for i = 0 to n-1
  if arr[i] == target
    return i
return -1
`,
    code: {
      js: `
function linearSearch(arr, target) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
`,
      python: `
def linear_search(arr, target):
    for i in range(len(arr)):
        if arr[i] == target:
            return i
    return -1
`,
    },
    usage:
      "Used for small datasets or unsorted collections where simplicity is preferred.",
  },

  binary: {
    name: "Binary Search",
    overview:
      "Binary Search repeatedly divides a sorted array in half to locate the target element efficiently.",
    complexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
      space: "O(1)",
    },
    history:
      "Binary Search dates back to the 1940s and is one of the most efficient searching algorithms for sorted data.",
    pseudocode: `
low = 0
high = n - 1
while low <= high
  mid = (low + high) / 2
  if arr[mid] == target
    return mid
  else if arr[mid] < target
    low = mid + 1
  else
    high = mid - 1
`,
    code: {
      js: `
function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}
`,
      python: `
def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1
`,
    },
    usage:
      "Widely used in databases, libraries, and systems where data is sorted.",
  },

  jump: {
    name: "Jump Search",
    overview:
      "Jump Search checks elements at fixed intervals and then performs a linear search within a block.",
    complexity: {
      best: "O(1)",
      average: "O(√n)",
      worst: "O(√n)",
      space: "O(1)",
    },
    history:
      "Jump Search was developed as an optimization over Linear Search for sorted arrays.",
    pseudocode: `
step = sqrt(n)
prev = 0
while arr[min(step, n)-1] < target
  prev = step
  step += sqrt(n)
for i = prev to min(step, n)
  if arr[i] == target
    return i
return -1
`,
    code: {
      js: `
function jumpSearch(arr, target) {
  const n = arr.length;
  const step = Math.floor(Math.sqrt(n));
  let prev = 0;
  while (arr[Math.min(step, n) - 1] < target) {
    prev = step;
    if (prev >= n) return -1;
  }
  for (let i = prev; i < Math.min(step, n); i++) {
    if (arr[i] === target) return i;
  }
  return -1;
}
`,
      python: `
import math
def jump_search(arr, target):
    n = len(arr)
    step = int(math.sqrt(n))
    prev = 0
    while arr[min(step, n)-1] < target:
        prev = step
        if prev >= n:
            return -1
    for i in range(prev, min(step, n)):
        if arr[i] == target:
            return i
    return -1
`,
    },
    usage:
      "Used when a balance between simplicity and performance is required on sorted data.",
  },

  exponential: {
    name: "Exponential Search",
    overview:
      "Exponential Search finds a range where the target lies and then applies Binary Search within that range.",
    complexity: {
      best: "O(1)",
      average: "O(log n)",
      worst: "O(log n)",
      space: "O(1)",
    },
    history:
      "Exponential Search was introduced for searching in unbounded or infinite arrays.",
    pseudocode: `
if arr[0] == target return 0
i = 1
while i < n and arr[i] <= target
  i *= 2
binarySearch(arr, i/2, min(i, n))
`,
    code: {
      js: `
function exponentialSearch(arr, target) {
  if (arr[0] === target) return 0;
  let i = 1;
  while (i < arr.length && arr[i] <= target) i *= 2;
  return binarySearch(arr.slice(i/2, i), target);
}
`,
      python: `
def exponential_search(arr, target):
    if arr[0] == target:
        return 0
    i = 1
    while i < len(arr) and arr[i] <= target:
        i *= 2
    return binary_search(arr, target, i//2, min(i, len(arr)-1))
`,
    },
    usage:
      "Used in systems with large or infinite sorted datasets.",
  },
};
