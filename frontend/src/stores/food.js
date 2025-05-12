import { defineStore } from 'pinia'
import { API_CONFIG } from '@/config/config'
import axios from 'axios'

export const useFoodStore = defineStore('food', {
  state: () => {
    let cartItems = [];
    try {
      const stored = localStorage.getItem('cartItems');
      if (stored) cartItems = JSON.parse(stored);
    } catch (e) {
      cartItems = [];
    }
    return {
      foodItems: [],
      selectedFood: null,
      loading: false,
      error: null,
      cartItems,
      orders: []
    }
  },

  getters: {
    getFoodItems: (state) => state.foodItems,
    getSelectedFood: (state) => state.selectedFood,
    getCartItem: (state) => {
      return (foodId) => {
        return state.cartItems.find(item => item.foodId === foodId)
      }
    },
    getCartItems: (state) => state.cartItems
  },

  actions: {
    async fetchFoodItems() {
      try {
        this.loading = true
        this.error = null

        const response = await axios.get(`${API_CONFIG.apiBaseUrl}/fooditems`)
        console.log('Fetched food items:', response.data)
        this.foodItems = response.data.map(food => ({
          ...food,
          Image: `/images/menu/${food.Name.toLowerCase().replace(/[^a-z0-9]/g, '-')}.jpg`,
          Price: parseFloat(food.Price ?? food.price) || 0,
          price: parseFloat(food.Price ?? food.price) || 0 // Also set price for consistency
        }))
        this.selectedFood = null
        return response
      } catch (error) {
        if (error.message && error.message.includes('Network Error')) {
          this.error = 'Network error: Unable to connect to server. Please check your internet connection or try again later.'
        } else {
          this.error = error.response?.data?.message || 'Failed to fetch food items'
        }
        console.error('Error fetching food items:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async getFoodItemById(id) {
      try {
        this.loading = true
        this.error = null

        const response = await axios.get(`${API_CONFIG.apiBaseUrl}/fooditem/${id}`)
        this.selectedFood = response.data
        return response
      } catch (error) {
        if (error.message && error.message.includes('Network Error')) {
          this.error = 'Network error: Unable to connect to server. Please check your internet connection or try again later.'
        } else {
          this.error = error.response?.data?.message || 'Failed to fetch food item'
        }
        console.error('Error fetching food item:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async getOrderById(id) {
      try {
        this.loading = true
        this.error = null

        const response = await axios.get(`${API_CONFIG.apiBaseUrl}/orders/${id}`,
        { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } })
        return response
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch order'
        console.error('Error fetching order:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    // Removed duplicate createOrder. Use order store's createOrder instead.

    clearCart() {
      this.cartItems = [];
      localStorage.removeItem('cartItems');
    },

    addToCart(item) {
      const existingItem = this.cartItems.find(cartItem => cartItem.foodId === item.foodId)
      if (existingItem) {
        existingItem.quantity += 1
      } else {
        this.cartItems.push({
          foodId: item.foodId,
          name: item.name,
          price: parseFloat(item.price) || 0,
          image: item.image,
          quantity: 1
        })
      }
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    },

    updateCartItem({ foodId, quantity }) {
      const item = this.cartItems.find(item => item.foodId === foodId)
      if (item) {
        item.quantity = quantity
        localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      }
    },

    removeCartItem(foodId) {
      this.cartItems = this.cartItems.filter(item => item.foodId !== foodId)
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    }
  },

  async fetchOrders() {
    this.loading = true
    this.error = null
    try {
      const response = await axios.get(`${API_CONFIG.apiBaseUrl}/orders`)
      this.orders = response.data
      return response
    } catch (error) {
      this.error = error.response?.data?.message || 'Failed to fetch orders'
      throw error
    } finally {
      this.loading = false
    }
  }
})
