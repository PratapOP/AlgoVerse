// Stack follows LIFO (Last In First Out)

export class Stack {
  constructor() {
    this.items = [];
  }

  push(value) {
    this.items.push(value);
  }

  pop() {
    if (this.items.length === 0) return null;
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  getStack() {
    return [...this.items];
  }
}
