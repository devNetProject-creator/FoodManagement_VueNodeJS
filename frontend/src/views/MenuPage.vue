<template>
  <div class="menu-modern py-5">
    <div class="container">
      <div class="row mb-4">
        <div class="col-12">
          <div class="d-flex justify-content-between align-items-center mb-4">
            <h1 class="menu-title mb-0 fw-bold text-gradient">Food Menu</h1>
            <router-link to="/cart" class="cart-icon">
              <i class="fas fa-shopping-cart me-2"></i>
              <span class="badge bg-primary">{{ cartItemCount }}</span>
            </router-link>
          </div>
          <div class="d-flex justify-content-center mb-4">
            <select
              v-model="selectedCuisine"
              class="cuisine-filter-modern shadow-sm"
              @change="filterFoodItems"
            >
              <option value="">All Cuisines</option>
              <option v-for="cuisine in uniqueCuisines" :key="cuisine" :value="cuisine">
                {{ cuisine }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="foodStore.loading" class="text-center">
        <div class="loading-spinner"></div>
        <p>Loading food items...</p>
      </div>

      <div v-else-if="foodStore.error" class="text-center">
        <p class="text-danger">Error loading food items: {{ foodStore.error }}</p>
      </div>

      <div v-else class="row">
        <div
          v-for="food in filteredFoodItems"
          :key="food.FoodIdPK"
          class="col-12 col-md-6 col-lg-4 mb-4"
        >
          <router-link :to="{ name: 'food-detail', params: { id: food.FoodIdPK } }" style="text-decoration:none;color:inherit;" custom v-slot="{ navigate }">
            <div class="food-card-modern h-100 shadow-lg rounded-4 overflow-hidden position-relative bg-white" @click="navigate">
              <img :src="food.Image" alt="Food Image" class="food-image-modern">
              <div class="food-info p-3">
                <h5 class="card-title text-center mb-3 fw-semibold text-gradient">{{ food.Name }}</h5>
                <div class="food-details mb-3">
                  <div class="d-flex justify-content-between align-items-center">
                    <span class="text-muted">{{ food.Cuisine }}</span>
                    <span class="food-price">${{ parseFloat(food.Price ?? food.price) || 0 }}</span>
                  </div>
                  <div class="d-flex justify-content-between align-items-center">
                    <p class="food-description">{{ food.Description }}</p>
                    <span 
                      class="badge" 
                      :class="{
                        'bg-success': food.Quantity > 0,
                        'bg-danger': food.Quantity === 0
                      }"
                    >
                      {{ food.Quantity > 0 ? 'In Stock' : 'Out of Stock' }}
                    </span>
                  </div>
                </div>
                <div class="d-flex justify-content-between align-items-center">
                  <button 
                    class="btn btn-primary w-50"
                    :disabled="food.Quantity === 0"
                    @click.stop="addToCart(food)"
                  >
                    <span v-if="food.Quantity > 0">Add to Cart</span>
                    <span v-else>Sold Out</span>
                  </button>
                  <div v-if="food.Quantity > 0" class="cart-controls">
                    <button 
                      class="btn btn-outline-secondary btn-sm"
                      @click.stop="decreaseQuantity(food.FoodIdPK)"
                      :disabled="foodStore.cartItems.find(item => item.foodId === food.FoodIdPK)?.quantity <= 1"
                    >-</button>
                    <span class="mx-2">{{ foodStore.cartItems.find(item => item.foodId === food.FoodIdPK)?.quantity || 0 }}</span>
                    <button 
                      class="btn btn-outline-secondary btn-sm"
                      @click.stop="increaseQuantity(food.FoodIdPK)"
                    >+</button>
                  </div>
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </div>

      <div class="cart-overlay" v-if="showCart && cartItems.length > 0">
        <div class="cart-modal">
          <div class="cart-header d-flex justify-content-between align-items-center">
            <h3>Your Cart</h3>
            <button class="btn-close" @click="showCart = false"></button>
          </div>
          <div class="cart-items">
            <div
              v-for="item in cartItems"
              :key="item.foodId"
              class="cart-item d-flex justify-content-between align-items-center p-2 border-bottom"
            >
              <span>{{ item.name }}</span>
              <div class="d-flex align-items-center">
                <button
                  class="btn btn-outline-secondary btn-sm"
                  @click.stop="decreaseQuantity(item.foodId)"
                  :disabled="item.quantity <= 1"
                >-</button>
                <span class="mx-2">${{ calculateItemTotal(item.foodId) }}</span>
                <button
                  class="btn btn-outline-secondary btn-sm"
                 @click.stop="increaseQuantity(item.foodId)"
                >+</button>
                <button
                  class="btn btn-danger btn-sm ms-2"
                  @click="removeFromCart(item.foodId)"
                >Remove</button>
              </div>
            </div>
          </div>
          <div class="cart-footer d-flex flex-column gap-3">
            <div class="d-flex justify-content-between">
              <span class="font-weight-bold">Subtotal:</span>
              <span class="font-weight-bold">${{ calculateSubtotal.value }}</span>
            </div>
            <button
              class="btn btn-success w-100"
              @click="placeOrder"
              :disabled="cartItems.length === 0"
            >
              Place Order
            </button>
          </div>
        </div>
      </div>

      <div v-if="showPaymentModal" class="payment-modal">
        <div class="payment-modal-content">
          <h3 class="mb-3">Select Payment Method</h3>
          <div class="payment-options">
            <div class="payment-option" v-for="method in paymentMethods" :key="method">
              <input type="radio" 
                     :id="method" 
                     :value="method" 
                     v-model="selectedPaymentMethod"
                     class="form-check-input">
              <label :for="method" class="form-check-label">
                <i v-if="method === 'Cash On Delivery'" class="fas fa-money-bill-wave"></i>
                <i v-else-if="method === 'UPI'" class="fas fa-mobile-alt"></i>
                <i v-else class="fas fa-credit-card"></i>
                {{ method }}
              </label>
            </div>
          </div>
          <div class="mt-4">
            <button class="btn btn-success me-2" @click="confirmOrder" :disabled="paymentProcessing">Confirm Order</button>
            <button class="btn btn-secondary" @click="showPaymentModal = false" :disabled="paymentProcessing">Cancel</button>
          </div>
          <div v-if="paymentProcessing" class="text-center mt-3">
            <span class="spinner-border spinner-border-sm"></span>
            <span class="ms-2">Processing Payment...</span>
          </div>
        </div>
      </div>

      <div v-if="showSuccessModal" class="payment-modal">
        <div class="payment-modal-content text-center">
          <i class="fas fa-check-circle text-success" style="font-size:3rem;"></i>
          <h3 class="mt-3">Order Successful!</h3>
          <p>Your payment was processed and your order has been placed.</p>
          <div class="mt-4 d-flex justify-content-center gap-3">
            <button class="btn btn-success" @click="goToOrders">Go to Order History</button>
            <button class="btn btn-secondary" @click="showSuccessModal = false">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useFoodStore } from '@/stores/food'
