import { useState } from 'react';
import { BASE_URL } from '../api';

export default function CustomerPage() {
  const [customerId, setCustomerId] = useState('');
  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState('');

  async function loadCustomer() {
    setError('');
    setCustomer(null);

    try {
      const res = await fetch(`${BASE_URL}/customers/${Number(customerId)}`);
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Customer not found');
      } else {
        setCustomer(data);
      }
    } catch {
      setError('Network error');
    }
  }

  async function cancelOrder(orderId) {
    try {
      await fetch(`${BASE_URL}/orders/${orderId}/cancel`, { method: 'PUT' });
      loadCustomer();
    } catch {
      setError('Failed to cancel order');
    }
  }

  const statusBadge = (status) => {
    const styles = {
      PENDING: 'bg-yellow-100 text-yellow-700',
      PAID: 'bg-green-100 text-green-700',
      CANCELLED: 'bg-gray-100 text-gray-600',
    };
    return (
      <span
        className={`inline-block rounded px-2 py-0.5 text-xs font-medium ${styles[status] || 'bg-gray-100 text-gray-600'}`}
      >
        {status}
      </span>
    );
  };

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Customer lookup</h2>

      <div className="mb-4 flex gap-2">
        <input
          type="number"
          placeholder="Customer ID"
          value={customerId}
          onChange={(e) => setCustomerId(e.target.value)}
          className="w-40 rounded border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
        />
        <button
          onClick={loadCustomer}
          className="rounded bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
        >
          Load
        </button>
      </div>

      {error && (
        <div className="mb-4 rounded border border-red-400 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {customer && (
        <>
          <div className="mb-4 rounded border border-slate-300 bg-white p-4 shadow-sm">
            <p className="text-sm text-slate-500">Name:</p>
            <p className="mb-2 font-medium">{customer.name}</p>
            <p className="text-sm text-slate-500">Email:</p>
            <p className="mb-2 font-medium">{customer.email}</p>
            <p className="text-sm text-slate-500">Phone:</p>
            <p className="font-medium">{customer.phone || '—'}</p>
          </div>

          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-slate-200 text-left text-sm font-semibold text-slate-700">
                <th className="border border-slate-300 px-3 py-2">Product</th>
                <th className="border border-slate-300 px-3 py-2">Qty</th>
                <th className="border border-slate-300 px-3 py-2">Total</th>
                <th className="border border-slate-300 px-3 py-2">Status</th>
                <th className="border border-slate-300 px-3 py-2">Action</th>
              </tr>
            </thead>
            <tbody>
              {customer.orders.map((o, i) => (
                <tr key={o.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                  <td className="border border-slate-300 px-3 py-2">{o.product.name}</td>
                  <td className="border border-slate-300 px-3 py-2">{o.quantity}</td>
                  <td className="border border-slate-300 px-3 py-2">${o.totalPrice}</td>
                  <td className="border border-slate-300 px-3 py-2">{statusBadge(o.status)}</td>
                  <td className="border border-slate-300 px-3 py-2">
                    {o.status === 'PENDING' && (
                      <button
                        onClick={() => cancelOrder(o.id)}
                        className="rounded bg-red-500 px-2 py-1 text-xs font-medium text-white hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </section>
  );
}
