<template>
  <div class="profile-page">
    <h1>User Profile</h1>
    <div v-if="user">
      <p><strong>Customer ID:</strong> {{ user.customerId }}</p>
      <p><strong>First Name:</strong> {{ user.firstName }}</p>
      <p><strong>Last Name:</strong> {{ user.lastName }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
    </div>
    <div v-else>
      <p>Loading user information...</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const user = ref(authStore.user)

onMounted(() => {
  if (!user.value) {
    try {
      const storedUser = localStorage.getItem('user')
      if (storedUser) {
        user.value = JSON.parse(storedUser)
        authStore.user = user.value
      }
    } catch (e) {
      // ignore
    }
  }
})

// Keep user in localStorage on login/signup
if (authStore.user) {
  localStorage.setItem('user', JSON.stringify(authStore.user))
}
</script>

<style scoped>
.profile-page {
  max-width: 450px;
  margin: 2rem auto;
  padding: 2rem;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,0.08);
}
h1 {
  color: #2c3e50;
  margin-bottom: 1.5rem;
}
p {
  font-size: 1.1rem;
  margin: 0.5rem 0;
}
</style>
