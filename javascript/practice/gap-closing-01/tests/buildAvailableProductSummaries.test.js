import test from "node:test";
import assert from "node:assert/strict";

import { buildAvailableProductSummaries } from "../src/buildAvailableProductSummaries.js";

function deepFreeze(value) {
  if (value && typeof value === "object" && !Object.isFrozen(value)) {
    Object.freeze(value);
    Object.values(value).forEach(deepFreeze);
  }
  return value;
}

test("filters, maps and sorts products without mutation", () => {
  const products = deepFreeze([
    { id: 1, brand: "  Acme", name: "Keyboard ", price: 100, discountPercent: 20, available: true },
    { id: 2, brand: "Acme", name: "Mouse", price: 50, discountPercent: 0, available: false },
    { id: 3, brand: "Nova", name: "Display", price: 90, discountPercent: 0, available: true },
    { id: 4, brand: "Bright", name: "Lamp", price: 100, discountPercent: 20, available: true },
  ]);

  assert.deepEqual(buildAvailableProductSummaries(products), [
    { id: 1, label: "Acme Keyboard", finalPrice: 80 },
    { id: 4, label: "Bright Lamp", finalPrice: 80 },
    { id: 3, label: "Nova Display", finalPrice: 90 },
  ]);
});

test("returns an empty array for an empty input", () => {
  assert.deepEqual(buildAvailableProductSummaries([]), []);
});
