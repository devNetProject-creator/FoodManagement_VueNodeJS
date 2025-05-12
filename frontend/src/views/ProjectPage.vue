<template>
  <div class="project-page">
    <h1>Food Ordering System - College Project</h1>
    <section class="description">
      <h2>Project Overview</h2>
      <p>
        This is a full-stack <b>Food Ordering System</b> developed as a college project using <b>Vue 3</b> (frontend), <b>Node.js/Express</b> (backend), and <b>SQL</b> (database). The system allows users to browse food items, add them to a cart, and place orders securely with authentication and role-based access.
      </p>
    </section>
    <section class="features">
      <h2>Key Features</h2>
      <ul>
        <li>User authentication with JWT (login/signup/logout)</li>
        <li>Browse food menu with images and prices ($)</li>
        <li>Add, update, and remove items from cart (cart persists across refreshes)</li>
        <li>Place orders with secure API calls and payment method selection</li>
        <li>Order history and order status tracking</li>
        <li>Admin features (if enabled): manage menu, view all orders</li>
        <li>Responsive and clean UI for a great user experience</li>
      </ul>
    </section>
    <section class="tech">
      <h2>Technology Stack</h2>
      <ul>
        <li><b>Frontend:</b> Vue 3, Pinia, Axios, modern CSS</li>
        <li><b>Backend:</b> Node.js, Express, JWT Auth</li>
        <li><b>Database:</b> SQL (e.g., MySQL or SQLite)</li>
      </ul>
    </section>
    <section class="details">
      <h2>How It Works</h2>
      <ol>
        <li>Users sign up or log in to access the system.</li>
        <li>Browse the food menu and add items to the cart.</li>
        <li>Proceed to cart, select payment method, and place order.</li>
        <li>Orders are securely created and stored in the database.</li>
        <li>Cart is automatically cleared after successful order.</li>
      </ol>
    </section>
    <section class="notes">
      <h2>Special Notes</h2>
      <ul>
        <li>All price displays use the rupee symbol ($).</li>
        <li>Authentication tokens are stored securely in localStorage.</li>
        <li>Project is designed for learning and demonstration purposes.</li>
      </ul>
    </section>
    <section class="submission-template">
      <h2>SUBMISSION TEMPLATE</h2>
      <div class="template-block">
        <b>Team Members and Database Name:</b><br>
        <i>&lt;put your team members and database name here&gt;</i>
      </div>
      <div class="template-block">
        <b>What is the base public URL of your Vue application? (2 points)</b><br>
        <i>&lt;put your link here&gt;</i><br>
        <small>This should be a URL based on localhost that was created when deploying the project.</small>
      </div>
      <div class="template-block">
        <b>What is the URL for the user to sign up? (6 points)</b><br>
        <i>&lt;put your link here&gt;</i><br>
        <ul>
          <li>1 point: data validation for user inputs</li>
          <li>2 points: validation to prevent user from signing up with duplicate email address</li>
          <li>3 points: form is successfully submitted to API and user is redirected to login page</li>
        </ul>
      </div>
      <div class="template-block">
        <b>What is the URL for the user to login? (6 points)</b><br>
        <i>&lt;put your link here&gt;</i><br>
        <ul>
          <li>1 point: data validation for user inputs</li>
          <li>3 points: form is successfully submitted to API and user is redirected to their account page</li>
          <li>2 points: application state (store) is updated</li>
        </ul>
      </div>
      <div class="template-block">
        <b>What is the listing page that displays all records from the data entity table? (5 points)</b><br>
        <i>&lt;put your link here&gt;</i><br>
        <ul>
          <li>3 points: listing page shows all records</li>
          <li>2 points: Each listing item should have a “details” link</li>
        </ul>
      </div>
      <div class="template-block">
        <b>Provide an example of a data entity “details” page (6 points)</b><br>
        <i>&lt;put your link here&gt;</i><br>
        <ul>
          <li>4 points: page should display information about the particular data record</li>
          <li>2 points: link/button should be available for user to create a transaction with this data record (if the user is signed in)</li>
        </ul>
      </div>
      <div class="template-block">
        <b>Provide an example of a “transaction” page that allows for the user to create a record. (7 points)</b><br>
        <i>&lt;put your link here&gt;</i><br>
        <ul>
          <li>2 points: Data validation for user inputs</li>
          <li>5 points: transaction is successfully created and user is redirected to their account page</li>
        </ul>
      </div>
      <div class="template-block">
        <b>What is the URL for the “account” page of a user? (5 points)</b><br>
        <i>&lt;put your link here&gt;</i><br>
        <ul>
          <li>2 points: This should be a protected page that only authenticated users can access</li>
          <li>3 points: Page should display records associated with user</li>
        </ul>
      </div>
      <div class="template-block">
        <b>Additional requirements (10 points)</b>
        <ul>
          <li>State Management (5 points)</li>
          <ul>
            <li>2 points: dynamic header that shows options to log in, log out, or sign up depending on application state</li>
            <li>3 points: logout functionality that calls logout API and redirects user to home page</li>
          </ul>
          <li>2 points: Professional style - put something nice on the homepage, adding padding, margin.</li>
          <li>3 points: Proper routing in place to navigate through app, the name of your pages semantically makes sense for the app you are building</li>
        </ul>
      </div>
    </section>
  </div>
</template>

<script setup>
// No logic required for static project page
</script>

<style scoped>
.project-page {
  max-width: 800px;
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
h2 {
  color: #34495e;
  margin-top: 1.5rem;
}
ul, ol {
  margin-left: 1.5rem;
}
section {
  margin-bottom: 1.5rem;
}
</style>
