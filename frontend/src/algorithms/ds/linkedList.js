// Singly Linked List step generators

export function getInsertHeadSteps(list, value) {
  const steps = [];
  const newList = [{ value, next: 0 }, ...list.map((n, i) => ({ ...n, next: n.next + 1 }))];

  steps.push({
    type: "insert-head",
    list: newList,
    active: [0],
  });

  return steps;
}

export function getInsertTailSteps(list, value) {
  const steps = [];
  const newList = [...list];

  newList.push({ value, next: null });

  if (newList.length > 1) {
    newList[newList.length - 2].next = newList.length - 1;
  }

  steps.push({
    type: "insert-tail",
    list: newList,
    active: [newList.length - 1],
  });

  return steps;
}

export function getDeleteSteps(list, value) {
  const steps = [];
  const newList = list.filter((node) => node.value !== value);

  steps.push({
    type: "delete",
    list: newList.map((node, i) => ({
      ...node,
      next: i === newList.length - 1 ? null : i + 1,
    })),
    active: [],
  });

  return steps;
}

export function getReverseSteps(list) {
  const steps = [];
  let prev = null;
  let currIndex = 0;
  let nodes = list.map((n) => ({ ...n }));

  while (currIndex !== null) {
    const nextIndex = nodes[currIndex]?.next ?? null;

    steps.push({
      type: "reverse",
      active: [currIndex],
    });

    nodes[currIndex].next = prev;
    prev = currIndex;
    currIndex = nextIndex;
  }

  steps.push({
    type: "done",
    list: nodes,
    active: [],
  });

  return steps;
}
