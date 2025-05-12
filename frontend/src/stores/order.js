import { defineStore } from 'pinia'
import { API_CONFIG, API_ENDPOINTS } from '@/config/config.js'
import axios from 'axios'

export const useOrderStore = defineStore('order', {
  state: () => ({
    orders: [],
    loading: false,
    error: null
  }),

  getters: {
    getOrders: (state) => state.orders,
    getPendingOrders: (state) => state.orders.filter(order => 
      order.items.some(item => item.status === 'Pending')
    )
  },

  actions: {
    async fetchOrders() {
      try {
        this.loading = true
        this.error = null

        if (API_CONFIG.isDemoActive) {
          // Generate demo orders based on demo food items
          const demoOrders = [
            {
              orderId: 1,
              orderDate: new Date().toISOString(),
              price: 27.98,
              items: [
                { foodId: 11, name: 'Pizza', quantity: 2, status: 'Pending' },
                { foodId: 13, name: 'Dumplings', quantity: 1, status: 'Pending' }
              ]
            },
            {
              orderId: 2,
              orderDate: new Date(Date.now() - 86400000).toISOString(), // Yesterday
              price: 14.98,
              items: [
                { foodId: 15, name: 'Biryani', quantity: 1, status: 'Completed' }
              ]
            }
          ]
          this.orders = demoOrders
          return { data: demoOrders }
        }

        const response = await axios.get(API_ENDPOINTS.orders, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        this.orders = response.data
        return response
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch orders'
        throw error
      } finally {
        this.loading = false
      }
    },

    async createOrder({ price, foodItems }) {
      try {
        this.loading = true;
        this.error = null;
        const response = await axios.post(
          API_CONFIG.apiBaseUrl + '/createorder',
          { price, foodItems },
          { headers: { Authorization: `Bearer ${localStorage.getItem('token')}` } }
        );
        this.orders.unshift(response.data);
        return response;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create order';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async cancelOrder(orderId) {
      try {
        this.loading = true
        this.error = null

        if (API_CONFIG.isDemoActive) {
          this.orders = this.orders.map(order => 
            order.orderId === orderId ? { ...order, items: order.items.map(item => ({ ...item, status: 'Cancelled' })) } : order
          )
          return { data: { message: 'Order cancelled successfully' } }
        }

        const response = await axios.delete(API_ENDPOINTS.orderById(orderId), {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        this.orders = this.orders.filter(order => order.orderId !== orderId)
        return response
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to cancel order'
        throw error
      } finally {
        this.loading = false
      }
    },

    async updateOrderStatus(orderId, status) {
      try {
        this.loading = true
        this.error = null

        if (API_CONFIG.isDemoActive) {
          this.orders = this.orders.map(order => 
            order.orderId === orderId ? { ...order, items: order.items.map(item => ({ ...item, status })) } : order
          )
          return { data: { message: 'Order status updated successfully' } }
        }

        const response = await axios.put(API_ENDPOINTS.orderById(orderId), { status }, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        })
        const index = this.orders.findIndex(order => order.orderId === orderId)
        if (index !== -1) {
          this.orders[index] = response.data
        }
        return response
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update order status'
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
