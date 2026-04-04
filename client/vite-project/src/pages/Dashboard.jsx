import Card from '../components/ui/card'
import InsightBanner from '../features/reports/components/InsightBanner'
import TransactionForm from '../features/transactions/components/TransactionForm'
import TransactionList from '../features/transactions/components/TransactionList'
import {
  getWeeklyInsight,
  getThisWeekTransactions,
  getThisMonthTransactions,
  getTopCategory,
} from '../features/transactions/transactionUtils'

function SummaryCard({ label, value, sub, accent }) {
  const accents = {
    green: 'text-green-500',
    orange: 'text-orange-400',
    blue: 'text-blue-400',
  }
  return (
    <Card className="flex flex-col gap-1">
      <p className="text-xs text-gray-400 font-medium uppercase tracking-wide">{label}</p>
      <p className={`text-2xl font-bold ${accents[accent] ?? 'text-gray-800'}`}>{value}</p>
      {sub && <p className="text-xs text-gray-400">{sub}</p>}
    </Card>
  )
}

export default function Dashboard({ transactions, onAdd }) {
  const insight = getWeeklyInsight(transactions)

  const weeklyTotal = getThisWeekTransactions(transactions)
    .reduce((s, tx) => s + tx.amount, 0)

  const monthlyTotal = getThisMonthTransactions(transactions)
    .reduce((s, tx) => s + tx.amount, 0)

  const topCat = getTopCategory(getThisMonthTransactions(transactions))

  return (
    <div className="flex flex-col gap-6">
      {/* Insight Banner */}
      <InsightBanner insight={insight} />

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <SummaryCard
          label="Weekly Spend"
          value={`$${weeklyTotal.toFixed(2)}`}
          sub="Current week"
          accent="green"
        />
        <SummaryCard
          label="Monthly Spend"
          value={`$${monthlyTotal.toFixed(2)}`}
          sub="This month"
          accent="orange"
        />
        <SummaryCard
          label="Top Category"
          value={topCat ? `${topCat.emoji} ${topCat.label}` : '—'}
          sub="By spend this month"
          accent="blue"
        />
      </div>

      {/* Bottom section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Transactions */}
        <Card className="flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">Recent Transactions</h2>
            <span className="text-xs text-gray-400">{transactions.length} total</span>
          </div>
          <TransactionList transactions={transactions.slice(0, 8)} />
        </Card>

        {/* Quick Add */}
        <Card className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-700">Quick Add</h2>
          <TransactionForm onAdd={onAdd} />
        </Card>
      </div>
    </div>
  )
}
