# Toul Kork Mini-Mart — Session 2 Starter (S3, S4)

A React + TailwindCSS frontend for the **Mini Store API** you know
from Session 1. The app shell (header + tab navigation) already works —
your tasks are inside the three page files.

## 1. Run the provided backend first

You received the finished Mini Store API as a separate project:

```bash
cd <backend-folder>
npm install
cp .env.example .env        # set your PostgreSQL DATABASE_URL
npx prisma migrate dev      # creates the tables
npm run seed                # loads the fixed test data
npm run dev                 # API on http://localhost:3000
```

**Do not change any backend code.** Reset its data anytime with `npm run seed`.

## 2. Run this frontend

```bash
npm install
npm run dev                 # opens http://localhost:5173
```

## 3. Your tasks (100 pts)

Open `docs/03-requirements.md`. The TODO blocks are in:

| File                          | Tasks            |
| ------------------------------ | ---------------- |
| `src/pages/ProductsPage.jsx`  | S3.1, S4.1, S4.2 |
| `src/pages/OrderPage.jsx`     | S3.2, S4.4       |
| `src/pages/CustomerPage.jsx`  | S3.3, S4.3, S4.5 |

`src/api.js` has the API base URL. Commit after each task, push before
time is up.
