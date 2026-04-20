import { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { ThemeProvider } from './context/ThemeContext.jsx'
import { CartProvider } from './context/CartContext.jsx'
import Navbar from './components/Navbar.jsx'
import PWAInstall from './components/PWAInstall.jsx'
import Home from './pages/Home.jsx'
import Menu from './pages/Menu.jsx'
import Cart from './pages/Cart.jsx'
import Orders from './pages/Orders.jsx'
import RestaurantDetail from './pages/RestaurantDetail.jsx'
import { db } from './utils/db.js'
import './App.css'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

function AppContent() {
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js')
    }
    // Pre-cache menus
    db.cacheMenus(window.MIU_RESTAURANTS || [])
  }, [])

  return (
    <div className="min-h-screen">
      <Router>
        <ScrollToTop />
        <Navbar />
        <main className="pt-20">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/restaurant/:id" element={<RestaurantDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/orders" element={<Orders />} />
          </Routes>
        </main>
        <PWAInstall />
      </Router>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </ThemeProvider>
  )
}