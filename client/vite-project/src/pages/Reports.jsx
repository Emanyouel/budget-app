import Card from '../components/ui/card'
import InsightBanner from '../features/reports/components/InsightBanner'
import {
  getWeeklyInsight,
  getThisWeekTransactions,
  getThisMonthTransactions,
  getCategoryMeta,
} from '../features/transactions/transactionUtils'

function CategoryBar({ label, emoji, amount, max }) {
  const pct = max > 0 ? Math.min((amount / max) * 100, 100) : 0
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-600 font-medium">{emoji} {label}</span>
        <span className="text-gray-500">${amount.toFixed(2)}</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div
          className="bg-green-400 h-2 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}

export default function Reports({ transactions }) {
  const insight = getWeeklyInsight(transactions)
  const monthlyTx = getThisMonthTransactions(transactions)
  const weeklyTx = getThisWeekTransactions(transactions)

  // Spend per category this month
  const categoryTotals = {}
  for (const tx of monthlyTx) {
    categoryTotals[tx.category] = (categoryTotals[tx.category] ?? 0) + tx.amount
  }
  const sorted = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])
  const maxAmount = sorted[0]?.[1] ?? 0

  const weeklyTotal = weeklyTx.reduce((s, tx) => s + tx.amount, 0)
  const monthlyTotal = monthlyTx.reduce((s, tx) => s + tx.amount, 0)
  const dailyAvg = monthlyTx.length
    ? monthlyTotal / new Date().getDate()
    : 0

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Reports</h1>
        <p className="text-sm text-gray-400 mt-0.5">Spending insights at a glance</p>
      </div>

      <InsightBanner insight={insight} />

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card>
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Weekly Total</p>
          <p className="text-2xl font-bold text-green-500">${weeklyTotal.toFixed(2)}</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Monthly Total</p>
          <p className="text-2xl font-bold text-orange-400">${monthlyTotal.toFixed(2)}</p>
        </Card>
        <Card>
          <p className="text-xs text-gray-400 uppercase tracking-wide font-medium mb-1">Daily Average</p>
          <p className="text-2xl font-bold text-blue-400">${dailyAvg.toFixed(2)}</p>
        </Card>
      </div>

      <Card className="flex flex-col gap-5">
        <h2 className="text-sm font-semibold text-gray-700">Spending by Category — This Month</h2>

        {sorted.length === 0 && (
          <p className="text-sm text-gray-400 py-4 text-center">No data for this month yet.</p>
        )}

        {sorted.map(([cat, amount]) => {
          const meta = getCategoryMeta(cat)
          return (
            <CategoryBar
              key={cat}
              label={meta.label}
              emoji={meta.emoji}
              amount={amount}
              max={maxAmount}
            />
          )
        })}
      </Card>
    </div>
  )
}
