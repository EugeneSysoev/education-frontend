import test from "node:test";
import assert from "node:assert/strict";

import { createScoreTracker } from "../src/createScoreTracker.js";

test("adds scores and builds a sorted leaderboard", () => {
  const tracker = createScoreTracker([
    { player: "Anna", points: 5 },
    { player: "Max", points: 7 },
  ]);

  assert.deepEqual(tracker.addScore("  Anna  ", 4), { player: "Anna", points: 4 });
  assert.equal(tracker.getTotal("Anna"), 9);
  assert.equal(tracker.getTotal("Unknown"), 0);
  assert.deepEqual(tracker.getLeaderboard(), [
    { player: "Anna", total: 9 },
    { player: "Max", total: 7 },
  ]);
});

test("protects internal state from external mutation", () => {
  const initialScores = [{ player: "Anna", points: 5 }];
  const tracker = createScoreTracker(initialScores);

  initialScores[0].points = 100;
  const exposedScores = tracker.getScores();
  exposedScores[0].points = 200;
  const addedScore = tracker.addScore("Max", 7);
  addedScore.points = 300;

  assert.deepEqual(tracker.getScores(), [
    { player: "Anna", points: 5 },
    { player: "Max", points: 7 },
  ]);
});

test("rejects invalid input", () => {
  const tracker = createScoreTracker();

  assert.throws(() => tracker.addScore("   ", 1), TypeError);
  assert.throws(() => tracker.addScore("Anna", -1), TypeError);
  assert.throws(() => tracker.addScore("Anna", Number.POSITIVE_INFINITY), TypeError);
});

test("keeps different trackers isolated", () => {
  const first = createScoreTracker();
  const second = createScoreTracker();

  first.addScore("Anna", 5);

  assert.equal(first.getScores().length, 1);
  assert.equal(second.getScores().length, 0);
});
