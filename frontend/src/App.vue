<template>
  <div id="app">
    <nav class="navbar-modern navbar navbar-expand-lg py-3 shadow-sm">
  <div class="container">
    <router-link to="/" class="navbar-brand d-flex align-items-center gap-2">
      <img src="@/assets/logo.jpeg" alt="Food Ordering System" height="46" class="navbar-logo rounded-3 shadow-sm bg-white p-1">
      <span class="navbar-title fw-bold fs-4">Food Ordering System</span>
    </router-link>
    <button class="navbar-toggler border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav ms-auto gap-lg-3 gap-2 align-items-lg-center mb-2 mb-lg-0">
        <li class="nav-item">
          <router-link to="/" class="nav-link navbar-link px-3 py-2" active-class="active">
            <i class="fas fa-home me-2"></i>Home
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/menu" class="nav-link navbar-link px-3 py-2" active-class="active">
            <i class="fas fa-utensils me-2"></i>Menu
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/orders" class="nav-link navbar-link px-3 py-2" active-class="active">
            <i class="fas fa-receipt me-2"></i>My Orders
          </router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <router-link to="/profile" class="nav-link navbar-link px-3 py-2" active-class="active">
            <i class="fas fa-user-circle me-2"></i>Profile
          </router-link>
        </li>
      </ul>
      <div class="d-flex align-items-center ms-lg-4 mt-3 mt-lg-0 gap-2">
        <div v-if="isAuthenticated" class="d-flex align-items-center gap-3">
          <span class="navbar-user nav-link d-flex align-items-center">
            <i class="fas fa-user me-2"></i>
            Welcome, {{ user?.firstName }}!
          </span>
          <button class="btn btn-logout px-3 py-2 fw-semibold" @click="logout">
            <i class="fas fa-sign-out-alt me-1"></i>Logout
          </button>
        </div>
        <div v-else class="d-flex gap-2">
          <router-link to="/login" class="btn btn-login px-3 py-2 fw-semibold">
            <i class="fas fa-sign-in-alt me-1"></i>Login
          </router-link>
          <router-link to="/signup" class="btn btn-signup px-3 py-2 fw-semibold">
            <i class="fas fa-user-plus me-1"></i>Sign Up
          </router-link>
        </div>
      </div>
    </div>
  </div>
</nav>


    <div class="main-content">
      <div class="container py-5">
        <router-view></router-view>
      </div>
    </div>

    <footer class="footer-modern mt-5 pt-5 pb-3">
  <div class="container">
    <div class="row align-items-center mb-4">
      <div class="col-md-4 mb-4 mb-md-0 text-center text-md-start">
        <div class="d-flex align-items-center justify-content-center justify-content-md-start mb-2">
          <img src="@/assets/logo.jpeg" alt="Logo" height="44" class="me-2 rounded-3 shadow-sm bg-white p-1">
          <span class="footer-brand fw-bold fs-4">Food Ordering System</span>
        </div>
        <p class="footer-desc mb-0">Delivering delicious meals right to your doorstep.</p>
      </div>
      <div class="col-md-4 mb-4 mb-md-0 text-center">
        <h6 class="fw-bold text-dark mb-3">Quick Links</h6>
        <ul class="footer-links list-unstyled d-flex flex-column gap-2 align-items-center align-items-md-start">
          <li><router-link to="/menu" class="footer-link">Menu</router-link></li>
          <li><router-link to="/orders" class="footer-link">My Orders</router-link></li>
          <li><a href="#" class="footer-link">Contact Us</a></li>
          <li><a href="#" class="footer-link">About Us</a></li>
        </ul>
      </div>
      <div class="col-md-4 text-center text-md-end">
        <h6 class="fw-bold text-dark mb-3">Contact & Social</h6>
        <ul class="list-unstyled footer-contact mb-2">
          <li><i class="fas fa-phone me-2"></i>+1 234 567 890</li>
          <li><i class="fas fa-envelope me-2"></i>info@foodordering.com</li>
          <li><i class="fas fa-map-marker-alt me-2"></i>123 Food Street, City, Country</li>
        </ul>
        <div class="footer-social mt-2">
          <a href="#" class="footer-social-icon" aria-label="Facebook"><i class="fab fa-facebook-f"></i></a>
          <a href="#" class="footer-social-icon" aria-label="Twitter"><i class="fab fa-twitter"></i></a>
          <a href="#" class="footer-social-icon" aria-label="Instagram"><i class="fab fa-instagram"></i></a>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-12 text-center">
        <hr class="footer-divider mb-3">
        <p class="footer-copyright mb-0">&copy; 2025 Food Ordering System. All rights reserved.</p>
      </div>
    </div>
  </div>
</footer>

  </div>
</template>

<script>
import { useAuthStore } from './stores/auth'
import { mapState, mapActions } from 'pinia'

