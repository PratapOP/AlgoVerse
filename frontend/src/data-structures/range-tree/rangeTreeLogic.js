// ===============================
// Fenwick Tree (Binary Indexed Tree)
// ===============================
export class FenwickTree {
  constructor(size) {
    this.n = size;
    this.tree = new Array(size + 1).fill(0);
  }

  update(index, delta) {
    index++;
    while (index <= this.n) {
      this.tree[index] += delta;
      index += index & -index;
    }
  }

  query(index) {
    index++;
    let sum = 0;
    while (index > 0) {
      sum += this.tree[index];
      index -= index & -index;
    }
    return sum;
  }

  rangeQuery(left, right) {
    return this.query(right) - this.query(left - 1);
  }

  getTree() {
    return [...this.tree];
  }
}

// ===============================
// Segment Tree
// ===============================
export class SegmentTree {
  constructor(arr) {
    this.n = arr.length;
    this.tree = new Array(4 * this.n).fill(0);
    this.build(arr, 0, 0, this.n - 1);
  }

  build(arr, node, start, end) {
    if (start === end) {
      this.tree[node] = arr[start];
      return;
    }
    const mid = Math.floor((start + end) / 2);
    this.build(arr, 2 * node + 1, start, mid);
    this.build(arr, 2 * node + 2, mid + 1, end);
    this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
  }

  update(index, value, node = 0, start = 0, end = this.n - 1) {
    if (start === end) {
      this.tree[node] = value;
      return;
    }
    const mid = Math.floor((start + end) / 2);
    if (index <= mid)
      this.update(index, value, 2 * node + 1, start, mid);
    else
      this.update(index, value, 2 * node + 2, mid + 1, end);

    this.tree[node] = this.tree[2 * node + 1] + this.tree[2 * node + 2];
  }

  query(left, right, node = 0, start = 0, end = this.n - 1) {
    if (right < start || left > end) return 0;
    if (left <= start && end <= right) return this.tree[node];

    const mid = Math.floor((start + end) / 2);
    return (
      this.query(left, right, 2 * node + 1, start, mid) +
      this.query(left, right, 2 * node + 2, mid + 1, end)
    );
  }

  getTree() {
    return [...this.tree];
  }
}
