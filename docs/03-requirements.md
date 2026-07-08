# 03 — Requirements (100 pts)

Work top-to-bottom: build all static pages first (S3), then make them
dynamic (S4). Commit after each task.

## S3 — Static UI with TailwindCSS (≈50 min, 45 pts)

Use the `SAMPLE_*` data in each file. Exact colors are your choice, but
every listed element and state must be clearly styled and distinct.

| Task | File | Requirements | Pts |
| ---- | ---- | ------------ | --- |
| S3.1 | `ProductsPage.jsx` | Search input (border + focus state); table with styled header row and borders/zebra rows; columns id, name, price (`$` amount), stock badge — green when stock > 0, red when stock = 0 | 15 |
| S3.2 | `OrderPage.jsx` | Form card: labeled number input for customer id, labeled product `<select>` (sample options), labeled quantity input, submit button with hover state; green success box + red error box (both hardcoded visible for now) | 15 |
| S3.3 | `CustomerPage.jsx` | Customer-id input + Load button; customer info card (name, email, phone); orders table with product name, quantity, total price, status badge (PENDING yellow, PAID green, CANCELLED gray), Cancel button only on PENDING rows | 15 |

## S4 — Dynamic UI (≈55 min, 55 pts)

Replace the sample data with real API calls (`fetch`, base URL in
`src/api.js`).

| Task | File | Requirements | Pts |
| ---- | ---- | ------------ | --- |
| S4.1 | `ProductsPage.jsx` | Fetch `GET /products` on mount; "Loading…" while pending; real rows in the table | 10 |
| S4.2 | `ProductsPage.jsx` | Search input refetches `GET /products?search=<text>` (on change or on submit) | 10 |
| S4.3 | `CustomerPage.jsx` | Load button fetches `GET /customers/<id>`; card + orders render from the response; unknown id → the API error message in a red box, no card | 10 |
| S4.4 | `OrderPage.jsx` | Select filled from `GET /products`; submit posts `{ customerId, productId, quantity }` as numbers; success → green success box + form cleared; 400/404/409 → API error message in red box; only one box visible at a time | 15 |
| S4.5 | `CustomerPage.jsx` | Cancel button calls `PUT /orders/<id>/cancel`, then reloads the customer (badge updates, button disappears) | 10 |

**Buffer + submission: ~15 min.** Partial work still earns points — commit
and push even unfinished tasks.
