import test from "node:test";
import assert from "node:assert/strict";

import { updateUserTheme } from "../src/updateUserTheme.js";

test("updates only the selected user with structural sharing", () => {
  const first = { id: 1, name: "Anna", settings: { theme: "light", language: "ru" } };
  const second = { id: 2, name: "Max", settings: { theme: "light", language: "en" } };
  const users = [first, second];

  const result = updateUserTheme(users, 2, "dark");

  assert.notEqual(result, users);
  assert.equal(result[0], first);
  assert.notEqual(result[1], second);
  assert.notEqual(result[1].settings, second.settings);
  assert.deepEqual(result[1], {
    id: 2,
    name: "Max",
    settings: { theme: "dark", language: "en" },
  });
  assert.equal(second.settings.theme, "light");
});

test("returns the original array when nothing changes", () => {
  const users = [{ id: 1, name: "Anna", settings: { theme: "light", language: "ru" } }];

  assert.equal(updateUserTheme(users, 999, "dark"), users);
  assert.equal(updateUserTheme(users, 1, "light"), users);
});
