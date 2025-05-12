<template>
  <div class="home">
    <!-- Hero Section -->
    <section class="hero-section d-flex align-items-center">
      <div class="container">
        <div class="row align-items-center">
          <div class="col-md-6 text-center text-md-start">
            <h1 class="display-3 fw-bold mb-4">Delicious Food Delivered<br>To Your Doorstep</h1>
            <p class="lead mb-4">Order from a wide range of cuisines and enjoy fast, safe delivery with FOS.</p>
            <router-link to="/menu" class="btn btn-primary btn-lg px-5 py-3">Order Now</router-link>
          </div>
          <div class="col-md-6 text-center">
            <img src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80" alt="Hero Food" class="hero-img img-fluid rounded shadow-lg">
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="features-section py-5">
      <div class="container">
        <div class="row text-center">
          <div class="col-12 mb-5">
            <h2 class="fw-bold">Why Choose FOS?</h2>
          </div>
          <div class="col-md-4 mb-4">
            <div class="feature-card p-4 shadow-sm rounded bg-white h-100">
              <i class="fas fa-utensils feature-icon mb-3"></i>
              <h4 class="mb-2">Quality Food</h4>
              <p>Carefully curated selection of authentic and delicious dishes.</p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="feature-card p-4 shadow-sm rounded bg-white h-100">
              <i class="fas fa-truck feature-icon mb-3"></i>
              <h4 class="mb-2">Fast Delivery</h4>
              <p>Quick and reliable delivery right to your doorstep.</p>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="feature-card p-4 shadow-sm rounded bg-white h-100">
              <i class="fas fa-user-check feature-icon mb-3"></i>
              <h4 class="mb-2">Secure Ordering</h4>
              <p>Safe and secure payment with multiple payment options.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Dishes Section -->
    <section class="featured-dishes-section py-5 bg-light">
      <div class="container">
        <div class="row text-center">
          <div class="col-12 mb-5">
            <h2 class="fw-bold">Featured Dishes</h2>
          </div>
          <div class="col-md-4 mb-4">
            <div class="dish-card shadow rounded bg-white h-100">
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=500&q=60" alt="Pasta" class="img-fluid rounded-top">
              <div class="dish-info p-3">
                <h5 class="fw-bold">Classic Pasta</h5>
                <p>Delicious Italian pasta with fresh ingredients.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="dish-card shadow rounded bg-white h-100">
              <img src="https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=500&q=60" alt="Momo" class="img-fluid rounded-top">
              <div class="dish-info p-3">
                <h5 class="fw-bold">Authentic Momo</h5>
                <p>Delicious Nepalese dumplings with a twist.</p>
              </div>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="dish-card shadow rounded bg-white h-100">
              <img src="https://images.unsplash.com/photo-1563319579-9de163d24f22?auto=format&fit=crop&w=500&q=60" alt="Burger" class="img-fluid rounded-top">
              <div class="dish-info p-3">
                <h5 class="fw-bold">Signature Burger</h5>
                <p>Juicy patty with fresh vegetables and special sauce.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <section class="testimonials-section py-5">
      <div class="container">
        <div class="row text-center">
          <div class="col-12 mb-5">
            <h2 class="fw-bold">What Our Customers Say</h2>
          </div>
          <div class="col-md-4 mb-4">
            <div class="testimonial-card p-4 shadow rounded bg-white h-100">
              <img src="https://randomuser.me/api/portraits/men/32.jpg" alt="Customer" class="testimonial-img rounded-circle mb-3">
              <blockquote class="blockquote mb-2">“The food is always fresh and delivery is super fast. Highly recommend FOS!”</blockquote>
              <footer class="blockquote-footer">Rahul S.</footer>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="testimonial-card p-4 shadow rounded bg-white h-100">
              <img src="https://randomuser.me/api/portraits/women/44.jpg" alt="Customer" class="testimonial-img rounded-circle mb-3">
              <blockquote class="blockquote mb-2">“Great variety and easy ordering. My go-to for family dinners!”</blockquote>
              <footer class="blockquote-footer">Priya K.</footer>
            </div>
          </div>
          <div class="col-md-4 mb-4">
            <div class="testimonial-card p-4 shadow rounded bg-white h-100">
              <img src="https://randomuser.me/api/portraits/men/47.jpg" alt="Customer" class="testimonial-img rounded-circle mb-3">
              <blockquote class="blockquote mb-2">“Love the secure payment and the food arrives hot every time.”</blockquote>
              <footer class="blockquote-footer">Amit J.</footer>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="cta-section py-5 bg-primary text-white text-center">
      <div class="container">
        <h2 class="mb-4 fw-bold">Ready to Order?</h2>
        <router-link to="/menu" class="btn btn-light btn-lg px-5 py-3">View Menu</router-link>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: 'HomePage'
}
</script>

<style scoped>
.home {
  min-height: 100vh;
  background-color: #fff8f0;
}

.hero-section {
  min-height: 70vh;
  background: linear-gradient(rgba(255,255,255,0.95), rgba(255,255,255,0.95)), url('https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1920&q=80') center/cover no-repeat;
  padding: 80px 0 40px 0;
}
.hero-img {
  max-width: 400px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}
.features-section .feature-card {
  border: none;
  background: #fff;
  transition: box-shadow 0.2s;
}
.features-section .feature-card:hover {
  box-shadow: 0 6px 24px rgba(255,107,53,0.09);
}
.feature-icon {
  font-size: 2.5rem;
  color: #ff6b35;
}
.featured-dishes-section {
  background: #f9f9f9;
}
.dish-card img {
  width: 100%;
  height: 220px;
  object-fit: cover;
}
.dish-card {
  transition: transform 0.2s, box-shadow 0.2s;
  border: none;
}
.dish-card:hover {
  transform: translateY(-6px) scale(1.02);
  box-shadow: 0 8px 32px rgba(255,107,53,0.13);
}
.testimonials-section .testimonial-card {
  border: none;
  background: #fff;
}
.testimonial-img {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 4px solid #ff6b35;
  margin-bottom: 1rem;
}
.cta-section {
  background: linear-gradient(90deg, #ff6b35 0%, #ffb347 100%);
}
.cta-section h2 {
  color: #fff;
}
.btn-primary {
  padding: 15px 40px;
  font-size: 1.2rem;
  background-color: #ff6b35;
  border-color: #ff6b35;
  transition: all 0.3s ease;
}
.btn-primary:hover, .btn-light:hover {
  background-color: #ffb347;
  color: #fff;
}
.btn-light {
  color: #ff6b35;
  background: #fff;
  border: none;
  font-weight: 600;
}
@media (max-width: 768px) {
  .hero-section {
    padding: 40px 0;
  }
  .hero-img {
    max-width: 260px;
  }
}
</style>
