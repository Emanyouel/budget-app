export default function Button({ children, type = 'button', variant = 'primary', className = '', ...props }) {
  const base = 'inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-medium transition-colors focus:outline-none'

  const variants = {
    primary: 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700',
    ghost: 'bg-transparent text-gray-500 hover:bg-gray-100',
    danger: 'bg-red-50 text-red-500 hover:bg-red-100',
  }

  return (
    <button type={type} className={`${base} ${variants[variant] ?? variants.primary} ${className}`} {...props}>
      {children}
    </button>
  )
}
