import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Sun, Moon, ShoppingCart, Heart } from 'lucide-react'
import { useCart } from '../context/CartContext.jsx'
import { useTheme } from '../context/ThemeContext.jsx'

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { total, cart } = useCart()
  const { darkMode, toggleDarkMode } = useTheme()
  const location = useLocation()

  return (
    <nav className="fixed top-0 w-full z-50 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md border-b border-gray-200 dark:border-slate-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 font-bold text-2xl bg-gradient-to-r from-orange-600 to-red-600 bg-clip-text text-transparent">
            🍕 MIU FoodHub
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/" className={`py-2 px-3 rounded-lg font-medium transition-colors ${location.pathname === '/' ? 'text-orange-600 bg-orange-50 dark:bg-orange-500/10' : 'hover:text-orange-600'}`}>
              Home
            </Link>
            <Link to="/menu" className={`py-2 px-3 rounded-lg font-medium transition-colors ${location.pathname === '/menu' ? 'text-orange-600 bg-orange-50 dark:bg-orange-500/10' : 'hover:text-orange-600'}`}>
              Menu
            </Link>
            <Link to="/orders" className="py-2 px-3 rounded-lg font-medium transition-colors hover:text-orange-600 relative">
              Orders
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">3</span>
            </Link>
            
            {/* Theme Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800 transition-colors"
              title={darkMode ? "Light mode" : "Dark mode"}
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* Cart */}
            <Link to="/cart" className="relative p-2 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-500/10 transition-colors group">
              <ShoppingCart size={24} className="group-hover:text-orange-600" />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center font-bold">
                  {cart.length}
                </span>
              )}
              {total > 0 && (
                <span className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-orange-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  EGP {total.toFixed(1)}
                </span>
              )}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-slate-800"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block py-2 px-3 rounded-lg font-medium hover:text-orange-600">Home</Link>
            <Link to="/menu" className="block py-2 px-3 rounded-lg font-medium hover:text-orange-600">Menu</Link>
            <Link to="/orders" className="block py-2 px-3 rounded-lg font-medium hover:text-orange-600">Orders</Link>
            <div className="flex items-center gap-2 py-2 px-3">
              <button onClick={toggleDarkMode} className="p-2 hover:bg-gray-100 dark:hover:bg-slate-800 rounded-lg">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <Link to="/cart" className="flex items-center gap-2 p-2 hover:bg-orange-50 rounded-lg">
                <ShoppingCart size={20} />
                Cart ({cart.length})
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}