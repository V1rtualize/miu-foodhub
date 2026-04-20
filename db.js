import { openDB } from 'idb'

const DB_NAME = 'MIUFoodHubDB'
const DB_VERSION = 3

const dbPromise = openDB(DB_NAME, DB_VERSION, {
  upgrade(db, oldVersion) {
    if (oldVersion < 1) {
      db.createObjectStore('cart', { keyPath: 'id' })
      db.createObjectStore('favorites', { keyPath: 'id' })
      db.createObjectStore('orders', { keyPath: 'id', autoIncrement: true })
      db.createObjectStore('menus', { keyPath: 'restaurantId' })
    }
  }
})

export const db = {
  async getCart() {
    return await (await dbPromise).getAll('cart')
  },
  
  async addToCart(item) {
    const tx = await dbPromise.transaction('cart', 'readwrite')
    await tx.store.put({ ...item, timestamp: Date.now() })
    await tx.done
  },
  
  async removeFromCart(id) {
    const tx = await dbPromise.transaction('cart', 'readwrite')
    await tx.store.delete(id)
    await tx.done
  },
  
  async clearCart() {
    const tx = await dbPromise.transaction('cart', 'readwrite')
    await tx.store.clear()
    await tx.done
  },
  
  async toggleFavorite(item) {
    const tx = await dbPromise.transaction('favorites', 'readwrite')
    const existing = await tx.store.get(item.id)
    if (existing) {
      await tx.store.delete(item.id)
    } else {
      await tx.store.put({ ...item, timestamp: Date.now() })
    }
    await tx.done
  },
  
  async getFavorites() {
    return await (await dbPromise).getAll('favorites')
  },
  
  async saveOrder(order) {
    const tx = await dbPromise.transaction('orders', 'readwrite')
    await tx.store.add(order)
    await tx.done
  },
  
  async getOrders() {
    return await (await dbPromise).getAllFromIndex('orders', 'timestamp')
  },
  
  async cacheMenus(menus) {
    const tx = await dbPromise.transaction('menus', 'readwrite')
    for (const menu of menus) {
      await tx.store.put(menu)
    }
    await tx.done
  },
  
  async getMenu(restaurantId) {
    return await (await dbPromise).get('menus', restaurantId)
  }
}