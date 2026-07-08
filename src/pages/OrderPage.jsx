import { useState, useEffect } from 'react';
import { BASE_URL } from '../api';

export default function OrderPage() {
  const [customerId, setCustomerId] = useState('');
  const [productId, setProductId] = useState('');
  const [quantity, setQuantity] = useState('');
  const [products, setProducts] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    fetch(`${BASE_URL}/products`)
      .then((res) => res.json())
      .then(setProducts)
      .catch(() => {});
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();
    setSuccessMsg('');
    setErrorMsg('');

    try {
      const res = await fetch(`${BASE_URL}/orders`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerId: Number(customerId),
          productId: Number(productId),
          quantity: Number(quantity),
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErrorMsg(data.error || 'Failed to place order');
      } else {
        setSuccessMsg(`Order placed! ID: ${data.id}, Total: $${data.totalPrice}`);
        setCustomerId('');
        setProductId('');
        setQuantity('');
      }
    } catch {
      setErrorMsg('Network error');
    }
  }

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Place an order</h2>
      <form onSubmit={handleSubmit} className="rounded border border-slate-300 bg-white p-4 shadow-sm">
        <label className="mb-3 block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Customer ID</span>
          <input
            type="number"
            value={customerId}
            onChange={(e) => setCustomerId(e.target.value)}
            required
            className="w-full rounded border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </label>
        <label className="mb-3 block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Product</span>
          <select
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
            className="w-full rounded border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="">-- Select a product --</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — ${p.price} ({p.stock} in stock)
              </option>
            ))}
          </select>
        </label>
        <label className="mb-3 block">
          <span className="mb-1 block text-sm font-medium text-slate-700">Quantity</span>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
            min="1"
            className="w-full rounded border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </label>
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Submit Order
        </button>
      </form>

      {successMsg && (
        <div className="mt-4 rounded border border-green-400 bg-green-50 px-4 py-3 text-sm text-green-700">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="mt-4 rounded border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-700">
          {errorMsg}
        </div>
      )}
    </section>
  );
}
