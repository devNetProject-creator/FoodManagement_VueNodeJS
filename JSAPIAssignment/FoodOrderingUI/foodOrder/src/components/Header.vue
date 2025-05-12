<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <a class="navbar-brand"  href="#">Navbar</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <div v-if="!isUserLogin">
    <ul class="navbar-nav">
     
      <li class="nav-item active" >
        <a class="nav-link"  @click="redirectSignUp()">Sign Up <span class="sr-only">(current)</span></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" @click="redirectSignIn()" >Sign in</a>
      </li>
  
      
    
      
    </ul>
  </div>
  <div v-else>
<ul class="navbar-nav">
<li class="nav-item">
<a @click="logout()" class="nav-link " >Logout</a>
</li>
<li  class="nav-item">
        <a @click="redirectOrder()" class="nav-link" >Orders</a>
      </li>
    </ul>
      </div>

</div>

</nav>  




</template>
<script>


export default {
  name: 'Header',
  computed: {
   isUserLogin () {
return localStorage.getItem('user-info-token')?.length;
}
},
mounted(){
console.log("I am in mounted")


},
methods:{
  redirectSignUp(){
    this.$router.push({name:'SignUp'})
  },
  redirectSignIn(){
    this.$router.push({name:'Login'})
  },
  redirectOrder(){
    this.$router.push({name:'Order'})
  },
  logout(){
    
  },
}
}
</script>
<style>
</style>