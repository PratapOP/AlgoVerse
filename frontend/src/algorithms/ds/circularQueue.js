// Circular Queue step generators

export function getCQEnqueueSteps(state, value) {
  const { queue, front, rear, size, capacity } = state;

  if (size === capacity) {
    return [{ type: "full" }];
  }

  const newQueue = [...queue];
  const newRear = (rear + 1) % capacity;

  newQueue[newRear] = value;

  return [{
    type: "enqueue",
    state: {
      queue: newQueue,
      front: front === -1 ? newRear : front,
      rear: newRear,
      size: size + 1,
      capacity,
    },
    active: [newRear],
  }];
}

export function getCQDequeueSteps(state) {
  const { queue, front, rear, size, capacity } = state;

  if (size === 0) {
    return [{ type: "empty" }];
  }

  const newQueue = [...queue];
  newQueue[front] = null;

  const newFront = size === 1 ? -1 : (front + 1) % capacity;

  return [{
    type: "dequeue",
    state: {
      queue: newQueue,
      front: newFront,
      rear: size === 1 ? -1 : rear,
      size: size - 1,
      capacity,
    },
    active: [],
  }];
}