import { useRouter } from 'vue-router'

const foodStore = useFoodStore()
const selectedCuisine = ref('')
const router = useRouter()

// Fetch food items when component is created
onMounted(() => {
  foodStore.fetchFoodItems()
})

const uniqueCuisines = computed(() => {
  if (!foodStore.foodItems) return []
  const cuisines = new Set()
  foodStore.foodItems.forEach(item => cuisines.add(item.Cuisine))
  return Array.from(cuisines)
})

const filteredFoodItems = computed(() => {
  if (!foodStore.foodItems) return []
  if (!selectedCuisine.value) return foodStore.foodItems
  return foodStore.foodItems.filter(item => 
    item.Cuisine.toLowerCase() === selectedCuisine.value.toLowerCase()
  )
})

const cartItems = computed(() => foodStore.cartItems)

const cartItemCount = computed(() => {
  return cartItems.value.reduce((total, item) => total + item.quantity, 0)
})

const calculateSubtotal = computed(() => {
  return cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0)
})

const calculateItemTotal = (foodId) => {
  const item = cartItems.value.find(item => item.foodId === foodId)
  return item ? item.price * item.quantity : 0
}

const addToCart = (food) => {
  foodStore.addToCart({
    foodId: food.FoodIdPK,
    name: food.Name,
    price: parseFloat(food.Price) || 0,
    image: food.Image,
    quantity: 1
  })
}

const decreaseQuantity = (foodId) => {
  const item = cartItems.value.find(item => item.foodId === foodId)
  if (item && item.quantity > 1) {
    foodStore.updateCartItem({ foodId, quantity: item.quantity - 1 })
  }
}

const increaseQuantity = (foodId) => {

  const item = cartItems.value.find(item => item.foodId === foodId)
  if (item) {
    foodStore.updateCartItem({ foodId, quantity: item.quantity + 1 })
  }
}

const removeFromCart = (foodId) => {
  foodStore.removeCartItem(foodId)
}

const paymentMethods = ref(['Cash On Delivery', 'UPI', 'Credit/Debit Card'])
const selectedPaymentMethod = ref('Cash On Delivery')

const showPaymentModal = ref(false)
const paymentProcessing = ref(false)
const showSuccessModal = ref(false)

const placeOrder = async () => {
  if (cartItems.value.length === 0) {
    alert('Please add items to cart first')
    return
  }
  console.log('[DEBUG] Place Order clicked. Showing payment modal.')
  showPaymentModal.value = true
}

