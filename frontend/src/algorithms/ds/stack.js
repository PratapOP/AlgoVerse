// Stack step generators (Array + Linked List)

export function getStackPushSteps(stack, value, limit = 6) {
  const steps = [];

  if (stack.length >= limit) {
    steps.push({ type: "overflow" });
    return steps;
  }

  const newStack = [...stack, value];

  steps.push({
    type: "push",
    stack: newStack,
    active: [newStack.length - 1],
  });

  return steps;
}

export function getStackPopSteps(stack) {
  const steps = [];

  if (stack.length === 0) {
    steps.push({ type: "underflow" });
    return steps;
  }

  const newStack = [...stack];
  newStack.pop();

  steps.push({
    type: "pop",
    stack: newStack,
    active: [],
  });

  return steps;
}

export function getStackPeekSteps(stack) {
  if (stack.length === 0) return [{ type: "empty" }];

  return [{
    type: "peek",
    active: [stack.length - 1],
  }];
}
