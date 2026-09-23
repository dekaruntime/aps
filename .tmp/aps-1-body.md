# APS 1 — The APS process

## Purpose

The Agentic Project Schema is Deka's constitutional reference book for agents to litigate decisions. Each entry records a decision agents must honour and cite while planning, implementing, reviewing, and maintaining the project. Agents read and cite these entries; humans rarely need to read them directly.

## Decision

**Every issue in `dekaruntime/aps` is an APS entry, and the issue is the sole source of truth for its body and state.**

- The issue number is permanently the APS number. GitHub assigns it atomically; a brief or pull request cites it as `APS N`.
- Agents write and revise entries from Sami's ideas in the issue body and its review history. The issue body is the canonical APS text.
- At most one lifecycle label is allowed: `prediscussion`, `ideation`, `discussion`, `published`, `committed`, or `abandoned`. No state label means `prediscussion`.
- `committed` records an accepted decision directly on the issue. It does not create a second Markdown record or require a promotion pull request.
- Comments remain the discussion and decision trail. Implementation pull requests link back to the APS; they do not replace it as the source of the decision.

The APS repository contains the process, validation, and automation. It does not contain copied APS bodies. deka.gg reads open APS issues directly and validates that each has at most one lifecycle label.

## Lifecycle

```text
prediscussion -> ideation -> discussion -> published -> committed
                                      \\
                                       -> abandoned
```

State can move in either direction when an issue changes. Because the issue is authoritative, a revision, demotion, or abandonment is the current decision that the website publishes after validation; there is no repository copy to reconcile.

Closing an issue means it is no longer an active APS entry and removes it from the site. Use `abandoned` when a rejected or superseded decision should remain visible.

## Authorship and amendment

Agents draft and maintain APS entries from Sami's ideas. A brief, implementation, or review that disputes an entry should cite `APS N` and propose an amendment to that issue. The approved issue body is the ruling reference; its comments preserve the context for the change.

## Rationale

An APS entry is a decision record, not source code. GitHub provides the durable identifier, author attribution, edits, labels, comments, permissions, and public history for that record. Keeping its body in the issue avoids a second source that could drift and makes the current decision available to the website without a promotion step.

Implementation remains reviewable in the repositories where it belongs. An APS entry links to implementation issues and pull requests that carry code review; the issue keeps the language and product decision in one discoverable place.
