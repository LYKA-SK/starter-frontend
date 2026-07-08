import { useEffect, useState } from 'react';
import { BASE_URL } from '../api';

export default function OrderPage() {
  const [products, setProducts] = useState([]);
  const [customerId, setCustomerId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => {});
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setSuccess('');
    setError('');

    fetch(`${BASE_URL}/orders`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        customerId: Number(customerId),
        productId: Number(productId),
        quantity: Number(quantity),
      }),
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) {
          throw new Error(data.error || 'Something went wrong');
        }
        setSuccess(`Order #${data.id} placed successfully!`);
        setCustomerId('');
        setProductId('');
        setQuantity('');
      })
      .catch((err) => setError(err.message));
  }

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Place an order</h2>

      <form onSubmit={handleSubmit} className="max-w-md space-y-4">
        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Customer ID
          </label>
          <input
            type="number"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
            className="w-full rounded border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Product
          </label>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
            className="w-full rounded border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          >
            <option value="">-- select a product --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} (${p.price}) — {p.stock} in stock
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium text-slate-700">
            Quantity
          </label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="1"
            className="w-full rounded border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
          />
        </div>

        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
        >
          Place order
        </button>

        {success && (
          <div className="rounded border border-green-300 bg-green-50 px-3 py-2 text-sm text-green-700">
            {success}
          </div>
        )}
        {error && (
          <div className="rounded border border-red-300 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}
      </form>
    </section>
  );
}