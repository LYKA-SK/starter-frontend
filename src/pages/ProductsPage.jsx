import { useState, useEffect } from 'react';
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
        placeholder="Search products..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full rounded border border-slate-300 px-3 py-2 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
      />
      {loading ? (
        <p className="text-sm text-slate-500">Loading...</p>
      ) : (
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-slate-200 text-left text-sm font-semibold text-slate-700">
              <th className="border border-slate-300 px-3 py-2">ID</th>
              <th className="border border-slate-300 px-3 py-2">Name</th>
              <th className="border border-slate-300 px-3 py-2">Price</th>
              <th className="border border-slate-300 px-3 py-2">Stock</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={p.id} className={i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                <td className="border border-slate-300 px-3 py-2">{p.id}</td>
                <td className="border border-slate-300 px-3 py-2">{p.name}</td>
                <td className="border border-slate-300 px-3 py-2">${p.price}</td>
                <td className="border border-slate-300 px-3 py-2">
                  {p.stock > 0 ? (
                    <span className="inline-block rounded bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">
                      {p.stock} in stock
                    </span>
                  ) : (
                    <span className="inline-block rounded bg-red-100 px-2 py-0.5 text-xs font-medium text-red-700">
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
