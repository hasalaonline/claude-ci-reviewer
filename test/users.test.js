import { test } from "node:test";
import assert from "node:assert/strict";
import { findUser, publicProfile } from "../src/users.js";

test("finds a user by id", () => {
  assert.equal(findUser(1).name, "Ada");
});

test("public profile hides email and role", () => {
  assert.deepEqual(publicProfile(findUser(2)), { id: 2, name: "Linus" });
});
