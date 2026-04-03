import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Dashboard from './pages/Dashboard'
import Transactions from './pages/Transactions'
import Reports from './pages/Reports'

const SAMPLE_TRANSACTIONS = [
  { id: 1, amount: 320, category: 'fast_food', note: 'Burger King x2', date: '2026-03-31' },
  { id: 2, amount: 850, category: 'groceries', note: 'Weekly shop', date: '2026-04-01' },
  { id: 3, amount: 150, category: 'entertainment', note: 'Netflix + Spotify', date: '2026-04-02' },
  { id: 4, amount: 210, category: 'fast_food', note: 'KFC lunch', date: '2026-04-03' },
  { id: 5, amount: 400, category: 'food', note: 'Dinner out', date: '2026-04-03' },
]

export default function App() {
  const [transactions, setTransactions] = useState(SAMPLE_TRANSACTIONS)

  function addTransaction(tx) {
    setTransactions(prev => [{ ...tx, id: Date.now() }, ...prev])
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Dashboard transactions={transactions} onAdd={addTransaction} />} />
          <Route path="/transactions" element={<Transactions transactions={transactions} onAdd={addTransaction} />} />
          <Route path="/reports" element={<Reports transactions={transactions} />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
