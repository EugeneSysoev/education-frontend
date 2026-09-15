import test from "node:test";
import assert from "node:assert/strict";

import { loadDashboard } from "../src/loadDashboard.js";

function createDeferred() {
  let resolve;
  let reject;
  const promise = new Promise((resolvePromise, rejectPromise) => {
    resolve = resolvePromise;
    reject = rejectPromise;
  });
  return { promise, resolve, reject };
}

test("loads dependent resources in parallel after the user", async () => {
  const calls = [];
  const postsDeferred = createDeferred();
  const recommendationsDeferred = createDeferred();
  const user = { id: 7, interests: ["react", "testing"] };

  const api = {
    async getUser(userId) {
      calls.push(["user", userId]);
      return user;
    },
    getPosts(userId) {
      calls.push(["posts", userId]);
      return postsDeferred.promise;
    },
    getRecommendations(interests) {
      calls.push(["recommendations", interests]);
      return recommendationsDeferred.promise;
    },
  };

  const resultPromise = loadDashboard(7, api);
  await Promise.resolve();
  await Promise.resolve();

  assert.deepEqual(calls, [
    ["user", 7],
    ["posts", 7],
    ["recommendations", ["react", "testing"]],
  ]);

  postsDeferred.resolve([{ id: 1 }]);
  recommendationsDeferred.resolve([{ id: 2 }]);

  assert.deepEqual(await resultPromise, {
    user,
    posts: [{ id: 1 }],
    recommendations: [{ id: 2 }],
  });
});

test("does not call dependent resources when user loading fails", async () => {
  const expectedError = new Error("User not found");
  let dependentCallCount = 0;
  const api = {
    async getUser() {
      throw expectedError;
    },
    async getPosts() {
      dependentCallCount += 1;
      return [];
    },
    async getRecommendations() {
      dependentCallCount += 1;
      return [];
    },
  };

  await assert.rejects(loadDashboard(7, api), (error) => error === expectedError);
  assert.equal(dependentCallCount, 0);
});

