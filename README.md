# Deka APS

The Agentic Project Schema is the constitutional reference book agents use to
litigate decisions in Deka. Each entry records a decision agents must honour
and cite when planning, implementing, reviewing, and maintaining the project.
Agents read and cite these entries; humans rarely need to read them directly.

GitHub assigns each entry its permanent number: **APS N is issue N**. A brief
or pull request cites `APS N`. Agents write and revise entries from Sami's
ideas in the issue body and its review history. When an implementation or a
new argument disputes an entry, amend that entry; the approved issue body is
the ruling reference.

The issue body and its lifecycle label are the canonical record. The website
publishes open entries directly from GitHub; the repository contains the
process, validation, and automation, not copied APS bodies. This avoids
parallel versions that could drift.

## States

Every entry may have at most one lifecycle label:

    prediscussion → ideation → discussion → published → committed
                                          ↘ abandoned

No lifecycle label means `prediscussion`. `committed` records an accepted
decision on the issue. State can move in either direction as the design
changes. Closing an issue removes it from the published index; use `abandoned`
when a rejected or superseded decision should remain visible.

See [APS 1](https://github.com/dekaruntime/aps/issues/1) for the full process.
