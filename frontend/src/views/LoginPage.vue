<template>
  <div class="login-page d-flex align-items-center justify-content-center">
    <div class="login-card row shadow-lg rounded-4 overflow-hidden">
      <!-- Left image panel -->
      <div class="col-md-6 d-none d-md-flex login-image align-items-center justify-content-center p-0">
        <div class="w-100 h-100 d-flex flex-column align-items-center justify-content-center text-white px-4" style="background: linear-gradient(120deg,#ff6b35 60%,#ffb347 100%);">
          <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80" alt="Food" class="img-fluid rounded-3 mb-4 shadow" style="max-width: 260px;">
          <h3 class="fw-bold">Welcome Back!</h3>
          <p class="lead mb-0">Order your favorite food in seconds!</p>
        </div>
      </div>
      <!-- Login form -->
      <div class="col-12 col-md-6 bg-white p-4 p-md-5 d-flex flex-column justify-content-center">
        <h2 class="text-center fw-bold mb-4">Login</h2>
        <b-form @submit.prevent="handleLogin">
          <b-form-group
            id="email-group"
            label="Email"
            label-for="email"
            :state="emailState"
            :invalid-feedback="emailFeedback"
          >
            <b-form-input
              id="email"
              v-model="email"
              type="email"
              :state="emailState"
              required
              placeholder="Enter your email"
              class="form-control-lg"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            id="password-group"
            label="Password"
            label-for="password"
            :state="passwordState"
            :invalid-feedback="passwordFeedback"
          >
            <b-form-input
              id="password"
              v-model="password"
              type="password"
              :state="passwordState"
              required
              placeholder="Enter your password"
              class="form-control-lg"
            ></b-form-input>
          </b-form-group>

          <div class="text-danger mb-2" v-if="error">{{ error }}</div>

          <b-button
            type="submit"
            variant="success"
            :disabled="loading || !formValid"
            class="w-100 py-2 fw-bold mb-3 login-btn"
            style="font-size: 1.15rem;"
          >
            <span v-if="!loading">Login</span>
            <span v-else><b-spinner small></b-spinner> Loading...</span>
          </b-button>
          <div class="text-center">
            <router-link to="/signup" class="text-primary">
              Don't have an account? <span class="fw-bold">Sign up</span>
            </router-link>
          </div>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';
import { ref, computed } from 'vue';

const authStore = useAuthStore();
const email = ref('');
const password = ref('');
const error = ref('');
const loading = ref(false);

const validateEmail = () => {
  if (!email.value) return null;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.value);
};

const validatePassword = () => {
  if (!password.value) return null;
  return password.value.length >= 6;
};

const emailState = computed(() => validateEmail());
const passwordState = computed(() => validatePassword());
const formValid = computed(() => emailState.value && passwordState.value);

const emailFeedback = computed(() => {
  if (!email.value) return '';
  return emailState.value ? '' : 'Please enter a valid email address';
});

const passwordFeedback = computed(() => {
  if (!password.value) return '';
  return passwordState.value ? '' : 'Password must be at least 6 characters';
});

const router = useRouter();
const handleLogin = async () => {
  try {
    loading.value = true;
    error.value = '';
    await authStore.login({ email: email.value, password: password.value });
    router.push('/menu');
  } catch (err) {
    console.log(err, 'Login error in page');
    error.value = err.response?.data?.message || 'Login failed';
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(120deg, #ffe7d1 0%, #fff8f0 100%);
  padding: 0;
}
.login-card {
  width: 100%;
  max-width: 900px;
  min-height: 480px;
  background: #fff;
  border-radius: 24px;
  box-shadow: 0 12px 36px rgba(0,0,0,0.10);
  overflow: hidden;
}
.login-image {
  background: linear-gradient(120deg,#ff6b35 60%,#ffb347 100%);
  min-height: 480px;
}
.login-image img {
  box-shadow: 0 8px 32px rgba(0,0,0,0.13);
}
.login-btn {
  background: linear-gradient(90deg, #ff6b35 0%, #ffb347 100%);
  border: none;
  color: #fff;
  font-weight: 600;
  letter-spacing: 1px;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(255,107,53,0.08);
}
.login-btn:hover {
  background: linear-gradient(90deg, #ffb347 0%, #ff6b35 100%);
  color: #fff;
}
.form-control-lg {
  font-size: 1.1rem;
  padding: 0.9rem 1.1rem;
  border-radius: 7px;
}
@media (max-width: 767px) {
  .login-card {
    min-height: unset;
    border-radius: 0;
    box-shadow: none;
  }
  .login-image {
    display: none !important;
  }
  .login-page {
    padding: 1.2rem 0;
  }
}

.error-message {
  color: #e74c3c;
  margin-top: 1rem;
  text-align: center;
  font-size: 0.9rem;
}

.signup-link {
  margin-top: 1rem;
  text-align: center;
  color: #34495e;
  font-size: 0.9rem;
  display: block;
}

.signup-link a {
  color: #2ecc71;
  text-decoration: none;
  font-weight: 500;
}

.signup-link a:hover {
  text-decoration: underline;
}
</style>
