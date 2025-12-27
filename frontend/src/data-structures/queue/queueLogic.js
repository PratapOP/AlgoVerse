// Queue follows FIFO (First In First Out)

export class Queue {
  constructor() {
    this.items = [];
  }

  enqueue(value) {
    this.items.push(value);
  }

  dequeue() {
    if (this.items.length === 0) return null;
    return this.items.shift();
  }

  getQueue() {
    return [...this.items];
  }
}
