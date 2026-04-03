import { useState } from 'react'
import Button from '../../../components/ui/Button'
import { CATEGORIES } from '../transactionUtils'

const EMPTY_FORM = {
  amount: '',
  category: 'food',
  note: '',
  date: new Date().toISOString().split('T')[0],
}

export default function TransactionForm({ onAdd }) {
  const [form, setForm] = useState(EMPTY_FORM)
  const [error, setError] = useState('')

  function handleChange(e) {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleSubmit(e) {
    e.preventDefault()
    const amount = parseFloat(form.amount)
    if (!form.amount || isNaN(amount) || amount <= 0) {
      setError('Enter a valid amount.')
      return
    }
    onAdd({ ...form, amount })
    setForm(EMPTY_FORM)
    setError('')
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Amount */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Amount ($)</label>
        <input
          type="number"
          name="amount"
          value={form.amount}
          onChange={handleChange}
          placeholder="0.00"
          min="0"
          step="0.01"
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
        />
        {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
      </div>

      {/* Category */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition bg-white"
        >
          {CATEGORIES.map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.emoji} {cat.label}
            </option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
        <input
          type="date"
          name="date"
          value={form.date}
          onChange={handleChange}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
        />
      </div>

      {/* Note */}
      <div>
        <label className="block text-xs font-medium text-gray-500 mb-1">Note (optional)</label>
        <input
          type="text"
          name="note"
          value={form.note}
          onChange={handleChange}
          placeholder="e.g. Lunch at work"
          maxLength={80}
          className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 focus:border-transparent transition"
        />
      </div>

      <Button type="submit" className="w-full mt-1">
        + Add Transaction
      </Button>
    </form>
  )
}
