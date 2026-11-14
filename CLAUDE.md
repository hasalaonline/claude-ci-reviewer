# claude-ci-reviewer

A small Node.js demo app (ES modules, tests with `node --test`).

## Rules for this repo

- User records contain private fields (`email`, `role`). Anything that leaves
  `src/users.js` must go through `publicProfile()` first.
- Every exported function needs at least one test in `test/`.
