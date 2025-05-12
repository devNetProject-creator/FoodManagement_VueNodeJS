import { defineStore } from 'pinia'
import axios from 'axios'
import { API_CONFIG } from '@/config/config.js'

export const useAuthStore = defineStore('auth', {
  state: () => {
    const token = localStorage.getItem('token') || '';
    return {
      token,
      user: null,
      isAuthenticated: !!token,
      loading: false,
      error: null
    }
  },

  actions: {
    async login(credentials) {
      try {
        this.loading = true
        this.error = null

        const { authService } = await import('@/api/api')
        const response = await authService.login(credentials);
        const { token, user } = response?.data || {};
        if (!token || !user) {
          throw new Error('Login response missing token or user');
        }
        this.token = token;
        this.user = user;
        localStorage.setItem('token', this.token);
        this.isAuthenticated = true;
        return { data: { token: this.token, user: this.user } }
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed'
        this.isAuthenticated = false
        throw error
      } finally {
        this.loading = false
      }
    },

    async signup(userData) {
      try {
        this.loading = true
        this.error = null

        const { authService } = await import('@/api/api')
        const response = await authService.signup(userData)
        this.token = response.data.token
        this.user = response.data.user
        localStorage.setItem('token', this.token)
        this.isAuthenticated = true
        return { data: { token: this.token, user: this.user } }
      } catch (error) {
        this.error = error.response?.data?.message || 'Signup failed'
        this.isAuthenticated = false
        throw error
      } finally {
        this.loading = false
      }
    },

    async initDemo() {
      if (API_CONFIG.isDemoActive) {
        this.token = API_CONFIG.demoUser.token
        this.user = API_CONFIG.demoUser
        localStorage.setItem('token', this.token)
        this.isAuthenticated = true
      }
    },

    logout() {
      this.token = ''
      this.user = null
      this.isAuthenticated = false
      localStorage.removeItem('token')
      // Redirect to login page
      window.location.href = '/login'
    },

    async getUser() {
      try {
        const response = await axios.get(`${API_CONFIG.apiBaseUrl}/auth/profile`, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.user = response.data
        this.isAuthenticated = true
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch user data'
        // Only clear token if unauthorized
        if (error.response && error.response.status === 401) {
          this.isAuthenticated = false
          this.token = ''
          localStorage.removeItem('token')
        }
      }
    },

    async checkAuth() {
      if (this.token) {
        this.isAuthenticated = true
        try {
          await this.getUser()
          return true
        } catch (error) {
          if (error.response && error.response.status === 401) {
            this.isAuthenticated = false
            this.token = ''
            localStorage.removeItem('token')
            return false
          }
          // For other errors, keep user logged in
          return true
        }
      } else {
        this.isAuthenticated = false
        return false
      }
    }
  },

  getters: {
    isLoggedIn: (state) => !!state.token,
    getUserRole: (state) => state.user?.role || 'customer'
  }
})
