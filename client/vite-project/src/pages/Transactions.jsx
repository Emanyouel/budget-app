import Card from '../components/ui/card'
import TransactionForm from '../features/transactions/components/TransactionForm'
import TransactionList from '../features/transactions/components/TransactionList'

export default function Transactions({ transactions, onAdd }) {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-gray-800">Transactions</h1>
        <p className="text-sm text-gray-400 mt-0.5">All your recorded spending</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Full list */}
        <Card className="lg:col-span-2 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-gray-700">All Transactions</h2>
            <span className="text-xs text-gray-400">{transactions.length} entries</span>
          </div>
          <TransactionList transactions={transactions} />
        </Card>

        {/* Add new */}
        <Card className="flex flex-col gap-4 h-fit">
          <h2 className="text-sm font-semibold text-gray-700">Add Transaction</h2>
          <TransactionForm onAdd={onAdd} />
        </Card>
      </div>
    </div>
  )
}
