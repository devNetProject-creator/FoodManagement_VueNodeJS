<template>
  <div class="food-detail-bg d-flex align-items-center justify-content-center py-5 min-vh-100">
    <div v-if="loading" class="loading-modern">Loading...</div>
    <div v-else-if="food" class="food-detail-card shadow-lg rounded-4 bg-white p-4 p-md-5 mx-auto">
      <div class="d-flex flex-column flex-md-row align-items-center gap-4">
        <img
          v-if="imageAvailable"
          :src="food.Image || '/images/menu/placeholder.jpg'"
          :alt="food.Name"
          class="food-detail-image mb-3 mb-md-0"
          @error="imageAvailable = false"
        />
        <div class="flex-fill">
          <h2 class="food-detail-title text-gradient fw-bold mb-2">{{ food.Name }}</h2>
          <div class="mb-2"><span class="badge bg-gradient-orange me-2">{{ food.Cuisine }}</span></div>
          <p class="food-detail-desc mb-3">{{ food.Description }}</p>
          <div class="mb-2"><strong>Available Quantity:</strong> <span :class="food.Quantity > 0 ? 'text-success' : 'text-danger'">{{ food.Quantity }}</span></div>
          <div class="mb-3"><strong>Price:</strong> <span class="food-detail-price">${{ food.price }}</span></div>
        </div>
      </div>
    </div>
    <div v-else class="food-detail-card shadow-lg rounded-4 bg-white p-4 mx-auto text-center">
      <p>Food item not found.</p>
    </div>
  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useFoodStore } from '@/stores/food'

const route = useRoute()
const store = useFoodStore()
const food = ref(null)
const loading = ref(true)
const imageAvailable = ref(true)

onMounted(async () => {
  loading.value = true
  imageAvailable.value = true
  const { id } = route.params
  try {
    const res = await store.getFoodItemById(id)
    food.value = res.data
  } catch (e) {
    food.value = null
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.food-detail-bg {
  background: linear-gradient(120deg, #fff8f0 0%, #ffe7d1 100%);
  min-height: 100vh;
}
.food-detail-card {
  max-width: 700px;
  border-radius: 28px;
  background: #fff;
  box-shadow: 0 8px 32px rgba(255,107,53,0.10);
}
.food-detail-title {
  font-size: 2.2rem;
  letter-spacing: 1px;
}
.text-gradient {
  background: linear-gradient(90deg, #ffb347 0%, #ff6b35 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}
.bg-gradient-orange {
  background: linear-gradient(90deg, #ffb347 0%, #ff6b35 100%);
  color: #fff;
  border: none;
}
.food-detail-image {
  width: 260px;
  height: 220px;
  object-fit: cover;
  border-radius: 20px;
  box-shadow: 0 4px 16px rgba(255,107,53,0.10);
  background: #ffe7d1;
}
.food-detail-desc {
  color: #666;
  font-size: 1.1rem;
}
.food-detail-price {
  color: #ff6b35;
  font-weight: 700;
  font-size: 1.2rem;
}
.loading-modern {
  color: #ff6b35;
  font-size: 1.3rem;
  font-weight: 500;
  letter-spacing: 1px;
  padding: 2rem 0;
}
@media (max-width: 767.98px) {
  .food-detail-card {
    padding: 1.2rem !important;
  }
  .food-detail-image {
    width: 100%;
    height: 180px;
  }
}
</style>
