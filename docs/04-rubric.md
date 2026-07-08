# 04 — Rubric checklist (grader)

Setup per student: clone → `npm install` → `npm run dev` (backend already
running and freshly seeded: `npm run seed`). Walk flows A/B/C from
doc 02. Award partial points per row where noted.

## S3 — static (45 pts) — judge markup/styling (data may still be sample or live)

| # | Check | Pts |
| - | ----- | --- |
| S3.1a | Search input present and styled (border, focus visible) | 5 |
| S3.1b | Table: styled header + borders/zebra, 4 columns correct (price shown as `$` amount) | 5 |
| S3.1c | Stock badge, green when stock > 0, red when stock = 0 | 5 |
| S3.2a | Labeled customer input + labeled product select + labeled quantity input, in a styled card | 7 |
| S3.2b | Submit button with hover state; success + error boxes styled green/red | 8 |
| S3.3a | Id input + Load button styled; customer info card | 7 |
| S3.3b | Orders table with quantity + total, status badge colors (PENDING/PAID/CANCELLED), Cancel only on PENDING | 8 |

## S4 — dynamic (55 pts) — walk the flows against the seeded API

| # | Check (fresh seed) | Pts |
| - | ------------------ | --- |
| S4.1a | Products tab shows the 5 seeded products (not sample data) | 7 |
| S4.1b | "Loading…" appears while fetching | 3 |
| S4.2 | Typing `rice` → only *Jasmine Rice 5kg* remains | 10 |
| S4.3a | Load customer `2` → Chan Mealea card + 2 orders (1 PENDING, 1 CANCELLED) | 7 |
| S4.3b | Load customer `999` → red box "Customer not found", no card | 3 |
| S4.4a | Select lists the 5 real products | 3 |
| S4.4b | Customer 3 + *Coca-Cola 6-Pack*, qty 2 → green success box; Products tab stock 30 → 28 | 7 |
| S4.4c | *Palm Sugar 1kg* qty 1 → red "Not enough stock"; customer 999 → red "Customer not found"; boxes never both visible | 5 |
| S4.5a | Cancel on customer 2's *Instant Noodles Box* (PENDING) → badge CANCELLED, button gone | 7 |
| S4.5b | Products tab: Instant Noodles Box stock went from 50 to 55 | 3 |

**Total: /100** · Commit history shows one commit per task (note, don't
score). Re-seed the backend between students.
