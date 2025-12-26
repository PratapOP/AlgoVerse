export const algorithms = {
  bubble: {
    name: "Bubble Sort",
    overview:
      "Bubble Sort repeatedly compares adjacent elements and swaps them if they are in the wrong order.",
    complexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
    },
    history:
      "Bubble Sort is one of the oldest sorting algorithms, dating back to the early days of computer science.",
    pseudocode: `
for i from 0 to n-1
  for j from 0 to n-i-1
    if arr[j] > arr[j+1]
      swap(arr[j], arr[j+1])
`,
    code: {
      js: `
function bubbleSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
      }
    }
  }
}
`,
      python: `
def bubble_sort(arr):
    for i in range(len(arr)):
        for j in range(len(arr) - i - 1):
            if arr[j] > arr[j + 1]:
                arr[j], arr[j + 1] = arr[j + 1], arr[j]
`,
    },
    usage:
      "Used mainly for teaching purposes. Rarely used in production due to inefficiency.",
  },

  selection: {
    name: "Selection Sort",
    overview:
      "Selection Sort repeatedly selects the minimum element from the unsorted part and moves it to the beginning.",
    complexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
    },
    history:
      "Selection Sort emerged as a simple improvement over Bubble Sort, minimizing swaps.",
    pseudocode: `
for i from 0 to n-1
  minIndex = i
  for j from i+1 to n
    if arr[j] < arr[minIndex]
      minIndex = j
  swap(arr[i], arr[minIndex])
`,
    code: {
      js: `
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let min = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[min]) min = j;
    }
    [arr[i], arr[min]] = [arr[min], arr[i]];
  }
}
`,
      python: `
def selection_sort(arr):
    for i in range(len(arr)):
        min_idx = i
        for j in range(i+1, len(arr)):
            if arr[j] < arr[min_idx]:
                min_idx = j
        arr[i], arr[min_idx] = arr[min_idx], arr[i]
`,
    },
    usage:
      "Useful when memory writes are costly. Still mainly educational.",
  },
};
