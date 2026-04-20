import { createContext, useContext, useState, useEffect } from 'react'
import { db } from '../utils/db.js'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  const loadCart = async () => {
    const items = await db.getCart()
    setCart(items)
  }

  useEffect(() => {
    loadCart()
  }, [])

  const addItem = async (item) => {
    await db.addToCart(item)
    loadCart()
  }

  const updateQuantity = async (id, quantity) => {
    if (quantity <= 0) {
      await db.removeFromCart(id)
    } else {
      const currentItem = cart.find(item => item.id === id)
      if (currentItem) {
        await db.addToCart({ ...currentItem, quantity })
      }
    }
    loadCart()
  }

  const removeItem = async (id) => {
    await db.removeFromCart(id)
    loadCart()
  }

  const clearCart = async () => {
    await db.clearCart()
    setCart([])
  }

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider value={{
      cart, addItem, updateQuantity, removeItem, clearCart, total, loadCart
    }}>
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => useContext(CartContext)