// ---------- Heap Base ----------
class Heap {
  constructor(compareFn) {
    this.data = [];
    this.compare = compareFn;
  }

  getParentIndex(i) {
    return Math.floor((i - 1) / 2);
  }

  getLeftChildIndex(i) {
    return 2 * i + 1;
  }

  getRightChildIndex(i) {
    return 2 * i + 2;
  }

  swap(i, j) {
    [this.data[i], this.data[j]] = [this.data[j], this.data[i]];
  }

  insert(value) {
    this.data.push(value);
    this.heapifyUp();
  }

  remove() {
    if (this.data.length === 0) return null;
    if (this.data.length === 1) return this.data.pop();

    const root = this.data[0];
    this.data[0] = this.data.pop();
    this.heapifyDown();
    return root;
  }

  heapifyUp() {
    let index = this.data.length - 1;
    while (
      index > 0 &&
      this.compare(
        this.data[index],
        this.data[this.getParentIndex(index)]
      )
    ) {
      this.swap(index, this.getParentIndex(index));
      index = this.getParentIndex(index);
    }
  }

  heapifyDown() {
    let index = 0;
    while (this.getLeftChildIndex(index) < this.data.length) {
      let bestChild = this.getLeftChildIndex(index);
      const right = this.getRightChildIndex(index);

      if (
        right < this.data.length &&
        this.compare(this.data[right], this.data[bestChild])
      ) {
        bestChild = right;
      }

      if (this.compare(this.data[index], this.data[bestChild])) break;

      this.swap(index, bestChild);
      index = bestChild;
    }
  }

  getHeap() {
    return [...this.data];
  }
}

// ---------- Min Heap ----------
export class MinHeap extends Heap {
  constructor() {
    super((a, b) => a < b);
  }
}

// ---------- Max Heap ----------
export class MaxHeap extends Heap {
  constructor() {
    super((a, b) => a > b);
  }
}
