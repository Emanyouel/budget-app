export default function Topbar() {
  const today = new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })

  return (
    <header className="h-16 bg-white border-b border-gray-100 flex items-center justify-between px-6 shrink-0">
      <p className="text-sm text-gray-400">{today}</p>

      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-500 font-medium">Personal Account</span>
        <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-semibold text-sm select-none">
          U
        </div>
      </div>
    </header>
  )
}
