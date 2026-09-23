#!/usr/bin/env bun
/**
 * Validate the canonical APS records: open GitHub issues in this repository.
 *
 * The issue body and at most one lifecycle label are the only source of an
 * APS entry's text and state. There are intentionally no checked-in copies to
 * reconcile with the issue API.
 */
const REPO = process.env.GITHUB_REPOSITORY ?? 'dekaruntime/aps'
export const STATES = [
  'prediscussion',
  'ideation',
  'discussion',
  'published',
  'committed',
  'abandoned',
] as const

type Issue = {
  number: number
  title: string
  body: string | null
  labels: Array<{ name: string } | string>
  pull_request?: unknown
}

const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN
const headers: Record<string, string> = {
  accept: 'application/vnd.github+json',
  'user-agent': 'dekaruntime-aps-validate',
}
if (token) headers.authorization = `Bearer ${token}`

async function openIssues(): Promise<Issue[]> {
  const issues: Issue[] = []
  for (let page = 1; ; page++) {
    const response = await fetch(
      `https://api.github.com/repos/${REPO}/issues?state=open&per_page=100&page=${page}`,
      { headers },
    )
    if (!response.ok) {
      throw new Error(`GitHub API returned ${response.status} ${response.statusText}`)
    }

    const batch = (await response.json()) as Issue[]
    issues.push(...batch)
    if (batch.length < 100) return issues
  }
}

const problems: string[] = []
let entries: Issue[] = []

try {
  entries = (await openIssues()).filter((issue) => !issue.pull_request)
} catch (error) {
  console.error(`\n✗ could not read canonical APS issues: ${(error as Error).message}\n`)
  process.exit(1)
}

for (const entry of entries) {
  if (entry.title.trim().length < 3) {
    problems.push(`APS #${entry.number}: title must contain at least 3 characters`)
  }
  if (!entry.body?.trim()) {
    problems.push(`APS #${entry.number}: issue body is empty`)
  }

  const labels = entry.labels.map((label) => (typeof label === 'string' ? label : label.name))
  const states = labels.filter((label) => (STATES as readonly string[]).includes(label))
  if (states.length > 1) {
    problems.push(
      `APS #${entry.number}: expected at most one lifecycle label ` +
        `(${STATES.join(', ')}), found ${states.join(', ')}`,
    )
  }
}

if (problems.length > 0) {
  console.error(`\n✗ ${problems.length} APS issue problem(s):\n`)
  for (const problem of problems) console.error(`  ${problem}`)
  console.error('')
  process.exit(1)
}

console.log(`✓ ${entries.length} open APS issue(s) valid`)
