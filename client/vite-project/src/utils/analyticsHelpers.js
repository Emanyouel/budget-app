// utils/analyticsHelpers.js
export function getWeeklyInsight(transactions) {
  const fastFood = transactions
    .filter(t => t.category === "fast_food")
    .reduce((sum, t) => sum + t.amount, 0);

  if (fastFood > 500) {
    return "This week you spent a lot on fast food 🍔";
  }

  return "You're managing your spending well this week ✅";
}