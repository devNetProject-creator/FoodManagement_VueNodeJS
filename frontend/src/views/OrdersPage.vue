<template>
  <div class="orders">
    <h1>My Orders</h1>
    <div class="orders-container">
      <div v-if="orders.length === 0" class="no-orders">
        <p>No orders found</p>
      </div>
      <div v-else class="orders-list">
        <div v-for="order in orders" :key="order.orderId">
          <router-link v-if="order.orderId" :to="{ name: 'order-detail', params: { id: order.orderId } }" style="text-decoration:none;color:inherit;">
            <div class="order-card">
              <div class="order-header">
                <h3>Order #{{ order.orderId }}</h3>
                <span class="order-date">{{ formatDate(order.orderDate) }}</span>
              </div>
              <div class="order-items">
                <div v-for="item in order.items" :key="item.foodId" class="order-item">
                  <span class="item-name">{{ item.name }}</span>
                  <span class="item-quantity">x {{ item.quantity }}</span>
                  <span class="item-status">{{ item.status }}</span>
                </div>
              </div>
              <div class="order-total">
                <span>Total: ${{ order.price }}</span>
              </div>
            </div>
          </router-link>
          <div class="order-total">
            <button @click="cancelOrder(order.orderId)" v-if="canCancel(order)">Cancel Order</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, computed } from 'vue'
import { useOrderStore } from '../stores/order'

export default {
  name: 'OrdersPage',
  setup() {
    const orderStore = useOrderStore()
    const orders = computed(() => orderStore.orders)

    const fetchOrders = async () => {
      try {
        await orderStore.fetchOrders()
      } catch (error) {
        console.error('Failed to fetch orders:', error)
      }
    }

    const formatDate = (dateString) => {
      return new Date(dateString).toLocaleDateString()
    }

    const canCancel = (order) => {
      const orderDate = new Date(order.orderDate)
      const now = new Date()
      const timeDiff = now - orderDate
      return Array.isArray(order.items) && order.items.some(item => item.status === 'Pending') && timeDiff < 30 * 60 * 1000
    }

    const cancelOrder = async (orderId) => {
      try {
        await orderStore.cancelOrder(orderId)
        await fetchOrders()
      } catch (error) {
        console.error('Failed to cancel order:', error)
      }
    }

    onMounted(() => {
      fetchOrders()
    })

    return {
      orders,
      formatDate,
      canCancel,
      cancelOrder
    }
  }
}
</script>

<style scoped>
.orders {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.orders-container {
  background: white;
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.no-orders {
  text-align: center;
  padding: 2rem;
  color: #7f8c8d;
}

.orders-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.order-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.order-date {
  color: #7f8c8d;
  font-size: 0.9rem;
}

.order-items {
  margin: 1rem 0;
}

.order-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem;
  border-bottom: 1px solid #eee;
}

.order-item:last-child {
  border-bottom: none;
}

.item-name {
  font-weight: 500;
}

.item-quantity {
  color: #27ae60;
}

.item-status {
  color: #27ae60;
}

.order-total {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1rem;
  font-weight: 600;
}

button {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #c0392b;
}
</style>
