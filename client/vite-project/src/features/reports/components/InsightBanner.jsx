export default function InsightBanner({ insight }) {
  const isWarning = insight?.type === 'warning'

  return (
    <div
      className={`w-full rounded-2xl px-6 py-4 flex items-center gap-4 ${
        isWarning
          ? 'bg-gradient-to-r from-orange-400 to-orange-500'
          : 'bg-gradient-to-r from-green-400 to-green-500'
      }`}
    >
      <span className="text-2xl">{isWarning ? '⚠️' : '💡'}</span>
      <p className="text-white font-medium text-sm leading-relaxed">
        {insight?.message ?? 'Loading insight…'}
      </p>
    </div>
  )
}
