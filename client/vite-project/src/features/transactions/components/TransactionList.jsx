import { getCategoryMeta } from '../transactionUtils'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })
}

export default function TransactionList({ transactions }) {
  if (!transactions.length) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-gray-300">
        <span className="text-4xl mb-3">📭</span>
        <p className="text-sm">No transactions yet.</p>
      </div>
    )
  }

  return (
    <ul className="flex flex-col gap-2">
      {transactions.map(tx => {
        const cat = getCategoryMeta(tx.category)
        return (
          <li
            key={tx.id}
            className="flex items-center justify-between px-4 py-3 rounded-xl hover:bg-gray-50 transition group"
          >
            {/* Icon + details */}
            <div className="flex items-center gap-3">
              <span className="text-xl w-8 h-8 flex items-center justify-center bg-gray-100 rounded-lg shrink-0">
                {cat.emoji}
              </span>
              <div>
                <p className="text-sm font-medium text-gray-700 leading-tight">
                  {cat.label}
                </p>
                <p className="text-xs text-gray-400 mt-0.5">
                  {tx.note ? tx.note : <span className="italic">No note</span>}
                  {' · '}
                  {formatDate(tx.date)}
                </p>
              </div>
            </div>

            {/* Amount */}
            <span className="text-sm font-semibold text-gray-800 shrink-0">
              −${tx.amount.toFixed(2)}
            </span>
          </li>
        )
      })}
    </ul>
  )
}