const confirmOrder = async () => {
  console.log('[DEBUG] Confirm Order clicked. Payment method:', selectedPaymentMethod.value)
  paymentProcessing.value = false
  if (selectedPaymentMethod.value === 'UPI' || selectedPaymentMethod.value === 'Credit/Debit Card') {
    paymentProcessing.value = true
    setTimeout(async () => {
      paymentProcessing.value = false
      await completeOrder()
    }, 1500)
  } else {
    await completeOrder()
  }
}

const completeOrder = async () => {
  try {
    const orderData = {
      items: cartItems.value.map(item => ({
        foodId: item.foodId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        image: item.image
      })),
      totalAmount: cartItems.value.reduce((total, item) => total + (item.price * item.quantity), 0),
      paymentMethod: selectedPaymentMethod.value
    }
    await foodStore.createOrder(orderData)
    foodStore.cartItems = []
    showSuccessModal.value = true
    showPaymentModal.value = false
  } catch (error) {
    console.error('Error placing order:', error)
    alert('Failed to place order. Please try again.')
    showPaymentModal.value = false
  }
}
const goToOrders = () => {
  showSuccessModal.value = false
  router.push('/orders')
}
</script>

<style scoped>
.menu-modern {
  min-height: 100vh;
  background: linear-gradient(120deg, #fff8f0 0%, #ffe7d1 100%);
}

.menu-title {
  font-size: 2.5rem;
  letter-spacing: 1px;
  margin-bottom: 0.2em;
}

.text-gradient {
  background: linear-gradient(90deg, #ffb347 0%, #ff6b35 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
}

.cuisine-filter-modern {
  padding: 0.7rem 1.5rem;
  border: none;
  border-radius: 30px;
  background: #fff;
  color: #ff6b35;
  font-weight: 500;
  font-size: 1.08rem;
  box-shadow: 0 2px 8px rgba(255,107,53,0.08);
  transition: background 0.2s, color 0.2s;
}

.cuisine-filter-modern:hover, .cuisine-filter-modern:focus {
  background: #ffe7d1;
  color: #ff6b35;
  outline: none;
}

.food-card-modern {
  border: none;
  border-radius: 20px;
  box-shadow: 0 4px 24px rgba(255,107,53,0.07);
  background: #fff;
  transition: box-shadow 0.2s, transform 0.2s;
  cursor: pointer;
  min-height: 430px;
  display: flex;
  flex-direction: column;
  justify-content: stretch;
}

.food-card-modern:hover {
  box-shadow: 0 12px 36px rgba(255,107,53,0.13);
  transform: translateY(-4px) scale(1.012);
}

.food-image-modern {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 0 0 20px 20px;
  background: #ffe7d1;
  border-bottom: 1px solid #ffe7d1;
}

.payment-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.payment-modal-content {
  background: white;
  padding: 2rem;
  border-radius: 10px;
  width: 90%;
  max-width: 500px;
  position: relative;
}

.payment-options {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.payment-option {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border: 1px solid #ddd;
  border-radius: 5px;
  cursor: pointer;
}

.payment-option:hover {
  background: #f8f9fa;
}

.payment-option i {
  color: #666;
  font-size: 1.2rem;
}

.cart-controls {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.cart-controls button {
  padding: 0.25rem 0.5rem;
}

.food-card:hover {
  transform: translateY(-5px);
}

.food-card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
}

.food-info {
  margin-top: 1rem;
}

.food-name {
  font-size: 1.2rem;
  font-weight: bold;
  margin-bottom: 0.5rem;
}

.food-price {
  color: #2ecc71;
  font-weight: bold;
}

.food-description {
  color: #666;
  margin-top: 0.5rem;
}

.cart-icon {
  color: #333;
  text-decoration: none;
  transition: color 0.2s;
}

.cart-icon:hover {
  color: #2ecc71;
}

.cart-icon .badge {
  font-size: 0.8rem;
  padding: 0.25rem 0.5rem;
}

.cuisine-filter {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 20px;
  background: #f8f9fa;
  color: #666;
  cursor: pointer;
  transition: all 0.2s;
}

.cuisine-filter:hover {
  background: #e9ecef;
  color: #495057;
}

.cuisine-filter:focus {
  outline: none;
  box-shadow: 0 0 0 0.2rem rgba(40, 167, 69, 0.25);
}

@media (max-width: 768px) {
  .food-card {
    margin-bottom: 1.5rem;
  }
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 500;
  box-shadow: 0 2px 8px rgba(255,107,53,0.08);
  transition: background 0.2s, color 0.2s;
}
.btn-primary {
  background: linear-gradient(90deg, #ff6b35 0%, #ffb347 100%);
  border: none;
  color: #fff;
}
.btn-primary:hover {
  background: linear-gradient(90deg, #ffb347 0%, #ff6b35 100%);
  color: #fff;
}
</style>
