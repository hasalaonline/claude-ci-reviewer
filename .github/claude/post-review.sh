#!/usr/bin/env bash
# Turn Claude's JSON review into one sticky PR comment, then fail on high-severity findings.
set -euo pipefail
review=$(jq -e '.structured_output' review.json) || {
  echo "Claude returned no structured review:"; jq -r '.result // .' review.json; exit 1; }

marker='<!-- claude-ci-review -->'
body=$(jq -r --arg m "$marker" '
  def icon: {high: "🔴", medium: "🟠", low: "🟡"}[.];
  [ $m,
    "## Claude review: \(.verdict | gsub("_"; " "))",
    "",
    .summary,
    "",
    (if (.findings | length) == 0 then "No issues found. ✅"
     else (.findings[] | "- \(.severity | icon) **\(.title)**: `\(.file)\(if .line then ":\(.line)" else "" end)`\n  \(.detail)")
     end)
  ] | join("\n")' <<<"$review")

# Update our previous comment if there is one, so the PR doesn't fill up with reviews.
existing=$(gh api "repos/$REPO/issues/$PR/comments" --paginate \
  --jq "[.[] | select(.body | startswith(\"$marker\"))] | last | .id // empty")
if [ -n "$existing" ]; then
  gh api -X PATCH "repos/$REPO/issues/comments/$existing" -f body="$body" >/dev/null
else
  gh pr comment "$PR" --repo "$REPO" --body "$body" >/dev/null
fi

high=$(jq '[.findings[] | select(.severity == "high")] | length' <<<"$review")
if [ "$high" -gt 0 ]; then
  echo "::error::Claude found $high high-severity issue(s). See the PR comment."
  exit 1
fi
echo "Review posted. No high-severity issues."
