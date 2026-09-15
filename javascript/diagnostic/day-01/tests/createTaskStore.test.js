import test from "node:test";
import assert from "node:assert/strict";

import { createTaskStore } from "../src/createTaskStore.js";

test("manages tasks and generates the next id", () => {
  const initialTasks = [{ id: 4, title: "Read", completed: false }];
  const store = createTaskStore(initialTasks);

  assert.deepEqual(store.addTask("  Practice JavaScript  "), {
    id: 5,
    title: "Practice JavaScript",
    completed: false,
  });
  assert.equal(store.toggleTask(5), true);
  assert.equal(store.toggleTask(999), false);
  assert.equal(store.removeTask(4), true);
  assert.equal(store.removeTask(999), false);
  assert.deepEqual(store.getTasks(), [
    { id: 5, title: "Practice JavaScript", completed: true },
  ]);
  assert.deepEqual(initialTasks, [{ id: 4, title: "Read", completed: false }]);
});

test("protects internal state from external mutation", () => {
  const initialTasks = [{ id: 1, title: "Original", completed: false }];
  const store = createTaskStore(initialTasks);

  initialTasks[0].title = "Changed outside";
  const exposedTasks = store.getTasks();
  exposedTasks[0].title = "Changed through getter";
  const addedTask = store.addTask("New task");
  addedTask.title = "Changed returned value";

  assert.deepEqual(store.getTasks(), [
    { id: 1, title: "Original", completed: false },
    { id: 2, title: "New task", completed: false },
  ]);
});

test("rejects an empty title", () => {
  const store = createTaskStore();

  assert.equal(typeof store?.addTask, "function");
  assert.throws(() => store.addTask("   "), TypeError);
});

test("keeps different stores isolated", () => {
  const first = createTaskStore();
  const second = createTaskStore();

  first.addTask("Only in first");

  assert.equal(first.getTasks().length, 1);
  assert.equal(second.getTasks().length, 0);
});
