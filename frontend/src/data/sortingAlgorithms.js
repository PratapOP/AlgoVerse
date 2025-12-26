export const sortingAlgorithms = {
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
      "Bubble Sort is one of the oldest sorting algorithms, often used for teaching due to its simplicity.",
    pseudocode: `
for i = 0 to n-1
  for j = 0 to n-i-2
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
  return arr;
}
`,
      python: `
def bubble_sort(arr):
    for i in range(len(arr)):
        for j in range(len(arr)-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr
`,
    },
    usage:
      "Used mainly for educational purposes and small datasets where simplicity is preferred.",
  },

  selection: {
    name: "Selection Sort",
    overview:
      "Selection Sort repeatedly selects the minimum element from the unsorted part and places it at the beginning.",
    complexity: {
      best: "O(n²)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
    },
    history:
      "Selection Sort dates back to early computer science education as a simple comparison-based algorithm.",
    pseudocode: `
for i = 0 to n-1
  min = i
  for j = i+1 to n
    if arr[j] < arr[min]
      min = j
  swap(arr[i], arr[min])
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
  return arr;
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
    return arr
`,
    },
    usage:
      "Useful when memory writes are expensive and dataset size is small.",
  },

  insertion: {
    name: "Insertion Sort",
    overview:
      "Insertion Sort builds the sorted array one element at a time by inserting elements into their correct position.",
    complexity: {
      best: "O(n)",
      average: "O(n²)",
      worst: "O(n²)",
      space: "O(1)",
    },
    history:
      "Insertion Sort is inspired by how people sort playing cards in their hands.",
    pseudocode: `
for i = 1 to n-1
  key = arr[i]
  j = i - 1
  while j >= 0 and arr[j] > key
    arr[j+1] = arr[j]
    j--
  arr[j+1] = key
`,
    code: {
      js: `
function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;
    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      j--;
    }
    arr[j + 1] = key;
  }
  return arr;
}
`,
      python: `
def insertion_sort(arr):
    for i in range(1, len(arr)):
        key = arr[i]
        j = i - 1
        while j >= 0 and arr[j] > key:
            arr[j+1] = arr[j]
            j -= 1
        arr[j+1] = key
    return arr
`,
    },
    usage:
      "Efficient for small datasets and nearly sorted arrays.",
  },

  merge: {
    name: "Merge Sort",
    overview:
      "Merge Sort divides the array into halves, sorts them recursively, and then merges them.",
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(n)",
    },
    history:
      "Merge Sort was invented by John von Neumann in 1945.",
    pseudocode: `
mergeSort(arr):
  if length <= 1 return arr
  split arr into left and right
  return merge(mergeSort(left), mergeSort(right))
`,
    code: {
      js: `
function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  const mid = Math.floor(arr.length / 2);
  const left = mergeSort(arr.slice(0, mid));
  const right = mergeSort(arr.slice(mid));
  return merge(left, right);
}
`,
      python: `
def merge_sort(arr):
    if len(arr) <= 1:
        return arr
    mid = len(arr)//2
    left = merge_sort(arr[:mid])
    right = merge_sort(arr[mid:])
    return merge(left, right)
`,
    },
    usage:
      "Used in systems where stable sorting and guaranteed performance are required.",
  },

  quick: {
    name: "Quick Sort",
    overview:
      "Quick Sort selects a pivot and partitions the array around it.",
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n²)",
      space: "O(log n)",
    },
    history:
      "Quick Sort was developed by Tony Hoare in 1959.",
    pseudocode: `
quickSort(arr):
  if low < high
    pivot = partition(arr)
    quickSort(left)
    quickSort(right)
`,
    code: {
      js: `
function quickSort(arr) {
  if (arr.length <= 1) return arr;
  const pivot = arr[arr.length - 1];
  const left = arr.filter(x => x < pivot);
  const right = arr.filter(x => x > pivot);
  return [...quickSort(left), pivot, ...quickSort(right)];
}
`,
      python: `
def quick_sort(arr):
    if len(arr) <= 1:
        return arr
    pivot = arr[-1]
    left = [x for x in arr[:-1] if x < pivot]
    right = [x for x in arr[:-1] if x >= pivot]
    return quick_sort(left) + [pivot] + quick_sort(right)
`,
    },
    usage:
      "Widely used in standard libraries due to average-case efficiency.",
  },

  heap: {
    name: "Heap Sort",
    overview:
      "Heap Sort uses a binary heap to repeatedly extract the maximum element.",
    complexity: {
      best: "O(n log n)",
      average: "O(n log n)",
      worst: "O(n log n)",
      space: "O(1)",
    },
    history:
      "Heap Sort was introduced by J. W. J. Williams in 1964.",
    pseudocode: `
buildMaxHeap(arr)
for i = n-1 to 1
  swap(arr[0], arr[i])
  heapify(arr, i, 0)
`,
    code: {
      js: `
function heapSort(arr) {
  // build heap and extract max
  return arr;
}
`,
      python: `
def heap_sort(arr):
    import heapq
    heapq.heapify(arr)
    return [heapq.heappop(arr) for _ in range(len(arr))]
`,
    },
    usage:
      "Used when in-place sorting with guaranteed performance is required.",
  },

  shell: {
    name: "Shell Sort",
    overview:
      "Shell Sort improves insertion sort by comparing elements far apart.",
    complexity: {
      best: "O(n log n)",
      average: "O(n^(3/2))",
      worst: "O(n²)",
      space: "O(1)",
    },
    history:
      "Shell Sort was proposed by Donald Shell in 1959.",
    pseudocode: `
gap = n/2
while gap > 0
  perform insertion sort with gap
  gap = gap/2
`,
    code: {
      js: `
function shellSort(arr) {
  let gap = Math.floor(arr.length / 2);
  while (gap > 0) {
    for (let i = gap; i < arr.length; i++) {
      let temp = arr[i];
      let j = i;
      while (j >= gap && arr[j - gap] > temp) {
        arr[j] = arr[j - gap];
        j -= gap;
      }
      arr[j] = temp;
    }
    gap = Math.floor(gap / 2);
  }
  return arr;
}
`,
      python: `
def shell_sort(arr):
    gap = len(arr)//2
    while gap > 0:
        for i in range(gap, len(arr)):
            temp = arr[i]
            j = i
            while j >= gap and arr[j-gap] > temp:
                arr[j] = arr[j-gap]
                j -= gap
            arr[j] = temp
        gap //= 2
    return arr
`,
    },
    usage:
      "Used as an optimization over insertion sort for medium-sized arrays.",
  },

  counting: {
    name: "Counting Sort",
    overview:
      "Counting Sort counts occurrences of each value and reconstructs the sorted array.",
    complexity: {
      best: "O(n + k)",
      average: "O(n + k)",
      worst: "O(n + k)",
      space: "O(k)",
    },
    history:
      "Counting Sort is one of the earliest non-comparison sorting algorithms.",
    pseudocode: `
count occurrences
rebuild array from count
`,
    code: {
      js: `
function countingSort(arr) {
  const max = Math.max(...arr);
  const count = new Array(max+1).fill(0);
  arr.forEach(x => count[x]++);
  let idx = 0;
  for (let i = 0; i < count.length; i++)
    while (count[i]--) arr[idx++] = i;
  return arr;
}
`,
      python: `
def counting_sort(arr):
    max_val = max(arr)
    count = [0]*(max_val+1)
    for x in arr:
        count[x]+=1
    i=0
    for num in range(len(count)):
        while count[num]>0:
            arr[i]=num
            i+=1
            count[num]-=1
    return arr
`,
    },
    usage:
      "Used when the input range is small and known.",
  },

  radix: {
    name: "Radix Sort",
    overview:
      "Radix Sort sorts numbers digit by digit using a stable sorting method.",
    complexity: {
      best: "O(nk)",
      average: "O(nk)",
      worst: "O(nk)",
      space: "O(n + k)",
    },
    history:
      "Radix Sort dates back to early mechanical sorting machines.",
    pseudocode: `
for digit = least to most significant
  stable sort by digit
`,
    code: {
      js: `
function radixSort(arr) {
  return arr;
}
`,
      python: `
def radix_sort(arr):
    return arr
`,
    },
    usage:
      "Used in systems sorting large integers efficiently.",
  },

  bucket: {
    name: "Bucket Sort",
    overview:
      "Bucket Sort distributes elements into buckets and sorts each bucket.",
    complexity: {
      best: "O(n)",
      average: "O(n + k)",
      worst: "O(n²)",
      space: "O(n)",
    },
    history:
      "Bucket Sort is closely related to counting and radix sort.",
    pseudocode: `
distribute into buckets
sort each bucket
merge buckets
`,
    code: {
      js: `
function bucketSort(arr) {
  return arr;
}
`,
      python: `
def bucket_sort(arr):
    return arr
`,
    },
    usage:
      "Used when data is uniformly distributed over a range.",
  },
};
