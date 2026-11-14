import { test } from "node:test";
import assert from "node:assert/strict";
import { findUser, publicProfile, searchUsers } from "../src/users.js";

test("finds a user by id", () => {
  assert.equal(findUser(1).name, "Ada");
});

test("public profile hides email and role", () => {
  assert.deepEqual(publicProfile(findUser(2)), { id: 2, name: "Linus" });
});

test("searchUsers is case-insensitive and returns public profiles", () => {
  assert.deepEqual(searchUsers("ada"), [{ id: 1, name: "Ada" }]);
});

test("searchUsers returns nothing for empty or invalid queries", () => {
  assert.deepEqual(searchUsers(""), []);
  assert.deepEqual(searchUsers(undefined), []);
  assert.deepEqual(searchUsers("zzz"), []);
});
