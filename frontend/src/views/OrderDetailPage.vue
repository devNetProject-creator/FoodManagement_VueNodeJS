<template>
  <div class="order-detail-wrapper">
    <div v-if="loading" class="loading-modern">
      <span class="spinner"></span> Loading order details...
    </div>
    <div v-else-if="order" class="order-card">
      <div class="order-header">
        <i class="fas fa-receipt order-icon"></i>
        <div>
          <h2 class="order-title">Order #{{ order.orderId }}</h2>
          <p class="order-date"><i class="fas fa-calendar-alt"></i> {{ new Date(order.orderDate).toLocaleString() }}</p>
        </div>
      </div>
      <div class="order-summary">
        <div class="summary-row">
          <span class="summary-label">Total Price:</span>
          <span class="summary-value">₹{{ order.price }}</span>
        </div>
      </div>
      <h3 class="items-title"><i class="fas fa-utensils"></i> Items</h3>
      <ul class="items-list">
        <li v-for="item in order.items" :key="item.foodId" class="item-row">
          <div class="item-info">
            <span class="item-name">{{ item.name }}</span>
            <span class="item-qty">x{{ item.quantity }}</span>
          </div>
          <span class="item-status-badge" :class="item.status.toLowerCase()">
            <i v-if="item.status==='Pending'" class="fas fa-hourglass-half"></i>
            <i v-else-if="item.status==='Completed'" class="fas fa-check-circle"></i>
            <i v-else-if="item.status==='Cancelled'" class="fas fa-times-circle"></i>
            {{ item.status }}
          </span>
        </li>
      </ul>
    </div>
    <div v-else class="not-found-card">
      <i class="fas fa-exclamation-triangle"></i>
      <p>Order not found.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFoodStore } from '@/stores/food'

const route = useRoute()
const store = useFoodStore()
const order = ref(null)
const loading = ref(true)

onMounted(async () => {
  loading.value = true
  const { id } = route.params
  try {
    const res = await store.getOrderById(id)
    order.value = res.data
  } catch (e) {
    order.value = null
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.order-detail-wrapper {
  min-height: 80vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(120deg, #fff8f0 0%, #ffe7d1 100%);
  padding: 2rem 0;
}
.order-card {
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 24px rgba(255, 107, 53, 0.08);
  padding: 2.5rem 2rem 2rem 2rem;
  max-width: 480px;
  width: 95vw;
  margin: 0 auto;
  animation: fadeIn 0.5s;
}
.order-header {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  margin-bottom: 1.5rem;
}
.order-icon {
  font-size: 2.2rem;
  color: #ff6b35;
}
.order-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.2rem 0;
  color: #34495e;
}
.order-date {
  color: #888;
  font-size: 0.98rem;
  margin: 0;
}
.order-summary {
  margin-bottom: 1.4rem;
  padding-bottom: 1.2rem;
  border-bottom: 1px solid #f1e6d6;
}
.summary-row {
  display: flex;
  justify-content: space-between;
  font-size: 1.08rem;
  font-weight: 500;
  margin-bottom: 0.2rem;
}
.summary-label {
  color: #666;
}
.summary-value {
  color: #ff6b35;
  font-weight: 600;
}
.items-title {
  font-size: 1.18rem;
  color: #ff6b35;
  margin-bottom: 0.8rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}
.items-list {
  list-style: none;
  padding: 0;
  margin: 0;
}
.item-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.7rem 0.2rem;
  border-bottom: 1px solid #f8e5d1;
  font-size: 1.05rem;
}
.item-row:last-child {
  border-bottom: none;
}
.item-info {
  display: flex;
  align-items: center;
  gap: 0.7rem;
}
.item-name {
  font-weight: 500;
  color: #34495e;
}
.item-qty {
  color: #27ae60;
  font-size: 1rem;
  font-weight: 500;
}
.item-status-badge {
  display: flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.98rem;
  border-radius: 12px;
  padding: 0.18rem 0.7rem;
  font-weight: 600;
  background: #f8f9fa;
}
.item-status-badge.pending {
  color: #ff9800;
  background: #fff3e0;
}
.item-status-badge.completed {
  color: #27ae60;
  background: #e9fbe7;
}
.item-status-badge.cancelled {
  color: #e74c3c;
  background: #fdecea;
}
.not-found-card {
  background: #fff6f6;
  padding: 2.5rem 2rem;
  border-radius: 14px;
  box-shadow: 0 2px 8px rgba(231, 76, 60, 0.06);
  color: #e74c3c;
  text-align: center;
  max-width: 400px;
  width: 90vw;
}
.not-found-card i {
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #e74c3c;
}
.loading-modern {
  color: #ff6b35;
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: 1px;
  padding: 2rem 0;
  display: flex;
  align-items: center;
  gap: 0.8rem;
  justify-content: center;
}
.spinner {
  width: 1.4em;
  height: 1.4em;
  border: 3px solid #ffb347;
  border-top: 3px solid #ff6b35;
  border-radius: 50%;
  animation: spin 1s linear infinite;
  display: inline-block;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
@media (max-width: 600px) {
  .order-card {
    padding: 1.2rem 0.5rem;
    max-width: 98vw;
  }
}
</style>
