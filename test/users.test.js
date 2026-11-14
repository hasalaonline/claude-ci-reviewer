import { test } from "node:test";
import assert from "node:assert/strict";
import { findUser, publicProfile, listUsers, findUserByEmail } from "../src/users.js";

test("finds a user by id", () => {
  assert.equal(findUser(1).name, "Ada");
});

test("public profile hides email and role", () => {
  assert.deepEqual(publicProfile(findUser(2)), { id: 2, name: "Linus" });
});

test("listUsers returns public profiles only", () => {
  assert.deepEqual(listUsers(), [
    { id: 1, name: "Ada" },
    { id: 2, name: "Linus" },
  ]);
});

test("findUserByEmail matches the right user and hides private fields", () => {
  assert.deepEqual(findUserByEmail("linus@example.com"), { id: 2, name: "Linus" });
  assert.equal(findUserByEmail("nobody@example.com"), null);
});
