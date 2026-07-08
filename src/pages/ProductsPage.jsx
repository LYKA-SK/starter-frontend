import { useEffect, useState } from 'react';
import { BASE_URL } from '../api';

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    setLoading(true);
    const url = search
      ? `${BASE_URL}/products?search=${encodeURIComponent(search)}`
      : `${BASE_URL}/products`;

    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [search]);

  return (
    <section>
      <h2 className="mb-4 text-lg font-semibold text-slate-800">Products</h2>

      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search by name..."
        className="mb-4 w-full rounded border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none"
      />

      {loading ? (
        <p className="text-sm text-slate-500">Loading...</p>
      ) : (
        <table className="w-full border-collapse overflow-hidden rounded border border-slate-200">
          <thead>
            <tr className="bg-slate-100 text-left text-sm text-slate-600">
              <th className="px-3 py-2">ID</th>
              <th className="px-3 py-2">Name</th>
              <th className="px-3 py-2">Price</th>
              <th className="px-3 py-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr
                key={p.id}
                className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}
              >
                <td className="px-3 py-2">{p.id}</td>
                <td className="px-3 py-2">{p.name}</td>
                <td className="px-3 py-2">${p.price}</td>
                <td className="px-3 py-2">
                  {p.stock > 0 ? (
                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                      {p.stock} in stock
                    </span>
                  ) : (
                    <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-medium text-red-700">
                      Out of stock
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
}