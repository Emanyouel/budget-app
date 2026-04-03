export const CATEGORIES = [
  { value: 'food', label: 'Food', emoji: '🍽️' },
  { value: 'fast_food', label: 'Fast Food', emoji: '🍔' },
  { value: 'groceries', label: 'Groceries', emoji: '🛒' },
  { value: 'entertainment', label: 'Entertainment', emoji: '🎬' },
  { value: 'transport', label: 'Transport', emoji: '🚗' },
  { value: 'health', label: 'Health', emoji: '💊' },
  { value: 'shopping', label: 'Shopping', emoji: '🛍️' },
  { value: 'utilities', label: 'Utilities', emoji: '💡' },
  { value: 'other', label: 'Other', emoji: '📦' },
]

export function getCategoryMeta(value) {
  return CATEGORIES.find(c => c.value === value) ?? { value, label: value, emoji: '📦' }
}

/**
 * Returns transactions that fall within the current ISO week (Mon–Sun).
 */
export function getThisWeekTransactions(transactions) {
  const now = new Date()
  const day = now.getDay() // 0 = Sun
  const diffToMon = day === 0 ? -6 : 1 - day
  const monday = new Date(now)
  monday.setDate(now.getDate() + diffToMon)
  monday.setHours(0, 0, 0, 0)

  return transactions.filter(tx => new Date(tx.date) >= monday)
}

/**
 * Returns transactions from the current calendar month.
 */
export function getThisMonthTransactions(transactions) {
  const now = new Date()
  return transactions.filter(tx => {
    const d = new Date(tx.date)
    return d.getMonth() === now.getMonth() && d.getFullYear() === now.getFullYear()
  })
}

/**
 * Returns the category with the highest total spend from a list of transactions.
 */
export function getTopCategory(transactions) {
  if (!transactions.length) return null
  const totals = {}
  for (const tx of transactions) {
    totals[tx.category] = (totals[tx.category] ?? 0) + tx.amount
  }
  const top = Object.entries(totals).sort((a, b) => b[1] - a[1])[0]
  return top ? getCategoryMeta(top[0]) : null
}

/**
 * Generates a weekly insight message based on spending patterns.
 * Rule: fast_food spending > 500 → warning, otherwise positive.
 */
export function getWeeklyInsight(transactions) {
  const weekly = getThisWeekTransactions(transactions)

  const fastFoodTotal = weekly
    .filter(tx => tx.category === 'fast_food')
    .reduce((sum, tx) => sum + tx.amount, 0)

  const totalSpend = weekly.reduce((sum, tx) => sum + tx.amount, 0)

  if (fastFoodTotal > 500) {
    return {
      type: 'warning',
      message: `This week you spent $${fastFoodTotal.toFixed(2)} on fast food 🍔 — consider cooking at home to save more.`,
    }
  }

  if (totalSpend === 0) {
    return {
      type: 'success',
      message: "No spending logged this week yet. Great start! 🌱",
    }
  }

  return {
    type: 'success',
    message: `You're managing your spending well this week ✅ — total so far: $${totalSpend.toFixed(2)}.`,
  }
}
