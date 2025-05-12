<template>
  <div class="signup">
    <!-- Signup Success Modal -->
    <div class="modal fade" id="signupSuccessModal" tabindex="-1" aria-labelledby="signupSuccessModalLabel" aria-hidden="true" ref="signupSuccessModal">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="signupSuccessModalLabel">Signup Successful</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            Signup successful! Please login to continue.
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="closeModalAndRedirect">OK</button>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h2 class="card-title text-center mb-4">Create Account</h2>
              
              <form @submit.prevent="handleSignup">
                <div class="form-group">
                  <label for="firstName">First Name</label>
                  <input
                    type="text"
                    id="firstName"
                    v-model="firstName"
                    class="form-control"
                    :class="firstNameState"
                    required
                  >
                  <div v-if="!firstNameState" class="invalid-feedback">
                    First name is required
                  </div>
                </div>

                <div class="form-group">
                  <label for="lastName">Last Name</label>
                  <input
                    type="text"
                    id="lastName"
                    v-model="lastName"
                    class="form-control"
                    :class="lastNameState"
                    required
                  >
                  <div v-if="!lastNameState" class="invalid-feedback">
                    Last name is required
                  </div>
                </div>

                <div class="form-group">
                  <label for="email">Email</label>
                  <input
                    type="email"
                    id="email"
                    v-model="email"
                    class="form-control"
                    :class="emailState"
                    required
                  >
                  <div v-if="!emailState" class="invalid-feedback">
                    Please enter a valid email address
                  </div>
                </div>

                <div class="form-group">
                  <label for="password">Password</label>
                  <input
                    type="password"
                    id="password"
                    v-model="password"
                    class="form-control"
                    :class="passwordState"
                    required
                  >
                  <div v-if="!passwordState" class="invalid-feedback">
                    Password must be at least 8 characters
                  </div>
                </div>

                <div class="form-group">
                  <label for="confirmPassword">Confirm Password</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    v-model="confirmPassword"
                    class="form-control"
                    :class="confirmPasswordState"
                    required
                  >
                  <div v-if="!confirmPasswordState" class="invalid-feedback">
                    Passwords do not match
                  </div>
                </div>

                <!-- <div class="form-group">
                  <label for="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    v-model="phone"
                    class="form-control"
                    :class="phoneState"
                    required
                  >
                  <div v-if="!phoneState" class="invalid-feedback">
                    Please enter a valid phone number
                  </div>
                </div>

                <div class="form-group">
                  <label for="address">Address</label>
                  <textarea
                    id="address"
                    v-model="address"
                    class="form-control"
                    :class="addressState"
                    rows="3"
                    required
                  ></textarea>
                  <div v-if="!addressState" class="invalid-feedback">
                    Address is required
                  </div>
                </div> -->

                <div class="form-group">
                  <button type="submit" class="btn btn-primary btn-block" :disabled="!formValid || loading">
                    <span v-if="loading" class="spinner-border spinner-border-sm mr-2"></span>
                    Create Account
                  </button>
                </div>

                <div class="text-center">
                  <router-link to="/login" class="text-muted">
                    Already have an account? Login here
                  </router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed } from 'vue'
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

export default {
  name: 'SignupPage',
  setup() {
    const authStore = useAuthStore()
    const router = useRouter()
    const signupSuccessModal = ref(null)
    let modalInstance = null
    
    // Show Bootstrap modal
    const showSuccessModal = () => {
      if (!modalInstance) {
        // Dynamically import Bootstrap only when needed
        import('bootstrap/dist/js/bootstrap.bundle.min.js').then(() => {
          const modalEl = signupSuccessModal.value
          const bootstrapLib = window.bootstrap || (window.Bootstrap ? window.Bootstrap : null)
          if (bootstrapLib && bootstrapLib.Modal) {
            modalInstance = new bootstrapLib.Modal(modalEl)
            modalInstance.show()
          } else {
            // fallback: show alert if Bootstrap JS is not loaded
            alert('Signup successful! Please login to continue.')
            router.push('/login')
          }
        })
      } else {
        modalInstance.show()
      }
    }
    
    // Close modal and redirect
    const closeModalAndRedirect = () => {
      if (modalInstance) modalInstance.hide()
      router.push('/login')
    }

    const firstName = ref('')
    const lastName = ref('')
    const email = ref('')
    const password = ref('')
    const confirmPassword = ref('')
    const phone = ref('')
    const address = ref('')
    const loading = ref(false)
    const error = ref(null)

    const firstNameState = computed(() => {
      return firstName.value ? null : 'is-invalid'
    })

    const lastNameState = computed(() => {
      return lastName.value ? null : 'is-invalid'
    })

    const emailState = computed(() => {
      if (!email.value) return null
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      return emailRegex.test(email.value) ? null : 'is-invalid'
    })

    const passwordState = computed(() => {
      if (!password.value) return null
      return password.value.length >= 8 ? null : 'is-invalid'
    })

    const confirmPasswordState = computed(() => {
      if (!confirmPassword.value) return null
      return password.value === confirmPassword.value ? null : 'is-invalid'
    })

    // const phoneState = computed(() => {
    //   if (!phone.value) return null
    //   const phoneRegex = /^[0-9]{10}$/
    //   return phoneRegex.test(phone.value) ? null : 'is-invalid'
    // })

    // const addressState = computed(() => {
    //   return address.value ? null : 'is-invalid'
    // })

    const formValid = computed(() => {
      return (
        firstNameState.value === null &&
        lastNameState.value === null &&
        emailState.value === null &&
        passwordState.value === null &&
        confirmPasswordState.value === null 
      
      )
    })

    const handleSignup = async () => {
      if (!formValid.value) return

      try {
        loading.value = true
        const userData = {
          firstName: firstName.value,
          lastName: lastName.value,
          email: email.value,
          password: password.value
          //phone: phone.value,
         // address: address.value
        }
        await authStore.signup(userData)
        showSuccessModal()
        // router.push('/login') <-- now handled by modal
      } catch (err) {
        error.value = err.message
      } finally {
        loading.value = false
      }
    }

    return {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      phone,
      address,
      loading,
      error,
      firstNameState,
      lastNameState,
      emailState,
      passwordState,
      confirmPasswordState,
      formValid,
      handleSignup,
      closeModalAndRedirect,
      signupSuccessModal
    }
  }
}
</script>

<style scoped>
.signup {
  padding: 2rem 0;
}

.card {
  border: none;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
}

.card-title {
  color: #34495e;
  font-weight: 600;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-control {
  border-radius: 4px;
  padding: 0.75rem;
}

.form-control:focus {
  border-color: #2ecc71;
  box-shadow: 0 0 0 0.2rem rgba(46, 204, 113, 0.25);
}

.btn-primary {
  background-color: #2ecc71;
  border-color: #2ecc71;
}

.btn-primary:hover {
  background-color: #27ae60;
  border-color: #27ae60;
}

.spinner-border {
  border-width: 2px;
}
</style>
