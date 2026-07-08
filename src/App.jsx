import { useState } from 'react';
import ProductsPage from './pages/ProductsPage';
import CustomerPage from './pages/CustomerPage';
import OrderPage from './pages/OrderPage';

const TABS = ['Products', 'Customer', 'Order'];

function App() {
  const [tab, setTab] = useState('Products');

  return (
    <div className="min-h-screen bg-slate-100">
      <header className="bg-slate-800 text-white">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <h1 className="text-xl font-bold">Toul Kork Mini-Mart</h1>
          <nav className="flex gap-2">
            {TABS.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`rounded px-3 py-1.5 text-sm font-medium ${
                  tab === t ? 'bg-white text-slate-800' : 'hover:bg-slate-700'
                }`}
              >
                {t}
              </button>
            ))}
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-6">
        {tab === 'Products' && <ProductsPage />}
        {tab === 'Customer' && <CustomerPage />}
        {tab === 'Order' && <OrderPage />}
      </main>
    </div>
  );
}

export default App;
