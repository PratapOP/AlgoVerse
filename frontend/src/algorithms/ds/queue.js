// Queue step generators (FIFO)

export function getEnqueueSteps(queue, value, limit = 6) {
  if (queue.length >= limit) {
    return [{ type: "overflow" }];
  }

  return [{
    type: "enqueue",
    queue: [...queue, value],
    active: [queue.length],
  }];
}

export function getDequeueSteps(queue) {
  if (queue.length === 0) {
    return [{ type: "underflow" }];
  }

  const newQueue = queue.slice(1);

  return [{
    type: "dequeue",
    queue: newQueue,
    active: [],
  }];
}

export function getPeekSteps(queue) {
  if (queue.length === 0) {
    return [{ type: "empty" }];
  }

  return [{
    type: "peek",
    active: [0],
  }];
}
