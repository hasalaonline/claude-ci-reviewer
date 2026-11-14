# claude-ci-reviewer

Automated pull request reviews with `claude -p` in GitHub Actions. No API key needed: it runs on a Claude Pro, Max, Team or Enterprise subscription.

On every pull request, the workflow:

1. pipes the PR diff into `claude -p` with a review prompt,
2. asks for the answer as JSON that matches a schema (`--json-schema`),
3. posts it as **one sticky comment** that updates on each push,
4. fails the check if Claude finds a **high-severity** issue.

## Files

| File | What it does |
| --- | --- |
| `.github/workflows/claude-review.yml` | The workflow |
| `.github/claude/review-prompt.md` | What Claude looks for |
| `.github/claude/review-schema.json` | The shape of the answer |
| `.github/claude/post-review.sh` | Formats the comment and applies the gate |

## Set it up in your repo

1. Copy the `.github/` folder into your repository.
2. On your machine, run `claude setup-token` and copy the token it prints.
3. In your repo on GitHub, go to **Settings → Secrets and variables → Actions → New repository secret**. Name it `CLAUDE_CODE_OAUTH_TOKEN` and paste the token.
4. Open a pull request.

Using an API key instead? Save it as `ANTHROPIC_API_KEY` and change the `env:` line in the "Ask Claude" step to `ANTHROPIC_API_KEY: ${{ secrets.ANTHROPIC_API_KEY }}`.

## Notes

- Runs count against your Claude subscription's usage. `--model sonnet` and `--max-turns 10` keep each review light.
- Claude only gets read-only tools (`Read`, `Grep`, `Glob`). It can't run commands or edit files.
- PRs from forks are skipped, because GitHub doesn't pass your secrets to them.
- The subscription token is tied to your own account. For a team or organization, use an API key.
