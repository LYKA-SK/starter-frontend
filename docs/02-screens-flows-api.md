# 02 — Screens, user flows & API reference

## Screens (3 tabs — shell and navigation already work)

```
┌─────────────────────────────────────────────────────────┐
│ Toul Kork Mini-Mart      [Products] [Customer] [Order]  │
├─────────────────────────────────────────────────────────┤
│ PRODUCTS                                                 │
│  [ search by name…                                    ] │
│  ┌────┬───────────────────────┬───────┬───────────────┐ │
│  │ ID │ Name                  │ Price │ Stock         │ │
│  │ 2  │ Jasmine Rice 5kg      │ $8    │ ● 20 in stock │ │
│  │ 5  │ Palm Sugar 1kg        │ $3    │ ● Out of stock│ │
│  └────┴───────────────────────┴───────┴───────────────┘ │
└─────────────────────────────────────────────────────────┘

CUSTOMER [ customer id ] [Load]
         ┌ Chan Mealea · mealea@example.com · 098765432 ┐
         │ Product              Qty  Total   Status     │
         │ Instant Noodles Box   5    $5    PENDING [Cancel]
         │ Coca-Cola 6-Pack      3   $18   CANCELLED    │
         └────────────────────────────────────────────────┘

ORDER    Customer id [   ]
         Product    [ — choose a product — ▼ ]
         Quantity   [   ]
         [ Order ]
         ✔ green success box: "Ordered! Total: $…"
         ✖ red error box: message from the API
```

## User flows (used for grading)

- **Flow A — look up:** Products tab → type `rice` → table shows only
  *Jasmine Rice 5kg*.
- **Flow B — order:** Order tab → customer `3`, product *Coca-Cola 6-Pack*,
  quantity `2` → Order → green success box "Ordered! Total: $12" →
  Products tab shows Coca-Cola 6-Pack stock went down by 2 (30 → 28). Then:
  product *Palm Sugar 1kg* (0 stock), quantity `1` → red box "Not enough
  stock"; customer `999` → red box "Customer not found".
- **Flow C — cancel:** Customer tab → load customer `1` (Heng Sokha) → 1
  PAID order (no Cancel button — only PENDING orders can be cancelled).
  Load customer `2` (Chan Mealea) → 1 PENDING order (Instant Noodles Box)
  and 1 CANCELLED order → click Cancel on the PENDING row → badge flips to
  CANCELLED, button disappears; Products tab shows Instant Noodles Box
  stock went up by 5 (50 → 55).

## API reference (base `http://localhost:3000/api`)

| Method | Path                   | Body                                    | Success                                              | Errors        |
| ------ | ---------------------- | ---------------------------------------- | ----------------------------------------------------- | ------------- |
| GET    | `/products`            | —                                         | `[{ id, name, price, stock }]`                        | —             |
| GET    | `/products?search=txt` | —                                         | same, filtered by name                                | —             |
| GET    | `/customers/:id`       | —                                         | customer + `orders[]`, each has `product`             | 404           |
| POST   | `/orders`               | `{ customerId, productId, quantity }`     | 201, order with `status: PENDING` and `totalPrice`     | 400, 404, 409 |
| PUT    | `/orders/:id/cancel`    | —                                         | 200, order with `status: CANCELLED`                    | 404, 409      |

Every error response is JSON: `{ "error": "message" }`.