export default {
  name: 'App',
  computed: {
    ...mapState(useAuthStore, ['isAuthenticated', 'user'])
  },
  methods: {
    ...mapActions(useAuthStore, ['logout'])
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.navbar-modern {
  background: linear-gradient(90deg, #ffb347 0%, #ff6b35 100%);
  border-bottom: 1px solid #f1e6d6;
  box-shadow: 0 2px 16px rgba(255, 107, 53, 0.09);
  z-index: 1000;
}
.navbar-logo {
  margin-right: 10px;
  border-radius: 12px;
  background: #fff;
}
.navbar-title {
  color: #ff6b35;
  letter-spacing: 1px;
  font-family: 'Poppins', 'Avenir', Helvetica, Arial, sans-serif;
}
.navbar-link {
  color: #fff;
  font-weight: 500;
  border-radius: 8px;
  transition: background 0.2s, color 0.2s;
  position: relative;
}
.navbar-link.active,
.navbar-link:hover {
  background: rgba(255,255,255,0.17);
  color: #fff;
}
.navbar-link::after {
  content: '';
  position: absolute;
  left: 12px;
  right: 12px;
  bottom: 7px;
  height: 2px;
  background: #fff;
  opacity: 0;
  transition: opacity 0.25s, width 0.25s;
  width: 0;
}
.navbar-link.active::after,
.navbar-link:hover::after {
  opacity: 1;
  width: 70%;
}
.btn-login, .btn-signup, .btn-logout {
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(255,107,53,0.08);
  font-size: 1rem;
  border: none;
  transition: background 0.2s, color 0.2s;
}
.btn-login {
  background: #fff;
  color: #ff6b35;
}
.btn-login:hover {
  background: #ffb347;
  color: #fff;
}
.btn-signup {
  background: linear-gradient(90deg, #ff6b35 0%, #ffb347 100%);
  color: #fff;
}
.btn-signup:hover {
  background: linear-gradient(90deg, #ffb347 0%, #ff6b35 100%);
  color: #fff;
}
.btn-logout {
  background: #fff;
  color: #ff6b35;
}
.btn-logout:hover {
  background: #ffb347;
  color: #fff;
}
.navbar-user {
  color: #fff;
  font-weight: 500;
}
@media (max-width: 991.98px) {
  .navbar-title {
    font-size: 1.17rem;
  }
  .navbar-modern {
    padding-left: 0;
    padding-right: 0;
  }
}
@media (max-width: 767.98px) {
  .navbar-title {
    font-size: 1.03rem;
  }
  .navbar-logo {
    height: 36px;
  }
  .navbar-modern {
    padding-top: 0.6rem;
    padding-bottom: 0.6rem;
  }
}

.btn-success {
  background-color: #28a745;
  border-color: #28a745;
  padding: 0.5rem 1.5rem;
  border-radius: 25px;
  transition: all 0.3s ease;
}

.btn-success:hover {
  background-color: #218838;
  border-color: #1e7e34;
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}

.main-content {
  min-height: calc(100vh - 120px);
}

.footer-modern {
  background: linear-gradient(90deg, #fff8f0 0%, #ffe7d1 100%);
  border-top: 1px solid #f1e6d6;
  box-shadow: 0 -2px 12px rgba(255, 107, 53, 0.05);
}
.footer-brand {
  color: #ff6b35;
  letter-spacing: 1px;
}
.footer-desc {
  color: #6c757d;
  font-size: 1.06rem;
}
.footer-links {
  margin: 0;
  padding: 0;
}
.footer-link {
  color: #ff6b35;
  text-decoration: none;
  font-weight: 500;
  transition: color .2s;
}
.footer-link:hover {
  color: #ffb347;
  text-decoration: underline;
}
.footer-contact li {
  color: #6c757d;
  font-size: 1rem;
  margin-bottom: 0.3rem;
}
.footer-social {
  display: flex;
  gap: 0.8rem;
  justify-content: flex-end;
}
.footer-social-icon {
  color: #ff6b35;
  font-size: 1.25rem;
  background: #fff;
  border-radius: 50%;
  padding: 0.4rem 0.55rem;
  box-shadow: 0 2px 8px rgba(255,107,53,0.08);
  transition: background 0.2s, color 0.2s;
  margin-right: 0.2rem;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}
.footer-social-icon:hover {
  background: #ffb347;
  color: #fff;
}
.footer-divider {
  border-top: 1px solid #f1e6d6;
  margin: 0 auto 1rem auto;
  width: 100%;
  max-width: 600px;
}
.footer-copyright {
  color: #b7a99a;
  font-size: 0.98rem;
}
@media (max-width: 767.98px) {
  .footer-social {
    justify-content: center;
  }
  .footer-modern {
    text-align: center;
    padding-top: 2.5rem;
    padding-bottom: 1.5rem;
  }
  .footer-brand {
    font-size: 1.2rem;
  }
}

@media (max-width: 991.98px) {
  .navbar-brand span {
    display: none;
  }
}
</style>
