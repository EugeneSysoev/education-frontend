import test from "node:test";
import assert from "node:assert/strict";

import { buildActiveUserSummaries } from "../src/buildActiveUserSummaries.js";

function deepFreeze(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    Object.values(value).forEach(deepFreeze);
  }
  return value;
}

test("filters, maps and sorts active users without mutation", () => {
  const users = deepFreeze([
    { id: 1, firstName: "  Anna", lastName: "Stone ", age: 28, active: true },
    { id: 2, firstName: "Bob", lastName: "Young", age: 35, active: false },
    { id: 3, firstName: "Mila", lastName: "Adams", age: 35, active: true },
    { id: 4, firstName: "Alex", lastName: "Brown", age: 35, active: true },
  ]);

  assert.deepEqual(buildActiveUserSummaries(users), [
    { id: 4, fullName: "Alex Brown", age: 35 },
    { id: 3, fullName: "Mila Adams", age: 35 },
    { id: 1, fullName: "Anna Stone", age: 28 },
  ]);
});

test("returns an empty array for an empty input", () => {
  assert.deepEqual(buildActiveUserSummaries([]), []);
});

