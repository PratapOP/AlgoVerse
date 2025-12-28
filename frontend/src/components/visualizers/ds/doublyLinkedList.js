// Doubly Linked List step generators

export function insertHead(list, value) {
  const newNode = { value, prev: null, next: 0 };

  const updated = list.map((n, i) => ({
    ...n,
    prev: i === 0 ? 0 : n.prev + 1,
    next: n.next !== null ? n.next + 1 : null,
  }));

  if (updated.length > 0) updated[0].prev = 0;

  return [{
    type: "insert-head",
    list: [newNode, ...updated],
    active: [0],
  }];
}

export function insertTail(list, value) {
  const updated = [...list];
  const index = updated.length;

  updated.push({
    value,
    prev: index - 1 >= 0 ? index - 1 : null,
    next: null,
  });

  if (index > 0) updated[index - 1].next = index;

  return [{
    type: "insert-tail",
    list: updated,
    active: [index],
  }];
}

export function deleteValue(list, value) {
  const index = list.findIndex((n) => n.value === value);
  if (index === -1) return [];

  const updated = list.filter((_, i) => i !== index)
    .map((n, i) => ({
      ...n,
      prev: i === 0 ? null : i - 1,
      next: i === list.length - 2 ? null : i + 1,
    }));

  return [{
    type: "delete",
    list: updated,
    active: [],
  }];
}

export function forwardTraversal(list) {
  return list.map((_, i) => ({
    type: "traverse-forward",
    active: [i],
  }));
}

export function backwardTraversal(list) {
  return list.map((_, i) => ({
    type: "traverse-backward",
    active: [list.length - 1 - i],
  }));
}
