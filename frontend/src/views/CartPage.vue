<template>
  <div class="cart-page container mt-5">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center mb-4">Your Cart</h1>
      </div>
    </div>

    <div class="row">
      <div class="col-12">
        <div class="cart-items" v-if="cartItems.length > 0">
          <div
            v-for="item in cartItems"
            :key="item.foodId"
            class="cart-item d-flex justify-content-between align-items-center p-3 mb-3"
          >
            <div class="item-details">
              <h5 class="mb-1">{{ item.name }}</h5>
              <p class="text-muted mb-0">₹{{ item.price }}</p>
            </div>
            <div class="quantity-controls d-flex align-items-center">
              <button
                class="btn btn-outline-secondary btn-sm"
                @click="decreaseQuantity(item.foodId)"
                :disabled="item.quantity <= 1"
              >-</button>
              <span class="mx-2">{{ item.quantity }}</span>
              <button
                class="btn btn-outline-secondary btn-sm"
                @click="increaseQuantity(item.foodId)"
              >+</button>
            </div>
            <button
              class="btn btn-danger btn-sm ms-2"
              @click="removeFromCart(item.foodId)"
            >
              Remove
            </button>
          </div>
        </div>
        <div v-else class="text-center py-5">
          <h3>Your cart is empty</h3>
          <router-link to="/menu" class="btn btn-primary">Continue Shopping</router-link>
        </div>
      </div>
    </div>

    <div class="row mt-4">
      <div class="col-12">
        <div class="cart-summary card p-4">
          <div class="d-flex justify-content-between mb-3">
            <span class="font-weight-bold">Total Items:</span>
            <span>{{ cartItems.length }}</span>
          </div>
          <div class="d-flex justify-content-between mb-3">
            <span class="font-weight-bold">Subtotal:</span>
            <span class="font-weight-bold">₹{{ calculateSubtotal() }}</span>
          </div>
          <div class="d-flex justify-content-between mb-3">
            <span class="font-weight-bold">Delivery Fee:</span>
            <span class="font-weight-bold">₹50</span>
          </div>
          <div class="d-flex justify-content-between mb-3">
            <span class="font-weight-bold">Total:</span>
            <span class="font-weight-bold">₹{{ calculateTotal() }}</span>
          </div>
          <button
            class="btn btn-success w-100 mt-3"
            @click="openPaymentModal"
            :disabled="cartItems.length === 0"
          >
            Place Order
          </button>

          <!-- Payment Modal -->
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

          <!-- Success Modal -->
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
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import { useFoodStore } from '@/stores/food'
import { useRouter } from 'vue-router'
import { useOrderStore } from '@/stores/order'

export default {
  setup() {
    const router = useRouter()
    const foodStore = useFoodStore()
    const orderStore = useOrderStore()
    const cartItems = ref([])

    // Load cart items from food store
    onMounted(() => {
      cartItems.value = foodStore.cartItems || []
    })

    const calculateSubtotal = () => {
      return cartItems.value.reduce((total, item) => 
        total + (item.price * item.quantity), 0
      )
    }

    const calculateTotal = () => {
      return calculateSubtotal() + 50 // Adding delivery fee
    }

    const decreaseQuantity = (foodId) => {
      const index = cartItems.value.findIndex(item => item.foodId === foodId)
      if (index !== -1) {
        if (cartItems.value[index].quantity > 1) {
          cartItems.value[index].quantity--
          foodStore.updateCartItem({
            foodId,
            quantity: cartItems.value[index].quantity
          })
        }
      }
    }

    const increaseQuantity = (foodId) => {
      const index = cartItems.value.findIndex(item => item.foodId === foodId)
      if (index !== -1) {
        cartItems.value[index].quantity++
        foodStore.updateCartItem({
          foodId,
          quantity: cartItems.value[index].quantity
        })
      }
    }

    const removeFromCart = (foodId) => {
      cartItems.value = cartItems.value.filter(item => item.foodId !== foodId)
      foodStore.removeCartItem(foodId)
    }

    // Payment modal logic
    const showPaymentModal = ref(false)
    const paymentMethods = ref(['Cash On Delivery', 'UPI', 'Credit/Debit Card'])
    const selectedPaymentMethod = ref('Cash On Delivery')
    const paymentProcessing = ref(false)
    const showSuccessModal = ref(false)

    const openPaymentModal = () => {
      if (cartItems.value.length === 0) {
        alert('Please add items to cart first')
        return
      }
      showPaymentModal.value = true
    }

    const confirmOrder = async () => {
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

    async function completeOrder() {
      try {
        const orderData = {
          price: calculateTotal(),
          foodItems: cartItems.value.map(item => ({
            foodItemId: item.foodId,
            qty: item.quantity
          }))
        }
        await orderStore.createOrder(orderData)
        foodStore.clearCart()
        cartItems.value = []
        showPaymentModal.value = false
        showSuccessModal.value = true
      } catch (error) {
        console.error('Error placing order:', error)
        showPaymentModal.value = false
      }
    }

    const goToOrders = () => {
      showSuccessModal.value = false
      router.push('/orders')
    }


    return {
      cartItems,
      calculateSubtotal,
      calculateTotal,
      decreaseQuantity,
      increaseQuantity,
      removeFromCart,
      // Payment modal logic
      paymentMethods,
      selectedPaymentMethod,
      showPaymentModal,
      paymentProcessing,
      showSuccessModal,
      openPaymentModal,
      confirmOrder,
      goToOrders
    }
  }

}
</script>

<style scoped>
.cart-page {
  min-height: 100vh;
  background-color: #fff8f0;
}

.cart-item {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s ease;
}

.cart-item:hover {
  transform: translateY(-2px);
}

.item-details {
  min-width: 200px;
}

.quantity-controls {
  min-width: 150px;
}

.cart-summary {
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

/* MODAL OVERLAY STYLES */
.payment-modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0,0,0,0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}
.payment-modal-content {
  background: #fff;
  border-radius: 16px;
  padding: 2.5rem 2rem;
  max-width: 400px;
  width: 90vw;
  box-shadow: 0 8px 32px rgba(0,0,0,0.18);
  position: relative;
  animation: modalFadeIn 0.2s;
}
@keyframes modalFadeIn {
  from { transform: translateY(40px) scale(0.95); opacity: 0; }
  to { transform: translateY(0) scale(1); opacity: 1; }
}

.btn {
  padding: 0.5rem 1rem;
  border-radius: 5px;
  font-weight: 500;
  transition: all 0.3s ease;
}

.btn:hover {
  transform: translateY(-1px);
}

.btn-primary {
  background-color: #ff6b35;
  border-color: #ff6b35;
}

.btn-primary:hover {
  background-color: #ff5722;
  border-color: #ff5722;
}

.btn-success {
  background-color: #4caf50;
  border-color: #4caf50;
}

.btn-success:hover {
  background-color: #43a047;
  border-color: #43a047;
}

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .quantity-controls {
    margin-top: 1rem;
    width: 100%;
  }
  
  .cart-summary {
    margin-bottom: 2rem;
  }
  .payment-modal-content {
    padding: 1.2rem 0.5rem;
    max-width: 95vw;
  }
}
</style>
